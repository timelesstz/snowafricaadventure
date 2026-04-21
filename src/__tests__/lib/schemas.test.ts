import { describe, it, expect } from "vitest";
import {
  // Admin mutation schemas
  adminBookingCreateSchema,
  adminBookingUpdateSchema,
  adminPartnerCreateSchema,
  adminPartnerUpdateSchema,
  adminPayoutCreateSchema,
  adminPayoutUpdateSchema,
  adminDepartureCreateSchema,
  adminDepartureUpdateSchema,
  adminDepartureBulkCreateSchema,
  adminDepartureBulkPreviewSchema,
  adminInquiryUpdateSchema,
  adminUserCreateSchema,
  adminUserUpdateSchema,
  adminRedirectCreateSchema,
  adminMediaUpdateSchema,
  adminSiteSettingsPostSchema,
  adminCommissionUpdateSchema,
  adminNotFoundUpdateSchema,
  adminEmailTestSchema,
  adminClimberTokenActionSchema,
  adminClimberTokenDeleteSchema,
  // Public schemas (smoke-check they still work)
  inquirySchema,
  groupBookingSchema,
} from "@/lib/schemas";

describe("Admin schemas — booking", () => {
  it("adminBookingCreateSchema accepts a minimal valid payload", () => {
    const result = adminBookingCreateSchema.safeParse({
      departureId: "dep_abc123",
      leadName: "Ada Lovelace",
      leadEmail: "ada@example.com",
      totalClimbers: 2,
      pricePerPerson: 1850,
    });
    expect(result.success).toBe(true);
  });

  it("rejects pricePerPerson = -1", () => {
    const result = adminBookingCreateSchema.safeParse({
      departureId: "dep_abc123",
      leadName: "Ada",
      leadEmail: "ada@example.com",
      totalClimbers: 2,
      pricePerPerson: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown status enum values", () => {
    const result = adminBookingCreateSchema.safeParse({
      departureId: "dep_abc123",
      leadName: "Ada",
      leadEmail: "ada@example.com",
      totalClimbers: 1,
      pricePerPerson: 1850,
      status: "ACCEPTED", // not a real BookingStatus
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid BookingStatus values", () => {
    const valid = [
      "INQUIRY",
      "PENDING",
      "DEPOSIT_PAID",
      "CONFIRMED",
      "CANCELLED",
      "REFUNDED",
      "NO_SHOW",
      "COMPLETED",
    ];
    for (const status of valid) {
      const r = adminBookingCreateSchema.safeParse({
        departureId: "dep_x",
        leadName: "X Y",
        leadEmail: "x@y.com",
        totalClimbers: 1,
        pricePerPerson: 100,
        status,
      });
      expect(r.success, `status=${status} should be valid`).toBe(true);
    }
  });

  it("coerces totalClimbers string to int", () => {
    const result = adminBookingCreateSchema.safeParse({
      departureId: "dep_abc123",
      leadName: "Ada",
      leadEmail: "ada@example.com",
      totalClimbers: "3",
      pricePerPerson: 1850,
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.totalClimbers).toBe(3);
  });

  it("rejects totalClimbers = 0", () => {
    const result = adminBookingCreateSchema.safeParse({
      departureId: "dep_abc123",
      leadName: "Ada",
      leadEmail: "ada@example.com",
      totalClimbers: 0,
      pricePerPerson: 1850,
    });
    expect(result.success).toBe(false);
  });

  it("adminBookingUpdateSchema accepts an empty object (partial)", () => {
    expect(adminBookingUpdateSchema.safeParse({}).success).toBe(true);
  });

  it("adminBookingUpdateSchema validates individual fields when present", () => {
    const badEmail = adminBookingUpdateSchema.safeParse({ leadEmail: "not-an-email" });
    expect(badEmail.success).toBe(false);

    const goodStatus = adminBookingUpdateSchema.safeParse({ status: "CONFIRMED" });
    expect(goodStatus.success).toBe(true);

    const badStatus = adminBookingUpdateSchema.safeParse({ status: "PARTIALLY_PAID" });
    expect(badStatus.success).toBe(false);
  });
});

describe("Admin schemas — partner", () => {
  it("rejects unknown PartnerType values", () => {
    const result = adminPartnerCreateSchema.safeParse({
      name: "Acme Co",
      type: "REFERRER", // not a real PartnerType
    });
    expect(result.success).toBe(false);
  });

  it("accepts the 4 real PartnerType enum values", () => {
    for (const type of ["DEVELOPER", "MARKETING", "AFFILIATE", "AGENT"]) {
      const r = adminPartnerCreateSchema.safeParse({ name: "Acme Co", type });
      expect(r.success, `type=${type} should be valid`).toBe(true);
    }
  });

  it("validates nested commissionRates entries", () => {
    const ok = adminPartnerCreateSchema.safeParse({
      name: "Acme",
      type: "MARKETING",
      commissionRates: [
        { tripType: "kilimanjaro", commissionRate: 15 },
        { tripType: "safari", commissionRate: 10, isActive: true },
      ],
    });
    expect(ok.success).toBe(true);

    const bad = adminPartnerCreateSchema.safeParse({
      name: "Acme",
      type: "MARKETING",
      commissionRates: [{ tripType: "kilimanjaro", commissionRate: 150 }], // > 100
    });
    expect(bad.success).toBe(false);
  });

  it("adminPartnerUpdateSchema is fully partial", () => {
    expect(adminPartnerUpdateSchema.safeParse({}).success).toBe(true);
    expect(adminPartnerUpdateSchema.safeParse({ name: "Only this" }).success).toBe(true);
  });
});

describe("Admin schemas — payout", () => {
  it("requires partnerId + periodStart + periodEnd", () => {
    const r = adminPayoutCreateSchema.safeParse({ partnerId: "p_1" });
    expect(r.success).toBe(false);
  });

  it("coerces ISO date strings to Date", () => {
    const r = adminPayoutCreateSchema.safeParse({
      partnerId: "p_1",
      periodStart: "2026-04-01",
      periodEnd: "2026-04-30",
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.periodStart).toBeInstanceOf(Date);
      expect(r.data.periodEnd).toBeInstanceOf(Date);
    }
  });

  it("rejects unknown PayoutStatus values", () => {
    const r = adminPayoutUpdateSchema.safeParse({ status: "DISPUTED" });
    expect(r.success).toBe(false);
  });

  it("accepts the 4 real PayoutStatus enum values", () => {
    for (const status of ["PENDING", "APPROVED", "PAID", "CANCELLED"]) {
      const r = adminPayoutUpdateSchema.safeParse({ status });
      expect(r.success, `status=${status} should be valid`).toBe(true);
    }
  });
});

describe("Admin schemas — departure", () => {
  const validDeparture = {
    routeId: "route_machame",
    arrivalDate: "2026-07-01",
    startDate: "2026-07-02",
    summitDate: "2026-07-08",
    endDate: "2026-07-09",
    price: 2400,
  };

  it("accepts valid departure input", () => {
    expect(adminDepartureCreateSchema.safeParse(validDeparture).success).toBe(true);
  });

  it("rejects missing required dates", () => {
    const { startDate: _startDate, ...partial } = validDeparture;
    void _startDate;
    expect(adminDepartureCreateSchema.safeParse(partial).success).toBe(false);
  });

  it("rejects minParticipants > max (not enforced by Zod, but individual bounds do apply)", () => {
    const r = adminDepartureCreateSchema.safeParse({
      ...validDeparture,
      maxParticipants: 200, // over the 100 cap
    });
    expect(r.success).toBe(false);
  });

  it("bulk create caps the array at 200 departures", () => {
    const departures = Array.from({ length: 201 }, () => ({
      routeId: "r1",
      arrivalDate: "2026-07-01",
      price: 1000,
    }));
    expect(adminDepartureBulkCreateSchema.safeParse({ departures }).success).toBe(false);
  });

  it("bulk create requires at least one departure", () => {
    expect(
      adminDepartureBulkCreateSchema.safeParse({ departures: [] }).success
    ).toBe(false);
  });

  it("bulk preview frequency enum is strict", () => {
    const ok = adminDepartureBulkPreviewSchema.safeParse({
      routeId: "r1",
      startDateRange: "2026-01-01",
      endDateRange: "2026-12-31",
      frequency: "monthly",
      price: 1000,
    });
    expect(ok.success).toBe(true);

    const bad = adminDepartureBulkPreviewSchema.safeParse({
      routeId: "r1",
      startDateRange: "2026-01-01",
      endDateRange: "2026-12-31",
      frequency: "daily",
      price: 1000,
    });
    expect(bad.success).toBe(false);
  });

  it("adminDepartureUpdateSchema is fully partial", () => {
    expect(adminDepartureUpdateSchema.safeParse({}).success).toBe(true);
  });
});

describe("Admin schemas — inquiry / user / redirect", () => {
  it("inquiry status enum is strict", () => {
    expect(adminInquiryUpdateSchema.safeParse({ status: "new" }).success).toBe(true);
    expect(adminInquiryUpdateSchema.safeParse({ status: "pending" }).success).toBe(false);
  });

  it("user password must be at least 8 chars", () => {
    const tooShort = adminUserCreateSchema.safeParse({
      email: "a@b.com",
      name: "Alice",
      password: "1234567",
    });
    expect(tooShort.success).toBe(false);

    const ok = adminUserCreateSchema.safeParse({
      email: "a@b.com",
      name: "Alice",
      password: "correct horse",
    });
    expect(ok.success).toBe(true);
  });

  it("user role enum is strict", () => {
    const ok = adminUserCreateSchema.safeParse({
      email: "a@b.com",
      name: "Alice",
      password: "password1",
      role: "EDITOR",
    });
    expect(ok.success).toBe(true);

    const bad = adminUserCreateSchema.safeParse({
      email: "a@b.com",
      name: "Alice",
      password: "password1",
      role: "SUPERUSER",
    });
    expect(bad.success).toBe(false);
  });

  it("user update is fully partial", () => {
    expect(adminUserUpdateSchema.safeParse({}).success).toBe(true);
  });

  it("redirect type enum is strict", () => {
    const ok = adminRedirectCreateSchema.safeParse({
      sourceUrl: "/old",
      destinationUrl: "/new",
      type: "PERMANENT",
    });
    expect(ok.success).toBe(true);

    const bad = adminRedirectCreateSchema.safeParse({
      sourceUrl: "/old",
      destinationUrl: "/new",
      type: "301",
    });
    expect(bad.success).toBe(false);
  });
});

describe("Admin schemas — misc", () => {
  it("media update limits field lengths", () => {
    const ok = adminMediaUpdateSchema.safeParse({ alt: "short", title: "short" });
    expect(ok.success).toBe(true);

    const tooLong = adminMediaUpdateSchema.safeParse({ alt: "a".repeat(501) });
    expect(tooLong.success).toBe(false);
  });

  it("site-settings requires at least one key", () => {
    expect(
      adminSiteSettingsPostSchema.safeParse({ settings: {} }).success
    ).toBe(false);
  });

  it("site-settings rejects keys with spaces or special chars", () => {
    const bad = adminSiteSettingsPostSchema.safeParse({
      settings: { "key with space": "v" },
    });
    expect(bad.success).toBe(false);

    const alsoBad = adminSiteSettingsPostSchema.safeParse({
      settings: { "key;drop": "v" },
    });
    expect(alsoBad.success).toBe(false);
  });

  it("site-settings accepts sensible keys and coerces value to string at write time", () => {
    const ok = adminSiteSettingsPostSchema.safeParse({
      settings: {
        "theme.primary": "#123456",
        "booking.default_currency": "USD",
        "climber_reminder_first_days": 7,
      },
    });
    expect(ok.success).toBe(true);
  });

  it("site-settings caps at 200 keys per request", () => {
    const settings: Record<string, string> = {};
    for (let i = 0; i < 201; i++) settings[`key${i}`] = "v";
    expect(adminSiteSettingsPostSchema.safeParse({ settings }).success).toBe(false);
  });

  it("commission update status is strict", () => {
    expect(
      adminCommissionUpdateSchema.safeParse({ status: "PAID" }).success
    ).toBe(true);
    expect(
      adminCommissionUpdateSchema.safeParse({ status: "DISPUTED" }).success
    ).toBe(false);
  });

  it("404-monitor status is strict", () => {
    expect(adminNotFoundUpdateSchema.safeParse({ status: "ACTIVE" }).success).toBe(true);
    expect(adminNotFoundUpdateSchema.safeParse({ status: "DELETED" }).success).toBe(false);
  });

  it("email test accepts empty body (diagnostic can run without 'to')", () => {
    expect(adminEmailTestSchema.safeParse({}).success).toBe(true);
    expect(adminEmailTestSchema.safeParse({ diagnostic: true }).success).toBe(true);
  });

  it("email test rejects malformed email", () => {
    const r = adminEmailTestSchema.safeParse({ to: "not an email" });
    expect(r.success).toBe(false);
  });
});

describe("Climber token action schemas", () => {
  it("discriminated union accepts each action shape", () => {
    const generate = adminClimberTokenActionSchema.safeParse({ action: "generate" });
    expect(generate.success).toBe(true);

    const resend = adminClimberTokenActionSchema.safeParse({
      action: "resend",
      climberIndex: 2,
      email: "c@example.com",
    });
    expect(resend.success).toBe(true);

    const sendAll = adminClimberTokenActionSchema.safeParse({
      action: "send_all",
      emails: [{ climberIndex: 1, email: "a@b.com" }],
    });
    expect(sendAll.success).toBe(true);

    const sendLead = adminClimberTokenActionSchema.safeParse({ action: "send_to_lead" });
    expect(sendLead.success).toBe(true);
  });

  it("rejects resend without climberIndex (previously would hit undefined behavior)", () => {
    const r = adminClimberTokenActionSchema.safeParse({ action: "resend" });
    expect(r.success).toBe(false);
  });

  it("rejects unknown action", () => {
    const r = adminClimberTokenActionSchema.safeParse({ action: "cancel" });
    expect(r.success).toBe(false);
  });

  it("delete schema requires a non-empty tokenId", () => {
    expect(adminClimberTokenDeleteSchema.safeParse({ tokenId: "tok_1" }).success).toBe(true);
    expect(adminClimberTokenDeleteSchema.safeParse({ tokenId: "" }).success).toBe(false);
    expect(adminClimberTokenDeleteSchema.safeParse({}).success).toBe(false);
  });
});

describe("Public schemas — smoke checks", () => {
  it("inquirySchema accepts a valid payload", () => {
    const r = inquirySchema.safeParse({
      fullName: "Alice",
      email: "alice@example.com",
      tripType: "Kilimanjaro",
    });
    expect(r.success).toBe(true);
  });

  it("groupBookingSchema enforces 10-climber cap", () => {
    const eleven = Array.from({ length: 11 }, (_, i) => ({ name: `Climber ${i}` }));
    const r = groupBookingSchema.safeParse({
      leadName: "Alice",
      leadEmail: "alice@example.com",
      totalClimbers: 11,
      climberDetails: eleven,
      departureId: "ckabcdef123456789abcdef12",
    });
    expect(r.success).toBe(false);
  });
});
