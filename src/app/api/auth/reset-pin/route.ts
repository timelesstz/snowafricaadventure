import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import {
  clearAuthFailures,
  getClientIp,
  isAuthThrottled,
  recordAuthFailure,
} from "@/lib/auth-rate-limit";

const SCOPE = "reset-pin";
const GENERIC_ERROR = "Invalid email or password";

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

    // New PINs must be exactly 6 digits
    if (typeof newPin !== "string" || !/^\d{6}$/.test(newPin)) {
      return NextResponse.json(
        { error: "PIN must be exactly 6 digits" },
        { status: 400 }
      );
    }

    const ip = getClientIp(request.headers);
    if (isAuthThrottled(SCOPE, email, ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
      where: { email: String(email).toLowerCase() },
    });

    // Verify the password before revealing anything about the account (role,
    // existence). Every failure returns the same generic error.
    const isValid =
      !!user && user.isActive && (await compare(String(password), user.passwordHash));

    if (!user || !isValid || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      recordAuthFailure(SCOPE, email, ip);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    clearAuthFailures(SCOPE, email);

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
