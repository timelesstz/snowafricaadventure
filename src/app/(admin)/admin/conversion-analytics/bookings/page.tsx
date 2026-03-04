import { prisma } from "@/lib/prisma";
import BookingsClient from "./BookingsClient";

export const dynamic = "force-dynamic";

export default async function BookingsAnalyticsPage() {
  const [
    byCountry,
    byDevice,
    byBrowser,
    byUtm,
    byReferrer,
    revenueByCountry,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.groupBy({
      by: ["countryCode"],
      where: { countryCode: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 25,
    }),
    prisma.booking.groupBy({
      by: ["device"],
      where: { device: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.booking.groupBy({
      by: ["browser"],
      where: { browser: { not: null } },
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
    prisma.booking.groupBy({
      by: ["referrerUrl"],
      where: { AND: [{ referrerUrl: { not: null } }, { referrerUrl: { not: "" } }] },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.booking.groupBy({
      by: ["countryCode"],
      where: { countryCode: { not: null } },
      _count: { id: true },
      _sum: { totalPrice: true },
      orderBy: { _count: { id: "desc" } },
      take: 25,
    }),
    prisma.booking.findMany({
      select: {
        id: true,
        leadName: true,
        leadEmail: true,
        createdAt: true,
        countryCode: true,
        country: true,
        city: true,
        device: true,
        browser: true,
        ipAddress: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        referrerUrl: true,
        landingPage: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const records = recentBookings.map((b) => ({
    id: b.id,
    name: b.leadName,
    email: b.leadEmail,
    createdAt: b.createdAt.toISOString(),
    countryCode: b.countryCode,
    country: b.country,
    city: b.city,
    device: b.device,
    browser: b.browser,
    ipAddress: b.ipAddress,
    utmSource: b.utmSource,
    utmMedium: b.utmMedium,
    utmCampaign: b.utmCampaign,
    referrerUrl: b.referrerUrl,
    landingPage: b.landingPage,
  }));

  const revenueData = revenueByCountry.map((r) => ({
    countryCode: r.countryCode,
    _sum: { totalPrice: Number(r._sum.totalPrice || 0) },
  }));

  return (
    <BookingsClient
      countryData={byCountry}
      deviceData={byDevice}
      browserData={byBrowser}
      utmData={byUtm}
      referrerData={byReferrer}
      revenueData={revenueData}
      records={records}
    />
  );
}
