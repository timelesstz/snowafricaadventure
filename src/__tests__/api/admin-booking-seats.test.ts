import { describe, it, expect, vi, beforeEach } from "vitest";

const tx = {
  groupDeparture: { findUnique: vi.fn() },
  booking: { findMany: vi.fn(), update: vi.fn() },
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
  BookingNotifications: { paymentReceived: vi.fn(), bookingUpdated: vi.fn() },
}));

import { PUT } from "@/app/api/admin/bookings/[id]/route";
import { prisma } from "@/lib/prisma";

const findBooking = vi.mocked(prisma.booking.findUnique);

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
    findBooking.mockResolvedValue({
      status: "INQUIRY",
      depositPaid: false,
      balancePaid: false,
      totalClimbers: 4,
      departureId: "dep_1",
    } as never);
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
    expect(tx.booking.update).not.toHaveBeenCalled();
  });

  it("allows it when the seats fit", async () => {
    tx.booking.findMany.mockResolvedValue([{ totalClimbers: 6 }]); // 4 free
    const res = await put({ status: "DEPOSIT_PAID" });
    expect(res.status).toBe(200);
    expect(tx.booking.update).toHaveBeenCalledTimes(1);
  });

  it("skips the check for edits that take no extra seats", async () => {
    const res = await put({ notes: "Called the climber" });
    expect(res.status).not.toBe(409);
    expect(tx.booking.findMany).not.toHaveBeenCalled();
  });
});
