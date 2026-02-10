import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { sendClimberDetailsCompletedEmail } from "@/lib/email/send";
import { ClimberNotifications } from "@/lib/notifications";

// Climber details submission schema
const climberDetailsSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  medicalConditions: z.string().optional(),
  subscribeNewsletter: z.boolean().optional(),
});

// GET /api/climber-details/[token] - Get booking context for token
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    const climberToken = await prisma.climberToken.findUnique({
      where: { code: token },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                route: {
                  select: { title: true, slug: true, durationDays: true },
                },
              },
            },
          },
        },
      },
    });

    if (!climberToken) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 404 }
      );
    }

    // Check if token is expired
    if (new Date() > climberToken.expiresAt) {
      return NextResponse.json(
        { success: false, error: "Token has expired" },
        { status: 410 }
      );
    }

    // Check if already completed
    if (climberToken.isCompleted) {
      return NextResponse.json(
        { success: false, error: "Details already submitted", alreadyCompleted: true },
        { status: 400 }
      );
    }

    // Get existing climber details if any
    const climberDetails = climberToken.booking.climberDetails as Array<{
      name?: string;
      email?: string;
      phone?: string;
      nationality?: string;
      passportNumber?: string;
      dateOfBirth?: string;
      dietaryRequirements?: string;
      medicalConditions?: string;
      isComplete?: boolean;
    }> | null;

    const existingDetails = climberDetails?.[climberToken.climberIndex] || {};

    return NextResponse.json({
      success: true,
      data: {
        climberIndex: climberToken.climberIndex,
        climberName: climberToken.climberName,
        existingDetails: {
          name: existingDetails.name || climberToken.climberName || "",
          email: existingDetails.email || climberToken.email || "",
          phone: existingDetails.phone || "",
          nationality: existingDetails.nationality || "",
          passportNumber: existingDetails.passportNumber || "",
          dateOfBirth: existingDetails.dateOfBirth || "",
          dietaryRequirements: existingDetails.dietaryRequirements || "",
          medicalConditions: existingDetails.medicalConditions || "",
        },
        booking: {
          leadName: climberToken.booking.leadName,
          routeName: climberToken.booking.departure.route.title,
          routeSlug: climberToken.booking.departure.route.slug,
          routeDuration: climberToken.booking.departure.route.durationDays,
          departureDate: climberToken.booking.departure.arrivalDate.toISOString(),
          summitDate: climberToken.booking.departure.summitDate?.toISOString(),
          endDate: climberToken.booking.departure.endDate.toISOString(),
          totalClimbers: climberToken.booking.totalClimbers,
        },
        expiresAt: climberToken.expiresAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching climber token:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch details" },
      { status: 500 }
    );
  }
}

// PUT /api/climber-details/[token] - Submit climber details
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    const body = await request.json();
    const validatedData = climberDetailsSchema.parse(body);

    // Find and validate token
    const climberToken = await prisma.climberToken.findUnique({
      where: { code: token },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                route: { select: { title: true } },
              },
            },
            climberTokens: true,
          },
        },
      },
    });

    if (!climberToken) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 404 }
      );
    }

    if (new Date() > climberToken.expiresAt) {
      return NextResponse.json(
        { success: false, error: "Token has expired" },
        { status: 410 }
      );
    }

    if (climberToken.isCompleted) {
      return NextResponse.json(
        { success: false, error: "Details already submitted" },
        { status: 400 }
      );
    }

    // Update climber details in booking
    const currentClimberDetails = (climberToken.booking.climberDetails as Array<Record<string, unknown>>) || [];

    // Ensure array is properly sized
    while (currentClimberDetails.length <= climberToken.climberIndex) {
      currentClimberDetails.push({});
    }

    // Update the specific climber's details
    currentClimberDetails[climberToken.climberIndex] = {
      ...currentClimberDetails[climberToken.climberIndex],
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      nationality: validatedData.nationality || null,
      passportNumber: validatedData.passportNumber || null,
      dateOfBirth: validatedData.dateOfBirth || null,
      dietaryRequirements: validatedData.dietaryRequirements || null,
      medicalConditions: validatedData.medicalConditions || null,
      isComplete: true,
      completedAt: new Date().toISOString(),
    };

    // Update booking and mark token as completed
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: climberToken.bookingId },
        data: { climberDetails: currentClimberDetails as unknown as Prisma.InputJsonValue },
      }),
      prisma.climberToken.update({
        where: { id: climberToken.id },
        data: {
          isCompleted: true,
          completedAt: new Date(),
          climberName: validatedData.name,
          email: validatedData.email,
        },
      }),
    ]);

    // Subscribe to newsletter if opted in
    if (validatedData.subscribeNewsletter) {
      subscribeToNewsletter({
        email: validatedData.email,
        name: validatedData.name,
        source: "climber_form",
        bookingId: climberToken.bookingId,
      }).catch((error) => {
        console.error("Failed to subscribe to newsletter:", error);
      });
    }

    // Count completed climbers
    const completedCount = climberToken.booking.climberTokens.filter((t) => t.isCompleted).length + 1; // +1 for this one
    const leadIsComplete = (currentClimberDetails[0] as { isComplete?: boolean })?.isComplete ? 1 : 0;
    const totalComplete = completedCount + leadIsComplete;

    // Send notification to admin
    sendClimberDetailsCompletedEmail({
      bookingRef: climberToken.booking.id.slice(-8).toUpperCase(),
      climberName: validatedData.name,
      climberIndex: climberToken.climberIndex,
      routeName: climberToken.booking.departure.route.title,
      departureDate: climberToken.booking.departure.arrivalDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      totalClimbers: climberToken.booking.totalClimbers,
      completedCount: totalComplete,
    }).catch((error) => {
      console.error("Failed to send completion email:", error);
    });

    // Create in-app notification
    ClimberNotifications.detailsCompleted({
      bookingId: climberToken.bookingId,
      climberName: validatedData.name,
      climberIndex: climberToken.climberIndex,
      totalClimbers: climberToken.booking.totalClimbers,
      completedCount: totalComplete,
    }).catch((error) => {
      console.error("Failed to create notification:", error);
    });

    return NextResponse.json({
      success: true,
      message: "Details submitted successfully",
      data: {
        completedCount: totalComplete,
        totalClimbers: climberToken.booking.totalClimbers,
      },
    });
  } catch (error) {
    console.error("Error submitting climber details:", error);

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
      { success: false, error: "Failed to submit details" },
      { status: 500 }
    );
  }
}
