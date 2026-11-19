import { MessageCircle } from "lucide-react";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { SITE_CONFIG } from "@/lib/constants";

// End-of-guide quote block. Guide pages are where most organic visitors
// land, and before this they had no form: the only way to ask for a price
// was the header button, three taps away.

interface GuideQuoteSectionProps {
  /** Page path or title, stored on the inquiry so admins see where it came from. */
  relatedTo: string;
  kind: "kilimanjaro" | "safari";
}

export function GuideQuoteSection({ relatedTo, kind }: GuideQuoteSectionProps) {
  const isKili = kind === "kilimanjaro";
  const whatsapp = `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`;

  return (
    <section
      aria-labelledby="guide-quote-heading"
      className="border-t border-[var(--border)] bg-[var(--surface)] py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              {isKili ? "Planning a climb?" : "Planning a safari?"}
            </p>
            <h2
              id="guide-quote-heading"
              className="mt-2 font-heading text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] font-bold leading-tight text-[var(--text)]"
            >
              Get a quote for your dates
            </h2>
            <p className="mt-3 max-w-md text-[var(--text-muted)]">
              Pick a trip, a month and your group size. We reply within 24 hours.
            </p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Or message us on WhatsApp
            </a>
          </div>
          <QuickQuoteForm
            relatedTo={relatedTo}
            defaultTrip={isKili ? "Kilimanjaro" : "Wildlife Safari"}
            formId="guide-end"
          />
        </div>
      </div>
    </section>
  );
}
