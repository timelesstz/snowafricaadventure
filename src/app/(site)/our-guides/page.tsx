import { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Award,
  Shield,
  Heart,
  Star,
  Users,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RelatedGuides, CredentialsBadges } from "@/components/kilimanjaro";

// Guide profiles are editable in the admin, so revalidate rather than
// serving a build-time snapshot indefinitely.
export const revalidate = 300;

export const metadata: Metadata = genMeta({
  title: "Our Kilimanjaro Guides & Team",
  description:
    "Meet the Snow Africa Adventure team — KINAPA-certified guides with 800+ summits, Wilderness First Responders, and KPAP-committed porters. Based in Arusha, Tanzania since 2008.",
  url: "/our-guides/",
});

type GuideProfile = {
  name: string;
  role: string;
  summits: string | null;
  experience: string | null;
  image: string | null;
  specialties: string[];
  certifications: string[];
  bio: string;
  quote: string | null;
  isFounder: boolean;
};

const FALLBACK_PORTRAIT =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg";

const getGuides = cache(async function getGuides(): Promise<GuideProfile[]> {
  try {
    return await prisma.guide.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: {
        name: true,
        role: true,
        summits: true,
        experience: true,
        image: true,
        specialties: true,
        certifications: true,
        bio: true,
        quote: true,
        isFounder: true,
      },
    });
  } catch {
    return [];
  }
});

const teamStats: { label: string; value: string | null; icon: typeof Mountain }[] = [
  { label: "Combined Summits", value: "800+", icon: Mountain },
  { label: "Years in Operation", value: "15+", icon: Award },
  { label: "Summit Success Rate", value: "93%", icon: Star },
  { label: "Active Guides", value: null, icon: Users },
];

const guideFaqs = [
  {
    question: "Are your guides KINAPA certified?",
    answer:
      "Yes. Every guide on our team holds a current KINAPA (Kilimanjaro National Park) certification. This certification requires completing formal mountain guide training, annual refresher courses, and passing safety assessments. We do not use uncertified assistant guides.",
  },
  {
    question: "What first aid training do your guides have?",
    answer:
      "All lead guides are trained Wilderness First Responders (WFR) — the gold standard for remote medical care. They carry pulse oximeters, emergency oxygen, comprehensive first aid kits, and portable stretchers on every climb. Each guide is trained to recognise and manage altitude sickness, hypothermia, and other mountain emergencies.",
  },
  {
    question: "What is the guide-to-climber ratio?",
    answer:
      "We maintain a minimum of 1 lead guide per 4 climbers, plus 1 assistant guide per 2-3 climbers. For solo travellers, you will always have at least 1 dedicated guide and 1 assistant. This ratio ensures individual attention to each climber's health, pace, and experience.",
  },
  {
    question: "How do you treat your porters?",
    answer:
      "We are a KPAP (Kilimanjaro Porters Assistance Project) partner. This means all porters receive fair wages above the KINAPA minimum, quality camping equipment and warm clothing, three hot meals daily, loads within the KINAPA 20kg weight limit, and medical insurance. Ethical porter treatment is central to our values — happy porters make for a better climb.",
  },
  {
    question: "Can I request a specific guide?",
    answer:
      "Yes. When you book, you can request a specific guide by name. We will confirm availability and do our best to accommodate your preference. Many repeat climbers specifically request the same guide for their second or third summit.",
  },
  {
    question: "How do your guides handle altitude sickness?",
    answer:
      "Our guides monitor every climber twice daily with pulse oximeters, tracking blood oxygen levels and heart rate. They are trained to recognise early symptoms of AMS, HACE, and HAPE. If symptoms worsen, they will adjust pace, extend rest, or organise an immediate safe descent. Every team carries emergency supplemental oxygen. See our altitude sickness guide for detailed prevention strategies.",
  },
  {
    question: "How much should I tip my guide and porters?",
    answer:
      "Tipping is customary and an important part of crew income. We recommend $20-25 per day for the lead guide, $15-20 per day for assistant guides, $8-10 per day per porter, and $10-15 per day for the cook. For a 7-day climb, budget approximately $200-300 total per climber. See our tipping guide for a complete breakdown.",
  },
  {
    question: "What safety equipment do your guides carry?",
    answer:
      "Every expedition carries: pulse oximeters, emergency supplemental oxygen, a comprehensive first aid kit, portable stretcher, satellite phone or emergency communication device, weather monitoring equipment, and a detailed emergency evacuation plan for every camp on the route.",
  },
];

function generatePersonSchema(person: GuideProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    image: person.image ?? FALLBACK_PORTRAIT,
    description: person.bio,
    knowsAbout: person.specialties,
    hasCredential: person.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: cert,
    })),
    worksFor: {
      "@type": "TourOperator",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export default async function OurGuidesPage() {
  const allGuides = await getGuides();
  const founder = allGuides.find((g) => g.isFounder) ?? allGuides[0];
  const seniorGuides = allGuides.filter((g) => g !== founder);

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "About Us", href: "/about-us/" },
            { label: "Our Guides" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about-us/" },
            { name: "Our Guides", url: "/our-guides/" },
          ]),
          generateFAQSchema(guideFaqs),
          ...allGuides.map(generatePersonSchema),
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 bg-[var(--primary-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Meet the Team
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our Kilimanjaro <span className="text-[var(--secondary)]">Guides</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              KINAPA-certified. Wilderness First Responders. 800+ summits collectively. Based in Arusha — the gateway to Kilimanjaro.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-8 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {teamStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value ?? allGuides.length}</p>
                  <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Featured Section */}
      {founder && (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full relative min-h-[320px]">
                    <Image
                      src={founder.image ?? FALLBACK_PORTRAIT}
                      alt={`${founder.name} - ${founder.role} at Snow Africa Adventure`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:hidden">
                      <h2 className="font-heading text-2xl font-bold text-white">{founder.name}</h2>
                      <p className="text-[var(--secondary)] font-semibold">{founder.role}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-3/5 p-6 md:p-10">
                  <div className="hidden md:block mb-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary-dark)]">{founder.role}</p>
                    <h2 className="font-heading text-3xl font-bold mt-1">{founder.name}</h2>
                  </div>

                  <div className="flex gap-6 my-5 py-4 border-y border-[var(--border)]">
                    <div>
                      <p className="text-2xl font-bold text-[var(--primary)]">{founder.summits}</p>
                      <p className="text-xs text-[var(--text-muted)]">Summits</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--primary)]">{founder.experience}</p>
                      <p className="text-xs text-[var(--text-muted)]">Experience</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--primary)]">93%</p>
                      <p className="text-xs text-[var(--text-muted)]">Success Rate</p>
                    </div>
                  </div>

                  <p className="text-[var(--text-muted)] leading-relaxed mb-5">{founder.bio}</p>

                  <blockquote className="border-l-4 border-[var(--secondary)] pl-4 mb-5 italic text-[var(--text-muted)]">
                    &ldquo;{founder.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-wrap gap-2">
                    {founder.certifications.map((cert) => (
                      <span key={cert} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Senior Guides Grid */}
      <section className="py-16 pt-0">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Our Guide Team</h2>
                <p className="text-sm text-[var(--text-muted)]">Kilimanjaro, safari &amp; cultural specialists</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {seniorGuides.map((guide) => (
                <div
                  key={guide.name}
                  className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <div className="w-28 sm:w-32 shrink-0 relative">
                      <div className="h-full min-h-[180px] relative">
                        <Image
                          src={guide.image ?? FALLBACK_PORTRAIT}
                          alt={`${guide.name} - ${guide.role} at Snow Africa Adventure`}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    </div>

                    <div className="flex-1 p-4 sm:p-5 min-w-0">
                      <h3 className="font-heading text-lg font-bold leading-tight">{guide.name}</h3>
                      <p className="text-xs text-[var(--secondary-dark)] font-medium mt-0.5">{guide.role}</p>

                      <div className="flex gap-4 mt-3 mb-3 text-sm">
                        <div>
                          <span className="font-bold text-[var(--primary)]">{guide.summits}</span>
                          <span className="text-[var(--text-muted)] text-xs ml-1">summits</span>
                        </div>
                        <div>
                          <span className="font-bold text-[var(--primary)]">{guide.experience}</span>
                          <span className="text-[var(--text-muted)] text-xs ml-1">exp</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {guide.specialties.map((spec) => (
                          <span key={spec} className="px-2 py-0.5 bg-[var(--surface)] text-[var(--text-muted)] text-[11px] rounded-full font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                All guides are KINAPA-certified with Wilderness First Responder training. You can{" "}
                <Link href="/contact-us/" className="text-[var(--primary)] font-semibold hover:underline">request a specific guide</Link>
                {" "}when you book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Our Team Different */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Team Different
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety First</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Every guide is a certified Wilderness First Responder. Pulse oximeters, emergency oxygen, and satellite communication on every climb. 1:4 guide-to-climber ratio minimum. Read more about <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline">Kilimanjaro safety</Link>.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">KPAP Committed</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Fair wages, quality equipment, proper food, and weight limits for all porters. We are audited by the Kilimanjaro Porters Assistance Project. See our <Link href="/kilimanjaro-tipping-guide/" className="text-[var(--primary)] hover:underline">tipping guide</Link> for crew appreciation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Local</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Based in Arusha, Tanzania. Every guide, porter, and cook is from the Kilimanjaro region. Your money stays in the local community — no overseas middlemen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {guideFaqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl border border-[var(--border)] group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <CredentialsBadges />

      <RelatedGuides currentPath="/our-guides/" bgClass="bg-white" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb with Experts Who Know the Mountain
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With 800+ combined summits and a 93% success rate, our team gives you the best possible chance of reaching Uhuru Peak. Every climb is personally supervised by a senior guide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              View All Routes
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
