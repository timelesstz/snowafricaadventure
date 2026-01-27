import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { hash } from "bcryptjs";

type RouteParams = { params: Promise<{ id: string }> };

// Helper to check if user is SUPER_ADMIN
async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== AdminRole.SUPER_ADMIN) {
    return null;
  }
  return session;
}

// GET /api/admin/users/[id] - Get single user
export async function GET(request: Request, { params }: RouteParams) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { error: "Forbidden", message: "Super Admin access required" },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Update user
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { error: "Forbidden", message: "Super Admin access required" },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { name, email, role, isActive, password } = body;

    // Prevent self-demotion
    if (id === session.user.id && role && role !== AdminRole.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Cannot change your own role" },
        { status: 400 }
      );
    }

    // Prevent self-deactivation
    if (id === session.user.id && isActive === false) {
      return NextResponse.json(
        { error: "Cannot deactivate your own account" },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: {
      name?: string;
      email?: string;
      role?: AdminRole;
      isActive?: boolean;
      passwordHash?: string;
    } = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role as AdminRole;
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (password) updateData.passwordHash = await hash(password, 12);

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { error: "Forbidden", message: "Super Admin access required" },
      { status: 403 }
    );
  }

  const { id } = await params;

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json(
      { error: "Cannot delete your own account" },
      { status: 400 }
    );
  }

  try {
    await prisma.adminUser.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
