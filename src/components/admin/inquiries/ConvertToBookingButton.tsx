"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, AlertCircle, Loader2, X } from "lucide-react";

interface DepartureOption {
  id: string;
  arrivalDate: string;
  price: number | string;
  spotsRemaining: number;
  status: string;
  route: { title: string };
}

interface ConvertToBookingButtonProps {
  inquiryId: string;
  fullName: string;
  defaultClimbers: number;
  isConverted: boolean;
}

export function ConvertToBookingButton({
  inquiryId,
  fullName,
  defaultClimbers,
  isConverted,
}: ConvertToBookingButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [departures, setDepartures] = useState<DepartureOption[] | null>(null);
  const [departureId, setDepartureId] = useState("");
  const [totalClimbers, setTotalClimbers] = useState(
    Math.max(1, defaultClimbers)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || departures !== null) return;
    fetch("/api/admin/departures")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: DepartureOption[]) => {
        const upcoming = data.filter(
          (d) =>
            new Date(d.arrivalDate) >= new Date() &&
            ["OPEN", "LIMITED", "GUARANTEED"].includes(d.status)
        );
        setDepartures(upcoming);
        if (upcoming[0]) setDepartureId(upcoming[0].id);
      })
      .catch(() => setError("Failed to load departures"));
  }, [open, departures]);

  const handleConvert = async () => {
    if (!departureId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/admin/inquiries/${inquiryId}/convert`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departureId, totalClimbers }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to convert inquiry");
      }
      router.push(`/admin/bookings/${data.bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert inquiry");
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isConverted}
        className="flex items-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title={isConverted ? "Already converted to a booking" : undefined}
      >
        <CalendarPlus className="w-4 h-4" />
        {isConverted ? "Converted" : "Convert to Booking"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Convert inquiry to booking"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Convert to Booking
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              Creates a booking for <strong>{fullName}</strong> with their
              contact details prefilled, and marks this inquiry as converted.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="convert-departure"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Departure
                </label>
                {departures === null ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading
                    departures…
                  </div>
                ) : (
                  <select
                    id="convert-departure"
                    value={departureId}
                    onChange={(e) => setDepartureId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  >
                    {departures.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.route.title} —{" "}
                        {new Date(d.arrivalDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        (${Number(d.price).toLocaleString()},{" "}
                        {d.spotsRemaining} spots)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label
                  htmlFor="convert-climbers"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Number of climbers
                </label>
                <input
                  id="convert-climbers"
                  type="number"
                  min={1}
                  max={20}
                  value={totalClimbers}
                  onChange={(e) =>
                    setTotalClimbers(
                      Math.max(1, Math.min(20, Number(e.target.value) || 1))
                    )
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleConvert}
                disabled={submitting || !departureId}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Booking
              </button>
              <button
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
