import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    groupDeparture: { findUnique: vi.fn() },
    booking: { findMany: vi.fn(), create: vi.fn() },
  },
}));
vi.mock("next/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/server")>()),
  after: vi.fn(),
}));
vi.mock("@/lib/email/send", () => ({ sendBookingInquiryEmails: vi.fn() }));
vi.mock("@/lib/commission", () => ({ createCommission: vi.fn(), determineTripType: vi.fn() }));
vi.mock("@/lib/notifications", () => ({ BookingNotifications: { newBooking: vi.fn() } }));
vi.mock("@/lib/newsletter", () => ({ subscribeToNewsletter: vi.fn() }));
vi.mock("@/lib/visitor-tracking", () => ({ extractVisitorData: () => ({}) }));
vi.mock("@/lib/rate-limiter", () => ({ isRateLimited: () => false, RATE_LIMITS: { formSubmission: {} } }));

import { POST } from "@/app/api/bookings/route";
import { prisma } from "@/lib/prisma";

const future = (days: number) => new Date(Date.now() + days * 86_400_000);

function departure(overrides: Record<string, unknown> = {}) {
  return {
    id: "dep_1",
    status: "GUARANTEED",
    arrivalDate: future(30),
    summitDate: future(36),
    endDate: future(38),
    price: 2680,
    earlyBirdPrice: null,
    earlyBirdUntil: null,
    maxParticipants: 10,
    route: { title: "8 Days Lemosho Route", slug: "8-days-lemosho-route" },
    ...overrides,
  };
}

function request(climbers = 1) {
  return new NextRequest("http://localhost:3000/api/bookings/", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4" },
    body: JSON.stringify({
      departureId: "dep_1",
      leadName: "Test Climber",
      leadEmail: "climber@example.test",
      climbers: Array.from({ length: climbers }, (_, i) => ({ name: i ? "" : "Test Climber" })),
    }),
  });
}

const findDeparture = vi.mocked(prisma.groupDeparture.findUnique);
const findBookings = vi.mocked(prisma.booking.findMany);
const createBooking = vi.mocked(prisma.booking.create);

describe("POST /api/bookings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findBookings.mockResolvedValue([] as never);
    createBooking.mockImplementation((async ({ data }: { data: Record<string, unknown> }) => ({
      id: "booking_abcdefgh",
      ...data,
      departure: departure(),
    })) as never);
  });

  it.each(["CANCELLED", "COMPLETED", "FULL"])("rejects a %s departure without saving", async (status) => {
    findDeparture.mockResolvedValue(departure({ status }) as never);
    const res = await POST(request());
    expect(res.status).toBe(409);
    expect(createBooking).not.toHaveBeenCalled();
  });

  it("rejects a departure that has already started", async () => {
    findDeparture.mockResolvedValue(departure({ arrivalDate: future(-2) }) as never);
    const res = await POST(request());
    expect(res.status).toBe(409);
    expect(createBooking).not.toHaveBeenCalled();
  });

  it("quotes the active early-bird price, matching what the page showed", async () => {
    findDeparture.mockResolvedValue(
      departure({ earlyBirdPrice: 2450, earlyBirdUntil: future(10) }) as never
    );
    const res = await POST(request(2));
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.summary.totalPrice).toBe(4900);
    expect(body.summary.depositAmount).toBe(980);
    expect(createBooking.mock.calls[0][0].data).toMatchObject({ pricePerPerson: 2450, totalPrice: 4900 });
  });

  it("still saves a normal booking at full price", async () => {
    findDeparture.mockResolvedValue(departure() as never);
    const res = await POST(request());
    expect(res.status).toBe(201);
    expect(createBooking.mock.calls[0][0].data).toMatchObject({ pricePerPerson: 2680, status: "INQUIRY" });
  });
});
