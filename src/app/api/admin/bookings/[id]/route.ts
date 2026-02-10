import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { BookingStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { sendClimberDetailsRequestEmail } from "@/lib/email/send";

// GET /api/admin/bookings/[id] - Get a single booking
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
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        departure: {
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
          },
        },
        commission: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/bookings/[id] - Update a booking
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
      leadName,
      leadEmail,
      leadPhone,
      leadNationality,
      totalClimbers,
      climberDetails,
      pricePerPerson,
      totalPrice,
      depositAmount,
      depositPaid,
      balancePaid,
      status,
      notes,
      source,
    } = body;

    // Get current booking for status change tracking
    const currentBooking = await prisma.booking.findUnique({
      where: { id },
      select: { status: true, depositPaid: true, balancePaid: true },
    });

    if (!currentBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (leadName !== undefined) updateData.leadName = leadName;
    if (leadEmail !== undefined) updateData.leadEmail = leadEmail;
    if (leadPhone !== undefined) updateData.leadPhone = leadPhone;
    if (leadNationality !== undefined) updateData.leadNationality = leadNationality;
    if (totalClimbers !== undefined) updateData.totalClimbers = totalClimbers;
    if (climberDetails !== undefined) updateData.climberDetails = climberDetails;
    if (pricePerPerson !== undefined) updateData.pricePerPerson = pricePerPerson;
    if (totalPrice !== undefined) updateData.totalPrice = totalPrice;
    if (depositAmount !== undefined) updateData.depositAmount = depositAmount;
    if (notes !== undefined) updateData.notes = notes;
    if (source !== undefined) updateData.source = source;

    // Handle deposit payment status change
    // When deposit is marked as paid, generate climber tokens
    let shouldGenerateTokens = false;
    if (depositPaid !== undefined && depositPaid !== currentBooking.depositPaid) {
      updateData.depositPaid = depositPaid;
      updateData.depositPaidAt = depositPaid ? new Date() : null;

      // Only generate tokens when deposit is newly marked as paid
      if (depositPaid && !currentBooking.depositPaid) {
        shouldGenerateTokens = true;
      }
    }

    // Handle balance payment status change
    if (balancePaid !== undefined && balancePaid !== currentBooking.balancePaid) {
      updateData.balancePaid = balancePaid;
      updateData.balancePaidAt = balancePaid ? new Date() : null;
    }

    // Handle status change
    if (status !== undefined && status !== currentBooking.status) {
      updateData.status = status;

      // Set timestamps based on status
      if (status === BookingStatus.CONFIRMED) {
        updateData.confirmedAt = new Date();
      } else if (status === BookingStatus.CANCELLED || status === BookingStatus.REFUNDED) {
        updateData.cancelledAt = new Date();
      }
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        departure: {
          include: {
            route: { select: { title: true, slug: true } },
          },
        },
        commission: true,
        climberTokens: true,
      },
    });

    // Generate climber tokens if deposit was just paid and there are multiple climbers
    if (shouldGenerateTokens && booking.totalClimbers > 1) {
      const climberDetails = booking.climberDetails as Array<{
        name?: string;
        email?: string;
        isComplete?: boolean;
      }> | null;

      // Generate tokens for climbers 2 through N (index 1+)
      const tokensToCreate = [];
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiration

      for (let i = 1; i < booking.totalClimbers; i++) {
        const climberData = climberDetails?.[i];
        // Only create token if climber is not complete
        if (!climberData?.isComplete) {
          tokensToCreate.push({
            code: nanoid(10),
            bookingId: booking.id,
            climberIndex: i,
            climberName: climberData?.name || null,
            email: climberData?.email || null,
            expiresAt,
          });
        }
      }

      if (tokensToCreate.length > 0) {
        await prisma.climberToken.createMany({
          data: tokensToCreate,
        });

        // Fetch created tokens
        const createdTokens = await prisma.climberToken.findMany({
          where: { bookingId: booking.id },
        });

        // Send email to lead climber with all climber links
        sendClimberDetailsRequestEmail({
          type: "lead",
          leadName: booking.leadName,
          leadEmail: booking.leadEmail,
          routeName: booking.departure.route.title,
          departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          bookingRef: booking.id.slice(-8).toUpperCase(),
          totalClimbers: booking.totalClimbers,
          tokens: createdTokens.map((t) => ({
            climberIndex: t.climberIndex,
            climberName: t.climberName,
            code: t.code,
          })),
        }).catch((error) => {
          console.error("Failed to send climber details request email:", error);
        });

        // Also send individual emails to climbers with known emails
        for (const token of createdTokens) {
          if (token.email) {
            sendClimberDetailsRequestEmail({
              type: "individual",
              recipientEmail: token.email,
              recipientName: token.climberName,
              leadName: booking.leadName,
              routeName: booking.departure.route.title,
              departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
              token: token.code,
            }).catch((error) => {
              console.error("Failed to send individual climber email:", error);
            });
          }
        }
      }
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/bookings/[id] - Delete a booking
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
    // Check if booking has commission
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { commission: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Delete commission first if exists
    if (booking.commission) {
      await prisma.commission.delete({
        where: { id: booking.commission.id },
      });
    }

    // Delete booking
    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
