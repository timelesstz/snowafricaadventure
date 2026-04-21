"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Moon, Shield, Star, EyeOff, Loader2 } from "lucide-react";
import { DepartureStatus } from "@prisma/client";
import { toast } from "sonner";
import {
  Field,
  FieldLabel,
  FieldHelp,
  FormGrid,
  FormSection,
  fieldControlClass,
} from "../ui";

interface Route {
  id: string;
  title: string;
  slug: string;
  duration: string;
  durationDays: number;
}

interface DepartureFormData {
  routeId: string;
  arrivalDate: string;
  startDate: string;
  summitDate: string;
  endDate: string;
  price: number;
  currency: string;
  earlyBirdPrice: number | null;
  earlyBirdUntil: string;
  minParticipants: number;
  maxParticipants: number;
  isFullMoon: boolean;
  isGuaranteed: boolean;
  isFeatured: boolean;
  isManuallyFeatured: boolean;
  excludeFromRotation: boolean;
  status: DepartureStatus;
  internalNotes: string;
  publicNotes: string;
}

interface DepartureFormProps {
  departure?: DepartureFormData & { id: string };
  routes: Route[];
  mode: "create" | "edit";
}

const DEPARTURE_STATUSES: { value: DepartureStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "OPEN", label: "Open" },
  { value: "LIMITED", label: "Limited Spots" },
  { value: "FULL", label: "Full" },
  { value: "GUARANTEED", label: "Guaranteed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "COMPLETED", label: "Completed" },
];

export function DepartureForm({ departure, routes, mode }: DepartureFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<DepartureFormData>({
    routeId: departure?.routeId || routes[0]?.id || "",
    arrivalDate: departure?.arrivalDate || "",
    startDate: departure?.startDate || "",
    summitDate: departure?.summitDate || "",
    endDate: departure?.endDate || "",
    price: departure?.price || 2695,
    currency: departure?.currency || "USD",
    earlyBirdPrice: departure?.earlyBirdPrice || null,
    earlyBirdUntil: departure?.earlyBirdUntil || "",
    minParticipants: departure?.minParticipants || 2,
    maxParticipants: departure?.maxParticipants || 10,
    isFullMoon: departure?.isFullMoon || false,
    isGuaranteed: departure?.isGuaranteed || false,
    isFeatured: departure?.isFeatured || false,
    isManuallyFeatured: departure?.isManuallyFeatured || false,
    excludeFromRotation: departure?.excludeFromRotation || false,
    status: departure?.status || "OPEN",
    internalNotes: departure?.internalNotes || "",
    publicNotes: departure?.publicNotes || "",
  });

  // Auto-calculate dates when arrival date or route changes.
  useEffect(() => {
    if (formData.arrivalDate && formData.routeId) {
      const route = routes.find((r) => r.id === formData.routeId);
      if (route) {
        const arrival = new Date(formData.arrivalDate);
        const start = new Date(arrival);
        start.setDate(start.getDate() + 1);

        const end = new Date(start);
        end.setDate(end.getDate() + route.durationDays - 1);

        const summit = new Date(end);
        summit.setDate(summit.getDate() - 1);

        setFormData((prev) => ({
          ...prev,
          startDate: start.toISOString().split("T")[0],
          summitDate: summit.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        }));
      }
    }
  }, [formData.arrivalDate, formData.routeId, routes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url =
        mode === "create"
          ? "/api/admin/departures"
          : `/api/admin/departures/${departure?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save departure");
      }

      toast.success(mode === "create" ? "Departure created" : "Departure saved");
      router.push("/admin/departures");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const selectedRoute = routes.find((r) => r.id === formData.routeId);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/departures"
          aria-label="Back to departures"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </Link>
        <div>
          <h1 className="text-h1">
            {mode === "create" ? "Add Departure" : "Edit Departure"}
          </h1>
          <p className="text-body text-slate-600 mt-1">
            {mode === "create"
              ? "Schedule a new group departure"
              : "Update departure details"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div
            role="alert"
            className="p-4 bg-red-50 text-red-700 rounded-lg mb-4"
          >
            {error}
          </div>
        )}

        <FormSection title="Route">
          <Field>
            <FieldLabel htmlFor="routeId" required>
              Trekking Route
            </FieldLabel>
            <select
              id="routeId"
              value={formData.routeId}
              onChange={(e) =>
                setFormData({ ...formData, routeId: e.target.value })
              }
              required
              className={fieldControlClass}
            >
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.title} ({route.duration})
                </option>
              ))}
            </select>
            {selectedRoute && (
              <FieldHelp>Duration: {selectedRoute.durationDays} days</FieldHelp>
            )}
          </Field>
        </FormSection>

        <FormSection
          title="Dates"
          description="Trek start, summit, and end are auto-calculated from arrival + route duration."
        >
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="arrivalDate" required>
                Arrival Date (Day 0)
              </FieldLabel>
              <input
                id="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={(e) =>
                  setFormData({ ...formData, arrivalDate: e.target.value })
                }
                required
                className={fieldControlClass}
              />
              <FieldHelp>Day guests arrive in Arusha</FieldHelp>
            </Field>
            <Field>
              <FieldLabel htmlFor="startDate">Trek Start (Day 1)</FieldLabel>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className={`${fieldControlClass} bg-slate-50`}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="summitDate">Summit Date</FieldLabel>
              <input
                id="summitDate"
                type="date"
                value={formData.summitDate}
                onChange={(e) =>
                  setFormData({ ...formData, summitDate: e.target.value })
                }
                className={`${fieldControlClass} bg-slate-50`}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="endDate">Trek End Date</FieldLabel>
              <input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className={`${fieldControlClass} bg-slate-50`}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Pricing">
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="price" required>
                Price (USD)
              </FieldLabel>
              <input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
                min="0"
                step="1"
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="earlyBirdPrice">Early Bird Price</FieldLabel>
              <input
                id="earlyBirdPrice"
                type="number"
                value={formData.earlyBirdPrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyBirdPrice: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                min="0"
                step="1"
                placeholder="Optional"
                className={fieldControlClass}
              />
            </Field>
          </FormGrid>
          <Field>
            <FieldLabel htmlFor="earlyBirdUntil">Early Bird Until</FieldLabel>
            <input
              id="earlyBirdUntil"
              type="date"
              aria-label="Early bird until"
              value={formData.earlyBirdUntil}
              onChange={(e) =>
                setFormData({ ...formData, earlyBirdUntil: e.target.value })
              }
              className={fieldControlClass}
            />
          </Field>
        </FormSection>

        <FormSection title="Capacity">
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="minParticipants">Minimum Participants</FieldLabel>
              <input
                id="minParticipants"
                type="number"
                value={formData.minParticipants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minParticipants: Number(e.target.value),
                  })
                }
                min="1"
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="maxParticipants">Maximum Participants</FieldLabel>
              <input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxParticipants: Number(e.target.value),
                  })
                }
                min="1"
                className={fieldControlClass}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Special flags">
          <FormGrid cols={2}>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={formData.isFullMoon}
                onChange={(e) =>
                  setFormData({ ...formData, isFullMoon: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <Moon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
              <div>
                <p className="font-medium text-slate-900">Full Moon</p>
                <p className="text-xs text-slate-500">Summit during full moon</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={formData.isGuaranteed}
                onChange={(e) =>
                  setFormData({ ...formData, isGuaranteed: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <Shield className="w-5 h-5 text-green-500" aria-hidden="true" />
              <div>
                <p className="font-medium text-slate-900">Guaranteed</p>
                <p className="text-xs text-slate-500">Will run regardless</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={formData.isManuallyFeatured}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isManuallyFeatured: e.target.checked,
                    isFeatured: e.target.checked ? true : formData.isFeatured,
                  })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <Star className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <div>
                <p className="font-medium text-slate-900">Manual Feature</p>
                <p className="text-xs text-slate-500">Override auto-rotation</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={formData.excludeFromRotation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excludeFromRotation: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <EyeOff className="w-5 h-5 text-slate-400" aria-hidden="true" />
              <div>
                <p className="font-medium text-slate-900">Exclude Rotation</p>
                <p className="text-xs text-slate-500">Skip in auto-rotation</p>
              </div>
            </label>
          </FormGrid>
        </FormSection>

        <FormSection title="Status">
          <Field>
            <FieldLabel htmlFor="status">Departure status</FieldLabel>
            <select
              id="status"
              aria-label="Departure status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as DepartureStatus,
                })
              }
              className={fieldControlClass}
            >
              {DEPARTURE_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </Field>
        </FormSection>

        <FormSection title="Notes">
          <Field>
            <FieldLabel htmlFor="publicNotes">Public Notes</FieldLabel>
            <textarea
              id="publicNotes"
              value={formData.publicNotes}
              onChange={(e) =>
                setFormData({ ...formData, publicNotes: e.target.value })
              }
              rows={2}
              placeholder="Shown on website…"
              className={`${fieldControlClass} resize-none`}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="internalNotes">Internal Notes</FieldLabel>
            <textarea
              id="internalNotes"
              value={formData.internalNotes}
              onChange={(e) =>
                setFormData({ ...formData, internalNotes: e.target.value })
              }
              rows={3}
              placeholder="Private notes for admin…"
              className={`${fieldControlClass} resize-none`}
            />
          </Field>
        </FormSection>

        <div className="flex justify-end gap-4 mt-6">
          <Link
            href="/admin/departures"
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {loading
              ? "Saving…"
              : mode === "create"
                ? "Create Departure"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
