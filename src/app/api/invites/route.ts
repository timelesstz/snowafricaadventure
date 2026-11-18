import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { countBookedSpots, seatDisplayBookingWhere } from "@/lib/booking-spots";
import { sendEmail } from "@/lib/email";
import { departureInvite } from "@/lib/email/templates";
import { nanoid } from "nanoid";
import { SITE_CONFIG } from "@/lib/constants";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";
import { effectivePrice, isDepartureBookable } from "@/lib/departure-rules";
import { hasNoLinks, isSingleLinePlainText } from "@/lib/email/visitor-text";

const nameField = (label: string, min: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} character${min > 1 ? "s" : ""}`)
    .max(80, `${label} is too long`)
    .refine(isSingleLinePlainText, `${label} contains characters we can't use`)
    .refine(hasNoLinks, `${label} can't contain links`);

const inviteSchema = z.object({
  departureId: z.string().max(50),
  creatorName: nameField("Your name", 2),
  creatorEmail: z.string().email("Invalid email address").max(320),
  invitees: z.array(z.object({
    name: nameField("Friend's name", 1),
    email: z.string().email("Invalid email address").max(320),
  })).min(1, "At least one invitee is required").max(5, "Maximum 5 invitees allowed"),
  personalMessage: z
    .string()
    .trim()
    .max(500, "Keep the message under 500 characters")
    .refine(hasNoLinks, "Please leave links out of the message")
    .optional(),
});

/**
 * Send limits kept in the database, so they hold across every server
 * instance (the in-memory IP limiter resets whenever a new instance starts).
 */
const INVITE_LIMITS = {
  perSenderPerDay: 3,
  perRecipientPerDay: 2,
  sitewidePerHour: 30,
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit — this endpoint sends branded emails to arbitrary addresses,
    // so an unthrottled caller could abuse it as a spam relay.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip && isRateLimited(`invite:${ip}`, RATE_LIMITS.formSubmission)) {
      return NextResponse.json(
        { success: false, error: "Too many invitations sent. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = inviteSchema.parse(body);
    const creatorEmail = validatedData.creatorEmail.toLowerCase();
    const inviteeEmails = [...new Set(validatedData.invitees.map((i) => i.email.toLowerCase()))];

    const now = Date.now();
    const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const hourAgo = new Date(now - 60 * 60 * 1000);
    const [bySender, toRecipients, sitewide] = await Promise.all([
      prisma.inviteLink.count({ where: { creatorEmail, createdAt: { gte: dayAgo } } }),
      prisma.inviteLink.count({
        where: { createdAt: { gte: dayAgo }, inviteeEmails: { hasSome: inviteeEmails } },
      }),
      prisma.inviteLink.count({ where: { createdAt: { gte: hourAgo } } }),
    ]);
    if (
      bySender >= INVITE_LIMITS.perSenderPerDay ||
      toRecipients >= INVITE_LIMITS.perRecipientPerDay ||
      sitewide >= INVITE_LIMITS.sitewidePerHour
    ) {
      console.warn("[Invite] Send limit reached", { bySender, toRecipients, sitewide });
      return NextResponse.json(
        {
          success: false,
          error: "We can't send more invitations right now. Please share the page link with your friends instead.",
        },
        { status: 429 }
      );
    }

    // Get departure details
    const departure = await prisma.groupDeparture.findUnique({
      where: { id: validatedData.departureId },
      include: {
        route: {
          select: {
            title: true,
            slug: true,
          },
        },
        bookings: {
          where: seatDisplayBookingWhere(),
          select: {
            totalClimbers: true,
          },
        },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { success: false, error: "Departure not found" },
        { status: 404 }
      );
    }

    // Only allow invites to departures that are actually bookable
    if (!isDepartureBookable(departure)) {
      return NextResponse.json(
        { success: false, error: "This departure is no longer open for booking." },
        { status: 400 }
      );
    }

    // Generate unique invite code
    const code = nanoid(10);

    // Create invite link record
    const inviteLink = await prisma.inviteLink.create({
      data: {
        code,
        departureId: validatedData.departureId,
        creatorEmail,
        creatorName: validatedData.creatorName,
        inviteeEmails,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    const bookedSpots = countBookedSpots(departure.bookings);
    const availableSpots = Math.max(0, departure.maxParticipants - bookedSpots);

    // Build invite URL
    const inviteUrl = `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/?invite=${code}&departure=${departure.id}`;

    // Send invite emails sequentially to avoid SMTP concurrency issues
    for (const invitee of validatedData.invitees) {
      await sendEmail({
        to: invitee.email,
        subject: `${validatedData.creatorName} invited you to climb Kilimanjaro!`,
        html: departureInvite({
          inviterName: validatedData.creatorName,
          inviteeName: invitee.name,
          routeName: departure.route.title,
          arrivalDate: departure.arrivalDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }),
          endDate: departure.endDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }),
          price: effectivePrice(departure),
          availableSpots,
          isFullMoon: departure.isFullMoon,
          inviteUrl,
          personalMessage: validatedData.personalMessage,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Invitations sent successfully",
      inviteCode: code,
      inviteCount: validatedData.invitees.length,
    });
  } catch (error) {
    console.error("Error processing invite:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          // The invite modal shows `error` as is, so send the first readable reason.
          error: error.issues[0]?.message ?? "Please check the form and try again.",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send invitations. Please try again later.",
      },
      { status: 500 }
    );
  }
}
