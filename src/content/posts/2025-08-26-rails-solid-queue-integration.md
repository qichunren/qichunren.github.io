---
title: Ruby on Rails 中 Solid Queue 的集成与踩坑记录
date: 2025-08-26 00:53:00 +0800
categories: Development
---

在 Rails 8 中，**Solid Queue** 作为官方推荐的任务队列系统，替代了 Sidekiq/Resque 等第三方方案，和 Active Job 无缝集成。它直接依赖数据库存储和执行任务，适合不想额外引入 Redis 的团队。
本文将结合实际踩坑案例，介绍 Solid Queue 的表结构、如何集成异步任务，以及开发过程中需要注意的一些细节。

---

## 1. Solid Queue 的表用途简介

Solid Queue 在数据库中主要维护了几张表， 在这里有这些表的[详细结构定义](https://gist.github.com/qichunren/41ef3bb5138c192e8a699111ce0adbb3)，每张表对应不同的职责：

* **`solid_queue_jobs`**
  核心表，存储任务的元信息。包括任务类名（`class_name`）、参数（`arguments`）、优先级（`priority`）、入队时间（`enqueued_at`）、计划执行时间（`scheduled_at`）等。

* **`solid_queue_ready_executions`**
  存放已经可以立刻执行的任务（即“就绪队列”）。Worker 会不断从这里取出任务执行。

* **`solid_queue_blocked_executions`**
  存放因并发限制（如 `concurrency_key`）而暂时被阻塞的任务。

* **`solid_queue_failed_executions`**
  存放执行失败的任务，方便后续排查和重试。

* **`solid_queue_recurring_executions`**
  用于周期任务（类似于 cron job），存储下次执行时间。

可以简单理解为：

> **`jobs` 是任务主表 → `ready_executions` 负责立刻可执行的队列 → `blocked_executions` 负责限流/锁定 → `failed_executions` 负责失败追踪 → `recurring_executions` 负责周期调度。**

---

## 2. 异步任务的集成

在 Rails 内部，我们只需要写：

```ruby
CleanJob.perform_later(123)
```

Rails 会自动把任务序列化为 JSON 并写入 `solid_queue_jobs`，再根据是否定时任务，选择插入 `ready_executions` 或设置 `scheduled_at`。

但在一些跨项目场景（比如 Node.js 需要调用 Rails 的异步任务），就需要**手工插入任务记录**。以下是一个 Node.js 示例：

```js
/**
 * 获取当前 UTC 时间（格式化为 YYYY-MM-DD HH:mm:ss）
 */
function getUTCTimeFormatted() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const year = now.getUTCFullYear();
  const month = pad(now.getUTCMonth() + 1);
  const day = pad(now.getUTCDate());
  const hour = pad(now.getUTCHours());
  const minute = pad(now.getUTCMinutes());
  const second = pad(now.getUTCSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

async function perform_later_job(conn, job_class, job_arguments) {
  const default_queue = "default";
  const job_id = uuidv4();
  const now = new Date().toISOString(); // ISO8601 时间
  const now_ts = getUTCTimeFormatted();

  const payload = {
    job_class,
    job_id,
    provider_job_id: null,
    queue_name: default_queue,
    priority: null,
    arguments: job_arguments,   // 数组
    executions: 0,
    exception_executions: {},
    locale: "zh-CN",
    timezone: "America/Sao_Paulo",
    enqueued_at: now,
    scheduled_at: null          // 定时任务则写 ISO8601 时间
  };

  // 插入到 jobs 主表
  const [jobResult] = await conn.execute(
    `INSERT INTO solid_queue_jobs
       (queue_name, class_name, arguments, priority, active_job_id, scheduled_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [default_queue, job_class, JSON.stringify(payload), 0, job_id, null, now_ts, now_ts]
  );

  const job_db_id = jobResult.insertId;

  // 插入到 ready_executions，使其立刻可执行
  await conn.execute(
    `INSERT INTO solid_queue_ready_executions (job_id, queue_name, priority, created_at)
     VALUES (?, ?, ?, ?)`,
    [job_db_id, default_queue, 0, now_ts]
  );

  return { job_id, job_db_id, queue_name: default_queue };
}
```

这样，Rails 的 worker 便能立即消费该任务。

---

## 3. 注意事项（踩坑点）

在实际对接时，我遇到过 `/jobs` 页面报错：

```
ArgumentError (invalid xmlschema format: "2025-08-25 16:49:42")
```

原因是 **Rails 在反序列化 `arguments` JSON 时，会调用 `Time.xmlschema`**。如果传入的是 `YYYY-MM-DD HH:MM:SS` 这种格式，就会报错。Rails 期望的时间格式必须是 **ISO8601**，比如：

✅ 正确写法：

* `"2025-08-25T16:49:42Z"`
* `"2025-08-25T13:49:42-03:00"`

❌ 错误写法：

* `"2025-08-25 16:49:42"`

### 关键注意点：

1. **时间必须用 ISO8601 格式**
   Node 端推荐直接用 `new Date().toISOString()`。

2. **`scheduled_at` 的处理**

   * 立刻执行任务：`scheduled_at = null`，并写入 `ready_executions`。
   * 定时任务：`scheduled_at = ISO8601`，**不要**写入 `ready_executions`，由调度器到点搬运。

3. **时区字段**
   `timezone` 建议用 IANA 标准名称，例如 `"America/Sao_Paulo"`，不要写 `"Brasilia"` 这种别名。

4. **最好先跑一次 Rails 原生 `perform_later`**
   在数据库中抓一条 `arguments` JSON，确保自己拼装的结构完全一致，避免未来升级时出现兼容性问题。

---

## 总结

Solid Queue 作为 Rails 官方的任务队列，虽然省去了 Redis 依赖，但直接手工对接时也容易踩坑。
**关键是要对齐 Rails 的序列化逻辑，尤其是时间字段要符合 ISO8601。**

如果你也在做跨语言集成，建议先观察 Rails 自己插入的任务 JSON，再按需模仿。这样不仅能避免序列化错误，还能兼容 future 版本的 ActiveJob。

