import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendClimberDetailsReminderEmail } from "@/lib/email/send";
import { ClimberNotifications } from "@/lib/notifications";

// Verify cron secret
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === process.env.CRON_SECRET;
}

export async function GET(request: NextRequest) {
  // Verify cron secret (for Vercel Cron)
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const results = {
    sevenDayReminders: 0,
    threeDayReminders: 0,
    errors: [] as string[],
  };

  try {
    // Find tokens expiring in approximately 7 days (6-8 days to account for timing)
    // that haven't received a first reminder yet
    const sevenDaysFromNow = new Date(now);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const sixDaysFromNow = new Date(now);
    sixDaysFromNow.setDate(sixDaysFromNow.getDate() + 6);

    const eightDaysFromNow = new Date(now);
    eightDaysFromNow.setDate(eightDaysFromNow.getDate() + 8);

    const sevenDayTokens = await prisma.climberToken.findMany({
      where: {
        isCompleted: false,
        reminderSentAt: null,
        email: { not: null },
        expiresAt: {
          gte: sixDaysFromNow,
          lt: eightDaysFromNow,
        },
      },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                route: { select: { title: true } },
              },
            },
          },
        },
      },
    });

    // Send 7-day reminders
    for (const token of sevenDayTokens) {
      if (!token.email) continue;

      try {
        await sendClimberDetailsReminderEmail(token.email, {
          climberName: token.climberName,
          leadName: token.booking.leadName,
          routeName: token.booking.departure.route.title,
          departureDate: token.booking.departure.arrivalDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          token: token.code,
          daysRemaining: 7,
          isUrgent: false,
        });

        // Mark reminder as sent
        await prisma.climberToken.update({
          where: { id: token.id },
          data: { reminderSentAt: now },
        });

        // Create notification
        await ClimberNotifications.detailsReminder({
          bookingId: token.bookingId,
          climberName: token.climberName || `Climber ${token.climberIndex + 1}`,
          daysRemaining: 7,
          isUrgent: false,
        });

        results.sevenDayReminders++;
      } catch (error) {
        results.errors.push(`Failed to send 7-day reminder for token ${token.id}: ${error}`);
      }
    }

    // Find tokens expiring in approximately 3 days (2-4 days)
    // that have received first reminder but not final reminder
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const twoDaysFromNow = new Date(now);
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const fourDaysFromNow = new Date(now);
    fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);

    const threeDayTokens = await prisma.climberToken.findMany({
      where: {
        isCompleted: false,
        finalReminderSentAt: null,
        email: { not: null },
        expiresAt: {
          gte: twoDaysFromNow,
          lt: fourDaysFromNow,
        },
      },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                route: { select: { title: true } },
              },
            },
          },
        },
      },
    });

    // Send 3-day (urgent) reminders
    for (const token of threeDayTokens) {
      if (!token.email) continue;

      try {
        await sendClimberDetailsReminderEmail(token.email, {
          climberName: token.climberName,
          leadName: token.booking.leadName,
          routeName: token.booking.departure.route.title,
          departureDate: token.booking.departure.arrivalDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          token: token.code,
          daysRemaining: 3,
          isUrgent: true,
        });

        // Mark final reminder as sent
        await prisma.climberToken.update({
          where: { id: token.id },
          data: { finalReminderSentAt: now },
        });

        // Create notification
        await ClimberNotifications.detailsReminder({
          bookingId: token.bookingId,
          climberName: token.climberName || `Climber ${token.climberIndex + 1}`,
          daysRemaining: 3,
          isUrgent: true,
        });

        results.threeDayReminders++;
      } catch (error) {
        results.errors.push(`Failed to send 3-day reminder for token ${token.id}: ${error}`);
      }
    }

    console.log("Climber reminder cron results:", results);

    return NextResponse.json({
      success: true,
      message: `Sent ${results.sevenDayReminders} 7-day reminders and ${results.threeDayReminders} 3-day reminders`,
      results,
    });
  } catch (error) {
    console.error("Climber reminder cron error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process reminders",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
