import { describe, expect, it } from "vitest";
import { inBatches, isTransientDbError } from "@/lib/seo-dashboard/batch";

const accelerate503 = new Error(
  'Invalid `prisma.gscPageMetric.upsert()` invocation: {"title":"Error 1102: Worker exceeded resource limits","status":503}'
);

describe("isTransientDbError", () => {
  it("treats Accelerate overload and connection drops as transient", () => {
    expect(isTransientDbError(accelerate503)).toBe(true);
    expect(isTransientDbError(Object.assign(new Error("x"), { code: "P1001" }))).toBe(true);
    expect(isTransientDbError(new Error("fetch failed"))).toBe(true);
  });
  it("does not retry real data errors", () => {
    expect(isTransientDbError(Object.assign(new Error("Unique constraint failed"), { code: "P2002" }))).toBe(false);
    expect(isTransientDbError(new Error("Argument `date` is missing."))).toBe(false);
    expect(isTransientDbError(null)).toBe(false);
  });
});

describe("inBatches", () => {
  it("retries a write that hits a transient error, then succeeds", async () => {
    const attempts = new Map<number, number>();
    const done: number[] = [];
    const count = await inBatches(
      [1, 2, 3],
      async (n) => {
        const a = (attempts.get(n) ?? 0) + 1;
        attempts.set(n, a);
        if (n === 2 && a < 3) throw accelerate503;
        done.push(n);
      },
      2,
      [0, 0, 0]
    );
    expect(count).toBe(3);
    expect(done.sort()).toEqual([1, 2, 3]);
    expect(attempts.get(2)).toBe(3);
  });
  it("fails at once on a non-transient error", async () => {
    let calls = 0;
    await expect(
      inBatches(
        [1],
        async () => {
          calls++;
          throw new Error("Unique constraint failed");
        },
        50,
        [0, 0, 0]
      )
    ).rejects.toThrow("Unique constraint");
    expect(calls).toBe(1);
  });
  it("gives up after the last retry", async () => {
    let calls = 0;
    await expect(
      inBatches(
        [1],
        async () => {
          calls++;
          throw accelerate503;
        },
        50,
        [0, 0]
      )
    ).rejects.toThrow("resource limits");
    expect(calls).toBe(3);
  });
});
