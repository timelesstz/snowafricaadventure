import { NextRequest, NextResponse } from "next/server";
import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminRole, Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { adminMediaUpdateSchema } from "@/lib/schemas";
import { deleteFromR2 } from "@/lib/r2";
import { buildUsage, type MediaUsage } from "@/lib/media-usage";

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
    try {
      await requireRole(AdminRole.EDITOR);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unauthorized";
      const status = msg === "Insufficient permissions" ? 403 : 401;
      return NextResponse.json({ error: msg }, { status });
    }

    const { id } = await params;
    const body = await request.json();
    const data = adminMediaUpdateSchema.parse(body);

    const updateData: Prisma.MediaUpdateInput = {};
    if (data.alt !== undefined) updateData.alt = data.alt;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.folder !== undefined) updateData.folder = data.folder;

    const media = await prisma.media.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Media update error:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    try {
      await requireRole(AdminRole.EDITOR);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unauthorized";
      const status = msg === "Insufficient permissions" ? 403 : 401;
      return NextResponse.json({ error: msg }, { status });
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

async function findMediaUsage(url: string): Promise<MediaUsage[]> {
  const usage: MediaUsage[] = [];

  const routes = await prisma.trekkingRoute.findMany({
    where: {
      OR: [
        { featuredImage: url },
        { routeMapImage: url },
        { guideImage: url },
        { gallery: { has: url } },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      featuredImage: true,
      routeMapImage: true,
      guideImage: true,
      gallery: true,
    },
  });
  for (const r of routes) {
    if (r.featuredImage === url) usage.push(buildUsage("route", r.id, r.title, "featuredImage", r.slug));
    if (r.routeMapImage === url) usage.push(buildUsage("route", r.id, r.title, "routeMapImage", r.slug));
    if (r.guideImage === url) usage.push(buildUsage("route", r.id, r.title, "guideImage", r.slug));
    r.gallery.forEach((g, i) => {
      if (g === url) usage.push(buildUsage("route", r.id, r.title, `gallery[${i}]`, r.slug));
    });
  }

  const safaris = await prisma.safariPackage.findMany({
    where: { OR: [{ featuredImage: url }, { gallery: { has: url } }] },
    select: { id: true, slug: true, title: true, featuredImage: true, gallery: true },
  });
  for (const s of safaris) {
    if (s.featuredImage === url) usage.push(buildUsage("safari", s.id, s.title, "featuredImage", s.slug));
    s.gallery.forEach((g, i) => {
      if (g === url) usage.push(buildUsage("safari", s.id, s.title, `gallery[${i}]`, s.slug));
    });
  }

  const destinations = await prisma.destination.findMany({
    where: { OR: [{ featuredImage: url }, { gallery: { has: url } }] },
    select: { id: true, slug: true, name: true, featuredImage: true, gallery: true },
  });
  for (const d of destinations) {
    if (d.featuredImage === url) usage.push(buildUsage("destination", d.id, d.name, "featuredImage", d.slug));
    d.gallery.forEach((g, i) => {
      if (g === url) usage.push(buildUsage("destination", d.id, d.name, `gallery[${i}]`, d.slug));
    });
  }

  const dayTrips = await prisma.dayTrip.findMany({
    where: { OR: [{ featuredImage: url }, { gallery: { has: url } }] },
    select: { id: true, slug: true, title: true, featuredImage: true, gallery: true },
  });
  for (const d of dayTrips) {
    if (d.featuredImage === url) usage.push(buildUsage("daytrip", d.id, d.title, "featuredImage", d.slug));
    d.gallery.forEach((g, i) => {
      if (g === url) usage.push(buildUsage("daytrip", d.id, d.title, `gallery[${i}]`, d.slug));
    });
  }

  const blogFeatured = await prisma.blogPost.findMany({
    where: { featuredImage: url },
    select: { id: true, slug: true, title: true },
  });
  blogFeatured.forEach((p) =>
    usage.push(buildUsage("blog", p.id, p.title, "featuredImage", p.slug))
  );

  const blogBody = await prisma.blogPost.findMany({
    where: { content: { contains: url } },
    select: { id: true, slug: true, title: true },
  });
  blogBody.forEach((p) =>
    usage.push(buildUsage("blog", p.id, p.title, "content", p.slug))
  );

  const reviews = await prisma.review.findMany({
    where: { authorImage: url },
    select: { id: true, authorName: true },
  });
  reviews.forEach((r) =>
    usage.push(buildUsage("review", r.id, r.authorName, "authorImage"))
  );

  const heroes = await prisma.pageHero.findMany({
    where: { backgroundImage: url },
    select: { id: true, pageSlug: true, title: true },
  });
  heroes.forEach((h) =>
    usage.push(buildUsage("pagehero", h.id, h.title, "backgroundImage", h.pageSlug))
  );

  const pages = await prisma.page.findMany({
    where: { content: { contains: url } },
    select: { id: true, slug: true, title: true },
  });
  pages.forEach((p) =>
    usage.push(buildUsage("page", p.id, p.title, "content", p.slug))
  );

  const cms = await prisma.cmsPage.findMany({
    select: { id: true, slug: true, title: true, puckData: true },
  });
  for (const c of cms) {
    if (JSON.stringify(c.puckData).includes(url)) {
      usage.push(buildUsage("cmspage", c.id, c.title, "puckData", c.slug));
    }
  }

  const homepage = await prisma.homepageContent.findMany({
    select: { id: true, section: true, content: true },
  });
  for (const h of homepage) {
    if (JSON.stringify(h.content).includes(url)) {
      usage.push(buildUsage("homepage", h.id, h.section, "content"));
    }
  }

  return usage;
}
