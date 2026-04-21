import { describe, it, expect, vi } from "vitest";

// Mock the heavy dependencies that commission.ts pulls in at module load
// (Prisma client instantiation, SMTP transport). We only exercise the pure
// `determineTripType` function here.
vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("@/lib/email/send", () => ({ sendPartnerCommissionEmail: vi.fn() }));

import { determineTripType } from "@/lib/commission";

describe("determineTripType", () => {
  it("maps routeSlug to kilimanjaro", () => {
    expect(determineTripType({ routeSlug: "machame-7-day" })).toBe("kilimanjaro");
    expect(determineTripType({ routeSlug: "lemosho-8-day" })).toBe("kilimanjaro");
  });

  it("maps safariSlug to safari", () => {
    expect(determineTripType({ safariSlug: "ngorongoro-serengeti-7-day" })).toBe("safari");
  });

  it("maps dayTripSlug to daytrip", () => {
    expect(determineTripType({ dayTripSlug: "arusha-national-park" })).toBe("daytrip");
  });

  it("isZanzibar flag wins when provided alone", () => {
    expect(determineTripType({ isZanzibar: true })).toBe("zanzibar");
  });

  it("routeSlug takes precedence over other flags (Kilimanjaro group departures)", () => {
    expect(
      determineTripType({ routeSlug: "machame-7-day", isZanzibar: true })
    ).toBe("kilimanjaro");
  });

  it("falls back to safari when no context is provided", () => {
    expect(determineTripType({})).toBe("safari");
  });

  it("handles undefined routeSlug (when departure.route relation is missing)", () => {
    // Guards against the narrow edge case where `booking.departure?.route?.slug`
    // evaluates to undefined — should not crash and should fall through to the
    // default. This matters because the public booking route now calls
    // `determineTripType({ routeSlug: booking.departure?.route?.slug })`.
    expect(determineTripType({ routeSlug: undefined })).toBe("safari");
  });
});
