import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryReceivedEmails } from "@/lib/email/send";
import { InquiryEmailData } from "@/lib/email/templates";
import { InquiryNotifications, LeadNotifications } from "@/lib/notifications";
import { HONEYPOT_AUTOFILL_FLAG, isPlausibleHoneypotLead } from "@/lib/notifications/lead-safety";
import { extractVisitorData } from "@/lib/visitor-tracking";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";
import {
  checkFormToken,
  consumeFormToken,
  FORM_TOKEN_FLAG,
  isHardFail,
  isSoftFail,
} from "@/lib/form-guard";

// Validation schema with max-length limits to prevent abuse
const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(320),
  phone: z.string().max(30).optional(),
  phonePrefix: z.string().max(10).optional(),
  nationality: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  tripType: z.string().max(100).optional(),
  numAdults: z.coerce.number().min(0).max(100).optional(),
  numChildren: z.coerce.number().min(0).max(50).optional(),
  childrenAges: z.string().max(200).optional(),
  arrivalDate: z.string().max(30).optional(),
  departureDate: z.string().max(30).optional(),
  duration: z.preprocess(
    (val) => {
      if (val === "" || val === undefined || val === null) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().min(0).max(365).optional()
  ),
  flexibility: z.string().max(50).optional(),
  budget: z.string().max(50).optional(),
  destinations: z.string().max(1000).optional(),
  accommodation: z.string().max(200).optional(),
  interests: z.string().max(1000).optional(),
  experience: z.string().max(200).optional(),
  additionalInfo: z.string().max(5000).optional(),
  relatedTo: z.string().max(500).optional(),
  referralSource: z.string().max(300).optional(),
  type: z.string().max(50).default("contact"),
  // Honeypot field — must be empty (bots fill hidden fields)
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  // Spam-check token from GET /api/form-token/ (see lib/form-guard.ts)
  formToken: z.string().max(200).nullish(),
  // Client-side tracking fields (nullish: client sends null when unavailable)
  gaClientId: z.string().max(100).nullish(),
  utmSource: z.string().max(200).nullish(),
  utmMedium: z.string().max(200).nullish(),
  utmCampaign: z.string().max(200).nullish(),
  referrerUrl: z.string().max(2000).nullish(),
  landingPage: z.string().max(2000).nullish(),
});

// Allow time for post-response email delivery via after() on slow SMTP
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP. When no client IP is resolvable (rare outside Vercel),
    // skip limiting — a shared "unknown" bucket would lock out all such users.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip && isRateLimited(`inquiry:${ip}`, RATE_LIMITS.formSubmission)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: browser autofill can occasionally fill the hidden field, so a
    // hit is never dropped. It is triaged after validation below.
    const honeypotTripped = Boolean(body.website);
    if (honeypotTripped) body.website = "";

    // Validate input
    const validatedData = inquirySchema.parse(body);

    // Spam-check token: a forged, replayed or too-fast token is spam. A
    // missing or expired one may be a real visitor, so it is triaged below.
    const guard = checkFormToken(validatedData.formToken);
    const needsTriage = honeypotTripped || isSoftFail(guard);

    // A triaged lead that looks human (real name and email, a message or trip
    // details, no links or SEO pitch, a real browser) is kept as a normal lead
    // flagged for checking; everything else is filed as spam.
    const triagedPlausible =
      needsTriage &&
      !isHardFail(guard) &&
      isPlausibleHoneypotLead({
        email: validatedData.email,
        name: validatedData.fullName,
        message: validatedData.additionalInfo,
        hasTripFields: Boolean(
          validatedData.arrivalDate ||
            validatedData.numAdults ||
            validatedData.tripType ||
            validatedData.destinations
        ),
        userAgent: request.headers.get("user-agent"),
      });
    const isSpam = isHardFail(guard) || (needsTriage && !triagedPlausible);
    const verifyFlag = triagedPlausible ? (honeypotTripped ? HONEYPOT_AUTOFILL_FLAG : FORM_TOKEN_FLAG) : undefined;
    if (needsTriage || guard !== "ok") {
      console.warn(
        `[Inquiry] Spam check (ip: ${ip || "unknown"}, email: ${validatedData.email}, honeypot: ${honeypotTripped}, token: ${guard}) — ${isSpam ? "saving as spam" : "looks human, saving as new with verify flag"}`
      );
    }

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

    // Extract visitor tracking from request headers
    const visitor = extractVisitorData(request);

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
        // Inquiry has no notes column; the verify flag leads the message so
        // staff see it on the inquiry page. Emails use the original text.
        additionalInfo: verifyFlag
          ? `${verifyFlag}${validatedData.additionalInfo ? `\n${validatedData.additionalInfo}` : ""}`
          : validatedData.additionalInfo || null,
        relatedTo: validatedData.relatedTo || null,
        referralSource: validatedData.referralSource || null,
        type: validatedData.type,
        status: isSpam ? "spam" : "new",
        // Server-side tracking
        ipAddress: visitor.ipAddress,
        country: visitor.country,
        countryCode: visitor.countryCode,
        city: visitor.city,
        region: visitor.region,
        userAgent: visitor.userAgent,
        device: visitor.device,
        browser: visitor.browser,
        // Client-side tracking
        gaClientId: validatedData.gaClientId || null,
        utmSource: validatedData.utmSource || null,
        utmMedium: validatedData.utmMedium || null,
        utmCampaign: validatedData.utmCampaign || null,
        referrerUrl: validatedData.referrerUrl || null,
        landingPage: validatedData.landingPage || null,
      },
    });

    if (guard === "ok") consumeFormToken(validatedData.formToken);

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
      message: validatedData.additionalInfo || undefined,
      nationality: inquiry.nationality || undefined,
    };

    // Notification and emails run after the response is sent — after() keeps
    // the serverless function alive (waitUntil), so slow SMTP can't delay or
    // kill the user-facing response. The in-app notification is created first
    // so the lead is visible in admin even if SMTP hangs or throws.
    if (!isSpam) {
      after(async () => {
        try {
          await InquiryNotifications.newInquiry({
            inquiryId: inquiry.id,
            fullName: inquiry.fullName,
            type: inquiry.type,
            tripType: inquiry.tripType || undefined,
            verifyNote: verifyFlag,
          });
        } catch (notifError) {
          console.error("Failed to create inquiry notification:", notifError);
        }

        let adminEmailError: string | null = null;
        console.log(`[Inquiry] Sending emails for inquiry ${inquiry.id}, type: ${inquiry.type}`);
        try {
          const emailResults = await sendInquiryReceivedEmails(emailData);
          console.log(`[Inquiry] Email results - customer: ${emailResults.customer.success}, admin: ${emailResults.admin.success}`);
          if (!emailResults.customer.success) {
            console.error(`[Inquiry] Customer email failed:`, emailResults.customer.error);
          }
          if (!emailResults.admin.success) {
            adminEmailError = emailResults.admin.error || "Unknown error";
            console.error(`[Inquiry] Admin email failed:`, emailResults.admin.error);
          }
        } catch (emailError) {
          adminEmailError = emailError instanceof Error ? emailError.message : String(emailError);
          console.error(`[Inquiry] Email sending threw:`, adminEmailError);
        }

        // The owner must hear about a lead even when SMTP is down. The daily
        // lead-followup cron also retries the admin email once.
        if (adminEmailError) {
          try {
            await LeadNotifications.emailFailed({
              leadType: "inquiry",
              leadId: inquiry.id,
              name: inquiry.fullName,
              error: adminEmailError,
            });
          } catch (notifError) {
            console.error("Failed to create email-failed notification:", notifError);
          }
        }
      });
    }

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
