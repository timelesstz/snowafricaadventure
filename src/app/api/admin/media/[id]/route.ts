import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Find usage across all content types
    const usage = await findMediaUsage(media.url);

    return NextResponse.json({
      media,
      usage,
    });
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Only allow updating certain fields
    const updateData: Record<string, unknown> = {};
    if (data.alt !== undefined) updateData.alt = data.alt;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.folder !== undefined) updateData.folder = data.folder;

    const media = await prisma.media.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error("Media update error:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete from R2
    try {
      await deleteFromR2(media.key);
      // Also try to delete thumbnail
      const thumbKey = media.key.replace(/(\.[^/.]+)$/, "-thumb$1");
      await deleteFromR2(thumbKey).catch(() => {});
    } catch (e) {
      console.error("R2 delete error:", e);
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}

/**
 * Find where a media URL is being used across all content
 */
async function findMediaUsage(url: string) {
  const usage: Array<{ type: string; id: string; title: string }> = [];

  // Check TrekkingRoutes
  const routes = await prisma.trekkingRoute.findMany({
    where: {
      OR: [
        { featuredImage: url },
        { routeMapImage: url },
        { gallery: { has: url } },
      ],
    },
    select: { id: true, title: true },
  });
  routes.forEach((r) => usage.push({ type: "route", id: r.id, title: r.title }));

  // Check SafariPackages
  const safaris = await prisma.safariPackage.findMany({
    where: {
      OR: [{ featuredImage: url }, { gallery: { has: url } }],
    },
    select: { id: true, title: true },
  });
  safaris.forEach((s) => usage.push({ type: "safari", id: s.id, title: s.title }));

  // Check Destinations
  const destinations = await prisma.destination.findMany({
    where: {
      OR: [{ featuredImage: url }, { gallery: { has: url } }],
    },
    select: { id: true, name: true },
  });
  destinations.forEach((d) =>
    usage.push({ type: "destination", id: d.id, title: d.name })
  );

  // Check DayTrips
  const dayTrips = await prisma.dayTrip.findMany({
    where: {
      OR: [{ featuredImage: url }, { gallery: { has: url } }],
    },
    select: { id: true, title: true },
  });
  dayTrips.forEach((d) => usage.push({ type: "daytrip", id: d.id, title: d.title }));

  // Check BlogPosts
  const posts = await prisma.blogPost.findMany({
    where: { featuredImage: url },
    select: { id: true, title: true },
  });
  posts.forEach((p) => usage.push({ type: "blog", id: p.id, title: p.title }));

  // Check Reviews
  const reviews = await prisma.review.findMany({
    where: { authorImage: url },
    select: { id: true, authorName: true },
  });
  reviews.forEach((r) =>
    usage.push({ type: "review", id: r.id, title: r.authorName })
  );

  return usage;
}
