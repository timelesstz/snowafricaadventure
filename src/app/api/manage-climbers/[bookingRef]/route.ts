import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { sendClimberDetailsCompletedEmail } from "@/lib/email/send";
import { ClimberNotifications } from "@/lib/notifications";

// GET /api/manage-climbers/[bookingRef] - Get booking data for lead to manage climbers
// Requires email verification via query param
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingRef: string }> }
) {
  const { bookingRef } = await params;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email verification required" },
      { status: 401 }
    );
  }

  try {
    // Find booking by reference (last 8 chars of ID) and lead email
    const bookings = await prisma.booking.findMany({
      where: {
        leadEmail: email.toLowerCase(),
      },
      include: {
        departure: {
          include: {
            route: {
              select: { title: true, slug: true, durationDays: true },
            },
          },
        },
        climberTokens: {
          orderBy: { climberIndex: "asc" },
        },
      },
    });

    // Find the booking that matches the ref
    const booking = bookings.find(
      (b) => b.id.slice(-8).toUpperCase() === bookingRef.toUpperCase()
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found or email does not match" },
        { status: 404 }
      );
    }

    // Parse climber details
    const climberDetails = (booking.climberDetails as Array<{
      name?: string;
      email?: string;
      phone?: string;
      nationality?: string;
      passportNumber?: string;
      dateOfBirth?: string;
      dietaryRequirements?: string;
      medicalConditions?: string;
      isComplete?: boolean;
    }>) || [];

    // Build climber status list
    const climbers = [];

    // Lead climber (index 0)
    climbers.push({
      index: 0,
      isLead: true,
      name: climberDetails[0]?.name || booking.leadName,
      email: climberDetails[0]?.email || booking.leadEmail,
      isComplete: climberDetails[0]?.isComplete ?? true, // Lead details from form are considered complete
      token: null, // Lead doesn't have a token
      details: climberDetails[0] || null,
    });

    // Other climbers
    for (let i = 1; i < booking.totalClimbers; i++) {
      const token = booking.climberTokens.find((t) => t.climberIndex === i);
      const details = climberDetails[i] || null;

      climbers.push({
        index: i,
        isLead: false,
        name: details?.name || token?.climberName || null,
        email: details?.email || token?.email || null,
        isComplete: token?.isCompleted || details?.isComplete || false,
        token: token ? { code: token.code, expiresAt: token.expiresAt } : null,
        details,
      });
    }

    const completedCount = climbers.filter((c) => c.isComplete).length;

    return NextResponse.json({
      success: true,
      data: {
        bookingRef: booking.id.slice(-8).toUpperCase(),
        bookingId: booking.id,
        leadName: booking.leadName,
        leadEmail: booking.leadEmail,
        totalClimbers: booking.totalClimbers,
        completedCount,
        depositPaid: booking.depositPaid,
        route: {
          name: booking.departure.route.title,
          slug: booking.departure.route.slug,
          duration: booking.departure.route.durationDays,
        },
        departure: {
          arrivalDate: booking.departure.arrivalDate.toISOString(),
          endDate: booking.departure.endDate.toISOString(),
        },
        climbers,
      },
    });
  } catch (error) {
    console.error("Error fetching booking for management:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PUT /api/manage-climbers/[bookingRef] - Update climber details (lead filling for others)
const updateClimberSchema = z.object({
  climberIndex: z.number().min(0).max(9),
  details: z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().optional(),
    nationality: z.string().optional(),
    passportNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    dietaryRequirements: z.string().optional(),
    medicalConditions: z.string().optional(),
    subscribeNewsletter: z.boolean().optional(),
  }),
  leadEmail: z.string().email(), // For verification
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ bookingRef: string }> }
) {
  const { bookingRef } = await params;

  try {
    const body = await request.json();
    const validatedData = updateClimberSchema.parse(body);

    // Find booking
    const bookings = await prisma.booking.findMany({
      where: {
        leadEmail: validatedData.leadEmail.toLowerCase(),
      },
      include: {
        departure: {
          include: {
            route: { select: { title: true } },
          },
        },
        climberTokens: true,
      },
    });

    const booking = bookings.find(
      (b) => b.id.slice(-8).toUpperCase() === bookingRef.toUpperCase()
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found or email does not match" },
        { status: 404 }
      );
    }

    // Validate climber index
    if (validatedData.climberIndex >= booking.totalClimbers) {
      return NextResponse.json(
        { success: false, error: "Invalid climber index" },
        { status: 400 }
      );
    }

    // Update climber details
    const currentClimberDetails = (booking.climberDetails as Array<Record<string, unknown>>) || [];

    // Ensure array is properly sized
    while (currentClimberDetails.length <= validatedData.climberIndex) {
      currentClimberDetails.push({});
    }

    // Update the specific climber's details
    currentClimberDetails[validatedData.climberIndex] = {
      ...currentClimberDetails[validatedData.climberIndex],
      name: validatedData.details.name,
      email: validatedData.details.email,
      phone: validatedData.details.phone || null,
      nationality: validatedData.details.nationality || null,
      passportNumber: validatedData.details.passportNumber || null,
      dateOfBirth: validatedData.details.dateOfBirth || null,
      dietaryRequirements: validatedData.details.dietaryRequirements || null,
      medicalConditions: validatedData.details.medicalConditions || null,
      isComplete: true,
      completedAt: new Date().toISOString(),
      completedBy: "lead", // Mark that lead filled this
    };

    // Update booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: { climberDetails: currentClimberDetails as unknown as Prisma.InputJsonValue },
    });

    // If there's a token for this climber, mark it as completed
    const token = booking.climberTokens.find(
      (t) => t.climberIndex === validatedData.climberIndex
    );
    if (token && !token.isCompleted) {
      await prisma.climberToken.update({
        where: { id: token.id },
        data: {
          isCompleted: true,
          completedAt: new Date(),
          climberName: validatedData.details.name,
          email: validatedData.details.email,
        },
      });
    }

    // Subscribe to newsletter if opted in
    if (validatedData.details.subscribeNewsletter) {
      subscribeToNewsletter({
        email: validatedData.details.email,
        name: validatedData.details.name,
        source: "climber_form",
        bookingId: booking.id,
      }).catch((error) => {
        console.error("Failed to subscribe to newsletter:", error);
      });
    }

    // Count completed climbers
    const completedCount = currentClimberDetails.filter(
      (c) => (c as { isComplete?: boolean })?.isComplete
    ).length;

    // Send notification to admin
    sendClimberDetailsCompletedEmail({
      bookingRef: booking.id.slice(-8).toUpperCase(),
      climberName: validatedData.details.name,
      climberIndex: validatedData.climberIndex,
      routeName: booking.departure.route.title,
      departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      totalClimbers: booking.totalClimbers,
      completedCount,
    }).catch((error) => {
      console.error("Failed to send completion email:", error);
    });

    // Create in-app notification
    ClimberNotifications.detailsCompleted({
      bookingId: booking.id,
      climberName: validatedData.details.name,
      climberIndex: validatedData.climberIndex,
      totalClimbers: booking.totalClimbers,
      completedCount,
    }).catch((error) => {
      console.error("Failed to create notification:", error);
    });

    return NextResponse.json({
      success: true,
      message: "Climber details updated",
      data: { completedCount, totalClimbers: booking.totalClimbers },
    });
  } catch (error) {
    console.error("Error updating climber details:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update details" },
      { status: 500 }
    );
  }
}
