import { prisma } from "@/lib/prisma";
import { detectBot } from "@/lib/bot-detector";
import { NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const lastHit = rateLimitMap.get(key);

  if (lastHit && now - lastHit < RATE_LIMIT_WINDOW) {
    return true;
  }

  rateLimitMap.set(key, now);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [k, v] of rateLimitMap.entries()) {
      if (v < cutoff) {
        rateLimitMap.delete(k);
      }
    }
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, userAgent, referer } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL (remove query params and hash for grouping)
    const normalizedUrl = url.split("?")[0].split("#")[0].toLowerCase();

    // Get IP for rate limiting (from headers in production)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const rateLimitKey = `${ip}:${normalizedUrl}`;

    // Rate limit: 1 hit per URL per IP per minute
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json({ success: true, cached: true }, { status: 200 });
    }

    // Detect if this is a bot
    const { isBot, botName } = detectBot(userAgent);

    // Create hit record (for detailed tracking)
    await prisma.notFoundHit.create({
      data: {
        url: normalizedUrl,
        userAgent: userAgent?.substring(0, 1000) || null, // Limit length
        referer: referer?.substring(0, 2000) || null,
        isBot,
        botName,
      },
    });

    // Upsert the aggregated NotFoundUrl record
    await prisma.notFoundUrl.upsert({
      where: { url: normalizedUrl },
      create: {
        url: normalizedUrl,
        hitCount: 1,
        botHitCount: isBot ? 1 : 0,
        humanHitCount: isBot ? 0 : 1,
        lastHitAt: new Date(),
        firstHitAt: new Date(),
        lastReferer: referer?.substring(0, 2000) || null,
        lastUserAgent: userAgent?.substring(0, 1000) || null,
      },
      update: {
        hitCount: { increment: 1 },
        botHitCount: isBot ? { increment: 1 } : undefined,
        humanHitCount: !isBot ? { increment: 1 } : undefined,
        lastHitAt: new Date(),
        lastReferer: referer?.substring(0, 2000) || undefined,
        lastUserAgent: userAgent?.substring(0, 1000) || undefined,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log but don't expose internal errors
    console.error("Error tracking 404:", error);
    return NextResponse.json({ success: true }, { status: 200 }); // Always return success to client
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
