import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { auditPage } from "@/lib/seo-dashboard/page-auditor";
import { saveAudit } from "@/lib/seo-automation/audits";
import { SITE_CONFIG } from "@/lib/constants";

export const maxDuration = 60;

/** Hosts the server must never be pointed at (the auditor fetches the URL). */
function isPrivateHost(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "::1" || h.startsWith("fc") || h.startsWith("fd") || h.startsWith("fe80")) return h.includes(":");
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
}

/** Accepts a full URL or a site path ("/trekking/machame/"). */
function resolveUrl(input: string): URL | null {
  const raw = input.trim();
  try {
    const url = raw.startsWith("/") ? new URL(raw, SITE_CONFIG.url) : new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (isPrivateHost(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { url?: unknown };
  const url = typeof body.url === "string" ? resolveUrl(body.url) : null;
  if (!url) {
    return NextResponse.json({ error: "Enter a public page URL or a path such as /trekking/machame-route/" }, { status: 400 });
  }

  try {
    const result = await auditPage(url.toString());
    await saveAudit(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Page audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}
