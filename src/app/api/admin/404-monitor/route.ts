import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NotFoundStatus } from "@prisma/client";

// GET /api/admin/404-monitor - List all 404 URLs with pagination and filters
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as NotFoundStatus | null;
  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const botsOnly = searchParams.get("botsOnly") === "true";
  const humansOnly = searchParams.get("humansOnly") === "true";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const sortBy = searchParams.get("sortBy") || "lastHitAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  try {
    const where = {
      ...(status && status !== ("all" as unknown) && { status }),
      ...(search && {
        url: { contains: search, mode: "insensitive" as const },
      }),
      ...(dateFrom && {
        lastHitAt: { gte: new Date(dateFrom) },
      }),
      ...(dateTo && {
        lastHitAt: { lte: new Date(dateTo) },
      }),
      ...(botsOnly && { botHitCount: { gt: 0 } }),
      ...(humansOnly && { humanHitCount: { gt: 0 } }),
    };

    const orderBy: Record<string, string> = {};
    if (["hitCount", "lastHitAt", "firstHitAt", "url", "botHitCount", "humanHitCount"].includes(sortBy)) {
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.lastHitAt = "desc";
    }

    const [notFoundUrls, total] = await Promise.all([
      prisma.notFoundUrl.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          redirect: {
            select: {
              id: true,
              destinationUrl: true,
              type: true,
              isActive: true,
            },
          },
        },
      }),
      prisma.notFoundUrl.count({ where }),
    ]);

    // Get stats
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    const [totalActive, hitsToday, hitsThisWeek, totalBotHits, totalHumanHits] = await Promise.all([
      prisma.notFoundUrl.count({ where: { status: "ACTIVE" } }),
      prisma.notFoundHit.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.notFoundHit.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.notFoundHit.count({ where: { isBot: true } }),
      prisma.notFoundHit.count({ where: { isBot: false } }),
    ]);

    const botPercentage = totalBotHits + totalHumanHits > 0
      ? Math.round((totalBotHits / (totalBotHits + totalHumanHits)) * 100)
      : 0;

    return NextResponse.json({
      notFoundUrls,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalActive,
        hitsToday,
        hitsThisWeek,
        botPercentage,
      },
    });
  } catch (error) {
    console.error("Error fetching 404 URLs:", error);
    return NextResponse.json(
      { error: "Failed to fetch 404 URLs" },
      { status: 500 }
    );
  }
}
