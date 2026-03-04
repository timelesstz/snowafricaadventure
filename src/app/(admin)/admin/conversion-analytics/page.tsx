import { prisma } from "@/lib/prisma";
import { COUNTRIES } from "@/lib/countries";
import OverviewClient from "./OverviewClient";

export const dynamic = "force-dynamic";

export default async function ConversionAnalyticsPage() {
  // Run all queries in parallel
  const [
    totalBookings,
    trackedBookings,
    totalInquiries,
    trackedInquiries,
    bookingsByCountry,
    inquiriesByCountry,
    bookingsByDevice,
    inquiriesByDevice,
    bookingsByUtm,
    inquiriesByUtm,
    bookingsByBrowser,
    inquiriesByBrowser,
    bookingsByReferrer,
    inquiriesByReferrer,
    recentBookings,
    recentInquiries,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { countryCode: { not: null } } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { countryCode: { not: null } } }),
    prisma.booking.groupBy({
      by: ["countryCode"],
      where: { countryCode: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    }),
    prisma.inquiry.groupBy({
      by: ["countryCode"],
      where: { countryCode: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    }),
    prisma.booking.groupBy({
      by: ["device"],
      where: { device: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.inquiry.groupBy({
      by: ["device"],
      where: { device: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.booking.groupBy({
      by: ["utmSource"],
      where: { utmSource: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.inquiry.groupBy({
      by: ["utmSource"],
      where: { utmSource: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.booking.groupBy({
      by: ["browser"],
      where: { browser: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.inquiry.groupBy({
      by: ["browser"],
      where: { browser: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.booking.groupBy({
      by: ["referrerUrl"],
      where: { AND: [{ referrerUrl: { not: null } }, { referrerUrl: { not: "" } }] },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.inquiry.groupBy({
      by: ["referrerUrl"],
      where: { AND: [{ referrerUrl: { not: null } }, { referrerUrl: { not: "" } }] },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.inquiry.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  // Merge country data
  const countryMap = new Map<string, number>();
  for (const row of bookingsByCountry) {
    if (row.countryCode) {
      countryMap.set(row.countryCode, (countryMap.get(row.countryCode) || 0) + row._count.id);
    }
  }
  for (const row of inquiriesByCountry) {
    if (row.countryCode) {
      countryMap.set(row.countryCode, (countryMap.get(row.countryCode) || 0) + row._count.id);
    }
  }
  const mergedCountries = Array.from(countryMap.entries())
    .map(([countryCode, count]) => ({
      countryCode,
      _count: { id: count },
    }))
    .sort((a, b) => b._count.id - a._count.id);

  // Merge device data
  const deviceMap = new Map<string, number>();
  for (const row of [...bookingsByDevice, ...inquiriesByDevice]) {
    if (row.device) {
      deviceMap.set(row.device, (deviceMap.get(row.device) || 0) + row._count.id);
    }
  }
  const mergedDevices = Array.from(deviceMap.entries())
    .map(([device, count]) => ({ device, _count: { id: count } }))
    .sort((a, b) => b._count.id - a._count.id);

  // Merge UTM data
  const utmMap = new Map<string, number>();
  for (const row of [...bookingsByUtm, ...inquiriesByUtm]) {
    if (row.utmSource) {
      utmMap.set(row.utmSource, (utmMap.get(row.utmSource) || 0) + row._count.id);
    }
  }
  const mergedUtm = Array.from(utmMap.entries())
    .map(([utmSource, count]) => ({ utmSource, _count: { id: count } }))
    .sort((a, b) => b._count.id - a._count.id);

  // Merge browser data
  const browserMap = new Map<string, number>();
  for (const row of [...bookingsByBrowser, ...inquiriesByBrowser]) {
    if (row.browser) {
      browserMap.set(row.browser, (browserMap.get(row.browser) || 0) + row._count.id);
    }
  }
  const mergedBrowsers = Array.from(browserMap.entries())
    .map(([browser, count]) => ({ browser, _count: { id: count } }))
    .sort((a, b) => b._count.id - a._count.id);

  // Merge referrer data
  const referrerMap = new Map<string, number>();
  for (const row of [...bookingsByReferrer, ...inquiriesByReferrer]) {
    if (row.referrerUrl) {
      referrerMap.set(row.referrerUrl, (referrerMap.get(row.referrerUrl) || 0) + row._count.id);
    }
  }
  const mergedReferrers = Array.from(referrerMap.entries())
    .map(([referrerUrl, count]) => ({ referrerUrl, _count: { id: count } }))
    .sort((a, b) => b._count.id - a._count.id)
    .slice(0, 10);

  // Find top country
  const topCountry = mergedCountries[0]
    ? COUNTRIES.find((c) => c.code === mergedCountries[0].countryCode)
    : null;

  // Find top device
  const topDevice = mergedDevices[0]?.device || "N/A";

  return (
    <OverviewClient
      stats={{
        totalBookings,
        trackedBookings,
        totalInquiries,
        trackedInquiries,
        recentBookings,
        recentInquiries,
        topCountry: topCountry
          ? `${topCountry.flag} ${topCountry.name}`
          : "N/A",
        topDevice,
      }}
      countryData={mergedCountries}
      deviceData={mergedDevices}
      utmData={mergedUtm}
      browserData={mergedBrowsers}
      referrerData={mergedReferrers}
    />
  );
}
