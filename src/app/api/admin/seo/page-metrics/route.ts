import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Aggregating a month of Search Console rows takes a few seconds, and these
 * routes previously inherited Vercel's 10s default — fine when the table held
 * a couple of thousand rows, but the request started dying mid-query once the
 * history was backfilled. The work itself measures under 3s; the ceiling was
 * the problem.
 */
export const maxDuration = 60;

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

    // Total distinct pages, for pagination. See the note in
    // api/admin/seo/search-queries: the previous unbounded groupBy fetched
    // every distinct page just to read .length, and stopped responding once
    // the backfilled history grew the window.
    const totalRows = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT "page") AS count
      FROM "GscPageMetric"
      WHERE "date" >= ${startDate}
        AND (${search} = '' OR "page" ILIKE ${`%${search}%`})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    return NextResponse.json({
      pages: pages.map((p) => ({
        page: p.page,
        clicks: p._sum.clicks || 0,
        impressions: p._sum.impressions || 0,
        ctr: Math.round((p._avg.ctr || 0) * 10000) / 100,
        position: Math.round((p._avg.position || 0) * 10) / 10,
      })),
      total,
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
