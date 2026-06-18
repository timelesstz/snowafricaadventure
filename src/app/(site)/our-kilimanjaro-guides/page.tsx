import { Metadata } from "next";
import Link from "next/link";
import {
  Mountain,
  Shield,
  Heart,
  Award,
  Users,
  Star,
  CheckCircle,
  Stethoscope,
  Radio,
  GraduationCap,
  Clock,
  Languages,
  MapPin,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = genMeta({
  title: "Our Kilimanjaro Guides & Team — Meet the Experts",
  description:
    "Meet the Snow Africa Adventure guide team: WFR-certified lead guides with 10+ years and 500+ summits each. KPAP-partnered porter welfare, safety protocols, and why our crew makes the difference.",
  url: "/our-kilimanjaro-guides/",
});

const guides = [
  {
    name: "Emmanuel Moshi",
    role: "Head Guide & Operations Director",
    years: 18,
    summits: 620,
    routes: "All 7 routes",
    certifications: ["WFR", "KINAPA Lead Guide", "WAFA"],
    languages: ["English", "Swahili", "German (basic)"],
    specialty: "High-altitude emergency management, summit night leadership",
    bio: "Emmanuel has guided climbers from over 40 countries to the Roof of Africa. As Head Guide, he personally trains every member of our team and leads our most challenging expeditions including Crater Camp and Western Breach ascents.",
  },
  {
    name: "Joseph Tarimo",
    role: "Senior Lead Guide",
    years: 14,
    summits: 480,
    routes: "Lemosho, Machame, Northern Circuit",
    certifications: ["WFR", "KINAPA Lead Guide"],
    languages: ["English", "Swahili", "French (basic)"],
    specialty: "Acclimatization coaching, group morale management",
    bio: "Joseph is known for his calm leadership during summit nights and his ability to read altitude symptoms early. His acclimatization coaching has contributed to a 95% summit success rate on his 8-day Lemosho expeditions.",
  },
  {
    name: "Francis Kimaro",
    role: "Senior Lead Guide",
    years: 12,
    summits: 410,
    routes: "Machame, Rongai, Umbwe",
    certifications: ["WFR", "KINAPA Lead Guide"],
    languages: ["English", "Swahili"],
    specialty: "Photography guidance, technical scrambling (Barranco Wall, Western Breach)",
    bio: "Francis combines his mountain expertise with a passion for photography, helping climbers capture their best summit moments. He specializes in the more technical routes and is our go-to guide for the challenging Umbwe route.",
  },
  {
    name: "Godlisten Massawe",
    role: "Lead Guide",
    years: 10,
    summits: 340,
    routes: "Lemosho, Machame, Marangu",
    certifications: ["WFR", "KINAPA Lead Guide"],
    languages: ["English", "Swahili", "Spanish (basic)"],
    specialty: "First-time climber mentorship, family groups",
    bio: "Godlisten has a gift for putting nervous first-time climbers at ease. His patient, encouraging approach makes him the ideal guide for beginners and family groups. He holds our record for the oldest climber successfully guided to the summit — a 74-year-old from Canada.",
  },
  {
    name: "Baraka Lyimo",
    role: "Lead Guide",
    years: 9,
    summits: 290,
    routes: "All standard routes",
    certifications: ["WAFA", "KINAPA Lead Guide"],
    languages: ["English", "Swahili"],
    specialty: "Corporate team expeditions, large group coordination",
    bio: "Baraka excels at managing large groups and corporate expeditions, coordinating multiple assistant guides and ensuring every team member reaches their potential. His structured approach and clear communication make complex logistics look effortless.",
  },
  {
    name: "Elisha Msuya",
    role: "Lead Guide",
    years: 8,
    summits: 250,
    routes: "Lemosho, Northern Circuit, Rongai",
    certifications: ["WAFA", "KINAPA Lead Guide"],
    languages: ["English", "Swahili"],
    specialty: "Wildlife and ecology knowledge, longer expeditions",
    bio: "Elisha brings the mountain to life with his deep knowledge of Kilimanjaro's ecosystems — from the rainforest blue monkeys to the alpine desert's unique flora. Climbers consistently praise him for transforming the trek into an educational journey.",
  },
];

const safetyProtocols = [
  {
    icon: Stethoscope,
    title: "Twice-Daily Health Monitoring",
    description:
      "Pulse oximetry (SpO2) and heart rate checks every morning and evening. Lake Louise AMS scoring at each camp. Any climber showing concerning readings receives immediate attention.",
  },
  {
    icon: Radio,
    title: "Satellite Communication",
    description:
      "Every expedition carries a satellite phone for emergency communication from any point on the mountain. Direct line to our Arusha operations base and AMREF Flying Doctors.",
  },
  {
    icon: Shield,
    title: "Emergency Oxygen & Gamow Bag",
    description:
      "Bottled oxygen carried on every expedition for emergency use. Portable Gamow hyperbaric bags available for treating severe altitude sickness while preparing evacuation.",
  },
  {
    icon: Heart,
    title: "WFR-Certified First Response",
    description:
      "All lead guides hold Wilderness First Responder (WFR) or Wilderness Advanced First Aid (WAFA) certification. Annual refresher training ensures skills stay current.",
  },
  {
    icon: MapPin,
    title: "Evacuation Plan for Every Route",
    description:
      "Pre-planned evacuation routes from every camp on every route. Stretcher carried on all expeditions. Helicopter evacuation coordination with AMREF Flying Doctors for critical emergencies.",
  },
  {
    icon: Users,
    title: "Guide-to-Climber Ratio",
    description:
      "Minimum 1 guide per 3 climbers — well above the industry standard of 1:6. On summit night, every climber has a guide within arm's reach. No one climbs alone.",
  },
];

const faqs = [
  {
    question: "How are your guides selected and trained?",
    answer:
      "Every guide starts as a porter, progresses to assistant guide, and must complete a minimum of 50 summits before being considered for lead guide. All lead guides hold KINAPA certification and either WFR or WAFA emergency medical certification. We run annual training camps covering emergency medicine, leadership, and client communication.",
  },
  {
    question: "What is your guide-to-climber ratio?",
    answer:
      "We maintain a minimum ratio of 1 guide per 3 climbers. On summit night, this ratio drops to 1:1 or 1:2 to ensure every climber receives personal attention during the most challenging section. Each expedition also has a dedicated camp manager who does not summit, ensuring camp operations run smoothly.",
  },
  {
    question: "What emergency equipment do your guides carry?",
    answer:
      "Every expedition carries: pulse oximeters, emergency bottled oxygen, a comprehensive first aid kit, a portable Gamow bag, a satellite phone, a stretcher, and emergency bivvy equipment. Our guides are trained in their use and conduct equipment checks before every expedition.",
  },
  {
    question: "Do guides speak English?",
    answer:
      "All our lead guides are fluent in English and Swahili. Several speak basic French, German, or Spanish. We can arrange guides with specific language skills upon request — just let us know when booking.",
  },
  {
    question: "How much do you pay your porters?",
    answer:
      "We are a KPAP (Kilimanjaro Porters Assistance Project) partner and exceed their recommended wage guidelines. Our porters receive a minimum of $12 USD per day (above the KPAP minimum of $10), plus meals, proper sleeping equipment, and medical insurance. Porter loads are weighed at the gate and limited to 20kg including their personal belongings.",
  },
  {
    question: "What is the typical crew size for a Kilimanjaro climb?",
    answer:
      "For a group of 4 climbers on an 8-day Lemosho route, a typical crew includes: 2 lead guides, 1 assistant guide, 1 cook, 1 waiter, and approximately 16 porters — a total crew of around 21 people. Larger groups scale proportionally. Every person on our crew is registered, insured, and fairly compensated.",
  },
  {
    question: "Can I request a specific guide?",
    answer:
      "Yes, if you have a preference for a specific lead guide, we will do our best to accommodate your request. Please mention this when booking. During peak season (January-March, June-October), popular guides book up early, so advance notice is appreciated.",
  },
  {
    question: "What is KPAP and why does it matter?",
    answer:
      "KPAP (Kilimanjaro Porters Assistance Project) is an independent nonprofit that monitors porter working conditions on Kilimanjaro. As a KPAP partner, we commit to fair wages, proper equipment, adequate food, and safe working conditions for all crew. KPAP conducts random inspections on the mountain — we welcome them every time.",
  },
  {
    question: "What happens if a guide or porter gets sick on the mountain?",
    answer:
      "Our crew receive the same health monitoring as climbers. If a crew member shows symptoms, they are relieved of duties and either rest at camp or descend with support. We carry spare crew capacity on every expedition to ensure no disruption to your climb. All crew are covered by medical insurance.",
  },
  {
    question: "How do you ensure porter welfare on the mountain?",
    answer:
      "Beyond fair wages, we provide: quality sleeping tents and mats (not the thin foam pads used by budget operators), three hot meals per day (same quality as climber meals), proper rain gear, medical insurance, and a tip distribution system that is transparent and fair. Our porters carry a maximum of 20kg — enforced by weigh-in at the gate.",
  },
];

export default function OurKilimanjaroGuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
    { name: "Our Guides & Team", url: "/our-kilimanjaro-guides/" },
  ]);

  const articleSchema = generateArticleSchema({
    title: "Our Kilimanjaro Guides & Team",
    description:
      "Meet the Snow Africa Adventure guide team. WFR-certified lead guides with decades of experience and hundreds of successful summits.",
    url: "/our-kilimanjaro-guides/",
    publishedTime: "2026-06-18",
    modifiedTime: "2026-06-18",
    author: "Emmanuel Moshi",
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <div>
      <MultiJsonLd schemas={[breadcrumbSchema, articleSchema, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
          { label: "Our Guides & Team" },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-[var(--primary)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <Mountain className="w-4 h-4" />
              <span>800+ Successful Summits</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Meet the Team Behind Your Summit
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Every Snow Africa Adventure expedition is led by KINAPA-certified,
              WFR-trained guides with a minimum of 8 years and 250+ summits of
              experience. Our team doesn&apos;t just take you up the mountain —
              they get you home safely.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <div className="py-6 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <CredentialsBadges variant="full" />
        </div>
      </div>

      {/* Why Our Guides Matter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)]">
                Why Your Guide Matters More Than Your Route
              </h2>
            </div>
            <p className="text-[1.0625rem] text-[var(--text)] leading-[1.8] mb-6">
              On Kilimanjaro, the difference between summiting and turning back
              often comes down to one factor: your guide. A skilled guide reads
              altitude symptoms before you feel them, adjusts your pace to
              optimize acclimatization, manages your nutrition and hydration, and
              makes the critical go/no-go decision on summit night. At Snow
              Africa Adventure, our guides are not seasonal workers picking up
              shifts — they are career mountaineers who have dedicated their
              lives to this mountain.
            </p>

            {/* Guide Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: "6", label: "Lead Guides", icon: Users },
                { value: "2,390+", label: "Combined Summits", icon: Mountain },
                { value: "71+", label: "Combined Years", icon: Clock },
                { value: "40+", label: "Countries Served", icon: Languages },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[var(--surface)] p-5 rounded-xl text-center"
                >
                  <stat.icon className="w-6 h-6 text-[var(--secondary)] mx-auto mb-2" />
                  <div className="font-heading text-2xl font-bold text-[var(--primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-xl font-bold text-[var(--primary)] mb-4">
              Our Guide Progression System
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Porter (2+ years)",
                  desc: "Learn the mountain from the ground up — carrying loads, understanding weather patterns, observing experienced guides",
                },
                {
                  step: "2",
                  title: "Assistant Guide (3+ years)",
                  desc: "Lead acclimatization hikes, assist with health monitoring, manage camp operations, complete WAFA certification",
                },
                {
                  step: "3",
                  title: "Lead Guide (5+ years, 50+ summits)",
                  desc: "Full expedition leadership, summit night decisions, emergency management. Must hold KINAPA Lead Guide license and WFR or WAFA certification",
                },
                {
                  step: "4",
                  title: "Senior Lead Guide (8+ years, 250+ summits)",
                  desc: "Mentors junior guides, leads speciality expeditions (Crater Camp, Western Breach), conducts training camps",
                },
              ].map((level) => (
                <div
                  key={level.step}
                  className="flex gap-4 items-start bg-[var(--surface)] p-4 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {level.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--primary)]">
                      {level.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      {level.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guide Profiles */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)] mb-3">
                Our Lead Guide Team
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Every lead guide has a minimum of 8 years on Kilimanjaro and
                holds KINAPA certification. Here are the people who will lead
                you to the Roof of Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl font-bold shrink-0">
                      {guide.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[var(--primary)]">
                        {guide.name}
                      </h3>
                      <p className="text-sm text-[var(--secondary)] font-medium">
                        {guide.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text)] leading-relaxed mb-4">
                    {guide.bio}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>
                        <strong>{guide.years}</strong> years
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>
                        <strong>{guide.summits}</strong> summits
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>{guide.routes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>{guide.languages[0]}</span>
                      {guide.languages.length > 1 && (
                        <span className="text-[var(--text-muted)]">
                          +{guide.languages.length - 1}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {guide.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium"
                      >
                        <GraduationCap className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)]">
                Safety Protocols & Emergency Equipment
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {safetyProtocols.map((protocol) => (
                <div
                  key={protocol.title}
                  className="flex gap-4 p-5 bg-[var(--surface)] rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <protocol.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary)] mb-1">
                      {protocol.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {protocol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Porter Welfare */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[var(--secondary)]">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)]">
                Porter Welfare: Our Commitment
              </h2>
            </div>

            <p className="text-[1.0625rem] text-[var(--text)] leading-[1.8] mb-6">
              Porters are the backbone of every Kilimanjaro expedition. Without
              them, commercial climbing would not exist. As a{" "}
              <strong>KPAP (Kilimanjaro Porters Assistance Project) partner</strong>,
              we hold ourselves to the highest standards of porter welfare — and
              we welcome KPAP&apos;s random on-mountain inspections to verify we
              practice what we preach.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Fair Wages",
                  desc: "Minimum $12/day — above KPAP's recommended minimum of $10/day. Paid promptly after each expedition.",
                },
                {
                  title: "Proper Equipment",
                  desc: "Quality sleeping tents, thick sleeping mats, and rain gear provided by us — not the thin foam pads used by budget operators.",
                },
                {
                  title: "Three Hot Meals Daily",
                  desc: "Same quality food as climbers. Our porters eat well because they work incredibly hard.",
                },
                {
                  title: "Load Limits Enforced",
                  desc: "Maximum 20kg per porter (including personal belongings). Weighed at the gate, checked on the mountain.",
                },
                {
                  title: "Medical Insurance",
                  desc: "All crew covered by medical insurance. Health monitoring during expedition. Immediate relief from duties if unwell.",
                },
                {
                  title: "Transparent Tipping",
                  desc: "Tips distributed in front of the entire team at the end of each expedition. Every crew member receives their fair share.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--primary)]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-white rounded-xl border border-[var(--border)]">
              <h3 className="font-heading text-lg font-bold text-[var(--primary)] mb-2">
                Typical Crew Composition (4 Climbers, 8-Day Lemosho)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-2 pr-4 font-semibold text-[var(--primary)]">
                        Role
                      </th>
                      <th className="text-center py-2 px-4 font-semibold text-[var(--primary)]">
                        Number
                      </th>
                      <th className="text-left py-2 pl-4 font-semibold text-[var(--primary)]">
                        Responsibility
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text)]">
                    {[
                      ["Lead Guide", "1", "Overall expedition leader, health monitoring, summit decisions"],
                      ["Assistant Guide", "1-2", "Acclimatization hikes, pace management, camp support"],
                      ["Cook", "1", "Three hot meals daily, dietary requirements, food safety"],
                      ["Waiter / Camp Manager", "1", "Mess tent setup, serving, camp organization"],
                      ["Porters", "14-16", "Equipment transport, camp setup/breakdown, trail support"],
                    ].map(([role, num, resp]) => (
                      <tr key={role} className="border-b border-[var(--border)] last:border-0">
                        <td className="py-2 pr-4 font-medium">{role}</td>
                        <td className="py-2 px-4 text-center">{num}</td>
                        <td className="py-2 pl-4 text-[var(--text-muted)]">{resp}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[var(--primary)]">
                      <td className="py-2 pr-4 font-bold text-[var(--primary)]">Total Crew</td>
                      <td className="py-2 px-4 text-center font-bold text-[var(--primary)]">18-21</td>
                      <td className="py-2 pl-4 text-sm text-[var(--text-muted)]">
                        For 4 climbers — approximately 4-5 crew per climber
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Climb with Guides Who Know Every Step
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Your guide is the single most important factor in your summit
              success. Book with a team that has 2,390+ combined summits and a
              93%+ success rate on 8-day routes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                View Group Departures
                <Star className="w-4 h-4" />
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <FaqAccordion
              items={faqs.map((f) => ({
                question: f.question,
                answer: f.answer,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <KnowledgeBase exclude="/our-kilimanjaro-guides/" />
    </div>
  );
}
