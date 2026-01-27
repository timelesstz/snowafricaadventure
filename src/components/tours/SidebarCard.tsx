import { LucideIcon } from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  highlight?: string;
}

interface SidebarCardProps {
  title: string;
  items: SidebarItem[];
}

export function SidebarCard({ title, items }: SidebarCardProps) {
  return (
    <div className="bg-[var(--surface)] rounded-sm p-6 border border-[var(--border)]">
      <h4 className="font-heading text-sm font-bold text-[var(--text)] uppercase tracking-wider pb-3 mb-4 border-b-2 border-[var(--secondary)]">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-4 py-2 text-sm text-[var(--text-muted)]">
            <span className="w-10 h-10 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm">
              <item.icon className="w-5 h-5 stroke-[var(--secondary)]" />
            </span>
            <span className="text-[var(--text)]">
              {item.highlight ? (
                <>
                  <strong className="font-semibold">{item.highlight}</strong> {item.label}
                </>
              ) : (
                item.label
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
