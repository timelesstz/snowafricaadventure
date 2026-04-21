import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { z } from "zod";
import {
  sendBookingConfirmedEmail,
  sendBookingStatusUpdateEmail,
  sendPaymentReminderEmail,
} from "@/lib/email/send";
import type { BookingEmailData } from "@/lib/email/templates";

const sendEmailSchema = z.object({
  action: z.enum(["confirmation", "deposit_reminder", "balance_reminder", "status_update"]),
  message: z.string().max(2000).optional(),
  previousStatus: z.string().max(50).optional(),
  dueDate: z.string().max(30).optional(),
});

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    const { action, message, previousStatus, dueDate } = sendEmailSchema.parse(body);

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        departure: {
          include: { route: { select: { title: true } } },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const emailData: BookingEmailData = {
      bookingId: booking.id,
      leadName: booking.leadName,
      leadEmail: booking.leadEmail,
      routeTitle: booking.departure.route.title,
      departureDate: formatDate(booking.departure.arrivalDate),
      summitDate: formatDate(booking.departure.endDate),
      totalClimbers: booking.totalClimbers,
      totalPrice: Number(booking.totalPrice),
      depositAmount: Number(booking.depositAmount || 0),
      status: booking.status,
    };

    let result;
    if (action === "confirmation") {
      result = await sendBookingConfirmedEmail(emailData);
    } else if (action === "deposit_reminder") {
      const amountDue = Number(booking.depositAmount || 0);
      const due = dueDate || formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      result = await sendPaymentReminderEmail(emailData, due, amountDue, true);
    } else if (action === "balance_reminder") {
      const amountDue =
        Number(booking.totalPrice) - Number(booking.depositAmount || 0);
      const due = dueDate || formatDate(booking.departure.arrivalDate);
      result = await sendPaymentReminderEmail(emailData, due, amountDue, false);
    } else {
      result = await sendBookingStatusUpdateEmail(
        emailData,
        previousStatus || "",
        message
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, recipient: booking.leadEmail });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error sending booking email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
