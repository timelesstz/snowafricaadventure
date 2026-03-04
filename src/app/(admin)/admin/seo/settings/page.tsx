"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  Save,
  ExternalLink,
} from "lucide-react";
import { clsx } from "clsx";

interface SeoSettingsData {
  gscSiteUrl: string | null;
  ga4PropertyId: string | null;
  isGoogleConfigured: boolean;
  serviceAccountEmail: string | null;
  availableSites: string[];
  lastGscSync: {
    status: string;
    startedAt: string;
    completedAt: string | null;
    recordCount: number;
    error: string | null;
  } | null;
  lastGaSync: {
    status: string;
    startedAt: string;
    completedAt: string | null;
    recordCount: number;
    error: string | null;
  } | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SeoSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncingGsc, setSyncingGsc] = useState(false);
  const [syncingGa, setSyncingGa] = useState(false);
  const [gscSiteUrl, setGscSiteUrl] = useState("");
  const [ga4PropertyId, setGa4PropertyId] = useState("");
  const [syncDays, setSyncDays] = useState(3);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo/settings");
      if (res.ok) {
        const data: SeoSettingsData = await res.json();
        setSettings(data);
        setGscSiteUrl(data.gscSiteUrl || "");
        setGa4PropertyId(data.ga4PropertyId || "");
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/seo/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gscSiteUrl, ga4PropertyId }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully" });
        fetchSettings();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save settings" });
    }
    setSaving(false);
  };

  const handleSync = async (type: "gsc" | "ga") => {
    const setter = type === "gsc" ? setSyncingGsc : setSyncingGa;
    setter(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/seo/sync-${type === "gsc" ? "gsc" : "ga"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: syncDays }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: `${type.toUpperCase()} sync completed: ${data.recordCount} records`,
        });
        fetchSettings();
      } else {
        setMessage({ type: "error", text: data.error || "Sync failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Sync request failed" });
    }
    setter(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Message */}
      {message && (
        <div
          className={clsx(
            "px-4 py-3 rounded-lg text-sm",
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          )}
        >
          {message.text}
        </div>
      )}

      {/* Connection Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Google API Connection
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {settings?.isGoogleConfigured ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-900">
                Service Account{" "}
                {settings?.isGoogleConfigured ? "Connected" : "Not Configured"}
              </p>
              {settings?.serviceAccountEmail && (
                <p className="text-xs text-slate-500 font-mono">
                  {settings.serviceAccountEmail}
                </p>
              )}
            </div>
          </div>

          {!settings?.isGoogleConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <p className="font-semibold mb-2">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Create a Google Cloud project and enable Search Console API + GA4 Data API</li>
                <li>Create a service account and download the JSON key</li>
                <li>Add the service account email as a user in Google Search Console (read-only)</li>
                <li>Add the service account email as a Viewer in your GA4 property</li>
                <li>
                  Base64-encode the JSON key and set it as{" "}
                  <code className="bg-amber-100 px-1 rounded">GOOGLE_SERVICE_ACCOUNT_KEY</code>{" "}
                  environment variable
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Property Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Property Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Google Search Console Site URL
            </label>
            {settings?.availableSites && settings.availableSites.length > 0 ? (
              <select
                value={gscSiteUrl}
                onChange={(e) => setGscSiteUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select a site...</option>
                {settings.availableSites.map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={gscSiteUrl}
                onChange={(e) => setGscSiteUrl(e.target.value)}
                placeholder="https://www.snowafricaadventure.com/"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            )}
            <p className="text-xs text-slate-400 mt-1">
              The site URL as it appears in Google Search Console
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              GA4 Property ID
            </label>
            <input
              type="text"
              value={ga4PropertyId}
              onChange={(e) => setGa4PropertyId(e.target.value)}
              placeholder="e.g., 123456789"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Found in GA4 Admin &gt; Property Details (numbers only, not
              &quot;G-...&quot;)
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
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

      {/* Data Sync */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Data Sync
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Days to sync
            </label>
            <select
              value={syncDays}
              onChange={(e) => setSyncDays(parseInt(e.target.value))}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value={3}>Last 3 days</option>
              <option value={7}>Last 7 days</option>
              <option value={28}>Last 28 days</option>
              <option value={90}>Last 90 days (backfill)</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleSync("gsc")}
              disabled={syncingGsc || !settings?.isGoogleConfigured}
              className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 disabled:opacity-50 flex items-center gap-2"
            >
              {syncingGsc ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync Search Console
            </button>

            <button
              type="button"
              onClick={() => handleSync("ga")}
              disabled={syncingGa || !settings?.isGoogleConfigured}
              className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 disabled:opacity-50 flex items-center gap-2"
            >
              {syncingGa ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync Analytics
            </button>
          </div>

          {/* Last Sync Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Last GSC Sync
              </p>
              {settings?.lastGscSync ? (
                <>
                  <p className="text-sm text-slate-900">
                    {settings.lastGscSync.status} &middot;{" "}
                    {settings.lastGscSync.recordCount} records
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(settings.lastGscSync.startedAt).toLocaleString()}
                  </p>
                  {settings.lastGscSync.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {settings.lastGscSync.error}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-400">Never synced</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Last GA4 Sync
              </p>
              {settings?.lastGaSync ? (
                <>
                  <p className="text-sm text-slate-900">
                    {settings.lastGaSync.status} &middot;{" "}
                    {settings.lastGaSync.recordCount} records
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(settings.lastGaSync.startedAt).toLocaleString()}
                  </p>
                  {settings.lastGaSync.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {settings.lastGaSync.error}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-400">Never synced</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Useful Links
        </h3>
        <div className="space-y-2">
          <a
            href="https://console.cloud.google.com/apis/library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Cloud API Library
          </a>
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Search Console
          </a>
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Analytics
          </a>
        </div>
      </div>
    </div>
  );
}
