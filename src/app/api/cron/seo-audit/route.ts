import { NextResponse } from "next/server";
import { isValidCronAuth } from "@/lib/cron-auth";
import { runScheduledAudits } from "@/lib/seo-automation/audits";

/**
 * Rotating on-page audit. Runs from /api/cron/daily, last, inside a time
 * budget: each day it audits the most-shown pages that have not been checked
 * in a week, so the whole top of the site is re-audited about weekly.
 *
 * `?budgetMs=` lets the daily orchestrator pass whatever time it has left.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("CRON_SECRET is not set — refusing to run unprotected cron");
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (!isValidCronAuth(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requested = Number(new URL(request.url).searchParams.get("budgetMs"));
  const budgetMs = Number.isFinite(requested) && requested > 0 ? Math.min(requested, 50_000) : 40_000;

  try {
    const result = await runScheduledAudits({ budgetMs });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("SEO audit cron failed:", error);
    return NextResponse.json(
      { error: "SEO audit failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
