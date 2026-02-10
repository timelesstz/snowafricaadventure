import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryReceivedEmails } from "@/lib/email/send";
import { InquiryEmailData } from "@/lib/email/templates";
import { InquiryNotifications } from "@/lib/notifications";

// Validation schema
const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  phonePrefix: z.string().optional(),
  nationality: z.string().optional(),
  country: z.string().optional(),
  tripType: z.string().optional(),
  numAdults: z.coerce.number().optional(),
  numChildren: z.coerce.number().optional(),
  arrivalDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  relatedTo: z.string().optional(),
  referralSource: z.string().optional(),
  type: z.string().default("contact"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = inquirySchema.parse(body);

    // Parse arrival date if provided
    let arrivalDate: Date | null = null;
    if (validatedData.arrivalDate) {
      arrivalDate = new Date(validatedData.arrivalDate);
      if (isNaN(arrivalDate.getTime())) {
        arrivalDate = null;
      }
    }

    // Use country as nationality if provided
    const nationality = validatedData.country || validatedData.nationality || null;

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        phonePrefix: validatedData.phonePrefix || null,
        nationality,
        tripType: validatedData.tripType || null,
        numAdults: validatedData.numAdults || null,
        numChildren: validatedData.numChildren || null,
        arrivalDate,
        additionalInfo: validatedData.additionalInfo || null,
        relatedTo: validatedData.relatedTo || null,
        referralSource: validatedData.referralSource || null,
        type: validatedData.type,
        status: "new",
      },
    });

    // Prepare email data
    const emailData: InquiryEmailData = {
      inquiryId: inquiry.id,
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone || undefined,
      type: inquiry.type,
      tripType: inquiry.tripType || undefined,
      numAdults: inquiry.numAdults || undefined,
      numChildren: inquiry.numChildren || undefined,
      arrivalDate: arrivalDate
        ? arrivalDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : undefined,
      message: inquiry.additionalInfo || undefined,
      nationality: inquiry.nationality || undefined,
    };

    // Send confirmation emails (don't block response on email sending)
    sendInquiryReceivedEmails(emailData).catch((error) => {
      console.error("Failed to send inquiry emails:", error);
    });

    // Create admin notification (don't block response)
    InquiryNotifications.newInquiry({
      inquiryId: inquiry.id,
      fullName: inquiry.fullName,
      type: inquiry.type,
      tripType: inquiry.tripType || undefined,
    }).catch((error) => {
      console.error("Failed to create inquiry notification:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully. We'll be in touch soon!",
        inquiryId: inquiry.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);

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
        message: "Failed to process inquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
