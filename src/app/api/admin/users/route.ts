import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { hash } from "bcryptjs";

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
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json(
      { error: "Forbidden", message: "Super Admin access required" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email, name, password, role } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Email, name, and password are required" },
        { status: 400 }
      );
    }

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
        role: role || AdminRole.VIEWER,
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
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
