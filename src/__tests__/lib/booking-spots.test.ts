import { describe, it, expect } from "vitest";
import {
  BOT_FLAG_PREFIX,
  REQUEST_HOLD_DAYS,
  SPOT_HOLDING_STATUSES,
  seatDisplayBookingWhere,
} from "@/lib/booking-spots";
import { departureInvite, escapeHtml } from "@/lib/email/templates";

describe("seatDisplayBookingWhere", () => {
  const now = new Date("2026-11-18T12:00:00Z");
  const where = seatDisplayBookingWhere(now) as {
    OR: [
      { status: { in: string[] } },
      { status: { in: string[] }; createdAt: { gte: Date }; OR: unknown[] },
    ];
  };

  it("always counts paid seats", () => {
    expect(where.OR[0].status.in).toEqual(SPOT_HOLDING_STATUSES);
  });

  it("counts requests only for the hold window", () => {
    const [, requests] = where.OR;
    expect(requests.status.in).toEqual(["INQUIRY", "PENDING"]);
    expect(requests.createdAt.gte.toISOString()).toBe(
      new Date(now.getTime() - REQUEST_HOLD_DAYS * 86_400_000).toISOString()
    );
  });

  it("keeps requests with no notes and drops bot-flagged ones", () => {
    expect(where.OR[1].OR).toEqual([
      { notes: null },
      { NOT: { notes: { startsWith: BOT_FLAG_PREFIX } } },
    ]);
  });
});

describe("departure invite email", () => {
  const base = {
    inviterName: "Amina",
    routeName: "8 Days Lemosho Route",
    arrivalDate: "December 6, 2026",
    endDate: "December 13, 2026",
    price: 2680,
    availableSpots: 8,
    inviteUrl: "https://snowafricaadventure.com/kilimanjaro-join-group-departures/?invite=abc",
  };

  it("escapes markup typed by the sender", () => {
    expect(escapeHtml(`<a href="x">'hi'</a> & more`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;hi&#39;&lt;/a&gt; &amp; more"
    );
    const html = departureInvite({
      ...base,
      inviterName: "<b>Boss</b>",
      inviteeName: "<img src=x>",
      personalMessage: '<a href="https://evil.example">Claim refund</a>',
    });
    expect(html).not.toContain('<a href="https://evil.example"');
    expect(html).not.toContain("<img src=x>");
    expect(html).toContain("&lt;b&gt;Boss&lt;/b&gt;");
  });
});
