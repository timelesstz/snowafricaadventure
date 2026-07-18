import { NextResponse } from "next/server";
import { rotateDepartures } from "@/lib/services/departure-rotation";
import { prisma } from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import { DepartureNotifications } from "@/lib/notifications";
import { SPOT_HOLDING_STATUSES, countBookedSpots } from "@/lib/booking-spots";

/**
 * Notify admins about departures starting within 7 days, once each. Dedup is
 * done against recent DEPARTURE_UPCOMING notifications so the daily cron does
 * not re-alert the same departure.
 */
async function notifyUpcomingDepartures(): Promise<number> {
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcoming = await prisma.groupDeparture.findMany({
    where: {
      status: { in: ["OPEN", "LIMITED", "GUARANTEED", "FULL"] },
      startDate: { gte: now, lte: sevenDays },
    },
    select: {
      id: true,
      startDate: true,
      route: { select: { title: true } },
      bookings: {
        where: { status: { in: SPOT_HOLDING_STATUSES } },
        select: { totalClimbers: true },
      },
    },
  });

  if (upcoming.length === 0) return 0;

  // Departure IDs already alerted in the last 14 days
  const recent = await prisma.notification.findMany({
    where: {
      type: NotificationType.DEPARTURE_UPCOMING,
      createdAt: { gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) },
    },
    select: { data: true },
  });
  const alerted = new Set(
    recent
      .map((n) => (n.data as { departureId?: string } | null)?.departureId)
      .filter(Boolean)
  );

  let sent = 0;
  for (const dep of upcoming) {
    if (alerted.has(dep.id)) continue;
    const daysUntil = Math.max(
      0,
      Math.ceil((dep.startDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
    );
    await DepartureNotifications.upcomingDeparture({
      departureId: dep.id,
      routeTitle: dep.route.title,
      departureDate: dep.startDate.toISOString(),
      daysUntil,
      bookingCount: countBookedSpots(dep.bookings),
    }).catch((e) =>
      console.error("upcomingDeparture notification failed:", e)
    );
    sent++;
  }
  return sent;
}

/**
 * Vercel Cron endpoint for automatic departure rotation
 * Schedule: 0 3 * * * (3:00 AM UTC daily)
 *
 * This endpoint:
 * 1. Marks expired departures as COMPLETED
 * 2. Rotates featured departures for each route
 * 3. Updates departure statuses (OPEN -> LIMITED -> FULL)
 */
export async function GET(request: Request) {
  // Verify cron secret for Vercel Cron jobs
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Always require cron secret in production
  if (!cronSecret) {
    console.error("CRON_SECRET is not set — refusing to run unprotected cron");
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await rotateDepartures();

    // Alert admins to departures leaving within 7 days (deduped)
    let upcomingAlerts = 0;
    try {
      upcomingAlerts = await notifyUpcomingDepartures();
    } catch (e) {
      console.error("Upcoming-departure notifications failed:", e);
    }

    // Log summary for Vercel logs
    console.log("Departure rotation completed:", {
      timestamp: result.timestamp,
      completedDepartures: result.completedDepartures,
      featuredUpdates: result.featuredUpdates.length,
      statusChanges: result.statusChanges.length,
      upcomingAlerts,
      errors: result.errors,
    });

    return NextResponse.json({
      success: result.success,
      timestamp: result.timestamp,
      summary: {
        completedDepartures: result.completedDepartures,
        featuredUpdates: result.featuredUpdates.length,
        statusChanges: result.statusChanges.length,
        upcomingAlerts,
      },
      details: result,
    });
  } catch (error) {
    console.error("Cron departure rotation failed:", error);
    return NextResponse.json(
      {
        error: "Rotation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
