import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-slate-200 rounded",
        className
      )}
      aria-hidden="true"
    />
  );
}

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 8, cols = 6 }: TableSkeletonProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading rows"
    >
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-6 py-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {Array.from({ length: cols }).map((_, c) => (
                <Skeleton key={c} className="h-4" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardSkeletonProps {
  cols?: 2 | 3 | 4 | 5;
}

const colsClass: Record<2 | 3 | 4 | 5, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-5",
};

export function StatCardSkeleton({ cols = 4 }: StatCardSkeletonProps) {
  return (
    <div className={clsx("grid grid-cols-1 gap-4 mb-6", colsClass[cols])}>
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
