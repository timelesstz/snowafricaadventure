import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination for the blog archive.
 *
 * This exists for crawlability as much as for readers. The listing showed only
 * the 20 most recent posts with no way to reach the rest, so 271 of 291
 * published posts had no inbound link anywhere on the site. Search Console had
 * them sitting in "Discovered - currently not indexed", never crawled.
 *
 * Every number is a real <Link>, so a crawler can walk the whole archive.
 */

function href(page: number): string {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

/** Page numbers to show: always first and last, plus a window around current. */
function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current]);
  for (const p of [current - 1, current + 1]) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  if (current <= 3) [2, 3, 4].forEach((p) => p <= total && pages.add(p));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => p >= 1 && pages.add(p));

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const items = pageWindow(currentPage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          rel="prev"
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      )}

      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="px-2 text-[var(--text-muted)]" aria-hidden>
            &hellip;
          </span>
        ) : item === currentPage ? (
          <span
            key={item}
            aria-current="page"
            className="min-w-9 text-center px-3 py-2 rounded-lg text-sm font-semibold bg-[var(--primary)] text-white"
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            className="min-w-9 text-center px-3 py-2 rounded-lg text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
          >
            {item}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          rel="next"
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}
