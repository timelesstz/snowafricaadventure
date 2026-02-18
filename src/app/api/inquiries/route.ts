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
  childrenAges: z.string().optional(),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  duration: z.preprocess(
    (val) => {
      if (val === "" || val === undefined || val === null) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().optional()
  ),
  flexibility: z.string().optional(),
  budget: z.string().optional(),
  destinations: z.string().optional(),
  accommodation: z.string().optional(),
  interests: z.string().optional(),
  experience: z.string().optional(),
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

    // Parse departure date if provided
    let departureDate: Date | null = null;
    if (validatedData.departureDate) {
      departureDate = new Date(validatedData.departureDate);
      if (isNaN(departureDate.getTime())) {
        departureDate = null;
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
        childrenAges: validatedData.childrenAges || null,
        arrivalDate,
        departureDate,
        duration: validatedData.duration || null,
        flexibility: validatedData.flexibility || null,
        budget: validatedData.budget || null,
        destinations: validatedData.destinations || null,
        accommodation: validatedData.accommodation || null,
        interests: validatedData.interests || null,
        experience: validatedData.experience || null,
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

    // Send confirmation emails and create notification
    // Must await to prevent Vercel serverless from terminating before completion
    console.log(`[Inquiry] Sending emails for inquiry ${inquiry.id}, type: ${inquiry.type}, email: ${inquiry.email}`);

    let emailStatus = { customer: false, admin: false, error: "" };

    try {
      const emailResults = await sendInquiryReceivedEmails(emailData);
      emailStatus.customer = emailResults.customer.success;
      emailStatus.admin = emailResults.admin.success;
      if (!emailResults.customer.success) {
        emailStatus.error = `Customer: ${emailResults.customer.error}`;
      }
      if (!emailResults.admin.success) {
        emailStatus.error += `${emailStatus.error ? "; " : ""}Admin: ${emailResults.admin.error}`;
      }
      console.log(`[Inquiry] Email results - customer: ${emailResults.customer.success}, admin: ${emailResults.admin.success}`);
    } catch (emailError) {
      const msg = emailError instanceof Error ? emailError.message : "Unknown email error";
      emailStatus.error = msg;
      console.error(`[Inquiry] Email sending threw:`, msg);
    }

    // Create in-app notification (separate from email)
    try {
      await InquiryNotifications.newInquiry({
        inquiryId: inquiry.id,
        fullName: inquiry.fullName,
        type: inquiry.type,
        tripType: inquiry.tripType || undefined,
      });
    } catch (notifError) {
      console.error("Failed to create inquiry notification:", notifError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully. We'll be in touch soon!",
        inquiryId: inquiry.id,
        emailStatus,
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
