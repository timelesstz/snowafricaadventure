import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  basePath: string;
  /** Current search params (excluding `page`) to preserve across navigation */
  params?: Record<string, string | undefined>;
  /** Singular noun for result count label, e.g. "booking", "inquiry" */
  label?: string;
}

function buildUrl(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number
) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) usp.set(k, v);
  }
  usp.set("page", String(page));
  return `${basePath}?${usp.toString()}`;
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  basePath,
  params = {},
  label = "result",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const plural = total === 1 ? label : `${label}s`;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-slate-600">
        Showing {start} to {end} of {total} {plural}
      </p>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link
            href={buildUrl(basePath, params, page - 1)}
            className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Previous
          </Link>
        )}
        <span className="px-3 py-1 text-sm text-slate-600">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={buildUrl(basePath, params, page + 1)}
            className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
