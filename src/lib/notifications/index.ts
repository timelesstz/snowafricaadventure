/**
 * Notification service for Snow Africa Adventure
 * Handles in-app notifications for the admin dashboard
 */

import { prisma } from "@/lib/prisma";
import { NotificationType, NotificationPriority, Prisma } from "@prisma/client";

export interface CreateNotificationData {
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  priority?: NotificationPriority;
  expiresAt?: Date;
}

export interface NotificationFilters {
  type?: NotificationType;
  isRead?: boolean;
  priority?: NotificationPriority;
  limit?: number;
  offset?: number;
}

/**
 * Create a new notification
 */
export async function createNotification(
  data: CreateNotificationData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const notification = await prisma.notification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data as Prisma.InputJsonValue,
        priority: data.priority || NotificationPriority.NORMAL,
        expiresAt: data.expiresAt,
      },
    });

    return { success: true, id: notification.id };
  } catch (error) {
    console.error("Failed to create notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get notifications with optional filtering
 */
export async function getNotifications(filters: NotificationFilters = {}) {
  const where: Prisma.NotificationWhereInput = {};

  if (filters.type) {
    where.type = filters.type;
  }

  if (typeof filters.isRead === "boolean") {
    where.isRead = filters.isRead;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  // Exclude expired notifications
  where.OR = [{ expiresAt: null }, { expiresAt: { gt: new Date() } }];

  const [notifications, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: filters.limit || 50,
      skip: filters.offset || 0,
    }),
    prisma.notification.count({ where }),
    prisma.notification.count({
      where: { ...where, isRead: false },
    }),
  ]);

  return { notifications, total, unreadCount };
}

/**
 * Mark notification as read
 */
export async function markAsRead(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return { success: false };
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead() {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    return { success: false };
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete notification:", error);
    return { success: false };
  }
}

/**
 * Delete old notifications (cleanup)
 */
export async function cleanupOldNotifications(daysOld: number = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  try {
    const result = await prisma.notification.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
        isRead: true,
      },
    });
    return { success: true, deleted: result.count };
  } catch (error) {
    console.error("Failed to cleanup old notifications:", error);
    return { success: false, deleted: 0 };
  }
}

// ============================================
// NOTIFICATION FACTORY FUNCTIONS
// ============================================

/**
 * Create booking-related notifications
 */
export const BookingNotifications = {
  newBooking: (data: {
    bookingId: string;
    leadName: string;
    routeTitle: string;
    totalPrice: number;
  }) =>
    createNotification({
      type: NotificationType.BOOKING_NEW,
      title: "New Booking Inquiry",
      message: `${data.leadName} submitted a booking inquiry for ${data.routeTitle} ($${data.totalPrice.toLocaleString()})`,
      data,
      priority: NotificationPriority.HIGH,
    }),

  bookingUpdated: (data: {
    bookingId: string;
    leadName: string;
    oldStatus: string;
    newStatus: string;
  }) =>
    createNotification({
      type: NotificationType.BOOKING_UPDATED,
      title: "Booking Status Updated",
      message: `${data.leadName}'s booking status changed from ${data.oldStatus} to ${data.newStatus}`,
      data,
    }),

  bookingCancelled: (data: {
    bookingId: string;
    leadName: string;
    routeTitle: string;
  }) =>
    createNotification({
      type: NotificationType.BOOKING_CANCELLED,
      title: "Booking Cancelled",
      message: `${data.leadName} cancelled their booking for ${data.routeTitle}`,
      data,
      priority: NotificationPriority.HIGH,
    }),

  paymentReceived: (data: {
    bookingId: string;
    leadName: string;
    amount: number;
    paymentType: "deposit" | "balance";
  }) =>
    createNotification({
      type: NotificationType.PAYMENT_RECEIVED,
      title: `${data.paymentType === "deposit" ? "Deposit" : "Balance"} Payment Received`,
      message: `${data.leadName} paid $${data.amount.toLocaleString()} (${data.paymentType})`,
      data,
      priority: NotificationPriority.HIGH,
    }),
};

/**
 * Create inquiry-related notifications
 */
export const InquiryNotifications = {
  newInquiry: (data: {
    inquiryId: string;
    fullName: string;
    type: string;
    tripType?: string;
  }) =>
    createNotification({
      type: NotificationType.INQUIRY_NEW,
      title: `New ${data.type} Inquiry`,
      message: `${data.fullName} submitted a ${data.tripType || data.type} inquiry`,
      data,
      priority: NotificationPriority.NORMAL,
    }),

  inquiryResponded: (data: {
    inquiryId: string;
    fullName: string;
    respondedBy: string;
  }) =>
    createNotification({
      type: NotificationType.INQUIRY_RESPONDED,
      title: "Inquiry Responded",
      message: `${data.respondedBy} responded to ${data.fullName}'s inquiry`,
      data,
      priority: NotificationPriority.LOW,
    }),
};

/**
 * Create departure-related notifications
 */
export const DepartureNotifications = {
  upcomingDeparture: (data: {
    departureId: string;
    routeTitle: string;
    departureDate: string;
    daysUntil: number;
    bookingCount: number;
  }) =>
    createNotification({
      type: NotificationType.DEPARTURE_UPCOMING,
      title: "Upcoming Departure",
      message: `${data.routeTitle} departs in ${data.daysUntil} days with ${data.bookingCount} confirmed`,
      data,
      priority:
        data.daysUntil <= 7
          ? NotificationPriority.HIGH
          : NotificationPriority.NORMAL,
    }),

  departureFull: (data: { departureId: string; routeTitle: string }) =>
    createNotification({
      type: NotificationType.DEPARTURE_FULL,
      title: "Departure Now Full",
      message: `${data.routeTitle} is now fully booked`,
      data,
    }),

  lowAvailability: (data: {
    departureId: string;
    routeTitle: string;
    spotsRemaining: number;
  }) =>
    createNotification({
      type: NotificationType.LOW_AVAILABILITY,
      title: "Low Availability Alert",
      message: `Only ${data.spotsRemaining} spots remaining for ${data.routeTitle}`,
      data,
      priority: NotificationPriority.NORMAL,
    }),
};

/**
 * Create commission-related notifications
 */
export const CommissionNotifications = {
  commissionEarned: (data: {
    commissionId: string;
    partnerName: string;
    amount: number;
    bookingId: string;
  }) =>
    createNotification({
      type: NotificationType.COMMISSION_EARNED,
      title: "Commission Earned",
      message: `${data.partnerName} earned $${data.amount.toLocaleString()} commission`,
      data,
      priority: NotificationPriority.LOW,
    }),
};

/**
 * Create system notifications
 */
export const SystemNotifications = {
  alert: (data: { title: string; message: string; priority?: NotificationPriority }) =>
    createNotification({
      type: NotificationType.SYSTEM_ALERT,
      title: data.title,
      message: data.message,
      priority: data.priority || NotificationPriority.HIGH,
    }),
};

// Re-export types
export { NotificationType, NotificationPriority };
