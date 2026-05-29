import { Shield, Star, CheckCircle, Phone, Lock } from "lucide-react";

const badges = [
  { icon: Shield, label: "TATO Licensed" },
  { icon: Star, label: "4.9/5 TripAdvisor" },
  { icon: CheckCircle, label: "No Hidden Fees" },
  { icon: Phone, label: "24hr Support" },
  { icon: Lock, label: "Secure Booking" },
];

export function TrustBadgeStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3 px-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"
        >
          <Icon className="w-3.5 h-3.5 text-[var(--secondary)]" />
          <span className="font-medium whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  );
}
