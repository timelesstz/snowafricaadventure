import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Default hero data for each page (used as fallback when no DB record exists)
const DEFAULT_HEROES: Record<string, PageHeroData> = {
  homepage: {
    pageSlug: "homepage",
    pageName: "Homepage",
    heroType: "image",
    title: "Climb Kilimanjaro.\nSafari Tanzania.",
    subtitle:
      "Summit Africa's highest peak. Witness the Great Migration. Experience the adventure of a lifetime with Tanzania's trusted local operator.",
    badgeText: "Tanzania's Trusted Adventure Partner",
    ctaPrimaryText: "Explore Kilimanjaro",
    ctaPrimaryUrl: "/trekking/",
    ctaSecondaryText: "View Safari Packages",
    ctaSecondaryUrl: "/tanzania-safaris/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
    overlayGradient: "from-black/70 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 70,
    minHeight: "75vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  "tanzania-safaris": {
    pageSlug: "tanzania-safaris",
    pageName: "Tanzania Safaris",
    heroType: "image",
    title: "Tanzania Safari\nPackages",
    subtitle:
      "From the endless plains of the Serengeti to the wildlife-rich Ngorongoro Crater, experience Africa's most spectacular safari destinations with Tanzania's trusted local operator.",
    badgeText: "2025-2026 Season",
    ctaPrimaryText: "Explore Safaris",
    ctaPrimaryUrl: "#safaris",
    ctaSecondaryText: "Design Your Own Safari",
    ctaSecondaryUrl: "/tailor-made-safari/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    overlayGradient: "from-black/80 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 80,
    minHeight: "70vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  trekking: {
    pageSlug: "trekking",
    pageName: "Trekking Routes",
    heroType: "image",
    title: "Kilimanjaro\nTrekking Routes",
    subtitle:
      "Choose your path to the Roof of Africa. Each route offers a unique experience through diverse ecosystems to the summit at 5,895m.",
    badgeText: "5,895m Summit",
    ctaPrimaryText: "Explore Routes",
    ctaPrimaryUrl: "#routes",
    ctaSecondaryText: "View Group Departures",
    ctaSecondaryUrl: "/kilimanjaro-join-group-departures/",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
    overlayGradient: "from-black/90 via-black/50 to-black/30",
    overlayDirection: "to-t",
    overlayOpacity: 90,
    minHeight: "75vh",
    textAlignment: "center",
    showScrollIndicator: true,
  },
  "tailor-made-safari": {
    pageSlug: "tailor-made-safari",
    pageName: "Tailor-Made Safari",
    heroType: "image",
    title: "Your Safari,\nYour Way",
    subtitle:
      "No fixed itineraries. No compromises. We create unique Tanzania journeys designed entirely around your dreams, budget, and travel style.",
    badgeText: "Custom Itineraries",
    ctaPrimaryText: "Start Planning",
    ctaPrimaryUrl: "#inquiry-form",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg",
    overlayGradient: "from-black/80 via-black/50 to-transparent",
    overlayDirection: "to-r",
    overlayOpacity: 80,
    minHeight: "70vh",
    textAlignment: "left",
    showScrollIndicator: true,
  },
  zanzibar: {
    pageSlug: "zanzibar",
    pageName: "Zanzibar",
    heroType: "image",
    title: "Zanzibar Beach Holidays",
    subtitle:
      "The perfect ending to your Tanzania adventure. Pristine white sand beaches, turquoise waters, and rich Swahili culture.",
    backgroundImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Kwale-Island-q3hixrn6vumez8p4r8n0xtnsqincj7k0dg7q485hi8.jpg",
    overlayGradient: "from-black/60 via-black/20 to-transparent",
    overlayDirection: "to-t",
    overlayOpacity: 60,
    minHeight: "70vh",
    textAlignment: "bottom",
    showScrollIndicator: false,
  },
  "tanzania-day-tours": {
    pageSlug: "tanzania-day-tours",
    pageName: "Tanzania Day Tours",
    heroType: "gradient",
    title: "Tanzania Day Tours from Arusha",
    subtitle:
      "Short on time? Experience Tanzania's highlights with our expertly guided day tours and excursions.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--text)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  "kilimanjaro-join-group-departures": {
    pageSlug: "kilimanjaro-join-group-departures",
    pageName: "Group Departures",
    heroType: "gradient",
    title: "Kilimanjaro Join Group Departures",
    subtitle:
      "Join our scheduled group climbs with fixed departure dates. Share the adventure with fellow climbers from around the world.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--primary-dark)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  "contact-us": {
    pageSlug: "contact-us",
    pageName: "Contact Us",
    heroType: "gradient",
    title: "Let's Plan Your Dream Adventure",
    subtitle:
      "Whether you're dreaming of conquering Kilimanjaro, witnessing the Great Migration, or relaxing on Zanzibar's beaches, we're here to make it happen.",
    badgeText: "Get in Touch",
    gradientFrom: "#1e293b",
    gradientTo: "#0f172a",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  faq: {
    pageSlug: "faq",
    pageName: "FAQ",
    heroType: "gradient",
    title: "Frequently Asked Questions",
    subtitle:
      "Find answers to common questions about Kilimanjaro treks, Tanzania safaris, Zanzibar holidays, booking, payments, and more.",
    badgeText: "Help Center",
    gradientFrom: "#1e293b",
    gradientTo: "#0f172a",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
  blog: {
    pageSlug: "blog",
    pageName: "Blog",
    heroType: "gradient",
    title: "Blog",
    subtitle:
      "Travel tips, safari stories, and Kilimanjaro guides from our team of local experts.",
    gradientFrom: "var(--primary-dark)",
    gradientTo: "var(--text)",
    minHeight: "auto",
    textAlignment: "center",
    showScrollIndicator: false,
  },
};

export interface PageHeroData {
  pageSlug: string;
  pageName: string;
  heroType: string;
  title: string;
  subtitle?: string | null;
  badgeText?: string | null;
  ctaPrimaryText?: string | null;
  ctaPrimaryUrl?: string | null;
  ctaSecondaryText?: string | null;
  ctaSecondaryUrl?: string | null;
  backgroundImage?: string | null;
  overlayGradient?: string;
  overlayDirection?: string;
  overlayOpacity?: number;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  minHeight?: string;
  textAlignment?: string;
  textColor?: string | null;
  showScrollIndicator?: boolean;
}

export function getDefaultHeroes(): Record<string, PageHeroData> {
  return DEFAULT_HEROES;
}

interface PageHeroProps {
  pageSlug: string;
  children?: React.ReactNode;
}

export async function PageHero({ pageSlug, children }: PageHeroProps) {
  let hero: PageHeroData | null = null;

  try {
    const dbHero = await prisma.pageHero.findUnique({
      where: { pageSlug },
    });
    if (dbHero && dbHero.isActive) {
      hero = dbHero;
    }
  } catch {
    // Fall back to defaults on DB error
  }

  if (!hero) {
    hero = DEFAULT_HEROES[pageSlug] || null;
  }

  if (!hero) return null;

  const isImage = hero.heroType === "image" && hero.backgroundImage;
  const isGradient = hero.heroType === "gradient";
  const isAutoHeight = hero.minHeight === "auto";
  const textAlign = hero.textAlignment || "left";

  // Build alignment classes
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    bottom: "items-start text-left",
  }[textAlign] || "items-start text-left";

  const contentPosition = textAlign === "bottom" ? "justify-end" : "justify-center";

  // Render gradient hero (simpler style, no background image)
  if (isGradient) {
    const gradientFrom = hero.gradientFrom || "var(--primary-dark)";
    const gradientTo = hero.gradientTo || "var(--text)";

    return (
      <section
        className="text-white py-16 md:py-20"
        style={{
          background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl ${textAlign === "center" ? "mx-auto text-center" : ""}`}>
            {hero.badgeText && (
              <span className="text-[var(--secondary)] text-sm font-semibold uppercase tracking-wider">
                {hero.badgeText}
              </span>
            )}
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-4">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-xl text-white/80 leading-relaxed">
                {hero.subtitle}
              </p>
            )}
            {(hero.ctaPrimaryText || hero.ctaSecondaryText) && (
              <div className={`flex flex-wrap gap-4 mt-8 ${textAlign === "center" ? "justify-center" : ""}`}>
                {hero.ctaPrimaryText && hero.ctaPrimaryUrl && (
                  <Link
                    href={hero.ctaPrimaryUrl}
                    className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                  >
                    {hero.ctaPrimaryText}
                  </Link>
                )}
                {hero.ctaSecondaryText && hero.ctaSecondaryUrl && (
                  <Link
                    href={hero.ctaSecondaryUrl}
                    className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    {hero.ctaSecondaryText}
                  </Link>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }

  // Render image hero (full-width with overlay)
  if (isImage) {
    return (
      <section
        className="relative"
        style={{ minHeight: isAutoHeight ? undefined : hero.minHeight || "70vh" }}
      >
        <div className="absolute inset-0">
          <Image
            src={hero.backgroundImage!}
            alt={hero.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className={`absolute inset-0 bg-gradient-${hero.overlayDirection || "to-r"} ${hero.overlayGradient || "from-black/70 via-black/50 to-transparent"}`}
          />
        </div>

        <div className={`container mx-auto px-4 relative z-10 py-20 flex flex-col ${contentPosition}`}
          style={{ minHeight: isAutoHeight ? undefined : hero.minHeight || "70vh" }}
        >
          <div className={`max-w-2xl flex flex-col ${alignmentClasses}`}>
            {hero.badgeText && (
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold inline-block mb-4 w-fit">
                {hero.badgeText}
              </span>
            )}

            <h1
              className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line"
              style={{ color: hero.textColor || "white" }}
            >
              {hero.title}
            </h1>

            {hero.subtitle && (
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
            )}

            {(hero.ctaPrimaryText || hero.ctaSecondaryText) && (
              <div className="flex flex-wrap gap-4">
                {hero.ctaPrimaryText && hero.ctaPrimaryUrl && (
                  <Link
                    href={hero.ctaPrimaryUrl}
                    className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    {hero.ctaPrimaryText}
                  </Link>
                )}
                {hero.ctaSecondaryText && hero.ctaSecondaryUrl && (
                  <Link
                    href={hero.ctaSecondaryUrl}
                    className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    {hero.ctaSecondaryText}
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>
        </div>

        {hero.showScrollIndicator && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        )}
      </section>
    );
  }

  return null;
}
