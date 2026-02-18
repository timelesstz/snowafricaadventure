"use client";

import { DollarSign, Check, User, Users } from "lucide-react";

interface PriceTier {
  groupSize: string;
  description: string;
  price: number;
  savings?: number;
  featured?: boolean;
}

interface RoutePriceTableProps {
  routeTitle: string;
  duration?: string;
  priceTiers?: PriceTier[];
  currency?: string;
  onInquire?: () => void;
}

const defaultPriceTiers: PriceTier[] = [
  { groupSize: "1 Person", description: "Private climb experience", price: 3250 },
  { groupSize: "2-4 People", description: "Small group adventure", price: 2450, savings: 800, featured: true },
  { groupSize: "5-7 People", description: "Medium group savings", price: 2250, savings: 1000 },
  { groupSize: "8-10 People", description: "Large group discount", price: 2050, savings: 1200 },
  { groupSize: "11 & Above", description: "Best value for groups", price: 1950, savings: 1300 },
];

export function RoutePriceTable({
  routeTitle,
  duration,
  priceTiers = defaultPriceTiers,
  currency = "USD",
  onInquire,
}: RoutePriceTableProps) {
  // Create display title with duration if available
  const displayTitle = duration
    ? `${duration} ${routeTitle.replace(/^\d+-Day\s*/i, "")}`
    : routeTitle;

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--surface)] to-white" id="pricing">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <DollarSign className="w-4 h-4" />
            Group Pricing
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-3">
            {displayTitle} Pricing
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Save more when you climb with friends. All prices include accommodation, meals, park fees, and expert guides.
          </p>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[var(--primary)] text-white px-8 py-5 font-heading font-semibold">
            <div>Group Size</div>
            <div>Price per Person</div>
            <div>Savings</div>
          </div>

          {/* Table Rows */}
          {priceTiers.map((tier, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 px-8 py-6 border-b border-[var(--border)] items-center transition-colors hover:bg-[var(--surface)] ${
                tier.featured
                  ? "bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--secondary)]/5 relative"
                  : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute top-1/2 right-8 -translate-y-1/2 bg-[var(--secondary)] text-[var(--primary-dark)] px-3 py-1 rounded-full text-xs font-semibold hidden lg:block">
                  Most Popular
                </span>
              )}

              {/* Group Size */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                  {tier.groupSize === "1 Person" ? (
                    <User className="w-6 h-6" />
                  ) : (
                    <Users className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-[var(--primary)]">
                    {tier.groupSize}
                  </h4>
                  <span className="text-sm text-[var(--text-muted)]">
                    {tier.description}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="font-heading text-2xl font-bold text-[var(--primary)]">
                ${tier.price.toLocaleString()}{" "}
                <span className="text-sm font-normal text-[var(--text-muted)]">
                  {currency}
                </span>
              </div>

              {/* Savings */}
              <div>
                {tier.savings ? (
                  <span className="inline-block bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                    Save ${tier.savings.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)]">—</span>
                )}
              </div>
            </div>
          ))}

          {/* Table Footer */}
          <div className="bg-[var(--surface)] px-8 py-6 flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Park fees included
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                All meals
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Expert guides
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Camping equipment
              </span>
            </div>
            {onInquire ? (
              <button
                type="button"
                onClick={onInquire}
                className="px-8 py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5"
              >
                Get Custom Quote
              </button>
            ) : (
              <a
                href="#inquiry-form"
                className="inline-block px-8 py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5"
              >
                Get Custom Quote
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
