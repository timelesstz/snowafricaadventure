import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { emailShareTemplate } from "@/lib/email/templates";
import { buildShareUrl } from "@/lib/share";
import { SITE_CONFIG } from "@/lib/constants";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 emails per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Validation schema
const shareEmailSchema = z.object({
  recipients: z.array(z.string().email()).min(1).max(10),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  departureId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before sending more emails.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = shareEmailSchema.parse(body);

    // Build share URL with tracking
    const shareUrl = buildShareUrl(
      `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/`,
      {
        source: "email-share",
        medium: "email",
        campaign: "group-departure-share",
        departureId: validatedData.departureId,
      }
    );

    // Send email
    const result = await sendEmail({
      to: validatedData.recipients,
      subject: validatedData.subject,
      html: emailShareTemplate({
        message: validatedData.message,
        shareUrl,
      }),
    });

    if (!result.success) {
      throw new Error(result.error || "Failed to send email");
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      recipientCount: validatedData.recipients.length,
    });
  } catch (error) {
    console.error("Error sending share email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
