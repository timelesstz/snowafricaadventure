import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    select: {
      leadEmail: true,
      climberTokens: { select: { email: true } },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const recipients = new Set<string>();
  if (booking.leadEmail) recipients.add(booking.leadEmail.toLowerCase());
  for (const t of booking.climberTokens) {
    if (t.email) recipients.add(t.email.toLowerCase());
  }

  if (recipients.size === 0) {
    return NextResponse.json({ logs: [] });
  }

  const where: Prisma.EmailLogWhereInput = {
    OR: Array.from(recipients).map((r) => ({
      recipient: { equals: r, mode: "insensitive" as const },
    })),
  };

  const logs = await prisma.emailLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      recipient: true,
      subject: true,
      type: true,
      status: true,
      error: true,
      sentAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ logs });
}
