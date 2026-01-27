import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all media items
    const allMedia = await prisma.media.findMany({
      select: { id: true, url: true },
    });

    // Build a map of URL to usage count
    const usageCounts = new Map<string, number>();
    allMedia.forEach((m) => usageCounts.set(m.url, 0));

    // Scan TrekkingRoutes
    const routes = await prisma.trekkingRoute.findMany({
      select: { featuredImage: true, routeMapImage: true, gallery: true },
    });
    routes.forEach((r) => {
      if (r.featuredImage) incrementUsage(usageCounts, r.featuredImage);
      if (r.routeMapImage) incrementUsage(usageCounts, r.routeMapImage);
      r.gallery.forEach((url) => incrementUsage(usageCounts, url));
    });

    // Scan SafariPackages
    const safaris = await prisma.safariPackage.findMany({
      select: { featuredImage: true, gallery: true },
    });
    safaris.forEach((s) => {
      if (s.featuredImage) incrementUsage(usageCounts, s.featuredImage);
      s.gallery.forEach((url) => incrementUsage(usageCounts, url));
    });

    // Scan Destinations
    const destinations = await prisma.destination.findMany({
      select: { featuredImage: true, gallery: true },
    });
    destinations.forEach((d) => {
      if (d.featuredImage) incrementUsage(usageCounts, d.featuredImage);
      d.gallery.forEach((url) => incrementUsage(usageCounts, url));
    });

    // Scan DayTrips
    const dayTrips = await prisma.dayTrip.findMany({
      select: { featuredImage: true, gallery: true },
    });
    dayTrips.forEach((d) => {
      if (d.featuredImage) incrementUsage(usageCounts, d.featuredImage);
      d.gallery.forEach((url) => incrementUsage(usageCounts, url));
    });

    // Scan BlogPosts
    const posts = await prisma.blogPost.findMany({
      select: { featuredImage: true, content: true },
    });
    posts.forEach((p) => {
      if (p.featuredImage) incrementUsage(usageCounts, p.featuredImage);
      // Also scan content for inline images
      allMedia.forEach((m) => {
        if (p.content.includes(m.url)) {
          incrementUsage(usageCounts, m.url);
        }
      });
    });

    // Scan Reviews
    const reviews = await prisma.review.findMany({
      select: { authorImage: true },
    });
    reviews.forEach((r) => {
      if (r.authorImage) incrementUsage(usageCounts, r.authorImage);
    });

    // Scan Homepage content
    const homepageContent = await prisma.homepageContent.findMany({
      select: { content: true },
    });
    homepageContent.forEach((h) => {
      const contentStr = JSON.stringify(h.content);
      allMedia.forEach((m) => {
        if (contentStr.includes(m.url)) {
          incrementUsage(usageCounts, m.url);
        }
      });
    });

    // Update usage counts in database
    let updated = 0;
    for (const media of allMedia) {
      const count = usageCounts.get(media.url) || 0;
      await prisma.media.update({
        where: { id: media.id },
        data: { usageCount: count },
      });
      updated++;
    }

    // Get stats
    const orphanedCount = await prisma.media.count({
      where: { usageCount: 0 },
    });

    return NextResponse.json({
      success: true,
      scanned: updated,
      orphanedCount,
    });
  } catch (error) {
    console.error("Usage scan error:", error);
    return NextResponse.json(
      { error: "Failed to scan usage" },
      { status: 500 }
    );
  }
}

function incrementUsage(map: Map<string, number>, url: string) {
  const current = map.get(url);
  if (current !== undefined) {
    map.set(url, current + 1);
  }
}
