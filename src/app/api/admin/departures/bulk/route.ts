import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DepartureStatus } from "@prisma/client";

// Full moon dates for 2025-2027 (can be extended)
const FULL_MOON_DATES = [
  // 2025
  "2025-01-13", "2025-02-12", "2025-03-14", "2025-04-13", "2025-05-12",
  "2025-06-11", "2025-07-10", "2025-08-09", "2025-09-07", "2025-10-07",
  "2025-11-05", "2025-12-04",
  // 2026
  "2026-01-03", "2026-02-01", "2026-03-03", "2026-04-01", "2026-05-01",
  "2026-05-31", "2026-06-29", "2026-07-29", "2026-08-28", "2026-09-26",
  "2026-10-26", "2026-11-24", "2026-12-24",
  // 2027
  "2027-01-22", "2027-02-20", "2027-03-22", "2027-04-20", "2027-05-20",
  "2027-06-18", "2027-07-18", "2027-08-17", "2027-09-15", "2027-10-15",
  "2027-11-13", "2027-12-13",
];

/**
 * Check if a summit date is within 2 days of a full moon
 */
function isNearFullMoon(summitDate: Date): boolean {
  const summitStr = summitDate.toISOString().split("T")[0];
  const summitTime = new Date(summitStr).getTime();

  return FULL_MOON_DATES.some((fullMoonStr) => {
    const fullMoonTime = new Date(fullMoonStr).getTime();
    const diffDays = Math.abs(summitTime - fullMoonTime) / (1000 * 60 * 60 * 24);
    return diffDays <= 2;
  });
}

interface BulkDepartureInput {
  routeId: string;
  arrivalDate: string;
  price: number;
  currency?: string;
  earlyBirdPrice?: number;
  earlyBirdUntil?: string;
  minParticipants?: number;
  maxParticipants?: number;
  isGuaranteed?: boolean;
  internalNotes?: string;
  publicNotes?: string;
}

// POST /api/admin/departures/bulk - Bulk create departures
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { departures, autoDetectFullMoon = true } = body as {
      departures: BulkDepartureInput[];
      autoDetectFullMoon?: boolean;
    };

    if (!departures || !Array.isArray(departures) || departures.length === 0) {
      return NextResponse.json(
        { error: "No departures provided" },
        { status: 400 }
      );
    }

    // Get route durations for calculating dates
    const routeIds = [...new Set(departures.map((d) => d.routeId))];
    const routes = await prisma.trekkingRoute.findMany({
      where: { id: { in: routeIds } },
      select: { id: true, durationDays: true },
    });

    const routeMap = new Map(routes.map((r) => [r.id, r.durationDays]));

    // Prepare bulk create data
    const createData = departures.map((dep) => {
      const routeDays = routeMap.get(dep.routeId) || 7;
      const arrivalDate = new Date(dep.arrivalDate);

      // Calculate dates based on route duration
      // Day 0: Arrival
      // Day 1: Trek starts
      // Day N-1 or N-2: Summit (depends on route)
      // Day N: Trek ends
      const startDate = new Date(arrivalDate);
      startDate.setDate(startDate.getDate() + 1);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + routeDays - 1);

      // Summit is typically 2 days before end for most routes
      const summitDate = new Date(endDate);
      summitDate.setDate(summitDate.getDate() - 1);

      // Check for full moon
      const isFullMoon = autoDetectFullMoon && isNearFullMoon(summitDate);

      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;

      return {
        routeId: dep.routeId,
        arrivalDate,
        startDate,
        summitDate,
        endDate,
        price: dep.price,
        currency: dep.currency || "USD",
        earlyBirdPrice: dep.earlyBirdPrice || null,
        earlyBirdUntil: dep.earlyBirdUntil ? new Date(dep.earlyBirdUntil) : null,
        minParticipants: dep.minParticipants || 2,
        maxParticipants: dep.maxParticipants || 10,
        isFullMoon,
        isGuaranteed: dep.isGuaranteed || false,
        isFeatured: false,
        isManuallyFeatured: false,
        excludeFromRotation: false,
        status: DepartureStatus.OPEN,
        internalNotes: dep.internalNotes || null,
        publicNotes: dep.publicNotes || null,
        year,
        month,
      };
    });

    // Bulk create using transaction
    const result = await prisma.$transaction(
      createData.map((data) => prisma.groupDeparture.create({ data }))
    );

    return NextResponse.json(
      {
        success: true,
        created: result.length,
        departures: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error bulk creating departures:", error);
    return NextResponse.json(
      { error: "Failed to bulk create departures" },
      { status: 500 }
    );
  }
}

// Endpoint to generate preview data for bulk creation
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      routeId,
      startDateRange,
      endDateRange,
      frequency,
      price,
      earlyBirdPrice,
      minParticipants,
      maxParticipants,
      autoDetectFullMoon = true,
    } = body;

    // Get route info
    const route = await prisma.trekkingRoute.findUnique({
      where: { id: routeId },
      select: { id: true, title: true, durationDays: true },
    });

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    const startDate = new Date(startDateRange);
    const endDate = new Date(endDateRange);
    const departures: Array<{
      arrivalDate: Date;
      startDate: Date;
      summitDate: Date;
      endDate: Date;
      isFullMoon: boolean;
    }> = [];

    // Generate departure dates based on frequency
    const currentDate = new Date(startDate);
    const frequencyDays =
      frequency === "weekly"
        ? 7
        : frequency === "biweekly"
          ? 14
          : frequency === "monthly"
            ? 30
            : 7;

    while (currentDate <= endDate) {
      const arrivalDate = new Date(currentDate);
      const trekStartDate = new Date(arrivalDate);
      trekStartDate.setDate(trekStartDate.getDate() + 1);

      const trekEndDate = new Date(trekStartDate);
      trekEndDate.setDate(trekEndDate.getDate() + route.durationDays - 1);

      const summitDate = new Date(trekEndDate);
      summitDate.setDate(summitDate.getDate() - 1);

      const isFullMoon = autoDetectFullMoon && isNearFullMoon(summitDate);

      departures.push({
        arrivalDate,
        startDate: trekStartDate,
        summitDate,
        endDate: trekEndDate,
        isFullMoon,
      });

      currentDate.setDate(currentDate.getDate() + frequencyDays);
    }

    return NextResponse.json({
      route,
      preview: departures.map((d) => ({
        ...d,
        price,
        earlyBirdPrice,
        minParticipants: minParticipants || 2,
        maxParticipants: maxParticipants || 10,
      })),
      totalCount: departures.length,
    });
  } catch (error) {
    console.error("Error generating preview:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 }
    );
  }
}
