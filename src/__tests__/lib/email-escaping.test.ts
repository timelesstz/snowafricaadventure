import { describe, it, expect } from "vitest";
import {
  adminNewBooking,
  bookingConfirmed,
  adminNewInquiry,
  emailShareTemplate,
  inquiryReceived,
  inquiryResponse,
  type BookingEmailData,
  type InquiryEmailData,
} from "@/lib/email/templates";
import { hasNoLinks } from "@/lib/email/visitor-text";

const attack = '<a href="https://evil.example">Claim refund</a>';
const escaped = "&lt;a href=&quot;https://evil.example&quot;&gt;";

const inquiry: InquiryEmailData = {
  inquiryId: "clinquiry123456",
  fullName: `<img src=x onerror=alert(1)>`,
  email: "test@example.com",
  phone: "<b>+255</b>",
  nationality: "<i>UK</i>",
  type: "safari",
  tripType: "<script>x</script>",
  numAdults: 2,
  numChildren: 0,
  arrivalDate: "<u>soon</u>",
  message: `${attack}\nSecond line`,
};

const booking: BookingEmailData = {
  bookingId: "cltest123456789",
  leadName: attack,
  leadEmail: "john@example.com",
  routeTitle: "Machame Route - 7 Days",
  departureDate: "March 15, 2027",
  summitDate: "March 20, 2027",
  totalClimbers: 2,
  totalPrice: 4800,
  depositAmount: 1440,
  status: "INQUIRY",
  climbers: [{ name: "<b>Jane</b>", nationality: "<i>USA</i>" }],
};

describe("visitor text in email templates", () => {
  it("escapes every inquiry field a visitor typed", () => {
    for (const html of [inquiryReceived(inquiry), adminNewInquiry(inquiry)]) {
      expect(html).not.toContain("<img src=x");
      expect(html).not.toContain("<script>x</script>");
      expect(html).not.toContain(attack);
      expect(html).toContain(escaped);
    }
    expect(adminNewInquiry(inquiry)).not.toContain("<b>+255</b>");
  });

  it("keeps line breaks in messages while escaping them", () => {
    expect(adminNewInquiry(inquiry)).toContain("&lt;/a&gt;<br>Second line");
    const html = inquiryResponse(inquiry, "Hello <b>there</b>\nSee you", "<i>Staff</i>");
    expect(html).toContain("Hello &lt;b&gt;there&lt;/b&gt;<br>See you");
    expect(html).toContain("&lt;i&gt;Staff&lt;/i&gt;");
  });

  it("escapes lead and climber names in booking emails", () => {
    const html = adminNewBooking(booking);
    expect(html).not.toContain(attack);
    const confirmed = bookingConfirmed(booking);
    expect(confirmed).not.toContain("<b>Jane</b>");
    expect(confirmed).toContain("&lt;b&gt;Jane&lt;/b&gt; (&lt;i&gt;USA&lt;/i&gt;)");
  });

  it("escapes the shared message", () => {
    const html = emailShareTemplate({ message: attack, shareUrl: "https://snowafricaadventure.com/x/?a=1&b=2" });
    expect(html).not.toContain(attack);
    expect(html).toContain('href="https://snowafricaadventure.com/x/?a=1&amp;b=2"');
  });
});

describe("hasNoLinks", () => {
  it("refuses links and bare domains, allows ordinary text", () => {
    expect(hasNoLinks("see https://x.co")).toBe(false);
    expect(hasNoLinks("go to www.thing")).toBe(false);
    expect(hasNoLinks("visit scam.com today")).toBe(false);
    expect(hasNoLinks("Price: $2,680 per person, 95% success. J. Smith")).toBe(true);
  });
});
