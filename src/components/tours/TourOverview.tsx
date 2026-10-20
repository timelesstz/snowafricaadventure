import Link from "next/link";
import { SidebarCard } from "./SidebarCard";
import {
  Smile,
  Car,
  Building2,
  UtensilsCrossed,
  Camera,
  Plane,
  Globe,
  Sun,
  Compass
} from "lucide-react";

interface TourOverviewProps {
  title?: string;
  leadText: string;
  bodyText: string[];
  quote?: string;
}

const safariHighlights = [
  { icon: Smile, label: 'Big Five guaranteed' },
  { icon: Car, label: 'Private 4x4 Land Cruiser' },
  { icon: Building2, label: 'Luxury lodges & tented camps' },
  { icon: UtensilsCrossed, label: 'Full board included' },
  { icon: Camera, label: 'Photography-friendly vehicles' },
  { icon: Plane, label: 'Airport transfers included' },
];

const bestTimeToVisit = [
  { icon: Globe, label: 'Migration in Serengeti', highlight: 'Jun-Oct:' },
  { icon: Sun, label: 'Calving season', highlight: 'Jan-Mar:' },
  { icon: Compass, label: 'Ngorongoro Crater', highlight: 'Year-round:' },
];

export function TourOverview({
  title = "The Ultimate Tanzania Experience",
  leadText,
  bodyText,
  quote
}: TourOverviewProps) {
  return (
    <section id="overview" className="py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="max-w-[720px]">
            <span className="inline-block font-heading text-xs font-bold uppercase tracking-widest text-[var(--secondary)] pb-2 mb-4 border-b-2 border-[var(--border)]">
              About This Safari
            </span>

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-8 tracking-tight">
              {title}
            </h2>

            <p className="text-xl lg:text-[22px] leading-relaxed text-[var(--text)] mb-8">
              {leadText}
            </p>

            {bodyText.map((paragraph, index) => (
              <p key={index} className="text-[17px] leading-[1.75] text-[var(--text-muted)] mb-6">
                {paragraph}
              </p>
            ))}

            {/* Pull Quote */}
            {quote && (
              <div className="my-12 py-8 border-y border-[var(--border)]">
                <blockquote className="font-heading text-2xl font-medium italic text-[var(--text)] pl-6 border-l-4 border-[var(--secondary)] tracking-tight">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>
            )}

            {/* Editorial CTA */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 lg:p-8 rounded-sm my-12"
              style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)' }}
            >
              <div className="text-white text-center sm:text-left">
                <h3 className="font-heading text-xl font-bold mb-1 tracking-tight">
                  Ready to Go Wild?
                </h3>
                <p className="text-white/85 text-[15px]">
                  Secure your spot with just a 20% deposit
                </p>
              </div>
              <Link
                href="#book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-6">
            <SidebarCard title="Safari Highlights" items={safariHighlights} />
            <SidebarCard title="Best Time to Visit" items={bestTimeToVisit} />
          </aside>
        </div>
      </div>
    </section>
  );
}
