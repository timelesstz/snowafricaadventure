import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { BookingStatus } from "@prisma/client";

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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      departureId,
      leadName,
      leadEmail,
      leadPhone,
      leadNationality,
      totalClimbers,
      climberDetails,
      pricePerPerson,
      depositAmount,
      status,
      notes,
      source,
    } = body;

    // Calculate total price
    const totalPrice = pricePerPerson * totalClimbers;

    const booking = await prisma.booking.create({
      data: {
        departureId,
        leadName,
        leadEmail,
        leadPhone,
        leadNationality,
        totalClimbers: totalClimbers || 1,
        climberDetails,
        pricePerPerson,
        totalPrice,
        depositAmount,
        status: status || BookingStatus.INQUIRY,
        notes,
        source: source || "admin",
      },
      include: {
        departure: {
          include: {
            route: { select: { title: true } },
          },
        },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
