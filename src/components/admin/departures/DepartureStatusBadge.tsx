"use client";

import { DepartureStatus } from "@prisma/client";
import { clsx } from "clsx";

interface DepartureStatusBadgeProps {
  status: DepartureStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  DepartureStatus,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Draft",
    className: "bg-slate-100 text-slate-600",
  },
  OPEN: {
    label: "Open",
    className: "bg-green-100 text-green-700",
  },
  LIMITED: {
    label: "Limited",
    className: "bg-amber-100 text-amber-700",
  },
  FULL: {
    label: "Full",
    className: "bg-red-100 text-red-700",
  },
  GUARANTEED: {
    label: "Guaranteed",
    className: "bg-purple-100 text-purple-700",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-slate-200 text-slate-500",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700",
  },
};

export function DepartureStatusBadge({
  status,
  size = "md",
}: DepartureStatusBadgeProps) {
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
