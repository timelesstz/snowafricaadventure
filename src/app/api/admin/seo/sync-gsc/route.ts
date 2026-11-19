import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fetchSearchAnalytics, fetchPageMetrics } from "@/lib/seo-dashboard/gsc-client";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";
import { inBatches } from "@/lib/seo-dashboard/batch";

export const maxDuration = 60;

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

    // An explicit { startDate, endDate } repairs history (the Google key lives
    // only in Vercel, so backfills must run on the deployed site). Keep each
    // range to about two weeks so it finishes inside the function budget.
    const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
    const dateRange =
      ISO_DATE.test(body.startDate ?? "") && ISO_DATE.test(body.endDate ?? "")
        ? { startDate: body.startDate as string, endDate: body.endDate as string }
        : {
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
          };

    let recordCount = 0;

    try {
      // Fetch and upsert search queries
      const queries = await fetchSearchAnalytics(siteUrl, dateRange);
      recordCount += await inBatches(queries, (row) =>
        prisma.gscSearchQuery.upsert({
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
        })
      );

      // Fetch and upsert page metrics
      const pages = await fetchPageMetrics(siteUrl, dateRange);
      recordCount += await inBatches(pages, (row) =>
        prisma.gscPageMetric.upsert({
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
        })
      );

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
