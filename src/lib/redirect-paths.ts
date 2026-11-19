import nextConfig from "../../next.config";

/** Same normalisation as src/lib/redirect-cache.ts: lowercase, no trailing slash. */
export function normalizePath(url: string): string {
  return url.toLowerCase().replace(/\/+$/, "") || "/";
}

/** Exact (pattern-free) sources of the redirects in next.config.ts, normalised. */
export async function getConfigRedirectPaths(): Promise<Set<string>> {
  const list = (await nextConfig.redirects?.()) ?? [];
  return new Set(list.map((r) => r.source).filter((s) => !/[:*(]/.test(s)).map(normalizePath));
}
