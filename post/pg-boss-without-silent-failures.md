---
title: Two pg-boss production fixes you probably need
date: 2026-04-25 12:00:00
keywords: pg-boss, Postgres, NodeJS, Typescript, queues, observability, dead-letter
level: Medium
layout: post.html
description: Surface silent handler errors and add a shared dead-letter queue. Plus what `singleton` actually means.
---

A queue I had in staging ran every three hours for several weeks. Every cron firing logged `run_start`. No errors anywhere. The queue had been failing 100% of the time — the actual error was sitting in `pgboss.job.output`, unread.

This post covers the two things I fixed and one thing I had to relearn:

1. **Silent handler errors** — pg-boss eats your exceptions.
2. **No dead-letter queue** — terminal failures had nowhere to go.
3. **`singleton` is not exactly-once.** I want to be precise about this.

## Fix 1: silent errors

pg-boss has three failure paths. The default setup catches none of them.

### Handler exceptions

This:

```ts
await boss.work("my-queue", async () => {
  await doStuff();
});
```

If `doStuff()` throws, pg-boss catches the exception inside its own `try/catch`, writes the error into `pgboss.job.output`, and emits **nothing**. Source — `manager.js`, the worker loop:

```js
try {
  const result = await callback(jobs);
  await this.complete(name, jobIds, result);
} catch (err) {
  await this.fail(name, jobIds, err);   // stored, not emitted
}
```

`boss.on('error', ...)` does not fire. There is no event. The exception is gone unless you query the database for it.

Wrap every handler:

```ts
function withErrorLogging<Args extends unknown[], R>(
  queue: string,
  handler: (...args: Args) => Promise<R>,
): (...args: Args) => Promise<R> {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (err) {
      log.error({
        component: "worker",
        action: "job_failed",
        queue,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      });
      // Tag the error with the source queue. pg-boss preserves
      // `output` into the dead-letter row but loses queue context.
      if (err && typeof err === "object") {
        (err as { queue?: string }).queue = queue;
      }
      throw err;
    }
  };
}

await boss.work(
  "my-queue",
  withErrorLogging("my-queue", async () => {
    await doStuff();
  }),
);
```

Two non-obvious points:

- **Rethrow.** Without the rethrow, pg-boss thinks the job succeeded and doesn't retry.
- **Decorate the error.** pg-boss stores the failed job's `output` JSON and copies it verbatim into the DLQ row, but doesn't record which queue produced it. Stamping `err.queue` survives the trip.

This is the one place where `log.error(...); throw err;` is correct. The usual rule ("let the catcher log it") assumes a catcher that logs. pg-boss is the catcher and it doesn't.

### `error` event (internal failures)

pg-boss emits `error` for its own internals: scheduling, the connection pool, queue cache loads, the worker fetch loop, heartbeats, BAM. Not handler exceptions. Different code path.

```ts
boss.on("error", (err: Error & { queue?: string; worker?: string }) => {
  log.error({
    component: "pg-boss",
    action: "internal_error",
    queue: err.queue,
    worker: err.worker,
    error: err.message,
    stack: err.stack,
  });
});
```

`queue` and `worker` are populated when the error came from a specific worker's fetch loop. Capture them.

### `warning` event

Three warning types: `slow_query`, `queue_backlog`, `clock_skew`. All early signals. None fire on `error`. Without a listener they vanish.

```ts
boss.on("warning", (warning) => {
  log.warn({
    component: "pg-boss",
    action: "internal_warning",
    message: warning.message,
    data: warning.data,
  });
});
```

Cheap insurance.

## Fix 2: a shared dead-letter queue

pg-boss supports `deadLetter` on every queue. Once retries are exhausted, the failed job's `data` and `output` get copied into the queue you nominate, and you run a worker on that queue to react.

The mistake is creating a DLQ per queue (`my-queue-dlq`, `other-queue-dlq`, …). Don't. **One shared DLQ for the entire worker process.** Terminal failure handling is the same regardless of source: log it, alert, move on.

```ts
const DEAD_LETTER_QUEUE = "worker-dead-letters";

async function handleDeadLetterJobs(jobs) {
  for (const job of jobs) {
    const output = (job.output ?? {}) as Record<string, unknown>;
    log.error({
      component: "pg-boss",
      action: "dead_letter",
      dlqJobId: job.id,
      sourceQueue: typeof output.queue === "string" ? output.queue : undefined,
      error: typeof output.message === "string" ? output.message : undefined,
      stack: typeof output.stack === "string" ? output.stack : undefined,
      payload: job.data,
      output,
    });
  }
}

async function installDeadLetterWorker(boss: PgBoss) {
  await boss.createQueue(DEAD_LETTER_QUEUE, { retryLimit: 0 });
  await boss.work(
    DEAD_LETTER_QUEUE,
    { includeMetadata: true, batchSize: 10 },
    handleDeadLetterJobs,
  );
}
```

Two details:

- **`includeMetadata: true`.** By default pg-boss only passes `{ id, data }` to handlers. The DLQ worker needs `output` (the original error). Opt in.
- **`retryLimit: 0` on the DLQ itself.** Don't retry a logger.

Then `deadLetter` on every other queue:

```ts
await boss.createQueue("my-queue", {
  retryLimit: 3,
  deadLetter: DEAD_LETTER_QUEUE,
});
```

The wrapper and the DLQ compose: the wrapper logs every failed *attempt* in real time, the DLQ worker logs the *terminal* state. You don't have to wait through `retryLimit + 1` failures to know something broke, and you still get a persistent record once it does die.

## `singleton` is not exactly-once

I called this exactly-once when I first wired it up. It isn't.

pg-boss queue policies are mutual-exclusion rules, not delivery guarantees:

| Policy | Rule |
|---|---|
| `standard` | Default. No restrictions. |
| `short` | At most 1 *queued* job. Unlimited active. |
| `singleton` | At most 1 *active* job. Unlimited queued. |
| `stately` | At most 1 *per state* (queued and active). |
| `exclusive` | At most 1 total (queued or active). |
| `key_strict_fifo` | Strict FIFO ordering per `singletonKey`. |

`singleton` means "no two instances of this queue's job run concurrently." If a 07:00 cron run is still going at 10:00, the 10:00 instance queues and waits. That's the whole guarantee.

It's still useful — for cron jobs that can run longer than their interval, `singleton` prevents two workers from racing to write the same rows. But it doesn't make pg-boss exactly-once.

**pg-boss is at-least-once.** If a worker crashes between processing and acking, the same job runs again on the next worker. That's true for every distributed queue worth using. If you need the *effect* of exactly-once, write idempotent handlers — natural keys, `ON CONFLICT DO NOTHING`, version columns, compare-and-set. The queue policy is concurrency, not correctness.

```ts
await boss.createQueue("sync-referrals-to-excel", {
  retryLimit: 3,
  policy: "singleton",            // serialize concurrent runs
  deadLetter: DEAD_LETTER_QUEUE,
});
```

## Putting it together

```ts
const boss = new PgBoss(connectionString);

// Listeners BEFORE start, so errors during startup are caught.
installPgBossListeners(boss);
await boss.start();

// DLQ worker AFTER start.
await installDeadLetterWorker(boss);

// Every queue: deadLetter. Every handler: wrapper.
await boss.createQueue("my-queue", {
  retryLimit: 3,
  deadLetter: DEAD_LETTER_QUEUE,
});
await boss.work(
  "my-queue",
  withErrorLogging("my-queue", async () => {
    await doStuff();
  }),
);
```

Four primitives: `installPgBossListeners`, `installDeadLetterWorker`, `withErrorLogging`, `deadLetter: DEAD_LETTER_QUEUE`. Wire it once in a shared module and install it from every worker.

## When you still need to look in the database

```sql
select id, state, retrycount, output, started_on, completed_on
from pgboss.job
where name = 'my-queue'
order by created_on desc
limit 10;
```

`output` is JSONB. If you throw structured errors, the full structure lands there and is queryable. With the setup above you shouldn't need this for live monitoring, but it's still the right tool for post-mortems on jobs that died days ago. This query is how I found the 403 that started this post.
