import { RedirectType } from "@prisma/client";
import { prisma } from "./prisma";

export interface CachedRedirect {
  id: string;
  sourceUrl: string;
  destinationUrl: string;
  type: RedirectType;
}

interface CacheEntry {
  redirect: CachedRedirect | null;
  timestamp: number;
}

// In-memory cache with TTL
const redirectCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let allRedirectsCache: CachedRedirect[] | null = null;
let allRedirectsCacheTimestamp = 0;

/**
 * Normalize URL for consistent cache lookups
 * Removes trailing slashes and converts to lowercase
 */
function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/\/+$/, "") || "/";
}

/**
 * Load all active redirects into cache
 */
async function loadAllRedirects(): Promise<CachedRedirect[]> {
  const now = Date.now();

  if (allRedirectsCache && now - allRedirectsCacheTimestamp < CACHE_TTL_MS) {
    return allRedirectsCache;
  }

  try {
    const redirects = await prisma.redirect.findMany({
      where: { isActive: true },
      select: {
        id: true,
        sourceUrl: true,
        destinationUrl: true,
        type: true,
      },
    });

    allRedirectsCache = redirects;
    allRedirectsCacheTimestamp = now;

    // Also populate individual cache entries
    for (const redirect of redirects) {
      const normalizedUrl = normalizeUrl(redirect.sourceUrl);
      redirectCache.set(normalizedUrl, {
        redirect,
        timestamp: now,
      });
    }

    return redirects;
  } catch (error) {
    console.error("Error loading redirects:", error);
    return allRedirectsCache || [];
  }
}

/**
 * Check if a URL has a redirect configured
 */
export async function checkRedirect(pathname: string): Promise<CachedRedirect | null> {
  const normalizedUrl = normalizeUrl(pathname);
  const now = Date.now();

  // Check individual cache first
  const cached = redirectCache.get(normalizedUrl);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.redirect;
  }

  // Load all redirects (this also populates the cache)
  const redirects = await loadAllRedirects();

  // Find matching redirect
  const redirect = redirects.find(
    (r) => normalizeUrl(r.sourceUrl) === normalizedUrl
  );

  // Cache the result (including null for no match)
  redirectCache.set(normalizedUrl, {
    redirect: redirect || null,
    timestamp: now,
  });

  return redirect || null;
}

/**
 * Log a redirect hit (fire and forget)
 */
export async function logRedirectHit(redirectId: string): Promise<void> {
  try {
    await prisma.redirect.update({
      where: { id: redirectId },
      data: {
        hitCount: { increment: 1 },
        lastHitAt: new Date(),
      },
    });
  } catch (error) {
    // Log but don't throw - this shouldn't break the redirect
    console.error("Error logging redirect hit:", error);
  }
}

/**
 * Invalidate the redirect cache
 * Call this when redirects are created, updated, or deleted
 */
export function invalidateRedirectCache(): void {
  redirectCache.clear();
  allRedirectsCache = null;
  allRedirectsCacheTimestamp = 0;
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
  return {
    individualCacheSize: redirectCache.size,
    allRedirectsCached: allRedirectsCache !== null,
    allRedirectsCount: allRedirectsCache?.length || 0,
    cacheAge: allRedirectsCacheTimestamp
      ? Date.now() - allRedirectsCacheTimestamp
      : null,
  };
}
