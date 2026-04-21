import { clsx } from "clsx";

interface SyncStatusBadgeProps {
  lastSyncAt: string | Date | null;
  /**
   * Hours since the sync completed. Computed server-side and passed in as
   * a stable prop so the component stays pure during render.
   */
  hoursAgo?: number | null;
  /** Source label rendered as a prefix (e.g. "GSC", "GA4"). */
  source?: string;
  /**
   * Hours after which the sync turns amber. Defaults to 48h since the
   * /api/cron/seo-sync job runs daily and a 1-day skip is normal noise.
   */
  staleAfterHours?: number;
  /** Render `FAILED` state — wins over freshness coloring. */
  status?: "COMPLETED" | "FAILED" | "RUNNING" | "NEVER";
  /** Last error message — shown on hover when status is FAILED. */
  error?: string | null;
}

function formatRelative(hoursAgo: number): string {
  if (hoursAgo < 1) {
    const mins = Math.max(1, Math.round(hoursAgo * 60));
    return `${mins}m ago`;
  }
  if (hoursAgo < 24) {
    return `${Math.round(hoursAgo)}h ago`;
  }
  const days = Math.round(hoursAgo / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export default function SyncStatusBadge({
  lastSyncAt,
  hoursAgo,
  source,
  staleAfterHours = 48,
  status,
  error,
}: SyncStatusBadgeProps) {
  const prefix = source ? `${source}: ` : "";

  if (status === "FAILED") {
    return (
      <span
        title={error ?? undefined}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        {prefix}sync failed
      </span>
    );
  }

  if (status === "RUNNING") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        {prefix}syncing…
      </span>
    );
  }

  if (!lastSyncAt || hoursAgo === null || hoursAgo === undefined || status === "NEVER") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        {prefix}never synced
      </span>
    );
  }

  const isStale = hoursAgo >= staleAfterHours;
  const dateLabel =
    typeof lastSyncAt === "string"
      ? new Date(lastSyncAt).toLocaleString()
      : lastSyncAt.toLocaleString();

  return (
    <span
      title={dateLabel}
      className={clsx(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        isStale ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          isStale ? "bg-amber-500" : "bg-green-500"
        )}
      />
      {prefix}
      {formatRelative(hoursAgo)}
    </span>
  );
}
