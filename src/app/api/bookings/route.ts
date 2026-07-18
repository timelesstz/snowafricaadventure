import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { SPOT_HOLDING_STATUSES, countBookedSpots } from "@/lib/booking-spots";
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

// Allow time for post-response email delivery via after() on slow SMTP
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP. When no client IP is resolvable (rare outside Vercel),
    // skip limiting — a shared "unknown" bucket would lock out all such users.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip && isRateLimited(`booking:${ip}`, RATE_LIMITS.formSubmission)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: browser autofill can occasionally fill the hidden field, so a
    // hit is saved with a flag in the notes (recoverable in admin) rather than
    // silently discarded — dropping a real booking is worse than one spam row.
    const honeypotTripped = Boolean(body.website);
    if (honeypotTripped) {
      console.warn(`[Booking] Honeypot tripped (ip: ${ip || "unknown"}, email: ${body.leadEmail || "?"}) — saving flagged`);
      body.website = "";
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

    // Check availability against seats actually held (paid/confirmed) so the
    // check agrees with what the public page displays.
    const existingBookings = await prisma.booking.findMany({
      where: {
        departureId: departure.id,
        status: { in: SPOT_HOLDING_STATUSES },
      },
      select: {
        totalClimbers: true,
      },
    });

    const totalClimbers = validatedData.climbers.length;
    const bookedSpots = countBookedSpots(existingBookings);
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
        notes: honeypotTripped
          ? `[FLAGGED: possible bot — hidden form field was filled]${validatedData.specialRequests ? `\n${validatedData.specialRequests}` : ""}`
          : validatedData.specialRequests || null,
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

    // Commission, newsletter, emails, and notification all run after the
    // response is sent — after() keeps the serverless function alive
    // (waitUntil), so slow SMTP can't delay or kill the user-facing response,
    // and the commission write is guaranteed to complete (it was previously
    // fire-and-forget and could be dropped when the function froze).
    if (!honeypotTripped) {
      after(async () => {
        const [commissionResult, newsletterResult, emailResult, notifResult] = await Promise.allSettled([
          // Derive tripType from the route so Mt Meru or any future
          // non-Kilimanjaro trekking routes pick up the correct commission rate.
          createCommission({
            bookingId: booking.id,
            bookingAmount: totalPrice,
            tripType: determineTripType({ routeSlug: booking.departure?.route?.slug }),
          }),
          validatedData.subscribeNewsletter
            ? subscribeToNewsletter({
                email: validatedData.leadEmail,
                name: validatedData.leadName,
                source: "booking",
                bookingId: booking.id,
              })
            : Promise.resolve(null),
          sendBookingInquiryEmails(emailData),
          BookingNotifications.newBooking({
            bookingId: booking.id,
            leadName: booking.leadName,
            routeTitle: departure.route.title,
            totalPrice,
          }),
        ]);

        if (commissionResult.status === "rejected") {
          console.error("Failed to create commission:", commissionResult.reason);
        }
        if (newsletterResult.status === "rejected") {
          console.error("Failed to subscribe to newsletter:", newsletterResult.reason);
        }
        if (emailResult.status === "fulfilled") {
          if (!emailResult.value.customer.success) {
            console.error("[Booking] Customer email failed:", emailResult.value.customer.error);
          }
          if (!emailResult.value.admin.success) {
            console.error("[Booking] Admin email failed:", emailResult.value.admin.error);
          }
        } else {
          console.error("Failed to send booking emails:", emailResult.reason);
        }
        if (notifResult.status === "rejected") {
          console.error("Failed to create booking notification:", notifResult.reason);
        }
      });
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
