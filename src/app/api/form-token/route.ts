import { NextRequest, NextResponse } from "next/server";
import { createFormToken } from "@/lib/form-guard";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

/** Hands a public form its signed spam-check token (see lib/form-guard.ts). */
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip && isRateLimited(`form-token:${ip}`, RATE_LIMITS.normal)) {
    return NextResponse.json({ token: null }, { status: 429 });
  }
  return NextResponse.json(
    { token: createFormToken() },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
