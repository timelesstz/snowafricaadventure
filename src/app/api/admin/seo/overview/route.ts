import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await requireRole("VIEWER");

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Current period (last 7 days)
    const current = await prisma.gscPageMetric.aggregate({
      where: { date: { gte: sevenDaysAgo } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
    });

    // Prior period (7-14 days ago)
    const prior = await prisma.gscPageMetric.aggregate({
      where: { date: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
    });

    const calcTrend = (curr: number, prev: number) =>
      prev === 0 ? 0 : ((curr - prev) / prev) * 100;

    const totalClicks = current._sum.clicks || 0;
    const totalImpressions = current._sum.impressions || 0;
    const avgPosition = current._avg.position || 0;
    const avgCtr = current._avg.ctr || 0;

    // Top 5 queries by clicks
    const topQueries = await prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where: { date: { gte: sevenDaysAgo } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 5,
    });

    // Top 5 pages by clicks
    const topPages = await prisma.gscPageMetric.groupBy({
      by: ["page"],
      where: { date: { gte: sevenDaysAgo } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 5,
    });

    // Daily time series for sparklines
    const dailyMetrics = await prisma.gscPageMetric.groupBy({
      by: ["date"],
      where: { date: { gte: sevenDaysAgo } },
      _sum: { clicks: true, impressions: true },
      _avg: { ctr: true, position: true },
      orderBy: { date: "asc" },
    });

    // Health score components
    const auditAvg = await prisma.seoPageAudit.aggregate({
      _avg: { score: true },
    });
    const unresolved404s = await prisma.notFoundUrl.count({
      where: { status: "ACTIVE" },
    });

    // Health score: weighted average
    const auditScore = auditAvg._avg.score || 50;
    const ctrScore = Math.min((avgCtr / 0.05) * 100, 100); // 5% CTR = 100
    const posScore = avgPosition > 0 ? Math.max(0, 100 - (avgPosition - 1) * 5) : 50;
    const errorScore = Math.max(0, 100 - unresolved404s * 2);
    const healthScore = Math.round(
      auditScore * 0.3 + ctrScore * 0.2 + posScore * 0.2 + errorScore * 0.15 + 50 * 0.15
    );

    // Last sync
    const lastSync = await prisma.seoSyncLog.findFirst({
      where: { status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
      select: { completedAt: true, source: true },
    });

    return NextResponse.json({
      totalClicks,
      totalImpressions,
      avgPosition: Math.round(avgPosition * 10) / 10,
      avgCtr: Math.round(avgCtr * 10000) / 100, // as percentage
      clicksTrend: Math.round(
        calcTrend(totalClicks, prior._sum.clicks || 0) * 10
      ) / 10,
      impressionsTrend: Math.round(
        calcTrend(totalImpressions, prior._sum.impressions || 0) * 10
      ) / 10,
      positionTrend: Math.round(
        ((prior._avg.position || 0) - avgPosition) * 10
      ) / 10,
      ctrTrend: Math.round(
        calcTrend(avgCtr, prior._avg.ctr || 0) * 10
      ) / 10,
      healthScore: Math.min(healthScore, 100),
      lastSyncAt: lastSync?.completedAt || null,
      topQueries: topQueries.map((q) => ({
        query: q.query,
        clicks: q._sum.clicks || 0,
        impressions: q._sum.impressions || 0,
        ctr: Math.round((q._avg.ctr || 0) * 10000) / 100,
        position: Math.round((q._avg.position || 0) * 10) / 10,
      })),
      topPages: topPages.map((p) => ({
        page: p.page,
        clicks: p._sum.clicks || 0,
        impressions: p._sum.impressions || 0,
        ctr: Math.round((p._avg.ctr || 0) * 10000) / 100,
        position: Math.round((p._avg.position || 0) * 10) / 10,
      })),
      dailyMetrics: dailyMetrics.map((d) => ({
        date: d.date.toISOString().split("T")[0],
        clicks: d._sum.clicks || 0,
        impressions: d._sum.impressions || 0,
        ctr: Math.round((d._avg.ctr || 0) * 10000) / 100,
        position: Math.round((d._avg.position || 0) * 10) / 10,
      })),
    });
  } catch (error) {
    console.error("SEO overview error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch overview" },
      { status: 500 }
    );
  }
}
