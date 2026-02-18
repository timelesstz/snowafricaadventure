"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Search, ChevronDown } from "lucide-react";
import { PHONE_PREFIXES } from "@/lib/constants";
import { trackFormStart, trackFormStep, trackFormSubmit } from "@/lib/analytics";

// ISO 3166-1 Country list with codes for flags
const COUNTRIES = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo (Congo-Brazzaville)", code: "CG" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czechia", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "DR Congo", code: "CD" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Ivory Coast", code: "CI" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Korea", code: "KP" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Vatican City", code: "VA" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
] as const;

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface SafariInquiryFormProps {
  safariSlug?: string;
  safariTitle?: string;
  variant?: "card" | "inline";
}

export function SafariInquiryForm({
  safariSlug,
  safariTitle,
  variant = "card",
}: SafariInquiryFormProps) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    phonePrefix: "+1",
    numPax: "2",
    country: "",
    countryCode: "",
    specialInterest: "",
  });

  // Country search state
  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Track form start
  const formStartTracked = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track form start on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackFormStart({
          formName: "safari_inquiry_form",
          formId: safariSlug || "general",
          formLocation: safariSlug || "safari-page",
        });
      }
    };

    const form = document.querySelector(`[data-form-id="safari-inquiry-${safariSlug || 'general'}"]`);
    if (form) {
      form.addEventListener("focusin", handleFirstInteraction, { once: true });
    }

    return () => {
      form?.removeEventListener("focusin", handleFirstInteraction);
    };
  }, [safariSlug]);

  const handleCountrySelect = (country: { name: string; code: string }) => {
    setFormData((prev) => ({ ...prev, country: country.name, countryCode: country.code }));
    setCountrySearch("");
    setIsCountryDropdownOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStage1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track step completion
    trackFormStep({
      formName: "safari_inquiry_form",
      stepNumber: 1,
      stepName: "contact_info",
      formId: safariSlug || "general",
    });
    setStage(2);
  };

  const handleStage2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          relatedTo: safariSlug,
          type: "Wildlife Safari",
        }),
      });

      if (response.ok) {
        // Track successful form submission
        trackFormSubmit({
          formName: "safari_inquiry_form",
          formId: safariSlug || "general",
          tripType: "Wildlife Safari",
          numTravelers: parseInt(formData.numPax) || 1,
          relatedItem: safariSlug,
        });
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-2">
          Thank You!
        </h3>
        <p className="text-[var(--text-muted)]">
          We&apos;ve received your inquiry and will send your custom quote within 24
          hours.
        </p>
      </div>
    );
  }

  const isCard = variant === "card";

  return (
    <div className={isCard ? "" : "bg-white p-6 rounded-lg"} data-form-id={`safari-inquiry-${safariSlug || 'general'}`}>
      {/* Stage 1: Contact Info */}
      {stage === 1 && (
        <form onSubmit={handleStage1Submit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-[var(--secondary)]" />
            <h3 className="font-heading font-bold text-lg text-[var(--text)]">
              Get Your Custom Quote
            </h3>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label
              htmlFor="phone"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Phone / WhatsApp Number
            </label>
            <div className="flex gap-2">
              <select
                name="phonePrefix"
                value={formData.phonePrefix}
                onChange={handleChange}
                className="w-24 px-2 py-3 border border-[var(--border)] rounded-sm font-sans text-[14px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              >
                {PHONE_PREFIXES.map((prefix) => (
                  <option key={prefix.code} value={prefix.code}>
                    {prefix.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
                placeholder="123 456 7890"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all mt-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Stage 2: Trip Details */}
      {stage === 2 && (
        <form onSubmit={handleStage2Submit} className="space-y-4">
          {/* Header with Back */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setStage(1)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-[13px] text-[var(--text-muted)]">Step 2 of 2</span>
          </div>

          {/* Number of Pax + Country (25% / 75%) */}
          <div className="flex gap-3">
            {/* Number of Pax - 25% */}
            <div className="w-1/4">
              <label
                htmlFor="numPax"
                className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
              >
                Travelers *
              </label>
              <select
                id="numPax"
                name="numPax"
                required
                value={formData.numPax}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] bg-white focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </div>

            {/* Country - 75% with searchable dropdown */}
            <div className="w-3/4 relative" ref={countryDropdownRef}>
              <label
                htmlFor="countrySearch"
                className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
              >
                Where are you from? *
              </label>
              <div className="relative">
                <div
                  className={`w-full px-4 py-3 border rounded-sm font-sans text-[15px] bg-white cursor-pointer flex items-center justify-between transition-all ${
                    isCountryDropdownOpen
                      ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]/15"
                      : "border-[var(--border)]"
                  }`}
                  onClick={() => {
                    setIsCountryDropdownOpen(true);
                    setTimeout(() => countryInputRef.current?.focus(), 0);
                  }}
                >
                  {formData.country ? (
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{getFlagEmoji(formData.countryCode)}</span>
                      <span className="text-[var(--text)]">{formData.country}</span>
                    </span>
                  ) : (
                    <span className="text-[var(--text-light)]">Select country</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Dropdown */}
                {isCountryDropdownOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] rounded-sm shadow-lg max-h-[280px] overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-[var(--border)] sticky top-0 bg-white">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                        <input
                          ref={countryInputRef}
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search countries..."
                          className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-sm text-[14px] focus:outline-none focus:border-[var(--secondary)]"
                        />
                      </div>
                    </div>

                    {/* Country list */}
                    <div className="overflow-y-auto max-h-[220px]">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[var(--surface)] transition-colors text-left ${
                              formData.country === country.name ? "bg-[var(--surface)]" : ""
                            }`}
                          >
                            <span className="text-lg">{getFlagEmoji(country.code)}</span>
                            <span className="text-[14px] text-[var(--text)]">{country.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-[14px] text-[var(--text-muted)]">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Hidden input for form validation */}
              <input
                type="hidden"
                name="country"
                value={formData.country}
                required
              />
            </div>
          </div>

          {/* Special Interest */}
          <div>
            <label
              htmlFor="specialInterest"
              className="block font-heading text-[13px] font-semibold text-[var(--text)] mb-1"
            >
              Special Interests
            </label>
            <textarea
              id="specialInterest"
              name="specialInterest"
              rows={3}
              value={formData.specialInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-sm font-sans text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/15 transition-all resize-none"
              placeholder="E.g., Big Five, Great Migration, bird watching, photography..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "Sending..." : "Request Quote"}
          </button>
        </form>
      )}
    </div>
  );
}
