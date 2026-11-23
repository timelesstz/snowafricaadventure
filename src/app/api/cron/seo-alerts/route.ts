import { NextResponse } from "next/server";
import { runSeoAlerts } from "@/lib/seo-automation/alerts";

/**
 * Daily SEO alert check. Runs from /api/cron/daily.
 *
 * Raises admin notifications (and one email for high/urgent ones) for failed
 * or stale syncs, week-over-week traffic drops, health-score drops, pages that
 * lost rankings and new 404s people are hitting. Repeats are held back for a
 * cooldown per alert, so a daily run does not re-send the same news.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("CRON_SECRET is not set — refusing to run unprotected cron");
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSeoAlerts();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("SEO alerts cron failed:", error);
    return NextResponse.json(
      { error: "SEO alerts failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
