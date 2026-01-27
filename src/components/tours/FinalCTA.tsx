import Link from "next/link";

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
}

export function FinalCTA({
  title = "Your Tanzania Adventure Awaits",
  subtitle = "Join thousands of travelers who've experienced the magic of Tanzania with Snow Africa. Expert guides, luxury lodges, and memories that last a lifetime."
}: FinalCTAProps) {
  return (
    <section
      className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)' }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full opacity-10 blur-[60px]"
        style={{ background: 'var(--secondary)' }}
      />

      <div className="max-w-[800px] mx-auto relative">
        <h2 className="font-heading text-3xl lg:text-4xl font-extrabold mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#book"
            className="inline-flex items-center justify-center px-10 py-4 bg-[var(--secondary)] text-white font-heading font-semibold text-base rounded-sm hover:bg-[var(--secondary-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--secondary)]/25 transition-all"
          >
            Book Your Safari
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-10 py-4 bg-transparent text-white font-heading font-semibold text-base rounded-sm border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </section>
  );
}
