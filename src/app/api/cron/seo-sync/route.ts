import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";
import { fetchSearchAnalytics, fetchPageMetrics } from "@/lib/seo-dashboard/gsc-client";
import { fetchOrganicTraffic } from "@/lib/seo-dashboard/ga4-client";

/**
 * Daily SEO data sync cron job.
 * Schedule: 0 4 * * * (4:00 AM UTC daily)
 *
 * Syncs last 3 days of GSC data + yesterday's GA4 organic data.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isGoogleConfigured()) {
    return NextResponse.json({
      skipped: true,
      reason: "Google service account not configured",
    });
  }

  const results = { gsc: { status: "skipped", records: 0 }, ga4: { status: "skipped", records: 0 } };

  // GSC Sync (last 3 days)
  const gscSiteUrl =
    (await prisma.siteSetting.findUnique({ where: { key: "gsc_site_url" } }))
      ?.value || process.env.GSC_SITE_URL;

  if (gscSiteUrl) {
    const syncLog = await prisma.seoSyncLog.create({ data: { source: "GSC" } });
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 3 * 24 * 60 * 60 * 1000);
      const dateRange = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      let recordCount = 0;

      const queries = await fetchSearchAnalytics(gscSiteUrl, dateRange);
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

      const pages = await fetchPageMetrics(gscSiteUrl, dateRange);
      for (const row of pages) {
        await prisma.gscPageMetric.upsert({
          where: {
            date_page: { date: new Date(row.date), page: row.page },
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

      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: { status: "COMPLETED", recordCount, completedAt: new Date(), metadata: dateRange },
      });

      results.gsc = { status: "completed", records: recordCount };
    } catch (error) {
      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
          completedAt: new Date(),
        },
      });
      results.gsc = { status: "failed", records: 0 };
      console.error("GSC cron sync error:", error);
    }
  }

  // GA4 Sync (yesterday)
  const ga4PropertyId =
    (await prisma.siteSetting.findUnique({ where: { key: "ga4_property_id" } }))
      ?.value || process.env.GA4_PROPERTY_ID;

  if (ga4PropertyId) {
    const syncLog = await prisma.seoSyncLog.create({ data: { source: "GA4" } });
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      const dateRange = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      let recordCount = 0;
      const rows = await fetchOrganicTraffic(ga4PropertyId, dateRange);

      for (const row of rows) {
        const dateStr = row.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        await prisma.gaOrganicMetric.upsert({
          where: {
            date_landingPage: {
              date: new Date(dateStr),
              landingPage: row.landingPage || "",
            },
          },
          update: {
            sessions: row.sessions,
            users: row.users,
            newUsers: row.newUsers,
            bounceRate: row.bounceRate,
            avgSessionDuration: row.avgSessionDuration,
            conversions: row.conversions,
          },
          create: {
            date: new Date(dateStr),
            landingPage: row.landingPage,
            sessions: row.sessions,
            users: row.users,
            newUsers: row.newUsers,
            bounceRate: row.bounceRate,
            avgSessionDuration: row.avgSessionDuration,
            conversions: row.conversions,
          },
        });
        recordCount++;
      }

      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: { status: "COMPLETED", recordCount, completedAt: new Date(), metadata: dateRange },
      });

      results.ga4 = { status: "completed", records: recordCount };
    } catch (error) {
      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
          completedAt: new Date(),
        },
      });
      results.ga4 = { status: "failed", records: 0 };
      console.error("GA4 cron sync error:", error);
    }
  }

  console.log("SEO sync cron completed:", results);
  return NextResponse.json({ success: true, results });
}
