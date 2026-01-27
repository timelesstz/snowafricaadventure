"use client";

import { clsx } from "clsx";

type InquiryStatus = "new" | "contacted" | "converted" | "closed";

interface InquiryStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  InquiryStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-blue-100 text-blue-700",
  },
  contacted: {
    label: "Contacted",
    className: "bg-yellow-100 text-yellow-700",
  },
  converted: {
    label: "Converted",
    className: "bg-green-100 text-green-700",
  },
  closed: {
    label: "Closed",
    className: "bg-slate-100 text-slate-600",
  },
};

export function InquiryStatusBadge({ status, size = "md" }: InquiryStatusBadgeProps) {
  const config = statusConfig[status as InquiryStatus] || {
    label: status,
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
