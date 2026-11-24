import { beforeEach, describe, expect, it, vi } from "vitest";

const tx = {
  $queryRaw: vi.fn(),
  groupDeparture: { findUnique: vi.fn() },
  booking: { findMany: vi.fn(), create: vi.fn() },
};

vi.mock("@/lib/prisma", () => ({
  prisma: {
    booking: { create: vi.fn() },
    $transaction: vi.fn(async (fn: (t: typeof tx) => unknown) => fn(tx)),
  },
}));
vi.mock("@/lib/auth", () => ({ auth: vi.fn(), requireRole: vi.fn() }));
vi.mock("@/lib/commission", () => ({
  createCommission: vi.fn(),
  determineTripType: vi.fn(),
}));

import { POST } from "@/app/api/admin/bookings/route";
import { prisma } from "@/lib/prisma";
import { createCommission, determineTripType } from "@/lib/commission";

const createdBooking = {
  id: "booking_1",
  leadName: "Test Lead",
  totalClimbers: 4,
  totalPrice: 4000,
  departure: { route: { title: "Route", slug: "route" } },
};

function request(overrides: Record<string, unknown> = {}) {
  return new Request("http://localhost:3000/api/admin/bookings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      departureId: "dep_1",
      leadName: "Test Lead",
      leadEmail: "lead@example.test",
      totalClimbers: 4,
      pricePerPerson: 1000,
      status: "CONFIRMED",
      ...overrides,
    }),
  });
}

function expectDepartureLock() {
  expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
  const [query, departureId] = tx.$queryRaw.mock.calls[0];
  expect(query.join(" ")).toContain('SELECT id FROM "GroupDeparture" WHERE id =');
  expect(query.join(" ")).toContain("FOR UPDATE");
  expect(departureId).toBe("dep_1");
}

describe("POST /api/admin/bookings seat check", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tx.$queryRaw.mockResolvedValue([{ id: "dep_1" }]);
    tx.groupDeparture.findUnique.mockResolvedValue({ maxParticipants: 10 });
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 6 }]);
    tx.booking.create.mockResolvedValue(createdBooking);
    vi.mocked(prisma.booking.create).mockResolvedValue(createdBooking as never);
    vi.mocked(createCommission).mockResolvedValue(null as never);
    vi.mocked(determineTripType).mockReturnValue("kilimanjaro" as never);
  });

  it("rejects a holding-status create that would exceed capacity", async () => {
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 7 }]);

    const res = await POST(request());

    expect(res.status).toBe(409);
    expect((await res.json()).error).toMatch(/Only 3 of 10 seats/);
    expectDepartureLock();
    expect(tx.booking.create).not.toHaveBeenCalled();
    expect(prisma.booking.create).not.toHaveBeenCalled();
    expect(createCommission).not.toHaveBeenCalled();
  });

  it("allows an exact fit after locking before every capacity read and the create", async () => {
    const events: string[] = [];
    tx.$queryRaw.mockImplementation(async () => {
      events.push("lock");
      return [{ id: "dep_1" }];
    });
    tx.groupDeparture.findUnique.mockImplementation(async () => {
      events.push("departure capacity");
      return { maxParticipants: 10 };
    });
    tx.booking.findMany.mockImplementation(async () => {
      events.push("held bookings");
      return [{ totalClimbers: 6 }];
    });
    tx.booking.create.mockImplementation(async () => {
      events.push("create");
      return createdBooking;
    });

    const res = await POST(request({ status: "DEPOSIT_PAID" }));

    expect(res.status).toBe(201);
    expectDepartureLock();
    expect(events).toEqual([
      "lock",
      "departure capacity",
      "held bookings",
      "create",
    ]);
    expect(prisma.booking.create).not.toHaveBeenCalled();
    expect(createCommission).toHaveBeenCalledWith({
      bookingId: "booking_1",
      bookingAmount: 4000,
      tripType: "kilimanjaro",
    });
  });

  it.each(["INQUIRY", "PENDING"])(
    "keeps %s creates on the existing non-blocking path",
    async (status) => {
      const res = await POST(request({ status, totalClimbers: 20 }));

      expect(res.status).toBe(201);
      expect(prisma.booking.create).toHaveBeenCalledTimes(1);
      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(tx.$queryRaw).not.toHaveBeenCalled();
      expect(tx.booking.create).not.toHaveBeenCalled();
      expect(createCommission).toHaveBeenCalledTimes(1);
    }
  );
});
