import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/admin/invite-links/[id] - Revoke or reactivate an invite link
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const isActive = body.isActive;

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "isActive (boolean) is required" },
        { status: 400 }
      );
    }

    const link = await prisma.inviteLink.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ inviteLink: link });
  } catch (error) {
    console.error("Error updating invite link:", error);
    return NextResponse.json(
      { error: "Failed to update invite link" },
      { status: 500 }
    );
  }
}
