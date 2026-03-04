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

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Daily aggregate
    const dailyData = await prisma.gaOrganicMetric.groupBy({
      by: ["date"],
      where: { date: { gte: startDate } },
      _sum: { sessions: true, users: true, newUsers: true, conversions: true },
      _avg: { bounceRate: true, avgSessionDuration: true },
      orderBy: { date: "asc" },
    });

    // Top landing pages
    const topPages = await prisma.gaOrganicMetric.groupBy({
      by: ["landingPage"],
      where: {
        date: { gte: startDate },
        landingPage: { not: null },
      },
      _sum: { sessions: true, users: true, conversions: true },
      _avg: { bounceRate: true },
      orderBy: { _sum: { sessions: "desc" } },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Totals
    const totals = await prisma.gaOrganicMetric.aggregate({
      where: { date: { gte: startDate } },
      _sum: { sessions: true, users: true, newUsers: true, conversions: true },
      _avg: { bounceRate: true, avgSessionDuration: true },
    });

    return NextResponse.json({
      totals: {
        sessions: totals._sum.sessions || 0,
        users: totals._sum.users || 0,
        newUsers: totals._sum.newUsers || 0,
        conversions: totals._sum.conversions || 0,
        bounceRate: Math.round((totals._avg.bounceRate || 0) * 100) / 100,
        avgSessionDuration:
          Math.round((totals._avg.avgSessionDuration || 0) * 10) / 10,
      },
      dailyData: dailyData.map((d) => ({
        date: d.date.toISOString().split("T")[0],
        sessions: d._sum.sessions || 0,
        users: d._sum.users || 0,
        bounceRate: Math.round((d._avg.bounceRate || 0) * 100) / 100,
      })),
      topPages: topPages.map((p) => ({
        landingPage: p.landingPage,
        sessions: p._sum.sessions || 0,
        users: p._sum.users || 0,
        conversions: p._sum.conversions || 0,
        bounceRate: Math.round((p._avg.bounceRate || 0) * 100) / 100,
      })),
    });
  } catch (error) {
    console.error("Organic traffic error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch organic traffic" },
      { status: 500 }
    );
  }
}
