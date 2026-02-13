import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

// Reset PIN with password verification
export async function POST(request: NextRequest) {
  try {
    const { email, password, newPin } = await request.json();

    if (!email || !password || !newPin) {
      return NextResponse.json(
        { error: "Email, password, and new PIN are required" },
        { status: 400 }
      );
    }

    // Validate PIN format (4-6 digits)
    if (!/^\d{4,6}$/.test(newPin)) {
      return NextResponse.json(
        { error: "PIN must be 4-6 digits" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Only allow PIN for ADMIN and SUPER_ADMIN
    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "PIN login is only available for Admin users" },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Hash and save new PIN
    const pinHash = await hash(newPin, 10);

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { pin: pinHash },
    });

    return NextResponse.json({
      success: true,
      message: "PIN has been reset successfully",
    });
  } catch (error) {
    console.error("Reset PIN error:", error);
    return NextResponse.json(
      { error: "Failed to reset PIN" },
      { status: 500 }
    );
  }
}
