import { StatusBadge, type StatusTone } from "./ui/StatusBadge";

const config: Record<string, { label: string; tone: StatusTone }> = {
  PENDING: { label: "PENDING", tone: "warning" },
  APPROVED: { label: "APPROVED", tone: "info" },
  PAID: { label: "PAID", tone: "success" },
  CANCELLED: { label: "CANCELLED", tone: "danger" },
};

export default function PayoutStatusBadge({ status }: { status: string }) {
  const entry = config[status] ?? { label: status, tone: "neutral" as StatusTone };
  return <StatusBadge label={entry.label} tone={entry.tone} />;
}
