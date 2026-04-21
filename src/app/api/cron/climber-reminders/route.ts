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

async function getNumericSetting(key: string, fallback: number): Promise<number> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  const parsed = Number(row.value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export async function GET(request: NextRequest) {
  // Verify cron secret (for Vercel Cron)
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Reminder windows are configurable via SiteSetting so ops can tune them
  // without a code change. Defaults match the original hard-coded values.
  const [firstDays, finalDays] = await Promise.all([
    getNumericSetting("climber_reminder_first_days", 7),
    getNumericSetting("climber_reminder_final_days", 3),
  ]);

  const now = new Date();
  const results = {
    sevenDayReminders: 0,
    threeDayReminders: 0,
    firstWindowDays: firstDays,
    finalWindowDays: finalDays,
    errors: [] as string[],
  };

  try {
    // First reminder: tokens expiring in ~firstDays (firstDays-1 .. firstDays+1)
    // that haven't received a first reminder yet
    const sixDaysFromNow = addDays(now, firstDays - 1);
    const eightDaysFromNow = addDays(now, firstDays + 1);

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
          daysRemaining: firstDays,
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
          daysRemaining: firstDays,
          isUrgent: false,
        });

        results.sevenDayReminders++;
      } catch (error) {
        results.errors.push(`Failed to send first reminder for token ${token.id}: ${error}`);
      }
    }

    // Final reminder: tokens expiring in ~finalDays (finalDays-1 .. finalDays+1)
    // that have received first reminder but not final reminder
    const twoDaysFromNow = addDays(now, finalDays - 1);
    const fourDaysFromNow = addDays(now, finalDays + 1);

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
          daysRemaining: finalDays,
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
          daysRemaining: finalDays,
          isUrgent: true,
        });

        results.threeDayReminders++;
      } catch (error) {
        results.errors.push(`Failed to send final reminder for token ${token.id}: ${error}`);
      }
    }

    console.log("Climber reminder cron results:", results);

    return NextResponse.json({
      success: true,
      message: `Sent ${results.sevenDayReminders} ${firstDays}-day reminders and ${results.threeDayReminders} ${finalDays}-day reminders`,
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
