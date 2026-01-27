import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");
    const folder = searchParams.get("folder");
    const search = searchParams.get("search");
    const filter = searchParams.get("filter"); // "all", "orphaned", "used"
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (folder && folder !== "all") {
      where.folder = folder;
    }

    if (search) {
      where.OR = [
        { filename: { contains: search, mode: "insensitive" } },
        { alt: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filter === "orphaned") {
      where.usageCount = 0;
    } else if (filter === "used") {
      where.usageCount = { gt: 0 };
    }

    // Get total count
    const total = await prisma.media.count({ where });

    // Get media with pagination
    const media = await prisma.media.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    // Get folder stats
    const folderStats = await prisma.media.groupBy({
      by: ["folder"],
      _count: { id: true },
    });

    // Get overall stats
    const stats = await prisma.media.aggregate({
      _sum: { size: true },
      _count: { id: true },
    });

    const orphanedCount = await prisma.media.count({
      where: { usageCount: 0 },
    });

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalFiles: stats._count.id,
        totalSize: stats._sum.size || 0,
        orphanedCount,
        folders: folderStats.map((f) => ({
          name: f.folder,
          count: f._count.id,
        })),
      },
    });
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// Bulk delete orphaned images
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids, deleteOrphaned } = await request.json();

    if (deleteOrphaned) {
      // Delete all orphaned images
      const orphaned = await prisma.media.findMany({
        where: { usageCount: 0 },
        select: { id: true, key: true },
      });

      // Import deleteFromR2 dynamically to avoid issues
      const { deleteFromR2 } = await import("@/lib/r2");

      // Delete from R2
      for (const item of orphaned) {
        try {
          await deleteFromR2(item.key);
          // Also try to delete thumbnail
          const thumbKey = item.key.replace(/(\.[^/.]+)$/, "-thumb$1");
          await deleteFromR2(thumbKey).catch(() => {});
        } catch (e) {
          console.error(`Failed to delete ${item.key} from R2:`, e);
        }
      }

      // Delete from database
      const result = await prisma.media.deleteMany({
        where: { usageCount: 0 },
      });

      return NextResponse.json({
        success: true,
        deleted: result.count,
      });
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No media IDs provided" },
        { status: 400 }
      );
    }

    // Get media items to delete
    const mediaItems = await prisma.media.findMany({
      where: { id: { in: ids } },
      select: { id: true, key: true },
    });

    const { deleteFromR2 } = await import("@/lib/r2");

    // Delete from R2
    for (const item of mediaItems) {
      try {
        await deleteFromR2(item.key);
        const thumbKey = item.key.replace(/(\.[^/.]+)$/, "-thumb$1");
        await deleteFromR2(thumbKey).catch(() => {});
      } catch (e) {
        console.error(`Failed to delete ${item.key} from R2:`, e);
      }
    }

    // Delete from database
    const result = await prisma.media.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({
      success: true,
      deleted: result.count,
    });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
