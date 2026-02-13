import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { pin, currentPassword } = await request.json();

    if (!pin || !currentPassword) {
      return NextResponse.json(
        { error: "PIN and current password are required" },
        { status: 400 }
      );
    }

    // Validate PIN format (4-6 digits)
    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json(
        { error: "PIN must be 4-6 digits" },
        { status: 400 }
      );
    }

    // Get user with password
    const user = await prisma.adminUser.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash and save PIN
    const pinHash = await hash(pin, 10);

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { pin: pinHash },
    });

    return NextResponse.json({
      success: true,
      message: "PIN has been set successfully",
    });
  } catch (error) {
    console.error("Set PIN error:", error);
    return NextResponse.json(
      { error: "Failed to set PIN" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove PIN
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.adminUser.update({
      where: { id: session.user.id },
      data: { pin: null },
    });

    return NextResponse.json({
      success: true,
      message: "PIN has been removed",
    });
  } catch (error) {
    console.error("Remove PIN error:", error);
    return NextResponse.json(
      { error: "Failed to remove PIN" },
      { status: 500 }
    );
  }
}
