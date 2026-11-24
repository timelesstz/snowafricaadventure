import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  AdminRole,
  DepartureActionType,
  DepartureStatus,
  Prisma,
} from "@prisma/client";
import { ZodError } from "zod";
import {
  adminDepartureActionReasonSchema,
  adminDepartureDeleteSchema,
  adminDepartureUpdateSchema,
} from "@/lib/schemas";
import { SPOT_HOLDING_STATUSES, countBookedSpots } from "@/lib/booking-spots";
import { lockDepartureForCapacity } from "@/lib/departure-capacity";

function revalidateDeparturePaths(routeSlug: string) {
  revalidatePath("/kilimanjaro-join-group-departures/");
  revalidatePath(`/trekking/${routeSlug}/`);
  revalidatePath("/trekking/");
  revalidatePath("/");
}

function revalidateAfterCommit(...routeSlugs: string[]) {
  try {
    for (const routeSlug of new Set(routeSlugs)) {
      revalidateDeparturePaths(routeSlug);
    }
    return null;
  } catch (error) {
    console.error("Departure saved, but cache revalidation failed:", error);
    return "The departure was saved, but public pages may take a moment to refresh.";
  }
}

function hasPrismaCode(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

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
  let actorId: string | null = null;
  let actorEmail: string | null = null;
  try {
    const session = await requireRole(AdminRole.EDITOR);
    actorId = session.user.id ?? null;
    actorEmail = session.user.email ?? null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = adminDepartureUpdateSchema.parse(body);

    if (data.status === DepartureStatus.CANCELLED) {
      const result = await prisma.$transaction(async (transaction) => {
        const current = await transaction.groupDeparture.findUnique({
          where: { id },
          select: {
            id: true,
            status: true,
            startDate: true,
            route: { select: { title: true, slug: true } },
          },
        });

        if (!current) return { kind: "missing" as const };
        if (current.status === DepartureStatus.CANCELLED) {
          return { kind: "alreadyCancelled" as const };
        }

        const hasOrdinaryEdits = Object.keys(body).some(
          (key) => key !== "status" && key !== "reason"
        );
        if (hasOrdinaryEdits) return { kind: "mixed" as const };

        const reason = adminDepartureActionReasonSchema.parse(data.reason);
        const changed = await transaction.groupDeparture.updateMany({
          where: { id, status: { not: DepartureStatus.CANCELLED } },
          data: {
            status: DepartureStatus.CANCELLED,
            isFeatured: false,
            isManuallyFeatured: false,
          },
        });
        if (changed.count === 0) return { kind: "conflict" as const };

        const departure = await transaction.groupDeparture.findUnique({
          where: { id },
          include: { route: { select: { title: true, slug: true } } },
        });
        if (!departure) return { kind: "missing" as const };

        await transaction.departureActionLog.create({
          data: {
            departureId: id,
            action: DepartureActionType.SWITCH_OFF,
            reason,
            actorId,
            actorEmail,
            routeTitle: current.route.title,
            startDate: current.startDate,
            status: current.status,
          },
        });

        return {
          kind: "switched" as const,
          departure,
          routeSlug: current.route.slug,
        };
      }, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      });

      if (result.kind === "missing") {
        return NextResponse.json(
          { error: "Departure not found" },
          { status: 404 }
        );
      }
      if (result.kind === "mixed") {
        return NextResponse.json(
          { error: "Save ordinary edits before switching off the departure" },
          { status: 400 }
        );
      }
      if (result.kind === "conflict") {
        return NextResponse.json(
          { error: "Departure status changed. Refresh and try again." },
          { status: 409 }
        );
      }
      if (result.kind === "switched") {
        const warning = revalidateAfterCommit(result.routeSlug);
        return NextResponse.json({
          ...result.departure,
          ...(warning ? { warning } : {}),
        });
      }
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
    if (data.excludeFromRotation !== undefined) updateData.excludeFromRotation = data.excludeFromRotation;
    if (data.status) updateData.status = data.status as DepartureStatus;
    if (data.internalNotes !== undefined) updateData.internalNotes = data.internalNotes;
    if (data.publicNotes !== undefined) updateData.publicNotes = data.publicNotes;

    const result = await prisma.$transaction(async (transaction) => {
      if (
        data.maxParticipants !== undefined &&
        !(await lockDepartureForCapacity(transaction, id))
      ) {
        return { kind: "missing" as const };
      }

      const current = await transaction.groupDeparture.findUnique({
        where: { id },
        select: {
          id: true,
          routeId: true,
          status: true,
          isFeatured: true,
          isManuallyFeatured: true,
          route: { select: { slug: true } },
          bookings: {
            where: { status: { in: SPOT_HOLDING_STATUSES } },
            select: { totalClimbers: true },
          },
        },
      });

      if (!current) return { kind: "missing" as const };

      if (data.maxParticipants !== undefined) {
        const bookedSpots = countBookedSpots(current.bookings);
        if (data.maxParticipants < bookedSpots) {
          return { kind: "capacity" as const, bookedSpots };
        }
      }

      const targetRouteId = data.routeId ?? current.routeId;
      const resultingStatus = data.status ?? current.status;
      const uncheck =
        data.isFeatured === false ||
        (data.isManuallyFeatured === false && current.isManuallyFeatured);
      const resultingIsFeatured =
        resultingStatus === DepartureStatus.CANCELLED || uncheck
          ? false
          : data.isFeatured ?? current.isFeatured;
      const resultingIsManuallyFeatured = resultingIsFeatured
        ? data.isManuallyFeatured ?? current.isManuallyFeatured
        : false;

      if (
        resultingStatus === DepartureStatus.CANCELLED ||
        data.isFeatured !== undefined ||
        data.isManuallyFeatured !== undefined
      ) {
        updateData.isFeatured = resultingIsFeatured;
        updateData.isManuallyFeatured = resultingIsManuallyFeatured;
      }

      if (resultingIsFeatured) {
        await transaction.groupDeparture.updateMany({
          where: {
            routeId: targetRouteId,
            isFeatured: true,
            id: { not: id },
          },
          data: { isFeatured: false, isManuallyFeatured: false },
        });
      }

      const departure = await transaction.groupDeparture.update({
        where: { id },
        data: updateData,
        include: {
          route: {
            select: { title: true, slug: true },
          },
        },
      });

      return {
        kind: "updated" as const,
        departure,
        previousRouteSlug: current.route.slug,
      };
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });

    if (result.kind === "missing") {
      return NextResponse.json(
        { error: "Departure not found" },
        { status: 404 }
      );
    }
    if (result.kind === "capacity") {
      return NextResponse.json(
        {
          error: `Cannot set maxParticipants below the ${result.bookedSpots} spots already booked on paid, confirmed, or completed bookings.`,
        },
        { status: 409 }
      );
    }

    const warning = revalidateAfterCommit(
      result.previousRouteSlug,
      result.departure.route.slug
    );
    return NextResponse.json({
      ...result.departure,
      ...(warning ? { warning } : {}),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    if (hasPrismaCode(error, "P2025")) {
      return NextResponse.json({ error: "Departure not found" }, { status: 404 });
    }
    if (hasPrismaCode(error, "P2034")) {
      return NextResponse.json(
        { error: "Departure changed while saving. Refresh and try again." },
        { status: 409 }
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
  let actorId: string | null = null;
  let actorEmail: string | null = null;
  try {
    const session = await requireRole(AdminRole.EDITOR);
    actorId = session.user.id ?? null;
    actorEmail = session.user.email ?? null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json().catch(() => null);
    const { reason } = adminDepartureDeleteSchema.parse(body);

    const result = await prisma.$transaction(async (transaction) => {
      const departure = await transaction.groupDeparture.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          startDate: true,
          _count: { select: { bookings: true } },
          route: { select: { title: true, slug: true } },
        },
      });

      if (!departure) return { kind: "missing" as const };
      if (departure._count.bookings > 0) return { kind: "booked" as const };

      await transaction.departureActionLog.create({
        data: {
          departureId: id,
          action: DepartureActionType.DELETE,
          reason,
          actorId,
          actorEmail,
          routeTitle: departure.route.title,
          startDate: departure.startDate,
          status: departure.status,
        },
      });

      await transaction.groupDeparture.delete({ where: { id } });
      return { kind: "deleted" as const, routeSlug: departure.route.slug };
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    if (result.kind === "missing") {
      return NextResponse.json(
        { error: "Departure not found" },
        { status: 404 }
      );
    }
    if (result.kind === "booked") {
      return NextResponse.json(
        {
          error:
            "Cannot delete a departure with existing bookings. Switch it off instead.",
        },
        { status: 409 }
      );
    }

    const warning = revalidateAfterCommit(result.routeSlug);
    return NextResponse.json({ success: true, ...(warning ? { warning } : {}) });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    if (hasPrismaCode(error, "P2003")) {
      return NextResponse.json(
        {
          error:
            "Cannot delete a departure with existing bookings. Switch it off instead.",
        },
        { status: 409 }
      );
    }
    if (hasPrismaCode(error, "P2025")) {
      return NextResponse.json({ error: "Departure not found" }, { status: 404 });
    }
    if (hasPrismaCode(error, "P2034")) {
      return NextResponse.json(
        { error: "Departure changed while deleting. Refresh and try again." },
        { status: 409 }
      );
    }
    console.error("Error deleting departure:", error);
    return NextResponse.json(
      { error: "Failed to delete departure" },
      { status: 500 }
    );
  }
}
