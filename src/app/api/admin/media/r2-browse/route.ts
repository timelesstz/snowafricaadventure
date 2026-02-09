import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { listR2Objects, getR2Url, deleteFromR2 } from "@/lib/r2";

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|svg)$/i;

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const prefix = searchParams.get("prefix") || "";
    const token = searchParams.get("token") || undefined;
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "all"; // all | tracked | untracked
    const limit = parseInt(searchParams.get("limit") || "60");

    // List all image objects from R2 (fetching enough to fill page after filtering)
    const batchSize = Math.max(limit * 3, 200);
    const result = await listR2Objects({
      prefix: prefix || undefined,
      maxKeys: batchSize,
      continuationToken: token,
    });

    // Filter to only image files
    let images = result.objects.filter((obj) => IMAGE_EXTENSIONS.test(obj.key));

    // Apply search filter
    if (search) {
      const q = search.toLowerCase();
      images = images.filter((obj) => obj.key.toLowerCase().includes(q));
    }

    // Get tracked keys from database for comparison
    const trackedMedia = await prisma.media.findMany({
      select: { key: true, url: true, usageCount: true },
    });
    const trackedKeys = new Set(trackedMedia.map((m) => m.key));

    // Also check by URL since some images are referenced by full URL, not by key
    const trackedUrls = new Set(trackedMedia.map((m) => m.url));

    // Build response objects
    let items = images.map((obj) => {
      const url = getR2Url(obj.key);
      const isTracked = trackedKeys.has(obj.key) || trackedUrls.has(url);
      const dbRecord = trackedMedia.find(
        (m) => m.key === obj.key || m.url === url
      );
      return {
        key: obj.key,
        url,
        size: obj.size,
        lastModified: obj.lastModified,
        isTracked,
        usageCount: dbRecord?.usageCount ?? 0,
        filename: obj.key.split("/").pop() || obj.key,
        folder: obj.key.split("/").slice(0, -1).join("/"),
      };
    });

    // Apply tracked/untracked filter
    if (filter === "tracked") {
      items = items.filter((i) => i.isTracked);
    } else if (filter === "untracked") {
      items = items.filter((i) => !i.isTracked);
    }

    // Limit results
    const limitedItems = items.slice(0, limit);

    return NextResponse.json({
      items: limitedItems,
      nextToken: result.nextToken,
      hasMore: result.isTruncated,
      total: items.length,
    });
  } catch (error) {
    console.error("R2 browse error:", error);
    return NextResponse.json(
      { error: "Failed to browse R2 bucket" },
      { status: 500 }
    );
  }
}

// Sync R2 images to database (register untracked images)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    if (action === "sync") {
      // Scan all R2 images and register untracked ones in the database
      let synced = 0;
      let nextToken: string | undefined;
      const trackedKeys = new Set(
        (await prisma.media.findMany({ select: { key: true } })).map(
          (m) => m.key
        )
      );

      do {
        const result = await listR2Objects({
          maxKeys: 500,
          continuationToken: nextToken,
        });

        const imageObjects = result.objects.filter((obj) =>
          IMAGE_EXTENSIONS.test(obj.key)
        );

        for (const obj of imageObjects) {
          if (!trackedKeys.has(obj.key)) {
            const url = getR2Url(obj.key);
            const filename = obj.key.split("/").pop() || obj.key;
            const folder = obj.key.startsWith("wp-content/")
              ? "wp-content"
              : obj.key.split("/")[0] || "general";
            const ext = filename.split(".").pop()?.toLowerCase();
            const mimeType =
              ext === "png"
                ? "image/png"
                : ext === "webp"
                ? "image/webp"
                : ext === "gif"
                ? "image/gif"
                : ext === "svg"
                ? "image/svg+xml"
                : "image/jpeg";

            await prisma.media.create({
              data: {
                filename,
                key: obj.key,
                url,
                mimeType,
                size: obj.size,
                folder,
                uploadedBy: "R2 Sync",
              },
            });
            trackedKeys.add(obj.key);
            synced++;
          }
        }

        nextToken = result.nextToken;
      } while (nextToken);

      return NextResponse.json({ success: true, synced });
    }

    if (action === "delete-r2") {
      // Delete files directly from R2 (for untracked files)
      const { keys } = body;
      if (!keys || !Array.isArray(keys)) {
        return NextResponse.json(
          { error: "No keys provided" },
          { status: 400 }
        );
      }

      let deleted = 0;
      for (const key of keys) {
        try {
          await deleteFromR2(key);
          // Also remove from DB if tracked
          await prisma.media
            .delete({ where: { key } })
            .catch(() => {});
          deleted++;
        } catch (e) {
          console.error(`Failed to delete ${key}:`, e);
        }
      }

      return NextResponse.json({ success: true, deleted });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("R2 sync error:", error);
    return NextResponse.json(
      { error: "Failed to process R2 action" },
      { status: 500 }
    );
  }
}
