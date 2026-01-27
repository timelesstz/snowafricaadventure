import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DepartureStatus } from "@prisma/client";

// GET /api/admin/departures - List all departures
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const routeId = searchParams.get("routeId");
  const status = searchParams.get("status") as DepartureStatus | null;
  const showExpired = searchParams.get("showExpired") === "true";
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  try {
    const departures = await prisma.groupDeparture.findMany({
      where: {
        ...(routeId && { routeId }),
        ...(status && { status }),
        ...(year && { year: parseInt(year) }),
        ...(month && { month: parseInt(month) }),
        ...(!showExpired && {
          OR: [
            { endDate: { gte: new Date() } },
            { status: { in: [DepartureStatus.COMPLETED, DepartureStatus.CANCELLED] } },
          ],
        }),
      },
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
              in: ["DEPOSIT_PAID", "CONFIRMED", "COMPLETED"],
            },
          },
          select: {
            totalClimbers: true,
          },
        },
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: [{ startDate: "asc" }],
    });

    // Calculate spots remaining for each departure
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

    return NextResponse.json(departuresWithSpots);
  } catch (error) {
    console.error("Error fetching departures:", error);
    return NextResponse.json(
      { error: "Failed to fetch departures" },
      { status: 500 }
    );
  }
}

// POST /api/admin/departures - Create a new departure
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      routeId,
      arrivalDate,
      startDate,
      summitDate,
      endDate,
      price,
      currency,
      earlyBirdPrice,
      earlyBirdUntil,
      minParticipants,
      maxParticipants,
      isFullMoon,
      isGuaranteed,
      isFeatured,
      isManuallyFeatured,
      excludeFromRotation,
      status,
      internalNotes,
      publicNotes,
    } = body;

    // Extract year and month from startDate
    const startDateObj = new Date(startDate);
    const year = startDateObj.getFullYear();
    const month = startDateObj.getMonth() + 1;

    const departure = await prisma.groupDeparture.create({
      data: {
        routeId,
        arrivalDate: new Date(arrivalDate),
        startDate: startDateObj,
        summitDate: new Date(summitDate),
        endDate: new Date(endDate),
        price,
        currency: currency || "USD",
        earlyBirdPrice: earlyBirdPrice || null,
        earlyBirdUntil: earlyBirdUntil ? new Date(earlyBirdUntil) : null,
        minParticipants: minParticipants || 2,
        maxParticipants: maxParticipants || 10,
        isFullMoon: isFullMoon || false,
        isGuaranteed: isGuaranteed || false,
        isFeatured: isFeatured || false,
        isManuallyFeatured: isManuallyFeatured || false,
        excludeFromRotation: excludeFromRotation || false,
        status: status || DepartureStatus.OPEN,
        internalNotes,
        publicNotes,
        year,
        month,
      },
      include: {
        route: {
          select: { title: true, slug: true },
        },
      },
    });

    return NextResponse.json(departure, { status: 201 });
  } catch (error) {
    console.error("Error creating departure:", error);
    return NextResponse.json(
      { error: "Failed to create departure" },
      { status: 500 }
    );
  }
}
