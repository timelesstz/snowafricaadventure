import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  sendBookingStatusUpdateEmail,
  sendInquiryResponseEmail,
} from "@/lib/email/send";
import { BookingEmailData, InquiryEmailData } from "@/lib/email/templates";

// POST /api/admin/email - Send email from admin
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, targetId, message, subject } = body;

    if (!type || !targetId) {
      return NextResponse.json(
        { error: "Missing required fields: type, targetId" },
        { status: 400 }
      );
    }

    // Get sender name from session
    const senderName = session.user?.name || "Snow Africa Team";

    switch (type) {
      case "booking_update": {
        const booking = await prisma.booking.findUnique({
          where: { id: targetId },
          include: {
            departure: {
              include: {
                route: { select: { title: true } },
              },
            },
          },
        });

        if (!booking) {
          return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 }
          );
        }

        const bookingData: BookingEmailData = {
          bookingId: booking.id,
          leadName: booking.leadName,
          leadEmail: booking.leadEmail,
          routeTitle: booking.departure.route.title,
          departureDate: booking.departure.arrivalDate.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ),
          summitDate: booking.departure.summitDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          totalClimbers: booking.totalClimbers,
          totalPrice: Number(booking.totalPrice),
          depositAmount: Number(booking.depositAmount),
          status: booking.status,
        };

        const result = await sendBookingStatusUpdateEmail(
          bookingData,
          booking.status,
          message
        );

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? "Email sent successfully"
            : result.error,
        });
      }

      case "inquiry_response": {
        if (!message) {
          return NextResponse.json(
            { error: "Message is required for inquiry response" },
            { status: 400 }
          );
        }

        const inquiry = await prisma.inquiry.findUnique({
          where: { id: targetId },
        });

        if (!inquiry) {
          return NextResponse.json(
            { error: "Inquiry not found" },
            { status: 404 }
          );
        }

        const inquiryData: InquiryEmailData = {
          inquiryId: inquiry.id,
          fullName: inquiry.fullName,
          email: inquiry.email,
          phone: inquiry.phone || undefined,
          type: inquiry.type,
          tripType: inquiry.tripType || undefined,
          numAdults: inquiry.numAdults || undefined,
          numChildren: inquiry.numChildren || undefined,
          arrivalDate: inquiry.arrivalDate
            ? inquiry.arrivalDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : undefined,
          message: inquiry.additionalInfo || undefined,
          nationality: inquiry.nationality || undefined,
        };

        const result = await sendInquiryResponseEmail(
          inquiryData,
          message,
          senderName
        );

        // Update inquiry status to "contacted" if currently "new"
        if (result.success && inquiry.status === "new") {
          await prisma.inquiry.update({
            where: { id: targetId },
            data: { status: "contacted" },
          });
        }

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? "Email sent successfully and status updated"
            : result.error,
        });
      }

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
