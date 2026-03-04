import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await requireRole("VIEWER");

    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    );

    const keywords = await prisma.seoKeywordTracker.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    // Enrich with GSC position data
    const enriched = await Promise.all(
      keywords.map(async (kw) => {
        // Latest position data
        const latest = await prisma.gscSearchQuery.findFirst({
          where: { query: kw.keyword },
          orderBy: { date: "desc" },
          select: { position: true, clicks: true, impressions: true },
        });

        // Best position ever
        const best = await prisma.gscSearchQuery.aggregate({
          where: { query: kw.keyword },
          _min: { position: true },
        });

        // 30-day totals
        const totals = await prisma.gscSearchQuery.aggregate({
          where: {
            query: kw.keyword,
            date: { gte: thirtyDaysAgo },
          },
          _sum: { clicks: true, impressions: true },
        });

        // Position history (daily, last 30 days)
        const history = await prisma.gscSearchQuery.groupBy({
          by: ["date"],
          where: {
            query: kw.keyword,
            date: { gte: thirtyDaysAgo },
          },
          _avg: { position: true },
          orderBy: { date: "asc" },
        });

        return {
          id: kw.id,
          keyword: kw.keyword,
          targetUrl: kw.targetUrl,
          isActive: kw.isActive,
          currentPosition: latest?.position || null,
          bestPosition: best._min.position || null,
          clicks: totals._sum.clicks || 0,
          impressions: totals._sum.impressions || 0,
          positionHistory: history.map((h) => ({
            date: h.date.toISOString().split("T")[0],
            position: h._avg.position || 0,
          })),
        };
      })
    );

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("Keywords fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch keywords" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");

    const { keyword, targetUrl } = await request.json();
    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const created = await prisma.seoKeywordTracker.upsert({
      where: { keyword },
      update: { targetUrl, isActive: true },
      create: { keyword, targetUrl },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Keyword create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create keyword" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireRole("EDITOR");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.seoKeywordTracker.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Keyword delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete keyword" },
      { status: 500 }
    );
  }
}
