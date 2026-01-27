/**
 * Notification service tests
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationType, NotificationPriority } from "@prisma/client";

// Mock Prisma - must be hoisted, so no external references
vi.mock("@/lib/prisma", () => ({
  prisma: {
    notification: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

// Import the mocked prisma after mocking
import { prisma } from "@/lib/prisma";

// Import after mocking
import {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  cleanupOldNotifications,
  BookingNotifications,
  InquiryNotifications,
  DepartureNotifications,
  CommissionNotifications,
  SystemNotifications,
} from "@/lib/notifications";

// Type the mocked prisma
const mockPrisma = prisma as unknown as {
  notification: {
    create: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    updateMany: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
  };
};

describe("Notification Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createNotification", () => {
    it("should create a notification successfully", async () => {
      mockPrisma.notification.create.mockResolvedValue({
        id: "test-notification-id",
        type: "BOOKING_NEW",
        title: "New Booking",
        message: "Test message",
      });

      const result = await createNotification({
        type: NotificationType.BOOKING_NEW,
        title: "New Booking",
        message: "Test message",
      });

      expect(result.success).toBe(true);
      expect(result.id).toBe("test-notification-id");
      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "BOOKING_NEW",
          title: "New Booking",
          message: "Test message",
          priority: "NORMAL",
        }),
      });
    });

    it("should handle creation errors", async () => {
      mockPrisma.notification.create.mockRejectedValue(
        new Error("Database error")
      );

      const result = await createNotification({
        type: NotificationType.BOOKING_NEW,
        title: "Test",
        message: "Test",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Database error");
    });

    it("should respect custom priority", async () => {
      mockPrisma.notification.create.mockResolvedValue({ id: "test" });

      await createNotification({
        type: NotificationType.SYSTEM_ALERT,
        title: "Alert",
        message: "Critical system alert",
        priority: NotificationPriority.URGENT,
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          priority: "URGENT",
        }),
      });
    });
  });

  describe("getNotifications", () => {
    it("should return notifications with counts", async () => {
      const mockNotifications = [
        { id: "1", title: "Test 1", isRead: false },
        { id: "2", title: "Test 2", isRead: true },
      ];

      mockPrisma.notification.findMany.mockResolvedValue(mockNotifications);
      mockPrisma.notification.count
        .mockResolvedValueOnce(2) // total
        .mockResolvedValueOnce(1); // unread

      const result = await getNotifications();

      expect(result.notifications).toEqual(mockNotifications);
      expect(result.total).toBe(2);
      expect(result.unreadCount).toBe(1);
    });

    it("should apply filters correctly", async () => {
      mockPrisma.notification.findMany.mockResolvedValue([]);
      mockPrisma.notification.count.mockResolvedValue(0);

      await getNotifications({
        type: NotificationType.BOOKING_NEW,
        isRead: false,
        priority: NotificationPriority.HIGH,
        limit: 10,
        offset: 5,
      });

      expect(mockPrisma.notification.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          type: "BOOKING_NEW",
          isRead: false,
          priority: "HIGH",
        }),
        orderBy: expect.any(Array),
        take: 10,
        skip: 5,
      });
    });
  });

  describe("markAsRead", () => {
    it("should mark notification as read", async () => {
      mockPrisma.notification.update.mockResolvedValue({});

      const result = await markAsRead("test-id");

      expect(result.success).toBe(true);
      expect(mockPrisma.notification.update).toHaveBeenCalledWith({
        where: { id: "test-id" },
        data: {
          isRead: true,
          readAt: expect.any(Date),
        },
      });
    });

    it("should handle errors", async () => {
      mockPrisma.notification.update.mockRejectedValue(new Error("Not found"));

      const result = await markAsRead("invalid-id");

      expect(result.success).toBe(false);
    });
  });

  describe("markAllAsRead", () => {
    it("should mark all unread notifications as read", async () => {
      mockPrisma.notification.updateMany.mockResolvedValue({ count: 5 });

      const result = await markAllAsRead();

      expect(result.success).toBe(true);
      expect(mockPrisma.notification.updateMany).toHaveBeenCalledWith({
        where: { isRead: false },
        data: {
          isRead: true,
          readAt: expect.any(Date),
        },
      });
    });
  });

  describe("deleteNotification", () => {
    it("should delete notification", async () => {
      mockPrisma.notification.delete.mockResolvedValue({});

      const result = await deleteNotification("test-id");

      expect(result.success).toBe(true);
      expect(mockPrisma.notification.delete).toHaveBeenCalledWith({
        where: { id: "test-id" },
      });
    });
  });

  describe("cleanupOldNotifications", () => {
    it("should delete old read notifications", async () => {
      mockPrisma.notification.deleteMany.mockResolvedValue({ count: 10 });

      const result = await cleanupOldNotifications(30);

      expect(result.success).toBe(true);
      expect(result.deleted).toBe(10);
      expect(mockPrisma.notification.deleteMany).toHaveBeenCalledWith({
        where: {
          createdAt: { lt: expect.any(Date) },
          isRead: true,
        },
      });
    });
  });
});

describe("Notification Factory Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.notification.create.mockResolvedValue({ id: "test-id" });
  });

  describe("BookingNotifications", () => {
    it("should create new booking notification with HIGH priority", async () => {
      await BookingNotifications.newBooking({
        bookingId: "booking-123",
        leadName: "John Doe",
        routeTitle: "Machame Route",
        totalPrice: 4800,
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "BOOKING_NEW",
          title: "New Booking Inquiry",
          priority: "HIGH",
        }),
      });
    });

    it("should create booking updated notification", async () => {
      await BookingNotifications.bookingUpdated({
        bookingId: "booking-123",
        leadName: "John Doe",
        oldStatus: "INQUIRY",
        newStatus: "CONFIRMED",
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "BOOKING_UPDATED",
          message: expect.stringContaining("INQUIRY"),
        }),
      });
    });

    it("should create payment received notification", async () => {
      await BookingNotifications.paymentReceived({
        bookingId: "booking-123",
        leadName: "John Doe",
        amount: 1440,
        paymentType: "deposit",
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "PAYMENT_RECEIVED",
          title: "Deposit Payment Received",
          priority: "HIGH",
        }),
      });
    });
  });

  describe("InquiryNotifications", () => {
    it("should create new inquiry notification", async () => {
      await InquiryNotifications.newInquiry({
        inquiryId: "inquiry-123",
        fullName: "Jane Doe",
        type: "safari",
        tripType: "Wildlife Safari",
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "INQUIRY_NEW",
          title: "New safari Inquiry",
        }),
      });
    });
  });

  describe("DepartureNotifications", () => {
    it("should create upcoming departure notification with HIGH priority for 7 days or less", async () => {
      await DepartureNotifications.upcomingDeparture({
        departureId: "dep-123",
        routeTitle: "Machame Route",
        departureDate: "2026-03-15",
        daysUntil: 5,
        bookingCount: 3,
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "DEPARTURE_UPCOMING",
          priority: "HIGH",
        }),
      });
    });

    it("should create upcoming departure notification with NORMAL priority for more than 7 days", async () => {
      await DepartureNotifications.upcomingDeparture({
        departureId: "dep-123",
        routeTitle: "Machame Route",
        departureDate: "2026-03-15",
        daysUntil: 14,
        bookingCount: 3,
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "DEPARTURE_UPCOMING",
          priority: "NORMAL",
        }),
      });
    });
  });

  describe("CommissionNotifications", () => {
    it("should create commission earned notification", async () => {
      await CommissionNotifications.commissionEarned({
        commissionId: "comm-123",
        partnerName: "Partner ABC",
        amount: 360,
        bookingId: "booking-123",
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "COMMISSION_EARNED",
          message: expect.stringContaining("$360"),
        }),
      });
    });
  });

  describe("SystemNotifications", () => {
    it("should create system alert with custom priority", async () => {
      await SystemNotifications.alert({
        title: "Database Backup",
        message: "Daily backup completed successfully",
        priority: NotificationPriority.LOW,
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "SYSTEM_ALERT",
          priority: "LOW",
        }),
      });
    });

    it("should default to HIGH priority for system alerts", async () => {
      await SystemNotifications.alert({
        title: "Critical Alert",
        message: "Something went wrong",
      });

      expect(mockPrisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: "SYSTEM_ALERT",
          priority: "HIGH",
        }),
      });
    });
  });
});
