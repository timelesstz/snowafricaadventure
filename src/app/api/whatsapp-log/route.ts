import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CommunicationChannel, EmailStatus } from "@prisma/client";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, RATE_LIMITS.normal)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { action, label, message, page } = body as {
      action?: string;
      label?: string;
      message?: string;
      page?: string;
    };

    if (!action) {
      return NextResponse.json({ error: "Missing action" }, { status: 400 });
    }

    const ua = request.headers.get("user-agent") || undefined;

    await prisma.emailLog.create({
      data: {
        channel: CommunicationChannel.WHATSAPP,
        recipient: "+255766657854",
        subject: label || action,
        type: action,
        status: EmailStatus.SENT,
        sentAt: new Date(),
        metadata: {
          message,
          page,
          ip,
          userAgent: ua,
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to log" }, { status: 500 });
  }
}
