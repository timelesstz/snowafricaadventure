import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { getSeoOverview } from "@/lib/seo-overview";

export async function GET() {
  try {
    await requireRole("VIEWER");
    const data = await getSeoOverview();
    return NextResponse.json(data);
  } catch (error) {
    console.error("SEO overview error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch overview" },
      { status: 500 }
    );
  }
}
