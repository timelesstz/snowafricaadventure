import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

const R2_DOMAINS = [
  "pub-cf9450d27ca744f1825d1e08b392f592.r2.dev",
  "cdn.snowafricaadventure.com",
];

/**
 * Extract the R2 object key from a full URL.
 * e.g. "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/blog/2026/02/img.jpg" → "blog/2026/02/img.jpg"
 */
function extractR2Key(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!R2_DOMAINS.some((d) => parsed.hostname === d)) return null;
    // Remove leading slash
    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const key = extractR2Key(url);
    if (!key) {
      return NextResponse.json(
        { error: "Not an R2-hosted image", skipped: true },
        { status: 200 }
      );
    }

    // Skip shared WordPress-migrated assets
    if (key.startsWith("wp-content/uploads/")) {
      return NextResponse.json(
        { message: "Shared asset skipped", skipped: true },
        { status: 200 }
      );
    }

    // Delete from R2
    try {
      await deleteFromR2(key);
      // Also try to delete thumbnail
      const thumbKey = key.replace(/(\.[^/.]+)$/, "-thumb$1");
      await deleteFromR2(thumbKey).catch(() => {});
    } catch (e) {
      console.error("R2 delete error:", e);
    }

    // If tracked in Media table, remove the record
    const media = await prisma.media.findFirst({
      where: { url },
    });

    if (media) {
      await prisma.media.delete({ where: { id: media.id } });
    }

    return NextResponse.json({ success: true, deleted: key });
  } catch (error) {
    console.error("Delete-by-url error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
