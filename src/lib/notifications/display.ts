import {
  Bell,
  Calendar,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  ClipboardList,
  ClipboardX,
  Clock,
  DollarSign,
  HandCoins,
  MessageSquare,
  MessageSquareReply,
  PartyPopper,
  TrendingDown,
  Users,
  type LucideIcon,
  AlertTriangle,
  Mountain,
} from "lucide-react";
import type { NotificationType, NotificationPriority } from "@prisma/client";

export interface NotificationDisplayable {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  isRead: boolean;
  priority: NotificationPriority;
  createdAt: string;
}

export const TYPE_ICON: Record<NotificationType, LucideIcon> = {
  BOOKING_NEW: ClipboardList,
  BOOKING_UPDATED: ClipboardList,
  BOOKING_CANCELLED: ClipboardX,
  INQUIRY_NEW: MessageSquare,
  INQUIRY_RESPONDED: MessageSquareReply,
  PAYMENT_RECEIVED: DollarSign,
  PAYMENT_REMINDER: Clock,
  DEPARTURE_UPCOMING: Calendar,
  DEPARTURE_FULL: PartyPopper,
  COMMISSION_EARNED: HandCoins,
  SYSTEM_ALERT: AlertTriangle,
  LOW_AVAILABILITY: TrendingDown,
  CLIMBER_DETAILS_COMPLETED: CheckCircle2,
  CLIMBER_DETAILS_REMINDER: Users,
};

export const TYPE_LABEL: Record<NotificationType, string> = {
  BOOKING_NEW: "New Booking",
  BOOKING_UPDATED: "Booking Updated",
  BOOKING_CANCELLED: "Booking Cancelled",
  INQUIRY_NEW: "New Inquiry",
  INQUIRY_RESPONDED: "Inquiry Responded",
  PAYMENT_RECEIVED: "Payment Received",
  PAYMENT_REMINDER: "Payment Reminder",
  DEPARTURE_UPCOMING: "Departure Upcoming",
  DEPARTURE_FULL: "Departure Full",
  COMMISSION_EARNED: "Commission Earned",
  SYSTEM_ALERT: "System Alert",
  LOW_AVAILABILITY: "Low Availability",
  CLIMBER_DETAILS_COMPLETED: "Climber Details Completed",
  CLIMBER_DETAILS_REMINDER: "Climber Details Reminder",
};

export const ALL_TYPES: NotificationType[] = Object.keys(TYPE_ICON) as NotificationType[];
export const ALL_PRIORITIES: NotificationPriority[] = ["LOW", "NORMAL", "HIGH", "URGENT"];

export function iconForType(type: string): LucideIcon {
  return TYPE_ICON[type as NotificationType] ?? Bell;
}

export function labelForType(type: string): string {
  return TYPE_LABEL[type as NotificationType] ?? type;
}

export const PRIORITY_BADGE: Record<NotificationPriority, string> = {
  LOW: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  NORMAL: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  HIGH: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  URGENT: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

export const PRIORITY_ACCENT: Record<NotificationPriority, string> = {
  LOW: "text-slate-400",
  NORMAL: "text-blue-500",
  HIGH: "text-amber-500",
  URGENT: "text-red-500",
};

const ICON_SURFACE: Record<NotificationPriority, string> = {
  LOW: "bg-slate-100 text-slate-600",
  NORMAL: "bg-blue-100 text-blue-600",
  HIGH: "bg-amber-100 text-amber-700",
  URGENT: "bg-red-100 text-red-700",
};

export function iconSurfaceFor(priority: NotificationPriority): string {
  return ICON_SURFACE[priority];
}

export const MOUNTAIN_DEFAULT_ICON = Mountain;
export const CALENDAR_CHECK_ICON = CalendarCheck;
export const CALENDAR_X_ICON = CalendarX;

export function linkForNotification(notification: {
  type: string;
  data?: Record<string, unknown> | null;
}): string | null {
  const data = (notification.data ?? undefined) as Record<string, string> | undefined;
  if (!data) return null;
  switch (notification.type) {
    case "BOOKING_NEW":
    case "BOOKING_UPDATED":
    case "BOOKING_CANCELLED":
    case "PAYMENT_RECEIVED":
    case "PAYMENT_REMINDER":
    case "CLIMBER_DETAILS_COMPLETED":
    case "CLIMBER_DETAILS_REMINDER":
      return data.bookingId ? `/admin/bookings/${data.bookingId}` : null;
    case "INQUIRY_NEW":
    case "INQUIRY_RESPONDED":
      return data.inquiryId ? `/admin/inquiries/${data.inquiryId}` : null;
    case "DEPARTURE_UPCOMING":
    case "DEPARTURE_FULL":
    case "LOW_AVAILABILITY":
      return data.departureId ? `/admin/departures/${data.departureId}` : null;
    case "COMMISSION_EARNED":
      return data.commissionId ? `/admin/commissions/${data.commissionId}` : null;
    default:
      return null;
  }
}
