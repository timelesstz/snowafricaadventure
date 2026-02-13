"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Check, Users, Calendar, MapPin, ChevronUp, Info } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { PHONE_PREFIXES } from "@/lib/constants";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { trackFormStart, trackFormStep, trackFormSubmit, trackBeginCheckout, trackPurchase, trackSelectDeparture } from "@/lib/analytics";

interface Departure {
  id: string;
  route: { name: string; slug: string };
  arrivalDate: string;
  endDate: string;
  price: number;
  maxParticipants: number;
  bookedSpots: number;
  availableSpots: number;
  isFullMoon: boolean;
  status: string;
}

interface GroupBookingFormProps {
  departure: Departure | null;
  onClearDeparture: () => void;
}

interface LeadClimberDetail {
  name: string;
  nationality: string;
  dietaryRequirements: string;
  medicalConditions: string;
}

interface OtherClimberPlaceholder {
  name: string;
  email: string;
}

const NATIONALITIES = [
  "American", "Australian", "Austrian", "Belgian", "Brazilian", "British",
  "Canadian", "Chinese", "Colombian", "Czech", "Danish", "Dutch", "Egyptian",
  "Finnish", "French", "German", "Greek", "Hungarian", "Indian", "Indonesian",
  "Irish", "Israeli", "Italian", "Japanese", "Kenyan", "Korean", "Malaysian",
  "Mexican", "New Zealander", "Nigerian", "Norwegian", "Pakistani", "Peruvian",
  "Philippine", "Polish", "Portuguese", "Romanian", "Russian", "Saudi",
  "Singaporean", "South African", "Spanish", "Swedish", "Swiss", "Tanzanian",
  "Thai", "Turkish", "Ukrainian", "Emirati", "Vietnamese", "Other",
];

export function GroupBookingForm({ departure, onClearDeparture }: GroupBookingFormProps) {
  const [stage, setStage] = useState<0 | 1 | 2 | "success">(departure ? 1 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Stage 1 fields
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+1");
  const [leadNationality, setLeadNationality] = useState("");
  const [totalClimbers, setTotalClimbers] = useState(1);

  // Stage 2 fields - Lead climber details
  const [leadClimber, setLeadClimber] = useState<LeadClimberDetail>({
    name: "",
    nationality: "",
    dietaryRequirements: "",
    medicalConditions: "",
  });
  // Other climbers - just names/emails for sending links later
  const [otherClimbers, setOtherClimbers] = useState<OtherClimberPlaceholder[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Success state
  const [bookingResult, setBookingResult] = useState<{
    bookingRef: string;
    summary: {
      route: string;
      departureDate: string;
      climbers: number;
      totalPrice: number;
      depositAmount: number;
    };
  } | null>(null);

  // Track form start
  const formStartTracked = useRef(false);

  // When departure changes, reset to stage 1 and track selection
  const prevDepIdRef = useState<string | null>(null);
  if (departure && departure.id !== prevDepIdRef[0]) {
    prevDepIdRef[0] = departure.id;
    if (stage === 0 || stage === "success") {
      setStage(1);
      setError("");
      // Track departure selection
      trackSelectDeparture({
        departureId: departure.id,
        routeName: departure.route.name,
        departureDate: departure.arrivalDate,
        price: departure.price,
      });
      // Track begin checkout
      trackBeginCheckout({
        itemId: departure.id,
        itemName: `${departure.route.name} - ${format(new Date(departure.arrivalDate), "MMM d, yyyy")}`,
        itemCategory: "kilimanjaro",
        value: departure.price,
      });
    }
  }

  // Track form start on first interaction
  useEffect(() => {
    if (!departure) return;

    const handleFirstInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackFormStart({
          formName: "group_booking_form",
          formId: departure.id,
          formLocation: "departures-page",
        });
      }
    };

    const form = document.querySelector(`[data-form-id="group-booking-${departure.id}"]`);
    if (form) {
      form.addEventListener("focusin", handleFirstInteraction, { once: true });
    }

    return () => {
      form?.removeEventListener("focusin", handleFirstInteraction);
    };
  }, [departure]);

  if (!departure) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-[var(--border)] rounded-xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-[var(--surface)] rounded-full flex items-center justify-center mx-auto mb-6">
          <ChevronUp className="w-10 h-10 text-[var(--text-light)] animate-bounce" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-[var(--text)] mb-3">
          Book Your Kilimanjaro Adventure
        </h3>
        <p className="text-[var(--text-muted)] max-w-md mx-auto">
          Browse the departures above and click <strong>JOIN NOW</strong> on your preferred date to start booking.
        </p>
      </div>
    );
  }

  const availableSpots = departure.availableSpots;
  const maxClimbers = Math.min(availableSpots, 10);
  const pricePerPerson = departure.price;
  const totalPrice = pricePerPerson * totalClimbers;
  const depositAmount = Math.round(totalPrice * 0.1);
  const balanceAmount = totalPrice - depositAmount;

  const handleStage1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Track step 1 completion
    trackFormStep({
      formName: "group_booking_form",
      stepNumber: 1,
      stepName: "contact_info",
      formId: departure?.id,
    });

    // Initialize lead climber details
    setLeadClimber({
      name: leadName,
      nationality: leadNationality,
      dietaryRequirements: "",
      medicalConditions: "",
    });

    // Initialize other climber placeholders (for climbers 2+)
    const otherCount = totalClimbers - 1;
    const newOtherClimbers: OtherClimberPlaceholder[] = Array.from({ length: otherCount }, (_, i) => {
      return otherClimbers[i] || { name: "", email: "" };
    });
    setOtherClimbers(newOtherClimbers);
    setStage(2);
  };

  const updateLeadClimber = (field: keyof LeadClimberDetail, value: string) => {
    setLeadClimber((prev) => ({ ...prev, [field]: value }));
  };

  const updateOtherClimber = (index: number, field: keyof OtherClimberPlaceholder, value: string) => {
    setOtherClimbers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const phone = leadPhone ? `${phonePrefix}${leadPhone}` : undefined;

      // Build climbers array: lead climber is complete, others are placeholders
      const allClimbers = [
        {
          name: leadClimber.name,
          nationality: leadClimber.nationality || undefined,
          dietaryRequirements: leadClimber.dietaryRequirements || undefined,
          medicalConditions: leadClimber.medicalConditions || undefined,
          isComplete: true,
        },
        ...otherClimbers.map((c) => ({
          name: c.name || "",
          email: c.email || undefined,
          isComplete: false,
        })),
      ];

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departureId: departure.id,
          leadName,
          leadEmail,
          leadPhone: phone,
          climbers: allClimbers,
          specialRequests: specialRequests || undefined,
          subscribeNewsletter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit booking. Please try again.");
        return;
      }

      // Track step 2 completion
      trackFormStep({
        formName: "group_booking_form",
        stepNumber: 2,
        stepName: "climber_details",
        formId: departure?.id,
      });

      // Track successful form submission (generate_lead)
      trackFormSubmit({
        formName: "group_booking_form",
        formId: departure?.id,
        tripType: "Kilimanjaro Group Departure",
        numTravelers: totalClimbers,
        value: totalPrice,
        currency: "USD",
        relatedItem: departure?.route.name,
      });

      // Track as purchase/booking
      trackPurchase({
        transactionId: data.bookingRef,
        value: totalPrice,
        currency: "USD",
        itemId: departure?.id || "",
        itemName: departure?.route.name || "Kilimanjaro Climb",
        itemCategory: "kilimanjaro",
      });

      setBookingResult({
        bookingRef: data.bookingRef,
        summary: data.summary,
      });
      setStage("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (stage === "success" && bookingResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-[var(--border)] rounded-xl p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-[var(--text)] mb-2">
            Booking Inquiry Submitted!
          </h3>
          <p className="text-[var(--text-muted)]">
            Reference: <span className="font-mono font-bold text-[var(--primary)]">{bookingResult.bookingRef}</span>
          </p>
        </div>

        <div className="bg-[var(--surface)] rounded-xl p-6 mb-8">
          <h4 className="font-heading font-semibold mb-4">Booking Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[var(--text-muted)]">Route</span>
              <p className="font-medium">{bookingResult.summary.route}</p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Departure</span>
              <p className="font-medium">
                {format(new Date(bookingResult.summary.departureDate), "MMM d, yyyy")}
              </p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Climbers</span>
              <p className="font-medium">{bookingResult.summary.climbers}</p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Total Price</span>
              <p className="font-bold text-[var(--primary-dark)]">
                {formatPrice(bookingResult.summary.totalPrice)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h4 className="font-heading font-semibold mb-4">What Happens Next?</h4>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">1</span>
              <div>
                <p className="font-medium">We&apos;ll review your booking</p>
                <p className="text-sm text-[var(--text-muted)]">Our team will contact you within 24 hours to confirm availability and details.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">2</span>
              <div>
                <p className="font-medium">Pay your 10% deposit</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Secure your spot with just {formatPrice(bookingResult.summary.depositAmount)}.
                </p>
              </div>
            </li>
            {bookingResult.summary.climbers > 1 && (
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <p className="font-medium">Collect climber details</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    After deposit confirmation, you&apos;ll receive links to share with your group so each climber can complete their details.
                  </p>
                </div>
              </li>
            )}
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">{bookingResult.summary.climbers > 1 ? 4 : 3}</span>
              <div>
                <p className="font-medium">Balance due 60 days before departure</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Remaining {formatPrice(bookingResult.summary.totalPrice - bookingResult.summary.depositAmount)} due before your adventure begins.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              onClearDeparture();
              setStage(0);
              setLeadName("");
              setLeadEmail("");
              setLeadPhone("");
              setLeadNationality("");
              setTotalClimbers(1);
              setLeadClimber({ name: "", nationality: "", dietaryRequirements: "", medicalConditions: "" });
              setOtherClimbers([]);
              setSpecialRequests("");
              setSubscribeNewsletter(false);
              setBookingResult(null);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-medium transition-colors"
          >
            Book Another Departure
          </button>
        </div>
      </div>
    );
  }

  // Departure summary card (shown in stages 1 & 2)
  const departureSummary = (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {departure.isFullMoon && (
              <span title="Full Moon Climb">{String.fromCodePoint(0x1F315)}</span>
            )}
            <h4 className="font-heading font-bold text-lg">{departure.route.name}</h4>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(departure.arrivalDate), "MMM d")} - {format(new Date(departure.endDate), "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Kilimanjaro, Tanzania
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <AvailabilityBadge available={availableSpots} total={departure.maxParticipants} />
            </span>
          </div>
          {departure.isFullMoon && (
            <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              Full Moon Summit
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[var(--primary-dark)]">{formatPrice(pricePerPerson)}</p>
          <p className="text-xs text-[var(--text-muted)]">per person</p>
        </div>
      </div>
    </div>
  );

  // Price breakdown panel
  const priceBreakdown = (
    <div className="bg-white border border-[var(--border)] rounded-lg p-4">
      <h4 className="font-heading font-semibold text-sm mb-3">Price Breakdown</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--text-muted)]">
            {formatPrice(pricePerPerson)} x {totalClimbers} climber{totalClimbers > 1 ? "s" : ""}
          </span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        <div className="border-t border-[var(--border)] pt-2">
          <div className="flex justify-between text-[var(--primary-dark)]">
            <span className="font-medium">10% Deposit (due now)</span>
            <span className="font-bold">{formatPrice(depositAmount)}</span>
          </div>
          <div className="flex justify-between text-[var(--text-muted)]">
            <span>Balance (due 60 days before)</span>
            <span>{formatPrice(balanceAmount)}</span>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[var(--primary-dark)]">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Route info card for left column
  const routeInfoCard = (
    <div className="bg-white border border-[var(--border)] rounded-xl p-5 sticky top-4">
      <div className="space-y-4">
        {/* Route Name */}
        <div>
          <h3 className="font-heading text-xl font-bold text-[var(--text)]">
            {departure.route.name}
          </h3>
          {departure.isFullMoon && (
            <span className="inline-flex items-center gap-1 mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              {String.fromCodePoint(0x1F315)} Full Moon Summit
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Dates</p>
            <p className="font-medium text-[var(--text)]">
              {format(new Date(departure.arrivalDate), "MMM d")} - {format(new Date(departure.endDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Location</p>
            <p className="font-medium text-[var(--text)]">Kilimanjaro, Tanzania</p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)]">Availability</p>
            <div className="flex items-center gap-2">
              <AvailabilityBadge available={availableSpots} total={departure.maxParticipants} />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-3xl font-bold text-[var(--primary-dark)]">{formatPrice(pricePerPerson)}</p>
          <p className="text-sm text-[var(--text-muted)]">per person</p>
        </div>
      </div>
    </div>
  );

  // Enhanced price breakdown for right column
  const priceBreakdownCard = (
    <div className="bg-white border border-[var(--border)] rounded-xl p-5 sticky top-4">
      <h4 className="font-heading font-bold text-lg mb-4">Price Breakdown</h4>

      <div className="space-y-3">
        {/* Line item */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--text-muted)]">
            {totalClimbers} climber{totalClimbers > 1 ? "s" : ""} × {formatPrice(pricePerPerson)}
          </span>
          <span className="font-semibold">{formatPrice(totalPrice)}</span>
        </div>

        <div className="border-t border-[var(--border)] pt-3 space-y-2">
          {/* Deposit */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[var(--primary-dark)]">10% Deposit</p>
              <p className="text-xs text-[var(--text-muted)]">Due now to secure spot</p>
            </div>
            <span className="text-lg font-bold text-[var(--primary-dark)]">{formatPrice(depositAmount)}</span>
          </div>

          {/* Balance */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[var(--text)]">Balance</p>
              <p className="text-xs text-[var(--text-muted)]">Due 60 days before</p>
            </div>
            <span className="font-semibold text-[var(--text)]">{formatPrice(balanceAmount)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-[var(--border)] pt-3">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-lg">Total</span>
            <span className="text-xl font-bold text-[var(--primary-dark)]">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[var(--surface)] rounded-lg p-3 mt-4">
          <p className="text-xs text-[var(--text-muted)]">
            <strong className="text-[var(--text)]">Secure your spot today!</strong> Pay just 10% now. Full balance due 60 days before departure.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 3-Column Layout: Route Info | Form | Price Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Route Info (25%) */}
        <div className="lg:col-span-3">
          {routeInfoCard}
        </div>

        {/* Center Column - Form (50%) */}
        <div className="lg:col-span-6">
          {/* Stage 1: Lead contact + group size */}
          {stage === 1 && (
            <form onSubmit={handleStage1Submit} className="bg-white border border-[var(--border)] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-xl font-bold">Your Details</h3>
                <span className="text-sm text-[var(--text-muted)] bg-[var(--surface)] px-3 py-1 rounded-full">Step 1 of 2</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="leadName" className="block text-sm font-medium text-[var(--text)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="leadName"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="leadEmail" className="block text-sm font-medium text-[var(--text)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="leadEmail"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="leadPhone" className="block text-sm font-medium text-[var(--text)] mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="w-24 px-2 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    >
                      {PHONE_PREFIXES.map((p) => (
                        <option key={p.code} value={p.code}>{p.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="leadPhone"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="flex-1 px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                      placeholder="123 456 7890"
                    />
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label htmlFor="leadNationality" className="block text-sm font-medium text-[var(--text)] mb-1">
                    Nationality
                  </label>
                  <select
                    id="leadNationality"
                    value={leadNationality}
                    onChange={(e) => setLeadNationality(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  >
                    <option value="">Select nationality</option>
                    {NATIONALITIES.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Climbers */}
              <div>
                <label htmlFor="totalClimbers" className="block text-sm font-medium text-[var(--text)] mb-1">
                  Number of Climbers *
                </label>
                <select
                  id="totalClimbers"
                  required
                  value={totalClimbers}
                  onChange={(e) => setTotalClimbers(parseInt(e.target.value))}
                  className="w-full sm:w-48 px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                >
                  {Array.from({ length: maxClimbers }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} climber{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                {availableSpots <= 3 && (
                  <p className="text-xs text-amber-600 mt-1">
                    Only {availableSpots} spot{availableSpots !== 1 ? "s" : ""} remaining!
                  </p>
                )}
              </div>

              {/* Mobile price summary */}
              <div className="lg:hidden">{priceBreakdown}</div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white font-heading font-semibold rounded-lg transition-colors"
              >
                Continue to Climber Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Stage 2: Lead climber details + other climbers (names only) + confirm */}
          {stage === 2 && (
            <form onSubmit={handleSubmit} className="bg-white border border-[var(--border)] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setStage(1)}
                  className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <span className="text-sm text-[var(--text-muted)] bg-[var(--surface)] px-3 py-1 rounded-full">Step 2 of 2</span>
              </div>

              {/* Lead Climber Details (Required) */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold">Your Details (Lead Climber)</h3>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadClimber.name}
                        onChange={(e) => updateLeadClimber("name", e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Nationality
                      </label>
                      <select
                        value={leadClimber.nationality}
                        onChange={(e) => updateLeadClimber("nationality", e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        {NATIONALITIES.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Dietary Requirements
                      </label>
                      <input
                        type="text"
                        value={leadClimber.dietaryRequirements}
                        onChange={(e) => updateLeadClimber("dietaryRequirements", e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                        placeholder="e.g., Vegetarian, Halal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Medical Conditions
                      </label>
                      <input
                        type="text"
                        value={leadClimber.medicalConditions}
                        onChange={(e) => updateLeadClimber("medicalConditions", e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                        placeholder="e.g., Asthma, allergies"
                      />
                    </div>
                  </div>

                  {/* Newsletter opt-in */}
                  <div className="mt-4 pt-3 border-t border-[var(--border)]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <span className="text-sm text-[var(--text-muted)]">
                        Subscribe to our newsletter for travel tips & exclusive offers
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Other Climbers (Optional - they'll complete details later) */}
              {totalClimbers > 1 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <h3 className="font-heading text-lg font-semibold">Other Climbers</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Optional</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      After your deposit is confirmed, each climber will receive a personal link to complete their details. You can add their names/emails now or share links later.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {otherClimbers.map((climber, index) => (
                      <div key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3">
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
                          Climber {index + 2}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={climber.name}
                              onChange={(e) => updateOtherClimber(index, "name", e.target.value)}
                              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                              placeholder="Name (optional)"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              value={climber.email}
                              onChange={(e) => updateOtherClimber(index, "email", e.target.value)}
                              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                              placeholder="Email (optional)"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-[var(--text)] mb-1">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors resize-none"
                  placeholder="Any special requirements or questions..."
                />
              </div>

              {/* Mobile price summary */}
              <div className="lg:hidden">{priceBreakdown}</div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white font-heading font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : `Book Now — ${formatPrice(depositAmount)} deposit`}
              </button>

              <p className="text-xs text-center text-[var(--text-muted)]">
                By booking you agree to our terms. A 10% deposit secures your spot.
                Full balance is due 60 days before departure.
              </p>
            </form>
          )}
        </div>

        {/* Right Column - Price Breakdown (25%) */}
        <div className="hidden lg:block lg:col-span-3">
          {priceBreakdownCard}
        </div>
      </div>
    </div>
  );
}
