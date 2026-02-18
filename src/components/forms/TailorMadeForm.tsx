"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  PHONE_PREFIXES,
  SAFARI_DESTINATIONS,
  BUDGET_LEVELS,
  ACCOMMODATION_TYPES,
  SAFARI_INTERESTS,
  DATE_FLEXIBILITY,
  SAFARI_EXPERIENCE,
} from "@/lib/constants";
import { COUNTRIES, REFERRAL_SOURCES } from "@/lib/countries";
import { PostSubmissionShare } from "@/components/social/ShareButtons";
import { trackFormStart, trackFormStep, trackFormSubmit } from "@/lib/analytics";
import {
  MapPin,
  Users,
  Calendar,
  Wallet,
  Home,
  Star,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  MessageSquare,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "About You", icon: User },
  { id: 2, title: "Group Size", icon: Users },
  { id: 3, title: "Travel Dates", icon: Calendar },
  { id: 4, title: "Destinations", icon: MapPin },
  { id: 5, title: "Budget & Style", icon: Wallet },
  { id: 6, title: "Interests", icon: Sparkles },
  { id: 7, title: "Final Details", icon: MessageSquare },
];

export function TailorMadeForm() {
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
    childrenAges: [] as string[],
    arrivalDate: "",
    duration: "",
    flexibility: "flexible",
    budget: "",
    accommodation: "",
    experience: "",
    additionalInfo: "",
    referralSource: "",
    referralOther: "",
  });

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const formStartTracked = useRef(false);

  // Track form start on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackFormStart({
          formName: "tailor_made_safari_form",
          formId: "tailor-made",
          formLocation: "tailor-made-safari-page",
        });
      }
    };

    const form = document.querySelector('[data-form-id="tailor-made-safari"]');
    if (form) {
      form.addEventListener("focusin", handleFirstInteraction, { once: true });
    }

    return () => {
      form?.removeEventListener("focusin", handleFirstInteraction);
    };
  }, []);

  const updateFormData = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDestination = (value: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(value)
        ? prev.filter((d) => d !== value)
        : [...prev, value]
    );
  };

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const handleChildrenChange = (count: number) => {
    updateFormData("numChildren", count);
    setFormData((prev) => {
      const newAges = [...prev.childrenAges];
      if (count > newAges.length) {
        return { ...prev, numChildren: count, childrenAges: [...newAges, ...Array(count - newAges.length).fill("")] };
      }
      return { ...prev, numChildren: count, childrenAges: newAges.slice(0, count) };
    });
  };

  const updateChildAge = (index: number, age: string) => {
    setFormData((prev) => {
      const newAges = [...prev.childrenAges];
      newAges[index] = age;
      return { ...prev, childrenAges: newAges };
    });
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
        return true; // Destinations are optional
      case 5:
        return !!formData.budget;
      case 6:
        return true; // Interests are optional
      case 7:
        return true; // Additional info is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length) {
      // Track step completion
      trackFormStep({
        formName: "tailor_made_safari_form",
        stepNumber: currentStep,
        stepName: STEPS[currentStep - 1]?.title.toLowerCase().replace(" ", "_"),
        formId: "tailor-made",
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

    try {
      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referralSource,
          destinations: selectedDestinations.join(","),
          interests: selectedInterests.join(","),
          childrenAges: formData.childrenAges.filter((a) => a).join(","),
          relatedTo: "Tailor-Made Safari",
          type: "tailor-made",
          tripType: "Customized",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Log email delivery status for debugging
        if (result.emailStatus) {
          console.log("[TailorMadeForm] Email status:", JSON.stringify(result.emailStatus));
          if (result.emailStatus.error) {
            console.warn("[TailorMadeForm] Email delivery issue:", result.emailStatus.error);
          }
        }
        // Track successful form submission
        trackFormSubmit({
          formName: "tailor_made_safari_form",
          formId: "tailor-made",
          tripType: "Tailor-Made Safari",
          numTravelers: formData.numAdults + formData.numChildren,
          relatedItem: selectedDestinations.join(", ") || "Custom Safari",
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
  }, [formData, selectedDestinations, selectedInterests, currentStep]);

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-2">
          We&apos;ve received your custom safari request and our team is already
          working on your personalized itinerary.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Expect a detailed proposal within 24-48 hours.
        </p>
        <div className="pt-6 border-t border-green-200">
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
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20"
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
                    isActive ? "text-[var(--primary)]" : "text-slate-400"
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
            className="h-full bg-green-500 transition-all duration-300"
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
      <div className="min-h-[300px]">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--primary)]" />
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
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
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
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="123 456 7890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Group Size */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--primary)]" />
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
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Children (under 16)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.numChildren}
                  onChange={(e) => handleChildrenChange(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            {formData.numChildren > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Children&apos;s Ages
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Array.from({ length: formData.numChildren }).map((_, i) => (
                    <input
                      key={i}
                      type="number"
                      min="0"
                      max="15"
                      placeholder={`Child ${i + 1}`}
                      value={formData.childrenAges[i] || ""}
                      onChange={(e) => updateChildAge(i, e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Ages help us recommend suitable activities
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Travel Dates */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--primary)]" />
              When do you want to travel?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => updateFormData("arrivalDate", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days (1 Week)</option>
                  <option value="10">10 Days</option>
                  <option value="14">14 Days (2 Weeks)</option>
                  <option value="custom">Custom / Not Sure</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date Flexibility
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DATE_FLEXIBILITY.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.flexibility === option.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-slate-300 hover:border-[var(--primary)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="flexibility"
                      value={option.value}
                      checked={formData.flexibility === option.value}
                      onChange={(e) => updateFormData("flexibility", e.target.value)}
                      className="absolute top-3 right-3 w-4 h-4"
                    />
                    <span className="font-medium text-slate-900">{option.label}</span>
                    <span className="text-xs text-slate-500 mt-1">{option.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Destinations */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
              Where would you like to go?
            </h3>
            <p className="text-sm text-slate-500">
              Select all parks you&apos;d like to visit (or leave blank for recommendations)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SAFARI_DESTINATIONS.map((dest) => (
                <button
                  key={dest.value}
                  type="button"
                  onClick={() => toggleDestination(dest.value)}
                  className={`px-3 py-2.5 text-sm rounded-lg border transition-all text-left ${
                    selectedDestinations.includes(dest.value)
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-slate-700 border-slate-300 hover:border-[var(--primary)]"
                  }`}
                >
                  {dest.label}
                </button>
              ))}
            </div>
            {selectedDestinations.length > 0 && (
              <p className="text-sm text-green-600">
                ✓ {selectedDestinations.length} destination{selectedDestinations.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        )}

        {/* Step 5: Budget & Accommodation */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-[var(--primary)]" />
                What&apos;s your budget level? <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUDGET_LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.budget === level.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]"
                        : "border-slate-300 hover:border-[var(--primary)]"
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

            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-[var(--primary)]" />
                Preferred accommodation style
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACCOMMODATION_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.accommodation === type.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-slate-300 hover:border-[var(--primary)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="accommodation"
                      value={type.value}
                      checked={formData.accommodation === type.value}
                      onChange={(e) => updateFormData("accommodation", e.target.value)}
                      className="absolute top-3 right-3 w-4 h-4"
                    />
                    <span className="font-medium text-slate-900">{type.label}</span>
                    <span className="text-xs text-slate-500">{type.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Interests & Experience */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                What interests you most?
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Select all that apply
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAFARI_INTERESTS.map((interest) => (
                  <button
                    key={interest.value}
                    type="button"
                    onClick={() => toggleInterest(interest.value)}
                    className={`px-3 py-2.5 text-sm rounded-lg border transition-all ${
                      selectedInterests.includes(interest.value)
                        ? "bg-[var(--secondary)] text-[var(--primary-dark)] border-[var(--secondary)]"
                        : "bg-white text-slate-700 border-slate-300 hover:border-[var(--secondary)]"
                    }`}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[var(--primary)]" />
                Safari experience level
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAFARI_EXPERIENCE.map((exp) => (
                  <label
                    key={exp.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.experience === exp.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-slate-300 hover:border-[var(--primary)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={exp.value}
                      checked={formData.experience === exp.value}
                      onChange={(e) => updateFormData("experience", e.target.value)}
                      className="absolute top-3 right-3 w-4 h-4"
                    />
                    <span className="font-medium text-slate-900">{exp.label}</span>
                    <span className="text-xs text-slate-500 mt-1">{exp.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Final Details */}
        {currentStep === 7 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
              Anything else we should know?
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tell us more about your dream safari
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                placeholder="Special occasions, specific wildlife, dietary requirements, accessibility needs..."
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
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-sm text-slate-700 mb-2">Your Safari Summary</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>👤 {formData.numAdults} adult{formData.numAdults > 1 ? "s" : ""}{formData.numChildren > 0 ? `, ${formData.numChildren} child${formData.numChildren > 1 ? "ren" : ""}` : ""}</li>
                <li>📅 Starting {formData.arrivalDate || "TBD"}{formData.duration ? ` • ${formData.duration} days` : ""}</li>
                <li>💰 {BUDGET_LEVELS.find(b => b.value === formData.budget)?.label || "Budget TBD"}</li>
                {selectedDestinations.length > 0 && (
                  <li>📍 {selectedDestinations.length} destination{selectedDestinations.length > 1 ? "s" : ""}</li>
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
          <Button type="button" variant="secondary" onClick={nextStep}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[180px]"
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
              "Get My Safari Proposal"
            )}
          </Button>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center">
        We&apos;ll send you a personalized itinerary within 24-48 hours.
      </p>
    </div>
  );
}
