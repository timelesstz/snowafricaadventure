import { prisma } from "@/lib/prisma";
import { detectBot } from "@/lib/bot-detector";
import { getClientIp } from "@/lib/auth-rate-limit";
import { NextResponse } from "next/server";

// This endpoint is public and writes to the database, so it is capped two
// ways (per server instance): one hit per URL per IP per minute, and at most
// PER_IP_LIMIT recorded hits per IP per 10 minutes across all URLs. Without
// the second cap, one client posting endless made-up paths could flood the
// NotFoundHit/NotFoundUrl tables.
const URL_WINDOW_MS = 60 * 1000;
const IP_WINDOW_MS = 10 * 60 * 1000;
const PER_IP_LIMIT = 30;
const MAX_URL_LENGTH = 512;
const MAX_ENTRIES = 10_000;

const urlHits = new Map<string, number>();
const ipHits = new Map<string, { count: number; resetAt: number }>();

function prune(now: number) {
  if (urlHits.size > MAX_ENTRIES) {
    for (const [k, at] of urlHits) if (now - at >= URL_WINDOW_MS) urlHits.delete(k);
  }
  if (ipHits.size > MAX_ENTRIES) {
    for (const [k, v] of ipHits) if (now >= v.resetAt) ipHits.delete(k);
  }
}

/** True when this hit should be dropped instead of recorded. */
function isRateLimited(ip: string, url: string): boolean {
  const now = Date.now();
  prune(now);

  const key = `${ip}:${url}`;
  const last = urlHits.get(key);
  if (last && now - last < URL_WINDOW_MS) return true;

  const entry = ipHits.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= PER_IP_LIMIT) return true;
    entry.count++;
  } else {
    ipHits.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
  }
  urlHits.set(key, now);
  return false;
}

/** Same-site path only ("/foo/bar"), lowercased, without query or hash. */
function normalisePath(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const path = raw.split("?")[0].split("#")[0].toLowerCase();
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  if (path.length > MAX_URL_LENGTH) return null;
  return path;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const normalizedUrl = normalisePath(body?.url);

    if (!normalizedUrl) {
      return NextResponse.json({ error: "A site path is required" }, { status: 400 });
    }

    const ip = getClientIp(request.headers);
    if (isRateLimited(ip, normalizedUrl)) {
      return NextResponse.json({ success: true, cached: true }, { status: 200 });
    }

    // The request's own header is what the bot detector should judge, not a
    // value the client can put in the body.
    const userAgent = request.headers.get("user-agent")?.substring(0, 1000) || null;
    const referer =
      typeof body?.referer === "string" && body.referer ? body.referer.substring(0, 2000) : null;
    const { isBot, botName } = detectBot(userAgent ?? undefined);

    await prisma.notFoundHit.create({
      data: { url: normalizedUrl, userAgent, referer, isBot, botName },
    });

    await prisma.notFoundUrl.upsert({
      where: { url: normalizedUrl },
      create: {
        url: normalizedUrl,
        hitCount: 1,
        botHitCount: isBot ? 1 : 0,
        humanHitCount: isBot ? 0 : 1,
        lastHitAt: new Date(),
        firstHitAt: new Date(),
        lastReferer: referer,
        lastUserAgent: userAgent,
      },
      update: {
        hitCount: { increment: 1 },
        botHitCount: isBot ? { increment: 1 } : undefined,
        humanHitCount: !isBot ? { increment: 1 } : undefined,
        lastHitAt: new Date(),
        lastReferer: referer || undefined,
        lastUserAgent: userAgent || undefined,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log but don't expose internal errors
    console.error("Error tracking 404:", error);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
