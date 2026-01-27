"use client";

import { useState } from "react";
import { RefreshCw, Settings, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface RotationConfig {
  id: string;
  isEnabled: boolean;
  mode: string;
  skipWithinDays: number;
  prioritizeFullMoon: boolean;
  lastRotationAt: string | null;
  lastRotationResult: {
    completedDepartures?: number;
    featuredUpdates?: { routeId: string }[];
    statusChanges?: { departureId: string }[];
  } | null;
}

interface RotationStatusCardProps {
  config: RotationConfig | null;
  onRefresh?: () => void;
}

export function RotationStatusCard({ config, onRefresh }: RotationStatusCardProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleManualRotation = async () => {
    setIsRotating(true);
    try {
      const response = await fetch("/api/admin/departures/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Rotation failed");
      }

      onRefresh?.();
    } catch (error) {
      console.error("Manual rotation error:", error);
      alert("Rotation failed. Please try again.");
    } finally {
      setIsRotating(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Auto-Rotation Status
        </h3>
        <Link
          href="/admin/departures/settings"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-3">
          {config?.isEnabled ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Enabled</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Disabled</span>
            </div>
          )}
          <span className="text-sm text-slate-500">
            Mode: {config?.mode === "NEXT_UPCOMING" ? "Next Upcoming" : "Manual Only"}
          </span>
        </div>

        {/* Last Run */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          <span>Last run: {formatDate(config?.lastRotationAt || null)}</span>
        </div>

        {/* Last Result Summary */}
        {config?.lastRotationResult && (
          <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 space-y-1">
            <p>Completed: {config.lastRotationResult.completedDepartures || 0} departures</p>
            <p>Featured updates: {config.lastRotationResult.featuredUpdates?.length || 0}</p>
            <p>Status changes: {config.lastRotationResult.statusChanges?.length || 0}</p>
          </div>
        )}

        {/* Manual Trigger */}
        <button
          onClick={handleManualRotation}
          disabled={isRotating}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`} />
          {isRotating ? "Running..." : "Run Rotation Now"}
        </button>
      </div>
    </div>
  );
}
