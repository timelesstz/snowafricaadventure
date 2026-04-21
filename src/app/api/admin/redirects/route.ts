import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, RedirectType, NotFoundStatus } from "@prisma/client";
import { ZodError } from "zod";
import { adminRedirectCreateSchema } from "@/lib/schemas";
import { invalidateRedirectCache } from "@/lib/redirect-cache";

// GET /api/admin/redirects - List all redirects with pagination
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const isActive = searchParams.get("isActive");
  const type = searchParams.get("type") as RedirectType | null;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  try {
    const where = {
      ...(search && {
        OR: [
          { sourceUrl: { contains: search, mode: "insensitive" as const } },
          { destinationUrl: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(isActive !== null && isActive !== "all" && {
        isActive: isActive === "true",
      }),
      ...(type && type !== ("all" as unknown) && { type }),
    };

    const orderBy: Record<string, string> = {};
    if (["createdAt", "hitCount", "lastHitAt", "sourceUrl"].includes(sortBy)) {
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const [redirects, total] = await Promise.all([
      prisma.redirect.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          notFoundUrl: {
            select: {
              id: true,
              hitCount: true,
              humanHitCount: true,
              botHitCount: true,
            },
          },
        },
      }),
      prisma.redirect.count({ where }),
    ]);

    // Get summary stats
    const [totalRedirects, activeRedirects, totalHits] = await Promise.all([
      prisma.redirect.count(),
      prisma.redirect.count({ where: { isActive: true } }),
      prisma.redirect.aggregate({ _sum: { hitCount: true } }),
    ]);

    return NextResponse.json({
      redirects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalRedirects,
        activeRedirects,
        totalHits: totalHits._sum.hitCount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching redirects:", error);
    return NextResponse.json(
      { error: "Failed to fetch redirects" },
      { status: 500 }
    );
  }
}

// POST /api/admin/redirects - Create a new redirect
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sourceUrl, destinationUrl, type, notes, notFoundUrlId, isActive } =
      adminRedirectCreateSchema.parse(body);

    // Normalize source URL (Zod guarantees non-empty)
    const normalizedSource = sourceUrl.toLowerCase().replace(/\/+$/, "") || "/";

    // Check for existing redirect with same source
    const existingRedirect = await prisma.redirect.findUnique({
      where: { sourceUrl: normalizedSource },
    });

    if (existingRedirect) {
      return NextResponse.json(
        { error: "A redirect for this source URL already exists" },
        { status: 409 }
      );
    }

    // Check for redirect loops
    if (normalizedSource === destinationUrl.toLowerCase().replace(/\/+$/, "")) {
      return NextResponse.json(
        { error: "Source and destination URLs cannot be the same" },
        { status: 400 }
      );
    }

    // Create the redirect
    const redirect = await prisma.redirect.create({
      data: {
        sourceUrl: normalizedSource,
        destinationUrl,
        type: (type as RedirectType) || RedirectType.PERMANENT,
        notes: notes ?? null,
        isActive: isActive ?? true,
        createdBy: session.user?.id,
        ...(notFoundUrlId && {
          notFoundUrl: {
            connect: { id: notFoundUrlId },
          },
        }),
      },
    });

    // If linked to a 404 URL, update its status
    if (notFoundUrlId) {
      await prisma.notFoundUrl.update({
        where: { id: notFoundUrlId },
        data: { status: NotFoundStatus.REDIRECTED },
      });
    }

    // Invalidate cache
    invalidateRedirectCache();

    return NextResponse.json({ redirect }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating redirect:", error);
    return NextResponse.json(
      { error: "Failed to create redirect" },
      { status: 500 }
    );
  }
}
