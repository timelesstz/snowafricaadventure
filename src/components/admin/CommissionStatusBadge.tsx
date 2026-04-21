import { StatusBadge, type StatusTone } from "./ui/StatusBadge";

const config: Record<string, { label: string; tone: StatusTone }> = {
  PENDING: { label: "PENDING", tone: "warning" },
  ELIGIBLE: { label: "ELIGIBLE", tone: "info" },
  PAID: { label: "PAID", tone: "success" },
  VOIDED: { label: "VOIDED", tone: "danger" },
};

export default function CommissionStatusBadge({
  status,
}: {
  status: string;
}) {
  const entry = config[status] ?? { label: status, tone: "neutral" as StatusTone };
  return <StatusBadge label={entry.label} tone={entry.tone} />;
}
