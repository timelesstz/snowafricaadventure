import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fetchSearchAnalytics, fetchPageMetrics } from "@/lib/seo-dashboard/gsc-client";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";

export async function POST(request: NextRequest) {
  try {
    await requireRole("ADMIN");

    if (!isGoogleConfigured()) {
      return NextResponse.json(
        { error: "Google service account not configured" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const days = body.days || 3;

    const siteUrl =
      (await prisma.siteSetting.findUnique({ where: { key: "gsc_site_url" } }))
        ?.value || process.env.GSC_SITE_URL;

    if (!siteUrl) {
      return NextResponse.json(
        { error: "GSC site URL not configured" },
        { status: 400 }
      );
    }

    // Create sync log
    const syncLog = await prisma.seoSyncLog.create({
      data: { source: "GSC" },
    });

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
    const dateRange = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };

    let recordCount = 0;

    try {
      // Fetch and upsert search queries
      const queries = await fetchSearchAnalytics(siteUrl, dateRange);
      for (const row of queries) {
        await prisma.gscSearchQuery.upsert({
          where: {
            date_query_page_country_device: {
              date: new Date(row.date),
              query: row.query,
              page: row.page || "",
              country: row.country || "",
              device: row.device || "",
            },
          },
          update: {
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          },
          create: {
            date: new Date(row.date),
            query: row.query,
            page: row.page,
            country: row.country,
            device: row.device,
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          },
        });
        recordCount++;
      }

      // Fetch and upsert page metrics
      const pages = await fetchPageMetrics(siteUrl, dateRange);
      for (const row of pages) {
        await prisma.gscPageMetric.upsert({
          where: {
            date_page: {
              date: new Date(row.date),
              page: row.page,
            },
          },
          update: {
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          },
          create: {
            date: new Date(row.date),
            page: row.page,
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          },
        });
        recordCount++;
      }

      // Update sync log
      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "COMPLETED",
          recordCount,
          completedAt: new Date(),
          metadata: dateRange,
        },
      });

      return NextResponse.json({
        success: true,
        recordCount,
        dateRange,
      });
    } catch (error) {
      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
          completedAt: new Date(),
        },
      });
      throw error;
    }
  } catch (error) {
    console.error("GSC sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
