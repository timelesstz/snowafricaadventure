import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Check, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import { TailorMadeForm } from "@/components/forms/TailorMadeForm";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { getExperienceYears, getTripAdvisorStats } from "@/lib/settings";

export const metadata: Metadata = genMeta({
  title: "Tailor-Made Tanzania Safari",
  description:
    "Design your perfect Tanzania safari. Custom itineraries for the Serengeti, Ngorongoro, Kilimanjaro & Zanzibar. Budget to luxury options. Expert local guides plan every detail.",
  url: "/tailor-made-safari/",
});

const R2 = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads";

const REASONS = [
  {
    icon: Calendar,
    title: "Flexible timing",
    description: "Travel on your schedule, not ours. Any duration, any dates.",
  },
  {
    icon: MapPin,
    title: "Your destinations",
    description: "Mix popular parks with hidden gems based on your interests.",
  },
  {
    icon: Users,
    title: "A private experience",
    description: "Your own vehicle, guide and schedule. No sharing with strangers.",
  },
];

const STEPS = [
  {
    title: "Tell us what you have in mind",
    description:
      "Share your interests, travel dates, group size, budget, and what you'd love to experience in Tanzania.",
  },
  {
    title: "Receive your custom itinerary",
    description:
      "Our experts design a journey around your answers, complete with accommodation options.",
  },
  {
    title: "Refine it together",
    description: "We adjust the itinerary with you until it's right. No pressure, no rush.",
  },
  {
    title: "Book and travel",
    description:
      "Confirm your trip with a deposit and we handle the logistics. You just show up and enjoy it.",
  },
];

const STYLES = [
  {
    title: "Classic safari",
    description: "The Northern Circuit: Serengeti, Ngorongoro, Tarangire and Lake Manyara.",
    image: `${R2}/2023/03/Serengeri-National-Park.jpg`,
  },
  {
    title: "Great Migration",
    description: "The herds on the move, with river crossings and predator action.",
    image: `${R2}/2023/03/32535628638_2be6219332_k-2.jpg`,
  },
  {
    title: "Kilimanjaro + safari",
    description: "Climb Africa's highest peak, then recover on game drives.",
    image: `${R2}/2024/07/kilitrekkers.webp`,
  },
  {
    title: "Family safari",
    description: "Shorter drives, engaging activities and family-friendly lodges.",
    image: `${R2}/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg`,
  },
  {
    title: "Honeymoon",
    description: "Intimate camps, private game drives and sundowners in the bush.",
    image: `${R2}/2023/03/Tarangire-National-Park.jpg`,
  },
  {
    title: "Photography safari",
    description: "Flexible timing and a guide who knows where the light and the animals will be.",
    image: `${R2}/2020/02/Liones2-1024x683.webp`,
  },
];

const INCLUDED = [
  "Personal safari consultant",
  "Custom itinerary design",
  "Private 4x4 safari vehicle",
  "Expert English-speaking guide",
  "All park entry fees",
  "Accommodation as selected",
  "All meals during safari",
  "Airport and hotel transfers",
  "Drinking water in the vehicle",
  "24/7 support during your trip",
  "Flexible payment options",
  "No booking fees",
];

const FAQS = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend at least 1 month for peak season (July-October, December-February) to secure the best lodges. Shorter notice is possible during shoulder seasons. We also welcome last-minute bookings. Accommodation may be limited by availability then, so some flexibility helps.",
  },
  {
    question: "What's the minimum duration for a safari?",
    answer:
      "We offer day trips, but we recommend at least 3-4 days for a proper safari. 5-7 days lets you explore several parks without rushing.",
  },
  {
    question: "Can you accommodate special requirements?",
    answer:
      "Yes. Dietary restrictions, mobility considerations, or specific interests like bird watching or photography: tell us in the form and we'll plan around them.",
  },
];

function SectionHeading({
  kicker,
  title,
  intro,
  dark = false,
  align = "center",
}: {
  kicker: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          dark ? "text-[var(--secondary)]" : "text-[var(--secondary-ink)]"
        }`}
      >
        {kicker}
      </p>
      <h2 className="mt-3 font-heading text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold leading-tight text-balance">
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 leading-relaxed ${dark ? "text-white/75" : "text-[var(--text-muted)]"}`}>{intro}</p>
      )}
    </div>
  );
}

export default async function TailorMadeSafariPage() {
  const [experienceYears, tripAdvisor] = await Promise.all([getExperienceYears(), getTripAdvisorStats()]);

  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tailor-Made Safari", url: "/tailor-made-safari/" },
          ]),
          generateFAQSchema(FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[min(78vh,760px)] items-end overflow-hidden">
        <Image
          src={`${R2}/2024/05/safaritanzania.jpg`}
          alt="Zebras grazing on the plains of northern Tanzania"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/60 to-black/45 md:bg-gradient-to-r md:from-black/85 md:via-black/55 md:to-black/5" />

        <div className="container mx-auto px-4 pb-14 pt-32 md:pb-20">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
              Tailor-made safari
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2.5rem,1.6rem+4vw,4.25rem)] font-bold leading-[1.05]">
              Your safari, your way
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              No fixed itineraries. No compromises. We create Tanzania journeys designed around your
              plans, your budget and the way you like to travel.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--secondary)] px-6 py-3.5 font-semibold text-[var(--primary-dark)] transition-colors hover:bg-[var(--secondary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start planning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/tanzania-safaris/"
                className="inline-flex items-center rounded-lg px-6 py-3.5 font-semibold text-white ring-1 ring-white/40 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View packages
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6 text-sm text-white/85">
              <li>
                <a
                  href={tripAdvisor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-white hover:underline"
                >
                  <Star className="h-4 w-4 fill-[var(--secondary)] text-[var(--secondary)]" aria-hidden="true" />
                  {tripAdvisor.rating.toFixed(1)} on TripAdvisor, {tripAdvisor.reviews}+ reviews
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" aria-hidden="true" />
                {experienceYears} years of experience
              </li>
              <li className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--secondary)]" aria-hidden="true" />
                Private vehicle and guide
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why tailor-made */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              kicker="Why tailor-made"
              title="A safari built around you"
              intro="Every traveler is different. A family with young children needs a different trip from a honeymoon couple or a photographer chasing the right light. A custom safari matches the trip to the people on it."
            />
          </div>
          {/* One column on laptops (lg), so the icon sits beside the text there
              instead of above it; three columns on tablets and wide screens. */}
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-y-0 xl:grid-cols-3 xl:gap-y-8">
            {REASONS.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="border-t border-[var(--border)] pt-6 lg:flex lg:gap-5 lg:py-6 xl:block xl:pb-0"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-tint)]">
                  <Icon className="h-[18px] w-[18px] text-[var(--secondary-ink)]" aria-hidden="true" />
                </span>
                <div className="mt-4 lg:mt-0 xl:mt-4">
                  <h3 className="font-heading text-base font-semibold lg:leading-9 xl:leading-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] lg:mt-0.5 xl:mt-2">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--primary-dark)] py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading dark kicker="How it works" title="From first message to first game drive" />
          <ol className="mx-auto mt-12 grid max-w-6xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-white/15 pt-6">
                <span className="font-heading text-sm font-semibold tabular-nums text-[var(--secondary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safari styles */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            kicker="Safari styles"
            title="Popular starting points"
            intro="Pick one as a starting point, or combine them. Every itinerary is planned from scratch."
          />
          <ul className="mx-auto mt-12 grid max-w-6xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {STYLES.map((style) => (
              <li key={style.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--primary-tint)]">
                  <Image
                    src={style.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{style.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{style.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              kicker="Included"
              title="Every tailor-made safari includes"
            />
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-[var(--border)] py-3.5 text-[var(--text)]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-acacia-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry-form" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                kicker="Start planning"
                title="Let's plan your safari"
                intro="The more you tell us, the closer our first draft will be to the trip you want."
              />
              <ul className="mt-8 space-y-3 text-sm text-[var(--text)]">
                {[
                  "We reply within 24-48 hours",
                  "We refine the plan with you until it's right",
                  "You pay a deposit only when you confirm",
                  "No booking fees",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-acacia-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={tripAdvisor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
              >
                <Star className="h-4 w-4 fill-[var(--secondary)] text-[var(--secondary)]" aria-hidden="true" />
                Read our {tripAdvisor.reviews}+ reviews on TripAdvisor
              </a>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-8 lg:col-span-8">
            <TailorMadeForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)] py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading kicker="FAQ" title="Common questions" />
          <div className="mt-10">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--primary-dark)] py-16 text-white md:py-20">
        <div className="container mx-auto flex flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold">Your adventure awaits</h2>
            <p className="mt-2 text-white/75">
              Skip the generic package tour. Tell us what you want and we&apos;ll build it.
            </p>
          </div>
          <a
            href="#inquiry-form"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--secondary)] px-6 py-3.5 font-semibold text-[var(--primary-dark)] transition-colors hover:bg-[var(--secondary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start your custom safari
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
