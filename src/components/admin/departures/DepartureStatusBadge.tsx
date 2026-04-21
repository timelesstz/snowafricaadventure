"use client";

import { DepartureStatus } from "@prisma/client";
import { StatusBadge, type StatusTone } from "../ui/StatusBadge";

interface DepartureStatusBadgeProps {
  status: DepartureStatus;
  size?: "sm" | "md";
}

const config: Record<DepartureStatus, { label: string; tone: StatusTone }> = {
  DRAFT: { label: "Draft", tone: "neutral" },
  OPEN: { label: "Open", tone: "success" },
  LIMITED: { label: "Limited", tone: "warning" },
  FULL: { label: "Full", tone: "danger" },
  GUARANTEED: { label: "Guaranteed", tone: "accent" },
  CANCELLED: { label: "Cancelled", tone: "muted" },
  COMPLETED: { label: "Completed", tone: "info" },
};

export function DepartureStatusBadge({
  status,
  size = "md",
}: DepartureStatusBadgeProps) {
  const entry = config[status];
  return <StatusBadge label={entry.label} tone={entry.tone} size={size} />;
}
