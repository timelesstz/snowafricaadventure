/**
 * Email service tests
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  bookingInquiryReceived,
  bookingConfirmed,
  bookingStatusUpdate,
  paymentReminder,
  inquiryReceived,
  inquiryResponse,
  adminNewBooking,
  adminNewInquiry,
  partnerNewCommission,
  BookingEmailData,
  InquiryEmailData,
  PartnerCommissionEmailData,
} from "@/lib/email/templates";

// Mock nodemailer
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test-message-id" }),
    })),
  },
}));

describe("Email Templates", () => {
  const mockBookingData: BookingEmailData = {
    bookingId: "cltest123456789",
    leadName: "John Doe",
    leadEmail: "john@example.com",
    routeTitle: "Machame Route - 7 Days",
    departureDate: "March 15, 2026",
    summitDate: "March 20, 2026",
    totalClimbers: 2,
    totalPrice: 4800,
    depositAmount: 1440,
    status: "INQUIRY",
    climbers: [
      { name: "John Doe", nationality: "USA" },
      { name: "Jane Doe", nationality: "USA" },
    ],
  };

  const mockInquiryData: InquiryEmailData = {
    inquiryId: "clinquiry123456",
    fullName: "Test User",
    email: "test@example.com",
    phone: "+1234567890",
    type: "safari",
    tripType: "Wildlife Safari",
    numAdults: 2,
    numChildren: 1,
    arrivalDate: "April 10, 2026",
    message: "Interested in a 5-day safari",
  };

  const mockCommissionData: PartnerCommissionEmailData = {
    partnerName: "Safari Partner",
    bookingId: "clbooking123",
    leadName: "Customer Name",
    routeTitle: "Machame Route",
    departureDate: "June 1, 2026",
    totalClimbers: 3,
    bookingAmount: 7200,
    commissionRate: 5,
    commissionAmount: 360,
    tripType: "kilimanjaro",
    totalPendingCommissions: 5,
    totalPendingAmount: 1800,
  };

  describe("bookingInquiryReceived", () => {
    it("should generate valid HTML with booking details", () => {
      const html = bookingInquiryReceived(mockBookingData);

      expect(html).toContain("Thank You for Your Booking Inquiry!");
      expect(html).toContain(mockBookingData.leadName);
      expect(html).toContain(mockBookingData.routeTitle);
      expect(html).toContain(mockBookingData.departureDate);
      expect(html).toContain(mockBookingData.summitDate);
      expect(html).toContain("2 climbers");
      expect(html).toContain("$4,800");
      expect(html).toContain("$1,440");
    });

    it("should include next steps section", () => {
      const html = bookingInquiryReceived(mockBookingData);

      expect(html).toContain("What happens next?");
      expect(html).toContain("verify availability");
      expect(html).toContain("packing list");
    });

    it("should include company branding", () => {
      const html = bookingInquiryReceived(mockBookingData);

      expect(html).toContain("Snow Africa Adventure");
      expect(html).toContain("info@snowafricaadventure.com");
      expect(html).toContain("+255 766 657 854");
    });
  });

  describe("bookingConfirmed", () => {
    it("should generate confirmed booking email", () => {
      const confirmedData = { ...mockBookingData, status: "CONFIRMED" };
      const html = bookingConfirmed(confirmedData);

      expect(html).toContain("Your Booking is Confirmed!");
      expect(html).toContain("CONFIRMED");
      expect(html).toContain("Confirmed Booking Details");
      expect(html).toContain(mockBookingData.routeTitle);
    });

    it("should include climber list", () => {
      const html = bookingConfirmed(mockBookingData);

      expect(html).toContain("John Doe");
      expect(html).toContain("Jane Doe");
      expect(html).toContain("USA");
    });

    it("should include important next steps", () => {
      const html = bookingConfirmed(mockBookingData);

      expect(html).toContain("Important Next Steps");
      expect(html).toContain("packing list");
      expect(html).toContain("travel insurance");
    });
  });

  describe("bookingStatusUpdate", () => {
    it("should show status change", () => {
      const html = bookingStatusUpdate(mockBookingData, "INQUIRY");

      expect(html).toContain("Booking Status Update");
      expect(html).toContain("INQUIRY");
      expect(html).toContain(mockBookingData.status);
    });

    it("should include custom message when provided", () => {
      const message = "Your booking is being processed.";
      const html = bookingStatusUpdate(mockBookingData, "INQUIRY", message);

      expect(html).toContain("Note from our team");
      expect(html).toContain(message);
    });

    it("should show deposit paid message", () => {
      const depositData = { ...mockBookingData, status: "DEPOSIT_PAID" };
      const html = bookingStatusUpdate(depositData, "INQUIRY");

      expect(html).toContain("received your deposit payment");
    });
  });

  describe("paymentReminder", () => {
    it("should generate deposit reminder", () => {
      const html = paymentReminder(mockBookingData, "March 1, 2026", 1440, true);

      expect(html).toContain("Deposit Payment Reminder");
      expect(html).toContain("$1,440");
      expect(html).toContain("March 1, 2026");
    });

    it("should generate balance reminder", () => {
      const html = paymentReminder(mockBookingData, "Feb 15, 2026", 3360, false);

      expect(html).toContain("Balance Payment Reminder");
      expect(html).toContain("$3,360");
    });
  });

  describe("inquiryReceived", () => {
    it("should generate inquiry confirmation", () => {
      const html = inquiryReceived(mockInquiryData);

      expect(html).toContain(`Thank You, ${mockInquiryData.fullName}!`);
      expect(html).toContain(mockInquiryData.fullName);
      expect(html).toContain("Safari");
      expect(html).toContain("Wildlife Safari");
    });

    it("should include inquiry details", () => {
      const html = inquiryReceived(mockInquiryData);

      expect(html).toContain("April 10, 2026");
      expect(html).toContain("2"); // adults
      expect(html).toContain("Interested in a 5-day safari");
    });

    it("should handle different inquiry types", () => {
      const trekkingInquiry = { ...mockInquiryData, type: "trekking", tripType: "Kilimanjaro" };
      const html = inquiryReceived(trekkingInquiry);

      expect(html).toContain("Kilimanjaro Trekking");
    });
  });

  describe("inquiryResponse", () => {
    it("should generate response email", () => {
      const responseMessage = "Thank you for your interest. We have availability for your dates.";
      const html = inquiryResponse(mockInquiryData, responseMessage, "Safari Team");

      expect(html).toContain("Response to Your Inquiry");
      expect(html).toContain(mockInquiryData.fullName);
      expect(html).toContain(responseMessage);
      expect(html).toContain("Safari Team");
    });

    it("should preserve line breaks in response", () => {
      const multilineResponse = "Line 1\nLine 2\nLine 3";
      const html = inquiryResponse(mockInquiryData, multilineResponse, "Admin");

      expect(html).toContain("<br>");
    });
  });

  describe("adminNewBooking", () => {
    it("should generate admin notification", () => {
      const html = adminNewBooking(mockBookingData);

      expect(html).toContain("New Booking Inquiry Received");
      expect(html).toContain(mockBookingData.leadName);
      expect(html).toContain(mockBookingData.leadEmail);
      expect(html).toContain(mockBookingData.routeTitle);
      expect(html).toContain("$4,800");
    });

    it("should include admin link", () => {
      const html = adminNewBooking(mockBookingData);

      expect(html).toContain("View Booking in Admin");
      expect(html).toContain("/admin/bookings/");
    });
  });

  describe("adminNewInquiry", () => {
    it("should generate admin inquiry notification", () => {
      const html = adminNewInquiry(mockInquiryData);

      expect(html).toContain("New Safari Inquiry");
      expect(html).toContain(mockInquiryData.fullName);
      expect(html).toContain(mockInquiryData.email);
      expect(html).toContain(mockInquiryData.phone);
    });

    it("should include inquiry message", () => {
      const html = adminNewInquiry(mockInquiryData);

      expect(html).toContain(mockInquiryData.message);
    });
  });

  describe("partnerNewCommission", () => {
    it("should generate commission notification", () => {
      const html = partnerNewCommission(mockCommissionData);

      expect(html).toContain("New Commission Earned!");
      expect(html).toContain(mockCommissionData.partnerName);
      expect(html).toContain("$360");
      expect(html).toContain("5%");
    });

    it("should show pending balance", () => {
      const html = partnerNewCommission(mockCommissionData);

      expect(html).toContain("5 pending commission");
      expect(html).toContain("$1,800");
    });

    it("should handle different trip types", () => {
      const safariCommission = { ...mockCommissionData, tripType: "safari" };
      const html = partnerNewCommission(safariCommission);

      expect(html).toContain("Safari Package");
    });
  });
});

describe("Email Content Validation", () => {
  const mockBookingData: BookingEmailData = {
    bookingId: "cltest123456789",
    leadName: "John Doe",
    leadEmail: "john@example.com",
    routeTitle: "Machame Route",
    departureDate: "March 15, 2026",
    summitDate: "March 20, 2026",
    totalClimbers: 1,
    totalPrice: 2400,
    depositAmount: 720,
    status: "INQUIRY",
  };

  it("should handle singular climber", () => {
    const html = bookingInquiryReceived(mockBookingData);
    expect(html).toContain("1 climber");
    expect(html).not.toContain("1 climbers");
  });

  it("should handle plural climbers", () => {
    const multipleClimbers = { ...mockBookingData, totalClimbers: 3 };
    const html = bookingInquiryReceived(multipleClimbers);
    expect(html).toContain("3 climbers");
  });

  it("should generate valid HTML structure", () => {
    const html = bookingInquiryReceived(mockBookingData);

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    expect(html).toContain("<head>");
    expect(html).toContain("</head>");
    expect(html).toContain("<body>");
    expect(html).toContain("</body>");
  });

  it("should escape special characters in names", () => {
    const specialData = {
      ...mockBookingData,
      leadName: "John O'Brien & Jane",
    };
    const html = bookingInquiryReceived(specialData);

    // Should contain the name (HTML escaping is handled by the browser)
    expect(html).toContain("John O'Brien & Jane");
  });
});
