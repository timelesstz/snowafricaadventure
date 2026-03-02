import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { verifySmtpConnection, sendTestEmail, NOTIFICATION_EMAILS } from "@/lib/email/index";

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

// POST /api/admin/email/test - Send a test email or run diagnostics
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { to, diagnostic } = body;

    // Diagnostic mode: test delivery to each notification address individually
    if (diagnostic) {
      console.log(`[Admin] Running email diagnostic (requested by ${session.user?.email})`);

      const connectionResult = await verifySmtpConnection();
      if (!connectionResult.success) {
        return NextResponse.json({
          success: false,
          message: `SMTP connection failed: ${connectionResult.error}`,
          config: connectionResult.config,
        });
      }

      const fromDomain = (process.env.SMTP_FROM_EMAIL || "bookings@snowafricaadventure.com").split("@")[1];
      const results: Array<{ address: string; success: boolean; error?: string; messageId?: string; type: string }> = [];

      // Test each notification email address
      for (const email of NOTIFICATION_EMAILS) {
        const recipientDomain = email.split("@")[1];
        const result = await sendTestEmail(email);
        results.push({
          address: email,
          success: result.success,
          error: result.error,
          messageId: result.id,
          type: recipientDomain === fromDomain ? "same-domain (potential cPanel routing issue)" : "external",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Also test an external address if provided
      if (to) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(to)) {
          const result = await sendTestEmail(to);
          const recipientDomain = to.split("@")[1];
          results.push({
            address: to,
            success: result.success,
            error: result.error,
            messageId: result.id,
            type: recipientDomain === fromDomain ? "same-domain" : "external (user-specified)",
          });
        }
      }

      const hasSameDomainFailure = results.some((r) => !r.success && r.type.includes("same-domain"));

      return NextResponse.json({
        success: true,
        message: "Diagnostic complete. Check each result below.",
        smtpConfig: connectionResult.config,
        notificationEmails: NOTIFICATION_EMAILS,
        results,
        recommendation: hasSameDomainFailure
          ? "Same-domain delivery is failing. Add an external email (e.g., Gmail) to NOTIFICATION_EMAIL env var as a comma-separated fallback."
          : "All test emails sent successfully. Check inboxes and spam folders.",
      });
    }

    // Standard single test email
    if (!to) {
      return NextResponse.json(
        { error: "Missing required field: to (email address), or set diagnostic: true" },
        { status: 400 }
      );
    }

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
