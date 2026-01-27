"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, RefreshCw, AlertCircle } from "lucide-react";

interface RotationConfig {
  id: string;
  isEnabled: boolean;
  mode: "NEXT_UPCOMING" | "MANUAL_ONLY";
  skipWithinDays: number;
  prioritizeFullMoon: boolean;
  lastRotationAt: string | null;
}

export default function RotationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [config, setConfig] = useState<RotationConfig | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/admin/departures/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setConfig(data);
    } catch {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/departures/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setSuccess("Settings saved successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleRunRotation = async () => {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/departures/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Rotation failed");

      const result = await response.json();
      setSuccess(
        `Rotation completed: ${result.result?.completedDepartures || 0} departures marked complete, ${result.result?.featuredUpdates?.length || 0} featured updates`
      );
      fetchConfig();
    } catch {
      setError("Failed to run rotation");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/departures"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Rotation Settings
          </h1>
          <p className="text-slate-600 mt-1">
            Configure automatic departure rotation behavior
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">{success}</div>
      )}

      {config && (
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Auto-Rotation
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Automatically rotate featured departures daily
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isEnabled}
                  onChange={(e) =>
                    setConfig({ ...config, isEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Rotation Mode
            </h2>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="mode"
                  checked={config.mode === "NEXT_UPCOMING"}
                  onChange={() =>
                    setConfig({ ...config, mode: "NEXT_UPCOMING" })
                  }
                  className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <p className="font-medium text-slate-900">Next Upcoming</p>
                  <p className="text-sm text-slate-500">
                    Automatically feature the next upcoming departure for each
                    route. Expired departures are marked as completed and the
                    next eligible departure takes over.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="mode"
                  checked={config.mode === "MANUAL_ONLY"}
                  onChange={() => setConfig({ ...config, mode: "MANUAL_ONLY" })}
                  className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <p className="font-medium text-slate-900">Manual Only</p>
                  <p className="text-sm text-slate-500">
                    Only show departures that are manually featured by admins.
                    Auto-rotation of featured departures is disabled.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Skip Rules */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Skip Rules</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Skip departures starting within
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.skipWithinDays}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      skipWithinDays: Number(e.target.value),
                    })
                  }
                  min="0"
                  max="30"
                  className="w-24 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
                <span className="text-slate-600">days</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Departures starting within this many days won&apos;t be
                auto-featured (too late to book)
              </p>
            </div>
          </div>

          {/* Priority Options */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Priority Options
            </h2>

            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={config.prioritizeFullMoon}
                onChange={(e) =>
                  setConfig({ ...config, prioritizeFullMoon: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <p className="font-medium text-slate-900">
                  Prioritize Full Moon Departures
                </p>
                <p className="text-sm text-slate-500">
                  When enabled, full moon departures are featured before other
                  departures
                </p>
              </div>
            </label>
          </div>

          {/* Last Run Info */}
          {config.lastRotationAt && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-600">
                Last rotation:{" "}
                {new Date(config.lastRotationAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={handleRunRotation}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${saving ? "animate-spin" : ""}`}
              />
              Run Rotation Now
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
