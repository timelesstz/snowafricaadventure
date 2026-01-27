"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NotFoundStatus } from "@prisma/client";
import { Loader2, Check, X, Trash2 } from "lucide-react";

interface NotFoundStatusActionsProps {
  id: string;
  currentStatus: NotFoundStatus;
  hasRedirect: boolean;
}

export function NotFoundStatusActions({
  id,
  currentStatus,
  hasRedirect,
}: NotFoundStatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (newStatus: NotFoundStatus) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/404-monitor/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this 404 entry and all its hits? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/404-monitor/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      router.push("/admin/404-monitor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {currentStatus !== "ACTIVE" && !hasRedirect && (
          <button
            onClick={() => updateStatus("ACTIVE")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Mark as Active
          </button>
        )}

        {currentStatus !== "IGNORED" && (
          <button
            onClick={() => updateStatus("IGNORED")}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
            Ignore
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          Delete
        </button>
      </div>

      <p className="text-xs text-slate-500">
        {currentStatus === "ACTIVE" && "This URL is being tracked for 404 hits."}
        {currentStatus === "IGNORED" && "This URL will not be shown in active 404s but will still be tracked."}
        {currentStatus === "REDIRECTED" && "This URL has an active redirect configured."}
      </p>
    </div>
  );
}
