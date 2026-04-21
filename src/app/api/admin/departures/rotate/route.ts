import { requireRole } from "@/lib/auth";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import {
  rotateDepartures,
  manuallyFeatureDeparture,
  getFeaturedQueue,
} from "@/lib/services/departure-rotation";

// POST /api/admin/departures/rotate - Manually trigger rotation
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { action, departureId, routeId, feature } = body;

    // Handle specific actions
    if (action === "feature" && departureId !== undefined) {
      await manuallyFeatureDeparture(departureId, feature ?? true);
      return NextResponse.json({
        success: true,
        message: feature
          ? "Departure manually featured"
          : "Departure unfeatured",
      });
    }

    if (action === "queue" && routeId) {
      const queue = await getFeaturedQueue(routeId);
      return NextResponse.json({ queue });
    }

    // Default: run full rotation
    const result = await rotateDepartures();

    return NextResponse.json({
      success: result.success,
      message: "Manual rotation completed",
      result,
    });
  } catch (error) {
    console.error("Error in manual rotation:", error);
    return NextResponse.json(
      {
        error: "Rotation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
