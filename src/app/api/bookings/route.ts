import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { sendBookingInquiryEmails } from "@/lib/email/send";
import { BookingEmailData } from "@/lib/email/templates";
import { createCommission } from "@/lib/commission";
import { BookingNotifications } from "@/lib/notifications";

// Climber schema
const climberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  medicalConditions: z.string().optional(),
});

// Booking submission schema
const bookingSchema = z.object({
  departureId: z.string().min(1, "Departure is required"),
  leadName: z.string().min(2, "Lead name is required"),
  leadEmail: z.string().email("Valid email is required"),
  leadPhone: z.string().optional(),
  climbers: z.array(climberSchema).min(1, "At least one climber is required"),
  specialRequests: z.string().optional(),
  partnerCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = bookingSchema.parse(body);

    // Get departure details
    const departure = await prisma.groupDeparture.findUnique({
      where: { id: validatedData.departureId },
      include: {
        route: {
          select: { title: true, slug: true },
        },
      },
    });

    if (!departure) {
      return NextResponse.json(
        { success: false, message: "Departure not found" },
        { status: 404 }
      );
    }

    // Check availability
    const existingBookings = await prisma.booking.count({
      where: {
        departureId: departure.id,
        status: {
          notIn: [BookingStatus.CANCELLED],
        },
      },
    });

    const totalClimbers = validatedData.climbers.length;
    const bookedSpots = existingBookings;
    const availableSpots = departure.maxParticipants - bookedSpots;

    if (totalClimbers > availableSpots) {
      return NextResponse.json(
        {
          success: false,
          message: `Only ${availableSpots} spots available. Please reduce your group size.`,
        },
        { status: 400 }
      );
    }

    // Calculate pricing
    const pricePerPerson = Number(departure.price);
    const totalPrice = pricePerPerson * totalClimbers;
    const depositAmount = Math.round(totalPrice * 0.1); // 10% deposit

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        departureId: departure.id,
        leadName: validatedData.leadName,
        leadEmail: validatedData.leadEmail,
        leadPhone: validatedData.leadPhone || null,
        totalClimbers,
        pricePerPerson,
        totalPrice,
        depositAmount,
        status: BookingStatus.INQUIRY,
        climberDetails: validatedData.climbers,
        notes: validatedData.specialRequests || null,
        source: validatedData.partnerCode ? 'referral' : 'website',
      },
      include: {
        departure: {
          include: {
            route: { select: { title: true } },
          },
        },
      },
    });

    // Create commission for marketing partner (non-blocking)
    createCommission({
      bookingId: booking.id,
      bookingAmount: totalPrice,
      tripType: "kilimanjaro", // Group departures are all Kilimanjaro routes
    }).catch((error) => {
      console.error("Failed to create commission:", error);
    });

    // Prepare email data
    const emailData: BookingEmailData = {
      bookingId: booking.id,
      leadName: booking.leadName,
      leadEmail: booking.leadEmail,
      routeTitle: booking.departure.route.title,
      departureDate: departure.arrivalDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      summitDate: departure.summitDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      totalClimbers: booking.totalClimbers,
      totalPrice: Number(booking.totalPrice),
      depositAmount: Number(booking.depositAmount),
      status: booking.status,
      climbers: validatedData.climbers.map((c) => ({
        name: c.name,
        nationality: c.nationality,
      })),
    };

    // Send confirmation emails (don't block response)
    sendBookingInquiryEmails(emailData).catch((error) => {
      console.error("Failed to send booking emails:", error);
    });

    // Create admin notification (don't block response)
    BookingNotifications.newBooking({
      bookingId: booking.id,
      leadName: booking.leadName,
      routeTitle: departure.route.title,
      totalPrice,
    }).catch((error) => {
      console.error("Failed to create booking notification:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking inquiry submitted successfully!",
        bookingId: booking.id,
        bookingRef: booking.id.slice(-8).toUpperCase(),
        summary: {
          route: departure.route.title,
          departureDate: departure.arrivalDate.toISOString(),
          climbers: totalClimbers,
          totalPrice,
          depositAmount,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing booking:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking. Please try again later.",
      },
      { status: 500 }
    );
  }
}
