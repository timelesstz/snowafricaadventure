"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Moon,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Route {
  id: string;
  title: string;
  duration: string;
  durationDays: number;
}

interface BulkCreateWizardProps {
  routes: Route[];
}

interface PreviewDeparture {
  arrivalDate: string;
  startDate: string;
  summitDate: string;
  endDate: string;
  isFullMoon: boolean;
  price: number;
  earlyBirdPrice: number | null;
  minParticipants: number;
  maxParticipants: number;
}

type Frequency = "weekly" | "biweekly" | "monthly";

export function BulkCreateWizard({ routes }: BulkCreateWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Route & Date Range
  const [routeId, setRouteId] = useState(routes[0]?.id || "");
  const [startDateRange, setStartDateRange] = useState("");
  const [endDateRange, setEndDateRange] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("weekly");

  // Step 2: Pricing & Capacity
  const [price, setPrice] = useState(2695);
  const [earlyBirdPrice, setEarlyBirdPrice] = useState<number | null>(null);
  const [minParticipants, setMinParticipants] = useState(2);
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [autoDetectFullMoon, setAutoDetectFullMoon] = useState(true);

  // Step 3: Preview
  const [preview, setPreview] = useState<PreviewDeparture[]>([]);

  const selectedRoute = routes.find((r) => r.id === routeId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleGeneratePreview = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/departures/bulk", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routeId,
          startDateRange,
          endDateRange,
          frequency,
          price,
          earlyBirdPrice,
          minParticipants,
          maxParticipants,
          autoDetectFullMoon,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate preview");
      }

      const data = await response.json();
      setPreview(data.preview);
      setStep(3);
    } catch {
      setError("Failed to generate preview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError("");

    try {
      const departures = preview.map((p) => ({
        routeId,
        arrivalDate: p.arrivalDate,
        price,
        earlyBirdPrice,
        minParticipants,
        maxParticipants,
      }));

      const response = await fetch("/api/admin/departures/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departures, autoDetectFullMoon }),
      });

      if (!response.ok) {
        throw new Error("Failed to create departures");
      }

      const data = await response.json();
      router.push(`/admin/departures?created=${data.created}`);
      router.refresh();
    } catch {
      setError("Failed to create departures. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/departures"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bulk Create Departures
          </h1>
          <p className="text-slate-600 mt-1">
            Schedule multiple departures at once
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s === step
                  ? "bg-amber-600 text-white"
                  : s < step
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 text-slate-600"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 ${
                  s < step ? "bg-green-500" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Step 1: Route & Date Range */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Step 1: Route & Date Range
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Route *
              </label>
              <select
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.title} ({route.duration})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date Range *
                </label>
                <input
                  type="date"
                  value={startDateRange}
                  onChange={(e) => setStartDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  End Date Range *
                </label>
                <input
                  type="date"
                  value={endDateRange}
                  onChange={(e) => setEndDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["weekly", "biweekly", "monthly"] as Frequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      frequency === f
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!routeId || !startDateRange || !endDateRange}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Pricing & Capacity */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Step 2: Pricing & Capacity
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Early Bird Price
                </label>
                <input
                  type="number"
                  value={earlyBirdPrice || ""}
                  onChange={(e) =>
                    setEarlyBirdPrice(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  min="0"
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Min Participants
                </label>
                <input
                  type="number"
                  value={minParticipants}
                  onChange={(e) => setMinParticipants(Number(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={autoDetectFullMoon}
                onChange={(e) => setAutoDetectFullMoon(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <Moon className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="font-medium text-slate-900">
                  Auto-detect Full Moon
                </p>
                <p className="text-sm text-slate-500">
                  Mark departures with summit dates near full moon
                </p>
              </div>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleGeneratePreview}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              Generate Preview
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Confirm */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Step 3: Preview ({preview.length} departures)
              </h2>
              <span className="text-sm text-slate-500">
                {selectedRoute?.title}
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-2 text-sm font-medium text-slate-600">
                      Arrival
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-slate-600">
                      Summit
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-slate-600">
                      End
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-medium text-slate-600">
                      Flags
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {preview.map((dep, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {formatDate(dep.arrivalDate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {formatDate(dep.summitDate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {formatDate(dep.endDate)}
                      </td>
                      <td className="px-4 py-3">
                        {dep.isFullMoon && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded">
                            <Moon className="w-3 h-3" />
                            Full Moon
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 mb-2">Summary</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>
                {preview.length} departures will be created for{" "}
                {selectedRoute?.title}
              </li>
              <li>Price: ${price.toLocaleString()}</li>
              {earlyBirdPrice && (
                <li>Early bird: ${earlyBirdPrice.toLocaleString()}</li>
              )}
              <li>
                Capacity: {minParticipants} - {maxParticipants} participants
              </li>
              <li>
                Full moon departures:{" "}
                {preview.filter((p) => p.isFullMoon).length}
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Create {preview.length} Departures
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
