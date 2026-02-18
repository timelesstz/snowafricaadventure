import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface HeroBlockProps {
  title: string;
  subtitle: string;
  badgeText: string;
  ctaText: string;
  ctaUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  backgroundImage: string;
  overlayStyle: string;
  minHeight: string;
  textAlign: string;
  showScroll: boolean;
}

export function HeroBlock({
  title,
  subtitle,
  badgeText,
  ctaText,
  ctaUrl,
  ctaSecondaryText,
  ctaSecondaryUrl,
  backgroundImage,
  overlayStyle,
  minHeight,
  textAlign,
  showScroll,
}: HeroBlockProps) {
  const hasImage = !!backgroundImage;
  const align = textAlign === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section className="relative" style={{ minHeight: minHeight || "70vh" }}>
      {hasImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${overlayStyle || "from-black/70 via-black/50 to-transparent"}`} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--text)]" />
      )}

      <div
        className="container mx-auto px-4 relative z-10 py-20 flex flex-col justify-center"
        style={{ minHeight: minHeight || "70vh" }}
      >
        <div className={`max-w-2xl flex flex-col ${align} ${textAlign === "center" ? "mx-auto" : ""}`}>
          {badgeText && (
            <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold inline-block mb-4 w-fit">
              {badgeText}
            </span>
          )}
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}
          {(ctaText || ctaSecondaryText) && (
            <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""}`}>
              {ctaText && ctaUrl && (
                <Link
                  href={ctaUrl}
                  className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                >
                  {ctaText}
                </Link>
              )}
              {ctaSecondaryText && ctaSecondaryUrl && (
                <Link
                  href={ctaSecondaryUrl}
                  className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {ctaSecondaryText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {showScroll && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      )}
    </section>
  );
}

HeroBlock.defaultProps = {
  title: "Page Title",
  subtitle: "Add a compelling subtitle here",
  badgeText: "",
  ctaText: "",
  ctaUrl: "",
  ctaSecondaryText: "",
  ctaSecondaryUrl: "",
  backgroundImage: "",
  overlayStyle: "from-black/70 via-black/50 to-transparent",
  minHeight: "70vh",
  textAlign: "left",
  showScroll: false,
};
