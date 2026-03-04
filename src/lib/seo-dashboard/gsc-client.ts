import { getSearchConsoleClient } from "./google-auth";
import type { DateRange } from "./types";

interface GscRow {
  query: string;
  page: string | null;
  country: string | null;
  device: string | null;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/**
 * Fetch search analytics data from Google Search Console.
 * Returns raw rows with query, page, date, clicks, impressions, CTR, position.
 */
export async function fetchSearchAnalytics(
  siteUrl: string,
  dateRange: DateRange,
  rowLimit = 25000
): Promise<GscRow[]> {
  const client = getSearchConsoleClient();
  const rows: GscRow[] = [];
  let startRow = 0;

  // Paginate through results (GSC caps at 25K rows per request)
  while (true) {
    const response = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        dimensions: ["query", "page", "date", "country", "device"],
        rowLimit: Math.min(rowLimit, 25000),
        startRow,
      },
    });

    const responseRows = response.data.rows;
    if (!responseRows || responseRows.length === 0) break;

    for (const row of responseRows) {
      const keys = row.keys || [];
      rows.push({
        query: keys[0] || "",
        page: keys[1] || null,
        country: keys[3] || null,
        device: keys[4] || null,
        date: keys[2] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
      });
    }

    if (responseRows.length < 25000) break;
    startRow += responseRows.length;
  }

  return rows;
}

/**
 * Fetch page-level aggregated metrics from GSC.
 */
export async function fetchPageMetrics(
  siteUrl: string,
  dateRange: DateRange
): Promise<
  Array<{
    page: string;
    date: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>
> {
  const client = getSearchConsoleClient();
  const results: Array<{
    page: string;
    date: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }> = [];

  const response = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      dimensions: ["page", "date"],
      rowLimit: 25000,
    },
  });

  const rows = response.data.rows;
  if (!rows) return results;

  for (const row of rows) {
    const keys = row.keys || [];
    results.push({
      page: keys[0] || "",
      date: keys[1] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    });
  }

  return results;
}

/**
 * Get the list of sites the service account has access to.
 */
export async function listSites(): Promise<string[]> {
  const client = getSearchConsoleClient();
  const response = await client.sites.list();
  return (
    response.data.siteEntry?.map((entry) => entry.siteUrl || "").filter(Boolean) || []
  );
}
