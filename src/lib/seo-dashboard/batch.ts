/**
 * Run row writes in parallel batches.
 *
 * One awaited upsert per row took 65-110 s for a 5-day Search Console window
 * (1,400-2,500 rows), longer than the 60 s function budget. Vercel killed the
 * function mid-loop and the sync never finished. Each write targets its own
 * unique key, so rows in a batch cannot conflict.
 *
 * Writes go through Prisma Accelerate, which sometimes sheds load with a 503
 * ("Error 1102: Worker exceeded resource limits"). On 2026-11-23 one such
 * response failed the whole daily Search Console sync. Upserts are idempotent,
 * so a write that fails with a transient error is retried after a short pause;
 * anything else (bad data, constraint errors) still fails at once. Batches are
 * 25 writes, not 50, so a burst is less likely to trip the limit at all.
 */
export const UPSERT_BATCH = 25;
export const RETRY_DELAYS_MS = [500, 2000, 5000];

const TRANSIENT =
  /resource limits|error 1102|\b50[234]\b|service unavailable|timed? ?out|ECONNRESET|ETIMEDOUT|EAI_AGAIN|socket hang up|fetch failed|too many connections|P1001|P1002|P1017|P2024|P5\d{3}|P6\d{3}/i;

export function isTransientDbError(error: unknown): boolean {
  if (!error) return false;
  const code = typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
  const message = error instanceof Error ? error.message : String(error);
  return TRANSIENT.test(`${code} ${message}`);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, delays: readonly number[]): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= delays.length || !isTransientDbError(error)) throw error;
      await sleep(delays[attempt]);
    }
  }
}

export async function inBatches<T>(
  rows: T[],
  write: (row: T) => Promise<unknown>,
  batchSize = UPSERT_BATCH,
  retryDelays: readonly number[] = RETRY_DELAYS_MS
): Promise<number> {
  for (let i = 0; i < rows.length; i += batchSize) {
    await Promise.all(rows.slice(i, i + batchSize).map((row) => withRetry(() => write(row), retryDelays)));
  }
  return rows.length;
}
