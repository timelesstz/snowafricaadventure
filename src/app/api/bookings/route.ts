import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { revalidateDeparturePages } from "@/lib/revalidate-public";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { BOT_FLAG_PREFIX, SPOT_HOLDING_STATUSES, countBookedSpots } from "@/lib/booking-spots";
import { sendBookingInquiryEmails } from "@/lib/email/send";
import { BookingEmailData } from "@/lib/email/templates";
import { createCommission, determineTripType } from "@/lib/commission";
import { BookingNotifications, LeadNotifications } from "@/lib/notifications";
import { HONEYPOT_AUTOFILL_FLAG, isPlausibleHoneypotLead } from "@/lib/notifications/lead-safety";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { extractVisitorData } from "@/lib/visitor-tracking";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";
import {
  checkFormToken,
  consumeFormToken,
  FORM_TOKEN_FLAG,
  isHardFail,
  isSoftFail,
} from "@/lib/form-guard";
import { TURNSTILE_FLAG, verifyTurnstile } from "@/lib/turnstile";
import { DEPOSIT_RATE } from "@/lib/constants";
import { effectivePrice, isDepartureBookable } from "@/lib/departure-rules";

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
  // Spam-check token from GET /api/form-token/ (see lib/form-guard.ts)
  formToken: z.string().max(200).nullish(),
  // Cloudflare Turnstile response (see lib/turnstile.ts)
  turnstileToken: z.string().max(2048).nullish(),
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
    // hit is never silently discarded — dropping a real booking is worse than
    // one spam row. It is triaged after validation below.
    const honeypotTripped = Boolean(body.website);
    if (honeypotTripped) body.website = "";

    // Validate input
    const validatedData = bookingSchema.parse(body);

    // Spam-check token: a forged, replayed or too-fast token is a bot. A
    // missing or expired one may be a real visitor, so it is triaged below.
    const guard = checkFormToken(validatedData.formToken);
    // Cloudflare Turnstile: a failed challenge is spam; no token or a spent
    // one is triaged; an outage or a disabled check changes nothing.
    const turnstile = await verifyTurnstile(validatedData.turnstileToken, ip);
    const hardFail = isHardFail(guard) || turnstile === "failed";
    const softFail = isSoftFail(guard) || turnstile === "missing" || turnstile === "spent";
    const needsTriage = honeypotTripped || softFail;

    // A triaged request that looks human (real name and email, no links or SEO
    // pitch in the special requests, a real browser) is handled as a normal
    // booking with a verify note; anything else is saved bot-flagged and
    // nobody is notified.
    const triagedPlausible =
      needsTriage &&
      !hardFail &&
      isPlausibleHoneypotLead({
        email: validatedData.leadEmail,
        name: validatedData.leadName,
        message: validatedData.specialRequests,
        hasTripFields: true, // departure + climbers are required fields
        userAgent: request.headers.get("user-agent"),
      });
    const isBot = hardFail || (needsTriage && !triagedPlausible);
    const verifyFlag = triagedPlausible
      ? honeypotTripped
        ? HONEYPOT_AUTOFILL_FLAG
        : isSoftFail(guard)
          ? FORM_TOKEN_FLAG
          : TURNSTILE_FLAG
      : undefined;
    const botReason = honeypotTripped
      ? "hidden form field was filled"
      : guard !== "ok"
        ? `spam-check token ${guard}`
        : `Turnstile ${turnstile}`;
    if (needsTriage || hardFail) {
      console.warn(
        `[Booking] Spam check (ip: ${ip || "unknown"}, email: ${validatedData.leadEmail}, honeypot: ${honeypotTripped}, token: ${guard}, turnstile: ${turnstile}) — ${isBot ? "saving bot-flagged" : "looks human, saving with verify note"}`
      );
    }

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

    // Stale tabs, old share links and direct POSTs must not book a departure
    // that is cancelled, full, completed or already under way.
    if (!isDepartureBookable(departure)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This departure is no longer open for booking. Please choose another date or contact us.",
        },
        { status: 409 }
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
    // Same rule as the public page and form: the active early-bird price,
    // else the full price, so the quote matches what the climber saw.
    const pricePerPerson = effectivePrice(departure);
    const totalPrice = pricePerPerson * totalClimbers;
    const depositAmount = Math.round(totalPrice * DEPOSIT_RATE);

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
        notes: isBot
          ? `${BOT_FLAG_PREFIX}: possible bot — ${botReason}]${validatedData.specialRequests ? `\n${validatedData.specialRequests}` : ""}`
          : verifyFlag
            ? `${verifyFlag}${validatedData.specialRequests ? `\n${validatedData.specialRequests}` : ""}`
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

    if (guard === "ok") consumeFormToken(validatedData.formToken);

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
        timeZone: "UTC",
      }),
      summitDate: departure.summitDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
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

    // Requests count toward the seats-left shown on the page, so refresh it now
    // instead of waiting for the 60-second revalidation.
    revalidateDeparturePages();

    // Commission, newsletter, emails, and notification all run after the
    // response is sent — after() keeps the serverless function alive
    // (waitUntil), so slow SMTP can't delay or kill the user-facing response,
    // and the commission write is guaranteed to complete (it was previously
    // fire-and-forget and could be dropped when the function froze).
    if (!isBot) {
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
        let adminEmailError: string | null = null;
        if (emailResult.status === "fulfilled") {
          if (!emailResult.value.customer.success) {
            console.error("[Booking] Customer email failed:", emailResult.value.customer.error);
          }
          if (!emailResult.value.admin.success) {
            adminEmailError = emailResult.value.admin.error || "Unknown error";
            console.error("[Booking] Admin email failed:", emailResult.value.admin.error);
          }
        } else {
          adminEmailError =
            emailResult.reason instanceof Error ? emailResult.reason.message : String(emailResult.reason);
          console.error("Failed to send booking emails:", emailResult.reason);
        }
        if (notifResult.status === "rejected") {
          console.error("Failed to create booking notification:", notifResult.reason);
        }

        // The owner must hear about a booking even when SMTP is down. The
        // daily lead-followup cron also retries the admin email once.
        if (adminEmailError) {
          try {
            await LeadNotifications.emailFailed({
              leadType: "booking",
              leadId: booking.id,
              name: booking.leadName,
              error: adminEmailError,
            });
          } catch (notifError) {
            console.error("Failed to create email-failed notification:", notifError);
          }
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
