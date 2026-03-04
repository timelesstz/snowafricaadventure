import prisma from "@/lib/prisma";
import OverviewDashboard from "./OverviewDashboard";

export const dynamic = "force-dynamic";

async function getOverviewData() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const current = await prisma.gscPageMetric.aggregate({
    where: { date: { gte: sevenDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
  });

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

  const topQueries = await prisma.gscSearchQuery.groupBy({
    by: ["query"],
    where: { date: { gte: sevenDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
    orderBy: { _sum: { clicks: "desc" } },
    take: 10,
  });

  const topPages = await prisma.gscPageMetric.groupBy({
    by: ["page"],
    where: { date: { gte: sevenDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
    orderBy: { _sum: { clicks: "desc" } },
    take: 10,
  });

  const dailyMetrics = await prisma.gscPageMetric.groupBy({
    by: ["date"],
    where: { date: { gte: sevenDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
    orderBy: { date: "asc" },
  });

  // Health score
  const auditAvg = await prisma.seoPageAudit.aggregate({ _avg: { score: true } });
  const unresolved404s = await prisma.notFoundUrl.count({ where: { status: "ACTIVE" } });
  const auditScore = auditAvg._avg.score || 50;
  const ctrScore = Math.min((avgCtr / 0.05) * 100, 100);
  const posScore = avgPosition > 0 ? Math.max(0, 100 - (avgPosition - 1) * 5) : 50;
  const errorScore = Math.max(0, 100 - unresolved404s * 2);
  const healthScore = Math.round(
    auditScore * 0.3 + ctrScore * 0.2 + posScore * 0.2 + errorScore * 0.15 + 50 * 0.15
  );

  const lastSync = await prisma.seoSyncLog.findFirst({
    where: { status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    select: { completedAt: true },
  });

  // Recent recommendations count
  const recsCount = await prisma.seoPageAudit.count({ where: { score: { lt: 50 } } });
  const unresolved404Count = await prisma.notFoundUrl.count({
    where: { status: "ACTIVE", hitCount: { gte: 5 } },
  });

  return {
    totalClicks,
    totalImpressions,
    avgPosition: Math.round(avgPosition * 10) / 10,
    avgCtr: Math.round(avgCtr * 10000) / 100,
    clicksTrend: Math.round(calcTrend(totalClicks, prior._sum.clicks || 0) * 10) / 10,
    impressionsTrend: Math.round(calcTrend(totalImpressions, prior._sum.impressions || 0) * 10) / 10,
    positionTrend: Math.round(((prior._avg.position || 0) - avgPosition) * 10) / 10,
    ctrTrend: Math.round(calcTrend(avgCtr, prior._avg.ctr || 0) * 10) / 10,
    healthScore: Math.min(healthScore, 100),
    lastSyncAt: lastSync?.completedAt?.toISOString() || null,
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
    })),
    issuesCount: recsCount + unresolved404Count,
  };
}

export default async function SeoOverviewPage() {
  const data = await getOverviewData();
  return <OverviewDashboard data={data} />;
}
