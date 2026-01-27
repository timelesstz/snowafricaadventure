import { prisma } from "@/lib/prisma";
import { DepartureStatus, RotationMode, BookingStatus } from "@prisma/client";

export interface RotationResult {
  success: boolean;
  timestamp: Date;
  completedDepartures: number;
  featuredUpdates: {
    routeId: string;
    routeTitle: string;
    previousFeatured: string | null;
    newFeatured: string | null;
  }[];
  statusChanges: {
    departureId: string;
    oldStatus: DepartureStatus;
    newStatus: DepartureStatus;
  }[];
  errors: string[];
}

/**
 * Get or create the auto-rotation configuration
 */
export async function getRotationConfig() {
  let config = await prisma.autoRotationConfig.findFirst();

  if (!config) {
    config = await prisma.autoRotationConfig.create({
      data: {
        isEnabled: true,
        mode: RotationMode.NEXT_UPCOMING,
        skipWithinDays: 3,
        prioritizeFullMoon: false,
      },
    });
  }

  return config;
}

/**
 * Update the rotation configuration
 */
export async function updateRotationConfig(data: {
  isEnabled?: boolean;
  mode?: RotationMode;
  skipWithinDays?: number;
  prioritizeFullMoon?: boolean;
}) {
  const config = await getRotationConfig();

  return prisma.autoRotationConfig.update({
    where: { id: config.id },
    data,
  });
}

/**
 * Mark expired departures as COMPLETED
 */
async function markExpiredDepartures(): Promise<{
  count: number;
  ids: string[];
}> {
  const now = new Date();

  // Find expired departures that are still active
  const expiredDepartures = await prisma.groupDeparture.findMany({
    where: {
      endDate: { lt: now },
      status: {
        notIn: [DepartureStatus.COMPLETED, DepartureStatus.CANCELLED],
      },
    },
    select: { id: true },
  });

  const ids = expiredDepartures.map((d) => d.id);

  if (ids.length > 0) {
    await prisma.groupDeparture.updateMany({
      where: { id: { in: ids } },
      data: {
        status: DepartureStatus.COMPLETED,
        isFeatured: false,
      },
    });
  }

  return { count: ids.length, ids };
}

/**
 * Calculate spots remaining for a departure
 */
async function getSpotsRemaining(departureId: string): Promise<number> {
  const departure = await prisma.groupDeparture.findUnique({
    where: { id: departureId },
    select: {
      maxParticipants: true,
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
    },
  });

  if (!departure) return 0;

  const bookedSpots = departure.bookings.reduce(
    (sum, booking) => sum + booking.totalClimbers,
    0
  );

  return departure.maxParticipants - bookedSpots;
}

/**
 * Update departure statuses based on booking counts
 */
async function updateDepartureStatuses(): Promise<
  { departureId: string; oldStatus: DepartureStatus; newStatus: DepartureStatus }[]
> {
  const changes: {
    departureId: string;
    oldStatus: DepartureStatus;
    newStatus: DepartureStatus;
  }[] = [];

  // Get all active departures (OPEN, LIMITED, GUARANTEED)
  const activeDepartures = await prisma.groupDeparture.findMany({
    where: {
      status: {
        in: [DepartureStatus.OPEN, DepartureStatus.LIMITED, DepartureStatus.GUARANTEED],
      },
      endDate: { gt: new Date() },
    },
    select: {
      id: true,
      status: true,
      maxParticipants: true,
      isGuaranteed: true,
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
    },
  });

  for (const departure of activeDepartures) {
    const bookedSpots = departure.bookings.reduce(
      (sum, booking) => sum + booking.totalClimbers,
      0
    );
    const spotsRemaining = departure.maxParticipants - bookedSpots;

    let newStatus: DepartureStatus = departure.status;

    if (spotsRemaining <= 0) {
      newStatus = DepartureStatus.FULL;
    } else if (spotsRemaining <= 3 && departure.status === DepartureStatus.OPEN) {
      newStatus = DepartureStatus.LIMITED;
    } else if (spotsRemaining > 3 && departure.status === DepartureStatus.LIMITED) {
      // If spots opened up (cancellation), go back to OPEN or GUARANTEED
      newStatus = departure.isGuaranteed
        ? DepartureStatus.GUARANTEED
        : DepartureStatus.OPEN;
    }

    if (newStatus !== departure.status) {
      await prisma.groupDeparture.update({
        where: { id: departure.id },
        data: { status: newStatus },
      });

      changes.push({
        departureId: departure.id,
        oldStatus: departure.status,
        newStatus,
      });
    }
  }

  return changes;
}

/**
 * Rotate featured departures for each route
 */
async function rotateFeaturedDepartures(config: {
  mode: RotationMode;
  skipWithinDays: number;
  prioritizeFullMoon: boolean;
}): Promise<
  {
    routeId: string;
    routeTitle: string;
    previousFeatured: string | null;
    newFeatured: string | null;
  }[]
> {
  const updates: {
    routeId: string;
    routeTitle: string;
    previousFeatured: string | null;
    newFeatured: string | null;
  }[] = [];

  // Skip if mode is manual only
  if (config.mode === RotationMode.MANUAL_ONLY) {
    return updates;
  }

  // Get all active routes
  const routes = await prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: { id: true, title: true },
  });

  const now = new Date();
  const skipDate = new Date(now);
  skipDate.setDate(skipDate.getDate() + config.skipWithinDays);

  for (const route of routes) {
    // Get current featured departure for this route (if any)
    const currentFeatured = await prisma.groupDeparture.findFirst({
      where: {
        routeId: route.id,
        isFeatured: true,
      },
      select: { id: true, isManuallyFeatured: true },
    });

    // Skip if manually featured (admin override)
    if (currentFeatured?.isManuallyFeatured) {
      continue;
    }

    // Find the next eligible departure for featuring
    const nextDeparture = await prisma.groupDeparture.findFirst({
      where: {
        routeId: route.id,
        startDate: { gte: skipDate },
        endDate: { gt: now },
        excludeFromRotation: false,
        status: {
          in: [DepartureStatus.OPEN, DepartureStatus.LIMITED, DepartureStatus.GUARANTEED],
        },
      },
      orderBy: config.prioritizeFullMoon
        ? [{ isFullMoon: "desc" }, { startDate: "asc" }]
        : { startDate: "asc" },
      select: { id: true },
    });

    // Only update if there's a change
    if (nextDeparture?.id !== currentFeatured?.id) {
      // Unfeature current
      if (currentFeatured) {
        await prisma.groupDeparture.update({
          where: { id: currentFeatured.id },
          data: { isFeatured: false },
        });
      }

      // Feature next
      if (nextDeparture) {
        await prisma.groupDeparture.update({
          where: { id: nextDeparture.id },
          data: { isFeatured: true },
        });
      }

      updates.push({
        routeId: route.id,
        routeTitle: route.title,
        previousFeatured: currentFeatured?.id || null,
        newFeatured: nextDeparture?.id || null,
      });
    }
  }

  return updates;
}

/**
 * Main rotation function - orchestrates all rotation tasks
 */
export async function rotateDepartures(): Promise<RotationResult> {
  const result: RotationResult = {
    success: false,
    timestamp: new Date(),
    completedDepartures: 0,
    featuredUpdates: [],
    statusChanges: [],
    errors: [],
  };

  try {
    // Get rotation config
    const config = await getRotationConfig();

    // Skip if disabled
    if (!config.isEnabled) {
      result.success = true;
      return result;
    }

    // Phase 1: Mark expired departures as COMPLETED
    const expired = await markExpiredDepartures();
    result.completedDepartures = expired.count;

    // Phase 2: Rotate featured departures per route
    result.featuredUpdates = await rotateFeaturedDepartures({
      mode: config.mode,
      skipWithinDays: config.skipWithinDays,
      prioritizeFullMoon: config.prioritizeFullMoon,
    });

    // Phase 3: Update LIMITED/FULL status based on bookings
    result.statusChanges = await updateDepartureStatuses();

    // Update last rotation timestamp
    await prisma.autoRotationConfig.update({
      where: { id: config.id },
      data: {
        lastRotationAt: new Date(),
        lastRotationResult: JSON.parse(JSON.stringify(result)),
      },
    });

    result.success = true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    result.errors.push(errorMessage);
    console.error("Departure rotation error:", error);
  }

  return result;
}

/**
 * Manually feature a specific departure
 */
export async function manuallyFeatureDeparture(
  departureId: string,
  feature: boolean
): Promise<void> {
  const departure = await prisma.groupDeparture.findUnique({
    where: { id: departureId },
    select: { routeId: true },
  });

  if (!departure) {
    throw new Error("Departure not found");
  }

  if (feature) {
    // Unfeature any other featured departures for this route
    await prisma.groupDeparture.updateMany({
      where: {
        routeId: departure.routeId,
        isFeatured: true,
        id: { not: departureId },
      },
      data: { isFeatured: false, isManuallyFeatured: false },
    });

    // Feature this departure
    await prisma.groupDeparture.update({
      where: { id: departureId },
      data: { isFeatured: true, isManuallyFeatured: true },
    });
  } else {
    // Unfeature this departure
    await prisma.groupDeparture.update({
      where: { id: departureId },
      data: { isFeatured: false, isManuallyFeatured: false },
    });
  }
}

/**
 * Get the featured departure queue for a route
 */
export async function getFeaturedQueue(routeId: string) {
  const config = await getRotationConfig();
  const now = new Date();
  const skipDate = new Date(now);
  skipDate.setDate(skipDate.getDate() + config.skipWithinDays);

  const departures = await prisma.groupDeparture.findMany({
    where: {
      routeId,
      startDate: { gte: now },
      endDate: { gt: now },
      status: {
        in: [DepartureStatus.OPEN, DepartureStatus.LIMITED, DepartureStatus.GUARANTEED],
      },
    },
    orderBy: config.prioritizeFullMoon
      ? [{ isFullMoon: "desc" }, { startDate: "asc" }]
      : { startDate: "asc" },
    include: {
      route: { select: { title: true } },
      _count: { select: { bookings: true } },
    },
  });

  return departures.map((d, index) => ({
    ...d,
    queuePosition: index + 1,
    isEligibleForFeaturing: d.startDate >= skipDate && !d.excludeFromRotation,
  }));
}
