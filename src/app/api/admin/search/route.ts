import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/search?q= — quick lookup of bookings and inquiries by
// customer name or email, used by the command palette.
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ bookings: [], inquiries: [] });
  }

  try {
    const [bookings, inquiries] = await Promise.all([
      prisma.booking.findMany({
        where: {
          OR: [
            { leadName: { contains: q, mode: "insensitive" } },
            { leadEmail: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          leadName: true,
          leadEmail: true,
          status: true,
          departure: {
            select: {
              arrivalDate: true,
              route: { select: { title: true } },
            },
          },
        },
      }),
      prisma.inquiry.findMany({
        where: {
          OR: [
            { fullName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          fullName: true,
          email: true,
          type: true,
          tripType: true,
          status: true,
        },
      }),
    ]);

    return NextResponse.json({
      bookings: bookings.map((b) => ({
        id: b.id,
        leadName: b.leadName,
        leadEmail: b.leadEmail,
        status: b.status,
        routeTitle: b.departure.route.title,
        arrivalDate: b.departure.arrivalDate.toISOString(),
      })),
      inquiries,
    });
  } catch (error) {
    console.error("Admin search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
