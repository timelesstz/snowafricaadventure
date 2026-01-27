import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const type = searchParams.get("type"); // optional filter: routes, safaris, destinations, blog
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: false,
      message: "Search query must be at least 2 characters",
      results: [],
    });
  }

  try {
    const results: {
      routes: Array<{ slug: string; title: string; overview: string; type: string }>;
      safaris: Array<{ slug: string; title: string; overview: string; type: string }>;
      destinations: Array<{ slug: string; name: string; description: string; type: string }>;
      blog: Array<{ slug: string; title: string; excerpt: string; type: string }>;
    } = {
      routes: [],
      safaris: [],
      destinations: [],
      blog: [],
    };

    // Search trekking routes
    if (!type || type === "routes") {
      const routes = await prisma.trekkingRoute.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { overview: { contains: query, mode: "insensitive" } },
          ],
          isActive: true,
        },
        select: {
          slug: true,
          title: true,
          overview: true,
        },
        take: limit,
      });
      results.routes = routes.map((r) => ({
        ...r,
        type: "route",
        overview: r.overview.slice(0, 150) + "...",
      }));
    }

    // Search safari packages
    if (!type || type === "safaris") {
      const safaris = await prisma.safariPackage.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { overview: { contains: query, mode: "insensitive" } },
          ],
          isActive: true,
        },
        select: {
          slug: true,
          title: true,
          overview: true,
        },
        take: limit,
      });
      results.safaris = safaris.map((s) => ({
        ...s,
        type: "safari",
        overview: s.overview.slice(0, 150) + "...",
      }));
    }

    // Search destinations
    if (!type || type === "destinations") {
      const destinations = await prisma.destination.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
          isActive: true,
        },
        select: {
          slug: true,
          name: true,
          description: true,
        },
        take: limit,
      });
      results.destinations = destinations.map((d) => ({
        ...d,
        type: "destination",
        description: d.description ? d.description.slice(0, 150) + "..." : "",
      }));
    }

    // Search blog posts
    if (!type || type === "blog") {
      const posts = await prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
          isPublished: true,
        },
        select: {
          slug: true,
          title: true,
          excerpt: true,
        },
        take: limit,
      });
      results.blog = posts.map((p) => ({
        ...p,
        type: "blog",
        excerpt: p.excerpt ? p.excerpt.slice(0, 150) + "..." : "",
      }));
    }

    // Calculate total count
    const totalResults =
      results.routes.length +
      results.safaris.length +
      results.destinations.length +
      results.blog.length;

    return NextResponse.json({
      success: true,
      query,
      totalResults,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Search failed",
        results: [],
      },
      { status: 500 }
    );
  }
}
