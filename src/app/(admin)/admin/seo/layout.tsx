import SeoSubNav from "@/components/admin/seo/SeoSubNav";
import prisma from "@/lib/prisma";
import type { SyncFreshness } from "@/lib/seo-overview";

async function loadFreshness(): Promise<{
  gsc: SyncFreshness;
  ga: SyncFreshness;
}> {
  const now = new Date();
  const [gscLog, gaLog] = await Promise.all([
    prisma.seoSyncLog.findFirst({
      where: { source: "GSC" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
    prisma.seoSyncLog.findFirst({
      where: { source: "GA4" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
  ]);
  const build = (
    source: "GSC" | "GA4",
    log: typeof gscLog
  ): SyncFreshness => {
    if (!log) {
      return {
        source,
        status: "NEVER",
        completedAt: null,
        hoursAgo: null,
        recordCount: 0,
        error: null,
      };
    }
    const hoursAgo = log.completedAt
      ? Math.round(
          ((now.getTime() - log.completedAt.getTime()) / (1000 * 60 * 60)) * 10
        ) / 10
      : null;
    return {
      source,
      status: log.status as SyncFreshness["status"],
      completedAt: log.completedAt ? log.completedAt.toISOString() : null,
      hoursAgo,
      recordCount: log.recordCount,
      error: log.error,
    };
  };
  return { gsc: build("GSC", gscLog), ga: build("GA4", gaLog) };
}

export default async function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const freshness = await loadFreshness();
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-slate-900">SEO Dashboard</h1>
      </div>
      <SeoSubNav freshness={freshness} />
      {children}
    </div>
  );
}
