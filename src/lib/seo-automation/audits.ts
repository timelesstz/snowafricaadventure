import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SITE_CONFIG } from "@/lib/constants";
import { auditPage } from "@/lib/seo-dashboard/page-auditor";
import type { AuditResult } from "@/lib/seo-dashboard/types";

const DAY_MS = 24 * 60 * 60 * 1000;
const PER_PAGE_TIMEOUT_MS = 15_000;

/** Append one audit row (history is kept; readers take the latest per URL). */
export async function saveAudit(result: AuditResult) {
  return prisma.seoPageAudit.create({
    data: {
      url: result.url,
      title: result.title,
      titleLength: result.titleLength,
      metaDescription: result.metaDescription,
      metaDescLength: result.metaDescLength,
      h1Count: result.h1Count,
      h1Text: result.h1Text,
      h2Count: result.h2Count,
      h3Count: result.h3Count,
      wordCount: result.wordCount,
      hasCanonical: result.hasCanonical,
      canonicalUrl: result.canonicalUrl,
      hasSchema: result.hasSchema,
      schemaTypes: result.schemaTypes,
      internalLinks: result.internalLinks,
      externalLinks: result.externalLinks,
      imagesTotal: result.imagesTotal,
      imagesMissingAlt: result.imagesMissingAlt,
      score: result.score,
      issues: result.issues as unknown as Prisma.InputJsonValue,
    },
  });
}

function siteHost(): string {
  return new URL(SITE_CONFIG.url).hostname.replace(/^www\./, "");
}

/** Only ever fetch our own pages: GSC rows are data, not a URL allow-list. */
export function isOwnUrl(url: string, host = siteHost()): boolean {
  try {
    const u = new URL(url);
    return (u.protocol === "https:" || u.protocol === "http:") && u.hostname.replace(/^www\./, "") === host;
  } catch {
    return false;
  }
}

/** Origin of the most-shown GSC page, else the configured site URL. */
export function liveOriginFrom(pages: string[]): string {
  for (const page of pages) {
    try {
      const u = new URL(page);
      if (u.protocol === "https:" && !isLocalHost(u.hostname)) return u.origin;
    } catch {
      // not a URL; keep looking
    }
  }
  return new URL(SITE_CONFIG.url).origin;
}

export function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]" || hostname.endsWith(".localhost");
}

function pathKey(url: string): string {
  try {
    const p = new URL(url).pathname;
    return p.endsWith("/") ? p : `${p}/`;
  } catch {
    return url;
  }
}

/**
 * Pick the pages to audit next: the pages Google shows most, ordered so the
 * ones never audited (or audited longest ago) go first. Pages audited inside
 * `freshDays` are skipped, so a daily run works through the list in rotation.
 */
export async function pickPagesToAudit(options: {
  limit: number;
  freshDays?: number;
  now?: Date;
}): Promise<string[]> {
  const now = options.now ?? new Date();
  const freshDays = options.freshDays ?? 7;

  const [topPages, audits] = await Promise.all([
    prisma.gscPageMetric.groupBy({
      by: ["page"],
      where: { date: { gte: new Date(now.getTime() - 28 * DAY_MS) } },
      _sum: { impressions: true },
      orderBy: { _sum: { impressions: "desc" } },
      take: 60,
    }),
    prisma.seoPageAudit.groupBy({ by: ["url"], _max: { createdAt: true } }),
  ]);

  const lastAudited = new Map<string, number>();
  for (const a of audits) {
    const key = pathKey(a.url.startsWith("http") ? a.url : `${SITE_CONFIG.url}${a.url}`);
    const at = a._max.createdAt?.getTime() ?? 0;
    lastAudited.set(key, Math.max(lastAudited.get(key) ?? 0, at));
  }

  // Audit the site the Search Console data describes. SITE_CONFIG.url points
  // at localhost in development, which would audit the dev server instead.
  const liveOrigin = liveOriginFrom(topPages.map((p) => p.page));
  const host = new URL(liveOrigin).hostname.replace(/^www\./, "");

  const candidates = [`${liveOrigin}/`, ...topPages.map((p) => p.page)]
    .filter((u) => isOwnUrl(u, host))
    .filter((u, i, all) => all.findIndex((x) => pathKey(x) === pathKey(u)) === i)
    .map((url, rank) => ({ url, rank, last: lastAudited.get(pathKey(url)) ?? 0 }))
    .filter((c) => now.getTime() - c.last >= freshDays * DAY_MS);

  // Never-audited first, then oldest, keeping traffic rank as the tiebreak.
  candidates.sort((a, b) => a.last - b.last || a.rank - b.rank);
  return candidates.slice(0, options.limit).map((c) => c.url);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${ms / 1000}s`)), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

export interface AuditRunResult {
  audited: Array<{ url: string; score: number }>;
  failed: Array<{ url: string; error: string }>;
  skippedForTime: number;
}

/**
 * Audit the next batch of pages inside a time budget, logged as a CRAWL sync
 * so the dashboard can show when it last ran and what it found.
 */
export async function runScheduledAudits(
  options: { maxPages?: number; budgetMs?: number; now?: Date } = {}
): Promise<AuditRunResult> {
  const started = Date.now();
  const budgetMs = options.budgetMs ?? 40_000;
  const urls = await pickPagesToAudit({ limit: options.maxPages ?? 8, now: options.now });

  const log = await prisma.seoSyncLog.create({ data: { source: "CRAWL", status: "RUNNING" } });
  const result: AuditRunResult = { audited: [], failed: [], skippedForTime: 0 };

  try {
    for (let i = 0; i < urls.length; i++) {
      if (Date.now() - started > budgetMs - PER_PAGE_TIMEOUT_MS) {
        result.skippedForTime = urls.length - i;
        break;
      }
      const url = urls[i];
      try {
        const audit = await withTimeout(auditPage(url), PER_PAGE_TIMEOUT_MS);
        await saveAudit(audit);
        result.audited.push({ url, score: audit.score });
      } catch (error) {
        result.failed.push({ url, error: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    await prisma.seoSyncLog.update({
      where: { id: log.id },
      data: {
        status: result.audited.length === 0 && result.failed.length > 0 ? "FAILED" : "COMPLETED",
        recordCount: result.audited.length,
        completedAt: new Date(),
        error: result.failed.length
          ? result.failed.map((f) => `${f.url}: ${f.error}`).join("; ").slice(0, 1000)
          : null,
        metadata: {
          candidates: urls.length,
          failed: result.failed.length,
          skippedForTime: result.skippedForTime,
        },
      },
    });
  } catch (error) {
    await prisma.seoSyncLog.update({
      where: { id: log.id },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
    throw error;
  }

  return result;
}
