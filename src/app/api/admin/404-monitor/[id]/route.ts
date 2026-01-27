import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole, NotFoundStatus } from "@prisma/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/404-monitor/[id] - Get single 404 URL with recent hits
export async function GET(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const notFoundUrl = await prisma.notFoundUrl.findUnique({
      where: { id },
      include: {
        redirect: true,
      },
    });

    if (!notFoundUrl) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Get recent hits for this URL
    const recentHits = await prisma.notFoundHit.findMany({
      where: { url: notFoundUrl.url },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Get hit counts by day for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyHits = await prisma.notFoundHit.groupBy({
      by: ["createdAt"],
      where: {
        url: notFoundUrl.url,
        createdAt: { gte: thirtyDaysAgo },
      },
      _count: true,
    });

    return NextResponse.json({
      notFoundUrl,
      recentHits,
      dailyHits,
    });
  } catch (error) {
    console.error("Error fetching 404 URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch 404 URL" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/404-monitor/[id] - Update 404 URL status
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (status && !Object.values(NotFoundStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const notFoundUrl = await prisma.notFoundUrl.update({
      where: { id },
      data: {
        ...(status && { status }),
      },
      include: {
        redirect: true,
      },
    });

    return NextResponse.json({ notFoundUrl });
  } catch (error) {
    console.error("Error updating 404 URL:", error);
    return NextResponse.json(
      { error: "Failed to update 404 URL" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/404-monitor/[id] - Delete 404 URL (ADMIN+ only)
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
    const notFoundUrl = await prisma.notFoundUrl.findUnique({
      where: { id },
    });

    if (!notFoundUrl) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete associated hits as well
    await prisma.notFoundHit.deleteMany({
      where: { url: notFoundUrl.url },
    });

    await prisma.notFoundUrl.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting 404 URL:", error);
    return NextResponse.json(
      { error: "Failed to delete 404 URL" },
      { status: 500 }
    );
  }
}
