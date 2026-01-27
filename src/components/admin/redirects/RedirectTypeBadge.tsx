"use client";

import { RedirectType } from "@prisma/client";
import { clsx } from "clsx";

interface RedirectTypeBadgeProps {
  type: RedirectType;
  size?: "sm" | "md";
}

export function RedirectTypeBadge({ type, size = "md" }: RedirectTypeBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        sizeClasses,
        {
          "bg-blue-100 text-blue-800": type === "PERMANENT",
          "bg-amber-100 text-amber-800": type === "TEMPORARY",
        }
      )}
    >
      {type === "PERMANENT" ? "301 Permanent" : "302 Temporary"}
    </span>
  );
}
