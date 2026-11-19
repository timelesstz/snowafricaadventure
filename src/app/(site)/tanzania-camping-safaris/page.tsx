import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Tent, ChevronDown, Shield, Binoculars, ArrowRight, PawPrint, Mountain, TreeDeciduous, Bird } from "lucide-react";
import prisma from "@/lib/prisma";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { GuideQuoteSection } from "@/components/forms/GuideQuoteSection";

// Prices come from the safari packages in the database, so edits in the admin
// show up here within five minutes.
export const revalidate = 300;

export const metadata: Metadata = genMeta({
  title: "Tanzania Budget Camping Safaris & Prices",
  description:
    "Budget camping safaris in Tanzania: 3, 5 and 6 days in Tarangire, Lake Manyara, the Serengeti and Ngorongoro, with your guide, cook, meals, park fees and camping gear included.",
  url: "/tanzania-camping-safaris/",
});

// The three budget camping safaris, shortest first. Titles, images and prices
// are read from the database; these slugs only pick and order them.
const CAMPING_SLUGS = [
  "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater",
  "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro",
  "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater",
];
const SAMPLE_SLUG = CAMPING_SLUGS[1];
const TENTED_CAMP_SLUG = "7-days-tanzania-tented-camp-safari";

type Tier = { groupSize: string; price: number };
type ItineraryDay = { day: number; title: string; description: string };

function tierPrice(tiers: Tier[], match: RegExp): number | null {
  const tier = tiers.find((t) => match.test(t.groupSize));
  return tier ? Number(tier.price) : null;
}

async function getCampingSafaris() {
  try {
    const rows = await prisma.safariPackage.findMany({
      where: { slug: { in: [...CAMPING_SLUGS, TENTED_CAMP_SLUG] }, isActive: true },
      select: {
        slug: true,
        title: true,
        duration: true,
        durationDays: true,
        featuredImage: true,
        priceFrom: true,
        pricingTiers: true,
        inclusions: true,
        itinerary: true,
      },
    });
    return rows.map((row) => {
      const tiers = (row.pricingTiers as Tier[] | null) || [];
      return {
        ...row,
        solo: tierPrice(tiers, /^1\s/),
        small: tierPrice(tiers, /^2/),
        priceFrom: row.priceFrom ? Number(row.priceFrom) : null,
      };
    });
  } catch (error) {
    // The page still renders without prices if the database is unreachable.
    console.error("[Camping safaris] Failed to load packages:", error);
    return [];
  }
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const topParks = [
  {
    name: "Serengeti National Park",
    icon: PawPrint,
    highlight: "Big cats all year",
    href: "/tanzania-destinations/serengeti-national-park/",
    description:
      "The public campsites in the central Serengeti put you close to some of the park's best predator viewing. Where the wildebeest migration is depends on the month.",
  },
  {
    name: "Ngorongoro Conservation Area",
    icon: Mountain,
    highlight: "Crater floor & rim campsite",
    href: "/tanzania-destinations/ngorongoro-conservation-area/",
    description:
      "Camping trips spend the night at Simba Campsite on the crater rim, then drive down to the crater floor in the morning. The rim is high, so nights are cold.",
  },
  {
    name: "Tarangire National Park",
    icon: TreeDeciduous,
    highlight: "Elephants & baobabs",
    href: "/tanzania-destinations/tarangire-national-park/",
    description:
      "Known for big elephant herds and baobab trees. It is at its best in the dry season, when animals gather along the Tarangire River.",
  },
  {
    name: "Lake Manyara National Park",
    icon: Bird,
    highlight: "Forest, lake & birdlife",
    href: "/tanzania-destinations/lake-manyara-national-park/",
    description:
      "A small park below the Rift Valley escarpment, with groundwater forest, a soda lake and good birdlife. A good first game drive on the way west.",
  },
];

const included = [
  "Safari vehicle with your guide driving",
  "A cook who travels with you",
  "All meals on safari",
  "National park fees",
  "Campsite fees",
  "Tents and camping equipment",
  "Sleeping pad",
  "Sleeping bag on the 3-day safari",
];

const faqs = [
  {
    question: "Is camping on safari in Tanzania safe?",
    answer:
      "Yes, if you follow your guide's rules. Public campsites in Tanzania's parks are not fenced, so wild animals do walk through camp, especially at night, but serious incidents are rare. Keep food out of your tent, keep the tent zipped shut, and check outside with a torch before you leave it after dark. Your guide briefs you at the first campsite.",
  },
  {
    question: "What is the difference between a camping and a lodge safari?",
    answer:
      "The game drives are the same. The difference is the night: on a camping safari you sleep in a tent at a public campsite, share its toilet and shower block, and eat what your cook makes. A lodge gives you a room, a private bathroom and a restaurant, and costs more.",
  },
  {
    question: "Can I do a Tanzania camping safari on my own?",
    answer:
      "Yes. A solo traveller pays the one-person price, because the vehicle, guide and cook cost the same whether there is one guest or four. Each safari page lists the price for every group size.",
  },
  {
    question: "What should I pack for a camping safari?",
    answer:
      "A head torch, warm layers for early drives and the cold Ngorongoro rim, sun hat and sun cream, insect repellent, flip-flops for the shower block and a soft bag. Tents and sleeping pads are included. The 3-day safari includes a sleeping bag; on the longer trips, bring your own or ask us.",
  },
];

export default async function TanzaniaCampingSafarisPage() {
  const packages = await getCampingSafaris();
  const camping = CAMPING_SLUGS.map((slug) => packages.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const tentedCamp = packages.find((p) => p.slug === TENTED_CAMP_SLUG);
  const sample = packages.find((p) => p.slug === SAMPLE_SLUG);
  const sampleDays = ((sample?.itinerary as ItineraryDay[] | null) || []).slice().sort((a, b) => a.day - b.day);

  const smallGroupPrices = camping.map((p) => p.small).filter((n): n is number => n !== null);
  const lowestPrice = smallGroupPrices.length ? Math.min(...smallGroupPrices) : null;
  const days = camping.map((p) => p.durationDays);
  const dayRange = days.length ? `${Math.min(...days)}–${Math.max(...days)} Days` : null;

  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Camping Safaris", url: "/tanzania-camping-safaris/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="Open plains of the Serengeti, where our camping safaris spend the night"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-[var(--primary-dark)] rounded-full text-sm font-semibold">
                Budget Camping
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Tanzania Camping Safari
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              The same parks and game drives, for less, with a tent instead of a lodge room
            </p>
            <p className="text-base text-white/80 mb-8 leading-relaxed">
              You sleep at public campsites inside or next to the parks. A cook travels with you and
              makes every meal, and your guide drives. At night there is only canvas between you and
              the bush.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                lowestPrice !== null && { label: `From ${usd(lowestPrice)}`, sub: "Per person, 2–4 people" },
                dayRange && { label: dayRange, sub: "Three set safaris" },
                { label: "4 Parks", sub: "Northern circuit" },
                { label: "Cook & Fees", sub: "Included" },
              ]
                .filter((stat): stat is { label: string; sub: string } => Boolean(stat))
                .map((stat) => (
                  <div key={stat.label} className="text-white">
                    <p className="text-2xl font-bold text-[var(--secondary)]">{stat.label}</p>
                    <p className="text-sm text-white/70">{stat.sub}</p>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#camping-safaris"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow-lg hover:shadow-xl"
              >
                See the Camping Safaris
              </a>
              <Link
                href="/tailor-made-safari/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors"
              >
                Plan a Custom Trip
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* What is a Camping Safari */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              What is a Tanzania Camping Safari?
            </h2>
            <p className="text-[var(--text-muted)] text-base">
              Most of the day is the same as on a lodge safari: the same 4x4, the same roads, the same
              animals. The difference comes in the evening. You pitch up at a campsite, wash in the
              shared shower block, eat at a camp table, and sleep in a dome tent on a sleeping pad.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Tent className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Close to the bush</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Campsites are often deep inside the park, so you spend less time driving at dawn and dusk.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lower cost</h3>
              <p className="text-sm text-[var(--text-muted)]">
                {camping[0]?.small != null
                  ? `No lodge bill. Our ${camping[0].durationDays}-day camping safari is ${usd(camping[0].small)} per person for 2 to 4 people, park fees included.`
                  : "No lodge bill. Camping costs less than a lodge safari, with park fees included in the price."}
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Binoculars className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">The sounds at night</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Hyenas calling, lions in the distance, buffalo grazing near camp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Camping Safaris */}
      <section id="camping-safaris" className="py-16 bg-[var(--surface)] scroll-mt-24">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Prices Per Person
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Our Budget Camping Safaris
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Prices are in US dollars and fall as your group grows, because the vehicle, guide and cook
            are shared. Each safari page shows the price for every group size.
          </p>

          {camping.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {camping.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/tanzania-safaris/${trip.slug}/`}
                  className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {trip.featuredImage && (
                      <Image
                        src={trip.featuredImage}
                        alt={trip.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-[var(--secondary)] text-[var(--primary-dark)] rounded-full text-xs font-semibold">
                        {trip.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-4 group-hover:text-[var(--primary)] transition-colors">
                      {trip.title}
                    </h3>
                    <dl className="grid grid-cols-2 gap-3 mb-5 text-sm">
                      {trip.small !== null && (
                        <div className="rounded-lg bg-[var(--surface)] p-3">
                          <dt className="text-[var(--text-muted)]">2–4 people</dt>
                          <dd className="font-bold text-lg text-[var(--text)]">{usd(trip.small)}</dd>
                        </div>
                      )}
                      {trip.solo !== null && (
                        <div className="rounded-lg bg-[var(--surface)] p-3">
                          <dt className="text-[var(--text-muted)]">Solo traveller</dt>
                          <dd className="font-bold text-lg text-[var(--text)]">{usd(trip.solo)}</dd>
                        </div>
                      )}
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                      See the itinerary and all prices
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--text-muted)]">
              Our camping safari prices didn&apos;t load just now. You can{" "}
              <Link href="/tanzania-safaris/" className="text-[var(--primary)] font-semibold underline">
                browse every safari
              </Link>{" "}
              or ask us for a quote below.
            </p>
          )}

          {tentedCamp && (
            <p className="text-center text-sm text-[var(--text-muted)] mt-10 max-w-2xl mx-auto">
              Would you rather sleep in a bed? Our{" "}
              <Link
                href={`/tanzania-safaris/${tentedCamp.slug}/`}
                className="text-[var(--primary)] font-semibold underline"
              >
                {tentedCamp.durationDays}-day tented camp safari
              </Link>{" "}
              uses permanent tents with proper beds and their own bathrooms
              {tentedCamp.priceFrom !== null && <>, from {usd(tentedCamp.priceFrom)} per person</>}.
            </p>
          )}
        </div>
      </section>

      {/* Top Parks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Where You Camp
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            The Parks on Our Camping Safaris
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topParks.map((park) => (
              <Link
                key={park.name}
                href={park.href}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <park.icon className="w-6 h-6 text-amber-600" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-base mb-1">{park.name}</h3>
                <p className="text-xs font-semibold text-[var(--secondary)] mb-3 uppercase tracking-wide">
                  {park.highlight}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{park.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      {sample && sampleDays.length > 0 && (
        <section className="py-16 bg-[var(--primary-dark)] text-white">
          <div className="container mx-auto px-4">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Day by Day
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Our {sample.durationDays}-Day Camping Safari
            </h2>
            <ol className="max-w-3xl mx-auto space-y-4">
              {sampleDays.map((day) => (
                <li
                  key={day.day}
                  className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                >
                  <div className="shrink-0 w-16 text-center">
                    <span className="text-sm font-bold text-[var(--secondary)]">Day {day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{day.title}</h3>
                    <p className="text-white/70 text-sm">{day.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center mt-8">
              <Link
                href={`/tanzania-safaris/${sample.slug}/`}
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold text-base transition-colors"
              >
                See This Safari
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            In the Price
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What&apos;s Included
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[var(--border)] shadow-sm"
              >
                <div className="w-6 h-6 bg-acacia-100 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-acacia-600" aria-hidden="true" />
                </div>
                <span className="text-[var(--text)] text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6 max-w-2xl mx-auto">
            Check each safari page for the full list of what is and isn&apos;t included.
          </p>
        </div>
      </section>

      {/* Camping vs Lodge Comparison */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Make Your Choice
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Camping vs Lodge Safari
          </h2>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th scope="col" className="py-4 px-6 text-left font-semibold"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="py-4 px-6 text-center font-semibold">Camping Safari</th>
                  <th scope="col" className="py-4 px-6 text-center font-semibold">Lodge Safari</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  ["Where you sleep", "A tent at a public campsite", "A room or permanent tent at a lodge"],
                  ["Bathrooms", "Shared toilet and shower block", "Private, usually en suite"],
                  ["Meals", "Cooked at camp by your cook", "Lodge restaurant"],
                  ["Location", "Often deep inside the park", "Inside or outside the park"],
                  ["Price", "Lower, with no lodge bill", "Higher, rising with the lodge"],
                ].map(([feature, camping, lodge]) => (
                  <tr key={feature} className="hover:bg-[var(--surface)] transition-colors">
                    <th scope="row" className="py-3 px-6 text-left font-medium text-sm">{feature}</th>
                    <td className="py-3 px-6 text-center text-sm text-[var(--text-muted)]">{camping}</td>
                    <td className="py-3 px-6 text-center text-sm text-[var(--text-muted)]">{lodge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Our{" "}
            <Link href="/tanzania-camping-safari/" className="text-[var(--primary)] font-semibold underline">
              camping safari guide
            </Link>{" "}
            covers a typical day, packing and when to go.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Camping Safari Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuideQuoteSection kind="safari" relatedTo="Guide: /tanzania-camping-safaris/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Get a Quote for Your Camping Safari
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Send us your dates and group size, and we&apos;ll quote the camping safari that fits, or
            change one of ours to suit you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow-lg hover:shadow-xl"
            >
              Plan My Camping Safari
            </Link>
            <Link
              href="/contact-us/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
