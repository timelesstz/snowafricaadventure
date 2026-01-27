import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { departureInvite } from "@/lib/email/templates";
import { nanoid } from "nanoid";
import { SITE_CONFIG } from "@/lib/constants";

// Validation schema
const inviteSchema = z.object({
  departureId: z.string(),
  creatorName: z.string().min(2, "Name must be at least 2 characters"),
  creatorEmail: z.string().email("Invalid email address"),
  invitees: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
  })).min(1, "At least one invitee is required").max(5, "Maximum 5 invitees allowed"),
  personalMessage: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = inviteSchema.parse(body);

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
        _count: {
          select: { bookings: true },
        },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { success: false, error: "Departure not found" },
        { status: 404 }
      );
    }

    // Generate unique invite code
    const code = nanoid(10);

    // Create invite link record
    const inviteLink = await prisma.inviteLink.create({
      data: {
        code,
        departureId: validatedData.departureId,
        creatorEmail: validatedData.creatorEmail,
        creatorName: validatedData.creatorName,
        inviteeEmails: validatedData.invitees.map((i) => i.email),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Calculate available spots
    const availableSpots = departure.maxParticipants - departure._count.bookings;

    // Build invite URL
    const inviteUrl = `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/?invite=${code}&departure=${departure.id}`;

    // Send invite emails to all invitees
    const emailPromises = validatedData.invitees.map((invitee) =>
      sendEmail({
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
          }),
          endDate: departure.endDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          price: Number(departure.price),
          availableSpots,
          isFullMoon: departure.isFullMoon,
          inviteUrl,
          personalMessage: validatedData.personalMessage,
        }),
      })
    );

    await Promise.all(emailPromises);

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
          error: "Validation error",
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
