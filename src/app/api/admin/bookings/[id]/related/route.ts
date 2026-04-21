import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const current = await prisma.booking.findUnique({
    where: { id },
    select: { leadEmail: true },
  });

  if (!current) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      leadEmail: { equals: current.leadEmail, mode: "insensitive" },
      NOT: { id },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      status: true,
      totalPrice: true,
      totalClimbers: true,
      depositPaid: true,
      balancePaid: true,
      createdAt: true,
      departure: {
        select: {
          arrivalDate: true,
          route: { select: { title: true } },
        },
      },
    },
  });

  return NextResponse.json({ bookings });
}
