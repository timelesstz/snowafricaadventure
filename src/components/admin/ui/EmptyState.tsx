import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
      <Icon className="w-12 h-12 mx-auto text-slate-400 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
      {message && <p className="text-slate-500">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
