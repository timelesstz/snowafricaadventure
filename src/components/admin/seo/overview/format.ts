/** Formatting helpers shared by the SEO overview. Server-safe (no hooks). */

export function shortPath(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

/** "3h ago", "2 days ago". Computed on the server to avoid hydration drift. */
export function relativeTime(iso: string | null, now: Date): string | null {
  if (!iso) return null;
  const hours = (now.getTime() - new Date(iso).getTime()) / 36e5;
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))}m ago`;
  if (hours < 24) return `${Math.round(hours)}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

/** "12 Nov – 18 Nov". */
export function formatRange(range: { from: string; to: string } | null): string | null {
  if (!range) return null;
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  return `${fmt(range.from)} – ${fmt(range.to)}`;
}

export function bandFor(score: number) {
  if (score >= 80) return { label: "Excellent", text: "text-emerald-700", bg: "bg-emerald-50", bar: "bg-emerald-500", stroke: "#059669" };
  if (score >= 60) return { label: "Good", text: "text-lime-700", bg: "bg-lime-50", bar: "bg-lime-500", stroke: "#65a30d" };
  if (score >= 40) return { label: "Needs work", text: "text-amber-800", bg: "bg-amber-50", bar: "bg-amber-500", stroke: "#d97706" };
  return { label: "Poor", text: "text-red-700", bg: "bg-red-50", bar: "bg-red-500", stroke: "#dc2626" };
}
