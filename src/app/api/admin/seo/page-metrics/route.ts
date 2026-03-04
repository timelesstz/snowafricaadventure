import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requireRole("VIEWER");

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "28", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const search = searchParams.get("search") || "";

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where = {
      date: { gte: startDate },
      ...(search
        ? { page: { contains: search, mode: "insensitive" as const } }
        : {}),
    };

    const pages = await prisma.gscPageMetric.groupBy({
      by: ["page"],
      where,
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: { _sum: { clicks: "desc" } },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalResult = await prisma.gscPageMetric.groupBy({
      by: ["page"],
      where,
      _count: true,
    });

    return NextResponse.json({
      pages: pages.map((p) => ({
        page: p.page,
        clicks: p._sum.clicks || 0,
        impressions: p._sum.impressions || 0,
        ctr: Math.round((p._avg.ctr || 0) * 10000) / 100,
        position: Math.round((p._avg.position || 0) * 10) / 10,
      })),
      total: totalResult.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("Page metrics error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch page metrics" },
      { status: 500 }
    );
  }
}
