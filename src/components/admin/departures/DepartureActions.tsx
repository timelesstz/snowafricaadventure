"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DepartureStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, fieldControlClass } from "../ui";

type Action = "switch-off" | "delete" | null;

interface DepartureActionsProps {
  departureId: string;
  status: DepartureStatus;
  bookingCount: number;
}

export function DepartureActions({
  departureId,
  status,
  bookingCount,
}: DepartureActionsProps) {
  const router = useRouter();
  const [action, setAction] = useState<Action>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSwitchOff = action === "switch-off";

  const close = () => {
    if (loading) return;
    setAction(null);
    setReason("");
    setError("");
  };

  const open = (nextAction: Exclude<Action, null>) => {
    setReason("");
    setError("");
    setAction(nextAction);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!action) return;

    const trimmedReason = reason.trim();
    if (trimmedReason.length < 5) {
      setError("Reason must contain at least 5 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/departures/${departureId}`, {
        method: isSwitchOff ? "PUT" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSwitchOff
            ? { status: "CANCELLED", reason: trimmedReason }
            : { reason: trimmedReason }
        ),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          data?.issues?.[0]?.message ||
            data?.error ||
            (isSwitchOff
              ? "Failed to switch off departure"
              : "Failed to delete departure")
        );
      }

      if (data?.warning) {
        toast.warning(data.warning);
      }
      toast.success(
        isSwitchOff ? "Departure switched off" : "Departure deleted"
      );
      router.push("/admin/departures");
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto rounded-lg border border-red-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-red-900">Departure actions</h2>
      <p className="mt-1 text-sm text-slate-600">
        Switching off hides the departure from new public bookings. Existing
        bookings are not changed.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => open("switch-off")}
          disabled={status === "CANCELLED"}
          className="min-h-11 w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Switch off departure
        </button>
        <button
          type="button"
          onClick={() => open("delete")}
          disabled={bookingCount > 0}
          title={
            bookingCount > 0
              ? "Departures with bookings cannot be deleted"
              : undefined
          }
          className="min-h-11 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300 sm:w-auto"
        >
          Delete departure
        </button>
      </div>

      {status === "CANCELLED" && (
        <p className="mt-3 text-sm text-slate-600">
          This departure is already switched off.
        </p>
      )}
      {bookingCount > 0 && (
        <p className="mt-3 text-sm text-red-700">
          This departure has {bookingCount} booking
          {bookingCount === 1 ? "" : "s"}; switch it off instead of deleting it.
        </p>
      )}

      <Dialog
        open={action !== null}
        onClose={close}
        preventClose={loading}
        title={
          isSwitchOff
            ? "Switch off departure?"
            : "Permanently delete departure?"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-slate-600">
            {isSwitchOff
              ? "New public bookings will stop. Existing bookings will remain unchanged."
              : "This cannot be undone. The reason will be retained in the departure audit log."}
          </p>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="departure-action-reason"
              className="text-sm font-medium text-slate-700"
            >
              {isSwitchOff ? "Switch-off reason" : "Deletion reason"}
            </label>
            <textarea
              id="departure-action-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              minLength={5}
              maxLength={1000}
              required
              disabled={loading}
              className={`${fieldControlClass} w-full resize-y text-base`}
              placeholder="Explain why this action is necessary"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="min-h-11 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-300"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {isSwitchOff ? "Confirm switch off" : "Confirm deletion"}
            </button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}
