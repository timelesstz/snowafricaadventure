import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import {
  getRotationConfig,
  updateRotationConfig,
} from "@/lib/services/departure-rotation";

// GET /api/admin/departures/settings - Get rotation settings
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await getRotationConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching rotation settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/departures/settings - Update rotation settings
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { isEnabled, mode, skipWithinDays, prioritizeFullMoon } = body;

    const config = await updateRotationConfig({
      ...(isEnabled !== undefined && { isEnabled }),
      ...(mode && { mode }),
      ...(skipWithinDays !== undefined && { skipWithinDays }),
      ...(prioritizeFullMoon !== undefined && { prioritizeFullMoon }),
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating rotation settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
