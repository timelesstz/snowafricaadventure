import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, DepartureStatus } from "@prisma/client";
import { ZodError } from "zod";
import { adminDepartureCreateSchema } from "@/lib/schemas";

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
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  try {
    const body = await request.json();
    const data = adminDepartureCreateSchema.parse(body);

    // Extract year and month from startDate
    const year = data.startDate.getFullYear();
    const month = data.startDate.getMonth() + 1;

    const departure = await prisma.groupDeparture.create({
      data: {
        routeId: data.routeId,
        arrivalDate: data.arrivalDate,
        startDate: data.startDate,
        summitDate: data.summitDate,
        endDate: data.endDate,
        price: data.price,
        currency: data.currency || "USD",
        earlyBirdPrice: data.earlyBirdPrice ?? null,
        earlyBirdUntil: data.earlyBirdUntil ?? null,
        minParticipants: data.minParticipants ?? 2,
        maxParticipants: data.maxParticipants ?? 10,
        isFullMoon: data.isFullMoon ?? false,
        isGuaranteed: data.isGuaranteed ?? false,
        isFeatured: data.isFeatured ?? false,
        isManuallyFeatured: data.isManuallyFeatured ?? false,
        excludeFromRotation: data.excludeFromRotation ?? false,
        status: (data.status as DepartureStatus) || DepartureStatus.OPEN,
        internalNotes: data.internalNotes ?? null,
        publicNotes: data.publicNotes ?? null,
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating departure:", error);
    return NextResponse.json(
      { error: "Failed to create departure" },
      { status: 500 }
    );
  }
}
