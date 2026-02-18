"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  PHONE_PREFIXES,
  BUDGET_LEVELS,
  ZANZIBAR_BEACHES,
  ZANZIBAR_ACTIVITIES,
  ZANZIBAR_DURATIONS,
} from "@/lib/constants";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/countries";
import { PostSubmissionShare } from "@/components/social/ShareButtons";
import { trackFormStart, trackFormStep, trackFormSubmit } from "@/lib/analytics";
import {
  Users,
  Calendar,
  Wallet,
  MapPin,
  Waves,
  CheckCircle2,
  Palmtree,
  ChevronRight,
  ChevronLeft,
  User,
  MessageSquare,
  Compass,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "About You", icon: User },
  { id: 2, title: "Travelers", icon: Users },
  { id: 3, title: "Dates", icon: Calendar },
  { id: 4, title: "Beach Area", icon: Palmtree },
  { id: 5, title: "Activities", icon: Waves },
  { id: 6, title: "Final Details", icon: MessageSquare },
];

export function ZanzibarInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    phonePrefix: "+1",
    phone: "",
    numAdults: 2,
    numChildren: 0,
    arrivalDate: "",
    duration: "",
    beachArea: "",
    budget: "",
    combineWithSafari: "",
    additionalInfo: "",
    referralSource: "",
    referralOther: "",
  });

  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const formStartTracked = useRef(false);

  // Track form start on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackFormStart({
          formName: "zanzibar_inquiry_form",
          formId: "zanzibar",
          formLocation: "zanzibar-page",
        });
      }
    };

    const form = document.querySelector('[data-form-id="zanzibar-inquiry"]');
    if (form) {
      form.addEventListener("focusin", handleFirstInteraction, { once: true });
    }

    return () => {
      form?.removeEventListener("focusin", handleFirstInteraction);
    };
  }, []);

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.country);
      case 2:
        return formData.numAdults >= 1;
      case 3:
        return !!formData.arrivalDate;
      case 4:
        return true; // Beach area optional
      case 5:
        return true; // Activities optional
      case 6:
        return true; // Final details optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length) {
      // Track step completion
      trackFormStep({
        formName: "zanzibar_inquiry_form",
        stepNumber: currentStep,
        stepName: STEPS[currentStep - 1]?.title.toLowerCase().replace(" ", "_"),
        formId: "zanzibar",
      });
      setCurrentStep(currentStep + 1);
      setError(null);
    } else if (!validateStep(currentStep)) {
      setError("Please fill in all required fields before continuing.");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let referralSource = formData.referralSource;
    if (referralSource === "other" && formData.referralOther) {
      referralSource = `Other: ${formData.referralOther}`;
    }

    // Build structured info
    const structuredInfo = [];
    if (formData.beachArea) {
      const beach = ZANZIBAR_BEACHES.find((b) => b.value === formData.beachArea);
      structuredInfo.push(`Beach preference: ${beach?.label || formData.beachArea}`);
    }
    if (selectedActivities.length > 0) {
      const activityLabels = selectedActivities.map((a) => {
        const activity = ZANZIBAR_ACTIVITIES.find((act) => act.value === a);
        return activity?.label || a;
      });
      structuredInfo.push(`Activities: ${activityLabels.join(", ")}`);
    }
    if (formData.combineWithSafari) {
      structuredInfo.push(`Combine with safari: ${formData.combineWithSafari}`);
    }
    if (formData.additionalInfo) {
      structuredInfo.push(`Notes: ${formData.additionalInfo}`);
    }

    try {
      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referralSource,
          interests: selectedActivities.join(","),
          destinations: formData.beachArea,
          duration: formData.duration !== "custom" ? parseInt(formData.duration) : null,
          additionalInfo: structuredInfo.join("\n\n"),
          relatedTo: "Zanzibar Beach Holiday",
          type: "zanzibar",
          tripType: formData.combineWithSafari === "yes" ? "Wildlife Safari + Zanzibar Beach" : "Zanzibar Beach",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Log email delivery status for debugging
        if (result.emailStatus) {
          console.log("[ZanzibarForm] Email status:", JSON.stringify(result.emailStatus));
          if (result.emailStatus.error) {
            console.warn("[ZanzibarForm] Email delivery issue:", result.emailStatus.error);
          }
        }
        // Track successful form submission
        trackFormSubmit({
          formName: "zanzibar_inquiry_form",
          formId: "zanzibar",
          tripType: formData.combineWithSafari === "yes" ? "Wildlife Safari + Zanzibar Beach" : "Zanzibar Beach",
          numTravelers: formData.numAdults + formData.numChildren,
          relatedItem: formData.beachArea || "Zanzibar Holiday",
        });
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedActivities, currentStep]);

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-2">
          We&apos;ve received your Zanzibar getaway request. Our beach holiday
          experts are already working on the perfect package for you.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Expect a detailed proposal within 24 hours.
        </p>
        <div className="pt-6 border-t border-cyan-200">
          <PostSubmissionShare />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center relative z-10 ${
                  index < STEPS.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-cyan-500 text-white"
                      : isActive
                      ? "bg-cyan-600 text-white ring-4 ring-cyan-600/20"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium hidden sm:block ${
                    isActive ? "text-cyan-600" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-0">
          <div
            className="h-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Counter */}
      <div className="text-center">
        <span className="text-sm text-slate-500">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-[280px]">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-600" />
              Tell us about yourself
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => updateFormData("country", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.slice(0, 20).map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                  <option disabled>──────────────</option>
                  {COUNTRIES.slice(20).map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone / WhatsApp
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.phonePrefix}
                    onChange={(e) => updateFormData("phonePrefix", e.target.value)}
                    className="w-[100px] px-2 py-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    {PHONE_PREFIXES.map((prefix) => (
                      <option key={prefix.code} value={prefix.code}>
                        {prefix.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="123 456 7890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Travelers */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-600" />
              How many travelers?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Adults <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.numAdults}
                  onChange={(e) => updateFormData("numAdults", parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Children
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.numChildren}
                  onChange={(e) => updateFormData("numChildren", parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <p className="text-sm text-cyan-800">
                🏖️ Zanzibar is perfect for couples, families, and groups of friends.
                Let us know your group size so we can recommend the best accommodations.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Dates & Duration */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-600" />
              When & how long?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Arrival Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => updateFormData("arrivalDate", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => updateFormData("duration", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="">Select duration</option>
                  {ZANZIBAR_DURATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label} - {d.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Accommodation style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUDGET_LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.budget === level.value
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-slate-300 hover:border-cyan-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={level.value}
                      checked={formData.budget === level.value}
                      onChange={(e) => updateFormData("budget", e.target.value)}
                      className="absolute top-3 right-3 w-4 h-4"
                    />
                    <span className="font-medium text-slate-900">{level.label}</span>
                    <span className="text-xs text-slate-500 mt-1">{level.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Beach Area */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Palmtree className="w-5 h-5 text-cyan-600" />
              Where would you like to stay?
            </h3>
            <p className="text-sm text-slate-500">
              Each beach has its own character - choose what suits you best
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ZANZIBAR_BEACHES.map((beach) => (
                <label
                  key={beach.value}
                  className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.beachArea === beach.value
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500"
                      : "border-slate-300 hover:border-cyan-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="beachArea"
                    value={beach.value}
                    checked={formData.beachArea === beach.value}
                    onChange={(e) => updateFormData("beachArea", e.target.value)}
                    className="absolute top-3 right-3 w-4 h-4"
                  />
                  <span className="font-medium text-slate-900">{beach.label}</span>
                  <span className="text-xs text-slate-500 mt-1">{beach.description}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Activities */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Waves className="w-5 h-5 text-cyan-600" />
              What would you like to do?
            </h3>
            <p className="text-sm text-slate-500">
              Select all activities that interest you
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ZANZIBAR_ACTIVITIES.map((activity) => (
                <button
                  key={activity.value}
                  type="button"
                  onClick={() => toggleActivity(activity.value)}
                  className={`px-3 py-2.5 text-sm rounded-lg border transition-all ${
                    selectedActivities.includes(activity.value)
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white text-slate-700 border-slate-300 hover:border-cyan-500"
                  }`}
                >
                  {activity.label}
                </button>
              ))}
            </div>
            {selectedActivities.length > 0 && (
              <p className="text-sm text-cyan-600">
                ✓ {selectedActivities.length} activit{selectedActivities.length > 1 ? "ies" : "y"} selected
              </p>
            )}

            {/* Safari Combo */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-600" />
                Combine with a Tanzania Safari?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "yes", label: "Yes, please!", desc: "Add a safari to my trip" },
                  { value: "maybe", label: "Maybe", desc: "Tell me about options" },
                  { value: "no", label: "No, just beach", desc: "Zanzibar only" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.combineWithSafari === option.value
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-slate-300 hover:border-cyan-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="combineWithSafari"
                      value={option.value}
                      checked={formData.combineWithSafari === option.value}
                      onChange={(e) => updateFormData("combineWithSafari", e.target.value)}
                      className="absolute top-2 right-2 w-4 h-4"
                    />
                    <span className="font-medium text-slate-900 text-sm">{option.label}</span>
                    <span className="text-xs text-slate-500">{option.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Final Details */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-600" />
              Anything else we should know?
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Special requests or notes
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                placeholder="Special occasions, dietary requirements, accessibility needs, specific hotels..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                How did you hear about us?
              </label>
              <select
                value={formData.referralSource}
                onChange={(e) => updateFormData("referralSource", e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white"
              >
                <option value="">Please select...</option>
                {REFERRAL_SOURCES.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
              {formData.referralSource === "other" && (
                <input
                  type="text"
                  value={formData.referralOther}
                  onChange={(e) => updateFormData("referralOther", e.target.value)}
                  placeholder="Please specify..."
                  className="w-full mt-2 px-4 py-2.5 border border-slate-300 rounded-lg"
                />
              )}
            </div>

            {/* Summary */}
            <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
              <h4 className="font-semibold text-sm text-cyan-800 mb-2">Your Zanzibar Summary</h4>
              <ul className="text-sm text-cyan-700 space-y-1">
                <li>👤 {formData.numAdults} adult{formData.numAdults > 1 ? "s" : ""}{formData.numChildren > 0 ? `, ${formData.numChildren} child${formData.numChildren > 1 ? "ren" : ""}` : ""}</li>
                <li>📅 Arriving {formData.arrivalDate || "TBD"}{formData.duration ? ` • ${formData.duration} nights` : ""}</li>
                {formData.beachArea && (
                  <li>🏖️ {ZANZIBAR_BEACHES.find(b => b.value === formData.beachArea)?.label}</li>
                )}
                {selectedActivities.length > 0 && (
                  <li>🎯 {selectedActivities.length} activit{selectedActivities.length > 1 ? "ies" : "y"} selected</li>
                )}
                {formData.combineWithSafari === "yes" && (
                  <li>🦁 + Safari combo requested</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={currentStep === 1 ? "invisible" : ""}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        {currentStep < STEPS.length ? (
          <Button
            type="button"
            variant="secondary"
            onClick={nextStep}
            className="!bg-cyan-600 hover:!bg-cyan-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[180px] !bg-cyan-600 hover:!bg-cyan-700"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Plan My Getaway"
            )}
          </Button>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center">
        We&apos;ll send you beach holiday options within 24 hours.
      </p>
    </div>
  );
}
