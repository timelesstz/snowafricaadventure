import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { AdminRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roleHierarchy: Record<string, number> = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    EDITOR: 2,
    VIEWER: 1,
  };
  if ((roleHierarchy[session.user.role] ?? 0) < roleHierarchy[AdminRole.ADMIN]) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const { id } = await params;

  const original = await prisma.emailLog.findUnique({ where: { id } });
  if (!original) {
    return NextResponse.json({ error: "Email log not found" }, { status: 404 });
  }

  if (original.status !== "FAILED") {
    return NextResponse.json(
      { error: "Only failed emails can be resent" },
      { status: 400 }
    );
  }

  try {
    const result = await sendEmail({
      to: original.recipient,
      subject: `[Retry] ${original.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>This is an automated retry of a previously failed email.</p>
          <p><strong>Original subject:</strong> ${original.subject}</p>
          <p><strong>Original date:</strong> ${original.createdAt.toISOString()}</p>
          <p><strong>Error:</strong> ${original.error || "Unknown"}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #64748b; font-size: 12px;">
            If you received this email, the delivery issue has been resolved.
            The original email content may need to be resent manually from the admin dashboard.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? "Email resent successfully"
        : "Resend failed",
    });
  } catch (error) {
    console.error("[Email Resend] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to resend" },
      { status: 500 }
    );
  }
}
