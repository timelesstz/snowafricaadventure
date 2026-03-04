import { clsx } from "clsx";

interface SyncStatusBadgeProps {
  lastSyncAt: string | Date | null;
}

export default function SyncStatusBadge({ lastSyncAt }: SyncStatusBadgeProps) {
  if (!lastSyncAt) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        Never synced
      </span>
    );
  }

  const date = new Date(lastSyncAt);
  const hoursAgo = (Date.now() - date.getTime()) / (1000 * 60 * 60);

  const isRecent = hoursAgo < 25; // synced in last ~day

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        isRecent ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          isRecent ? "bg-green-500" : "bg-amber-500"
        )}
      />
      {isRecent ? "Synced" : "Stale"}{" "}
      {date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
}
