import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { manuallyFeatureDeparture } from "@/lib/services/departure-rotation";

// GET /api/admin/departures/[id] - Get a single departure
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const departure = await prisma.groupDeparture.findUnique({
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
          include: {
            commission: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { error: "Departure not found" },
        { status: 404 }
      );
    }

    // Calculate spots
    const bookedSpots = departure.bookings
      .filter((b) => ["DEPOSIT_PAID", "CONFIRMED", "COMPLETED"].includes(b.status))
      .reduce((sum, booking) => sum + booking.totalClimbers, 0);

    return NextResponse.json({
      ...departure,
      bookedSpots,
      spotsRemaining: departure.maxParticipants - bookedSpots,
    });
  } catch (error) {
    console.error("Error fetching departure:", error);
    return NextResponse.json(
      { error: "Failed to fetch departure" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/departures/[id] - Update a departure
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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

    // Handle manual featuring through the service
    if (isFeatured !== undefined && isManuallyFeatured) {
      await manuallyFeatureDeparture(id, isFeatured);
    }

    // Extract year and month if startDate changed
    let year: number | undefined;
    let month: number | undefined;
    if (startDate) {
      const startDateObj = new Date(startDate);
      year = startDateObj.getFullYear();
      month = startDateObj.getMonth() + 1;
    }

    const departure = await prisma.groupDeparture.update({
      where: { id },
      data: {
        ...(routeId && { routeId }),
        ...(arrivalDate && { arrivalDate: new Date(arrivalDate) }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(summitDate && { summitDate: new Date(summitDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(price !== undefined && { price }),
        ...(currency && { currency }),
        earlyBirdPrice: earlyBirdPrice === null ? null : earlyBirdPrice,
        earlyBirdUntil: earlyBirdUntil ? new Date(earlyBirdUntil) : null,
        ...(minParticipants !== undefined && { minParticipants }),
        ...(maxParticipants !== undefined && { maxParticipants }),
        ...(isFullMoon !== undefined && { isFullMoon }),
        ...(isGuaranteed !== undefined && { isGuaranteed }),
        ...(isFeatured !== undefined && !isManuallyFeatured && { isFeatured }),
        ...(excludeFromRotation !== undefined && { excludeFromRotation }),
        ...(status && { status }),
        ...(internalNotes !== undefined && { internalNotes }),
        ...(publicNotes !== undefined && { publicNotes }),
        ...(year && { year }),
        ...(month && { month }),
      },
      include: {
        route: {
          select: { title: true, slug: true },
        },
      },
    });

    return NextResponse.json(departure);
  } catch (error) {
    console.error("Error updating departure:", error);
    return NextResponse.json(
      { error: "Failed to update departure" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/departures/[id] - Delete a departure
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Check if departure has bookings
    const departure = await prisma.groupDeparture.findUnique({
      where: { id },
      include: {
        _count: { select: { bookings: true } },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { error: "Departure not found" },
        { status: 404 }
      );
    }

    if (departure._count.bookings > 0) {
      return NextResponse.json(
        { error: "Cannot delete departure with existing bookings. Cancel it instead." },
        { status: 400 }
      );
    }

    await prisma.groupDeparture.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting departure:", error);
    return NextResponse.json(
      { error: "Failed to delete departure" },
      { status: 500 }
    );
  }
}
