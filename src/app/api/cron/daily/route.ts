import { NextRequest, NextResponse } from "next/server";

import { GET as leadFollowup } from "../lead-followup/route";
import { GET as climberReminders } from "../climber-reminders/route";
import { GET as seoSync } from "../seo-sync/route";
import { GET as seoSnapshot } from "../seo-snapshot/route";
import { GET as tripadvisorReviews } from "../tripadvisor-reviews/route";

/**
 * Daily cron orchestrator.
 *
 * Vercel's Hobby plan allows only two cron jobs. Registering six meant the
 * scheduler silently skipped most of them — `/api/cron/lead-followup` never
 * fired once between July and September 2026 despite 33 unanswered inquiries
 * qualifying for its digest, and the SEO snapshot last wrote in April.
 *
 * Rather than depend on the plan, everything except the departure rotation now
 * runs from this single endpoint. vercel.json registers two crons total, which
 * fits every plan tier and behaves identically on Pro.
 *
 * Tasks run sequentially in priority order and each is isolated: a failure or
 * a slow external API in a later task cannot stop an earlier one from having
 * completed. Lead follow-up runs first because it is the one with revenue
 * attached.
 */

export const maxDuration = 60;

function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  return authHeader.replace("Bearer ", "") === process.env.CRON_SECRET;
}

type Task = {
  name: string;
  run: (req: NextRequest) => Promise<Response>;
  /** Days of the month to run on. Omit to run daily. */
  daysOfMonth?: number[];
};

// Ordered by business priority — the revenue-critical task runs first.
const TASKS: Task[] = [
  { name: "lead-followup", run: leadFollowup },
  { name: "climber-reminders", run: climberReminders },
  { name: "seo-snapshot", run: seoSnapshot },
  { name: "seo-sync", run: seoSync },
  // Previously scheduled as "0 6 1,6,11,16,21,26 * *" — cadence preserved.
  { name: "tripadvisor-reviews", run: tripadvisorReviews, daysOfMonth: [1, 6, 11, 16, 21, 26] },
];

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dayOfMonth = new Date().getUTCDate();
  const results: Record<string, { status: string; detail?: string }> = {};

  for (const task of TASKS) {
    if (task.daysOfMonth && !task.daysOfMonth.includes(dayOfMonth)) {
      results[task.name] = { status: "skipped", detail: "not scheduled today" };
      continue;
    }

    try {
      const response = await task.run(request);
      results[task.name] = {
        status: response.ok ? "ok" : "failed",
        detail: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error) {
      // Isolated on purpose — one broken task must not prevent the others.
      console.error(`[cron/daily] ${task.name} threw:`, error);
      results[task.name] = {
        status: "error",
        detail: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  const failed = Object.values(results).filter((r) => r.status === "error" || r.status === "failed").length;

  return NextResponse.json({
    success: failed === 0,
    ranAt: new Date().toISOString(),
    failed,
    results,
  });
}
