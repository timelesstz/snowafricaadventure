import { prisma } from "@/lib/prisma";
import { getRotationConfig } from "@/lib/services/departure-rotation";
import Link from "next/link";
import {
  Plus,
  Calendar,
  Pencil,
  Users,
  Moon,
  CheckCircle,
  Copy,
  Settings,
} from "lucide-react";
import { DepartureStatusBadge } from "@/components/admin/departures/DepartureStatusBadge";
import { FeatureBadge } from "@/components/admin/departures/FeatureBadge";
import { RotationStatusCard } from "@/components/admin/departures/RotationStatusCard";
import { FeaturedPreview } from "@/components/admin/departures/FeaturedPreview";
import { DepartureStatus, BookingStatus } from "@prisma/client";

async function getDepartures() {
  return prisma.groupDeparture.findMany({
    include: {
      route: {
        select: {
          id: true,
          title: true,
          slug: true,
          duration: true,
        },
      },
      bookings: {
        where: {
          status: {
            in: [
              BookingStatus.DEPOSIT_PAID,
              BookingStatus.CONFIRMED,
              BookingStatus.COMPLETED,
            ],
          },
        },
        select: { totalClimbers: true },
      },
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: { startDate: "asc" },
  });
}

async function getRoutes() {
  return prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: { id: true, title: true },
  });
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function DeparturesPage() {
  const [departures, rotationConfig, routes] = await Promise.all([
    getDepartures(),
    getRotationConfig(),
    getRoutes(),
  ]);

  // Calculate spots for each departure
  const departuresWithSpots = departures.map((dep) => {
    const bookedSpots = dep.bookings.reduce(
      (sum, booking) => sum + booking.totalClimbers,
      0
    );
    return {
      ...dep,
      bookedSpots,
      spotsRemaining: dep.maxParticipants - bookedSpots,
    };
  });

  // Separate active and expired
  const now = new Date();
  const activeDepartures = departuresWithSpots.filter(
    (d) =>
      d.endDate >= now &&
      d.status !== DepartureStatus.COMPLETED &&
      d.status !== DepartureStatus.CANCELLED
  );
  const expiredDepartures = departuresWithSpots.filter(
    (d) =>
      d.endDate < now ||
      d.status === DepartureStatus.COMPLETED ||
      d.status === DepartureStatus.CANCELLED
  );

  // Group by month for better display
  const groupedDepartures = activeDepartures.reduce(
    (acc, dep) => {
      const monthKey = new Date(dep.startDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(dep);
      return acc;
    },
    {} as Record<string, typeof activeDepartures>
  );

  // Get featured departures for preview
  const featuredDepartures = activeDepartures
    .filter(
      (d) =>
        d.isFeatured ||
        d.status === DepartureStatus.OPEN ||
        d.status === DepartureStatus.LIMITED ||
        d.status === DepartureStatus.GUARANTEED
    )
    .slice(0, 10)
    .map((d) => ({
      id: d.id,
      arrivalDate: d.arrivalDate.toISOString(),
      startDate: d.startDate.toISOString(),
      isFeatured: d.isFeatured,
      isManuallyFeatured: d.isManuallyFeatured,
      status: d.status,
      route: { title: d.route.title },
    }));

  // Format rotation config for client component
  const configForClient = rotationConfig
    ? {
        id: rotationConfig.id,
        isEnabled: rotationConfig.isEnabled,
        mode: rotationConfig.mode,
        skipWithinDays: rotationConfig.skipWithinDays,
        prioritizeFullMoon: rotationConfig.prioritizeFullMoon,
        lastRotationAt: rotationConfig.lastRotationAt?.toISOString() || null,
        lastRotationResult: rotationConfig.lastRotationResult as {
          completedDepartures?: number;
          featuredUpdates?: { routeId: string }[];
          statusChanges?: { departureId: string }[];
        } | null,
      }
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Group Departures</h1>
          <p className="text-slate-600 mt-1">
            Manage scheduled group departures for Kilimanjaro climbs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/departures/bulk"
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Copy className="w-5 h-5" />
            Bulk Create
          </Link>
          <Link
            href="/admin/departures/new"
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Departure
          </Link>
        </div>
      </div>

      {/* Top Row: Stats + Rotation Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Open Departures</p>
              <p className="text-xl font-bold text-slate-900">
                {activeDepartures.filter((d) => d.status === "OPEN").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Spots</p>
              <p className="text-xl font-bold text-slate-900">
                {activeDepartures.reduce((sum, d) => sum + d.spotsRemaining, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Full Moon Climbs</p>
              <p className="text-xl font-bold text-slate-900">
                {activeDepartures.filter((d) => d.isFullMoon).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Guaranteed</p>
              <p className="text-xl font-bold text-slate-900">
                {activeDepartures.filter((d) => d.isGuaranteed).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Preview & Rotation Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeaturedPreview departures={featuredDepartures} />
        </div>
        <div>
          <RotationStatusCard config={configForClient} />
        </div>
      </div>

      {/* Departures Table */}
      {activeDepartures.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No active departures scheduled
          </h3>
          <p className="text-slate-500 mb-4">
            Add your first group departure to start accepting bookings
          </p>
          <Link
            href="/admin/departures/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Departure
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedDepartures).map(([month, deps]) => (
            <div key={month}>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">{month}</h2>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Route
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Dates
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Price
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Spots
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Status
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                        Flags
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {deps.map((departure) => (
                      <tr key={departure.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">
                              {departure.route.title}
                            </p>
                            <p className="text-sm text-slate-500">
                              {departure.route.duration}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-slate-900">
                              {formatDate(departure.arrivalDate)} -{" "}
                              {formatDate(departure.endDate)}
                            </p>
                            <p className="text-slate-500">
                              Summit: {formatDate(departure.summitDate)}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-slate-900">
                            ${Number(departure.price).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-600">
                            {departure.bookedSpots} / {departure.maxParticipants}
                          </span>
                          {departure.spotsRemaining <= 3 &&
                            departure.spotsRemaining > 0 && (
                              <span className="ml-2 text-xs text-amber-600">
                                ({departure.spotsRemaining} left)
                              </span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                          <DepartureStatusBadge status={departure.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {departure.isFullMoon && (
                              <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded">
                                Full Moon
                              </span>
                            )}
                            {departure.isGuaranteed && (
                              <span className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded">
                                Guaranteed
                              </span>
                            )}
                            <FeatureBadge
                              isFeatured={departure.isFeatured}
                              isManuallyFeatured={departure.isManuallyFeatured}
                              excludeFromRotation={departure.excludeFromRotation}
                              size="sm"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/departures/${departure.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Expired/Completed Departures */}
          {expiredDepartures.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-500 mb-4">
                Past Departures ({expiredDepartures.length})
              </h2>
              <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">
                        Route
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">
                        Dates
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">
                        Bookings
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">
                        Status
                      </th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {expiredDepartures.slice(0, 10).map((departure) => (
                      <tr
                        key={departure.id}
                        className="hover:bg-slate-100 opacity-70"
                      >
                        <td className="px-6 py-3 text-sm text-slate-600">
                          {departure.route.title}
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-500">
                          {formatDate(departure.arrivalDate)} -{" "}
                          {formatDate(departure.endDate)}
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-500">
                          {departure._count.bookings}
                        </td>
                        <td className="px-6 py-3">
                          <DepartureStatusBadge status={departure.status} size="sm" />
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Link
                            href={`/admin/departures/${departure.id}`}
                            className="text-sm text-slate-500 hover:text-slate-700"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
