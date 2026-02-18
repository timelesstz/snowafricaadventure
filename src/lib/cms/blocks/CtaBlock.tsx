import Link from "next/link";

interface CtaBlockProps {
  heading: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  bgStyle: string;
}

export function CtaBlock({ heading, subtitle, buttonText, buttonUrl, bgStyle }: CtaBlockProps) {
  const isDark = bgStyle === "dark";

  return (
    <section className={`py-16 ${isDark ? "bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white" : "bg-[var(--surface)]"}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          {heading}
        </h2>
        {subtitle && (
          <p className={`mb-8 max-w-2xl mx-auto text-lg ${isDark ? "text-white/70" : "text-[var(--text-muted)]"}`}>
            {subtitle}
          </p>
        )}
        {buttonText && buttonUrl && (
          <Link
            href={buttonUrl}
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

CtaBlock.defaultProps = {
  heading: "Ready to Start?",
  subtitle: "Get in touch and let us plan your perfect adventure.",
  buttonText: "Get Started",
  buttonUrl: "#inquiry-form",
  bgStyle: "dark",
};
