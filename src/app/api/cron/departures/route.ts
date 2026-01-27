import { NextResponse } from "next/server";
import { rotateDepartures } from "@/lib/services/departure-rotation";

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

  // Allow bypass in development or if no secret is set
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await rotateDepartures();

    // Log summary for Vercel logs
    console.log("Departure rotation completed:", {
      timestamp: result.timestamp,
      completedDepartures: result.completedDepartures,
      featuredUpdates: result.featuredUpdates.length,
      statusChanges: result.statusChanges.length,
      errors: result.errors,
    });

    return NextResponse.json({
      success: result.success,
      timestamp: result.timestamp,
      summary: {
        completedDepartures: result.completedDepartures,
        featuredUpdates: result.featuredUpdates.length,
        statusChanges: result.statusChanges.length,
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
