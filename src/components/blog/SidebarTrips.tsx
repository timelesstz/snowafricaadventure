import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Trees } from "lucide-react";
import { getTrips, type TripCard } from "./PlanYourTrip";

// Compact sidebar card under the table of contents: the three trips readers
// book most, then one link back to the quote form in the hero. Kept short so
// the sticky column fits a laptop screen without cutting anything off.
export async function SidebarTrips({ kind }: { kind: "kilimanjaro" | "safari" }) {
  let trips: TripCard[] = [];
  try {
    trips = await getTrips(kind);
  } catch (error) {
    console.error("[SidebarTrips] Failed to fetch trips:", error);
  }

  const isKili = kind === "kilimanjaro";
  const Fallback = isKili ? Mountain : Trees;

  return (
    <div className="shrink-0 rounded-2xl border border-[var(--border)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--secondary-ink)]">
        {isKili ? "Popular routes" : "Popular safaris"}
      </p>

      {trips.length > 0 && (
        <ul className="mt-3 divide-y divide-[var(--border)]">
          {trips.map((trip) => (
            <li key={trip.href}>
              <Link
                href={trip.href}
                className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--primary-tint)]">
                  {trip.image ? (
                    <Image src={trip.image} alt="" fill sizes="44px" className="object-cover" />
                  ) : (
                    <Fallback className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary-dark)]">
                    {trip.title}
                  </span>
                  <span className="block truncate text-xs text-[var(--text-muted)]">
                    {[trip.duration, trip.detail].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <a
        href="#quick-quote"
        className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-[var(--secondary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-dark)] transition-colors hover:bg-[var(--secondary-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-dark)]"
      >
        Get a free quote
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <Link
        href={isKili ? "/kilimanjaro-join-group-departures/" : "/tanzania-safaris/"}
        className="mt-2 block text-center text-sm font-medium text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
      >
        {isKili ? "See group departure dates" : "See all safaris"}
      </Link>
    </div>
  );
}
