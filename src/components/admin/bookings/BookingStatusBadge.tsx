"use client";

import { BookingStatus } from "@prisma/client";
import { clsx } from "clsx";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  INQUIRY: {
    label: "Inquiry",
    className: "bg-slate-100 text-slate-600",
  },
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  DEPOSIT_PAID: {
    label: "Deposit Paid",
    className: "bg-blue-100 text-blue-700",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-green-100 text-green-700",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-purple-100 text-purple-700",
  },
  NO_SHOW: {
    label: "No Show",
    className: "bg-orange-100 text-orange-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export function BookingStatusBadge({
  status,
  size = "md",
}: BookingStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      {config.label}
    </span>
  );
}
