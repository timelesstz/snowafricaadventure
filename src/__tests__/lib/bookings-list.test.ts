import { describe, expect, it } from "vitest";
import { BookingStatus } from "@prisma/client";
import {
  bookingWhere,
  departureTiming,
  formatUsd,
  needsFollowUp,
  parseBookingFilters,
  paymentSummary,
} from "@/lib/bookings/list";

const now = new Date("2026-11-23T10:00:00Z");

describe("parseBookingFilters", () => {
  it("falls back to safe values for bad input", () => {
    expect(parseBookingFilters({ status: "DROP TABLE", page: "abc" })).toEqual({ view: "all", search: "", page: 1 });
    expect(parseBookingFilters({ page: "-3" }).page).toBe(1);
  });
  it("accepts every real status and the follow-up view", () => {
    expect(parseBookingFilters({ status: "NO_SHOW" }).view).toBe("NO_SHOW");
    expect(parseBookingFilters({ status: "follow-up" }).view).toBe("follow-up");
    expect(parseBookingFilters({ status: ["REFUNDED", "x"], search: "  anna  ", page: "2" })).toEqual({
      view: "REFUNDED",
      search: "anna",
      page: 2,
    });
  });
});

describe("bookingWhere", () => {
  it("is empty with no filters", () => {
    expect(bookingWhere({ view: "all", search: "" }, now)).toEqual({});
  });
  it("searches name, email, phone, route and id", () => {
    const where = bookingWhere({ view: BookingStatus.PENDING, search: "lemosho" }, now);
    const [status, search] = where.AND as object[];
    expect(status).toEqual({ status: "PENDING" });
    expect(JSON.stringify(search)).toContain("leadPhone");
    expect(JSON.stringify(search)).toContain("route");
  });
});

describe("paymentSummary", () => {
  it("counts the deposit once it is paid", () => {
    expect(paymentSummary({ totalPrice: 5360, depositAmount: 1000, depositPaid: true, balancePaid: false })).toMatchObject({
      paid: 1000,
      outstanding: 4360,
      label: "Deposit paid",
    });
  });
  it("treats a paid balance as paid in full", () => {
    expect(paymentSummary({ totalPrice: 2680, depositAmount: null, depositPaid: false, balancePaid: true })).toMatchObject({
      paid: 2680,
      outstanding: 0,
      share: 1,
      label: "Paid in full",
    });
  });
  it("handles an unpaid booking and a zero price", () => {
    expect(paymentSummary({ totalPrice: 2440, depositAmount: 500, depositPaid: false, balancePaid: false }).paid).toBe(0);
    expect(paymentSummary({ totalPrice: 0, depositAmount: 0, depositPaid: false, balancePaid: false }).share).toBe(0);
  });
});

describe("departureTiming and needsFollowUp", () => {
  it("labels past, near and far climbs", () => {
    expect(departureTiming(new Date("2026-11-22"), now)).toMatchObject({ days: -1, label: "Yesterday", tone: "past" });
    expect(departureTiming(new Date("2026-12-10"), now)).toMatchObject({ days: 17, tone: "soon", label: "In 17 days" });
    expect(departureTiming(new Date("2027-06-10"), now).tone).toBe("later");
  });
  it("flags open bookings without a deposit that are close or past", () => {
    const soon = { status: BookingStatus.INQUIRY, depositPaid: false, arrivalDate: new Date("2026-12-10") };
    expect(needsFollowUp(soon, now)).toBe(true);
    expect(needsFollowUp({ ...soon, arrivalDate: new Date("2026-03-07") }, now)).toBe(true);
    expect(needsFollowUp({ ...soon, depositPaid: true }, now)).toBe(false);
    expect(needsFollowUp({ ...soon, status: BookingStatus.CONFIRMED }, now)).toBe(false);
    expect(needsFollowUp({ ...soon, arrivalDate: new Date("2027-06-10") }, now)).toBe(false);
  });
});

describe("formatUsd", () => {
  it("drops cents on whole amounts only", () => {
    expect(formatUsd(13400)).toBe("$13,400");
    expect(formatUsd(99.5)).toBe("$99.50");
  });
});
