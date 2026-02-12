"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, X, Pencil } from "lucide-react";
// Common dial codes for phone prefix dropdown
const DIAL_CODES = [
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "CH", dialCode: "+41", name: "Switzerland" },
  { code: "TZ", dialCode: "+255", name: "Tanzania" },
  { code: "KE", dialCode: "+254", name: "Kenya" },
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "CN", dialCode: "+86", name: "China" },
  { code: "JP", dialCode: "+81", name: "Japan" },
  { code: "BR", dialCode: "+55", name: "Brazil" },
  { code: "MX", dialCode: "+52", name: "Mexico" },
];

// Countries for nationality dropdown
const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Canada",
  "Australia", "Netherlands", "Italy", "Spain", "Switzerland",
  "Belgium", "Austria", "Sweden", "Norway", "Denmark", "Ireland",
  "New Zealand", "South Africa", "Japan", "Singapore", "India",
  "China", "Brazil", "Mexico", "Argentina", "Tanzania", "Kenya",
];

interface Inquiry {
  id: string;
  type: string;
  fullName: string;
  email: string;
  phone: string | null;
  phonePrefix: string | null;
  nationality: string | null;
  tripType: string | null;
  numAdults: number | null;
  numChildren: number | null;
  arrivalDate: Date | null;
  additionalInfo: string | null;
  relatedTo: string | null;
  referralSource: string | null;
  status: string;
}

interface Props {
  inquiry: Inquiry;
}

export function InquiryEditForm({ inquiry }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone || "",
    phonePrefix: inquiry.phonePrefix || "",
    nationality: inquiry.nationality || "",
    tripType: inquiry.tripType || "",
    numAdults: inquiry.numAdults?.toString() || "",
    numChildren: inquiry.numChildren?.toString() || "",
    arrivalDate: inquiry.arrivalDate
      ? new Date(inquiry.arrivalDate).toISOString().split("T")[0]
      : "",
    additionalInfo: inquiry.additionalInfo || "",
    relatedTo: inquiry.relatedTo || "",
    referralSource: inquiry.referralSource || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update inquiry");
      }

      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
      >
        <Pencil className="w-4 h-4" />
        Edit Inquiry
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">Edit Inquiry</h3>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">
                Contact Information
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Prefix
                  </label>
                  <select
                    name="phonePrefix"
                    value={formData.phonePrefix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {DIAL_CODES.map((c) => (
                      <option key={c.code} value={c.dialCode}>
                        {c.dialCode} ({c.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nationality
                </label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium text-slate-900">Trip Details</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Trip Type
                  </label>
                  <input
                    type="text"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Safari, Kilimanjaro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    name="numAdults"
                    value={formData.numAdults}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    name="numChildren"
                    value={formData.numChildren}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Related To
                </label>
                <input
                  type="text"
                  name="relatedTo"
                  value={formData.relatedTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., specific route or package"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Referral Source
                </label>
                <input
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="How did they find us?"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium text-slate-900">Message</h4>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Additional information or message"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t bg-slate-50">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-400 transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
