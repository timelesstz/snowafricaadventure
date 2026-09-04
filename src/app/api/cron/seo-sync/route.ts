import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";
import { fetchSearchAnalytics, fetchPageMetrics } from "@/lib/seo-dashboard/gsc-client";
import { fetchOrganicTraffic } from "@/lib/seo-dashboard/ga4-client";

/**
 * Daily SEO data sync cron job.
 * Runs from /api/cron/daily.
 *
 * Syncs a rolling window of Search Console data (see gsc_sync_days) plus
 * yesterday's GA4 organic data.
 */
async function getNumericSetting(key: string, fallback: number): Promise<number> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  const parsed = Number(row.value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Fail closed: a missing secret must not skip the check and leave this
  // endpoint world-callable. Matches the seo-snapshot cron.
  if (!cronSecret) {
    console.error("CRON_SECRET is not set — refusing to run unprotected cron");
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Optional explicit backfill range: ?start=YYYY-MM-DD&end=YYYY-MM-DD
  //
  // The rolling window can only ever reach back a few days, so it cannot repair
  // history. Rather than require the service-account key on a developer
  // machine, this lets the deployed endpoint be driven a chunk at a time — each
  // call small enough to finish inside the function's time budget. Every write
  // is an upsert, so chunks may overlap and be re-run safely.
  const url = new URL(request.url);
  const rangeStart = url.searchParams.get("start");
  const rangeEnd = url.searchParams.get("end");
  const isBackfill = Boolean(rangeStart && rangeEnd);

  const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
  if ((rangeStart || rangeEnd) && !(ISO_DATE.test(rangeStart ?? "") && ISO_DATE.test(rangeEnd ?? ""))) {
    return NextResponse.json(
      { error: "start and end must both be supplied as YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (!isGoogleConfigured()) {
    return NextResponse.json({
      skipped: true,
      reason: "Google service account not configured",
    });
  }

  const results = { gsc: { status: "skipped", records: 0 }, ga4: { status: "skipped", records: 0 } };

  // GSC Sync.
  //
  // Search Console reports on a 2-3 day lag, so a 3-day window captured barely
  // two usable days and never backfilled: any day the cron missed was lost for
  // good. With the cron itself not running between April and September 2026,
  // that left the dashboard with 2 days of data inside its 28-day view and a
  // completely empty August.
  //
  // The window is now configurable and defaults to 5 days, which covers the
  // reporting lag plus a couple of missed runs. It is deliberately modest
  // because every row is an individual upsert and the function has a time
  // budget; for anything larger use scripts/backfill-gsc.ts, which has no
  // timeout and is safe to re-run.
  const gscSiteUrl =
    (await prisma.siteSetting.findUnique({ where: { key: "gsc_site_url" } }))
      ?.value || process.env.GSC_SITE_URL;

  if (gscSiteUrl) {
    const syncLog = await prisma.seoSyncLog.create({ data: { source: "GSC" } });
    try {
      let dateRange: { startDate: string; endDate: string };
      if (isBackfill) {
        dateRange = { startDate: rangeStart as string, endDate: rangeEnd as string };
      } else {
        const syncDays = await getNumericSetting("gsc_sync_days", 5);
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - syncDays * 24 * 60 * 60 * 1000);
        dateRange = {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };
      }

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

  // A GA4 *Measurement ID* (G-XXXXXXX / the gtag value) is not a Property ID.
  // The Data API needs the numeric property number from GA4 Admin > Property
  // Settings. The configured value was a measurement ID, so every run failed
  // with "Invalid property ID". Detect that up front and say so plainly rather
  // than making a call that cannot succeed.
  const ga4LooksLikeMeasurementId =
    !!ga4PropertyId && !/^\d+$/.test(ga4PropertyId.replace(/^properties\//, ""));

  if (isBackfill) {
    // Backfill is about Search Console history; leave GA4 to the daily run.
    results.ga4 = { status: "skipped", records: 0 };
  } else if (ga4PropertyId && ga4LooksLikeMeasurementId) {
    results.ga4 = { status: "misconfigured", records: 0 };
    await prisma.seoSyncLog.create({
      data: {
        source: "GA4",
        status: "FAILED",
        error:
          `"${ga4PropertyId}" is a GA4 Measurement ID, not a Property ID. ` +
          "Set ga4_property_id to the numeric property number from " +
          "GA4 Admin > Property Settings (e.g. 493812345).",
        completedAt: new Date(),
      },
    });
  } else if (ga4PropertyId) {
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
  return NextResponse.json({ success: true, mode: isBackfill ? "backfill" : "rolling", range: isBackfill ? `${rangeStart}..${rangeEnd}` : undefined, results });
}
