export default function SiteLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* Skeleton Loader */}
        <div className="space-y-4 animate-pulse">
          {/* Hero skeleton */}
          <div className="w-64 h-8 bg-slate-200 rounded-lg mx-auto" />
          <div className="w-48 h-4 bg-slate-200 rounded mx-auto" />

          {/* Content skeleton */}
          <div className="mt-8 space-y-3 max-w-md mx-auto">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/6" />
          </div>

          {/* Cards skeleton */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="h-32 bg-slate-200 rounded-lg" />
            <div className="h-32 bg-slate-200 rounded-lg" />
            <div className="h-32 bg-slate-200 rounded-lg" />
          </div>
        </div>

        <p className="mt-6 text-slate-400 text-sm">Loading content...</p>
      </div>
    </div>
  );
}
