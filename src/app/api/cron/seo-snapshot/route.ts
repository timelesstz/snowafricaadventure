import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSeoOverview } from "@/lib/seo-overview";

/**
 * Daily SEO health snapshot cron.
 * Schedule: 0 5 * * * (5:00 AM UTC) — runs after the 4am sync so today's
 * health score reflects the freshest GSC/GA4 data.
 *
 * Idempotent: upserts on date so a second run on the same day overwrites
 * rather than duplicating. Strictly additive — no deletes.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not set — refusing to run unprotected cron");
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getSeoOverview();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const components = Object.fromEntries(
      data.health.components.map((c) => [c.key, c.score])
    );

    const snapshot = await prisma.seoHealthSnapshot.upsert({
      where: { date: today },
      update: {
        healthScore: data.health.score,
        contentHealthScore: components.content ?? 0,
        ctrScore: components.ctr ?? 0,
        posScore: components.position ?? 0,
        errorScore: components.errors ?? 0,
        auditScore: components.audit ?? null,
        totalClicks: data.gsc.totalClicks,
        totalImpressions: data.gsc.totalImpressions,
      },
      create: {
        date: today,
        healthScore: data.health.score,
        contentHealthScore: components.content ?? 0,
        ctrScore: components.ctr ?? 0,
        posScore: components.position ?? 0,
        errorScore: components.errors ?? 0,
        auditScore: components.audit ?? null,
        totalClicks: data.gsc.totalClicks,
        totalImpressions: data.gsc.totalImpressions,
      },
    });

    return NextResponse.json({
      success: true,
      date: snapshot.date.toISOString().split("T")[0],
      healthScore: snapshot.healthScore,
    });
  } catch (error) {
    console.error("SEO snapshot cron failed:", error);
    return NextResponse.json(
      {
        error: "Snapshot failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
