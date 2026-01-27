import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/404-monitor/stats - Get dashboard statistics
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setDate(monthStart.getDate() - 30);

    // Get aggregate stats
    const [
      totalActive,
      totalIgnored,
      totalRedirected,
      hitsToday,
      hitsThisWeek,
      hitsThisMonth,
      totalBotHits,
      totalHumanHits,
    ] = await Promise.all([
      prisma.notFoundUrl.count({ where: { status: "ACTIVE" } }),
      prisma.notFoundUrl.count({ where: { status: "IGNORED" } }),
      prisma.notFoundUrl.count({ where: { status: "REDIRECTED" } }),
      prisma.notFoundHit.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.notFoundHit.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.notFoundHit.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.notFoundHit.count({ where: { isBot: true } }),
      prisma.notFoundHit.count({ where: { isBot: false } }),
    ]);

    // Get top 404 URLs by hit count
    const top404Urls = await prisma.notFoundUrl.findMany({
      where: { status: "ACTIVE" },
      orderBy: { hitCount: "desc" },
      take: 10,
      select: {
        id: true,
        url: true,
        hitCount: true,
        humanHitCount: true,
        botHitCount: true,
        lastHitAt: true,
      },
    });

    // Get daily hit counts for the last 30 days
    const dailyHits = await prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "NotFoundHit"
      WHERE "createdAt" >= ${monthStart}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `;

    // Get top referrers
    const topReferrers = await prisma.notFoundHit.groupBy({
      by: ["referer"],
      where: {
        referer: { not: null },
        createdAt: { gte: monthStart },
      },
      _count: true,
      orderBy: {
        _count: {
          referer: "desc",
        },
      },
      take: 10,
    });

    // Get top bot types
    const topBots = await prisma.notFoundHit.groupBy({
      by: ["botName"],
      where: {
        isBot: true,
        botName: { not: null },
        createdAt: { gte: monthStart },
      },
      _count: true,
      orderBy: {
        _count: {
          botName: "desc",
        },
      },
      take: 10,
    });

    const botPercentage = totalBotHits + totalHumanHits > 0
      ? Math.round((totalBotHits / (totalBotHits + totalHumanHits)) * 100)
      : 0;

    return NextResponse.json({
      summary: {
        totalActive,
        totalIgnored,
        totalRedirected,
        hitsToday,
        hitsThisWeek,
        hitsThisMonth,
        botPercentage,
        totalBotHits,
        totalHumanHits,
      },
      top404Urls,
      dailyHits: dailyHits.map((d) => ({
        date: d.date,
        count: Number(d.count),
      })),
      topReferrers: topReferrers.map((r) => ({
        referer: r.referer || "Direct",
        count: r._count,
      })),
      topBots: topBots.map((b) => ({
        botName: b.botName,
        count: b._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching 404 stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch 404 stats" },
      { status: 500 }
    );
  }
}
