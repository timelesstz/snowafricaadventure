"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Mountain, TreePalm, MapPin, FileText, Loader2, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface SearchResult {
  slug: string;
  title?: string;
  name?: string;
  overview?: string;
  description?: string;
  excerpt?: string;
  type: string;
}

interface SearchResponse {
  success: boolean;
  query: string;
  totalResults: number;
  results: {
    routes: SearchResult[];
    safaris: SearchResult[];
    destinations: SearchResult[];
    blog: SearchResult[];
  };
}

const typeConfig = {
  route: {
    icon: Mountain,
    label: "Kilimanjaro Routes",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    basePath: "/trekking",
  },
  safari: {
    icon: TreePalm,
    label: "Safari Packages",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    basePath: "/tanzania-safaris",
  },
  destination: {
    icon: MapPin,
    label: "Destinations",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    basePath: "/tanzania-destinations",
  },
  blog: {
    icon: FileText,
    label: "Blog Posts",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    basePath: "",
  },
};

function ResultCard({ result }: { result: SearchResult }) {
  const config = typeConfig[result.type as keyof typeof typeConfig];
  const Icon = config.icon;
  const title = result.title || result.name || "";
  const description = result.overview || result.description || result.excerpt || "";
  const href = `${config.basePath}/${result.slug}/`;

  return (
    <Link
      href={href}
      className={`block p-5 rounded-lg border ${config.borderColor} ${config.bgColor} hover:shadow-md transition-all group`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-md bg-white ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium ${config.color} uppercase tracking-wide`}>
              {config.label}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--surface)] flex items-center justify-center">
        <Search className="w-8 h-8 text-[var(--text-muted)]" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-[var(--text)] mb-2">
        No results found
      </h3>
      <p className="text-[var(--text-muted)] max-w-md mx-auto">
        We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords or browse our popular pages below.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Link
          href="/trekking/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm font-medium"
        >
          <Mountain className="w-4 h-4" />
          Kilimanjaro Routes
        </Link>
        <Link
          href="/tanzania-safaris/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-sm font-medium"
        >
          <TreePalm className="w-4 h-4" />
          Safari Packages
        </Link>
        <Link
          href="/tanzania-destinations/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors text-sm font-medium"
        >
          <MapPin className="w-4 h-4" />
          Destinations
        </Link>
      </div>
    </div>
  );
}

function InitialState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--surface)] flex items-center justify-center">
        <Search className="w-8 h-8 text-[var(--text-muted)]" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-[var(--text)] mb-2">
        Search Snow Africa
      </h3>
      <p className="text-[var(--text-muted)] max-w-md mx-auto">
        Find Kilimanjaro routes, safari packages, destinations, and travel guides.
      </p>
      <div className="mt-8">
        <p className="text-sm text-[var(--text-muted)] mb-4">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Serengeti", "Machame Route", "Ngorongoro", "Big Five", "Migration"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1.5 rounded-full bg-[var(--surface)] text-[var(--text)] hover:bg-border transition-colors text-sm"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search on initial load if query param exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  // Debounced search on input change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        // Update URL without full page reload
        const newUrl = query ? `/search?q=${encodeURIComponent(query)}` : "/search";
        router.replace(newUrl, { scroll: false });
        performSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, initialQuery, router, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    router.replace("/search", { scroll: false });
  };

  // Combine all results for display
  const allResults: SearchResult[] = results
    ? [
        ...results.results.routes,
        ...results.results.safaris,
        ...results.results.destinations,
        ...results.results.blog,
      ]
    : [];

  // Filter results if a filter is active
  const filteredResults = activeFilter
    ? allResults.filter((r) => r.type === activeFilter)
    : allResults;

  // Count by type
  const counts = results
    ? {
        route: results.results.routes.length,
        safari: results.results.safaris.length,
        destination: results.results.destinations.length,
        blog: results.results.blog.length,
      }
    : { route: 0, safari: 0, destination: 0, blog: 0 };

  return (
    <div className="min-h-[80vh]">
      {/* Hero with Search */}
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Search
            </h1>
            <p className="text-slate-200 mb-8">
              Find your perfect Tanzania adventure
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search routes, safaris, destinations..."
                  className="w-full pl-12 pr-12 py-4 rounded-lg text-[var(--text)] bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] text-lg"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
              </div>
            )}

            {/* Results */}
            {!isLoading && results && (
              <>
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <p className="text-[var(--text-muted)]">
                    Found <span className="font-semibold text-[var(--text)]">{results.totalResults}</span> results for &quot;{results.query}&quot;
                  </p>

                  {/* Filters */}
                  {results.totalResults > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveFilter(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          !activeFilter
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--surface)] text-[var(--text)] hover:bg-border"
                        }`}
                      >
                        All ({results.totalResults})
                      </button>
                      {Object.entries(counts).map(([type, count]) => {
                        if (count === 0) return null;
                        const config = typeConfig[type as keyof typeof typeConfig];
                        return (
                          <button
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              activeFilter === type
                                ? "bg-[var(--primary)] text-white"
                                : "bg-[var(--surface)] text-[var(--text)] hover:bg-border"
                            }`}
                          >
                            {config.label.split(" ")[0]} ({count})
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Results List */}
                {filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResults.map((result, index) => (
                      <ResultCard key={`${result.type}-${result.slug}-${index}`} result={result} />
                    ))}
                  </div>
                ) : (
                  <EmptyState query={results.query} />
                )}
              </>
            )}

            {/* Initial State */}
            {!isLoading && !results && !query && <InitialState />}

            {/* Query too short */}
            {!isLoading && !results && query && query.length < 2 && (
              <div className="text-center py-16">
                <p className="text-[var(--text-muted)]">
                  Please enter at least 2 characters to search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
