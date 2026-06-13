---
title: ClickHouse windowFunnel：电商转化漏斗的正确打开方式
date: 2026-06-13 12:00:00 +0800
categories: Development
---

> 从 8 个用户的 29 条行为事件中，看 windowFunnel 如何精准计算"24 小时内按顺序完成注册→浏览→下单→支付"的转化率。

## 一、什么是漏斗分析

漏斗分析是增长分析的基石。一个典型的电商漏斗包含四个步骤：

```
注册 → 浏览商品 → 创建订单 → 支付成功
```

我们想回答：100 个注册用户中，有多少人浏览了商品？多少人下了单？多少人最终支付？——**以及每一步的流失率是多少**。

传统做法需要写复杂的多步 JOIN 和时间窗口判断。ClickHouse 提供了一个优雅的内置函数：**`windowFunnel`**。

---

## 二、准备测试数据

先建一张简单的行为事件表，插入 8 个用户共 29 条事件。

```sql
CREATE TABLE user_behavior (
    user_id String,
    event_type LowCardinality(String),  -- register / view_product / create_order / pay_success
    event_time DateTime
) ENGINE = MergeTree()
ORDER BY (user_id, event_time);
```

### 8 个用户的行为数据（2026-06-05 当天）

| 用户 | 场景 | 事件序列 | 说明 |
|------|------|----------|------|
| u_01 | 快速全流程 | 注册(08:00) → 浏览(08:30) → 下单(08:45) → 支付(09:00) | 1小时内完成 |
| u_02 | 慢速全流程 | 注册(08:00) → 浏览(12:00) → 下单(20:00) → 支付(次日03:00) | 跨度19h，仍在24h内 |
| u_03 | 放弃支付 | 注册(09:00) → 浏览(09:30) → 下单(10:00) → (无) | 下单后流失 |
| u_04 | 支付超时 | 注册(09:00) → 浏览(09:30) → 下单(10:00) → 支付(次日11:00) | 支付了，但从注册到支付间隔26h |
| u_05 | 放弃下单 | 注册(10:00) → 浏览(10:30) → (无) | 浏览后流失 |
| u_06 | 仅注册 | 注册(11:00) → (无) | 直接离开 |
| u_07 | 犹豫不决 | 注册(12:00) → 浏览(12:30) → 浏览(14:00) → 浏览(16:00) | 反复看但不下单 |
| u_08 | 全流程多浏览 | 注册(08:00) → 浏览×3 → 下单(14:00) → 浏览(15:00) → 支付(18:00) | 完整漏斗，中间有大量浏览 |

完整的数据插入语句如下：

```sql
-- u_01: 完整漏斗，1h 内完成 (level=4)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_01', 'register',     '2026-06-05 08:00:00'),
    ('u_01', 'view_product', '2026-06-05 08:30:00'),
    ('u_01', 'create_order', '2026-06-05 08:45:00'),
    ('u_01', 'pay_success',  '2026-06-05 09:00:00');

-- u_02: 完整漏斗，跨度 19h (level=4, 仍在 24h 窗口内)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_02', 'register',     '2026-06-05 08:00:00'),
    ('u_02', 'view_product', '2026-06-05 12:00:00'),
    ('u_02', 'create_order', '2026-06-05 20:00:00'),
    ('u_02', 'pay_success',  '2026-06-06 03:00:00');

-- u_03: 创建订单但未支付 (level=3)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_03', 'register',     '2026-06-05 09:00:00'),
    ('u_03', 'view_product', '2026-06-05 09:30:00'),
    ('u_03', 'create_order', '2026-06-05 10:00:00');

-- u_04: 支付了但超出 24h 窗口 (level=3)
-- 从 register(09:00) 到 pay_success(次日11:00) 间隔 26h
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_04', 'register',     '2026-06-05 09:00:00'),
    ('u_04', 'view_product', '2026-06-05 09:30:00'),
    ('u_04', 'create_order', '2026-06-05 10:00:00'),
    ('u_04', 'pay_success',  '2026-06-06 11:00:00');

-- u_05: 浏览商品但未下单 (level=2)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_05', 'register',     '2026-06-05 10:00:00'),
    ('u_05', 'view_product', '2026-06-05 10:30:00');

-- u_06: 仅注册未浏览 (level=1)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_06', 'register', '2026-06-05 11:00:00');

-- u_07: 重复浏览但未下单 (level=2)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_07', 'register',     '2026-06-05 12:00:00'),
    ('u_07', 'view_product', '2026-06-05 12:30:00'),
    ('u_07', 'view_product', '2026-06-05 14:00:00'),
    ('u_07', 'view_product', '2026-06-05 16:00:00');

-- u_08: 完整漏斗，中间穿插多次浏览 (level=4)
INSERT INTO user_behavior (user_id, event_type, event_time) VALUES
    ('u_08', 'register',     '2026-06-05 08:00:00'),
    ('u_08', 'view_product', '2026-06-05 08:30:00'),
    ('u_08', 'view_product', '2026-06-05 09:00:00'),
    ('u_08', 'view_product', '2026-06-05 10:00:00'),
    ('u_08', 'create_order', '2026-06-05 14:00:00'),
    ('u_08', 'view_product', '2026-06-05 15:00:00'),
    ('u_08', 'pay_success',  '2026-06-05 18:00:00');
```

数据已准备完毕，开始分析。

---

## 三、windowFunnel 初体验

`windowFunnel` 的语法：

```sql
windowFunnel(window_size)(timestamp, cond1, cond2, cond3, ...)
```

- `window_size`：时间窗口（秒），如 86400 表示 24 小时
- `timestamp`：事件时间列
- `cond1, cond2, ...`：按顺序匹配的条件

**核心规则**：对每个用户，从第一步开始，在每个步骤的**上一个匹配时间之后**查找下一个匹配，所有步骤必须发生在 `window_size` 内。

### 第一版查询：统计各层级人数

```sql
SELECT
    level,
    count() AS user_count
FROM (
    SELECT
        user_id,
        windowFunnel(86400)(event_time,
            event_type = 'register',
            event_type = 'view_product',
            event_type = 'create_order',
            event_type = 'pay_success'
        ) AS level
    FROM user_behavior
    WHERE event_time >= '2026-06-01' AND event_time < '2026-06-12'
    GROUP BY user_id
)
GROUP BY level
ORDER BY level ASC;
```

**运行结果**：

| level | user_count |
|-------|-----------|
| 1 | 1 |
| 2 | 2 |
| 3 | 2 |
| 4 | 3 |

**这个结果怎么读？很多人第一次看到会困惑。**

### 理解 windowFunnel 的返回值

`windowFunnel` 对每个用户返回一个整数：该用户按顺序到达的**最高层级**。

让我们逐用户追踪：

| 用户 | 行为链 | windowFunnel 判断 | level |
|------|--------|-------------------|-------|
| u_01 | 注册→浏览→下单→支付（全部1h内） | 第4步在窗口内完成 | **4** |
| u_02 | 注册→浏览→下单→支付（跨度19h） | 第4步在24h窗口内 | **4** |
| u_03 | 注册→浏览→下单（无支付） | 第3步匹配，第4步不存在 | **3** |
| u_04 | 注册→浏览→下单→支付（注册到支付26h） | 第3步匹配，第4步超出24h窗口被忽略 | **3** |
| u_05 | 注册→浏览（无下单） | 第2步匹配，第3步不存在 | **2** |
| u_06 | 注册（无浏览） | 第1步匹配，第2步不存在 | **1** |
| u_07 | 注册→浏览×3 | 第2步匹配，第3步不存在 | **2** |
| u_08 | 注册→浏览×3→下单→浏览→支付 | 全部4步在10h窗口内完成 | **4** |

> **关键洞察**：`level` 表示"该用户止步于哪一层"，而非"有多少人经过了这一层"。
>
> `level=1 只有1人` 不是说只有1人注册了，而是说**只有1人止步于注册**（u_06）。其余7人都继续往下走了，归属在更高的 level 中。

**GROUP BY level 后**：
- level 4：3 人**完成**支付
- level 3：2 人**止步于**下单
- level 2：2 人**止步于**浏览
- level 1：1 人**止步于**注册

### 如何从止步人数反推漏斗？累加即可：

```
支付成功　= level 4　　　　　　　　　= 3人
创建订单　= level 3 + level 4　　　 = 2+3 = 5人
浏览商品　= level 2 + 3 + 4　　　　= 2+2+3 = 7人
注册　　　= level 1 + 2 + 3 + 4　　= 1+2+2+3 = 8人
```

漏斗形态：**8 → 7 → 5 → 3**。转化率：87.5% → 71.4% → 60.0%。

---

## 四、让查询直接返回累积值

止步计数虽然忠实反映了 windowFunnel 的原始语义，但做图表时不够直观。有没有办法让查询直接返回漏斗的累积人数？

答案是用 **ARRAY JOIN** 展开每个用户的 level：

```sql
SELECT
    step,
    count() AS user_count
FROM (
    SELECT
        user_id,
        windowFunnel(86400)(event_time,
            event_type = 'register',
            event_type = 'view_product',
            event_type = 'create_order',
            event_type = 'pay_success'
        ) AS level
    FROM user_behavior
    WHERE event_time >= '2026-06-01' AND event_time < '2026-06-12'
    GROUP BY user_id
)
ARRAY JOIN [1,2,3,4] AS step
WHERE level >= step
GROUP BY step
ORDER BY step ASC;
```

**运行结果**：

| step | user_count | 含义 |
|------|-----------|------|
| 1 | 8 | 8 人注册 |
| 2 | 7 | 7 人浏览了商品 |
| 3 | 5 | 5 人创建了订单 |
| 4 | 3 | 3 人支付成功 |

### 这个查询做了什么？

ARRAY JOIN 将每个用户的一行展开为多行：

```
以 u_01 为例，原始结果：user_id='u_01', level=4
ARRAY JOIN [1,2,3,4] AS step 展开后：
  u_01, level=4, step=1  → level >= 1 ✓ 保留
  u_01, level=4, step=2  → level >= 2 ✓ 保留
  u_01, level=4, step=3  → level >= 3 ✓ 保留
  u_01, level=4, step=4  → level >= 4 ✓ 保留

以 u_06 为例，原始结果：user_id='u_06', level=1
ARRAY JOIN [1,2,3,4] AS step 展开后：
  u_06, level=1, step=1  → level >= 1 ✓ 保留
  u_06, level=1, step=2  → level >= 2 ✗ 过滤
  u_06, level=1, step=3  → level >= 3 ✗ 过滤
  u_06, level=1, step=4  → level >= 4 ✗ 过滤
```

这就相当于对每个用户说："你通过了 level N，那你自然就经过了 step 1, 2, ..., N"。GROUP BY step 累积计数后，就是漏斗该有的样子。

### 另一种写法：sumIf 条件聚合

ARRAY JOIN 会先**展开行**（8 个用户展开成 32 行）再过滤聚合。在千万级用户场景下，这种行爆炸会带来不小的内存压力：

```
1000 万用户 × 4 个步骤 = 4000 万行（展开后）
```

更高效的做法是 **`sumIf`**——直接在已聚合的 level 结果上做条件计数，**零行膨胀**：

```sql
SELECT
    sumIf(1, level >= 1) AS step1_register,
    sumIf(1, level >= 2) AS step2_view_product,
    sumIf(1, level >= 3) AS step3_create_order,
    sumIf(1, level >= 4) AS step4_pay_success
FROM (
    SELECT
        user_id,
        windowFunnel(86400)(event_time,
            event_type = 'register',
            event_type = 'view_product',
            event_type = 'create_order',
            event_type = 'pay_success'
        ) AS level
    FROM user_behavior
    WHERE event_time >= '2026-06-01' AND event_time < '2026-06-12'
    GROUP BY user_id
);
```

**运行结果**：

| step1_register | step2_view_product | step3_create_order | step4_pay_success |
|---------------|--------------------|-------------------|-------------------|
| 8 | 7 | 5 | 3 |

`sumIf(1, condition)` 等价于 `countIf()`：对每一行，条件为真则加 1，否则加 0。子查询只输出 8 行（每个用户一行），外层聚合也只在 8 行上做 4 次条件判断，**不会产生任何行膨胀**。

如果业务需要行式输出（每步一行），用 `UNION ALL` 收尾即可：

```sql
SELECT '注册' AS step, sumIf(1, level >= 1) AS user_count FROM subquery
UNION ALL
SELECT '浏览商品', sumIf(1, level >= 2) FROM subquery
UNION ALL
SELECT '创建订单', sumIf(1, level >= 3) FROM subquery
UNION ALL
SELECT '支付成功', sumIf(1, level >= 4) FROM subquery;
```

#### 方案对比

| 方案 | 中间行数 | 内存 | 适用规模 | 代码简洁度 |
|------|---------|------|---------|-----------|
| ARRAY JOIN + GROUP BY | 用户数 × 步数 | 较高 | 百万级以内 | ★★★★★ |
| **sumIf / countIf** | **用户数** | **低** | **千万级以上** | ★★★★ |
| UNION ALL + sumIf | 用户数 × 查询次数 | 低 | 千万级以上 | ★★★ |

> **建议**：日常开发用 ARRAY JOIN（直观好调试），生产环境大规模数据用 `sumIf`（性能优先）。两者结果完全一致，可以先用 ARRAY JOIN 验证逻辑，再切换到 `sumIf` 上线。

---

## 五、可视化呈现

把上面的数据画成漏斗图：

```
    ┌─────────────────────────────────────────┐
    │         注册            8 人            │   ← 最上端最宽
    │                 87.5%                   │
    ├─────────────────────────────────┤
    │       浏览商品         7 人             │
    │                 71.4%                   │
    ├──────────────────────────┤
    │      创建订单         5 人              │
    │                 60.0%                   │
    ├────────────────────┤
    │     支付成功        3 人                │   ← 最下端最窄
    └────────────────────┘
```

---

## 六、u_04 的巧妙设计——时间窗口的真正含义

注意 u_04 这个用户：他确实完成了全部 4 步（注册→浏览→下单→支付），但 windowFunnel 只给了他 **level=3**。为什么？

```
u_04: 注册(06-05 09:00) → 浏览(06-05 09:30) → 下单(06-05 10:00) → 支付(06-06 11:00)
                                                                        ^^^^^^^^^^^^^^^^
                                                                    距注册已过 26 小时！
```

`windowFunnel(86400)` 的时间窗口是 86400 秒（24 小时）。窗口从**第一步匹配的时间**开始计时——u_04 的窗口从 06-05 09:00 开始，到 06-06 09:00 结束。他的支付行为发生在 06-06 11:00，已经超出窗口 2 小时，因此不被计入。

**这是一个重要的产品洞察**：这个用户有意愿支付，但决策周期较长。如果我们把窗口从 24h 扩大到 48h（`windowFunnel(172800)`），他会变成 level=4。这就引出了窗口大小的选择策略——应该根据业务特性找到合理的"转化时间预期"。

---

## 七、windowFunnel 的优势

相比手写 SQL 实现漏斗分析：

| 方案 | 代码量 | 复杂度 | 性能 |
|------|--------|--------|------|
| 手写多步 JOIN + 时间差 | ~50行 | 高（需要多次子查询和窗口函数） | 差 |
| **windowFunnel** | **~10行** | **低（一行函数搞定）** | **优（向量化执行）** |

不止是漏斗——`windowFunnel` 还可以用于：

- **用户路径分析**：首页→搜索→详情→加购→下单
- **新手引导漏斗**：打开App→注册→完善资料→首次发帖
- **活动效果评估**：收到推送→点击→进入活动→参与→分享
- **售后流程分析**：申请退款→审核→退款到账

---

## 八、windowFunnel 的 mode 参数

前面所有示例都使用了默认模式。`windowFunnel` 的完整签名其实有三个参数：

```sql
windowFunnel(window_size, mode, auto_fix)(timestamp, cond1, cond2, ...)
```

- `mode`：事件匹配模式，控制链条的严格程度
- `auto_fix`：布尔值，设为 `1` 时自动修正因时钟漂移导致的乱序时间戳（默认为 `0`）

`mode` 有三种取值，决定了事件之间的"杂质"是否被容忍。

### 8.1 strict_deduplication（默认）

**非目标事件被忽略，允许中间穿插无关事件。** 这是最宽松的模式，也是前文所有示例使用的模式。

```
u_08: register(08:00) → view(08:30) → view(09:00) → view(10:00) → order(14:00) → pay(18:00)
```

链条匹配：register(08:00) → view(08:30) → order(14:00) → pay(18:00) → **level 4**

中间的额外浏览事件被直接跳过。只要按顺序找到每个条件的**首次匹配**，链条就成立。

### 8.2 strict_order

**不允许中间出现"链条前序事件"。** 比默认模式严格——一旦在某步之后又出现了之前的步骤事件，链条断裂。

假设有用户 `u_09`（重复注册的异常场景）：

```
u_09: register(08:00) → view(09:00) → register(10:00) → order(11:00) → pay(12:00)
```

| 模式 | 匹配过程 | level |
|------|---------|-------|
| strict_deduplication | register(08:00) → view(09:00) → ~~register(10:00) 忽略~~ → order(11:00) → pay(12:00) | **4** |
| strict_order | register(08:00) → view(09:00) → register(10:00) **检测到前序事件 register，链条在此断裂！** | **2** |

`strict_order` 的逻辑是：在找 `create_order` 的过程中如果出现了 `register`（步骤 1 的事件），说明用户行为回退，链条不成立。

### 8.3 strict_increase

**在 strict_order 的基础上，要求所有时间戳严格递增。** 这是最严格的模式。

场景：数据采集中可能出现相同时间戳的事件（如批量导入、客户端时钟错误）：

```
u_10: register(08:00) → view(09:00) → order(09:00) → pay(10:00)
                                    ^^^^^^^^^^^^^^^^
                                 view 和 order 时间戳相同！
```

| 模式 | 匹配过程 | level |
|------|---------|-------|
| strict_order | register(08:00) → view(09:00) → order(09:00 同时间戳允许) → pay(10:00) | **4** |
| strict_increase | register(08:00) → view(09:00) → order(09:00) **时间戳未递增，链条断裂！** | **2** |

### 模式选择速查表

| 模式 | 中间无关事件 | 前序事件回退 | 相同时间戳 | 适用场景 |
|------|:----------:|:----------:|:--------:|---------|
| strict_deduplication | 允许 | 允许 | 允许 | **通用场景（推荐默认）** |
| strict_order | 允许 | **禁止** | 允许 | 需要用户严格按步骤推进、不容回退 |
| strict_increase | 允许 | **禁止** | **禁止** | 最严格，规避时钟漂移或批量导入噪音 |

### 使用示例

```sql
-- 默认模式（等于不写 mode 参数）
SELECT user_id, windowFunnel(86400)(event_time,
    event_type = 'register',
    event_type = 'view_product',
    event_type = 'create_order',
    event_type = 'pay_success'
) AS level
FROM user_behavior
GROUP BY user_id;

-- 严格顺序模式
SELECT user_id, windowFunnel(86400, 'strict_order')(event_time,
    event_type = 'register',
    event_type = 'view_product',
    event_type = 'create_order',
    event_type = 'pay_success'
) AS level
FROM user_behavior
GROUP BY user_id;

-- 严格递增 + 自动修正时钟漂移
SELECT user_id, windowFunnel(86400, 'strict_increase', 1)(event_time,
    event_type = 'register',
    event_type = 'view_product',
    event_type = 'create_order',
    event_type = 'pay_success'
) AS level
FROM user_behavior
GROUP BY user_id;
```

> **实战建议**：90% 的场景用默认的 `strict_deduplication` 即可。只在需要严格验证"用户没有在流程中倒退"时才开启 `strict_order`。`strict_increase` 主要用于排查数据质量问题。

---

## 九、前端可视化实战

有了 ClickHouse 的查询结果，还需要一个直观的前端展示才能真正形成闭环。下面用一个完整的示例，展示如何将 windowFunnel 的结果渲染成交互式漏斗图。

### 9.1 后端 API

首先在后端封装一个接口，直接执行第四节中的 ARRAY JOIN 查询，将结果以 JSON 返回：

```
GET /api/funnel
```

```json
{
  "steps": [
    { "name": "注册", "value": 8, "rate": "100.0%" },
    { "name": "浏览商品", "value": 7, "rate": "87.5%" },
    { "name": "创建订单", "value": 5, "rate": "71.4%" },
    { "name": "支付成功", "value": 3, "rate": "60.0%" }
  ]
}
```

无论后端用什么语言（Go / Ruby / Python / Node.js），核心逻辑都一样：执行 ClickHouse 查询、将 `step` 和 `user_count` 映射为 `name` 和 `value`，再附上每一步的转化率。

### 9.2 前端漏斗图 —— 使用 ECharts

[ECharts](https://echarts.apache.org/) 内置了漏斗图（`funnel`）类型，几行配置即可渲染交互式转化图表：

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<div id="chart" style="width:600px;height:400px"></div>
<script>
  const data = [
    { name: '注册', value: 8 },
    { name: '浏览商品', value: 7 },
    { name: '创建订单', value: 5 },
    { name: '支付成功', value: 3 }
  ];

  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption({
    series: [{
      type: 'funnel',
      data,
      label: { show: true, position: 'inside' }
    }]
  });
</script>
```

保存为 `funnel.html` 直接打开即可看到漏斗图。实际项目中 `data` 改为 `fetch('/api/funnel')` 即可对接后端。

### 9.3 进阶：多维度对比

实际业务中，往往需要按不同维度拆分漏斗。例如按**渠道**对比微信推广 vs 抖音推广的效果：

```sql
SELECT
    channel,
    step,
    count() AS user_count
FROM (
    SELECT
        user_id,
        channel,
        windowFunnel(86400)(event_time,
            event_type = 'register',
            event_type = 'view_product',
            event_type = 'create_order',
            event_type = 'pay_success'
        ) AS level
    FROM user_behavior
    WHERE event_time >= '2026-06-01' AND event_time < '2026-06-12'
    GROUP BY user_id, channel
)
ARRAY JOIN [1,2,3,4] AS step
WHERE level >= step
GROUP BY channel, step
ORDER BY channel, step;
```

前端用 ECharts 的多个漏斗系列并排展示，或使用 `dataset` + `transform` 切换维度，可以直观对比不同渠道的转化差异。

### 9.4 技术栈小结

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│ 行为埋点  │ →  │ ClickHouse│ →  │ 后端 API  │ →  │ 前端图表 │
│ (SDK采集)│    │windowFunnel│    │(/api/     │    │(ECharts) │
│          │    │  + ARRAY    │    │ funnel)   │    │          │
│          │    │   JOIN     │    │           │    │          │
└──────────┘    └───────────┘    └──────────┘    └──────────┘
```

整个链路从数据入库到可视化展示，核心查询只需一行 `windowFunnel`，前后端代码加起来不过百行。这就是现代分析型数据库 + 成熟可视化库的组合力量。

---

## 十、总结

1. `windowFunnel` 返回的是每个用户的**最高到达层级**，不是累积人数
2. 漏斗累积值 = 各层级止步人数的累加（从高到低）
3. 用 `ARRAY JOIN` 展开 level 可以直接得到累积结果，做图表更方便
4. 时间窗口从第一步事件的时间戳开始计算，不是从查询的 start_date
5. 合理选择窗口大小取决于业务场景的用户决策周期

8 个用户，29 条事件，一行 windowFunnel，精准还原了电商漏斗的全貌。这就是 ClickHouse 作为分析型数据库的优雅之处。

---

## 参考文档

- [ClickHouse - windowFunnel 函数官方文档](https://clickhouse.com/docs/en/sql-reference/aggregate-functions/reference/windowfunnel)
- [ClickHouse - 漏斗分析指南](https://clickhouse.com/docs/en/guides/developer/funnels)
- [ECharts - 漏斗图配置文档](https://echarts.apache.org/zh/option.html#series-funnel)
- [ECharts - 数据集（dataset）多维度切换](https://echarts.apache.org/handbook/zh/concepts/dataset)
