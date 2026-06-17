---
title: ClickHouse GROUP BY 实战：从登录日志到多维分析
date: 2026-06-15 12:00:00 +0800
categories: Development
---

说实话，ClickHouse 的 `GROUP BY` 看着不难，但真上手写查询的时候，坑和门道都不少。这篇文章就拿**用户登录日志**这个最常见的场景来走一遍，从基础聚合一路聊到 Bitmap 留存计算，把 ClickHouse GROUP BY 的核心用法和设计思路掰开揉碎。

## 一、数据准备：一张登录日志表

假设每条用户登录记录长这样：

```sql
CREATE TABLE user_login_log (
    user_id    UInt64,
    login_time DateTime,
    login_date Date MATERIALIZED toDate(login_time),
    ip         String,
    device     LowCardinality(String),
    country    LowCardinality(String)
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(login_time)
ORDER BY (login_date, country, user_id, login_time);
```

注意这里的 `ORDER BY`——它不光是排序用的，还能决定后面 GROUP BY 跑得快不快。当 GROUP BY 的列是 ORDER BY 键的前缀时，ClickHouse 可以直接流式聚合，边读边算，省内存又省时间。

数据量大概是什么级别？每天上亿条登录事件，查询得秒级出结果。

## 二、基础聚合

### 2.1 每日 DAU

```sql
SELECT
    login_date,
    uniqCombined(user_id) AS dau
FROM user_login_log
WHERE login_date BETWEEN '2026-06-01' AND '2026-06-07'
GROUP BY login_date
ORDER BY login_date;
```

这里有两个值得说的点：

- `uniqCombined()` 是近似去重，精度 97-99%，但比 `COUNT(DISTINCT user_id)` 快太多了。大部分场景下这点误差完全可以接受。
- 因为 `GROUP BY login_date` 正好是 ORDER BY 的第一个列，ClickHouse 走 `optimize_aggregation_in_order`，边扫边出结果，不会把所有数据塞到内存里再算。

### 2.2 每位用户的登录次数和最后登录时间

```sql
SELECT
    user_id,
    count()          AS login_count,
    max(login_time)  AS last_login,
    min(login_time)  AS first_login
FROM user_login_log
WHERE login_date = '2026-06-01'
GROUP BY user_id;
```

常用的聚合函数列个表，平时翻一下就行：

| 函数 | 用途 | 示例 |
|------|------|------|
| `count()` | 行数 | 登录次数 |
| `sum(x)` | 求和 | 登录总时长 |
| `avg(x)` | 均值 | 平均在线时长 |
| `max(x)` / `min(x)` | 最值 | 最早/最晚登录时间 |
| `uniqExact(x)` | 精确去重 | 精确 UV |
| `uniqCombined(x)` | 近似去重 | 高基数 UV |
| `any(x)` | 任意值 | 拿一条样本数据 |

## 三、多维度聚合

### 3.1 按设备和国家分组

```sql
SELECT
    login_date,
    device,
    country,
    uniqCombined(user_id) AS uv,
    count()               AS pv
FROM user_login_log
WHERE login_date = '2026-06-01'
GROUP BY login_date, device, country
ORDER BY uv DESC
LIMIT 10;
```

这个查询能帮我们快速回答："今天哪个国家的移动端用户最活跃？"三个维度组合后按 UV 排序取 Top 10，ClickHouse 内部会先做两阶段聚合再排序，不用怕内存撑爆。

### 3.2 条件聚合：一次 GROUP BY 产出多个指标

```sql
SELECT
    login_date,
    country,
    count()                                                  AS total_pv,
    uniqCombined(user_id)                                    AS total_uv,
    uniqCombinedIf(user_id, device = 'Mobile')              AS mobile_uv,
    uniqCombinedIf(user_id, device = 'Desktop')             AS desktop_uv,
    countIf(device = 'Mobile') / count()                    AS mobile_ratio
FROM user_login_log
WHERE login_date = '2026-06-01'
GROUP BY login_date, country;
```

`-If` 后缀的函数（`countIf`, `sumIf`, `uniqCombinedIf`, `maxIf` 等）是我个人非常喜欢的功能，直接在聚合函数里加条件，一次 GROUP BY 就能产出多组指标。比起写 `CASE WHEN` 或者扫好几遍表，清爽太多了。

## 四、小计与总计：ROLLUP 和 TOTALS

### 4.1 WITH ROLLUP

```sql
SELECT
    login_date,
    country,
    uniqCombined(user_id) AS uv
FROM user_login_log
WHERE login_date = '2026-06-01'
GROUP BY login_date, country
    WITH ROLLUP
ORDER BY login_date, country;
```

结果大概长这样：

| login_date  | country | uv    |
|-------------|---------|-------|
| 2026-06-01  | US      | 5000  |
| 2026-06-01  | CN      | 3000  |
| 2026-06-01  |         | 8000  | ← 小计行

ROLLUP 会从最细粒度到总计一层层汇总。你可以理解为 `GROUP BY (a, b)` + `GROUP BY (a)` + `GROUP BY ()` 拼在一起 UNION ALL，但 ClickHouse 一条 SQL 搞定，不用拼写法也不用等多次查询。

### 4.2 WITH CUBE

```sql
GROUP BY login_date, country WITH CUBE;
```

CUBE 会生成所有维度组合的汇总。刚才 ROLLUP 只会按 `(login_date, country)` → `(login_date)` → `()` 这条路走，CUBE 还会多出 `(country)` 这一层——也就是说你会看到"所有日期的某个国家合计"这种行，适合做多维交叉分析。

### 4.3 WITH TOTALS

```sql
SELECT
    login_date,
    country,
    count() AS cnt
FROM user_login_log
WHERE login_date BETWEEN '2026-06-01' AND '2026-06-07'
GROUP BY login_date, country
    WITH TOTALS;
```

结果末尾会自动追加一行总计。不要小看这个功能——如果你手动算总计，就得再写一条 `SELECT sum(cnt) FROM (...)` 然后跟原来的结果拼起来。多麻烦？TOTALS 一条 SQL 全搞定。

## 五、流式预聚合：Materialized View + AggregatingMergeTree

数据量起来以后，每次查询都去扫原始表做 GROUP BY 是不现实的。ClickHouse 推荐的做法是：**写入的时候先聚好，查询的时候只管合并**。

### 5.1 创建目标聚合表

```sql
CREATE TABLE user_login_daily_stats (
    login_date   Date,
    country      LowCardinality(String),
    device       LowCardinality(String),
    pv_state     SimpleAggregateFunction(sum, UInt64),
    uv_state     AggregateFunction(uniqCombined64, UInt64)
)
ENGINE = AggregatingMergeTree
PARTITION BY toYYYYMM(login_date)
ORDER BY (login_date, country, device);
```

这里解释一下两种聚合列的差别：

- `SimpleAggregateFunction(sum, ...)` — 存的是 `sum` 的中间结果，查询时直接用 `sum()` 合并，不需要特殊处理。
- `AggregateFunction(uniqCombined64, ...)` — 存的是去重计算的中间状态（本质上是一个哈希表），查询时要用 `uniqCombined64Merge()` 来合并。

### 5.2 创建物化视图

```sql
CREATE MATERIALIZED VIEW mv_login_to_daily_stats
TO user_login_daily_stats
AS SELECT
    login_date,
    country,
    device,
    count()                              AS pv_state,
    uniqCombined64State(user_id)         AS uv_state
FROM user_login_log
GROUP BY login_date, country, device;
```

每次 `user_login_log` 有新数据进来，物化视图自动就把它 GROUP BY 好了，把聚合中间态写入目标表。完全自动化，不需要自己写调度任务。

### 5.3 查询时再聚合

```sql
SELECT
    login_date,
    country,
    sum(pv_state)                                    AS pv,
    uniqCombined64Merge(uv_state)                    AS uv
FROM user_login_daily_stats
WHERE login_date = '2026-06-01'
GROUP BY login_date, country;
```

核心模式其实一句话就能概括：**写入用 `-State` + `GROUP BY` 做预聚合，查询用 `-Merge` + 二次 `GROUP BY` 合并。** 一次写入，无限快读。注意，这个聚合表可以有自己的 ORDER BY，跟原始表的排序没关系了。

### 5.4 常见 State/Merge 配对

| 聚合函数 | State（写入） | Merge（查询） |
|---------|-------------|-------------|
| sum     | `sum(x)` → 自动合并 | `sum(column)` |
| count   | `count()` → 自动合并 | `sum(column)` |
| max     | `max(x)` → 自动合并 | `max(column)` |
| uniq    | `uniqCombined64State(x)` | `uniqCombined64Merge(state)` |
| bitmap  | `groupBitmapState(x)` | `groupBitmapMerge(state)` |

再提醒一句：`SimpleAggregateFunction` 的列不需要显式的 `-Merge`，直接 `sum()` / `max()` 就行。`AggregateFunction` 的列才必须用对应的 `-Merge`。

## 六、GROUP BY 的秩序：与 ORDER BY 的关系

MergeTree 表引擎下，GROUP BY 跑得快不快，很大程度上取决于它跟 ORDER BY 的默契程度：

```sql
-- 表定义
ORDER BY (login_date, country, user_id, login_time)

-- 情况 1：GROUP BY 是 ORDER BY 前缀 → 最优
GROUP BY login_date, country           -- 利用排序流式聚合

-- 情况 2：GROUP BY 是前缀但跳了一列 → 能用但没那么好
GROUP BY login_date, user_id           -- 跳过了 country

-- 情况 3：GROUP BY 与 ORDER BY 顺序不同 → 只能走哈希聚合
GROUP BY country, login_date           -- 需要两阶段哈希聚合
```

ClickHouse 有两个跟这事相关的设置：

- **`optimize_aggregation_in_order`**（默认开）：当 GROUP BY 键顺序跟 ORDER BY 一致时，边扫表边输出结果，内存占用很低。
- **`group_by_two_level_threshold`**：GROUP BY 的键数量超过这个阈值后，自动切成两阶段聚合（先局部算再全局合并），防止 OOM。

### 性能建议

- 把最常用来 GROUP BY 的列放在 ORDER BY 的前面。
- 留心 GROUP BY 的基数——高基数列（比如 `user_id`）聚合成本很高，适合在已经缩小范围之后再算。
- 能用 `LowCardinality` 修饰的列（国家、设备类型这类）尽量用上，哈希内存能省不少。

## 七、BitMap 聚合：留存计算的神器

做留存分析的时候，GROUP BY 配合 Bitmap 是最强方案，没有之一。

```sql
-- 创建留存聚合表
CREATE TABLE user_retention_daily (
    dt           Date,
    country      LowCardinality(String),
    user_bitmap  AggregateFunction(groupBitmap, UInt64)
)
ENGINE = AggregatingMergeTree
PARTITION BY toYYYYMM(dt)
ORDER BY (dt, country);
```

写入物化视图时，把每天活跃用户打包成一个 Bitmap：

```sql
CREATE MATERIALIZED VIEW mv_retention_daily TO user_retention_daily AS
SELECT
    login_date AS dt,
    country,
    groupBitmapState(toUInt64(user_id)) AS user_bitmap
FROM user_login_log
GROUP BY login_date, country;
```

算次日留存？D0 和 D1 两个 Bitmap 做交集就行：

```sql
SELECT
    d0.country,
    bitmapCardinality(groupBitmapMergeState(d0.user_bitmap))     AS d0_users,
    bitmapCardinality(groupBitmapMergeState(d1.user_bitmap))     AS d1_users,
    bitmapAndCardinality(
        groupBitmapMergeState(d0.user_bitmap),
        groupBitmapMergeState(d1.user_bitmap)
    ) AS retained_users,
    round(retained_users / d0_users, 4) AS retention_rate
FROM user_retention_daily AS d0
JOIN user_retention_daily AS d1
    ON d0.country = d1.country AND d0.dt + INTERVAL 1 DAY = d1.dt
WHERE d0.dt = '2026-06-01'
GROUP BY d0.country;
```

Bitmap 交集的复杂度是 O(min(|A|, |B|))，比 `JOIN` + `COUNT(DISTINCT ...)` 快 1 到 3 个数量级。这不是修辞手法，是真的快那么多。

## 八、动态 GROUP BY

如果做过 BI 看板就知道，用户想切粒度的时候——按天、按国家、按天+国家、或者直接看总计——不能每次都去改 SQL 结构吧？这时候就要动态拼接 GROUP BY。

```sql
-- 按天
SELECT login_date, sum(pv_state) AS pv FROM stats GROUP BY login_date;

-- 按天 + 国家
SELECT login_date, country, sum(pv_state) AS pv FROM stats GROUP BY login_date, country;

-- 仅按国家（汇总）
SELECT country, sum(pv_state) AS pv FROM stats GROUP BY country;

-- 总计
SELECT sum(pv_state) AS pv FROM stats;  -- 无 GROUP BY，全表聚合
```

这里有几个容易踩的坑：

1. SELECT 里的非聚合列必须出现在 GROUP BY 里，不然 ClickHouse 直接报错。
2. ORDER BY 引用的列也一样，必须出现在 GROUP BY 里。
3. 切换粒度的时候，SELECT 列表和 GROUP BY 必须同步调，别只改了一个忘了另一个。

## 九、性能速查与常见陷阱

### GROUP BY 与 WHERE

```sql
-- 好：WHERE 先过滤再聚合，利用分区裁剪
WHERE login_date = '2026-06-01'
GROUP BY country

-- 好：利用主键索引做范围扫描
WHERE login_date BETWEEN '2026-06-01' AND '2026-06-07'
GROUP BY login_date
```

WHERE 先缩窄范围再 GROUP BY，这是最基础的优化了。

### GROUP BY vs SELECT DISTINCT

```sql
-- 这两条等价，但 GROUP BY 通常更快
SELECT DISTINCT country FROM user_login_log WHERE login_date = '2026-06-01';

SELECT country FROM user_login_log WHERE login_date = '2026-06-01'
GROUP BY country;
```

原因很简单：GROUP BY 可以用两阶段聚合来优化，`SELECT DISTINCT` 在有些版本里不吃这套。

### 常见陷阱

| 问题 | 说明 |
|------|------|
| 高基数列做 GROUP BY | `GROUP BY user_id` 在亿级数据上内存消耗很夸张。要么把它放 ORDER BY 前面，要么靠 `group_by_two_level_threshold` 自动分流，别硬扛 |
| SELECT * 与 GROUP BY | ClickHouse 不让你 SELECT 未聚合又不在 GROUP BY 里的列，比 MySQL 严格很多 |
| 聚合后的结果数 | `LIMIT` 在 GROUP BY 之后才生效——先全量聚合再截断。想快速拿 TopN 的话，调一下两阶段聚合阈值 |
| 时区不一致 | 如果 GROUP BY 的 Date 列带 `toTimeZone` 转换，但原表数据本身没做这个转换，结果会莫名其妙错位。GROUP BY 必须跟数据本身的语义一致 |

## 十、总结

| 分析需求 | 聚合策略 | 关键函数 |
|---------|---------|---------|
| 每日 DAU | `GROUP BY login_date` | `uniqCombined()` |
| 多维分析 | `GROUP BY date, country, device` | `-If` 条件聚合系列 |
| 小计总计 | `WITH ROLLUP / CUBE / TOTALS` | — |
| 预聚合 | MV 写入 `GROUP BY` + 查询二次聚合 | `-State` / `-Merge` 配对 |
| 留存 | Bitmap 交集 | `groupBitmapState` / `bitmapAndCardinality` |
| 动态看板 | 拼接 GROUP BY 子句 | — |

说到底，GROUP BY 在 ClickHouse 里不只是个聚合语法——它更像是一种**架构设计工具**，决定了数据从明细到汇总怎么流，决定了你的查询是在毫秒还是秒级完成。把 GROUP BY 吃透了，也就摸到了 ClickHouse 数据建模的门道。

---

## 参考文档

- [ClickHouse - GROUP BY 子句官方文档](https://clickhouse.com/docs/en/sql-reference/statements/select/group-by)
- [ClickHouse - 聚合函数列表](https://clickhouse.com/docs/en/sql-reference/aggregate-functions/reference)
- [ClickHouse - AggregatingMergeTree 表引擎](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/aggregatingmergetree)
- [ClickHouse - Materialized View 指南](https://clickhouse.com/docs/en/sql-reference/statements/create/view#materialized-view)
- [ClickHouse - Bitmap 函数文档](https://clickhouse.com/docs/en/sql-reference/functions/bitmap-functions)
- [ClickHouse - 查询优化指南](https://clickhouse.com/docs/optimize/query-optimization)
