"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  Field,
  FieldLabel,
  FieldError,
  FormGrid,
  FormSection,
  fieldControlClass,
} from "../ui";

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

      toast.success("Inquiry updated");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <Pencil className="w-4 h-4" aria-hidden="true" />
        Edit Inquiry
      </button>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Inquiry"
        className="!max-w-2xl w-full"
      >
        <form onSubmit={handleSubmit} className="-m-2">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto p-2">
            {error && (
              <div
                role="alert"
                className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </div>
            )}

            <FormSection title="Contact information">
              <FormGrid cols={2}>
                <Field>
                  <FieldLabel htmlFor="fullName" required>
                    Full Name
                  </FieldLabel>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={fieldControlClass}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email" required>
                    Email
                  </FieldLabel>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={fieldControlClass}
                  />
                </Field>
              </FormGrid>

              <FormGrid cols={3}>
                <Field>
                  <FieldLabel htmlFor="phonePrefix">Phone Prefix</FieldLabel>
                  <select
                    id="phonePrefix"
                    name="phonePrefix"
                    value={formData.phonePrefix}
                    onChange={handleChange}
                    className={fieldControlClass}
                  >
                    <option value="">Select</option>
                    {DIAL_CODES.map((c) => (
                      <option key={c.code} value={c.dialCode}>
                        {c.dialCode} ({c.name})
                      </option>
                    ))}
                  </select>
                </Field>
                <Field className="md:col-span-2">
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={fieldControlClass}
                  />
                </Field>
              </FormGrid>

              <Field>
                <FieldLabel htmlFor="nationality">Nationality</FieldLabel>
                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={fieldControlClass}
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </Field>
            </FormSection>

            <FormSection title="Trip details">
              <FormGrid cols={2}>
                <Field>
                  <FieldLabel htmlFor="tripType">Trip Type</FieldLabel>
                  <input
                    id="tripType"
                    type="text"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    placeholder="e.g., Safari, Kilimanjaro"
                    className={fieldControlClass}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="arrivalDate">Preferred Date</FieldLabel>
                  <input
                    id="arrivalDate"
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className={fieldControlClass}
                  />
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field>
                  <FieldLabel htmlFor="numAdults">Number of Adults</FieldLabel>
                  <input
                    id="numAdults"
                    type="number"
                    name="numAdults"
                    value={formData.numAdults}
                    onChange={handleChange}
                    min="0"
                    className={fieldControlClass}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="numChildren">Number of Children</FieldLabel>
                  <input
                    id="numChildren"
                    type="number"
                    name="numChildren"
                    value={formData.numChildren}
                    onChange={handleChange}
                    min="0"
                    className={fieldControlClass}
                  />
                </Field>
              </FormGrid>

              <Field>
                <FieldLabel htmlFor="relatedTo">Related To</FieldLabel>
                <input
                  id="relatedTo"
                  type="text"
                  name="relatedTo"
                  value={formData.relatedTo}
                  onChange={handleChange}
                  placeholder="e.g., specific route or package"
                  className={fieldControlClass}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="referralSource">Referral Source</FieldLabel>
                <input
                  id="referralSource"
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  placeholder="How did they find us?"
                  className={fieldControlClass}
                />
              </Field>
            </FormSection>

            <FormSection title="Message">
              <Field>
                <FieldLabel htmlFor="additionalInfo">Additional info</FieldLabel>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Additional information or message"
                  className={fieldControlClass}
                />
                <FieldError />
              </Field>
            </FormSection>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-400 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="w-4 h-4" aria-hidden="true" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
