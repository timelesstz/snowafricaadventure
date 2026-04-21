import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, BookingStatus, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminBookingCreateSchema } from "@/lib/schemas";
import { createCommission, determineTripType } from "@/lib/commission";

// GET /api/admin/bookings - List all bookings
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as BookingStatus | null;
  const departureId = searchParams.get("departureId");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  try {
    const where = {
      ...(status && { status }),
      ...(departureId && { departureId }),
      ...(search && {
        OR: [
          { leadName: { contains: search, mode: "insensitive" as const } },
          { leadEmail: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          departure: {
            include: {
              route: {
                select: { title: true, slug: true },
              },
            },
          },
          commission: {
            select: { id: true, status: true, commissionAmount: true },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/admin/bookings - Create a new booking (admin)
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch {
    return NextResponse.json(
      { error: "Forbidden", message: "EDITOR role or higher required" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const data = adminBookingCreateSchema.parse(body);

    const totalPrice = data.pricePerPerson * data.totalClimbers;

    const booking = await prisma.booking.create({
      data: {
        departureId: data.departureId,
        leadName: data.leadName,
        leadEmail: data.leadEmail,
        leadPhone: data.leadPhone || null,
        leadNationality: data.leadNationality || null,
        totalClimbers: data.totalClimbers,
        climberDetails: (data.climberDetails as Prisma.InputJsonValue) ?? undefined,
        pricePerPerson: data.pricePerPerson,
        totalPrice,
        depositAmount: data.depositAmount ?? null,
        status: (data.status as BookingStatus) || BookingStatus.INQUIRY,
        notes: data.notes || null,
        source: data.source || "admin",
      },
      include: {
        departure: {
          include: {
            route: { select: { title: true, slug: true } },
          },
        },
      },
    });

    // Create commission for the marketing partner, derived from the route.
    // Admin path was previously silently skipping this — revenue-tracking bug fix.
    const tripType =
      data.tripType ||
      determineTripType({ routeSlug: booking.departure?.route?.slug });

    createCommission({
      bookingId: booking.id,
      bookingAmount: totalPrice,
      tripType,
    }).catch((error) => {
      console.error("Failed to create commission for admin booking:", error);
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
