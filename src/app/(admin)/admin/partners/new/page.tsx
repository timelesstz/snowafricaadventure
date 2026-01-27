"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

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

      router.push("/admin/partners");
      router.refresh();
    } catch {
      setError("Failed to create partner. Please try again.");
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/partners"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Partner</h1>
          <p className="text-slate-600 mt-1">
            Create a new partner agreement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Partner Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Partner company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Partner Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {PARTNER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Payout Frequency
              </label>
              <select
                value={formData.payoutFrequency}
                onChange={(e) =>
                  setFormData({ ...formData, payoutFrequency: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {PAYOUT_FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Contact Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Primary contact"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="+255 ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Payout Method
              </label>
              <input
                type="text"
                value={formData.payoutMethod}
                onChange={(e) =>
                  setFormData({ ...formData, payoutMethod: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Bank transfer, M-Pesa, etc."
              />
            </div>
          </div>
        </div>

        {/* Agreement Dates */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Agreement Dates
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Agreement Start Date
              </label>
              <input
                type="date"
                value={formData.agreementDate}
                onChange={(e) =>
                  setFormData({ ...formData, agreementDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Agreement Expiry
              </label>
              <input
                type="date"
                value={formData.agreementExpiry}
                onChange={(e) =>
                  setFormData({ ...formData, agreementExpiry: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Commission Rates */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Commission Rates
            </h2>
            {commissionRates.length < TRIP_TYPES.length && (
              <button
                type="button"
                onClick={addRate}
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
              >
                <Plus className="w-4 h-4" />
                Add Rate
              </button>
            )}
          </div>

          <div className="space-y-3">
            {commissionRates.map((rate, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  value={rate.tripType}
                  onChange={(e) => {
                    const updated = [...commissionRates];
                    updated[index].tripType = e.target.value;
                    setCommissionRates(updated);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
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
                    value={rate.commissionRate}
                    onChange={(e) => updateRate(index, Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.5"
                    className="w-24 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <span className="text-slate-600">%</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeRate(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
            placeholder="Additional notes about this partnership..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/partners"
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Partner"}
          </button>
        </div>
      </form>
    </div>
  );
}
