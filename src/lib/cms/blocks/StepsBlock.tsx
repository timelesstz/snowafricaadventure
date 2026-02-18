interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsBlockProps {
  sectionLabel: string;
  heading: string;
  steps: Step[];
  bgStyle: string;
}

export function StepsBlock({ sectionLabel, heading, steps, bgStyle }: StepsBlockProps) {
  const isDark = bgStyle === "dark";

  return (
    <section className={`py-16 ${isDark ? "bg-[var(--primary-dark)] text-white" : "bg-[var(--surface)]"}`}>
      <div className="container mx-auto px-4">
        {sectionLabel && (
          <span className={`block text-sm font-semibold uppercase tracking-wider text-center mb-2 ${isDark ? "text-[var(--secondary)]" : "text-[var(--secondary)]"}`}>
            {sectionLabel}
          </span>
        )}
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          {heading}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`text-center rounded-xl p-6 ${isDark ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white border border-[var(--border)] shadow-sm"}`}
            >
              <div className="text-4xl font-bold text-[var(--secondary)] mb-3">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className={`text-sm ${isDark ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

StepsBlock.defaultProps = {
  sectionLabel: "Process",
  heading: "How It Works",
  steps: [
    { number: "01", title: "Step One", description: "Description of step one" },
    { number: "02", title: "Step Two", description: "Description of step two" },
    { number: "03", title: "Step Three", description: "Description of step three" },
    { number: "04", title: "Step Four", description: "Description of step four" },
  ],
  bgStyle: "dark",
};
