import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";

// GET /api/admin/newsletter/export - Download newsletter subscribers as CSV
export async function GET(request: Request) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { searchParams } = new URL(request.url);
  const activeParam = searchParams.get("active");
  const where =
    activeParam === "active"
      ? { isActive: true }
      : activeParam === "inactive"
        ? { isActive: false }
        : {};

  const subs = await prisma.newsletterSubscription.findMany({
    where,
    orderBy: { subscribedAt: "desc" },
  });

  const escape = (v: string | null | undefined) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const header = "email,name,source,isActive,subscribedAt,unsubscribedAt,bookingId";
  const rows = subs.map((s) =>
    [
      escape(s.email),
      escape(s.name),
      escape(s.source),
      s.isActive ? "true" : "false",
      s.subscribedAt.toISOString(),
      s.unsubscribedAt ? s.unsubscribedAt.toISOString() : "",
      escape(s.bookingId),
    ].join(",")
  );
  const csv = [header, ...rows].join("\r\n");

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `newsletter-subscribers-${ts}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
