export interface PageBounds {
  /** Total number of pages, always at least 1. */
  totalPages: number;
  /** Requested page clamped into range. */
  currentPage: number;
  /** Inclusive start index into the full item list. */
  startIndex: number;
  /** Exclusive end index into the full item list. */
  endIndex: number;
}

/**
 * Page boundaries for a list whose first page may hold a different number of
 * items than the rest — the safari list leads page one with a featured card
 * plus a full grid, so page one carries one extra item.
 *
 * Bounds are derived rather than stored so a shrinking result set (e.g. after
 * a filter change) clamps during render instead of needing a corrective
 * setState in an effect.
 */
export function getPageBounds(
  totalItems: number,
  requestedPage: number,
  pageSize: number,
  firstPageSize: number = pageSize
): PageBounds {
  if (pageSize < 1) throw new Error("pageSize must be at least 1");

  const totalPages =
    totalItems <= firstPageSize
      ? 1
      : 1 + Math.ceil((totalItems - firstPageSize) / pageSize);

  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  const startIndex =
    currentPage === 1 ? 0 : firstPageSize + (currentPage - 2) * pageSize;
  const endIndex =
    currentPage === 1 ? firstPageSize : startIndex + pageSize;

  return { totalPages, currentPage, startIndex, endIndex };
}
