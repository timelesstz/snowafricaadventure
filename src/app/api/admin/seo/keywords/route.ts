import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;
/** Days of history in the chart and the "30d" totals. */
const WINDOW_DAYS = 30;
/** "Current" position covers the keyword's last 7 days with impressions, not one raw row. */
const CURRENT_DAYS = 7;

interface DailyRow {
  keyword: string;
  date: Date;
  clicks: number;
  impressions: number;
  pos_w: number;
}

/**
 * Search Console stores one row per query × page × country × device, so a
 * single row (the old "latest" and "best ever") can be one impression in one
 * country. Everything here is summed per day and position is weighted by
 * impressions, the way Search Console itself reports it. The window ends on
 * the latest day with data because GSC reports 2-3 days late.
 */
export async function GET() {
  try {
    await requireRole("VIEWER");

    const keywords = await prisma.seoKeywordTracker.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    if (keywords.length === 0) return NextResponse.json([]);

    const latest = await prisma.gscSearchQuery.aggregate({ _max: { date: true } });
    const end = latest._max.date ? new Date(latest._max.date.getTime() + DAY_MS) : new Date();
    const start = new Date(end.getTime() - WINDOW_DAYS * DAY_MS);
    const terms = [...new Set(keywords.map((k) => k.keyword.trim().toLowerCase()))];

    const rows = await prisma.$queryRaw<DailyRow[]>`
      SELECT LOWER(query) AS keyword,
             date,
             SUM(clicks)::int                     AS clicks,
             SUM(impressions)::int                AS impressions,
             SUM(position * impressions)::float8  AS pos_w
      FROM "GscSearchQuery"
      WHERE LOWER(query) = ANY(${terms}) AND date >= ${start} AND date < ${end}
      GROUP BY LOWER(query), date
      ORDER BY date
    `;
    const byKeyword = new Map<string, DailyRow[]>();
    for (const r of rows) {
      const list = byKeyword.get(r.keyword) ?? [];
      list.push(r);
      byKeyword.set(r.keyword, list);
    }
    const weighted = (list: DailyRow[]) => {
      const impressions = list.reduce((s, r) => s + r.impressions, 0);
      return impressions > 0 ? list.reduce((s, r) => s + r.pos_w, 0) / impressions : null;
    };

    const enriched = keywords.map((kw) => {
      const days = (byKeyword.get(kw.keyword.trim().toLowerCase()) ?? []).filter((d) => d.impressions > 0);
      const daily = days.map((d) => ({ date: d.date.toISOString().slice(0, 10), position: d.pos_w / d.impressions }));
      return {
        id: kw.id,
        keyword: kw.keyword,
        targetUrl: kw.targetUrl,
        isActive: kw.isActive,
        // Most recent week of impressions; a long-tail term may not show daily.
        currentPosition: weighted(days.slice(-CURRENT_DAYS)),
        // Best single day in the window, so one stray impression can't claim #1.
        bestPosition: daily.length ? Math.min(...daily.map((d) => d.position)) : null,
        clicks: days.reduce((s, d) => s + d.clicks, 0),
        impressions: days.reduce((s, d) => s + d.impressions, 0),
        positionHistory: daily,
      };
    });

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

    const body = await request.json();
    const keyword = typeof body.keyword === "string" ? body.keyword.trim().replace(/\s+/g, " ") : "";
    const targetUrl = typeof body.targetUrl === "string" && body.targetUrl.trim() ? body.targetUrl.trim() : null;
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
