import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { generateRecommendations } from "@/lib/seo-dashboard/recommendation-engine";

export async function GET() {
  try {
    await requireRole("VIEWER");
    const recommendations = await generateRecommendations();
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
