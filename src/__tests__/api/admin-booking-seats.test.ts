import { describe, it, expect, vi, beforeEach } from "vitest";

const tx = {
  $queryRaw: vi.fn(),
  groupDeparture: { findUnique: vi.fn() },
  booking: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
};

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    booking: { findUnique: vi.fn() },
    $transaction: vi.fn(async (fn: (t: typeof tx) => unknown) => fn(tx)),
  },
}));
vi.mock("@/lib/auth", () => ({ auth: vi.fn(), requireRole: vi.fn() }));
vi.mock("@/lib/email/send", () => ({ sendClimberDetailsRequestEmail: vi.fn() }));
vi.mock("@/lib/notifications", () => ({
  BookingNotifications: {
    paymentReceived: vi.fn(),
    bookingUpdated: vi.fn(),
    bookingCancelled: vi.fn(),
  },
}));

import { PUT } from "@/app/api/admin/bookings/[id]/route";
import { prisma } from "@/lib/prisma";
import { BookingNotifications } from "@/lib/notifications";

const findBooking = vi.mocked(prisma.booking.findUnique);

const currentBooking = {
  status: "INQUIRY",
  depositPaid: false,
  balancePaid: false,
  totalClimbers: 4,
  departureId: "dep_1",
};

function expectDepartureLock() {
  expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
  const [query, departureId] = tx.$queryRaw.mock.calls[0];
  expect(query.join(" ")).toContain('SELECT id FROM "GroupDeparture" WHERE id =');
  expect(query.join(" ")).toContain("FOR UPDATE");
  expect(departureId).toBe("dep_1");
}

function put(body: Record<string, unknown>) {
  return PUT(
    new Request("http://localhost:3000/api/admin/bookings/b1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ id: "b1" }) }
  );
}

describe("PUT /api/admin/bookings/[id] seat check", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findBooking.mockResolvedValue({ ...currentBooking } as never);
    tx.$queryRaw.mockResolvedValue([{ id: "dep_1" }]);
    tx.booking.findUnique.mockResolvedValue({ ...currentBooking } as never);
    tx.groupDeparture.findUnique.mockResolvedValue({ maxParticipants: 10 });
    tx.booking.update.mockResolvedValue({
      id: "b1",
      leadName: "Lead",
      depositAmount: 0,
      totalPrice: 0,
      status: "DEPOSIT_PAID",
      departure: { route: { title: "Route", slug: "route" } },
      climberTokens: [],
    });
  });

  it("refuses to mark a booking paid when the departure has too few free seats", async () => {
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 8 }]); // 2 free, booking needs 4
    const res = await put({ status: "DEPOSIT_PAID" });
    expect(res.status).toBe(409);
    expect((await res.json()).error).toMatch(/Only 2 of 10 seats/);
    expectDepartureLock();
    expect(tx.booking.update).not.toHaveBeenCalled();
  });

  it("allows it when the seats fit", async () => {
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 6 }]); // 4 free
    const res = await put({ status: "DEPOSIT_PAID" });
    expect(res.status).toBe(200);
    expectDepartureLock();
    expect(tx.booking.update).toHaveBeenCalledTimes(1);
  });

  it("locks the departure before re-reading the booking and checking held seats", async () => {
    const events: string[] = [];
    tx.$queryRaw.mockImplementation(async () => {
      events.push("lock");
      return [{ id: "dep_1" }];
    });
    tx.booking.findUnique.mockImplementation(async () => {
      events.push("fresh booking");
      return { ...currentBooking };
    });
    tx.groupDeparture.findUnique.mockImplementation(async () => {
      events.push("departure capacity");
      return { maxParticipants: 10 };
    });
    tx.booking.findMany.mockImplementation(async () => {
      events.push("held bookings");
      return [{ totalClimbers: 6 }];
    });

    const res = await put({ status: "DEPOSIT_PAID" });

    expect(res.status).toBe(200);
    expectDepartureLock();
    expect(events).toEqual([
      "lock",
      "fresh booking",
      "departure capacity",
      "held bookings",
    ]);
  });

  it("uses fresh post-lock status and climbers instead of stale pre-lock values", async () => {
    findBooking.mockResolvedValue({
      ...currentBooking,
      status: "CONFIRMED",
      totalClimbers: 4,
    } as never);
    tx.booking.findUnique.mockResolvedValue({
      ...currentBooking,
      status: "INQUIRY",
      totalClimbers: 2,
    } as never);
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 8 }]);

    const res = await put({ status: "CONFIRMED", totalClimbers: 3 });

    expect(res.status).toBe(409);
    expect((await res.json()).error).toMatch(/Only 2 of 10 seats/);
    expect(tx.booking.findUnique).toHaveBeenCalledTimes(1);
    expect(tx.booking.update).not.toHaveBeenCalled();
  });

  it("derives payment updates and notifications from the fresh booking", async () => {
    tx.booking.findUnique.mockResolvedValue({
      ...currentBooking,
      depositPaid: true,
    } as never);

    const res = await put({ depositPaid: true });

    expect(res.status).toBe(200);
    expect(tx.booking.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: {} })
    );
    expect(BookingNotifications.paymentReceived).not.toHaveBeenCalled();
  });

  it("skips the check for edits that take no extra seats", async () => {
    const res = await put({ notes: "Called the climber" });
    expect(res.status).not.toBe(409);
    expect(tx.booking.findMany).not.toHaveBeenCalled();
  });
});
