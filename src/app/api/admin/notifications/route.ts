/**
 * Admin Notifications API
 * GET  /api/admin/notifications — list notifications
 * POST /api/admin/notifications — create, or run bulk actions (markAllRead, markRead, delete)
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth, requireRole } from "@/lib/auth";
import { AdminRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  getNotifications,
  createNotification,
  markAllAsRead,
  NotificationType,
  NotificationPriority,
} from "@/lib/notifications";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") as NotificationType | null;
    const isRead = searchParams.get("isRead");
    const priority = searchParams.get("priority") as NotificationPriority | null;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const result = await getNotifications({
      type: type || undefined,
      isRead: isRead === "true" ? true : isRead === "false" ? false : undefined,
      priority: priority || undefined,
      limit,
      offset,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return NextResponse.json(
      { error: "Failed to get notifications" },
      { status: 500 }
    );
  }
}

const bulkIdsSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(500),
});

const createSchema = z.object({
  type: z.nativeEnum(NotificationType),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  priority: z.nativeEnum(NotificationPriority).optional(),
  expiresAt: z.string().datetime().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireRole(AdminRole.EDITOR);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Insufficient permissions" ? 403 : 401;
    return NextResponse.json({ error: msg }, { status });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "markAllRead") {
      const result = await markAllAsRead();
      return NextResponse.json(result);
    }

    if (action === "markRead") {
      const parsed = bulkIdsSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "ids must be a non-empty string array" },
          { status: 400 }
        );
      }
      const result = await prisma.notification.updateMany({
        where: { id: { in: parsed.data.ids } },
        data: { isRead: true, readAt: new Date() },
      });
      return NextResponse.json({ success: true, count: result.count });
    }

    if (action === "delete") {
      const parsed = bulkIdsSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "ids must be a non-empty string array" },
          { status: 400 }
        );
      }
      const result = await prisma.notification.deleteMany({
        where: { id: { in: parsed.data.ids } },
      });
      return NextResponse.json({ success: true, count: result.count });
    }

    // Default: create a new notification
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid notification payload",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await createNotification({
      type: parsed.data.type,
      title: parsed.data.title,
      message: parsed.data.message,
      priority: parsed.data.priority,
      expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : undefined,
      data: parsed.data.data,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to process notification request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
