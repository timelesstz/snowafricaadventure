"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Page numbers to render, collapsing long runs to an ellipsis. Always keeps
 * the first and last page plus a window around the current one, so the control
 * stays a fixed width no matter how many pages there are.
 */
export function getPageItems(
  page: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages - 1) items.push("ellipsis");

  items.push(totalPages);
  return items;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);

  const btn =
    "inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-lg text-sm font-medium border transition-colors";

  return (
    <nav
      aria-label="Safari package pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          btn,
          "border-[var(--border)] bg-white hover:border-[var(--primary)]",
          page === 1 && "opacity-40 cursor-not-allowed hover:border-[var(--border)]"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            aria-hidden="true"
            className="px-1 text-[var(--text-muted)]"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              btn,
              item === page
                ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                : "border-[var(--border)] bg-white hover:border-[var(--primary)]"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          btn,
          "border-[var(--border)] bg-white hover:border-[var(--primary)]",
          page === totalPages &&
            "opacity-40 cursor-not-allowed hover:border-[var(--border)]"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
