"use client";

import { useCallback } from "react";
import { DollarSign, Check, User, Users, ArrowRight } from "lucide-react";

interface PriceTier {
  groupSize: string;
  description: string;
  price: number;
  savings?: number;
  featured?: boolean;
}

interface SafariPriceTableProps {
  safariTitle: string;
  duration?: string;
  priceTiers?: PriceTier[] | null;
  currency?: string;
}

const defaultPriceTiers: PriceTier[] = [
  { groupSize: "1 Person", description: "Private safari experience", price: 4500 },
  { groupSize: "2-4 People", description: "Small group adventure", price: 3500, savings: 1000, featured: true },
  { groupSize: "5-7 People", description: "Medium group savings", price: 3200, savings: 1300 },
  { groupSize: "8-10 People", description: "Large group discount", price: 2950, savings: 1550 },
  { groupSize: "11 & Above", description: "Best value for groups", price: 2750, savings: 1750 },
];

export function SafariPriceTable({
  safariTitle,
  duration,
  priceTiers,
  currency = "USD",
}: SafariPriceTableProps) {
  const tiers = priceTiers && priceTiers.length > 0 ? priceTiers : defaultPriceTiers;

  const scrollToBook = useCallback(() => {
    const target = document.getElementById("book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("ring-4", "ring-amber-400/40", "rounded-2xl");
      window.setTimeout(() => {
        target.classList.remove("ring-4", "ring-amber-400/40", "rounded-2xl");
      }, 1600);
    }
  }, []);

  const displayTitle = duration
    ? `${duration} ${safariTitle.replace(/^\d+-?Day(s)?\s*/i, "")}`
    : safariTitle;

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--surface)] to-white" id="pricing">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[var(--secondary)]/10 text-[var(--secondary-dark)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <DollarSign className="w-4 h-4" />
            Group Pricing
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-3">
            {displayTitle} Pricing
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Save more when you travel with friends. All prices include accommodation, meals, park fees, expert guides, and 4x4 transport.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-[var(--primary)] text-white px-8 py-5 font-heading font-semibold">
            <div>Group Size</div>
            <div>Price per Person</div>
            <div>Savings</div>
          </div>

          {tiers.map((tier, index) => (
            <button
              key={index}
              type="button"
              onClick={scrollToBook}
              className={`grid grid-cols-3 px-8 py-6 border-b border-[var(--border)] items-center transition-all w-full text-left group cursor-pointer ${
                tier.featured
                  ? "bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--secondary)]/5 relative hover:from-[var(--secondary)]/20 hover:to-[var(--secondary)]/10"
                  : "hover:bg-[var(--surface)]"
              }`}
            >
              {tier.featured && (
                <span className="absolute top-1/2 right-8 -translate-y-1/2 bg-[var(--secondary)] text-[var(--primary-dark)] px-3 py-1 rounded-full text-xs font-semibold hidden lg:block">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                  {tier.groupSize === "1 Person" ? (
                    <User className="w-6 h-6" />
                  ) : (
                    <Users className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[var(--primary)]">
                    {tier.groupSize}
                  </h3>
                  <span className="text-sm text-[var(--text-muted)]">
                    {tier.description}
                  </span>
                </div>
              </div>

              <div className="font-heading text-2xl font-bold text-[var(--primary)]">
                ${tier.price.toLocaleString()}{" "}
                <span className="text-sm font-normal text-[var(--text-muted)]">
                  {currency}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {tier.savings ? (
                  <span className="inline-block bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                    Save ${tier.savings.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)]">&mdash;</span>
                )}
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" />
              </div>
            </button>
          ))}

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
                Expert guide
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                4x4 game drives
              </span>
            </div>
            <button
              type="button"
              onClick={scrollToBook}
              className="px-8 py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
