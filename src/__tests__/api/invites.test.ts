import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    inviteLink: { count: vi.fn(), create: vi.fn() },
    groupDeparture: { findUnique: vi.fn() },
  },
}));
vi.mock("@/lib/email", () => ({ sendEmail: vi.fn() }));
vi.mock("@/lib/rate-limiter", () => ({
  isRateLimited: vi.fn(() => false),
  RATE_LIMITS: { formSubmission: {} },
}));

import { NextRequest } from "next/server";
import { POST } from "@/app/api/invites/route";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const count = vi.mocked(prisma.inviteLink.count);
const findDeparture = vi.mocked(prisma.groupDeparture.findUnique);
const send = vi.mocked(sendEmail);

function post(body: Record<string, unknown>) {
  return POST(
    new NextRequest("http://localhost:3000/api/invites/", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: JSON.stringify(body),
    })
  );
}

const valid = {
  departureId: "dep_1",
  creatorName: "Amina",
  creatorEmail: "Amina@Example.com",
  invitees: [{ name: "Joe", email: "joe@example.com" }],
  personalMessage: "Let's do this together!",
};

describe("POST /api/invites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    count.mockResolvedValue(0);
    findDeparture.mockResolvedValue({
      id: "dep_1",
      status: "OPEN",
      arrivalDate: new Date("2027-01-10T00:00:00Z"),
      endDate: new Date("2027-01-17T00:00:00Z"),
      price: 2680,
      earlyBirdPrice: 2480,
      earlyBirdUntil: new Date("2099-01-01T00:00:00Z"),
      maxParticipants: 10,
      isFullMoon: false,
      route: { title: "8 Days Lemosho Route", slug: "8-days-lemosho-route" },
      bookings: [{ totalClimbers: 3 }],
    } as never);
    vi.mocked(prisma.inviteLink.create).mockResolvedValue({} as never);
  });

  it("refuses links in the personal message and says why", async () => {
    const res = await post({ ...valid, personalMessage: "Claim your refund at www.example.ru now" });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Please leave links out of the message");
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses markup and links in names", async () => {
    expect((await post({ ...valid, creatorName: "<b>Boss</b>" })).status).toBe(400);
    expect((await post({ ...valid, creatorName: "Visit bit.ly" })).status).toBe(400);
    expect((await post({ ...valid, creatorName: "J. Smith" })).status).toBe(200);
    expect((await post({ ...valid, creatorName: "Visit scam.com" })).status).toBe(400);
  });

  it("stops at the database send limits without emailing", async () => {
    count.mockResolvedValueOnce(3); // sender already sent 3 today
    const res = await post(valid);
    expect(res.status).toBe(429);
    expect(send).not.toHaveBeenCalled();
    expect(prisma.inviteLink.create).not.toHaveBeenCalled();
  });

  it("sends with the price and dates the climber would see", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(prisma.inviteLink.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          creatorEmail: "amina@example.com",
          inviteeEmails: ["joe@example.com"],
        }),
      })
    );
    const html = send.mock.calls[0][0].html as string;
    expect(html).toContain("$2,480");
    expect(html).toContain("January 10, 2027");
    expect(html).toContain("Let&#39;s do this together!");
  });
});
