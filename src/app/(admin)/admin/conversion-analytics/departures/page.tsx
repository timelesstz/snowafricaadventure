import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import DeparturesClient from "./DeparturesClient";

export const dynamic = "force-dynamic";

export default async function DeparturesAnalyticsPage() {
  const departures = await prisma.groupDeparture.findMany({
    where: {
      arrivalDate: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
    },
    include: {
      route: { select: { title: true } },
      bookings: {
        where: { status: { not: BookingStatus.CANCELLED } },
        select: {
          id: true,
          leadName: true,
          totalClimbers: true,
          totalPrice: true,
          countryCode: true,
          country: true,
          device: true,
          utmSource: true,
          browser: true,
          createdAt: true,
        },
      },
    },
    orderBy: { arrivalDate: "asc" },
  });

  const departureData = departures.map((dep) => {
    // Country breakdown
    const countryMap = new Map<string, number>();
    dep.bookings.forEach((b) => {
      if (b.countryCode) {
        countryMap.set(b.countryCode, (countryMap.get(b.countryCode) || 0) + 1);
      }
    });

    // Device breakdown
    const deviceMap = new Map<string, number>();
    dep.bookings.forEach((b) => {
      if (b.device) {
        deviceMap.set(b.device, (deviceMap.get(b.device) || 0) + 1);
      }
    });

    // UTM breakdown
    const utmMap = new Map<string, number>();
    dep.bookings.forEach((b) => {
      if (b.utmSource) {
        utmMap.set(b.utmSource, (utmMap.get(b.utmSource) || 0) + 1);
      }
    });

    const totalRevenue = dep.bookings.reduce(
      (sum, b) => sum + Number(b.totalPrice),
      0
    );
    const totalClimbers = dep.bookings.reduce(
      (sum, b) => sum + b.totalClimbers,
      0
    );

    return {
      id: dep.id,
      routeTitle: dep.route.title,
      arrivalDate: dep.arrivalDate.toISOString(),
      endDate: dep.endDate.toISOString(),
      maxParticipants: dep.maxParticipants,
      status: dep.status,
      totalBookings: dep.bookings.length,
      totalClimbers,
      totalRevenue,
      countries: Array.from(countryMap.entries())
        .map(([code, count]) => ({ code, count }))
        .sort((a, b) => b.count - a.count),
      devices: Array.from(deviceMap.entries())
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count),
      utmSources: Array.from(utmMap.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count),
    };
  });

  return <DeparturesClient departures={departureData} />;
}
