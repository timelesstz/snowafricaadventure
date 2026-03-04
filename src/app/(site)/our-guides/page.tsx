import { Metadata } from "next";
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
  Mail,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = genMeta({
  title: "Our Kilimanjaro Guides & Team",
  description:
    "Meet the Snow Africa Adventure team — KINAPA-certified guides with 500+ summits, Wilderness First Responders, and KPAP-committed porters. Based in Arusha, Tanzania since 2008.",
  url: "/our-guides/",
});

const guides = [
  {
    name: "Emmanuel Moshi",
    role: "Founder & Lead Guide",
    summits: "200+",
    experience: "15+ years",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg",
    specialties: ["Lemosho Route", "Northern Circuit", "Safari Planning"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "TATO Licensed Operator"],
    bio: "Emmanuel founded Snow Africa Adventure with a vision to share Tanzania's natural wonders responsibly. A Kilimanjaro native, he has led more than 200 summit expeditions and designed our safety protocols. Emmanuel personally trains every guide on our team and insists on the highest standards for porter welfare.",
    quote: "The mountain teaches patience and rewards determination. Every step is a story.",
  },
  {
    name: "Florent Ipanga",
    role: "Co-Founder & Safari & Trekking Expert",
    summits: "150+",
    experience: "12+ years",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg",
    specialties: ["Machame Route", "Umbwe Route", "Wildlife Safaris"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Wildlife Guide"],
    bio: "Florent brings deep wildlife knowledge and mountain expertise to every expedition. With over 150 Kilimanjaro summits and extensive experience across Tanzania's national parks, he specializes in combined Kilimanjaro + safari itineraries. He is passionate about sustainable tourism and community development in the Kilimanjaro region.",
    quote: "When you climb with respect for the mountain and its people, the summit is just the beginning of the reward.",
  },
  {
    name: "John Paulo",
    role: "Senior Mountain Guide",
    summits: "100+",
    experience: "10+ years",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg",
    specialties: ["Rongai Route", "Marangu Route", "Altitude Management"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Advanced First Aid"],
    bio: "John Paulo is known for his calm demeanour at altitude and his exceptional ability to manage acclimatization for first-time climbers. He has a personal summit success rate exceeding 95% on routes of 7+ days. Climbers regularly describe John as 'the guide who made me believe I could do it.'",
    quote: "Pole pole — slowly, slowly. The mountain is not going anywhere.",
  },
  {
    name: "Paul Temba",
    role: "Mountain Guide & Safety Officer",
    summits: "80+",
    experience: "8+ years",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/02/ipananga.jpg",
    specialties: ["Lemosho Route", "Emergency Protocols", "Night Summits"],
    certifications: ["KINAPA Certified Guide", "Wilderness First Responder", "Emergency Evacuation Trained"],
    bio: "Paul serves as our safety officer, responsible for emergency protocols, equipment maintenance, and crew training. He leads our most challenging routes and has managed multiple successful emergency descents. His background in emergency response makes him invaluable on summit nights.",
    quote: "Safety is not a rule — it is a promise to every climber and every family waiting at home.",
  },
];

const teamStats = [
  { label: "Combined Summits", value: "500+", icon: Mountain },
  { label: "Years in Operation", value: "15+", icon: Award },
  { label: "Summit Success Rate", value: "93%", icon: Star },
  { label: "Active Guides", value: "12+", icon: Users },
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
];

function generatePersonSchema(person: typeof guides[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    image: person.image,
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

export default function OurGuidesPage() {
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
          ...guides.map(generatePersonSchema),
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
              KINAPA-certified. Wilderness First Responders. 500+ summits collectively. Based in Arusha — the gateway to Kilimanjaro.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-8 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {teamStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {guides.map((guide, i) => (
              <div
                key={guide.name}
                className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm"
              >
                <div className="md:flex">
                  {/* Photo */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-[3/4] md:h-full relative">
                      <Image
                        src={guide.image}
                        alt={`${guide.name} - ${guide.role} at Snow Africa Adventure`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:w-2/3 p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="font-heading text-2xl font-bold">{guide.name}</h2>
                        <p className="text-[var(--secondary-dark)] font-medium">{guide.role}</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-xl font-bold text-[var(--primary)]">{guide.summits}</p>
                          <p className="text-xs text-[var(--text-muted)]">Summits</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-[var(--primary)]">{guide.experience}</p>
                          <p className="text-xs text-[var(--text-muted)]">Experience</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[var(--text-muted)] leading-relaxed mb-4">{guide.bio}</p>

                    <blockquote className="border-l-4 border-[var(--secondary)] pl-4 mb-4 italic text-[var(--text-muted)]">
                      &ldquo;{guide.quote}&rdquo;
                    </blockquote>

                    {/* Certifications */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[var(--secondary)]" /> Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.certifications.map((cert) => (
                          <span key={cert} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Mountain className="w-4 h-4 text-[var(--secondary)]" /> Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.specialties.map((spec) => (
                          <span key={spec} className="px-3 py-1 bg-[var(--surface)] text-[var(--text-muted)] text-xs rounded-full font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                Every guide is a certified Wilderness First Responder. Pulse oximeters, emergency oxygen, and satellite communication on every climb. 1:4 guide-to-climber ratio minimum.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">KPAP Committed</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Fair wages, quality equipment, proper food, and weight limits for all porters. We are audited by the Kilimanjaro Porters Assistance Project. Happy crew = better climb.
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
                    <Mountain className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb with Experts Who Know the Mountain
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With 500+ combined summits and a 93% success rate, our team gives you the best possible chance of reaching Uhuru Peak. Every climb is personally supervised by a senior guide.
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
