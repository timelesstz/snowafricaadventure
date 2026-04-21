import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySmtpConnection } from "@/lib/email";
import { listR2Objects } from "@/lib/r2";

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

export async function GET() {
  const [db, smtp, r2] = await Promise.all([
    timed(() => prisma.$queryRaw`SELECT 1`, 3000),
    timed(async () => {
      const result = await verifySmtpConnection();
      if (!result.success) throw new Error(result.error || "smtp verify failed");
    }, 5000),
    timed(() => listR2Objects({ maxKeys: 1 }), 5000),
  ]);

  const allOk = db.ok && smtp.ok && r2.ok;

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks: { db, smtp, r2 },
    },
    { status: allOk ? 200 : 503 }
  );
}
