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
    const sort = searchParams.get("sort") || "clicks";
    const order = searchParams.get("order") || "desc";
    const search = searchParams.get("search") || "";

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where = {
      date: { gte: startDate },
      ...(search ? { query: { contains: search, mode: "insensitive" as const } } : {}),
    };

    // Aggregate by query
    const queries = await prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where,
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: {
        _sum:
          sort === "clicks"
            ? { clicks: order as "asc" | "desc" }
            : sort === "impressions"
            ? { impressions: order as "asc" | "desc" }
            : undefined,
        ...(sort === "position"
          ? { _avg: { position: order as "asc" | "desc" } }
          : {}),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get total count for pagination
    const totalResult = await prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where,
      _count: true,
    });

    // Time series for the period
    const timeSeries = await prisma.gscSearchQuery.groupBy({
      by: ["date"],
      where: { date: { gte: startDate } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({
      queries: queries.map((q) => ({
        query: q.query,
        clicks: q._sum.clicks || 0,
        impressions: q._sum.impressions || 0,
        ctr: Math.round((q._avg.ctr || 0) * 10000) / 100,
        position: Math.round((q._avg.position || 0) * 10) / 10,
      })),
      total: totalResult.length,
      page,
      limit,
      timeSeries: timeSeries.map((t) => ({
        date: t.date.toISOString().split("T")[0],
        clicks: t._sum.clicks || 0,
        impressions: t._sum.impressions || 0,
        ctr: Math.round((t._avg.ctr || 0) * 10000) / 100,
        position: Math.round((t._avg.position || 0) * 10) / 10,
      })),
    });
  } catch (error) {
    console.error("Search queries error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch queries" },
      { status: 500 }
    );
  }
}
