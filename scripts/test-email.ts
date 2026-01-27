/**
 * Email Testing Script
 *
 * Usage: npx tsx scripts/test-email.ts
 *
 * Tests the email system by sending test emails.
 * Make sure to set SMTP environment variables before running.
 */

import { sendEmail } from "../src/lib/email/index";
import {
  bookingInquiryReceived,
  bookingConfirmed,
  inquiryReceived,
  adminNewBooking,
  BookingEmailData,
  InquiryEmailData,
} from "../src/lib/email/templates";

// Test data
const testBookingData: BookingEmailData = {
  bookingId: "test-booking-12345",
  leadName: "Test User",
  leadEmail: process.env.TEST_EMAIL || "test@example.com",
  routeTitle: "Machame Route - 7 Days",
  departureDate: "March 15, 2026",
  summitDate: "March 20, 2026",
  totalClimbers: 2,
  totalPrice: 4800,
  depositAmount: 1440,
  status: "INQUIRY",
  climbers: [
    { name: "Test User", nationality: "USA" },
    { name: "Test Partner", nationality: "UK" },
  ],
};

const testInquiryData: InquiryEmailData = {
  inquiryId: "test-inquiry-12345",
  fullName: "Safari Tester",
  email: process.env.TEST_EMAIL || "test@example.com",
  phone: "+1234567890",
  type: "safari",
  tripType: "Wildlife Safari - 5 Days",
  numAdults: 2,
  numChildren: 1,
  arrivalDate: "April 10, 2026",
  message: "We are interested in a wildlife safari including Serengeti and Ngorongoro Crater.",
};

async function runTests() {
  console.log("=".repeat(60));
  console.log("Snow Africa Adventure - Email System Test");
  console.log("=".repeat(60));
  console.log();

  const testEmail = process.env.TEST_EMAIL || "info@snowafricaadventure.com";
  console.log(`Target email: ${testEmail}`);
  console.log();

  // Check SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("Error: SMTP configuration is incomplete.");
    console.error("Please set the following environment variables:");
    console.error("  - SMTP_HOST");
    console.error("  - SMTP_USER");
    console.error("  - SMTP_PASS");
    console.error("  - TEST_EMAIL (optional, defaults to info@snowafricaadventure.com)");
    process.exit(1);
  }

  const tests = [
    {
      name: "Booking Inquiry Received (Customer)",
      send: () =>
        sendEmail({
          to: testEmail,
          subject: "[TEST] Booking Inquiry Received - Machame Route",
          html: bookingInquiryReceived(testBookingData),
        }),
    },
    {
      name: "Booking Confirmed (Customer)",
      send: () =>
        sendEmail({
          to: testEmail,
          subject: "[TEST] Booking Confirmed! - Machame Route",
          html: bookingConfirmed({ ...testBookingData, status: "CONFIRMED" }),
        }),
    },
    {
      name: "Inquiry Received (Customer)",
      send: () =>
        sendEmail({
          to: testEmail,
          subject: "[TEST] Thank you for your Safari inquiry",
          html: inquiryReceived(testInquiryData),
        }),
    },
    {
      name: "Admin New Booking Notification",
      send: () =>
        sendEmail({
          to: testEmail,
          subject: "[TEST] [Snow Africa Admin] New Booking: Machame Route",
          html: adminNewBooking(testBookingData),
        }),
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`Testing: ${test.name}... `);

    try {
      const result = await test.send();

      if (result.success) {
        console.log("✅ PASSED");
        console.log(`   Message ID: ${result.id}`);
        passed++;
      } else {
        console.log("❌ FAILED");
        console.log(`   Error: ${result.error}`);
        failed++;
      }
    } catch (error) {
      console.log("❌ FAILED");
      console.log(`   Exception: ${error instanceof Error ? error.message : "Unknown error"}`);
      failed++;
    }

    console.log();
  }

  console.log("=".repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(60));

  if (failed > 0) {
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error("Test script failed:", error);
  process.exit(1);
});
