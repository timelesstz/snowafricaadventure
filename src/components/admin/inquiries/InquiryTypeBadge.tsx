"use client";

import { clsx } from "clsx";
import { Mountain, TreePalm, Users, Sparkles, MessageCircle } from "lucide-react";

type InquiryType = "safari" | "trekking" | "group" | "custom" | "contact";

interface InquiryTypeBadgeProps {
  type: string;
  size?: "sm" | "md";
  showIcon?: boolean;
}

const typeConfig: Record<
  InquiryType,
  { label: string; className: string; icon: typeof Mountain }
> = {
  safari: {
    label: "Safari",
    className: "bg-amber-100 text-amber-700",
    icon: TreePalm,
  },
  trekking: {
    label: "Trekking",
    className: "bg-emerald-100 text-emerald-700",
    icon: Mountain,
  },
  group: {
    label: "Group Departure",
    className: "bg-purple-100 text-purple-700",
    icon: Users,
  },
  custom: {
    label: "Custom",
    className: "bg-blue-100 text-blue-700",
    icon: Sparkles,
  },
  contact: {
    label: "Contact",
    className: "bg-slate-100 text-slate-600",
    icon: MessageCircle,
  },
};

export function InquiryTypeBadge({ type, size = "md", showIcon = true }: InquiryTypeBadgeProps) {
  const config = typeConfig[type as InquiryType] || {
    label: type,
    className: "bg-slate-100 text-slate-600",
    icon: MessageCircle,
  };

  const Icon = config.icon;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium rounded-full",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className
      )}
    >
      {showIcon && <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />}
      {config.label}
    </span>
  );
}
