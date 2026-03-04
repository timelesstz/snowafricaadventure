import { prisma } from "@/lib/prisma";
import InquiriesClient from "./InquiriesClient";

export const dynamic = "force-dynamic";

export default async function InquiriesAnalyticsPage() {
  const [
    byCountry,
    byDevice,
    byBrowser,
    byUtm,
    byReferrer,
    byType,
    recentInquiries,
  ] = await Promise.all([
    prisma.inquiry.groupBy({
      by: ["countryCode"],
      where: { countryCode: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 25,
    }),
    prisma.inquiry.groupBy({
      by: ["device"],
      where: { device: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.inquiry.groupBy({
      by: ["browser"],
      where: { browser: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.inquiry.groupBy({
      by: ["utmSource"],
      where: { utmSource: { not: null } },
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
    prisma.inquiry.groupBy({
      by: ["type"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.inquiry.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        type: true,
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

  const records = recentInquiries.map((inq) => ({
    id: inq.id,
    name: inq.fullName,
    email: inq.email,
    type: inq.type,
    createdAt: inq.createdAt.toISOString(),
    countryCode: inq.countryCode,
    country: inq.country,
    city: inq.city,
    device: inq.device,
    browser: inq.browser,
    ipAddress: inq.ipAddress,
    utmSource: inq.utmSource,
    utmMedium: inq.utmMedium,
    utmCampaign: inq.utmCampaign,
    referrerUrl: inq.referrerUrl,
    landingPage: inq.landingPage,
  }));

  const typeBreakdown = byType.map((t) => ({
    type: t.type,
    count: t._count.id,
  }));

  return (
    <InquiriesClient
      countryData={byCountry}
      deviceData={byDevice}
      browserData={byBrowser}
      utmData={byUtm}
      referrerData={byReferrer}
      typeBreakdown={typeBreakdown}
      records={records}
    />
  );
}
