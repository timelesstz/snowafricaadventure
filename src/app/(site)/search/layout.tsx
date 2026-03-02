import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Search",
  description:
    "Search for Kilimanjaro climbing routes, Tanzania safari packages, destinations, and travel guides. Find your perfect Tanzania adventure.",
  url: "/search/",
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* SEO Content — Discover Tanzania Adventures */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6 text-[var(--text)]">
              Discover Tanzania Adventures with Snow Africa
            </h2>
            <div className="prose prose-slate prose-lg max-w-none space-y-4 text-[var(--text-muted)]">
              <p>
                Snow Africa Adventure is a Tanzania-based tour operator specialising in Mount Kilimanjaro climbing expeditions, Tanzania safari packages, and tailor-made East African adventures. Based in Arusha — the gateway to Africa&apos;s greatest wildlife parks and the world&apos;s highest free-standing mountain — we have helped thousands of travellers from over 60 countries achieve their African adventure dreams safely, responsibly, and memorably.
              </p>
              <p>
                Whether you&apos;re searching for the perfect Kilimanjaro route, planning a family safari to the Serengeti, looking for a beach escape on the shores of Zanzibar, or piecing together a multi-country East African itinerary, our search tool connects you instantly to our complete portfolio of adventures. Use the search bar above to find exactly what you&apos;re looking for, or browse the popular categories below.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Kilimanjaro Climbing Routes
              </h3>
              <p>
                Mount Kilimanjaro (5,895m) is Africa&apos;s highest peak and one of the world&apos;s Seven Summits. It is a non-technical climb accessible to fit, determined travellers of all ages — no mountaineering experience is required. Snow Africa Adventure offers all major routes: the scenic 8-Day Lemosho Route (our highest success rate at 95%+), the challenging and beautiful 7-Day Machame Route (known as the &quot;Whiskey Route&quot;), the quieter northern approach via the 6-Day Rongai Route, and the classic 5 or 6-Day Marangu Route (the &quot;Coca-Cola Route&quot;). Each route has its own character, acclimatization profile, and scenery. Our expert mountain guides will help you choose the route that best matches your fitness level, time available, and personal goals. All our Kilimanjaro packages include KINAPA-certified guides, porters, all meals, camping equipment, park fees, and emergency oxygen.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Tanzania Safari Packages
              </h3>
              <p>
                Tanzania is home to some of Africa&apos;s most spectacular wildlife destinations. The Serengeti National Park hosts the legendary Great Migration — over 1.5 million wildebeest and hundreds of thousands of zebra making their annual journey across the plains in one of nature&apos;s greatest spectacles. The Ngorongoro Crater, a UNESCO World Heritage Site and one of the world&apos;s largest intact volcanic calderas, shelters extraordinary densities of wildlife including one of Africa&apos;s last viable black rhino populations. Tarangire National Park is famous for its ancient baobab trees and vast elephant herds, while Lake Manyara is renowned for its tree-climbing lions and flamingo-studded shores.
              </p>
              <p>
                Snow Africa Adventure offers a full range of safari packages — from budget camping safaris to luxury lodge experiences — across Tanzania&apos;s northern, southern, and western circuits. Our safaris can be combined with Kilimanjaro climbs, Zanzibar beach extensions, or multi-country itineraries including Kenya, Rwanda, and Uganda.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Tanzania Destinations Guide
              </h3>
              <p>
                Beyond the world-famous northern circuit, Tanzania harbours remarkable wilderness destinations that most travellers never discover. Ruaha National Park — Tanzania&apos;s largest — offers a raw, uncrowded safari experience with exceptional populations of elephant, lion, leopard, and African wild dog. Katavi National Park in the remote west delivers extraordinary dry-season concentrations of hippos and buffalo that rival anything in Africa. The chimpanzee forests of Mahale Mountains National Park on the shores of Lake Tanganyika offer one of East Africa&apos;s most intimate wildlife encounters. The Selous Game Reserve (now Nyerere National Park), Africa&apos;s largest protected area, is renowned for its boat safaris along the Rufiji River.
              </p>
              <p>
                Our destination guides provide everything you need to plan your visit: the best time to go, what wildlife to expect, how to get there, and which accommodation options suit your budget and style.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-3 not-prose mt-4">
                {[
                  { label: "Lemosho Route", href: "/trekking/8-days-lemosho-route/" },
                  { label: "Machame Route", href: "/trekking/7-days-machame-route/" },
                  { label: "Serengeti Safari", href: "/tanzania-destinations/serengeti-national-park/" },
                  { label: "Ngorongoro Crater", href: "/tanzania-destinations/ngorongoro-crater/" },
                  { label: "Group Departures", href: "/kilimanjaro-join-group-departures/" },
                  { label: "Zanzibar Packages", href: "/zanzibar/" },
                  { label: "All Safaris", href: "/tanzania-safaris/" },
                  { label: "All Routes", href: "/trekking/" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-block px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
