import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { sendClimberDetailsRequestEmail } from "@/lib/email/send";

// GET /api/admin/bookings/[id]/climber-tokens - List all climber tokens for a booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        departure: {
          include: {
            route: { select: { title: true } },
          },
        },
        climberTokens: {
          orderBy: { climberIndex: "asc" },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Parse climber details
    const climberDetails = (booking.climberDetails as Array<{
      name?: string;
      email?: string;
      isComplete?: boolean;
    }>) || [];

    // Build climber status with tokens
    const climbers = [];

    for (let i = 0; i < booking.totalClimbers; i++) {
      const token = booking.climberTokens.find((t) => t.climberIndex === i);
      const details = climberDetails[i] || null;

      climbers.push({
        index: i,
        isLead: i === 0,
        name: details?.name || token?.climberName || null,
        email: details?.email || token?.email || null,
        isComplete: token?.isCompleted || details?.isComplete || false,
        token: token
          ? {
              id: token.id,
              code: token.code,
              expiresAt: token.expiresAt,
              isCompleted: token.isCompleted,
              completedAt: token.completedAt,
              reminderSentAt: token.reminderSentAt,
              finalReminderSentAt: token.finalReminderSentAt,
            }
          : null,
      });
    }

    const completedCount = climbers.filter((c) => c.isComplete).length;

    return NextResponse.json({
      bookingId: booking.id,
      bookingRef: booking.id.slice(-8).toUpperCase(),
      leadName: booking.leadName,
      leadEmail: booking.leadEmail,
      totalClimbers: booking.totalClimbers,
      completedCount,
      depositPaid: booking.depositPaid,
      climbers,
    });
  } catch (error) {
    console.error("Error fetching climber tokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch climber tokens" },
      { status: 500 }
    );
  }
}

// POST /api/admin/bookings/[id]/climber-tokens - Generate tokens or resend emails
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { action, climberIndex, email } = body;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        departure: {
          include: {
            route: { select: { title: true } },
          },
        },
        climberTokens: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Action: generate - Generate tokens for climbers without tokens
    if (action === "generate") {
      const climberDetails = (booking.climberDetails as Array<{
        name?: string;
        email?: string;
        isComplete?: boolean;
      }>) || [];

      const tokensToCreate = [];
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      for (let i = 1; i < booking.totalClimbers; i++) {
        const existingToken = booking.climberTokens.find((t) => t.climberIndex === i);
        const climberData = climberDetails[i];

        // Only create token if no token exists and climber is not complete
        if (!existingToken && !climberData?.isComplete) {
          tokensToCreate.push({
            code: nanoid(10),
            bookingId: booking.id,
            climberIndex: i,
            climberName: climberData?.name || null,
            email: climberData?.email || null,
            expiresAt,
          });
        }
      }

      if (tokensToCreate.length > 0) {
        await prisma.climberToken.createMany({ data: tokensToCreate });
      }

      return NextResponse.json({
        success: true,
        message: `Created ${tokensToCreate.length} tokens`,
        tokensCreated: tokensToCreate.length,
      });
    }

    // Action: resend - Resend email for a specific climber
    if (action === "resend" && typeof climberIndex === "number") {
      const token = booking.climberTokens.find((t) => t.climberIndex === climberIndex);

      if (!token) {
        return NextResponse.json(
          { error: "Token not found for this climber" },
          { status: 404 }
        );
      }

      const recipientEmail = email || token.email;
      if (!recipientEmail) {
        return NextResponse.json(
          { error: "No email address provided" },
          { status: 400 }
        );
      }

      // Update token email if provided
      if (email && email !== token.email) {
        await prisma.climberToken.update({
          where: { id: token.id },
          data: { email },
        });
      }

      // Send email
      await sendClimberDetailsRequestEmail({
        type: "individual",
        recipientEmail,
        recipientName: token.climberName,
        leadName: booking.leadName,
        routeName: booking.departure.route.title,
        departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        token: token.code,
      });

      return NextResponse.json({
        success: true,
        message: `Email sent to ${recipientEmail}`,
      });
    }

    // Action: send_all - Send emails to all climbers with pending tokens
    if (action === "send_all") {
      const emailsData = body.emails as Array<{ climberIndex: number; email: string }> | undefined;
      let sentCount = 0;

      for (const token of booking.climberTokens) {
        if (token.isCompleted) continue;

        const emailData = emailsData?.find((e) => e.climberIndex === token.climberIndex);
        const recipientEmail = emailData?.email || token.email;

        if (!recipientEmail) continue;

        // Update email if provided
        if (emailData?.email && emailData.email !== token.email) {
          await prisma.climberToken.update({
            where: { id: token.id },
            data: { email: emailData.email },
          });
        }

        // Send email
        await sendClimberDetailsRequestEmail({
          type: "individual",
          recipientEmail,
          recipientName: token.climberName,
          leadName: booking.leadName,
          routeName: booking.departure.route.title,
          departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          token: token.code,
        });

        sentCount++;
      }

      return NextResponse.json({
        success: true,
        message: `Sent ${sentCount} emails`,
        emailsSent: sentCount,
      });
    }

    // Action: send_to_lead - Send summary email with all links to lead
    if (action === "send_to_lead") {
      const tokens = booking.climberTokens.filter((t) => !t.isCompleted);

      if (tokens.length === 0) {
        return NextResponse.json(
          { error: "No pending climber tokens" },
          { status: 400 }
        );
      }

      await sendClimberDetailsRequestEmail({
        type: "lead",
        leadName: booking.leadName,
        leadEmail: booking.leadEmail,
        routeName: booking.departure.route.title,
        departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        bookingRef: booking.id.slice(-8).toUpperCase(),
        totalClimbers: booking.totalClimbers,
        tokens: tokens.map((t) => ({
          climberIndex: t.climberIndex,
          climberName: t.climberName,
          code: t.code,
        })),
      });

      return NextResponse.json({
        success: true,
        message: `Email sent to ${booking.leadEmail}`,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error processing climber token action:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/bookings/[id]/climber-tokens - Invalidate a specific token
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { tokenId } = body;

    if (!tokenId) {
      return NextResponse.json({ error: "Token ID required" }, { status: 400 });
    }

    // Verify token belongs to this booking
    const token = await prisma.climberToken.findFirst({
      where: { id: tokenId, bookingId: id },
    });

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    await prisma.climberToken.delete({ where: { id: tokenId } });

    return NextResponse.json({
      success: true,
      message: "Token deleted",
    });
  } catch (error) {
    console.error("Error deleting climber token:", error);
    return NextResponse.json(
      { error: "Failed to delete token" },
      { status: 500 }
    );
  }
}
