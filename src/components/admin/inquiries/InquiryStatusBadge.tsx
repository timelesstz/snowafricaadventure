"use client";

import { StatusBadge, type StatusTone } from "../ui/StatusBadge";

type InquiryStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "converted"
  | "closed"
  | "spam";

interface InquiryStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const config: Record<InquiryStatus, { label: string; tone: StatusTone }> = {
  new: { label: "New", tone: "info" },
  contacted: { label: "Contacted", tone: "pending" },
  in_progress: { label: "In Progress", tone: "warning" },
  converted: { label: "Converted", tone: "success" },
  closed: { label: "Closed", tone: "neutral" },
  spam: { label: "Spam", tone: "danger" },
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
