import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySmtpConnection } from "@/lib/email";
import { listR2Objects } from "@/lib/r2";
import { isValidCronAuth } from "@/lib/cron-auth";

export const dynamic = "force-dynamic";

type CheckResult = { ok: true; ms: number } | { ok: false; ms: number; error: string };

async function timed<T>(
  fn: () => Promise<T>,
  timeoutMs: number
): Promise<CheckResult> {
  const started = Date.now();
  try {
    await Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`timeout after ${timeoutMs}ms`)), timeoutMs)
      ),
    ]);
    return { ok: true, ms: Date.now() - started };
  } catch (err) {
    return {
      ok: false,
      ms: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Public callers get only ok/degraded; per-check timings and error text need
// the cron secret. Results are reused (30s when healthy, 5s after a failure so
// a cold-start timeout does not linger) so the endpoint cannot be used to
// hammer SMTP or R2.
const OK_CACHE_MS = 30_000;
const FAIL_CACHE_MS = 5_000;
let cached: { at: number; ok: boolean; checks: Record<"db" | "smtp" | "r2", CheckResult> } | null =
  null;

async function runChecks() {
  if (cached && Date.now() - cached.at < (cached.ok ? OK_CACHE_MS : FAIL_CACHE_MS)) {
    return cached.checks;
  }
  const [db, smtp, r2] = await Promise.all([
    timed(() => prisma.$queryRaw`SELECT 1`, 3000),
    timed(async () => {
      const result = await verifySmtpConnection();
      if (!result.success) throw new Error(result.error || "smtp verify failed");
    }, 5000),
    timed(() => listR2Objects({ maxKeys: 1 }), 5000),
  ]);
  cached = { at: Date.now(), ok: db.ok && smtp.ok && r2.ok, checks: { db, smtp, r2 } };
  return cached.checks;
}

export async function GET(request: Request) {
  const checks = await runChecks();
  const allOk = checks.db.ok && checks.smtp.ok && checks.r2.ok;
  const detailed = isValidCronAuth(request.headers.get("authorization"));

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      ...(detailed ? { checks } : {}),
    },
    { status: allOk ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
