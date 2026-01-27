"use client";

import { NotFoundStatus } from "@prisma/client";
import { clsx } from "clsx";

interface NotFoundStatusBadgeProps {
  status: NotFoundStatus;
  size?: "sm" | "md";
}

export function NotFoundStatusBadge({ status, size = "md" }: NotFoundStatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        sizeClasses,
        {
          "bg-amber-100 text-amber-800": status === "ACTIVE",
          "bg-slate-100 text-slate-600": status === "IGNORED",
          "bg-emerald-100 text-emerald-800": status === "REDIRECTED",
        }
      )}
    >
      {status === "ACTIVE" && "Active"}
      {status === "IGNORED" && "Ignored"}
      {status === "REDIRECTED" && "Redirected"}
    </span>
  );
}
