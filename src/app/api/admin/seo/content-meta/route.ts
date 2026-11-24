import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { CONTENT_KINDS } from "@/lib/seo-intel/paths";
import { applyMetaChange, loadMetaContent } from "@/lib/seo-intel/meta-content";

const BodySchema = z
  .object({
    kind: z.enum(CONTENT_KINDS as [string, ...string[]]),
    id: z.string().min(1),
    metaTitle: z.string().trim().min(10).max(70).optional(),
    metaDescription: z.string().trim().min(50).max(200).optional(),
    source: z.enum(["ai", "manual"]).default("manual"),
    reason: z.string().trim().max(300).optional(),
  })
  .refine((b) => b.metaTitle !== undefined || b.metaDescription !== undefined, {
    message: "Send a title or a description",
  });

/**
 * Apply a reviewed meta title/description to one content item. Updates that
 * single row by id and logs each changed field for impact tracking.
 */
export async function POST(request: NextRequest) {
  let session;
  try {
    session = await requireRole("EDITOR");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const body = parsed.data;
  const kind = body.kind as (typeof CONTENT_KINDS)[number];

  const content = await loadMetaContent(kind, body.id);
  if (!content) return NextResponse.json({ error: "Content not found" }, { status: 404 });

  try {
    const result = await applyMetaChange(
      content,
      { metaTitle: body.metaTitle, metaDescription: body.metaDescription },
      {
        source: body.source,
        reason: body.reason,
        userId: session.user.id ?? null,
        userEmail: session.user.email ?? null,
      }
    );
    if (result.changed.length > 0) {
      revalidatePath(result.path);
      revalidatePath("/admin/seo/content-health/");
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[seo/content-meta] apply failed:", error);
    return NextResponse.json({ error: "Could not save the change" }, { status: 500 });
  }
}
