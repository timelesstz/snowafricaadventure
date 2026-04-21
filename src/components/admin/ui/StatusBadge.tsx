import { clsx } from "clsx";

export type StatusTone =
  | "neutral"
  | "muted"
  | "pending"
  | "warning"
  | "info"
  | "success"
  | "completed"
  | "accent"
  | "danger"
  | "orange";

const toneClass: Record<StatusTone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  muted: "bg-slate-200 text-slate-500",
  pending: "bg-yellow-100 text-yellow-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  completed: "bg-emerald-100 text-emerald-700",
  accent: "bg-purple-100 text-purple-700",
  danger: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
};

const sizeClass: Record<"sm" | "md", string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({
  label,
  tone = "neutral",
  size = "md",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        toneClass[tone],
        sizeClass[size],
        className
      )}
    >
      {label}
    </span>
  );
}
