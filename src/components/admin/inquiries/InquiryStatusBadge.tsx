"use client";

import { StatusBadge, type StatusTone } from "../ui/StatusBadge";

type InquiryStatus = "new" | "contacted" | "converted" | "closed";

interface InquiryStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const config: Record<InquiryStatus, { label: string; tone: StatusTone }> = {
  new: { label: "New", tone: "info" },
  contacted: { label: "Contacted", tone: "pending" },
  converted: { label: "Converted", tone: "success" },
  closed: { label: "Closed", tone: "neutral" },
};

export function InquiryStatusBadge({
  status,
  size = "md",
}: InquiryStatusBadgeProps) {
  const entry = config[status as InquiryStatus] ?? {
    label: status,
    tone: "neutral" as StatusTone,
  };
  return <StatusBadge label={entry.label} tone={entry.tone} size={size} />;
}
