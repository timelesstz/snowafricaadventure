import { Metadata } from "next";
import Link from "next/link";
import { Mountain, TreePalm, MapPin } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  ...genMeta({
    title: "Search Kilimanjaro Treks & Tanzania Safaris",
    description:
      "Search and find Kilimanjaro trekking routes, Tanzania safari packages, national park destinations, and expert travel guides. Plan your Tanzania adventure.",
    url: "/search/",
  }),
};

export default function SearchPage() {
  return (
    <div className="min-h-[80vh]">
      <SearchClient />

      {/* Browse by Category — server-rendered for SEO */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-3">
            Browse Our Tanzania Adventures
          </h2>
          <p className="text-[var(--text-muted)] text-center max-w-2xl mx-auto mb-10">
            Not sure what you&apos;re looking for? Explore our curated categories below to find your perfect Tanzania experience.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/trekking/" className="group bg-white rounded-lg border border-[var(--border)] p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Kilimanjaro Treks</h3>
              <p className="text-sm text-[var(--text-muted)]">
                6 routes to Africa&apos;s highest peak. From the scenic Lemosho to the classic Machame, find the route that matches your experience level and budget.
              </p>
            </Link>
            <Link href="/tanzania-safaris/" className="group bg-white rounded-lg border border-[var(--border)] p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <TreePalm className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Safari Packages</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Budget camping to luxury lodge safaris across the Serengeti, Ngorongoro Crater, Tarangire, and more. 3 to 14 day itineraries available.
              </p>
            </Link>
            <Link href="/tanzania-destinations/" className="group bg-white rounded-lg border border-[var(--border)] p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Destinations</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Explore Tanzania&apos;s national parks and game reserves — from the endless Serengeti plains to the remote chimp forests of Mahale and Gombe.
              </p>
            </Link>
            <Link href="/zanzibar/" className="group bg-white rounded-lg border border-[var(--border)] p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Zanzibar Beach</h3>
              <p className="text-sm text-[var(--text-muted)]">
                White sand beaches, spice tours, Stone Town history, and world-class snorkeling. The perfect post-safari or post-Kilimanjaro relaxation.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Searches — server-rendered for SEO */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">
            Popular Searches
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-heading font-semibold mb-3 text-[var(--primary)]">Kilimanjaro</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/trekking/8-days-lemosho-route/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Lemosho Route (8 Days)</Link></li>
                <li><Link href="/trekking/7-days-machame-route/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Machame Route (7 Days)</Link></li>
                <li><Link href="/trekking/6-days-marangu-route/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Marangu Route (6 Days)</Link></li>
                <li><Link href="/kilimanjaro-join-group-departures/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Group Departures 2026</Link></li>
                <li><Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Best Route to Climb</Link></li>
                <li><Link href="/climbing-kilimanjaro/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Climbing Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-3 text-[var(--primary)]">Safaris</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tanzania-destinations/serengeti-national-park/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Serengeti National Park</Link></li>
                <li><Link href="/tanzania-destinations/ngorongoro-crater/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Ngorongoro Crater</Link></li>
                <li><Link href="/tanzania-destinations/tarangire-national-park/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Tarangire National Park</Link></li>
                <li><Link href="/tanzania-safaris/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">All Safari Packages</Link></li>
                <li><Link href="/tailor-made-safari/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Tailor-Made Safaris</Link></li>
                <li><Link href="/tanzania-day-tours/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Day Tours from Arusha</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-3 text-[var(--primary)]">Planning</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/best-time-to-climb-kilimanjaro/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Best Time to Climb</Link></li>
                <li><Link href="/kilimanjaro-prices/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Kilimanjaro Prices</Link></li>
                <li><Link href="/how-hard-is-kilimanjaro/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">How Hard Is Kilimanjaro?</Link></li>
                <li><Link href="/can-beginners-climb-kilimanjaro/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Can Beginners Climb?</Link></li>
                <li><Link href="/kilimanjaro-training-plan/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Training Plan</Link></li>
                <li><Link href="/contact-us/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
