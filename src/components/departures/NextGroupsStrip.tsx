import { format } from "date-fns";
import { ArrowRight, Moon } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { parseCalendarDate } from "@/lib/departure-rules";

export interface StripDeparture {
  id: string;
  route: { name: string };
  arrivalDate: string;
  endDate: string;
  price: number;
  earlyBirdPrice: number | null;
  maxParticipants: number;
  bookedSpots: number;
  availableSpots: number;
  isFullMoon: boolean;
}

/**
 * Horizontal strip of the next open groups. Seat counts come from the page's
 * database query (paid seats plus requests from the last 14 days), so they
 * drop as groups fill; the page refreshes on every booking and every 60 seconds.
 */
export function NextGroupsStrip({ departures, limit = 8 }: { departures: StripDeparture[]; limit?: number }) {
  const open = departures.filter((d) => d.availableSpots > 0).slice(0, limit);
  if (open.length === 0) return null;

  return (
    <div className="mt-8 md:mt-10">
      <div className="flex items-end justify-between gap-4 mb-3">
        <div>
          <h2 className="font-heading text-base font-semibold">Next groups with open seats</h2>
          <p className="text-xs text-white/70 mt-0.5">
            Pick a date to request a seat. No payment today.
          </p>
        </div>
        <a
          href="#departures"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--secondary)] hover:underline shrink-0"
        >
          All dates <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      <ul
        className="-mx-4 px-4 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]"
        aria-label="Upcoming group departures"
      >
        {open.map((dep) => {
          const start = parseCalendarDate(dep.arrivalDate);
          const end = parseCalendarDate(dep.endDate);
          const price = dep.earlyBirdPrice ?? dep.price;
          const left = dep.availableSpots;
          const taken = dep.maxParticipants - left;
          const few = left <= 3;
          return (
            <li key={dep.id} className="snap-start shrink-0 w-[11.5rem]">
              <a
                href={`?departure=${dep.id}#booking-form`}
                className="group flex h-full flex-col rounded-lg bg-white text-[var(--text)] px-3 py-2.5 ring-1 ring-black/5 transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
                aria-label={`${dep.route.name}, ${format(start, "MMM d")} to ${format(end, "MMM d, yyyy")}, ${left} of ${dep.maxParticipants} seats left. Request a seat`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading text-sm font-bold whitespace-nowrap">
                    {format(start, "MMM d")}
                    <span className="font-normal text-[var(--text-muted)]"> – {format(end, "MMM d")}</span>
                  </span>
                  {dep.isFullMoon && (
                    <span title="Full moon summit" className="text-amber-700">
                      <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs font-medium leading-snug truncate">{dep.route.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {format(start, "yyyy")} · from {formatPrice(price)} pp
                </div>

                <div className="mt-2.5 flex gap-px" aria-hidden="true">
                  {Array.from({ length: dep.maxParticipants }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < taken ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className={few ? "font-semibold text-amber-800" : "text-[var(--text-muted)]"}>
                    {left} of {dep.maxParticipants} seats left
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-semibold text-[var(--primary)]">
                    Join <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
