import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  RouteHero,
  RoutePriceTable,
  RouteJoinGroupDepartures,
  RouteCTA,
  RouteItinerary,
  RouteQuickNav,
} from "@/components/routes";
import { InclusionsExclusions } from "@/components/ui/InclusionsExclusions";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { RouteCard } from "@/components/cards/RouteCard";
import { generateMetadata as genMeta, generateTripSchema, generateFAQSchema, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{ routeSlug: string }>;
}

// Fetch route from database
async function getRoute(slug: string) {
  const route = await prisma.trekkingRoute.findUnique({
    where: { slug },
  });
  return route;
}

// Get related routes (excluding current)
async function getRelatedRoutes(currentSlug: string) {
  const routes = await prisma.trekkingRoute.findMany({
    where: {
      slug: { not: currentSlug },
      isActive: true,
    },
    take: 3,
    select: {
      slug: true,
      title: true,
      duration: true,
      physicalRating: true,
    },
  });
  return routes;
}

// Get upcoming departures for this route
async function getUpcomingDepartures(routeId: string) {
  const departures = await prisma.groupDeparture.findMany({
    where: {
      routeId,
      status: "OPEN",
      startDate: { gte: new Date() },
    },
    take: 4,
    orderBy: { startDate: "asc" },
    include: {
      route: {
        select: {
          title: true,
          duration: true,
        },
      },
      _count: {
        select: { bookings: true },
      },
    },
  });

  return departures.map((d) => ({
    id: d.id,
    startDate: d.startDate,
    endDate: d.endDate,
    price: Number(d.price),
    spotsTotal: d.maxParticipants,
    spotsTaken: d._count.bookings,
    routeTitle: d.route.title,
    duration: d.route.duration,
    guideLanguage: "English",
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { routeSlug } = await params;
  const route = await getRoute(routeSlug);

  if (!route) {
    return { title: "Route Not Found" };
  }

  return genMeta({
    title: route.metaTitle || route.title,
    description: route.metaDescription || route.overview.slice(0, 160),
    url: `/trekking/${route.slug}/`,
  });
}

export default async function RoutePage({ params }: PageProps) {
  const { routeSlug } = await params;
  const route = await getRoute(routeSlug);

  if (!route) {
    notFound();
  }

  // Get related data
  const [relatedRoutes, departures] = await Promise.all([
    getRelatedRoutes(routeSlug),
    getUpcomingDepartures(route.id),
  ]);

  // Parse JSON fields
  const itinerary = (route.itinerary as {
    day: number;
    title: string;
    description: string;
    elevation?: string;
    distance?: string;
    camp?: string;
    image?: string;
    tags?: string[];
    meals?: string;
    duration?: string;
  }[] | null) || [];
  const faqs = (route.faqs as { question: string; answer: string }[] | null) || [];

  // Get lowest departure price for display
  const lowestPrice = departures.length > 0
    ? Math.min(...departures.map(d => d.price))
    : 1950; // Default price

  // Generate schemas
  const tripSchema = generateTripSchema({
    name: route.title,
    description: route.overview,
    url: `/trekking/${route.slug}/`,
    duration: route.duration,
    price: lowestPrice,
  });

  const productSchema = generateProductSchema({
    name: route.title,
    description: route.overview.slice(0, 300),
    url: `/trekking/${route.slug}/`,
    price: lowestPrice,
    ratingValue: 4.9,
    reviewCount: 47,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Trekking", url: "/trekking/" },
    { name: route.title, url: `/trekking/${route.slug}/` },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [tripSchema, productSchema, breadcrumbSchema];
  if (faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  return (
    <div>
      {/* Schema markup */}
      <MultiJsonLd schemas={schemas} />

      {/* Hero Section */}
      <RouteHero
        title={route.title}
        subtitle={route.overview.slice(0, 200) + "..."}
        badge={route.successRate ? `${route.successRate}% Success Rate` : "Popular Route"}
        duration={route.duration}
        difficulty={route.physicalRating || "Challenging"}
        successRate={route.successRate || 92}
        summitHeight="5,895m"
      />

      {/* Quick Navigation */}
      <RouteQuickNav price={lowestPrice} />

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <section id="overview" className="section">
                {/* Section Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--primary)]">
                    Route Overview
                  </h2>
                </div>

                <p className="text-[1.0625rem] text-[var(--text)] leading-[1.8] mb-6">
                  {route.overview}
                </p>

                {/* Highlight Cards - 3 Column Grid */}
                {route.highlights && route.highlights.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[var(--surface)] p-5 rounded-xl text-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md text-[var(--secondary)]">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                          <path d="M2 17l10 5 10-5"/>
                          <path d="M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <h4 className="font-heading font-semibold text-[0.9375rem] text-[var(--primary)] mb-1">
                        {route.highlights[0]}
                      </h4>
                      <p className="text-[0.8125rem] text-[var(--text-muted)]">
                        Unique experience
                      </p>
                    </div>
                    <div className="bg-[var(--surface)] p-5 rounded-xl text-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md text-[var(--secondary)]">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <h4 className="font-heading font-semibold text-[0.9375rem] text-[var(--primary)] mb-1">
                        {route.successRate || 92}% Success
                      </h4>
                      <p className="text-[0.8125rem] text-[var(--text-muted)]">
                        Industry-leading summit rate
                      </p>
                    </div>
                    <div className="bg-[var(--surface)] p-5 rounded-xl text-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md text-[var(--secondary)]">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <h4 className="font-heading font-semibold text-[0.9375rem] text-[var(--primary)] mb-1">
                        Small Groups
                      </h4>
                      <p className="text-[0.8125rem] text-[var(--text-muted)]">
                        Maximum 12 climbers
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <RouteItinerary days={itinerary} routeTitle={route.title} />
              )}

              {/* Inclusions/Exclusions */}
              <section id="inclusions" className="section">
                {/* Section Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--primary)]">
                    What&apos;s Included
                  </h2>
                </div>
                <InclusionsExclusions
                  inclusions={route.inclusions}
                  exclusions={route.exclusions}
                />
              </section>

              {/* FAQs */}
              {faqs.length > 0 && (
                <section id="faqs" className="section">
                  {/* Section Header with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-[var(--primary)]">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="bg-white border border-[var(--border)] rounded-xl group"
                      >
                        <summary className="p-5 cursor-pointer font-medium hover:text-[var(--primary)] flex items-center justify-between">
                          {faq.question}
                          <svg
                            className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </summary>
                        <div className="px-5 pb-5 text-[var(--text-muted)] leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Inquiry Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[var(--border)]">
                  <div className="bg-[var(--primary)] text-white px-6 py-5">
                    <h3 className="font-heading font-semibold text-lg">
                      Quick Inquiry
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-[0.9375rem] text-[var(--text-muted)] mb-4">
                      Get a personalized quote for your group. We&apos;ll respond within 24 hours.
                    </p>
                    <a
                      href="#pricing"
                      className="block w-full py-3.5 bg-[var(--secondary)] text-[var(--primary-dark)] font-heading font-bold text-center rounded-lg hover:bg-[var(--secondary-dark)] transition-all hover:-translate-y-0.5"
                    >
                      View Pricing
                    </a>
                    <a
                      href="#departures"
                      className="block text-center mt-3 text-[var(--primary)] font-medium hover:text-[var(--secondary-dark)] transition-colors"
                    >
                      See Departures →
                    </a>
                  </div>
                </div>

                {/* Expert Guide Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[var(--border)]">
                  <div className="bg-[var(--surface)] px-6 py-4 border-b border-[var(--border)]">
                    <h3 className="font-heading font-semibold">
                      Your Expert Guide
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <img
                        src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg"
                        alt="Guide Joseph"
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-[var(--surface)]"
                      />
                      <div className="font-heading font-semibold text-[var(--primary)]">
                        Joseph Mushi
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Lead Guide • 15+ Years Experience
                      </div>
                    </div>
                    <blockquote className="text-center text-[var(--text-muted)] italic text-sm mb-4 px-2 border-l-0">
                      &ldquo;The mountain teaches patience and rewards determination. Every step is a story.&rdquo;
                    </blockquote>
                    <button className="w-full py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-heading font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all">
                      Ask Joseph a Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Section */}
      <RoutePriceTable routeTitle={route.title} duration={route.duration} />

      {/* Departures Section */}
      {departures.length > 0 && (
        <RouteJoinGroupDepartures departures={departures} routeSlug={route.slug} />
      )}

      {/* CTA Section */}
      <RouteCTA routeSlug={route.slug} />

      {/* Related Routes */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-[var(--primary)] mb-2">
              Explore Other Routes
            </h2>
            <p className="text-[var(--text-muted)]">
              Compare routes to find your perfect Kilimanjaro adventure
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRoutes.map((related) => (
              <RouteCard key={related.slug} {...related} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
