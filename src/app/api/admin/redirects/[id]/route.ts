import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, RedirectType, NotFoundStatus } from "@prisma/client";
import { invalidateRedirectCache } from "@/lib/redirect-cache";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/redirects/[id] - Get single redirect details
export async function GET(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const redirect = await prisma.redirect.findUnique({
      where: { id },
      include: {
        notFoundUrl: true,
      },
    });

    if (!redirect) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ redirect });
  } catch (error) {
    console.error("Error fetching redirect:", error);
    return NextResponse.json(
      { error: "Failed to fetch redirect" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/redirects/[id] - Update redirect
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { sourceUrl, destinationUrl, type, isActive, notes } = body;

    // Validate type if provided
    if (type && !Object.values(RedirectType).includes(type)) {
      return NextResponse.json(
        { error: "Invalid redirect type" },
        { status: 400 }
      );
    }

    // If sourceUrl is being changed, check for conflicts
    if (sourceUrl) {
      const normalizedSource = sourceUrl.toLowerCase().replace(/\/+$/, "") || "/";
      const existingRedirect = await prisma.redirect.findFirst({
        where: {
          sourceUrl: normalizedSource,
          id: { not: id },
        },
      });

      if (existingRedirect) {
        return NextResponse.json(
          { error: "A redirect for this source URL already exists" },
          { status: 409 }
        );
      }
    }

    // Check for redirect loops
    if (sourceUrl && destinationUrl) {
      const normalizedSource = sourceUrl.toLowerCase().replace(/\/+$/, "");
      const normalizedDest = destinationUrl.toLowerCase().replace(/\/+$/, "");
      if (normalizedSource === normalizedDest) {
        return NextResponse.json(
          { error: "Source and destination URLs cannot be the same" },
          { status: 400 }
        );
      }
    }

    const redirect = await prisma.redirect.update({
      where: { id },
      data: {
        ...(sourceUrl && {
          sourceUrl: sourceUrl.toLowerCase().replace(/\/+$/, "") || "/",
        }),
        ...(destinationUrl && { destinationUrl }),
        ...(type && { type }),
        ...(typeof isActive === "boolean" && { isActive }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        notFoundUrl: true,
      },
    });

    // Invalidate cache
    invalidateRedirectCache();

    return NextResponse.json({ redirect });
  } catch (error) {
    console.error("Error updating redirect:", error);
    return NextResponse.json(
      { error: "Failed to update redirect" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/redirects/[id] - Delete redirect (ADMIN+ only)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch {
    return NextResponse.json(
      { error: "Requires ADMIN role or higher" },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    const redirect = await prisma.redirect.findUnique({
      where: { id },
      include: { notFoundUrl: true },
    });

    if (!redirect) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // If linked to a 404 URL, update its status back to ACTIVE
    if (redirect.notFoundUrl) {
      await prisma.notFoundUrl.update({
        where: { id: redirect.notFoundUrl.id },
        data: {
          status: NotFoundStatus.ACTIVE,
          redirectId: null,
        },
      });
    }

    await prisma.redirect.delete({
      where: { id },
    });

    // Invalidate cache
    invalidateRedirectCache();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting redirect:", error);
    return NextResponse.json(
      { error: "Failed to delete redirect" },
      { status: 500 }
    );
  }
}
