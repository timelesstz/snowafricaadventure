import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Users, Award, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { TripAdvisorWidget } from "@/components/reviews/TripAdvisorWidget";
import { generateMetadata as genMeta, generateItemListSchema, generateAggregateRatingSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import prisma from "@/lib/prisma";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari & Kilimanjaro Trekking | Snow Africa Adventure",
  description:
    "Locally owned Tanzania tour operator offering Kilimanjaro treks, wildlife safaris, and Zanzibar beach holidays. Expert guides, competitive prices, and authentic experiences since 2010.",
  url: "/",
});

// Default company info (overridden by database settings)
const DEFAULT_COMPANY_INFO = {
  tagline: "Travelling More Easy With Snow Africa Adventure",
  description: `Snow Africa Adventure is the authentic African safari specialist having its head office in Arusha, Tanzania. Being one of the reliable names in safari industry Snow Africa has arranged thousands of successful safari & trekking trips. We are a specialist of every aspect of Tanzania.`,
  valueProposition: `We are offering some of the finest and handpicked pricing packages that are suitable for all types of budget. We are constantly researching on improving our services as well our aim is to provide our clients with the best services within their pocket-friendly budget.`,
  registration: {
    name: "Snow Africa Adventures Limited",
    incorporationNo: "90147",
    vatNo: "40311448-A",
    tinNo: "116-858-398",
    talaLicense: "",
    trekkingLicense: "",
    year: "2026",
  },
  tripAdvisor: {
    rating: 5,
    reviews: 115,
    url: "https://www.tripadvisor.com/Attraction_Review-g317084-d17523583-Reviews-Snow_Africa_Adventure-Arusha_Arusha_Region.html",
  },
};

const DEFAULT_STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "5,000+", label: "Happy Travelers" },
  { value: "93%", label: "Summit Success" },
  { value: "4.9", label: "TripAdvisor Rating" },
];

const DEFAULT_HERO = {
  badge: "Tanzania's Trusted Adventure Partner",
  title: "Climb Kilimanjaro.\nSafari Tanzania.",
  subtitle: "Summit Africa's highest peak. Witness the Great Migration. Relax on Zanzibar beaches. Your adventure of a lifetime starts with Tanzania's most trusted local operator.",
  image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
};

function getWhyUsItems(talaLicense: string) {
  return [
    {
      icon: Users,
      title: "100% Locally Owned",
      description: "Based in Arusha since 2010. Your money supports local families and communities directly. No middlemen, no overseas offices.",
    },
    {
      icon: Shield,
      title: "Safety First Always",
      description: "KINAPA-certified guides, satellite phones, pulse oximeters, quality gear, and strict emergency protocols on every expedition.",
    },
    {
      icon: Award,
      title: "TATO & KPAP Certified",
      description: talaLicense
        ? `Licensed member of Tanzania Association of Tour Operators (TALA No: ${talaLicense}). Proud partner of Kilimanjaro Porters Assistance Project.`
        : `Licensed member of Tanzania Association of Tour Operators. Proud partner of Kilimanjaro Porters Assistance Project.`,
    },
    {
      icon: Star,
      title: "115+ Five-Star Reviews",
      description: "4.9 average rating on TripAdvisor and SafariBookings from verified travelers worldwide. Excellence is our standard.",
    },
  ];
}

const destinations = [
  {
    title: "Zanzibar Beach Escapes",
    description: "Pristine beaches, spice tours & Stone Town heritage",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Kwale-Island-q3hixrn6vumez8p4r8n0xtnsqincj7k0dg7q485hi8.jpg",
    href: "/zanzibar/",
    wide: true,
  },
  {
    title: "Cultural Tours",
    description: "Maasai villages & coffee farms",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Arusha-City-Day-Trip.jpg",
    href: "/tanzania-day-tours/",
  },
  {
    title: "Day Tours",
    description: "Waterfalls & wildlife in a day",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Day-trips.jpg",
    href: "/tanzania-day-tours/",
  },
  {
    title: "Serengeti",
    description: "Endless plains & Big Five",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    href: "/tanzania-destinations/serengeti-national-park/",
  },
  {
    title: "Ngorongoro Crater",
    description: "World's largest caldera",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    href: "/tanzania-destinations/ngorongoro-conservation-area/",
  },
  {
    title: "The Great Migration",
    description: "Witness the world's greatest wildlife spectacle",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
    href: "/great-wildebeest-migration/",
    wide: true,
  },
];

// Fetch homepage settings from database
async function getHomepageSettings() {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { startsWith: "homepage." } },
  });

  const settingsMap: Record<string, string> = {};
  settings.forEach(s => { settingsMap[s.key] = s.value; });

  return {
    hero: {
      badge: settingsMap["homepage.hero.badge"] || DEFAULT_HERO.badge,
      title: settingsMap["homepage.hero.title"] || DEFAULT_HERO.title,
      subtitle: settingsMap["homepage.hero.subtitle"] || DEFAULT_HERO.subtitle,
      image: settingsMap["homepage.hero.image"] || DEFAULT_HERO.image,
    },
    stats: [
      { value: settingsMap["homepage.stats.experience"] || DEFAULT_STATS[0].value, label: settingsMap["homepage.stats.experienceLabel"] || DEFAULT_STATS[0].label },
      { value: settingsMap["homepage.stats.travelers"] || DEFAULT_STATS[1].value, label: settingsMap["homepage.stats.travelersLabel"] || DEFAULT_STATS[1].label },
      { value: settingsMap["homepage.stats.success"] || DEFAULT_STATS[2].value, label: settingsMap["homepage.stats.successLabel"] || DEFAULT_STATS[2].label },
      { value: settingsMap["homepage.stats.rating"] || DEFAULT_STATS[3].value, label: settingsMap["homepage.stats.ratingLabel"] || DEFAULT_STATS[3].label },
    ],
    company: {
      tagline: settingsMap["homepage.company.tagline"] || DEFAULT_COMPANY_INFO.tagline,
      description: settingsMap["homepage.company.description"] || DEFAULT_COMPANY_INFO.description,
      valueProposition: settingsMap["homepage.company.valueProposition"] || DEFAULT_COMPANY_INFO.valueProposition,
    },
    registration: {
      name: settingsMap["homepage.registration.name"] || DEFAULT_COMPANY_INFO.registration.name,
      incorporationNo: settingsMap["homepage.registration.incorporationNo"] || DEFAULT_COMPANY_INFO.registration.incorporationNo,
      vatNo: settingsMap["homepage.registration.vatNo"] || DEFAULT_COMPANY_INFO.registration.vatNo,
      tinNo: settingsMap["homepage.registration.tinNo"] || DEFAULT_COMPANY_INFO.registration.tinNo,
      talaLicense: settingsMap["homepage.registration.talaLicense"] || "",
      trekkingLicense: settingsMap["homepage.registration.trekkingLicense"] || "",
    },
    tripAdvisor: {
      rating: parseInt(settingsMap["homepage.tripadvisor.rating"]) || DEFAULT_COMPANY_INFO.tripAdvisor.rating,
      reviews: parseInt(settingsMap["homepage.tripadvisor.reviews"]) || DEFAULT_COMPANY_INFO.tripAdvisor.reviews,
      url: settingsMap["homepage.tripadvisor.url"] || DEFAULT_COMPANY_INFO.tripAdvisor.url,
    },
  };
}

const ALLOWED_IMAGE_HOSTS = [
  "pub-cf9450d27ca744f1825d1e08b392f592.r2.dev",
  "cdn.snowafricaadventure.com",
  "snowafricaadventure.com",
];

function safeImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url) return fallback;
  try {
    const hostname = new URL(url).hostname;
    if (ALLOWED_IMAGE_HOSTS.some((h) => hostname === h || hostname.endsWith(".r2.cloudflarestorage.com"))) return url;
  } catch {}
  return fallback;
}

// Fetch data from database
async function getHomePageData() {
  const [routes, safaris, blogPosts, featuredDeparture] = await Promise.all([
    // Get featured trekking routes
    prisma.trekkingRoute.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        title: true,
        duration: true,
        physicalRating: true,
        successRate: true,
        featuredImage: true,
        overview: true,
      },
      orderBy: { createdAt: "asc" },
      take: 6,
    }),
    // Get featured safaris
    prisma.safariPackage.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        title: true,
        duration: true,
        type: true,
        priceFrom: true,
        featuredImage: true,
        overview: true,
      },
      orderBy: { createdAt: "asc" },
      take: 5,
    }),
    // Get latest blog posts
    prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    // Get next featured departure
    prisma.groupDeparture.findFirst({
      where: {
        status: "OPEN",
        startDate: { gte: new Date() },
        isFeatured: true,
      },
      include: {
        route: { select: { title: true, slug: true } },
      },
      orderBy: { startDate: "asc" },
    }),
  ]);

  return { routes, safaris, blogPosts, featuredDeparture };
}

export default async function HomePage() {
  const [{ routes, safaris, blogPosts, featuredDeparture }, homepageSettings] = await Promise.all([
    getHomePageData(),
    getHomepageSettings(),
  ]);

  const { hero, stats, company, registration, tripAdvisor } = homepageSettings;
  const whyUsItems = getWhyUsItems(registration.talaLicense);

  // Split routes for display
  const routeList = routes.slice(0, 4);
  const routeCards = routes.slice(0, 3);

  // Split safaris - first one featured, rest in stack
  const featuredSafari = safaris[0];
  const safariStack = safaris.slice(1, 5);

  const routesListSchema = generateItemListSchema(
    routes.map((route, idx) => ({
      name: route.title,
      url: `/trekking/${route.slug}/`,
      description: route.overview?.substring(0, 150) || `${route.duration} Kilimanjaro trek`,
      position: idx + 1,
    }))
  );

  const ratingSchema = generateAggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: tripAdvisor.reviews,
    itemName: SITE_CONFIG.name,
    itemType: "TourOperator",
  });

  return (
    <div className="homepage-hybrid">
      <MultiJsonLd schemas={[routesListSchema, ratingSchema]} />

      {/* ============================================
          HERO - Immersive Fullscreen with Stats Bar
          ============================================ */}
      <section className="hero-section">
        <div className="hero-bg">
          <Image
            src={hero.image}
            alt="Mount Kilimanjaro at sunrise"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            fetchPriority="high"
            quality={85}
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <span className="hero-badge">
            <Star className="w-4 h-4" fill="currentColor" />
            {hero.badge}
          </span>
          <h1 className="hero-title">
            {hero.title.split('\n').map((line, i) => (
              <span key={i}>
                {i === 0 ? line : <span>{line}</span>}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            {hero.subtitle}
          </p>
          <div className="hero-ctas">
            <Link href="/trekking/" className="btn btn-primary">
              Explore Kilimanjaro
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tanzania-safaris/" className="btn btn-outline-white">
              View Safari Packages
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>

        <div className="hero-stats-bar">
          <div className="container mx-auto px-4">
            <div className="hero-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat">
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST BADGES - Static with Hover Effects
          ============================================ */}
      <div className="trust-badges">
        <div className="container mx-auto px-4">
          <div className="trust-badges-grid">
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <Award className="w-6 h-6" />
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-value">15+ Years</span>
                <span className="trust-badge-label">Locally Owned</span>
              </div>
            </div>
            <div className="trust-badge-divider" />
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <Star className="w-6 h-6" fill="currentColor" />
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-value">115+</span>
                <span className="trust-badge-label">5-Star Reviews</span>
              </div>
            </div>
            <div className="trust-badge-divider" />
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <Shield className="w-6 h-6" />
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-value">TATO</span>
                <span className="trust-badge-label">Licensed Operator</span>
              </div>
            </div>
            <div className="trust-badge-divider" />
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <Users className="w-6 h-6" />
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-value">KPAP</span>
                <span className="trust-badge-label">Certified Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          ABOUT SECTION - Company Introduction
          ============================================ */}
      <section className="about-intro-section">
        <div className="container mx-auto px-4">
          <div className="about-intro-grid">
            <div className="about-intro-content">
              <span className="section-label">About Us</span>
              <h2>{company.tagline}</h2>
              <p className="about-intro-lead">{company.description}</p>
              <p>{company.valueProposition}</p>
              <div className="about-registration">
                <h4>Registered & Licensed</h4>
                <ul>
                  <li><strong>Company:</strong> {registration.name}</li>
                  <li><strong>Registration No:</strong> {registration.incorporationNo}</li>
                  <li><strong>VAT No:</strong> {registration.vatNo}</li>
                  <li><strong>TIN:</strong> {registration.tinNo}</li>
                  {registration.talaLicense && <li><strong>Tour Operator License:</strong> {registration.talaLicense}</li>}
                  {registration.trekkingLicense && <li><strong>Trekking License:</strong> {registration.trekkingLicense}</li>}
                </ul>
              </div>
              <Link href="/about-us/" className="btn btn-secondary">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="about-intro-image">
              <Image
                src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/39339368385_20d92a678c_k.jpg"
                alt="Snow Africa Adventure Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="tripadvisor-badge">
                <div className="tripadvisor-badge-inner">
                  <div className="tripadvisor-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <span className="tripadvisor-rating">{tripAdvisor.rating}.0</span>
                  <span className="tripadvisor-text">TripAdvisor</span>
                  <span className="tripadvisor-reviews">{tripAdvisor.reviews}+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          KILIMANJARO - Split + Magazine Cards
          ============================================ */}
      <section className="kili-section">
        <div className="kili-content">
          <span className="section-label">Kilimanjaro Trekking</span>
          <h2>7 Routes to Africa&apos;s Highest Peak</h2>
          <p>Choose from proven routes to the summit. Our certified guides have summited over 500 times with an industry-leading 93% success rate.</p>

          <ul className="routes-list">
            {routeList.map((route) => (
              <li key={route.slug} className="route-item">
                <Link href={`/trekking/${route.slug}/`} className="route-item-link">
                  <span className="route-item-name">{route.title}</span>
                  <div className="route-item-meta">
                    <span>{route.duration}</span>
                    <span>{route.successRate ? `${route.successRate}% Success` : route.physicalRating}</span>
                  </div>
                  <ArrowRight className="route-item-arrow" />
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/trekking/" className="btn btn-secondary">View All Routes</Link>

          <div className="departures-cta">
            <h3>Join a Group Climb & Save</h3>
            <p>
              {featuredDeparture
                ? `Next departure: ${featuredDeparture.route.title} - ${new Date(featuredDeparture.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                : "Join climbers from around the world on our scheduled departures. Fixed dates, lower prices, shared adventure."
              }
            </p>
            <Link href="/kilimanjaro-join-group-departures/" className="btn btn-secondary">View 2025-2026 Departures</Link>
          </div>
        </div>

        <div className="kili-cards">
          {routeCards.map((route, i) => (
            <Link
              key={route.slug}
              href={`/trekking/${route.slug}/`}
              className={`route-card ${i === 0 ? 'featured' : ''}`}
            >
              <Image
                src={safeImageUrl(route.featuredImage, "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/49c04fa0-2704-4624-aaf4-59db6de1f1f5.jpg")}
                alt={route.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="route-card-overlay">
                <span className="route-card-tag">{i === 0 ? 'Most Popular' : route.physicalRating}</span>
                <h3>{route.title}</h3>
                <p>{route.overview?.substring(0, 60)}...</p>
                <div className="route-card-meta">
                  <span>{route.duration}</span>
                  <span>{route.physicalRating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
          SAFARI - Magazine Feature + Stack
          ============================================ */}
      <section className="safari-section">
        <div className="container mx-auto px-4">
          <div className="magazine-header">
            <div>
              <h2>Tanzania Wildlife Safaris</h2>
              <p>From the Serengeti&apos;s Great Migration to Ngorongoro Crater&apos;s wildlife paradise. Budget to luxury options.</p>
            </div>
            <Link href="/tanzania-safaris/" className="view-all-link">
              View All Safaris
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="safari-feature-grid">
            {featuredSafari && (
              <Link href={`/tanzania-safaris/${featuredSafari.slug}/`} className="safari-main">
                <Image
                  src={safeImageUrl(featuredSafari.featuredImage, "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg")}
                  alt={featuredSafari.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  loading="lazy"
                />
                <div className="safari-main-overlay">
                  <span className="badge badge-secondary">{featuredSafari.type}</span>
                  <h3>{featuredSafari.title}</h3>
                  <p>{featuredSafari.overview?.substring(0, 120)}...</p>
                  {featuredSafari.priceFrom && (
                    <div className="safari-price">
                      ${Number(featuredSafari.priceFrom).toLocaleString()} <span>/ per person</span>
                    </div>
                  )}
                </div>
              </Link>
            )}

            <div className="safari-stack">
              {safariStack.map((safari) => (
                <Link key={safari.slug} href={`/tanzania-safaris/${safari.slug}/`} className="safari-item">
                  <div className="safari-item-image">
                    <Image
                      src={safeImageUrl(safari.featuredImage, "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Rhino-Lodge_View-from-outside-towards-dining-area.jpg")}
                      alt={safari.title}
                      width={140}
                      height={110}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="safari-item-content">
                    <h4>{safari.title}</h4>
                    <div className="safari-item-meta">
                      <span>{safari.duration}</span>
                      <span>{safari.type}</span>
                    </div>
                    {safari.priceFrom && (
                      <span className="safari-item-price">From ${Number(safari.priceFrom).toLocaleString()}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="safari-cta-banner">
            <div>
              <h3>Can&apos;t Find What You&apos;re Looking For?</h3>
              <p>We specialize in tailor-made safaris designed around your interests, schedule, and budget.</p>
            </div>
            <Link href="/tailor-made-safari/" className="btn btn-primary">Design Your Safari</Link>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY US - Split Section
          ============================================ */}
      <section className="why-section">
        <div className="why-image">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Banner-1920x768px5-2.webp"
            alt="Snow Africa Team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="why-content">
          <span className="section-label">Why Snow Africa</span>
          <h2>Tanzania&apos;s Most Trusted Operator</h2>
          <p>What sets us apart from the rest</p>

          <div className="why-us-list">
            {whyUsItems.map((item, i) => (
              <div key={i} className="why-item">
                <div className="why-icon">
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS - TripAdvisor Reviews Widget
          ============================================ */}
      <section className="testimonials-minimal">
        <div className="container mx-auto px-4">
          <div className="testimonials-header-minimal">
            <span className="section-label">What Travelers Say</span>
            <h2>Real Stories, Real Adventures</h2>
          </div>

          {/* TripAdvisor Reviews Widget powered by Trustindex */}
          <TripAdvisorWidget variant="slider" className="my-8" />

          <div className="testimonials-footer">
            <div className="tripadvisor-inline">
              <span className="tripadvisor-score">{tripAdvisor.rating}.0</span>
              <div>
                <div className="tripadvisor-stars-inline">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" fill="currentColor" />
                  ))}
                </div>
                <span>{tripAdvisor.reviews}+ reviews on TripAdvisor</span>
              </div>
            </div>
            <a
              href={tripAdvisor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Read all reviews
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          DESTINATIONS - Bento Grid
          ============================================ */}
      <section className="destinations-section">
        <div className="container mx-auto px-4">
          <div className="destinations-header">
            <span className="section-label">More Adventures</span>
            <h2>Explore Beyond</h2>
            <p>Tanzania offers countless experiences beyond Kilimanjaro and safaris. Discover beach escapes, cultural tours, and day trips.</p>
          </div>

          <div className="destinations-bento">
            {destinations.map((dest, i) => (
              <Link key={i} href={dest.href} className={`destination-card ${dest.wide ? 'wide' : ''}`}>
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover"
                  sizes={dest.wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  loading="lazy"
                />
                <div className="destination-overlay">
                  <h4>{dest.title}</h4>
                  <p>{dest.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT - Split Layout
          ============================================ */}
      <section className="contact-section">
        <div className="contact-image">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/28939626580_da4be2e4b1_k.jpg"
            alt="Safari landscape"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="contact-image-overlay">
            <span className="section-label">Start Planning</span>
            <h2>Your Adventure Awaits</h2>
            <p>Tell us about your dream trip and our Tanzania experts will create a custom proposal within 24 hours. No obligation, no spam - just expert advice.</p>

            <div className="contact-steps">
              <div className="contact-step">
                <span className="contact-step-number">1</span>
                <span>Share your travel dates and interests</span>
              </div>
              <div className="contact-step">
                <span className="contact-step-number">2</span>
                <span>Receive a custom itinerary within 24 hours</span>
              </div>
              <div className="contact-step">
                <span className="contact-step-number">3</span>
                <span>Refine together until it&apos;s perfect</span>
              </div>
            </div>

            <div className="contact-info-box">
              <div className="contact-info-item">
                <Phone className="w-5 h-5" />
                <div>
                  <p>Call or WhatsApp</p>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>{SITE_CONFIG.phone}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Mail className="w-5 h-5" />
                <div>
                  <p>Email Us</p>
                  <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <MapPin className="w-5 h-5" />
                <div>
                  <p>Visit Us</p>
                  <span>{SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form-side">
          <h3>Get Your Free Quote</h3>
          <p>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
          <InquiryForm variant="sidebar" />
        </div>
      </section>

      {/* ============================================
          BLOG
          ============================================ */}
      <section className="blog-section-home">
        <div className="container mx-auto px-4">
          <div className="magazine-header">
            <div>
              <h2>From Our Blog</h2>
              <p>Tips, guides, and stories from Tanzania</p>
            </div>
            <Link href="/blog/" className="view-all-link">
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="blog-grid-home">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}/`} className="blog-card-home">
                  <div className="blog-card-image">
                    <Image
                      src={safeImageUrl(post.featuredImage, "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/09/kilimanjaro-342702_1280.jpg")}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <h4>{post.title}</h4>
                    <p>{post.excerpt?.substring(0, 100) || "Read more about this topic..."}</p>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback if no blog posts
              <>
                <Link href="/best-time-to-climb-mount-kilimanjaro/" className="blog-card-home">
                  <div className="blog-card-image">
                    <Image
                      src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/09/kilimanjaro-342702_1280.jpg"
                      alt="Best Time to Climb Kilimanjaro"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <h4>Best Time to Climb Kilimanjaro</h4>
                    <p>A month-by-month guide to choosing the perfect time for your Kilimanjaro adventure.</p>
                  </div>
                </Link>
                <Link href="/great-wildebeest-migration/" className="blog-card-home">
                  <div className="blog-card-image">
                    <Image
                      src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/09/safari-3242983_1280.jpg"
                      alt="Great Migration Guide"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <h4>Great Migration Guide 2025</h4>
                    <p>Track the annual wildebeest migration through Tanzania.</p>
                  </div>
                </Link>
                <Link href="/climbing-kilimanjaro/" className="blog-card-home">
                  <div className="blog-card-image">
                    <Image
                      src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/09/mount-kilimanjaro-278082_1280.jpg"
                      alt="Climbing Kilimanjaro"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <h4>Climbing Kilimanjaro: Complete Guide</h4>
                    <p>Everything you need to know about climbing Africa&apos;s highest peak.</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
