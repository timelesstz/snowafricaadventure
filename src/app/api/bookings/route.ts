import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { sendBookingInquiryEmails } from "@/lib/email/send";
import { BookingEmailData } from "@/lib/email/templates";
import { createCommission, determineTripType } from "@/lib/commission";
import { BookingNotifications } from "@/lib/notifications";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { extractVisitorData } from "@/lib/visitor-tracking";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";

// Climber schema - now supports partial data for non-lead climbers
const climberSchema = z.object({
  name: z.string().min(0).max(200),
  email: z.string().email().max(320).optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  nationality: z.string().max(100).optional(),
  passportNumber: z.string().max(50).optional(),
  dateOfBirth: z.string().max(30).optional(),
  dietaryRequirements: z.string().max(500).optional(),
  medicalConditions: z.string().max(1000).optional(),
  isComplete: z.boolean().optional(),
});

// Booking submission schema with max-length limits
const bookingSchema = z.object({
  departureId: z.string().min(1, "Departure is required").max(50),
  leadName: z.string().min(2, "Lead name is required").max(200),
  leadEmail: z.string().email("Valid email is required").max(320),
  leadPhone: z.string().max(30).optional(),
  climbers: z.array(climberSchema).min(1, "At least one climber is required").max(10),
  specialRequests: z.string().max(5000).optional(),
  partnerCode: z.string().max(100).optional(),
  subscribeNewsletter: z.boolean().optional(),
  // Honeypot field
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  // Client-side tracking fields (nullish: client sends null when unavailable)
  gaClientId: z.string().max(100).nullish(),
  utmSource: z.string().max(200).nullish(),
  utmMedium: z.string().max(200).nullish(),
  utmCampaign: z.string().max(200).nullish(),
  referrerUrl: z.string().max(2000).nullish(),
  landingPage: z.string().max(2000).nullish(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(`booking:${ip}`, RATE_LIMITS.formSubmission)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — reject if the hidden field is filled
    if (body.website) {
      return NextResponse.json(
        { success: true, message: "Booking inquiry submitted successfully!", bookingId: "ok", bookingRef: "OK" },
        { status: 201 }
      );
    }

    // Validate input
    const validatedData = bookingSchema.parse(body);

    // Get departure details
    const departure = await prisma.groupDeparture.findUnique({
      where: { id: validatedData.departureId },
      include: {
        route: {
          select: { title: true, slug: true },
        },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { success: false, message: "Departure not found" },
        { status: 404 }
      );
    }

    // Check availability - sum total climbers from all active bookings
    const existingBookings = await prisma.booking.findMany({
      where: {
        departureId: departure.id,
        status: {
          notIn: [BookingStatus.CANCELLED],
        },
      },
      select: {
        totalClimbers: true,
      },
    });

    const totalClimbers = validatedData.climbers.length;
    const bookedSpots = existingBookings.reduce(
      (sum, booking) => sum + booking.totalClimbers,
      0
    );
    const availableSpots = departure.maxParticipants - bookedSpots;

    if (totalClimbers > availableSpots) {
      return NextResponse.json(
        {
          success: false,
          message: `Only ${availableSpots} spots available. Please reduce your group size.`,
        },
        { status: 400 }
      );
    }

    // Calculate pricing
    const pricePerPerson = Number(departure.price);
    const totalPrice = pricePerPerson * totalClimbers;
    const depositAmount = Math.round(totalPrice * 0.1); // 10% deposit

    // Extract visitor tracking from request headers
    const visitor = extractVisitorData(request);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        departureId: departure.id,
        leadName: validatedData.leadName,
        leadEmail: validatedData.leadEmail,
        leadPhone: validatedData.leadPhone || null,
        totalClimbers,
        pricePerPerson,
        totalPrice,
        depositAmount,
        status: BookingStatus.INQUIRY,
        climberDetails: validatedData.climbers,
        notes: validatedData.specialRequests || null,
        source: validatedData.partnerCode ? 'referral' : 'website',
        // Server-side tracking
        ipAddress: visitor.ipAddress,
        country: visitor.country,
        countryCode: visitor.countryCode,
        city: visitor.city,
        region: visitor.region,
        userAgent: visitor.userAgent,
        device: visitor.device,
        browser: visitor.browser,
        // Client-side tracking
        gaClientId: validatedData.gaClientId || null,
        utmSource: validatedData.utmSource || null,
        utmMedium: validatedData.utmMedium || null,
        utmCampaign: validatedData.utmCampaign || null,
        referrerUrl: validatedData.referrerUrl || null,
        landingPage: validatedData.landingPage || null,
      },
      include: {
        departure: {
          include: {
            route: { select: { title: true, slug: true } },
          },
        },
      },
    });

    // Create commission for marketing partner (non-blocking).
    // Derive tripType from the route so Mt Meru or any future non-Kilimanjaro
    // trekking routes pick up the correct commission rate automatically.
    createCommission({
      bookingId: booking.id,
      bookingAmount: totalPrice,
      tripType: determineTripType({ routeSlug: booking.departure?.route?.slug }),
    }).catch((error) => {
      console.error("Failed to create commission:", error);
    });

    // Subscribe lead to newsletter if opted in (non-blocking)
    if (validatedData.subscribeNewsletter) {
      subscribeToNewsletter({
        email: validatedData.leadEmail,
        name: validatedData.leadName,
        source: "booking",
        bookingId: booking.id,
      }).catch((error) => {
        console.error("Failed to subscribe to newsletter:", error);
      });
    }

    // Prepare email data
    const emailData: BookingEmailData = {
      bookingId: booking.id,
      leadName: booking.leadName,
      leadEmail: booking.leadEmail,
      routeTitle: booking.departure.route.title,
      departureDate: departure.arrivalDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      summitDate: departure.summitDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      totalClimbers: booking.totalClimbers,
      totalPrice: Number(booking.totalPrice),
      depositAmount: Number(booking.depositAmount),
      status: booking.status,
      climbers: validatedData.climbers.map((c) => ({
        name: c.name,
        nationality: c.nationality,
      })),
    };

    // Send confirmation emails and create notification
    // Must await to prevent Vercel serverless from terminating before completion
    const [emailResult, notifResult] = await Promise.allSettled([
      sendBookingInquiryEmails(emailData),
      BookingNotifications.newBooking({
        bookingId: booking.id,
        leadName: booking.leadName,
        routeTitle: departure.route.title,
        totalPrice,
      }),
    ]);

    // Build email status for response (matches inquiry route pattern)
    let emailStatus = { customer: false, admin: false, error: "" };
    if (emailResult.status === "fulfilled") {
      emailStatus.customer = emailResult.value.customer.success;
      emailStatus.admin = emailResult.value.admin.success;
      if (!emailResult.value.customer.success) {
        emailStatus.error = `Customer: ${emailResult.value.customer.error}`;
      }
      if (!emailResult.value.admin.success) {
        emailStatus.error += `${emailStatus.error ? "; " : ""}Admin: ${emailResult.value.admin.error}`;
      }
    } else {
      emailStatus.error = `Email sending failed: ${emailResult.reason}`;
      console.error("Failed to send booking emails:", emailResult.reason);
    }
    if (notifResult.status === "rejected") {
      console.error("Failed to create booking notification:", notifResult.reason);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking inquiry submitted successfully!",
        bookingId: booking.id,
        bookingRef: booking.id.slice(-8).toUpperCase(),
        summary: {
          route: departure.route.title,
          departureDate: departure.arrivalDate.toISOString(),
          climbers: totalClimbers,
          totalPrice,
          depositAmount,
        },
        emailStatus,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing booking:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking. Please try again later.",
      },
      { status: 500 }
    );
  }
}
