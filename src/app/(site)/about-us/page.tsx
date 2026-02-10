import { Metadata } from "next";
import { Mountain, Compass, Palmtree, Map, Shield, Heart, Users, Award } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description:
    "Snow Africa Adventure was founded by Florent and Caroline, a passionate husband-and-wife team. Learn about our story, services, and commitment to responsible tourism in Tanzania.",
  url: "/about-us/",
});

// Default settings (fallback if no database values)
const DEFAULT_SETTINGS: Record<string, string> = {
  "about.hero.title": "About Snow Africa Adventure",
  "about.hero.subtitle":
    "Snow Africa Adventure was founded by Florent and Caroline, a passionate husband-and-wife team who share a deep love for Tanzania's wildlife, culture, and natural wonders.",
  "about.hero.image": "",
  "about.story.title": "Our Story",
  "about.story.content":
    "Snow Africa Adventure was founded by Florent and Caroline, a passionate husband-and-wife team who share a deep love for Tanzania's wildlife, culture, and natural wonders. Florent began his career working with established safari companies, gaining hands-on experience and in-depth knowledge of the land. Together, he and Caroline have nurtured Snow Africa Adventure into a leading specialist for safaris, mountain treks, and cultural encounters.",
  "about.story.image": "",
  "about.offer.title": "What We Offer",
  "about.offer.intro":
    "From exhilarating Mount Kilimanjaro climbs to breathtaking wildlife safaris and serene beach getaways, our curated packages cater to a wide range of interests and budgets. Whether you are a first-time traveler seeking a budget-friendly option or a seasoned explorer in search of a luxurious, private experience, our handpicked itineraries ensure your adventure is safe, comfortable, and truly unforgettable.",
  "about.offer.service1.title": "Mount Kilimanjaro Treks",
  "about.offer.service1.desc":
    "Conquer Africa's highest peak with expert guides and top-notch support.",
  "about.offer.service2.title": "Classic Wildlife Safaris",
  "about.offer.service2.desc":
    "Experience the iconic Serengeti, Ngorongoro Crater, Tarangire, and beyond.",
  "about.offer.service3.title": "Beach Holidays",
  "about.offer.service3.desc":
    "Relax on the pristine shores of Zanzibar or other hidden coastal gems.",
  "about.offer.service4.title": "Tailored Itineraries",
  "about.offer.service4.desc":
    "Enjoy personalized trips designed to match your interests and travel style.",
  "about.offer.image": "",
  "about.commitment.title": "Our Commitment to Fairness and Community",
  "about.commitment.content":
    "We are proud members of the Kilimanjaro Porters Assistance Project (KPAP), reflecting our dedication to treating our mountain crew fairly and ethically. We believe in responsible tourism that benefits not only our guests but also our local communities. By choosing Snow Africa Adventure, you support a sustainable approach that ensures porters, guides, and local families all thrive alongside our growing tourism industry.",
  "about.commitment.image": "",
  "about.commitment.logo1": "",
  "about.commitment.logo2": "",
  "about.commitment.logo3": "",
  "about.commitment.logo4": "",
  "about.hosts.title": "Meet Your Hosts",
  "about.hosts.content":
    "As the founders of Snow Africa Adventure, Florent and Caroline are the driving force behind every journey we create. Their knowledge, experience, and genuine hospitality set the tone for our company culture, ensuring every traveler feels at home from the moment they arrive in Tanzania. They look forward to welcoming you, sharing their love for this spectacular land, and creating memories that will last a lifetime.",
  "about.hosts.name1": "Florent",
  "about.hosts.role1": "Co-Founder & Safari Expert",
  "about.hosts.image1": "",
  "about.hosts.name2": "Caroline",
  "about.hosts.role2": "Co-Founder & Operations",
  "about.hosts.image2": "",
  "about.cta.title": "Ready to Begin Your Tanzanian Adventure?",
  "about.cta.content":
    "Contact us today to start planning your dream safari or trek. Our dedicated team will guide you every step of the way, ensuring a seamless, safe, and life-changing experience in the heart of Africa.",
  "about.cta.tagline":
    "Welcome to Snow Africa Adventure—where every journey tells a story and every traveler becomes part of our extended Tanzanian family.",
};

async function getAboutSettings() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { startsWith: "about." },
      },
    });

    const merged: Record<string, string> = { ...DEFAULT_SETTINGS };
    settings.forEach((s) => {
      if (s.value) {
        merged[s.key] = s.value;
      }
    });

    return merged;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const services = [
  { icon: Mountain },
  { icon: Compass },
  { icon: Palmtree },
  { icon: Map },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "All guides certified in wilderness first aid",
  },
  {
    icon: Heart,
    title: "Responsible Tourism",
    desc: "Supporting conservation across Tanzania",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Employing local staff and supporting communities",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Striving for the best in everything we do",
  },
];

export default async function AboutPage() {
  const s = await getAboutSettings();

  // Get partner logos
  const partnerLogos = [
    s["about.commitment.logo1"],
    s["about.commitment.logo2"],
    s["about.commitment.logo3"],
    s["about.commitment.logo4"],
  ].filter(Boolean);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        {s["about.hero.image"] ? (
          <>
            <Image
              src={s["about.hero.image"]}
              alt="About Snow Africa Adventure"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-amber-900" />
        )}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {s["about.hero.title"]}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {s["about.hero.subtitle"]}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid ${s["about.story.image"] ? "md:grid-cols-2" : "md:grid-cols-1"} gap-12 lg:gap-16 items-center`}>
              {s["about.story.image"] && (
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={s["about.story.image"]}
                      alt="Our Story"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-2xl -z-10" />
                </div>
              )}
              <div className={!s["about.story.image"] ? "max-w-3xl mx-auto text-center" : ""}>
                <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
                  Our Journey
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  {s["about.story.title"]}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {s["about.story.content"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4">
                Our Services
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                {s["about.offer.title"]}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
                {s["about.offer.intro"]}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                const num = i + 1;
                return (
                  <div
                    key={num}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  >
                    <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-slate-900">
                      {s[`about.offer.service${num}.title`] || DEFAULT_SETTINGS[`about.offer.service${num}.title`]}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {s[`about.offer.service${num}.desc`] || DEFAULT_SETTINGS[`about.offer.service${num}.desc`]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                What We Stand For
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Our Core Values
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-400 text-sm">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid ${s["about.commitment.image"] ? "md:grid-cols-2" : "md:grid-cols-1"} gap-12 lg:gap-16 items-center`}>
              <div className={!s["about.commitment.image"] ? "max-w-3xl mx-auto text-center" : ""}>
                <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-6 text-slate-900 ${!s["about.commitment.image"] ? "text-center" : ""}`}>
                  {s["about.commitment.title"]}
                </h2>
                <p className={`text-lg text-slate-600 leading-relaxed ${!s["about.commitment.image"] ? "text-center" : ""}`}>
                  {s["about.commitment.content"]}
                </p>

                {/* Partner/Certification Logos */}
                {partnerLogos.length > 0 && (
                  <div className={`mt-10 flex flex-wrap gap-6 ${!s["about.commitment.image"] ? "justify-center" : ""}`}>
                    {partnerLogos.map((logo, i) => (
                      <div key={i} className="h-16 w-auto">
                        <Image
                          src={logo}
                          alt={`Partner logo ${i + 1}`}
                          width={120}
                          height={64}
                          className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {s["about.commitment.image"] && (
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={s["about.commitment.image"]}
                      alt="Our Commitment"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Hosts */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {s["about.hosts.title"]}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {s["about.hosts.content"]}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Host 1 - Florent */}
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  {s["about.hosts.image1"] ? (
                    <Image
                      src={s["about.hosts.image1"]}
                      alt={s["about.hosts.name1"] || "Florent"}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                      <span className="text-5xl font-bold text-slate-400">
                        {(s["about.hosts.name1"] || "F").charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-1">
                  {s["about.hosts.name1"]}
                </h3>
                <p className="text-slate-500 text-sm">
                  {s["about.hosts.role1"]}
                </p>
              </div>

              {/* Host 2 - Caroline */}
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  {s["about.hosts.image2"] ? (
                    <Image
                      src={s["about.hosts.image2"]}
                      alt={s["about.hosts.name2"] || "Caroline"}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                      <span className="text-5xl font-bold text-slate-400">
                        {(s["about.hosts.name2"] || "C").charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-1">
                  {s["about.hosts.name2"]}
                </h3>
                <p className="text-slate-500 text-sm">
                  {s["about.hosts.role2"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {s["about.cta.title"]}
            </h2>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              {s["about.cta.content"]}
            </p>
            <p className="text-white/70 mb-10 italic text-lg">
              {s["about.cta.tagline"]}
            </p>
            <Link
              href="/contact/"
              className="inline-block bg-white text-amber-600 font-bold px-10 py-4 rounded-full hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
