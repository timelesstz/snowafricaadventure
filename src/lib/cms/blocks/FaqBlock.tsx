interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  sectionLabel: string;
  heading: string;
  faqs: FaqItem[];
  bgColor: string;
}

export function FaqBlock({ sectionLabel, heading, faqs, bgColor }: FaqBlockProps) {
  const bgClass = bgColor === "surface" ? "bg-[var(--surface)]" : bgColor === "muted" ? "bg-[var(--muted)]" : "";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sectionLabel && (
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              {sectionLabel}
            </span>
          )}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            {heading}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-[var(--text-muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

FaqBlock.defaultProps = {
  sectionLabel: "FAQ",
  heading: "Frequently Asked Questions",
  faqs: [
    { question: "Question one?", answer: "Answer to question one." },
    { question: "Question two?", answer: "Answer to question two." },
    { question: "Question three?", answer: "Answer to question three." },
  ],
  bgColor: "none",
};
