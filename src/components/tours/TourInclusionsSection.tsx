import { Check, X } from "lucide-react";

interface TourInclusionsSectionProps {
  inclusions: string[];
  exclusions: string[];
}

export function TourInclusionsSection({ inclusions, exclusions }: TourInclusionsSectionProps) {
  return (
    <section id="inclusions" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block font-heading text-xs font-bold uppercase tracking-widest text-[var(--secondary)] pb-2 mb-4 border-b-2 border-[var(--border)]">
          What&apos;s Included
        </span>
        <h2 className="font-heading text-3xl font-bold text-[var(--text)] tracking-tight">
          Everything You Need
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
        {/* Included */}
        <div className="p-6 lg:p-8 bg-white rounded-sm border border-[var(--border)] shadow-md">
          <h3 className="flex items-center gap-2 font-heading text-base font-bold text-green-600 mb-6 pb-4 border-b border-[var(--border)]">
            <Check className="w-6 h-6" />
            Included
          </h3>
          <ul className="space-y-2">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 py-1.5 text-sm text-[var(--text)]">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="p-6 lg:p-8 bg-[var(--surface)] rounded-sm border border-[var(--border)]">
          <h3 className="flex items-center gap-2 font-heading text-base font-bold text-[var(--text-muted)] mb-6 pb-4 border-b border-[var(--border)]">
            <X className="w-6 h-6" />
            Not Included
          </h3>
          <ul className="space-y-2">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 py-1.5 text-sm text-[var(--text-muted)]">
                <X className="w-4 h-4 text-[var(--text-light)] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
