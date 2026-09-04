import { generateRecommendations } from "@/lib/seo-dashboard/recommendation-engine";
import RecommendationCard from "@/components/admin/seo/RecommendationCard";
import type { Recommendation } from "@/lib/seo-dashboard/types";

export const dynamic = "force-dynamic";

/**
 * SEO recommendations.
 *
 * This page used to bucket everything by severity, which sounds useful but
 * wasn't: the engine marked almost everything "critical", so it rendered as a
 * flat wall of forty red cards with no way to tell which two were worth an
 * afternoon. Severity now means something (see recommendation-engine.ts), and
 * the page is organised by the question actually being asked — what should I
 * do first — rather than by how alarming each item looks.
 */

function Section({
  title,
  note,
  items,
  open = false,
}: {
  title: string;
  note?: string;
  items: Recommendation[];
  open?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <details open={open} className="group">
      <summary className="cursor-pointer list-none flex items-baseline gap-2 py-2">
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <span className="text-xs text-slate-500">({items.length})</span>
        <span className="text-xs text-slate-400 ml-auto group-open:hidden">
          show
        </span>
        <span className="text-xs text-slate-400 ml-auto hidden group-open:inline">
          hide
        </span>
      </summary>
      {note && <p className="text-xs text-slate-500 mb-3 max-w-3xl">{note}</p>}
      <div className="space-y-3 mb-6">
        {items.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </details>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "red" | "emerald" | "blue" | "slate";
}) {
  const tones = {
    red: "bg-red-50 text-red-700",
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    slate: "bg-slate-100 text-slate-700",
  } as const;
  return (
    <div className={`px-4 py-3 rounded-lg ${tones[tone]}`}>
      <div className="text-xl font-bold leading-none">{value}</div>
      <div className="text-xs mt-1 opacity-80">{label}</div>
    </div>
  );
}

export default async function RecommendationsPage() {
  const recommendations = await generateRecommendations();

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-2">No recommendations right now.</p>
        <p className="text-sm text-slate-400">
          Run page audits and sync search console data to generate SEO
          recommendations.
        </p>
      </div>
    );
  }

  const critical = recommendations.filter((r) => r.severity === "critical");
  // Cheap to do and worth clicks. This is the only list most people need.
  const quickWins = recommendations.filter(
    (r) =>
      r.severity !== "critical" &&
      r.effort === "low" &&
      (r.estimatedClicks ?? 0) > 0
  );
  const done = new Set([...critical, ...quickWins].map((r) => r.id));
  const rest = recommendations.filter((r) => !done.has(r.id));

  // Everything else, grouped by what kind of work it is. Sorted so the
  // largest group is first — that is usually where the pattern is.
  const byCategory = new Map<string, Recommendation[]>();
  for (const rec of rest) {
    const list = byCategory.get(rec.category) ?? [];
    list.push(rec);
    byCategory.set(rec.category, list);
  }
  const categories = [...byCategory.entries()].sort(
    (a, b) => b[1].length - a[1].length
  );

  const commercialCount = recommendations.filter((r) => r.commercial).length;
  const totalUpside = recommendations.reduce(
    (sum, r) => sum + (r.estimatedClicks ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          label={critical.length === 1 ? "critical issue" : "critical issues"}
          value={String(critical.length)}
          tone={critical.length > 0 ? "red" : "slate"}
        />
        <Stat label="quick wins" value={String(quickWins.length)} tone="blue" />
        <Stat
          label="on commercial pages"
          value={String(commercialCount)}
          tone="emerald"
        />
        <Stat
          label="est. extra clicks/mo"
          value={totalUpside > 0 ? `+${totalUpside}` : "—"}
          tone="slate"
        />
      </div>

      {critical.length === 0 && (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-lg px-4 py-3">
          Nothing is critical. Recommendations are only marked critical when a
          page that can produce a booking is ranking on page one and still not
          being clicked — the one case where a same-day fix pays off.
        </p>
      )}

      <Section
        title="Critical"
        note="Commercial pages ranking on page one that are not earning the clicks they should."
        items={critical}
        open
      />

      <Section
        title="Do these first"
        note="Low effort, measurable upside. Each is a title or description rewrite you can finish in a sitting."
        items={quickWins}
        open
      />

      {categories.map(([category, items], i) => (
        <Section
          key={category}
          title={category}
          items={items}
          open={i === 0 && critical.length === 0 && quickWins.length === 0}
        />
      ))}
    </div>
  );
}
