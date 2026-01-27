/**
 * Admin Notifications API
 * GET /api/admin/notifications - List notifications
 * POST /api/admin/notifications - Create notification (internal use)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getNotifications,
  createNotification,
  markAllAsRead,
  NotificationType,
  NotificationPriority,
} from "@/lib/notifications";

export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    // Handle mark all as read action
    if (action === "markAllRead") {
      const result = await markAllAsRead();
      return NextResponse.json(result);
    }

    // Create new notification
    const { type, title, message, priority, expiresAt } = data;

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, message" },
        { status: 400 }
      );
    }

    const result = await createNotification({
      type,
      title,
      message,
      priority,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      data: data.data,
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
