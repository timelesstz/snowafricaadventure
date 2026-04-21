import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, DepartureStatus, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminDepartureUpdateSchema } from "@/lib/schemas";
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
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = adminDepartureUpdateSchema.parse(body);

    // Handle manual featuring through the service
    if (data.isFeatured !== undefined && data.isManuallyFeatured) {
      await manuallyFeatureDeparture(id, data.isFeatured);
    }

    // Extract year and month if startDate changed
    const updateData: Prisma.GroupDepartureUpdateInput = {};
    if (data.routeId) updateData.route = { connect: { id: data.routeId } };
    if (data.arrivalDate) updateData.arrivalDate = data.arrivalDate;
    if (data.startDate) {
      updateData.startDate = data.startDate;
      updateData.year = data.startDate.getFullYear();
      updateData.month = data.startDate.getMonth() + 1;
    }
    if (data.summitDate) updateData.summitDate = data.summitDate;
    if (data.endDate) updateData.endDate = data.endDate;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.currency) updateData.currency = data.currency;
    if (data.earlyBirdPrice !== undefined) updateData.earlyBirdPrice = data.earlyBirdPrice;
    if (data.earlyBirdUntil !== undefined) updateData.earlyBirdUntil = data.earlyBirdUntil;
    if (data.minParticipants !== undefined) updateData.minParticipants = data.minParticipants;
    if (data.maxParticipants !== undefined) updateData.maxParticipants = data.maxParticipants;
    if (data.isFullMoon !== undefined) updateData.isFullMoon = data.isFullMoon;
    if (data.isGuaranteed !== undefined) updateData.isGuaranteed = data.isGuaranteed;
    if (data.isFeatured !== undefined && !data.isManuallyFeatured) {
      updateData.isFeatured = data.isFeatured;
    }
    if (data.excludeFromRotation !== undefined) updateData.excludeFromRotation = data.excludeFromRotation;
    if (data.status) updateData.status = data.status as DepartureStatus;
    if (data.internalNotes !== undefined) updateData.internalNotes = data.internalNotes;
    if (data.publicNotes !== undefined) updateData.publicNotes = data.publicNotes;

    const departure = await prisma.groupDeparture.update({
      where: { id },
      data: updateData,
      include: {
        route: {
          select: { title: true, slug: true },
        },
      },
    });

    return NextResponse.json(departure);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
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
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
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
