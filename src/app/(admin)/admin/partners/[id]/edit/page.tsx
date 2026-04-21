"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, FileText, X } from "lucide-react";
import MediaUploader from "@/components/admin/MediaUploader";
import { toast } from "sonner";
import {
  Field,
  FieldLabel,
  FieldHelp,
  FormGrid,
  FormSection,
  ConfirmDialog,
  fieldControlClass,
} from "@/components/admin/ui";

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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
          payoutDetails: data.payoutDetails
            ? JSON.stringify(data.payoutDetails, null, 2)
            : "",
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
      let payoutDetails = null;
      if (formData.payoutDetails) {
        try {
          payoutDetails = JSON.parse(formData.payoutDetails);
        } catch {
          const msg = "Invalid JSON format in Payout Details";
          setError(msg);
          toast.error(msg);
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

      toast.success("Partner updated");
      router.push(`/admin/partners/${id}`);
      router.refresh();
    } catch {
      const msg = "Failed to update partner. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setConfirmDeleteOpen(false);
    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete partner");

      toast.success("Partner deleted");
      router.push("/admin/partners");
      router.refresh();
    } catch {
      const msg = "Failed to delete partner";
      setError(msg);
      toast.error(msg);
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
        <h2 className="text-h2">Partner not found</h2>
        <Link href="/admin/partners" className="text-amber-600 hover:underline">
          Back to Partners
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/partners/${id}`}
            aria-label="Back to partner"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-h1">Edit Partner</h1>
            <p className="text-body text-slate-600 mt-1">{partner.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setConfirmDeleteOpen(true)}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Delete Partner
        </button>
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete partner"
        description="Are you sure you want to delete this partner? This action cannot be undone."
        confirmLabel="Delete"
        tone="danger"
      />

      <form onSubmit={handleSubmit}>
        {error && (
          <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}

        <FormSection
          title="Status"
          description="Inactive partners won't receive new commissions"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              aria-label="Partner active"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
            <span className="ml-3 text-sm text-slate-700">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </label>
        </FormSection>

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
                placeholder="e.g., Bank Transfer, PayPal"
                className={fieldControlClass}
              />
            </Field>
          </FormGrid>
          <Field>
            <FieldLabel htmlFor="payoutDetails">Pesapal Payout Details</FieldLabel>
            <textarea
              id="payoutDetails"
              aria-label="Pesapal payout details"
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
              className={`${fieldControlClass} font-mono text-sm`}
            />
            <FieldHelp>
              Pesapal payout configuration (merchant ID, bank details, or mobile
              money)
            </FieldHelp>
          </Field>
        </FormSection>

        <FormSection title="Agreement Details">
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
          <Field>
            <FieldLabel htmlFor="agreementDocument">
              Digital E-Agreement
            </FieldLabel>
            {formData.agreementDocument ? (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <FileText className="w-8 h-8 text-amber-600" aria-hidden="true" />
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
                  aria-label="Remove agreement document"
                  onClick={() =>
                    setFormData({ ...formData, agreementDocument: "" })
                  }
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
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
          </Field>
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
                  aria-label={`Remove ${rate.tripType} rate`}
                  onClick={() => removeRate(index)}
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
              className={`${fieldControlClass} resize-none`}
            />
          </Field>
        </FormSection>

        <div className="flex justify-end gap-4 mt-6">
          <Link
            href={`/admin/partners/${id}`}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
