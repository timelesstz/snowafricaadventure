import Link from "next/link";
import { ArrowRight, Mountain, MapPin, ChevronRight } from "lucide-react";

/**
 * Blog archive sidebar. Extracted from the blog index so the paginated
 * /blog/page/N/ routes render the identical set of category and CTA links —
 * which also means every archive page carries the same internal links.
 */
export function BlogSidebar({
  categories,
}: {
  categories: { name: string; slug: string; count: number }[];
}) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-[var(--text)] mb-4">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">No categories yet.</p>
        ) : (
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}/`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-[var(--text)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs bg-[var(--muted)] px-2 py-1 rounded-full text-[var(--text-muted)]">
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Kilimanjaro CTA */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Mountain className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold">Climb Kilimanjaro</h3>
        </div>
        <p className="text-[var(--primary-light)] text-sm mb-5 leading-relaxed">
          Ready for the adventure of a lifetime? Join our expert guides on
          Africa&apos;s highest peak.
        </p>
        <Link
          href="/trekking/"
          className="flex items-center justify-center gap-2 bg-white text-[var(--primary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--primary-light)] transition-colors"
        >
          View Routes
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Safari CTA */}
      <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold">Tanzania Safari</h3>
        </div>
        <p className="text-[var(--secondary-light)] text-sm mb-5 leading-relaxed">
          Explore the Serengeti, Ngorongoro Crater, and more with our expert-led
          safaris.
        </p>
        <Link
          href="/tanzania-safaris/"
          className="flex items-center justify-center gap-2 bg-white text-[var(--secondary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--secondary-light)] transition-colors"
        >
          View Safaris
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Group Departures */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-[var(--border)]">
        <h3 className="font-semibold text-[var(--text)] mb-2">
          Join a Group Climb
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Fixed departure dates with fellow adventurers from around the world.
        </p>
        <Link
          href="/kilimanjaro-join-group-departures/"
          className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium group"
        >
          View 2026 Dates
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
