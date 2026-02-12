"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, FileText, X } from "lucide-react";
import MediaUploader from "@/components/admin/MediaUploader";

const TRIP_TYPES = ["kilimanjaro", "safari", "daytrip", "zanzibar"];
const PARTNER_TYPES = ["DEVELOPER", "MARKETING", "AFFILIATE", "AGENT"];
const PAYOUT_FREQUENCIES = ["WEEKLY", "BIWEEKLY", "MONTHLY", "QUARTERLY"];

interface CommissionRate {
  id?: string;
  tripType: string;
  commissionRate: number;
  isActive?: boolean;
}

interface Partner {
  id: string;
  name: string;
  type: string;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  agreementDate: string | null;
  agreementExpiry: string | null;
  agreementDocument: string | null;
  payoutFrequency: string;
  payoutMethod: string | null;
  payoutDetails: Record<string, unknown> | null;
  notes: string | null;
  isActive: boolean;
  commissionRates: CommissionRate[];
}

export default function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [partner, setPartner] = useState<Partner | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "MARKETING",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    agreementDate: "",
    agreementExpiry: "",
    agreementDocument: "",
    payoutFrequency: "MONTHLY",
    payoutMethod: "",
    payoutDetails: "",
    notes: "",
    isActive: true,
  });

  const [commissionRates, setCommissionRates] = useState<CommissionRate[]>([]);

  useEffect(() => {
    async function loadPartner() {
      try {
        const response = await fetch(`/api/admin/partners/${id}`);
        if (!response.ok) throw new Error("Failed to load partner");
        const data = await response.json();
        setPartner(data);
        setFormData({
          name: data.name,
          type: data.type,
          contactName: data.contactName || "",
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          agreementDate: data.agreementDate?.split("T")[0] || "",
          agreementExpiry: data.agreementExpiry?.split("T")[0] || "",
          agreementDocument: data.agreementDocument || "",
          payoutFrequency: data.payoutFrequency,
          payoutMethod: data.payoutMethod || "",
          payoutDetails: data.payoutDetails ? JSON.stringify(data.payoutDetails, null, 2) : "",
          notes: data.notes || "",
          isActive: data.isActive,
        });
        setCommissionRates(
          data.commissionRates.map((r: CommissionRate) => ({
            tripType: r.tripType,
            commissionRate: Number(r.commissionRate),
          }))
        );
      } catch {
        setError("Failed to load partner");
      } finally {
        setLoading(false);
      }
    }
    loadPartner();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Parse payoutDetails JSON if provided
      let payoutDetails = null;
      if (formData.payoutDetails) {
        try {
          payoutDetails = JSON.parse(formData.payoutDetails);
        } catch {
          setError("Invalid JSON format in Payout Details");
          setSaving(false);
          return;
        }
      }

      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          payoutDetails,
          commissionRates: commissionRates.filter((r) => r.commissionRate > 0),
        }),
      });

      if (!response.ok) throw new Error("Failed to update partner");

      router.push(`/admin/partners/${id}`);
      router.refresh();
    } catch {
      setError("Failed to update partner. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this partner? This action cannot be undone.")) return;

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete partner");

      router.push("/admin/partners");
      router.refresh();
    } catch {
      setError("Failed to delete partner");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">
          Partner not found
        </h2>
        <Link href="/admin/partners" className="text-amber-600 hover:underline">
          Back to Partners
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/partners/${id}`}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Partner</h1>
            <p className="text-slate-600 mt-1">{partner.name}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete Partner
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}

        {/* Status Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Status</h2>
              <p className="text-sm text-slate-500">
                Inactive partners won&apos;t receive new commissions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
            </label>
          </div>
        </div>

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
                placeholder="e.g., Bank Transfer, PayPal"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Pesapal Payout Details */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pesapal Payout Details
            </label>
            <textarea
              value={formData.payoutDetails}
              onChange={(e) =>
                setFormData({ ...formData, payoutDetails: e.target.value })
              }
              rows={8}
              placeholder={`{
  "pesapalMerchantId": "",
  "pesapalEmail": "partner@example.com",
  "bankName": "CRDB Bank",
  "accountNumber": "",
  "accountName": "Partner Name",
  "mobileMoneyProvider": "M-Pesa",
  "mobileNumber": "+255..."
}`}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              Pesapal payout configuration (merchant ID, bank details, or mobile money)
            </p>
          </div>
        </div>

        {/* Agreement Dates */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Agreement Details
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

          {/* Digital E-Agreement Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Digital E-Agreement
            </label>
            {formData.agreementDocument ? (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <FileText className="w-8 h-8 text-amber-600" />
                <div className="flex-1 min-w-0">
                  <a
                    href={formData.agreementDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-600 hover:text-amber-700 hover:underline truncate block"
                  >
                    View E-Agreement
                  </a>
                  <p className="text-xs text-slate-500 truncate">
                    {formData.agreementDocument.split("/").pop()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, agreementDocument: "" })
                  }
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <MediaUploader
                folder="partner-agreements"
                onUpload={(media) =>
                  setFormData({ ...formData, agreementDocument: media.url })
                }
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                label="Upload signed e-agreement (PDF, DOC, DOCX, or image)"
                showPreview={false}
              />
            )}
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
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href={`/admin/partners/${id}`}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
