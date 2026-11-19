/**
 * Run row writes in parallel batches.
 *
 * One awaited upsert per row took 65-110 s for a 5-day Search Console window
 * (1,400-2,500 rows), longer than the 60 s function budget. Vercel killed the
 * function mid-loop and the sync never finished. Each write targets its own
 * unique key, so rows in a batch cannot conflict.
 */
export const UPSERT_BATCH = 50;

export async function inBatches<T>(
  rows: T[],
  write: (row: T) => Promise<unknown>,
  batchSize = UPSERT_BATCH
): Promise<number> {
  for (let i = 0; i < rows.length; i += batchSize) {
    await Promise.all(rows.slice(i, i + batchSize).map(write));
  }
  return rows.length;
}
