"use client";

import { BookingStatus } from "@prisma/client";
import { StatusBadge, type StatusTone } from "../ui/StatusBadge";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  size?: "sm" | "md";
}

const config: Record<BookingStatus, { label: string; tone: StatusTone }> = {
  INQUIRY: { label: "Inquiry", tone: "neutral" },
  PENDING: { label: "Pending", tone: "pending" },
  DEPOSIT_PAID: { label: "Deposit Paid", tone: "info" },
  CONFIRMED: { label: "Confirmed", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "danger" },
  REFUNDED: { label: "Refunded", tone: "accent" },
  NO_SHOW: { label: "No Show", tone: "orange" },
  COMPLETED: { label: "Completed", tone: "completed" },
};

export function BookingStatusBadge({
  status,
  size = "md",
}: BookingStatusBadgeProps) {
  const entry = config[status];
  return <StatusBadge label={entry.label} tone={entry.tone} size={size} />;
}
