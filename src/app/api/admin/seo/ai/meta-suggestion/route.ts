import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { isContentKind } from "@/lib/seo-intel/paths";
import { loadMetaContent } from "@/lib/seo-intel/meta-content";
import { AiUnavailableError, suggestMeta } from "@/lib/seo-intel/ai-meta";
import { gscWindow, topQueriesForPath } from "@/lib/seo-intel/data";

export const maxDuration = 60;

/** Body: { kind, id }. Returns a reviewed-before-saving title/description suggestion. */
export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { kind?: unknown; id?: unknown };
  if (!isContentKind(body.kind) || typeof body.id !== "string" || !body.id) {
    return NextResponse.json({ error: "kind and id are required" }, { status: 400 });
  }

  const content = await loadMetaContent(body.kind, body.id);
  if (!content) return NextResponse.json({ error: "Content not found" }, { status: 404 });

  try {
    const window = await gscWindow(28);
    const queries = await topQueriesForPath(content.path, window.start, window.end, 15);
    const suggestion = await suggestMeta(content, queries);
    return NextResponse.json({
      suggestion,
      current: { metaTitle: content.metaTitle, metaDescription: content.metaDescription },
      queries: queries.slice(0, 5),
    });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("[seo/ai/meta-suggestion] failed:", error);
    return NextResponse.json({ error: "Could not create a suggestion" }, { status: 500 });
  }
}
