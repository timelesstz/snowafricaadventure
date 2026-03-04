import { NextRequest } from "next/server";
import { COUNTRIES } from "@/lib/countries";

export interface VisitorTrackingData {
  ipAddress: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  region: string | null;
  userAgent: string | null;
  device: string | null;
  browser: string | null;
}

/**
 * Extracts visitor tracking data from request headers.
 * Uses Vercel's built-in geo headers (free, no external API needed).
 */
export function extractVisitorData(request: NextRequest): VisitorTrackingData {
  // IP from Vercel / reverse proxy
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;

  // Geo from Vercel edge headers
  const countryCode = request.headers.get("x-vercel-ip-country") || null;
  const city = request.headers.get("x-vercel-ip-city")
    ? decodeURIComponent(request.headers.get("x-vercel-ip-city")!)
    : null;
  const region = request.headers.get("x-vercel-ip-country-region") || null;

  // Resolve country name from code using existing COUNTRIES list
  const country = countryCode
    ? COUNTRIES.find((c) => c.code === countryCode)?.name || countryCode
    : null;

  // User agent parsing
  const rawUA = request.headers.get("user-agent") || null;
  const { device, browser } = parseUserAgent(rawUA);

  return {
    ipAddress,
    country,
    countryCode,
    city,
    region,
    userAgent: rawUA,
    device,
    browser,
  };
}

function parseUserAgent(ua: string | null): {
  device: string | null;
  browser: string | null;
} {
  if (!ua) return { device: null, browser: null };

  // Device detection
  let device = "desktop";
  if (/tablet|ipad/i.test(ua)) device = "tablet";
  else if (/mobile|iphone|android.*mobile/i.test(ua)) device = "mobile";

  // Browser detection
  let browser = "Unknown";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) browser = "Chrome";
  else if (/safari\//i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/firefox\//i.test(ua)) browser = "Firefox";

  return { device, browser };
}

/**
 * Get country flag emoji from country code.
 */
export function getCountryFlag(countryCode: string | null): string {
  if (!countryCode) return "";
  const entry = COUNTRIES.find((c) => c.code === countryCode);
  return entry?.flag || "";
}
