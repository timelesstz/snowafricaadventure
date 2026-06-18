import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Snowflake,
  Thermometer,
  TrendingDown,
  Calendar,
  Eye,
  TreePine,
  MapPin,
  ArrowRight,
  AlertTriangle,
  Globe,
  Sun,
  CloudRain,
  Compass,
  Info,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Glaciers: Why They're Disappearing",
  description:
    "Kilimanjaro's glaciers have lost 85%+ of their ice since 1912. Learn about the Furtwängler Glacier, Northern Icefield, and why scientists predict ice-free by 2040.",
  url: "/kilimanjaro-glaciers/",
});

const majorGlaciers = [
  {
    name: "Northern Icefield",
    status: "Largest remaining",
    color: "text-sky-400",
    borderColor: "border-sky-400/30",
    description:
      "The most extensive remaining ice mass on Kilimanjaro, located on the northern slopes of Kibo near the crater rim. Once a continuous sheet, it has fractured into several distinct segments. Visible from the Rongai and Northern Circuit routes during the final summit approach. Estimated to contain roughly 40% of Kilimanjaro's remaining ice volume.",
  },
  {
    name: "Southern Icefield",
    status: "Rapidly retreating",
    color: "text-cyan-400",
    borderColor: "border-cyan-400/30",
    description:
      "Positioned on the southern flanks of Kibo, this icefield is directly exposed to solar radiation from the north and has retreated faster than the Northern Icefield. Climbers on the Machame, Lemosho, and Umbwe routes see its remnants as dramatic vertical ice walls along the crater rim during the final ascent to Uhuru Peak.",
  },
  {
    name: "Eastern Icefield",
    status: "Severely diminished",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    description:
      "Once a significant ice mass on Kilimanjaro's eastern face, this icefield has lost the majority of its volume over the past century. It includes remnants of the historically documented Ratzel and Credner glaciers. Researchers use it as a key indicator of overall retreat rates because of its high sun exposure.",
  },
  {
    name: "Furtwängler Glacier",
    status: "Most famous, critically small",
    color: "text-indigo-400",
    borderColor: "border-indigo-400/30",
    description:
      "Situated on the summit plateau inside the crater, the Furtwängler Glacier is the most visited ice formation on Kilimanjaro. Named after the German mountaineer Walter Furtwängler who summited in 1912, it once covered the entire crater floor. Today it stands as a solitary ice block roughly 60 metres across, reduced by over 80% since the year 2000. Every summit trekker can walk right past it.",
  },
  {
    name: "Rebmann Glacier",
    status: "Named after missionary Johannes Rebmann",
    color: "text-violet-400",
    borderColor: "border-violet-400/30",
    description:
      "Named after the German missionary who first reported snow on Kilimanjaro to European audiences in 1848 — a claim initially ridiculed by London geographers. The Rebmann Glacier clings to the southwestern slopes and has lost dramatic vertical ice cliffs that once defined the Western Breach approach. Its retreat is visible to climbers ascending via the Arrow Glacier camp.",
  },
  {
    name: "Decken Glacier",
    status: "Historical ice, now fragmentary",
    color: "text-purple-400",
    borderColor: "border-purple-400/30",
    description:
      "Named after Baron Karl Klaus von der Decken, the first European to attempt Kilimanjaro's summit in 1861. The Decken Glacier once merged with the Rebmann Glacier to form a continuous ice wall visible from Barranco Camp. The two have separated entirely, and the Decken Glacier now survives as isolated remnants on the southwestern crater wall.",
  },
];

const retreatTimeline = [
  { year: "1912", area: "~12.0 km²", loss: "—", note: "First scientific survey by Hans Meyer and Fritz Klute. The entire summit was encased in ice." },
  { year: "1953", area: "~6.7 km²", loss: "44%", note: "Aerial surveys reveal dramatic loss. Many smaller glaciers have already disappeared entirely." },
  { year: "1976", area: "~4.2 km²", loss: "65%", note: "Stefan Hastenrath publishes landmark study. Retreat rate accelerating." },
  { year: "1989", area: "~3.3 km²", loss: "73%", note: "Satellite monitoring begins. Glacier margins retreating at 1–2 metres per year." },
  { year: "2000", area: "~2.6 km²", loss: "78%", note: "Lonnie Thompson's Ohio State team drills ice cores. Predicts ice-free summit by 2020." },
  { year: "2010", area: "~1.8 km²", loss: "85%", note: "UNEP study. Southern Icefield losing 1 metre of thickness per year." },
  { year: "2020s", area: "~1.1 km²", loss: "91%", note: "Furtwängler Glacier reduced to isolated block. Northern Icefield fracturing." },
  { year: "2030s–2040s", area: "Projected 0", loss: "100%", note: "Multiple studies predict complete deglaciation. Some estimates say as early as 2030." },
];

const meltingCauses = [
  {
    icon: Thermometer,
    title: "Rising Global Temperatures",
    description:
      "While Kilimanjaro's summit temperatures still frequently drop below freezing, the global temperature increase has raised the zero-degree isotherm (the altitude at which temperatures average 0°C). This means the lower edges of the glaciers experience more hours above freezing each year, accelerating melt at the margins. Even a fraction of a degree matters when you are right at the tipping point between ice preservation and loss.",
  },
  {
    icon: CloudRain,
    title: "Reduced Snowfall & Precipitation",
    description:
      "Glaciers survive when annual snowfall exceeds annual melt. On Kilimanjaro, precipitation has declined significantly since the late 19th century. Less snow means less reflective surface (albedo), which means the dark rock and ice absorb more solar energy, which accelerates further melting — a destructive feedback loop. The Indian Ocean Dipole and regional climate shifts have both contributed to drier conditions on the mountain.",
  },
  {
    icon: TreePine,
    title: "Lower-Zone Deforestation",
    description:
      "The montane forests surrounding Kilimanjaro act as a moisture pump — trees transpire water vapour that rises and condenses as clouds and precipitation on the upper slopes. Decades of agricultural encroachment and logging have reduced forest cover on the lower slopes, cutting off this moisture supply. Less moisture reaching the summit means less snowfall to replenish the glaciers. Reforestation efforts are underway but cannot reverse a century of loss overnight.",
  },
  {
    icon: Sun,
    title: "Sublimation at the Equator",
    description:
      "Unlike mid-latitude glaciers that primarily lose mass through melting, Kilimanjaro's glaciers lose a significant portion of their mass through sublimation — the process where ice converts directly to water vapour without passing through a liquid phase. The intense equatorial solar radiation, combined with dry air at 5,800+ metres, makes sublimation the dominant ablation process. This is why the glaciers have those distinctive vertical ice walls rather than gently sloping melt edges.",
  },
  {
    icon: Globe,
    title: "Albedo Feedback & Solar Radiation",
    description:
      "As glaciers shrink, they expose more dark volcanic rock. Dark rock absorbs far more solar energy than reflective white ice, heating the surrounding area and accelerating ice loss at the edges. The remaining ice walls retreat inward from all sides simultaneously. At equatorial latitudes, the sun is directly overhead for much of the year, delivering maximum solar radiation to horizontal ice surfaces — particularly devastating for the flat crater-floor glaciers like the Furtwängler.",
  },
];

const bestGlacierRoutes = [
  {
    route: "Machame Route (7-Day)",
    slug: "7-days-machame-route",
    views: "Southern Icefield, Rebmann & Decken Glaciers",
    description:
      "The Machame Route offers some of the most dramatic glacier views on Kilimanjaro. From Barranco Wall, you look up directly at the sheer ice cliffs of the Southern Icefield. The summit night approach via Stella Point passes within metres of towering vertical ice walls. At sunrise on the crater rim, the remaining glaciers glow pink and gold.",
    highlight: "Barranco Wall ice wall views",
  },
  {
    route: "Lemosho Route (8-Day)",
    slug: "8-days-lemosho-route",
    views: "Western Glaciers, Furtwängler, Northern & Southern Icefields",
    description:
      "Our most recommended route for glacier viewing and summit success. The Lemosho approach from the west provides early views of the Western Breach glaciers. The Lava Tower acclimatization day at 4,630m offers panoramic glacier views. Summit day passes both the Southern Icefield and Furtwängler Glacier up close.",
    highlight: "360° glacier panorama from crater rim",
    recommended: true,
  },
  {
    route: "Northern Circuit (9-Day)",
    slug: "9-days-northern-circuit-route",
    views: "Northern Icefield, Eastern Icefield, all summit glaciers",
    description:
      "The only route that circumnavigates Kibo, offering views of glaciers from every angle. The northern traverse provides extended views of the Northern Icefield — Kilimanjaro's largest remaining ice mass — that other routes never see. The full circuit means more time at altitude for photography and appreciation before the final summit push.",
    highlight: "Only route with Northern Icefield views",
  },
  {
    route: "Rongai Route (7-Day)",
    slug: "6-days-rongai-route",
    views: "Northern Icefield, Furtwängler Glacier",
    description:
      "Approaching from Kenya in the north, the Rongai Route provides unique perspectives on the Northern Icefield that southern-approach routes miss. The summit approach passes through Gilman's Point on the crater rim with views across to the icefield. At Uhuru Peak, the Furtwängler Glacier sits just below on the crater floor.",
    highlight: "Northern Icefield from the approach",
  },
];

const faqs = [
  {
    question: "Does Kilimanjaro still have glaciers?",
    answer:
      "Yes, Kilimanjaro still has glaciers as of 2026, though they have shrunk dramatically. Approximately 1.1 square kilometres of ice remains, concentrated in the Northern Icefield, Southern Icefield, Eastern Icefield, and the famous Furtwängler Glacier on the summit plateau. Every climber who reaches Uhuru Peak can still see and photograph these ice formations. However, the glaciers are retreating rapidly and scientists project they could disappear entirely within the next one to two decades.",
  },
  {
    question: "When will Kilimanjaro's glaciers disappear?",
    answer:
      "Most glaciologists predict Kilimanjaro will be ice-free between the mid-2030s and 2040. Some studies are more pessimistic, suggesting the smaller formations like the Furtwängler Glacier could vanish by 2030. The exact timeline depends on future precipitation patterns and global temperature trajectories. What is certain is that the ice is disappearing — over 91% has already been lost since 1912, and the rate of loss is accelerating, not slowing.",
  },
  {
    question: "What is the Furtwängler Glacier?",
    answer:
      "The Furtwängler Glacier is a remnant ice mass sitting on the summit plateau inside Kibo's crater, at approximately 5,800 metres elevation. Named after German mountaineer Walter Furtwängler who summited in 1912, it once covered much of the crater floor. Today it survives as an isolated block roughly 60 metres across. It is the glacier most climbers encounter because the trail between Stella Point and Uhuru Peak passes directly alongside it. Its dramatic shrinkage has made it a symbol of climate change on Kilimanjaro.",
  },
  {
    question: "Why are Kilimanjaro's glaciers melting?",
    answer:
      "Kilimanjaro's glacier loss is driven by multiple interconnected factors: global temperature increases raising the freezing altitude, reduced regional precipitation meaning less snowfall to replenish ice, deforestation on lower slopes reducing the moisture that becomes summit snowfall, intense equatorial solar radiation driving sublimation (ice converting directly to vapour), and albedo feedback where exposed dark rock absorbs more heat and accelerates surrounding ice loss. It is not a single cause but a cascade of reinforcing processes.",
  },
  {
    question: "Can you touch the glaciers on Kilimanjaro?",
    answer:
      "Yes, you can get very close to the glaciers and in some cases touch the ice walls. On the Machame and Lemosho routes, the summit night path along the crater rim passes within metres of the Southern Icefield's vertical ice cliffs. At the summit plateau, the Furtwängler Glacier is a short detour from the trail between Stella Point and Uhuru Peak. Your guide can take you alongside it. However, never attempt to climb on the ice — the vertical walls are unstable and calving (pieces breaking off) occurs regularly.",
  },
  {
    question: "Is climate change causing the glacier retreat?",
    answer:
      "Climate change is the overarching driver, but the mechanism is more nuanced than simple temperature-driven melting. The primary direct causes are reduced precipitation (less snow to sustain the ice) and increased sublimation driven by drier air and solar radiation. Rising temperatures contribute by raising the zero-degree isotherm and reducing snowfall in favour of rain at lower altitudes. Regional factors like deforestation also play a role by reducing moisture reaching the summit. Scientists agree that without human-caused climate change, the glaciers would not be disappearing at this rate.",
  },
  {
    question: "How big were Kilimanjaro's glaciers originally?",
    answer:
      "When first scientifically surveyed in 1912 by Hans Meyer and Fritz Klute, Kilimanjaro's glaciers covered approximately 12 square kilometres. Historical accounts from the 1880s suggest even greater ice cover before formal measurements began. The ice cap once formed a nearly continuous ring around the summit crater, with massive glaciers flowing down all flanks. Today, only about 1.1 square kilometres remain — a loss of over 91% in just over a century. The rate of loss has accelerated in recent decades.",
  },
  {
    question: "Which route has the best glacier views?",
    answer:
      "The 8-day Lemosho Route offers the most comprehensive glacier views because it approaches from the west and traverses to the south before summiting, providing perspectives on the Western Breach glaciers, the Southern Icefield from Barranco Wall, and an up-close encounter with the Furtwängler Glacier at the summit. For exclusive Northern Icefield views, the 9-day Northern Circuit is unmatched as it is the only route that passes along the northern flanks. The Machame Route also delivers dramatic ice wall views from the crater rim during summit night.",
  },
  {
    question: "Will Kilimanjaro still be worth climbing without glaciers?",
    answer:
      "Absolutely. The glaciers are one element of Kilimanjaro's appeal, but not the only one. The mountain offers five distinct ecological zones from tropical rainforest to alpine desert, extraordinary sunrise views from the Roof of Africa, a profound personal challenge, diverse wildlife in the lower zones, and the unique experience of standing on the highest freestanding mountain on Earth. That said, seeing the glaciers adds a powerful emotional dimension to the climb. If witnessing them matters to you, the time to climb is now — not in five years.",
  },
  {
    question: "Are the glaciers dangerous to climbers?",
    answer:
      "The glaciers themselves pose minimal direct danger to climbers on established routes. You walk alongside them, not on them. The main risk is from calving — pieces of ice breaking off the vertical walls, though this is infrequent and guides know which areas to avoid. The Western Breach route passes through a zone with occasional rockfall associated with ice melt undermining rocks, which is why we recommend it only for experienced climbers. On all other routes, the glaciers are a spectacular visual feature that you observe from a safe distance.",
  },
];

export default function KilimanjaroGlaciersPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Glaciers" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Glaciers", url: "/kilimanjaro-glaciers/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Glaciers: Why They're Disappearing",
            description:
              "Kilimanjaro's glaciers have lost 85%+ of their ice since 1912. Learn about the Furtwängler Glacier, Northern Icefield, and why scientists predict ice-free by 2040.",
            url: "/kilimanjaro-glaciers/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-06-18",
            modifiedTime: "2026-06-18",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Kilimanjaro glaciers visible on the summit with trekkers approaching Uhuru Peak"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
              Environment &amp; Science
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Glaciers</span>: Why They&apos;re Disappearing
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Over 91% of Kilimanjaro&apos;s ice has vanished since 1912. From the Furtw&auml;ngler Glacier to the Northern Icefield, here is what is happening, why, and what it means for climbers.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Kilimanjaro&apos;s glaciers have <strong>shrunk by over 85% since 1912</strong>. Scientists estimate the remaining ice &mdash; including the famous <strong>Furtw&auml;ngler Glacier</strong> and <strong>Northern Icefield</strong> &mdash; could disappear entirely by <strong>2040</strong>. Climate change, reduced snowfall, and increased sublimation are the primary drivers. You can still see and photograph these glaciers today, but the window is narrowing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kilimanjaro's Major Glaciers */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Kilimanjaro&apos;s Major Glaciers
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Six distinct ice formations remain on Kilimanjaro, each with its own character, history, and rate of retreat. Together they represent roughly 1.1 km&sup2; of ice &mdash; down from 12 km&sup2; in 1912.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {majorGlaciers.map((glacier) => (
                <div
                  key={glacier.name}
                  className={`bg-white/5 rounded-xl p-6 border ${glacier.borderColor}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Snowflake className={`w-5 h-5 ${glacier.color}`} />
                    <h3 className={`text-lg font-bold ${glacier.color}`}>
                      {glacier.name}
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 mb-3">{glacier.status}</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {glacier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline of Glacier Retreat */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Timeline of Glacier Retreat
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Over a century of scientific observation documents one of the most visible signs of climate change on Earth. The numbers tell an unambiguous story of accelerating ice loss.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Year</th>
                  <th className="text-left px-4 py-3 font-semibold">Ice Cover</th>
                  <th className="text-left px-4 py-3 font-semibold">Loss from 1912</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {retreatTimeline.map((row, i) => (
                  <tr
                    key={row.year}
                    className={`border-t border-[var(--border)] ${
                      row.year === "2030s–2040s"
                        ? "bg-red-50"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-bold">
                      {row.year}
                      {row.year === "2030s–2040s" && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                          Projected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{row.area}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${
                          row.loss === "—"
                            ? "bg-sky-100 text-sky-700"
                            : row.loss === "100%"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.loss}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Key insight:</strong> The rate of ice loss is accelerating. It took 41 years (1912&ndash;1953) to lose the first 44%, but only 30 years (1989&ndash;2020s) to lose the next 18%. The remaining ice is thinner, more fragmented, and more vulnerable to solar radiation than at any point in recorded history. For a broader look at Kilimanjaro&apos;s vital statistics, see our{" "}
                <Link href="/kilimanjaro-statistics/" className="text-amber-900 underline hover:no-underline">
                  Kilimanjaro statistics guide
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Are Kilimanjaro's Glaciers Melting? */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Are Kilimanjaro&apos;s Glaciers Melting?
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The answer is not as simple as &ldquo;global warming melts ice.&rdquo; Kilimanjaro&apos;s glacier loss is driven by a cascade of interconnected factors, several of which are unique to tropical mountains near the equator.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {meltingCauses.map((cause, i) => (
              <div
                key={cause.title}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <cause.icon className="w-6 h-6 text-sky-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{cause.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {cause.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-5xl mx-auto mt-6">
            <p className="text-sm text-[var(--text-muted)] text-center">
              Understanding the full picture of{" "}
              <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] hover:underline">
                Kilimanjaro&apos;s climate zones
              </Link>{" "}
              and{" "}
              <Link href="/kilimanjaro-weather/" className="text-[var(--primary)] hover:underline">
                weather patterns
              </Link>{" "}
              helps explain why glacier loss is accelerating at different rates across the mountain.
            </p>
          </div>
        </div>
      </section>

      {/* Can You Still See Glaciers on Kilimanjaro? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Eye className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Can You Still See Glaciers?
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Yes &mdash; and here is what to expect</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Every climber who reaches the crater rim or Uhuru Peak can still see Kilimanjaro&apos;s glaciers. They remain striking, dramatic, and deeply moving &mdash; towering walls of ancient ice standing against the equatorial sky at nearly 6,000 metres. But they are undeniably smaller than what photographs from even 10 years ago show.
              </p>

              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold text-lg mb-4">What You Will See at the Summit</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Snowflake className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Vertical Ice Walls (Crater Rim)</h4>
                      <p className="text-sm text-[var(--text-muted)]">
                        The Southern Icefield forms sheer ice cliffs along the crater rim that catch the first light at sunrise. These walls can be 10&ndash;15 metres high and are one of the most photographed features of the summit experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Snowflake className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Furtw&auml;ngler Glacier (Crater Floor)</h4>
                      <p className="text-sm text-[var(--text-muted)]">
                        Visible from the trail between Stella Point and Uhuru Peak, the Furtw&auml;ngler sits on the crater plateau as a solitary ice block. Your guide can take you alongside it for photographs. It is a sobering, beautiful sight.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Snowflake className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Northern Icefield (Northern Routes)</h4>
                      <p className="text-sm text-[var(--text-muted)]">
                        Kilimanjaro&apos;s largest remaining ice mass, visible from the Rongai and Northern Circuit routes. A vast expanse of white against the dark volcanic landscape &mdash; unmistakable and awe-inspiring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
                <Mountain className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-800 text-sm font-semibold mb-1">Our Guides&apos; Perspective</p>
                  <p className="text-emerald-800 text-sm">
                    Emmanuel has guided over 200 summits and has watched the glaciers recede year by year. &ldquo;When I started guiding in 2010, the ice walls along the crater rim were noticeably taller and the Furtw&auml;ngler Glacier was significantly larger. Every season the change is visible. I tell every climber: take your time at the summit. Look at the ice. Photograph it. Because what you see today will not be here in 15 years.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Glacier Loss Means for Climbers */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What Glacier Loss Means for Climbers
            </h2>

            <div className="space-y-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Glacier retreat is not just an environmental story &mdash; it directly affects the climbing experience on Kilimanjaro. Here is how the changing ice is reshaping the mountain for trekkers.
              </p>

              <div className="grid gap-4">
                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-2">Water Sources Are Shifting</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        Glacial meltwater feeds streams that some high camps rely on for water supply. As glaciers shrink, these water sources become less reliable. This has already caused operational changes at some camps, with porters carrying water from lower elevations. Your operator&apos;s logistics and camp planning matter more than ever.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-2">Routes Are Changing</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        The Western Breach route, which passes through a zone of receding ice, has seen increased rockfall as ice melt destabilises rocks previously held in place by frozen ground. The Arrow Glacier camp was closed after a fatal rockfall incident. Other routes remain safe, but the mountain&apos;s terrain continues to evolve as ice disappears. Our guides monitor conditions constantly and adjust itineraries when necessary.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-2">The Urgency Is Real</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        If seeing Kilimanjaro&apos;s glaciers is on your list, waiting is a risk. Every year the ice is smaller, thinner, and less dramatic. The Furtw&auml;ngler Glacier that trekkers photograph today is a fraction of what it was in 2015. Climbers who summit in 2026 or 2027 will see something that climbers in 2035 almost certainly will not. This is not marketing urgency &mdash; it is glaciological fact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                For a comprehensive look at what the climb involves, see our{" "}
                <Link href="/climbing-kilimanjaro/" className="text-[var(--primary)] hover:underline">
                  complete Kilimanjaro climbing guide
                </Link>{" "}
                and{" "}
                <Link href="/mount-kilimanjaro-height/" className="text-[var(--primary)] hover:underline">
                  Kilimanjaro height and summit details
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation & What's Being Done */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Conservation &amp; What&apos;s Being Done
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              While no local intervention can reverse the global forces driving glacier loss, significant efforts are underway to protect Kilimanjaro&apos;s broader ecosystem and document its changing ice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                <TreePine className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">KINAPA Reforestation</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Kilimanjaro National Park Authority (KINAPA) has led extensive reforestation projects on the mountain&apos;s lower slopes, planting millions of indigenous trees to restore the moisture cycle that feeds summit snowfall. Buffer zones around the park boundary have been expanded to curb agricultural encroachment. While reforestation cannot save the glaciers alone, it protects the broader water catchment that 2 million people depend on.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Climate Research on the Mountain</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Teams from Ohio State University, the University of Innsbruck, and Tanzanian research institutions maintain weather stations and conduct regular glacier surveys on the summit. Ice core data from Kilimanjaro has provided over 11,000 years of climate history. This research feeds into global climate models and keeps Kilimanjaro at the forefront of the conversation about tropical glacier loss.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sustainable Tourism Practices</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Park fees fund conservation directly &mdash; a portion of every climbing permit goes to habitat restoration and anti-poaching patrols. Operators like Snow Africa Adventure participate in Leave No Trace protocols, waste management programmes, and porter welfare standards that reduce the human footprint on the mountain. Responsible tourism is the economic engine that keeps conservation funded.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                <Compass className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">UNESCO World Heritage Monitoring</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Kilimanjaro National Park is a UNESCO World Heritage Site. The glacier retreat has triggered enhanced monitoring and reporting requirements, raising the international profile of the issue. UNESCO assessments have repeatedly highlighted the urgency of addressing the root causes &mdash; global emissions &mdash; while supporting local adaptation measures to protect the mountain&apos;s unique biodiversity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Routes for Glacier Views */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Seeing the Glaciers: Best Routes
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every summit route passes near glaciers, but some offer dramatically better views than others. If glacier photography and close encounters are a priority, choose your route accordingly.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {bestGlacierRoutes.map((route) => (
              <div
                key={route.route}
                className={`bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] ${
                  route.recommended ? "ring-2 ring-emerald-300" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      <Link
                        href={`/trekking/${route.slug}/`}
                        className="text-[var(--primary)] hover:underline"
                      >
                        {route.route}
                      </Link>
                      {route.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          Best Overall
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      <strong>Glacier views:</strong> {route.views}
                    </p>
                  </div>
                  <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-bold shrink-0">
                    {route.highlight}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {route.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link
              href="/best-route-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              See our full route comparison guide &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-[var(--border)] group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
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
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/mount-kilimanjaro-height/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingDown className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Height</p>
                <p className="text-xs text-[var(--text-muted)]">5,895m summit details</p>
              </Link>
              <Link href="/kilimanjaro-climate-zones/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Thermometer className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climate Zones</p>
                <p className="text-xs text-[var(--text-muted)]">Five ecosystems explained</p>
              </Link>
              <Link href="/kilimanjaro-weather/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <CloudRain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Weather</p>
                <p className="text-xs text-[var(--text-muted)]">Month-by-month conditions</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Compass className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all routes</p>
              </Link>
              <Link href="/kilimanjaro-statistics/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingDown className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Statistics</p>
                <p className="text-xs text-[var(--text-muted)]">Success rates &amp; data</p>
              </Link>
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <AlertTriangle className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-glaciers/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Snowflake className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            See the Glaciers Before They&apos;re Gone
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Kilimanjaro&apos;s glaciers are disappearing. With a 93% summit success rate on our recommended 8-day Lemosho route, experienced guides, and routes chosen for the best glacier views &mdash; climb now while the ice remains.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Browse Kilimanjaro Routes
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Join a Group Departure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
