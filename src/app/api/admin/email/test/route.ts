import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { verifySmtpConnection, sendTestEmail } from "@/lib/email/index";

// GET /api/admin/email/test - Verify SMTP configuration
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await verifySmtpConnection();

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? "SMTP connection verified successfully"
        : `SMTP connection failed: ${result.error}`,
      config: result.config,
    });
  } catch (error) {
    console.error("Error verifying SMTP:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/email/test - Send a test email
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json(
        { error: "Missing required field: to (email address)" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    console.log(`[Admin] Sending test email to ${to} (requested by ${session.user?.email})`);

    const result = await sendTestEmail(to);

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? `Test email sent to ${to}. Check inbox (and spam folder).`
        : `Failed to send: ${result.error}`,
      messageId: result.id,
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
