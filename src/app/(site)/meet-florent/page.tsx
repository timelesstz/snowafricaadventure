import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Mountain,
  TreePine,
  Award,
  Shield,
  Heart,
  Users,
  MapPin,
  Star,
  Quote,
  Compass,
  Phone,
  Binoculars,
  Sunrise,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = genMeta({
  title: "Meet Florent — Co-Founder",
  description:
    "Meet Florent, Co-Founder & Safari Expert at Snow Africa Adventure. Based in Arusha, Tanzania, Florent leads our team of expert guides with a passion for sharing Tanzania's natural wonders.",
  url: "/meet-florent/",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Florent Ipanga",
  jobTitle: "Co-Founder & Safari Expert",
  description:
    "Co-Founder of Snow Africa Adventure, a TATO-licensed safari and Kilimanjaro trekking operator based in Arusha, Tanzania. Florent has over 12 years of experience leading safaris across the Northern Circuit and Kilimanjaro expeditions with 150+ successful summits.",
  image: "https://cdn.snowafricaadventure.com/florent-safari-guide.webp",
  url: "https://snowafricaadventure.com/meet-florent/",
  knowsAbout: [
    "Tanzania Safari Planning",
    "Kilimanjaro Trekking",
    "Northern Circuit Wildlife",
    "Sustainable Tourism",
    "Ethical Porter Welfare",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "KINAPA Certified Mountain Guide",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Wilderness First Responder",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "TATO Licensed Operator",
    },
  ],
  worksFor: {
    "@type": "TourOperator",
    name: "Snow Africa Adventure",
    url: "https://snowafricaadventure.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "MEC House, Plot no 161, Second floor, Mianzini Area",
      addressLocality: "Arusha",
      addressCountry: "TZ",
    },
  },
  sameAs: [
    "https://instagram.com/snow_africa_adventures",
    "https://facebook.com/snowafricaadventure",
  ],
};

const testimonials = [
  {
    quote:
      "Florent's knowledge of the bush is extraordinary. He spotted a leopard in a tree that none of us could see until he pointed it out. His passion for wildlife and conservation is infectious, and he made our Serengeti safari a truly unforgettable experience.",
    author: "James & Rebecca T.",
    trip: "7-Day Northern Circuit Safari",
    rating: 5,
  },
  {
    quote:
      "What sets Florent apart is how deeply he cares about every detail. From the food at camp to making sure our porters were treated fairly, he went above and beyond. Summit night on Kilimanjaro was the hardest thing I have ever done, and his encouragement got me there.",
    author: "Sophie M.",
    trip: "Machame Route, 7 Days",
    rating: 5,
  },
  {
    quote:
      "We have done safaris in Kenya and South Africa, but Tanzania with Florent's team was on another level. His connections with local communities gave us access to authentic cultural experiences you simply cannot get with a large tour company.",
    author: "David & Lauren P.",
    trip: "Kilimanjaro + Safari Combo",
    rating: 5,
  },
];

const credentials = [
  {
    icon: Shield,
    title: "TATO Licensed",
    description:
      "Tanzania Association of Tour Operators — the official industry body that regulates and licenses tour operators in Tanzania. Snow Africa Adventures Limited is a fully licensed and registered member.",
  },
  {
    icon: Heart,
    title: "KPAP Partner",
    description:
      "Kilimanjaro Porters Assistance Project supporter. We are committed to fair wages, proper equipment, weight limits, and quality meals for every porter on every trek. Ethical treatment is non-negotiable.",
  },
  {
    icon: Mountain,
    title: "KINAPA Authorized",
    description:
      "Kilimanjaro National Park Authority authorized operator. All our guides hold current KINAPA certifications, with annual refresher courses and safety assessments required.",
  },
  {
    icon: Award,
    title: "Wilderness First Responder",
    description:
      "Florent and all lead guides hold Wilderness First Responder certification — the highest standard for remote medical care. We carry pulse oximeters, emergency oxygen, and satellite communication on every climb.",
  },
];

export default function MeetFlorentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "About Us", href: "/about-us/" },
            { label: "Meet Florent" },
          ]}
        />
      </div>

      {/* Structured Data */}
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about-us/" },
            { name: "Meet Florent", url: "/meet-florent/" },
          ]),
          generateArticleSchema({
            title: "Meet Florent — Co-Founder & Safari Expert",
            description:
              "Meet Florent, Co-Founder & Safari Expert at Snow Africa Adventure. Based in Arusha, Tanzania, Florent leads our team of expert guides with a passion for sharing Tanzania's natural wonders.",
            url: "/meet-florent/",
            image:
              "https://cdn.snowafricaadventure.com/florent-safari-guide.webp",
            publishedTime: "2025-01-15T00:00:00Z",
            modifiedTime: "2026-03-11T00:00:00Z",
            author: "Florent Ipanga",
            authorRole: "Co-Founder & Safari Expert",
            authorCredentials: [
              "Tanzania Safari Planning",
              "Kilimanjaro Trekking",
              "Northern Circuit Wildlife",
              "Sustainable Tourism",
            ],
          }),
          personSchema,
        ]}
      />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[65vh] flex items-center">
        <Image
          src="https://cdn.snowafricaadventure.com/florent-safari-guide.webp"
          alt="Florent Ipanga, Co-Founder of Snow Africa Adventure, guiding a safari in Tanzania"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/90 text-white rounded-full text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" /> Based in Arusha, Tanzania
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Meet Florent Ipanga
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              Co-Founder &amp; Safari Expert at Snow Africa Adventure
            </p>
            <p className="text-lg text-white/75 leading-relaxed max-w-2xl">
              150+ Kilimanjaro summits. 12+ years guiding across Tanzania&apos;s
              Northern Circuit. A lifelong mission to share the real Tanzania
              with the world.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quick Stats Bar ── */}
      <section className="py-6 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Mountain className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-xl font-bold">150+</p>
                <p className="text-xs text-slate-400">Kilimanjaro Summits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-xl font-bold">12+</p>
                <p className="text-xs text-slate-400">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-xl font-bold">4.9 / 5.0</p>
                <p className="text-xs text-slate-400">
                  TripAdvisor / SafariBookings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-xl font-bold">1,000+</p>
                <p className="text-xs text-slate-400">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Personal Story ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
              The Story Behind Snow Africa
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              From the Foothills of Kilimanjaro to Building a Dream
            </h2>

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
              <p>
                Growing up in Tanzania, I was surrounded by a landscape that
                most people only see in documentaries. The snow-capped peak of
                Kilimanjaro was my backdrop. The Serengeti plains were a few
                hours' drive away. The Ngorongoro Crater, with its breathtaking
                concentration of wildlife, was a place I first visited as a
                teenager. But it was not until I started working as a safari
                guide that I truly understood how special this land is — and how
                many people from around the world dream of experiencing it.
              </p>

              <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-8 bg-amber-50/50 rounded-r-lg italic text-slate-700">
                <Quote className="w-6 h-6 text-amber-400 mb-2" />
                &ldquo;The first time I guided a couple from London to the
                summit of Kilimanjaro, I watched them cry with joy at Uhuru
                Peak. In that moment I knew — this is what I want to do for the
                rest of my life. Not just take people to the top, but give them
                an experience that changes them.&rdquo;
                <footer className="mt-3 text-sm font-semibold text-slate-500 not-italic">
                  — Florent Ipanga
                </footer>
              </blockquote>

              <p>
                I began my career working with established safari companies in
                Arusha, learning the trade from experienced operators and senior
                guides who had spent decades in the bush. I studied every route
                on Kilimanjaro — not just the trails, but the ecosystems, the
                weather patterns, the altitude physiology. On the safari side, I
                learned to read animal behavior, to understand migration
                patterns, and to position vehicles so travelers get the best
                views without disturbing the wildlife.
              </p>

              <p>
                After years of guiding, I realized something was missing from
                the industry. Too many operators treat Tanzania as a commodity
                — mass-market packages, rushed itineraries, corners cut on
                safety and porter welfare. I wanted to build something
                different. Something that honors the land and the people who
                call it home.
              </p>

              <p>
                Together with my wife Caroline, I founded Snow Africa Adventure.
                We built it on a simple principle:{" "}
                <strong>
                  every person who visits Tanzania deserves an authentic,
                  personal, and ethically delivered experience
                </strong>
                . Caroline handles operations and guest relations with
                extraordinary attention to detail, while I focus on itinerary
                design, guide training, and making sure every safari and trek
                lives up to our standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience & Expertise ── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
                Experience & Expertise
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                12+ Years on Tanzania&apos;s Trails and Plains
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                My expertise spans every major destination in northern Tanzania,
                from the volcanic peaks of Kilimanjaro to the vast grasslands of
                the Serengeti. Here is what I bring to every journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Kilimanjaro Expertise */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                  <Mountain className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                  Kilimanjaro Mastery
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  With over 150 successful summits across every route —
                  Lemosho, Machame, Rongai, Northern Circuit, Umbwe, and
                  Marangu — I know this mountain intimately. I understand the
                  weather windows, the best campsites, and the critical
                  acclimatization points that make the difference between a
                  struggle and a triumph.
                </p>
                <ul className="space-y-2">
                  {[
                    "All 7 summit routes climbed multiple times",
                    "Altitude management and acclimatization protocols",
                    "Summit night pacing and encouragement techniques",
                    "Emergency descent procedures and evacuation planning",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safari Expertise */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                  <Binoculars className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                  Northern Circuit Safari Expert
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The Northern Circuit — Serengeti, Ngorongoro, Tarangire, Lake
                  Manyara, and Arusha National Park — is my home territory. I
                  have spent thousands of hours in these parks, building
                  relationships with local rangers, studying animal behavior, and
                  learning the seasonal rhythms that determine where the wildlife
                  gathers.
                </p>
                <ul className="space-y-2">
                  {[
                    "Great Migration timing and positioning",
                    "Big Five tracking across all Northern Circuit parks",
                    "Birdwatching and specialist wildlife interests",
                    "Private camping and off-the-beaten-path locations",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary Design */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                  <TreePine className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                  Custom Itinerary Design
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  No two travelers are the same. I personally design every
                  itinerary based on your interests, fitness level, budget, and
                  time constraints. Whether you want a challenging summit
                  attempt followed by a luxury safari, or a gentle family
                  adventure with cultural visits, I build it from scratch — not
                  from a template.
                </p>
                <ul className="space-y-2">
                  {[
                    "Kilimanjaro + Safari combination packages",
                    "Budget-friendly to luxury lodge experiences",
                    "Family-friendly and solo traveler itineraries",
                    "Zanzibar beach extensions and cultural tours",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Leadership */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                  Team Training & Leadership
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Every guide on our team is personally trained and mentored by
                  me. I run regular safety drills, first aid refreshers, and
                  guiding technique workshops. Our team is not just skilled —
                  they share our philosophy of genuine hospitality, ethical
                  treatment of crew, and deep respect for the environment.
                </p>
                <ul className="space-y-2">
                  {[
                    "12+ KINAPA-certified guides on the team",
                    "Annual safety and first aid training program",
                    "Crew welfare standards exceeding KPAP requirements",
                    "Multilingual guides (English, Swahili, French, German)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy: Ethical Tourism ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
              Our Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              Tourism That Gives Back
            </h2>

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
              <p>
                When I started Snow Africa Adventure, I made a promise to myself
                and to my community: this company would be different. Tourism in
                Tanzania can be a powerful force for good — it creates jobs,
                funds conservation, and gives local families a sustainable
                livelihood. But only if it is done right.
              </p>

              <p>
                That starts with our porters. On Kilimanjaro, porters carry your
                gear, set up camp, cook your meals, and make the entire trek
                possible. Yet in this industry, porters are often underpaid,
                given inadequate equipment, and forced to carry loads that exceed
                safe limits. We refuse to operate that way.
              </p>

              <div className="bg-amber-50 rounded-2xl p-8 my-8 border border-amber-100">
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-amber-600" />
                  Our Ethical Commitments
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Fair wages above the KINAPA minimum for all crew",
                    "Quality sleeping bags, tents, and warm clothing for porters",
                    "Three nutritious hot meals daily for every team member",
                    "Strict 20kg weight limit per porter — no exceptions",
                    "Medical insurance and emergency evacuation coverage for all crew",
                    "Revenue sharing with local communities near national parks",
                    "Environmental leave-no-trace principles on every trek",
                    "Support for local schools and community health projects",
                  ].map((commitment) => (
                    <div
                      key={commitment}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      {commitment}
                    </div>
                  ))}
                </div>
              </div>

              <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-8 bg-amber-50/50 rounded-r-lg italic text-slate-700">
                <Quote className="w-6 h-6 text-amber-400 mb-2" />
                &ldquo;A happy porter is the foundation of a great climb.
                When our crew is well-fed, well-equipped, and fairly paid, they
                bring energy and joy to the mountain. Our travelers feel that
                difference from day one.&rdquo;
                <footer className="mt-3 text-sm font-semibold text-slate-500 not-italic">
                  — Florent Ipanga
                </footer>
              </blockquote>

              <p>
                Beyond Kilimanjaro, our safari operations follow the same
                principles. We use local lodges and camps wherever possible,
                employ drivers and cooks from surrounding communities, and
                follow strict wildlife viewing guidelines. We never chase
                animals, never go off-road in protected areas, and always
                prioritize the welfare of the wildlife over getting a closer
                photograph.
              </p>

              <p>
                Conservation is personal for me. The Tanzania I grew up in —
                with its vast herds, pristine forests, and abundant birdlife —
                is a treasure that future generations deserve to inherit. Every
                safari we run, every trek we lead, is an opportunity to show our
                guests why this land matters and to fund its protection through
                responsible tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials & Certifications ── */}
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                Credentials & Trust
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Licensed, Certified, and Accountable
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Snow Africa Adventures Limited is a registered Tanzanian company
                with full licensing from the Tanzania Association of Tour
                Operators. Every credential listed here is verifiable.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.title}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">
                      {cred.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">
                Snow Africa Adventures Limited &bull; Registered in Tanzania
                &bull; TATO License Holder &bull; Based in Arusha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Travelers Say ── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
                Traveler Stories
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                What Travelers Say About Florent
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                These words come from real travelers who experienced Tanzania
                with our team. Their stories speak louder than any marketing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.trip}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm">
                Rated{" "}
                <span className="font-semibold text-slate-700">
                  4.9 on TripAdvisor
                </span>{" "}
                &bull;{" "}
                <span className="font-semibold text-slate-700">
                  5.0 on SafariBookings
                </span>{" "}
                &bull; Based on hundreds of verified reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── A Day with Florent's Team ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
              The Experience
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              A Day with Florent&apos;s Team
            </h2>

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
              <p>
                What does it actually feel like to go on safari or trek with
                us? Whether you are on a game drive across the Serengeti or
                ascending through Kilimanjaro&apos;s rainforest zone, there is a
                rhythm to how we operate that our travelers consistently
                describe as &ldquo;relaxed but professional.&rdquo;
              </p>

              <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Sunrise className="w-6 h-6 text-amber-500" />
                    <h3 className="font-heading font-bold text-slate-900">
                      On Safari
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Early morning game drives when the light is golden and the
                    predators are active. Our guides know exactly where to
                    position the vehicle — not too close, not too far. Packed
                    breakfast at a scenic overlook, then back to the lodge for a
                    midday rest before an afternoon drive. Evening sundowners
                    with stories about the wildlife we spotted. No rushing, no
                    ticking boxes. Just pure, immersive connection with the wild.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Mountain className="w-6 h-6 text-amber-500" />
                    <h3 className="font-heading font-bold text-slate-900">
                      On Kilimanjaro
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Wake to hot tea delivered to your tent. A hearty breakfast,
                    then &ldquo;pole pole&rdquo; — slowly, slowly — up the
                    trail. Your guide walks beside you, pointing out unique
                    plants, telling stories of the mountain, checking your
                    breathing and energy. Lunch at a scenic rest point. Arrive
                    at camp to find your tent set up, hot water ready, and a
                    three-course dinner being prepared. Health checks every
                    evening with pulse oximeters. Encouragement, laughter, and
                    genuine care at every step.
                  </p>
                </div>
              </div>

              <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-8 bg-amber-50/50 rounded-r-lg italic text-slate-700">
                <Quote className="w-6 h-6 text-amber-400 mb-2" />
                &ldquo;I do not just want our guests to see Tanzania — I want
                them to feel it. The warmth of the people, the silence of the
                bush at dawn, the overwhelming emotion when Uhuru Peak appears
                through the clouds. These moments cannot be manufactured. They
                happen when you slow down, trust your guides, and let Africa
                reveal itself to you.&rdquo;
                <footer className="mt-3 text-sm font-semibold text-slate-500 not-italic">
                  — Florent Ipanga
                </footer>
              </blockquote>

              <p>
                Every trip ends the same way: with a heartfelt goodbye, an
                exchange of contact details, and an open invitation to come
                back. Many of our travelers do return — for a different route,
                a different park, or simply because they missed the feeling of
                being in Tanzania. Some have become lifelong friends. That, more
                than any rating or review, is the measure of what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Page Exists (E-E-A-T signal) ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                Why We Share Our Story
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In an industry where many operators hide behind anonymous
                websites and stock photography, we believe you deserve to know
                exactly who is planning your trip. When you book with Snow
                Africa Adventure, you are not dealing with a faceless
                corporation or a booking aggregator. You are working with
                Florent, Caroline, and a team of real people in Arusha who live
                and breathe this work every day.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We put our names, our faces, and our reputations behind every
                itinerary we create. That accountability is what drives us to
                deliver consistently excellent experiences — because in a small
                company, every traveler&apos;s experience matters personally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Pages ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-center mb-8 text-slate-900">
              Learn More About Us
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/our-guides/"
                className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-slate-100"
              >
                <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold text-sm text-slate-900">
                  Our Guides
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Meet the full team of KINAPA-certified guides
                </p>
              </Link>
              <Link
                href="/about-us/"
                className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-slate-100"
              >
                <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold text-sm text-slate-900">
                  About Snow Africa
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our story, values, and commitment to Tanzania
                </p>
              </Link>
              <Link
                href="/contact-us/"
                className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-slate-100"
              >
                <Phone className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold text-sm text-slate-900">
                  Contact Us
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Get in touch to start planning your trip
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Compass className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Plan Your Adventure with Florent&apos;s Team
            </h2>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              Whether it is your first safari, your dream Kilimanjaro summit, or
              a bespoke Tanzania itinerary, we are here to make it happen. Every
              trip is personally designed by our team in Arusha.
            </p>
            <p className="text-white/70 mb-10 italic text-lg">
              No middlemen. No mass-market packages. Just real people creating
              real adventures in Tanzania.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us/"
                className="inline-block bg-white text-amber-600 font-bold px-10 py-4 rounded-full hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
              >
                Start Planning Today
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white/70 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 text-lg"
              >
                Build a Custom Trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
