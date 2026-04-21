import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

type StatTone = "neutral" | "pending" | "info" | "success" | "warning" | "completed";

const toneStyles: Record<StatTone, { bg: string; fg: string }> = {
  neutral: { bg: "bg-slate-100", fg: "text-slate-600" },
  pending: { bg: "bg-yellow-100", fg: "text-yellow-600" },
  info: { bg: "bg-blue-100", fg: "text-blue-600" },
  success: { bg: "bg-green-100", fg: "text-green-600" },
  warning: { bg: "bg-amber-100", fg: "text-amber-600" },
  completed: { bg: "bg-emerald-100", fg: "text-emerald-600" },
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: StatTone;
}

export function StatCard({ label, value, icon: Icon, tone = "neutral" }: StatCardProps) {
  const style = toneStyles[tone];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            style.bg
          )}
        >
          <Icon className={clsx("w-5 h-5", style.fg)} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-600 truncate">{label}</p>
          <p className="text-xl font-bold text-slate-900 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface StatCardGridProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4 | 5;
}

const colsClass: Record<2 | 3 | 4 | 5, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-5",
};

export function StatCardGrid({ children, cols = 4 }: StatCardGridProps) {
  return (
    <div className={clsx("grid grid-cols-1 gap-4 mb-6", colsClass[cols])}>
      {children}
    </div>
  );
}
