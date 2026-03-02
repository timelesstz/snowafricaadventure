import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari Destinations Guide",
  description:
    "Complete guide to Tanzania's top safari destinations: Serengeti National Park, Ngorongoro Crater, Tarangire, Lake Manyara, Kilimanjaro & Zanzibar. Wildlife, best time to visit & park fees.",
  url: "/tanzania-destinations/",
});

const DESTINATION_FAQS = [
  {
    question: "What are the best safari destinations in Tanzania?",
    answer: "The most popular destinations are the Serengeti National Park (Great Migration), Ngorongoro Crater (Big Five in one day), Tarangire (elephant herds), and Lake Manyara (tree-climbing lions). These four parks form the famous Northern Circuit and can be combined in a 5-10 day safari.",
  },
  {
    question: "How much does it cost to visit Tanzania's national parks?",
    answer: "Park entry fees vary by park. Serengeti and Ngorongoro are $70 per adult per 24 hours. Tarangire and Lake Manyara are $53 per adult per 24 hours. Kilimanjaro is $70 per day. Children aged 5-15 pay reduced rates ($18-20). Vehicle fees range from $40-$200 depending on the park.",
  },
  {
    question: "When is the best time to visit Tanzania for safari?",
    answer: "The dry season (June-October) offers the best wildlife viewing as animals gather around water sources. However, Tanzania is a year-round destination. January-March brings calving season in the Serengeti. The green season (November-May) offers fewer crowds, lower prices, and excellent birdwatching.",
  },
  {
    question: "Can I combine a safari with Kilimanjaro trekking?",
    answer: "Yes, this is one of the most popular Tanzania itineraries. Most travellers climb Kilimanjaro first (5-9 days), then recover with a 3-5 day Northern Circuit safari, and optionally add 2-3 days in Zanzibar. The total trip is typically 12-18 days.",
  },
  {
    question: "What is the Great Migration and when can I see it?",
    answer: "The Great Migration is the annual movement of over 1.5 million wildebeest, 250,000 zebras, and 500,000 gazelles across the Serengeti-Mara ecosystem. It happens year-round in different locations: calving in the south (Jan-March), moving northwest (April-June), Mara River crossings (July-October), and returning south (Nov-Dec).",
  },
  {
    question: "Is Tanzania safe for tourists?",
    answer: "Tanzania is one of the safest countries in East Africa for tourists. Safari parks are well-managed by TANAPA (Tanzania National Parks Authority), and all game drives are led by licensed, experienced guides. Standard travel precautions apply: avoid walking alone at night in cities, keep valuables secure, and drink bottled water.",
  },
  {
    question: "Do I need a visa to visit Tanzania?",
    answer: "Most nationalities can obtain a Tanzania tourist visa on arrival at Kilimanjaro International Airport (JRO) or Dar es Salaam (DAR) for $50. US citizens require a multiple-entry visa ($100). E-visas are also available online through the Tanzania immigration portal. Your passport must be valid for at least 6 months.",
  },
  {
    question: "What vaccinations do I need for Tanzania?",
    answer: "Yellow fever vaccination is required if arriving from an endemic country. Recommended vaccinations include hepatitis A and B, typhoid, and tetanus. Malaria prophylaxis is strongly recommended for all safari destinations. Consult your travel doctor 6-8 weeks before departure.",
  },
  {
    question: "What is the difference between Northern and Southern Circuit safaris?",
    answer: "The Northern Circuit (Serengeti, Ngorongoro, Tarangire, Lake Manyara) is more popular, better connected, and famous for the Great Migration. The Southern Circuit (Nyerere/Selous, Ruaha, Mikumi) is more remote, less crowded, and offers boat safaris and walking safaris. Both circuits provide excellent Big Five sightings.",
  },
  {
    question: "How many days do I need for a Tanzania safari?",
    answer: "A minimum of 3-4 days covers 2-3 parks on the Northern Circuit. For a comprehensive experience including the Serengeti, we recommend 6-8 days. Adding Kilimanjaro requires 5-9 additional days, and Zanzibar is typically 2-4 days. Most visitors spend 7-14 days in Tanzania total.",
  },
];

async function getDestinations() {
  try {
    const destinations = await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return destinations;
  } catch {
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  // Placeholder data for development
  const placeholderDestinations = [
    {
      id: "1",
      name: "Serengeti National Park",
      slug: "serengeti-national-park",
      shortDescription:
        "The endless plains of Serengeti host the Great Migration and offer unparalleled wildlife viewing year-round.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
      highlights: ["Great Migration", "Big Five", "Endless Plains"],
    },
    {
      id: "2",
      name: "Ngorongoro Crater",
      slug: "ngorongoro-crater",
      shortDescription:
        "The world's largest intact volcanic caldera, home to an incredible concentration of wildlife.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg",
      highlights: ["UNESCO World Heritage", "Big Five", "Crater Floor"],
    },
    {
      id: "3",
      name: "Tarangire National Park",
      slug: "tarangire-national-park",
      shortDescription:
        "Famous for its giant baobab trees and large elephant herds, especially during the dry season.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
      highlights: ["Elephant Herds", "Baobab Trees", "Bird Watching"],
    },
    {
      id: "4",
      name: "Lake Manyara National Park",
      slug: "lake-manyara-national-park",
      shortDescription:
        "A compact park known for tree-climbing lions, flamingos, and diverse ecosystems.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Lake-manyara-national-park.jpg",
      highlights: ["Tree-climbing Lions", "Flamingos", "Hot Springs"],
    },
    {
      id: "5",
      name: "Mount Kilimanjaro",
      slug: "mount-kilimanjaro",
      shortDescription:
        "Africa's highest peak and the world's tallest free-standing mountain at 5,895m.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
      highlights: ["Uhuru Peak", "Glaciers", "5 Climate Zones"],
    },
    {
      id: "6",
      name: "Zanzibar Island",
      slug: "zanzibar-island",
      shortDescription:
        "The Spice Island offers pristine beaches, historic Stone Town, and rich Swahili culture.",
      heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Kwale-Island-q3hixrn6vumez8p4r8n0xtnsqincj7k0dg7q485hi8.jpg",
      highlights: ["Stone Town", "Spice Tours", "Beach Paradise"],
    },
  ];

  const displayDestinations =
    destinations.length > 0 ? destinations : placeholderDestinations;

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Tanzania Destinations" }]} />
      </div>
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tanzania Destinations", url: "/tanzania-destinations/" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Tanzania Destinations
          </h1>
          <p className="text-xl text-[var(--secondary-light)] max-w-2xl">
            From the endless plains of Serengeti to the beaches of Zanzibar,
            discover Tanzania&apos;s most spectacular destinations.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Explore East Africa&apos;s Crown Jewels
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Tanzania is blessed with an extraordinary diversity of landscapes
              and wildlife. Our safaris take you through the famous Northern
              Circuit, home to some of the world&apos;s most celebrated national
              parks and conservation areas.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDestinations.map((destItem) => {
              // Handle both DB and placeholder structures
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const dest = destItem as any;
              return (
                <DestinationCard
                  key={dest.id}
                  name={dest.name}
                  slug={dest.slug}
                  circuit={dest.circuit || "Northern"}
                  description={dest.description || dest.shortDescription || ""}
                  featuredImage={dest.featuredImage || dest.heroImage || "/images/placeholder-destination.jpg"}
                  wildlife={dest.wildlife || dest.highlights || ["Various wildlife"]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Park Guides */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              In-Depth Guide to Tanzania&apos;s Top Safari Destinations
            </h2>

            {/* Serengeti */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Serengeti National Park</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Covering 14,763 square kilometres of savannah, the Serengeti is Tanzania&apos;s most famous national park and a UNESCO World Heritage Site since 1981. The name comes from the Maasai word &quot;siringet,&quot; meaning &quot;endless plains&quot; — an apt description for the vast grasslands that stretch to the horizon. The Serengeti is home to over 1.5 million wildebeest, 250,000 zebras, and 500,000 Thomson&apos;s gazelles that make up the Great Migration, one of the most spectacular wildlife events on Earth.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Wildlife:</strong> All of the Big Five (lion, leopard, elephant, buffalo, rhino) are present. The Serengeti has the highest concentration of lions in Africa — an estimated 3,000 individuals. Cheetah, spotted hyena, African wild dog, giraffe, and over 500 bird species also call the park home.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Best time to visit:</strong> The Serengeti offers year-round wildlife viewing. For the Great Migration river crossings at the Mara River, visit between July and October. Calving season in the southern Serengeti plains runs from January to March — over 8,000 calves are born daily during the peak.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Park fees (2026):</strong> $70 per adult per 24 hours. Children aged 5-15 pay $20. Concession camping fees range from $30-$50 per night.
              </p>
            </div>

            {/* Ngorongoro */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Ngorongoro Conservation Area &amp; Crater</h3>
              <p className="text-[var(--text-muted)] mb-4">
                The Ngorongoro Crater is the world&apos;s largest intact, unflooded volcanic caldera, measuring 19 kilometres across and 610 metres deep. The crater floor covers 264 square kilometres and is home to approximately 25,000 large animals, making it one of the most densely populated wildlife areas on the planet. The broader Ngorongoro Conservation Area (NCA) spans 8,292 square kilometres and is a UNESCO World Heritage Site.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Wildlife:</strong> The crater is one of the best places in Tanzania to spot the critically endangered black rhino — around 26 individuals reside on the crater floor. The lake at the centre attracts large flocks of flamingos. Lions, elephants, buffalo, zebra, wildebeest, and hippos are all easily spotted in a single game drive. Notably, giraffe are rarely seen inside the crater due to the steep walls.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Unique features:</strong> The NCA is the only conservation area in Tanzania where wildlife and indigenous Maasai pastoralists coexist. The nearby Olduvai Gorge is one of the most important archaeological sites in the world, where Louis and Mary Leakey discovered early human fossils dating back 1.8 million years.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Park fees (2026):</strong> NCA entry is $70 per adult per 24 hours. An additional crater service fee of $200 per vehicle applies per descent.
              </p>
            </div>

            {/* Tarangire */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Tarangire National Park</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Tarangire National Park covers 2,850 square kilometres and is named after the Tarangire River, the only permanent water source in the area during the dry season. This draws enormous concentrations of wildlife between June and October, particularly elephants — the park is famous for having some of the largest elephant herds in northern Tanzania, with over 3,000 elephants during the dry season.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Wildlife:</strong> Beyond elephants, Tarangire supports large populations of wildebeest, zebra, hartebeest, eland, and fringe-eared oryx. The park has excellent predator sightings including lion, leopard, and occasionally African wild dog. Over 550 bird species have been recorded, making it one of the top birding destinations in East Africa. The park&apos;s ancient baobab trees — some over 1,000 years old — create a unique landscape unlike any other in the Northern Circuit.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Best time to visit:</strong> Dry season (June-October) is best for concentrated wildlife at the river. The green season (November-May) is excellent for birdwatching with migratory species present. Park fees are $53 per adult per 24 hours.
              </p>
            </div>

            {/* Lake Manyara */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Lake Manyara National Park</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Compact but remarkably diverse, Lake Manyara National Park covers just 330 square kilometres, with the alkaline lake itself making up two-thirds of the park area. Despite its small size, Lake Manyara packs extraordinary biodiversity — Ernest Hemingway called it &quot;the loveliest lake in Africa.&quot; The park stretches along the base of the Great Rift Valley escarpment, creating a dramatic 600-metre backdrop.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Wildlife:</strong> Lake Manyara is famous for its tree-climbing lions, a unique behaviour rarely observed elsewhere in Africa. The lake attracts millions of flamingos at certain times of year, creating a stunning pink shoreline. Hippo pools are another highlight, along with large troops of olive baboons at the park entrance. Over 400 bird species have been recorded.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Activities:</strong> Beyond traditional game drives, Lake Manyara offers night game drives (one of few parks in Tanzania to allow this), canoeing on the lake, walking safaris, and mountain biking along the lakeshore. Park fees are $53 per adult per 24 hours.
              </p>
            </div>

            {/* Kilimanjaro */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Mount Kilimanjaro National Park</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Mount Kilimanjaro is Africa&apos;s highest mountain at 5,895 metres (19,341 feet) and the world&apos;s tallest free-standing mountain. Located in northeastern Tanzania near the town of Moshi, Kilimanjaro is a dormant stratovolcano with three volcanic cones: Kibo (the highest), Mawenzi, and Shira. The national park was established in 1973 and designated a UNESCO World Heritage Site in 1987.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Climate zones:</strong> One of Kilimanjaro&apos;s most remarkable features is its five distinct climate zones. Climbers pass through cultivation zone (800-1,800m), rainforest (1,800-2,800m), heath and moorland (2,800-4,000m), alpine desert (4,000-5,000m), and the arctic summit zone (5,000-5,895m). This progression takes trekkers from tropical forest to glacial ice within just five to nine days.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Trekking routes:</strong> Seven official routes lead to the summit. The most popular are Machame (6-7 days, 90% success rate with acclimatization), Lemosho (7-8 days, highest success rate at 95%), and Marangu (5-6 days, the only route with hut accommodation). Park fees start at $70 per adult per day.
              </p>
            </div>

            {/* Zanzibar */}
            <div className="mb-10">
              <h3 className="font-heading text-2xl font-bold mb-3">Zanzibar Archipelago</h3>
              <p className="text-[var(--text-muted)] mb-4">
                The Zanzibar Archipelago lies 25-50 kilometres off the Tanzanian coast in the Indian Ocean. The main island, Unguja (commonly called Zanzibar), and its sister island Pemba offer a perfect contrast to mainland safari experiences. Zanzibar&apos;s Stone Town — the historic quarter of Zanzibar City — is a UNESCO World Heritage Site with a labyrinth of narrow streets, ornate carved doors, and centuries-old Arab, Persian, Indian, and European architecture.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                <strong>Beaches:</strong> Zanzibar is ringed by white-sand beaches and turquoise waters. Nungwi and Kendwa on the north coast are the most popular, while the east coast beaches (Paje, Jambiani) are famous for kitesurfing and seaweed farming. The Mnemba Atoll, just off the northeast coast, is one of East Africa&apos;s premier snorkelling and diving sites with over 600 species of fish.
              </p>
              <p className="text-[var(--text-muted)]">
                <strong>Activities:</strong> Spice tours through clove, nutmeg, cinnamon, and vanilla plantations; Jozani Forest (home to the endemic red colobus monkey); dolphin tours at Kizimkazi; and sunset dhow cruises. Most visitors combine 2-3 days in Zanzibar after a mainland safari for the perfect Tanzania itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Park Fees Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Tanzania National Park Fees (2026-2027)
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="text-left p-4 font-semibold">Destination</th>
                  <th className="text-center p-4 font-semibold">Adult (per 24h)</th>
                  <th className="text-center p-4 font-semibold">Child 5-15</th>
                  <th className="text-center p-4 font-semibold">Vehicle Fee</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-muted)]">
                <tr className="border-b border-[var(--border)]">
                  <td className="p-4 font-medium text-[var(--text)]">Serengeti National Park</td>
                  <td className="p-4 text-center">$70</td>
                  <td className="p-4 text-center">$20</td>
                  <td className="p-4 text-center">$40</td>
                </tr>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                  <td className="p-4 font-medium text-[var(--text)]">Ngorongoro Conservation Area</td>
                  <td className="p-4 text-center">$70</td>
                  <td className="p-4 text-center">$20</td>
                  <td className="p-4 text-center">$200 (crater)</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-4 font-medium text-[var(--text)]">Tarangire National Park</td>
                  <td className="p-4 text-center">$53</td>
                  <td className="p-4 text-center">$18</td>
                  <td className="p-4 text-center">$40</td>
                </tr>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                  <td className="p-4 font-medium text-[var(--text)]">Lake Manyara National Park</td>
                  <td className="p-4 text-center">$53</td>
                  <td className="p-4 text-center">$18</td>
                  <td className="p-4 text-center">$40</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-4 font-medium text-[var(--text)]">Kilimanjaro National Park</td>
                  <td className="p-4 text-center">$70/day</td>
                  <td className="p-4 text-center">$20/day</td>
                  <td className="p-4 text-center">N/A</td>
                </tr>
                <tr className="bg-[var(--surface)]">
                  <td className="p-4 font-medium text-[var(--text)]">Arusha National Park</td>
                  <td className="p-4 text-center">$53</td>
                  <td className="p-4 text-center">$18</td>
                  <td className="p-4 text-center">$40</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-[var(--text-light)] mt-3 text-center">
              Fees set by TANAPA (Tanzania National Parks Authority). All fees payable in USD. Children under 5 enter free. Fees subject to change — contact us for current rates.
            </p>
          </div>
        </div>
      </section>

      {/* Northern Circuit Map Section */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4">
                The Northern Safari Circuit
              </h2>
              <p className="text-[var(--primary-light)] mb-4">
                The Northern Circuit is Tanzania&apos;s most popular safari region, centred around the city of Arusha — the &quot;safari capital&quot; of East Africa. This circuit connects four of Tanzania&apos;s most celebrated parks: Tarangire, Lake Manyara, Ngorongoro, and the Serengeti. All are accessible by road from Arusha within 3-4 hours, making multi-park itineraries easy to arrange.
              </p>
              <p className="text-[var(--primary-light)] mb-6">
                Most safaris begin in Arusha and follow a logical loop: Tarangire first for elephant herds and baobabs, then Lake Manyara for tree-climbing lions, Ngorongoro Crater for the Big Five in one day, and finally the Serengeti for the Great Migration. A typical Northern Circuit safari takes 5-10 days.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>All parks within 3-4 hours of Arusha</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Year-round wildlife viewing across all four parks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Great Migration in Serengeti December to July</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Combine with Kilimanjaro trek or Zanzibar beach</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Camping and lodge options for all budgets</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-[var(--primary-light)]">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Southern Circuit */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-4 text-center">
              The Southern Safari Circuit
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-8 max-w-3xl mx-auto">
              For travellers seeking a more remote and exclusive safari experience, Tanzania&apos;s Southern Circuit offers pristine wilderness with far fewer tourists than the north.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Nyerere National Park (Selous)</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Africa&apos;s largest game reserve at over 30,000 square kilometres — larger than Switzerland. Renamed in 2019 to honour Tanzania&apos;s founding father, Julius Nyerere. Offers boat safaris on the Rufiji River, walking safaris, and traditional game drives. Home to the largest population of African wild dogs on the continent.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Ruaha National Park</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Tanzania&apos;s largest national park at 20,226 square kilometres. The Great Ruaha River runs through the park, attracting huge concentrations of wildlife during the dry season. Ruaha is known for its large lion prides, significant elephant population (over 12,000), and the rare sable and roan antelope.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Mikumi National Park</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Often called &quot;Little Serengeti&quot; for its similar open grasslands, Mikumi is the most accessible southern park — just 4 hours from Dar es Salaam. The Mkata Floodplain provides excellent year-round game viewing with lion, elephant, giraffe, and large herds of buffalo.
                </p>
              </div>
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Katavi National Park</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  One of Tanzania&apos;s most remote and least-visited parks, Katavi offers a truly wild experience. During the dry season, the Katuma River and seasonal lakes concentrate hippos in pods of hundreds and buffalo herds of thousands — scenes reminiscent of historical Africa before human expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Best Time to Visit Tanzania
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-3xl mx-auto">
            Tanzania offers excellent wildlife viewing year-round, but each season brings unique experiences. Here&apos;s how to choose the best time for your safari.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>☀️</span> Dry Season
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">June - October</p>
              <p className="text-[var(--text-muted)] text-sm">
                Peak safari season. Animals congregate around water sources, making wildlife viewing predictable and spectacular. Vegetation thins out for better visibility. Clear skies ideal for Kilimanjaro climbs. This is the busiest and most expensive period — book 3-6 months in advance.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🌱</span> Green Season
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">November - May</p>
              <p className="text-[var(--text-muted)] text-sm">
                Also called the &quot;shoulder season.&quot; Dramatic thunderstorm skies make for incredible photography. Newborn animals provide heartwarming sightings. Migratory birds arrive for world-class birding. Fewer tourists and lower prices — up to 30% savings on accommodation.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🦁</span> Migration
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">Year-round Movement</p>
              <p className="text-[var(--text-muted)] text-sm">
                The Great Migration never stops. <strong>Jan-March:</strong> Calving in southern Serengeti (8,000 calves born daily). <strong>April-June:</strong> Herds move northwest. <strong>July-October:</strong> Dramatic Mara River crossings. <strong>Nov-Dec:</strong> Return south through eastern Serengeti.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🏔️</span> Kilimanjaro
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">Jan-March, Jun-October</p>
              <p className="text-[var(--text-muted)] text-sm">
                Best climbing months with clearer skies and drier conditions. January-March offers warmer temperatures. June-October provides the driest trails. The summit is accessible year-round, but April-May and November have heavier rainfall on lower slopes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Plan Section */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              How to Plan Your Tanzania Safari
            </h2>
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Choose Your Destinations</h3>
                  <p className="text-[var(--text-muted)]">
                    Select 2-4 destinations based on your interests. For first-time visitors, we recommend the Northern Circuit: Tarangire, Ngorongoro Crater, and Serengeti. Add Zanzibar for a beach extension.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Pick Your Travel Dates</h3>
                  <p className="text-[var(--text-muted)]">
                    Align your travel with what you want to see. Migration river crossings peak July-October. Calving season is January-March. Budget travellers benefit from April-May green season rates.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Select Your Accommodation Style</h3>
                  <p className="text-[var(--text-muted)]">
                    Choose from budget camping ($150-200/day), mid-range tented camps ($250-400/day), or luxury lodges ($500-1,500/day). Each tier provides excellent game viewing — the main difference is comfort level.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">4</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Book With a Local Operator</h3>
                  <p className="text-[var(--text-muted)]">
                    Booking directly with a Tanzania-based operator like Snow Africa Adventure ensures better prices and personalized service. We handle park permits, transport, guides, and accommodation. Typical lead time is 2-6 months for peak season.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">5</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Prepare for Your Trip</h3>
                  <p className="text-[var(--text-muted)]">
                    Arrange your Tanzania tourist visa ($50, available on arrival), check vaccination requirements (yellow fever if arriving from endemic countries), and pack neutral-coloured clothing, binoculars, sunscreen, and a good camera.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              Frequently Asked Questions About Tanzania Destinations
            </h2>
            <div className="space-y-3">
              {DESTINATION_FAQS.map((faq, index) => (
                <details key={index} className="bg-white border border-[var(--border)] rounded-lg group">
                  <summary className="p-4 cursor-pointer font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-[var(--text-light)] group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-[var(--text-muted)]">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + HowTo Schema */}
      <MultiJsonLd schemas={[
        generateFAQSchema(DESTINATION_FAQS),
        generateHowToSchema({
          name: "How to Plan a Tanzania Safari",
          description: "Step-by-step guide to planning your Tanzania safari, from choosing destinations to preparing for your trip.",
          totalTime: "P14D",
          estimatedCost: { currency: "USD", value: 2500 },
          steps: [
            { name: "Choose Your Destinations", text: "Select 2-4 destinations based on your interests. For first-time visitors, we recommend the Northern Circuit: Tarangire, Ngorongoro Crater, and Serengeti. Add Zanzibar for a beach extension." },
            { name: "Pick Your Travel Dates", text: "Align your travel with what you want to see. Migration river crossings peak July-October. Calving season is January-March. Budget travellers benefit from April-May green season rates." },
            { name: "Select Your Accommodation Style", text: "Choose from budget camping ($150-200/day), mid-range tented camps ($250-400/day), or luxury lodges ($500-1,500/day)." },
            { name: "Book With a Local Operator", text: "Book directly with a Tanzania-based operator like Snow Africa Adventure for better prices and personalized service. Typical lead time is 2-6 months for peak season." },
            { name: "Prepare for Your Trip", text: "Arrange your Tanzania tourist visa ($50, available on arrival), check vaccination requirements, and pack neutral-coloured clothing, binoculars, sunscreen, and a good camera." },
          ],
        }),
      ]} />

      {/* CTA */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Explore Tanzania?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-2xl mx-auto">
            Let us help you plan your perfect safari adventure. Our Arusha-based team
            knows these destinations inside out and will create an itinerary
            tailored to your interests, budget, and travel dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us/"
              className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Planning Your Safari
            </Link>
            <Link
              href="/tanzania-safaris/"
              className="inline-block bg-white border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Safari Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
