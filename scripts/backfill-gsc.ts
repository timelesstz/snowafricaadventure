/**
 * Backfill Google Search Console data for an arbitrary date range.
 *
 * Why this exists: the daily cron syncs only a short rolling window, because
 * every row is an individual upsert and a serverless function has a time
 * budget. That is fine for keeping current data fresh, but it cannot repair
 * history. Between April and September 2026 the cron was not running at all,
 * which left the SEO dashboard with two days of data inside its 28-day view
 * and an entirely empty August — so its advice was being computed from
 * single-click samples.
 *
 * This script has no timeout. It walks the range in chunks, upserts every row,
 * and is safe to re-run: re-running simply refreshes the same records.
 *
 * Search Console retains roughly 16 months and reports on a 2-3 day lag, so
 * the last couple of days will always be sparse or missing.
 *
 * Usage:
 *   npx tsx scripts/backfill-gsc.ts                    # last 90 days
 *   npx tsx scripts/backfill-gsc.ts 2026-08-01 2026-09-02
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { fetchSearchAnalytics, fetchPageMetrics } from "../src/lib/seo-dashboard/gsc-client";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

/** Chunk size in days. Small enough that one failure loses little work. */
const CHUNK_DAYS = 7;

function iso(d: Date): string {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 24 * 60 * 60 * 1000);
}

async function resolveSiteUrl(): Promise<string> {
  const row = await prisma.siteSetting.findUnique({ where: { key: "gsc_site_url" } });
  const url = row?.value || process.env.GSC_SITE_URL;
  if (!url) throw new Error("No gsc_site_url SiteSetting and no GSC_SITE_URL env var.");
  return url;
}

async function backfillChunk(siteUrl: string, startDate: string, endDate: string) {
  const dateRange = { startDate, endDate };
  let queries = 0;
  let pages = 0;

  for (const row of await fetchSearchAnalytics(siteUrl, dateRange)) {
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
    queries++;
  }

  for (const row of await fetchPageMetrics(siteUrl, dateRange)) {
    await prisma.gscPageMetric.upsert({
      where: { date_page: { date: new Date(row.date), page: row.page } },
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
    pages++;
  }

  return { queries, pages };
}

async function main() {
  const [argStart, argEnd] = process.argv.slice(2);
  const end = argEnd ? new Date(argEnd) : new Date();
  const start = argStart ? new Date(argStart) : addDays(end, -90);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Dates must be YYYY-MM-DD.");
  }
  if (start > end) throw new Error("Start date is after end date.");

  const siteUrl = await resolveSiteUrl();
  console.log(`Backfilling ${siteUrl}`);
  console.log(`Range: ${iso(start)} .. ${iso(end)}  (chunks of ${CHUNK_DAYS} days)\n`);

  let totalQueries = 0;
  let totalPages = 0;
  let failures = 0;

  for (let cursor = new Date(start); cursor <= end; cursor = addDays(cursor, CHUNK_DAYS)) {
    const chunkEnd = addDays(cursor, CHUNK_DAYS - 1) > end ? end : addDays(cursor, CHUNK_DAYS - 1);
    const label = `${iso(cursor)}..${iso(chunkEnd)}`;
    try {
      const { queries, pages } = await backfillChunk(siteUrl, iso(cursor), iso(chunkEnd));
      totalQueries += queries;
      totalPages += pages;
      console.log(`  ${label}  queries=${String(queries).padStart(5)}  pages=${String(pages).padStart(4)}`);
    } catch (error) {
      // One bad chunk should not abandon the rest of the range.
      failures++;
      console.error(`  ${label}  FAILED: ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(`\nDone. query rows: ${totalQueries}, page rows: ${totalPages}, failed chunks: ${failures}`);

  const days = await prisma.gscSearchQuery.findMany({
    where: { date: { gte: start, lte: end } },
    select: { date: true },
  });
  const distinct = new Set(days.map((d) => d.date.toISOString().slice(0, 10)));
  console.log(`Distinct days now present in that range: ${distinct.size}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
