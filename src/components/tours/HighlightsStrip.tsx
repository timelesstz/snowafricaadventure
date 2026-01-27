import Link from "next/link";
import { Smile, Globe, Mountain, Tent } from "lucide-react";

const defaultHighlights = [
  { icon: Smile, title: 'Big Five Territory' },
  { icon: Globe, title: 'Great Migration' },
  { icon: Mountain, title: 'Ngorongoro Crater' },
  { icon: Tent, title: 'Luxury Camps' },
];

interface HighlightsStripProps {
  highlights?: { icon: typeof Smile; title: string }[];
}

export function HighlightsStrip({ highlights = defaultHighlights }: HighlightsStripProps) {
  return (
    <section id="highlights" className="bg-[var(--primary-dark)] text-white py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl font-bold mb-2 tracking-tight">
            Why Choose This Safari?
          </h2>
          <p className="text-white/60 text-base">
            Discover what makes this our most popular Tanzania adventure
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[var(--secondary)]/15 rounded-sm flex items-center justify-center flex-shrink-0">
                <highlight.icon className="w-[22px] h-[22px] stroke-[var(--secondary)]" />
              </div>
              <span className="font-heading font-semibold text-[15px] tracking-tight">
                {highlight.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="#book"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--secondary)] text-white font-heading font-semibold rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all"
          >
            Start Planning Your Safari
          </Link>
        </div>
      </div>
    </section>
  );
}
