import { describe, it, expect } from "vitest";
import { format } from "date-fns";
import {
  activeEarlyBirdPrice,
  effectivePrice,
  isDepartureBookable,
  parseCalendarDate,
  startOfTodayUTC,
} from "@/lib/departure-rules";

const NOW = new Date("2026-11-18T10:00:00Z");

describe("effectivePrice", () => {
  const base = { price: 2680, earlyBirdPrice: 2450, earlyBirdUntil: new Date("2026-12-01T00:00:00Z") };

  it("uses the early-bird price while it is active", () => {
    expect(effectivePrice(base, NOW)).toBe(2450);
    expect(activeEarlyBirdPrice(base, NOW)).toBe(2450);
  });

  it("falls back to the full price once the deadline passes", () => {
    expect(effectivePrice({ ...base, earlyBirdUntil: new Date("2026-11-01T00:00:00Z") }, NOW)).toBe(2680);
  });

  it("ignores an early-bird price that is not a discount", () => {
    expect(effectivePrice({ ...base, earlyBirdPrice: 2900 }, NOW)).toBe(2680);
    expect(effectivePrice({ ...base, earlyBirdPrice: 0 }, NOW)).toBe(2680);
    expect(effectivePrice({ ...base, earlyBirdPrice: null }, NOW)).toBe(2680);
  });

  it("accepts Prisma Decimal-like values", () => {
    const decimal = (n: number) => ({ toString: () => String(n) });
    expect(effectivePrice({ price: decimal(2680), earlyBirdPrice: decimal(2450), earlyBirdUntil: base.earlyBirdUntil }, NOW)).toBe(2450);
  });
});

describe("isDepartureBookable", () => {
  const tomorrow = new Date("2026-11-19T00:00:00Z");

  it("accepts open, limited and guaranteed departures that have not started", () => {
    for (const status of ["OPEN", "LIMITED", "GUARANTEED"] as const) {
      expect(isDepartureBookable({ status, arrivalDate: tomorrow }, NOW)).toBe(true);
    }
  });

  it("rejects full, cancelled and completed departures", () => {
    for (const status of ["FULL", "CANCELLED", "COMPLETED"] as const) {
      expect(isDepartureBookable({ status, arrivalDate: tomorrow }, NOW)).toBe(false);
    }
  });

  it("rejects a departure arriving today or earlier", () => {
    expect(isDepartureBookable({ status: "OPEN", arrivalDate: startOfTodayUTC(NOW) }, NOW)).toBe(false);
    expect(isDepartureBookable({ status: "OPEN", arrivalDate: new Date("2026-11-10T00:00:00Z") }, NOW)).toBe(false);
  });
});

describe("parseCalendarDate", () => {
  it("keeps the calendar day in every time zone", () => {
    expect(format(parseCalendarDate("2026-12-01"), "MMM d, yyyy")).toBe("Dec 1, 2026");
    expect(format(parseCalendarDate("2026-12-01T00:00:00.000Z"), "MMM d, yyyy")).toBe("Dec 1, 2026");
  });
});
