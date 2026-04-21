import { auth, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { hash } from "bcryptjs";
import { ZodError } from "zod";
import { adminUserCreateSchema } from "@/lib/schemas";

// Helper to check if user is SUPER_ADMIN
async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== AdminRole.SUPER_ADMIN) {
    return null;
  }
  return session;
}

// GET /api/admin/users - List all admin users
export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { error: "Forbidden", message: "Super Admin access required" },
      { status: 403 }
    );
  }

  try {
    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create new admin user
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.SUPER_ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  try {
    const body = await request.json();
    const { email, name, password, role } = adminUserCreateSchema.parse(body);

    // Check if email already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const user = await prisma.adminUser.create({
      data: {
        email,
        name,
        passwordHash,
        role: (role as AdminRole) || AdminRole.VIEWER,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
