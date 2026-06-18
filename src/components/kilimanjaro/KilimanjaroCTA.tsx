import Link from "next/link";
import { Mountain } from "lucide-react";

interface KilimanjaroCTAProps {
  title?: string;
  description?: string;
  primaryLink?: string;
  primaryText?: string;
  secondaryLink?: string;
  secondaryText?: string;
}

export function KilimanjaroCTA({
  title = "Ready to Climb Kilimanjaro?",
  description = "Join 800+ successful summiteers. With experienced guides, proper acclimatization, and a 93% summit success rate on 8-day routes — your Kilimanjaro adventure starts here.",
  primaryLink = "/trekking/",
  primaryText = "Browse Kilimanjaro Routes",
  secondaryLink = "/kilimanjaro-join-group-departures/",
  secondaryText = "Join a Group Departure",
}: KilimanjaroCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
      <div className="container mx-auto px-4 text-center">
        <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={primaryLink}
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            {primaryText}
          </Link>
          <Link
            href={secondaryLink}
            className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
