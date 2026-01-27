import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { code } = await params;

    const inviteLink = await prisma.inviteLink.findUnique({
      where: { code },
      include: {
        departure: {
          include: {
            route: {
              select: {
                title: true,
                slug: true,
              },
            },
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
    });

    if (!inviteLink) {
      return NextResponse.json(
        { success: false, error: "Invalid invite link" },
        { status: 404 }
      );
    }

    // Check if expired
    if (inviteLink.expiresAt && inviteLink.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: "Invite link has expired" },
        { status: 410 }
      );
    }

    // Check if still active
    if (!inviteLink.isActive) {
      return NextResponse.json(
        { success: false, error: "Invite link is no longer active" },
        { status: 410 }
      );
    }

    // Increment click count
    await prisma.inviteLink.update({
      where: { id: inviteLink.id },
      data: { clickCount: { increment: 1 } },
    });

    // Calculate available spots if departure exists
    let departureInfo = null;
    if (inviteLink.departure) {
      const dep = inviteLink.departure;
      departureInfo = {
        id: dep.id,
        routeName: dep.route.title,
        routeSlug: dep.route.slug,
        arrivalDate: dep.arrivalDate.toISOString(),
        endDate: dep.endDate.toISOString(),
        price: Number(dep.price),
        availableSpots: dep.maxParticipants - dep._count.bookings,
        isFullMoon: dep.isFullMoon,
        status: dep.status,
      };
    }

    return NextResponse.json({
      success: true,
      inviterName: inviteLink.creatorName,
      departure: departureInfo,
    });
  } catch (error) {
    console.error("Error validating invite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to validate invite" },
      { status: 500 }
    );
  }
}
