import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, BookingStatus, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { nanoid } from "nanoid";
import { sendClimberDetailsRequestEmail } from "@/lib/email/send";
import { adminBookingUpdateSchema } from "@/lib/schemas";

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
    const data = adminBookingUpdateSchema.parse(body);

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

    // Prepare update data (partial — only include fields that were sent)
    const updateData: Prisma.BookingUpdateInput = {};

    if (data.leadName !== undefined) updateData.leadName = data.leadName;
    if (data.leadEmail !== undefined) updateData.leadEmail = data.leadEmail;
    if (data.leadPhone !== undefined) updateData.leadPhone = data.leadPhone;
    if (data.leadNationality !== undefined) updateData.leadNationality = data.leadNationality;
    if (data.totalClimbers !== undefined) updateData.totalClimbers = data.totalClimbers;
    if (data.climberDetails !== undefined) {
      updateData.climberDetails =
        data.climberDetails === null
          ? Prisma.JsonNull
          : (data.climberDetails as Prisma.InputJsonValue);
    }
    if (data.pricePerPerson !== undefined) updateData.pricePerPerson = data.pricePerPerson;
    if (data.totalPrice !== undefined) updateData.totalPrice = data.totalPrice;
    if (data.depositAmount !== undefined) updateData.depositAmount = data.depositAmount;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.source !== undefined) updateData.source = data.source;

    // Handle deposit payment status change
    // When deposit is marked as paid, generate climber tokens
    let shouldGenerateTokens = false;
    if (data.depositPaid !== undefined && data.depositPaid !== currentBooking.depositPaid) {
      updateData.depositPaid = data.depositPaid;
      updateData.depositPaidAt = data.depositPaid ? new Date() : null;

      // Only generate tokens when deposit is newly marked as paid
      if (data.depositPaid && !currentBooking.depositPaid) {
        shouldGenerateTokens = true;
      }
    }

    // Handle balance payment status change
    if (data.balancePaid !== undefined && data.balancePaid !== currentBooking.balancePaid) {
      updateData.balancePaid = data.balancePaid;
      updateData.balancePaidAt = data.balancePaid ? new Date() : null;
    }

    // Handle status change
    if (data.status !== undefined && data.status !== currentBooking.status) {
      updateData.status = data.status as BookingStatus;

      // Set timestamps based on status
      if (data.status === BookingStatus.CONFIRMED) {
        updateData.confirmedAt = new Date();
      } else if (data.status === BookingStatus.CANCELLED || data.status === BookingStatus.REFUNDED) {
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
        // Must await to prevent Vercel serverless from terminating before completion
        await sendClimberDetailsRequestEmail({
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
        });

        // Send individual emails sequentially to avoid SMTP concurrency issues
        for (const token of createdTokens) {
          if (token.email) {
            await sendClimberDetailsRequestEmail({
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
            });
          }
        }
      }
    }

    return NextResponse.json(booking);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/bookings/[id] - Delete a booking (ADMIN+ only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
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
