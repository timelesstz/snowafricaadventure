import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DepartureForm } from "@/components/admin/departures/DepartureForm";
import Link from "next/link";
import { ArrowLeft, Trash2, Users, Calendar, AlertCircle } from "lucide-react";
import { DepartureStatusBadge } from "@/components/admin/departures/DepartureStatusBadge";
import { BookingStatus } from "@prisma/client";

async function getDeparture(id: string) {
  return prisma.groupDeparture.findUnique({
    where: { id },
    include: {
      route: {
        select: {
          id: true,
          title: true,
          slug: true,
          duration: true,
          durationDays: true,
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
        select: {
          id: true,
          leadName: true,
          totalClimbers: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

async function getRoutes() {
  return prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      slug: true,
      duration: true,
      durationDays: true,
    },
    orderBy: { title: "asc" },
  });
}

export default async function EditDeparturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [departure, routes] = await Promise.all([
    getDeparture(id),
    getRoutes(),
  ]);

  if (!departure) {
    notFound();
  }

  // Calculate spots
  const bookedSpots = departure.bookings.reduce(
    (sum, booking) => sum + booking.totalClimbers,
    0
  );
  const spotsRemaining = departure.maxParticipants - bookedSpots;

  // Format dates for the form
  const formattedDeparture = {
    id: departure.id,
    routeId: departure.routeId,
    arrivalDate: departure.arrivalDate.toISOString().split("T")[0],
    startDate: departure.startDate.toISOString().split("T")[0],
    summitDate: departure.summitDate.toISOString().split("T")[0],
    endDate: departure.endDate.toISOString().split("T")[0],
    price: Number(departure.price),
    currency: departure.currency,
    earlyBirdPrice: departure.earlyBirdPrice
      ? Number(departure.earlyBirdPrice)
      : null,
    earlyBirdUntil: departure.earlyBirdUntil
      ? departure.earlyBirdUntil.toISOString().split("T")[0]
      : "",
    minParticipants: departure.minParticipants,
    maxParticipants: departure.maxParticipants,
    isFullMoon: departure.isFullMoon,
    isGuaranteed: departure.isGuaranteed,
    isFeatured: departure.isFeatured,
    isManuallyFeatured: departure.isManuallyFeatured,
    excludeFromRotation: departure.excludeFromRotation,
    status: departure.status,
    internalNotes: departure.internalNotes || "",
    publicNotes: departure.publicNotes || "",
  };

  return (
    <div className="space-y-6">
      {/* Booking Info Card */}
      {departure.bookings.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">
                Current Bookings ({bookedSpots} / {departure.maxParticipants}{" "}
                spots)
              </h3>
            </div>
            <div className="space-y-2">
              {departure.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-blue-800">{booking.leadName}</span>
                  <span className="text-blue-600">
                    {booking.totalClimbers}{" "}
                    {booking.totalClimbers === 1 ? "climber" : "climbers"}
                  </span>
                </div>
              ))}
            </div>
            {spotsRemaining <= 3 && spotsRemaining > 0 && (
              <div className="mt-3 flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Only {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""}{" "}
                  remaining
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <DepartureForm
        departure={formattedDeparture}
        routes={routes}
        mode="edit"
      />
    </div>
  );
}
