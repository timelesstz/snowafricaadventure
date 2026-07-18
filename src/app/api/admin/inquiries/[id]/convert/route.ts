import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, BookingStatus } from "@prisma/client";
import { z, ZodError } from "zod";

const convertSchema = z.object({
  departureId: z.string().min(1, "Departure is required"),
  totalClimbers: z.number().int().min(1).max(20),
  pricePerPerson: z.number().min(0).optional(),
});

// POST /api/admin/inquiries/[id]/convert - Create a booking from an inquiry
export async function POST(
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
    const data = convertSchema.parse(body);

    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const departure = await prisma.groupDeparture.findUnique({
      where: { id: data.departureId },
      include: { route: { select: { title: true } } },
    });
    if (!departure) {
      return NextResponse.json({ error: "Departure not found" }, { status: 404 });
    }

    const pricePerPerson = data.pricePerPerson ?? Number(departure.price);
    const totalPrice = pricePerPerson * data.totalClimbers;

    const climberDetails = Array.from({ length: data.totalClimbers }, (_, i) =>
      i === 0
        ? {
            name: inquiry.fullName,
            email: inquiry.email,
            phone: inquiry.phone || undefined,
            nationality: inquiry.nationality || undefined,
            isComplete: false,
          }
        : { name: "", isComplete: false }
    );

    const booking = await prisma.booking.create({
      data: {
        departureId: departure.id,
        leadName: inquiry.fullName,
        leadEmail: inquiry.email,
        leadPhone: inquiry.phone
          ? `${inquiry.phonePrefix ? `${inquiry.phonePrefix} ` : ""}${inquiry.phone}`
          : null,
        leadNationality: inquiry.nationality,
        totalClimbers: data.totalClimbers,
        climberDetails,
        pricePerPerson,
        totalPrice,
        depositAmount: Math.round(totalPrice * 0.1),
        status: BookingStatus.INQUIRY,
        notes: `Converted from inquiry ${inquiry.id}${inquiry.additionalInfo ? `\n\nOriginal message:\n${inquiry.additionalInfo}` : ""}`,
        source: "inquiry-conversion",
        // Carry over attribution from the original inquiry
        gaClientId: inquiry.gaClientId,
        utmSource: inquiry.utmSource,
        utmMedium: inquiry.utmMedium,
        utmCampaign: inquiry.utmCampaign,
        referrerUrl: inquiry.referrerUrl,
        landingPage: inquiry.landingPage,
        ipAddress: inquiry.ipAddress,
        country: inquiry.country,
        countryCode: inquiry.countryCode,
        city: inquiry.city,
        region: inquiry.region,
      },
    });

    await prisma.inquiry.update({
      where: { id },
      data: {
        status: "converted",
        relatedTo: inquiry.relatedTo
          ? `${inquiry.relatedTo} | booking:${booking.id}`
          : `booking:${booking.id}`,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      routeTitle: departure.route.title,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error converting inquiry to booking:", error);
    return NextResponse.json(
      { error: "Failed to convert inquiry" },
      { status: 500 }
    );
  }
}
