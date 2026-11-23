import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { runSeoAlerts } from "@/lib/seo-automation/alerts";
import { runScheduledAudits } from "@/lib/seo-automation/audits";
import { getSeoAutomationOverview } from "@/lib/seo-automation/status";
import { GET as runSnapshot } from "@/app/api/cron/seo-snapshot/route";

export const maxDuration = 60;

export async function GET() {
  try {
    await requireRole("VIEWER");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getSeoAutomationOverview());
  } catch (error) {
    console.error("[seo/automations] status failed:", error);
    return NextResponse.json({ error: "Failed to load automations" }, { status: 500 });
  }
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Run one automation now. Body: { task: "alerts" | "audit" | "snapshot" }. */
export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { task?: string };

  try {
    switch (body.task) {
      case "alerts": {
        const result = await runSeoAlerts();
        return NextResponse.json({
          ok: true,
          message:
            result.raised === 0
              ? "Checked. No new issues."
              : `Raised ${plural(result.raised, "alert")}${result.emailed ? " and emailed the team" : ""}.`,
          result,
        });
      }
      case "audit": {
        const result = await runScheduledAudits({ maxPages: 6, budgetMs: 50_000 });
        let message =
          result.audited.length === 0 && result.failed.length === 0
            ? "Every top page has been audited in the last 7 days."
            : `Audited ${plural(result.audited.length, "page")}`;
        if (result.failed.length) message += `, ${result.failed.length} failed`;
        if (!message.endsWith(".")) message += ".";
        return NextResponse.json({ ok: true, message, result });
      }
      case "snapshot": {
        // Reuse the cron handler so the snapshot logic lives in one place.
        const secret = process.env.CRON_SECRET;
        if (!secret) {
          return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 500 });
        }
        const res = await runSnapshot(
          new Request(new URL("/api/cron/seo-snapshot/", request.url), {
            headers: { authorization: `Bearer ${secret}` },
          })
        );
        const data = await res.json();
        if (!res.ok) {
          return NextResponse.json({ error: data.message ?? "Snapshot failed" }, { status: 500 });
        }
        return NextResponse.json({
          ok: true,
          message: `Saved today's health score: ${data.healthScore}.`,
          result: data,
        });
      }
      default:
        return NextResponse.json({ error: "Unknown task" }, { status: 400 });
    }
  } catch (error) {
    console.error(`[seo/automations] ${body.task} failed:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Automation failed" },
      { status: 500 }
    );
  }
}
