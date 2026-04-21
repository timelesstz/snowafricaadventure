"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Field,
  FieldLabel,
  FormGrid,
  FormSection,
  fieldControlClass,
} from "@/components/admin/ui";

const TRIP_TYPES = ["kilimanjaro", "safari", "daytrip", "zanzibar"];
const PARTNER_TYPES = ["DEVELOPER", "MARKETING", "AFFILIATE", "AGENT"];
const PAYOUT_FREQUENCIES = ["WEEKLY", "BIWEEKLY", "MONTHLY", "QUARTERLY"];

interface CommissionRate {
  tripType: string;
  commissionRate: number;
}

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "DEVELOPER",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    agreementDate: "",
    agreementExpiry: "",
    payoutFrequency: "MONTHLY",
    payoutMethod: "",
    notes: "",
  });

  const [commissionRates, setCommissionRates] = useState<CommissionRate[]>([
    { tripType: "kilimanjaro", commissionRate: 15 },
    { tripType: "safari", commissionRate: 12 },
    { tripType: "daytrip", commissionRate: 10 },
    { tripType: "zanzibar", commissionRate: 12 },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          commissionRates: commissionRates.filter((r) => r.commissionRate > 0),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create partner");
      }

      toast.success("Partner created");
      router.push("/admin/partners");
      router.refresh();
    } catch {
      const message = "Failed to create partner. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateRate = (index: number, value: number) => {
    const updated = [...commissionRates];
    updated[index].commissionRate = value;
    setCommissionRates(updated);
  };

  const addRate = () => {
    const availableTypes = TRIP_TYPES.filter(
      (t) => !commissionRates.find((r) => r.tripType === t)
    );
    if (availableTypes.length > 0) {
      setCommissionRates([
        ...commissionRates,
        { tripType: availableTypes[0], commissionRate: 10 },
      ]);
    }
  };

  const removeRate = (index: number) => {
    setCommissionRates(commissionRates.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/partners"
          aria-label="Back to partners"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </Link>
        <div>
          <h1 className="text-h1">Add Partner</h1>
          <p className="text-body text-slate-600 mt-1">
            Create a new partner agreement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}

        <FormSection title="Basic Information">
          <Field>
            <FieldLabel htmlFor="name" required>
              Partner Name
            </FieldLabel>
            <input
              id="name"
              type="text"
              aria-label="Partner name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Partner company name"
              className={fieldControlClass}
            />
          </Field>
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="type" required>
                Partner Type
              </FieldLabel>
              <select
                id="type"
                aria-label="Partner type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className={fieldControlClass}
              >
                {PARTNER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="payoutFrequency">Payout Frequency</FieldLabel>
              <select
                id="payoutFrequency"
                aria-label="Payout frequency"
                value={formData.payoutFrequency}
                onChange={(e) =>
                  setFormData({ ...formData, payoutFrequency: e.target.value })
                }
                className={fieldControlClass}
              >
                {PAYOUT_FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Contact Information">
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="contactName">Contact Name</FieldLabel>
              <input
                id="contactName"
                type="text"
                aria-label="Contact name"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="Primary contact"
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactEmail">Contact Email</FieldLabel>
              <input
                id="contactEmail"
                type="email"
                aria-label="Contact email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                placeholder="email@example.com"
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactPhone">Contact Phone</FieldLabel>
              <input
                id="contactPhone"
                type="text"
                aria-label="Contact phone"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                placeholder="+255 ..."
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="payoutMethod">Payout Method</FieldLabel>
              <input
                id="payoutMethod"
                type="text"
                aria-label="Payout method"
                value={formData.payoutMethod}
                onChange={(e) =>
                  setFormData({ ...formData, payoutMethod: e.target.value })
                }
                placeholder="Bank transfer, M-Pesa, etc."
                className={fieldControlClass}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Agreement Dates">
          <FormGrid cols={2}>
            <Field>
              <FieldLabel htmlFor="agreementDate">Agreement Start Date</FieldLabel>
              <input
                id="agreementDate"
                type="date"
                aria-label="Agreement start date"
                value={formData.agreementDate}
                onChange={(e) =>
                  setFormData({ ...formData, agreementDate: e.target.value })
                }
                className={fieldControlClass}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="agreementExpiry">Agreement Expiry</FieldLabel>
              <input
                id="agreementExpiry"
                type="date"
                aria-label="Agreement expiry"
                value={formData.agreementExpiry}
                onChange={(e) =>
                  setFormData({ ...formData, agreementExpiry: e.target.value })
                }
                className={fieldControlClass}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3">Commission Rates</h2>
            {commissionRates.length < TRIP_TYPES.length && (
              <button
                type="button"
                onClick={addRate}
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Add Rate
              </button>
            )}
          </div>
          <div className="space-y-3">
            {commissionRates.map((rate, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  aria-label={`Trip type for rate ${index + 1}`}
                  value={rate.tripType}
                  onChange={(e) => {
                    const updated = [...commissionRates];
                    updated[index].tripType = e.target.value;
                    setCommissionRates(updated);
                  }}
                  className={`flex-1 ${fieldControlClass}`}
                >
                  {TRIP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    aria-label={`Commission rate for ${rate.tripType}`}
                    value={rate.commissionRate}
                    onChange={(e) => updateRate(index, Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.5"
                    className={`w-24 ${fieldControlClass}`}
                  />
                  <span className="text-slate-600">%</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeRate(index)}
                  aria-label={`Remove ${rate.tripType} rate`}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <FormSection title="Notes">
          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <textarea
              id="notes"
              aria-label="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              placeholder="Additional notes about this partnership…"
              className={`${fieldControlClass} resize-none`}
            />
          </Field>
        </FormSection>

        <div className="flex justify-end gap-4 mt-6">
          <Link
            href="/admin/partners"
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            {loading ? "Creating…" : "Create Partner"}
          </button>
        </div>
      </form>
    </div>
  );
}
