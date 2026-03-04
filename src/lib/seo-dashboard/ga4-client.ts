import { getAnalyticsDataClient } from "./google-auth";
import type { DateRange } from "./types";

interface OrganicRow {
  date: string;
  landingPage: string | null;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

/**
 * Fetch organic search traffic data from GA4 Data API.
 * Filters to only organic search channel.
 */
export async function fetchOrganicTraffic(
  propertyId: string,
  dateRange: DateRange
): Promise<OrganicRow[]> {
  const client = getAnalyticsDataClient();
  const results: OrganicRow[] = [];

  const response = await client.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        { startDate: dateRange.startDate, endDate: dateRange.endDate },
      ],
      dimensions: [
        { name: "date" },
        { name: "landingPagePlusQueryString" },
      ],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "conversions" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "sessionDefaultChannelGroup",
          stringFilter: {
            matchType: "EXACT",
            value: "Organic Search",
          },
        },
      },
      limit: "10000",
    },
  });

  const rows = (response as { data: { rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }> } }).data.rows;
  if (!rows) return results;

  for (const row of rows) {
    const dims = row.dimensionValues || [];
    const vals = row.metricValues || [];

    // Strip query string from landing page
    const rawPage = dims[1]?.value || "";
    const landingPage = rawPage.split("?")[0] || null;

    results.push({
      date: dims[0]?.value || "",
      landingPage,
      sessions: parseInt(vals[0]?.value || "0", 10),
      users: parseInt(vals[1]?.value || "0", 10),
      newUsers: parseInt(vals[2]?.value || "0", 10),
      bounceRate: parseFloat(vals[3]?.value || "0"),
      avgSessionDuration: parseFloat(vals[4]?.value || "0"),
      conversions: parseInt(vals[5]?.value || "0", 10),
    });
  }

  return results;
}

/**
 * Fetch aggregated daily organic traffic (no page breakdown).
 */
export async function fetchDailyOrganicSummary(
  propertyId: string,
  dateRange: DateRange
): Promise<
  Array<{
    date: string;
    sessions: number;
    users: number;
    bounceRate: number;
  }>
> {
  const client = getAnalyticsDataClient();

  const response = await client.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        { startDate: dateRange.startDate, endDate: dateRange.endDate },
      ],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "bounceRate" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "sessionDefaultChannelGroup",
          stringFilter: {
            matchType: "EXACT",
            value: "Organic Search",
          },
        },
      },
    },
  });

  const rows2 = (response as { data: { rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }> } }).data.rows;
  if (!rows2) return [];

  return rows2.map((row) => {
    const dims = row.dimensionValues || [];
    const vals = row.metricValues || [];
    return {
      date: dims[0]?.value || "",
      sessions: parseInt(vals[0]?.value || "0", 10),
      users: parseInt(vals[1]?.value || "0", 10),
      bounceRate: parseFloat(vals[2]?.value || "0"),
    };
  });
}
