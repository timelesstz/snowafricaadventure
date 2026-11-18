import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { emailShareTemplate } from "@/lib/email/templates";
import { buildShareUrl } from "@/lib/share";
import { SITE_CONFIG } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { hasNoLinks, isSingleLinePlainText } from "@/lib/email/visitor-text";

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

// Validation schema. Subject and message go out under the Snow Africa
// Adventure name, so links are refused and both are escaped in the template.
const shareEmailSchema = z.object({
  recipients: z
    .array(z.string().trim().email("One of the email addresses isn't valid").max(320))
    .min(1, "Add at least one email address")
    .max(10, "You can send to 10 people at most"),
  subject: z
    .string()
    .trim()
    .min(1, "Add a subject")
    .max(120, "Keep the subject under 120 characters")
    .refine(isSingleLinePlainText, "The subject contains characters we can't use")
    .refine(hasNoLinks, "Please leave links out of the subject"),
  message: z
    .string()
    .trim()
    .min(1, "Add a message")
    .max(2000, "Keep the message under 2,000 characters")
    .refine(hasNoLinks, "Please leave links out of the message. We add the departures link for you."),
  departureId: z.string().regex(/^[a-z0-9]{1,50}$/i).optional(),
});

/**
 * Send limits kept in the email log, so they hold across every server
 * instance (the in-memory limiter above resets whenever a new one starts).
 */
const SHARE_LIMITS = { perRecipientPerDay: 2, sitewidePerHour: 20 };

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
    const recipients = [...new Set(validatedData.recipients.map((r) => r.toLowerCase()))];

    const now = Date.now();
    const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const hourAgo = new Date(now - 60 * 60 * 1000);
    const [sitewide, ...perRecipient] = await Promise.all([
      prisma.emailLog.count({ where: { type: "share", createdAt: { gte: hourAgo } } }),
      ...recipients.map((email) =>
        prisma.emailLog.count({
          where: {
            type: "share",
            createdAt: { gte: dayAgo },
            recipient: { contains: email, mode: "insensitive" },
          },
        })
      ),
    ]);
    if (
      sitewide >= SHARE_LIMITS.sitewidePerHour ||
      perRecipient.some((n) => n >= SHARE_LIMITS.perRecipientPerDay)
    ) {
      console.warn("[Share email] Send limit reached", { sitewide, perRecipient });
      return NextResponse.json(
        {
          success: false,
          error: "We can't send more emails right now. Please copy the page link and send it yourself instead.",
        },
        { status: 429 }
      );
    }

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
      to: recipients,
      subject: validatedData.subject,
      type: "share",
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
      recipientCount: recipients.length,
    });
  } catch (error) {
    console.error("Error sending share email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          // The share modal shows `error` as is, so send the first readable reason.
          error: error.issues[0]?.message ?? "Please check the form and try again.",
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
