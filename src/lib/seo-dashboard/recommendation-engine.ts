import prisma from "@/lib/prisma";
import type { Recommendation } from "./types";

/**
 * Generate SEO recommendations based on stored data.
 * Analyzes GSC metrics, page audits, 404s, and content.
 */
export async function generateRecommendations(): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // 1. High impressions but low CTR — title/description needs work
  const lowCtrPages = await prisma.gscPageMetric.groupBy({
    by: ["page"],
    where: { date: { gte: thirtyDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
    having: { impressions: { _sum: { gt: 100 } } },
    orderBy: { _sum: { impressions: "desc" } },
    take: 50,
  });

  for (const row of lowCtrPages) {
    const avgCtr = row._avg.ctr || 0;
    const impressions = row._sum.impressions || 0;
    if (avgCtr < 0.02 && impressions > 200) {
      recommendations.push({
        id: `low-ctr-${row.page}`,
        severity: "critical",
        category: "CTR Optimization",
        title: "Low click-through rate despite high impressions",
        description: `This page got ${impressions.toLocaleString()} impressions in 30 days but only a ${(avgCtr * 100).toFixed(1)}% CTR. Improve the title tag and meta description to make it more compelling in search results.`,
        affectedUrl: row.page,
        metric: `${(avgCtr * 100).toFixed(1)}% CTR`,
      });
    }
  }

  // 2. Position declining — queries losing ground
  const recentQueries = await prisma.gscSearchQuery.groupBy({
    by: ["query"],
    where: { date: { gte: sevenDaysAgo } },
    _avg: { position: true },
    _sum: { impressions: true },
    having: { impressions: { _sum: { gt: 10 } } },
    orderBy: { _sum: { impressions: "desc" } },
    take: 100,
  });

  const priorStart = new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
  for (const recent of recentQueries) {
    const prior = await prisma.gscSearchQuery.aggregate({
      where: {
        query: recent.query,
        date: { gte: priorStart, lt: sevenDaysAgo },
      },
      _avg: { position: true },
    });

    const currentPos = recent._avg?.position || 0;
    const priorPos = prior._avg?.position;
    if (priorPos && currentPos - priorPos > 5) {
      recommendations.push({
        id: `pos-drop-${recent.query}`,
        severity: "warning",
        category: "Position Drop",
        title: `Position dropped for "${recent.query}"`,
        description: `Average position dropped from ${priorPos.toFixed(1)} to ${currentPos.toFixed(1)} in the last 7 days. Review the page content and check for competitor changes.`,
        metric: `${priorPos.toFixed(1)} → ${currentPos.toFixed(1)}`,
      });
    }
  }

  // 3. Pages with poor audit scores
  const poorAudits = await prisma.seoPageAudit.findMany({
    where: { score: { lt: 50 } },
    orderBy: { createdAt: "desc" },
    take: 20,
    distinct: ["url"],
  });

  for (const audit of poorAudits) {
    recommendations.push({
      id: `poor-audit-${audit.id}`,
      severity: audit.score < 30 ? "critical" : "warning",
      category: "Page Quality",
      title: `Low SEO score (${audit.score}/100)`,
      description: `This page scored only ${audit.score}/100 in the SEO audit. Key issues include ${
        audit.issues
          ? (audit.issues as Array<{ message: string; severity: string }>)
              .filter((i) => i.severity === "critical")
              .map((i) => i.message.toLowerCase())
              .slice(0, 3)
              .join(", ") || "multiple warnings"
          : "various SEO problems"
      }.`,
      affectedUrl: audit.url,
      metric: `${audit.score}/100`,
    });
  }

  // 4. Blog posts with thin content
  const thinPosts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true, title: true, content: true },
  });

  for (const post of thinPosts) {
    const wordCount = post.content
      .replace(/<[^>]*>/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

    if (wordCount < 300) {
      recommendations.push({
        id: `thin-content-${post.slug}`,
        severity: "warning",
        category: "Content Quality",
        title: `Thin content: "${post.title}"`,
        description: `This blog post has only ${wordCount} words. Search engines prefer comprehensive content of 500+ words. Consider expanding with additional details, examples, or FAQ sections.`,
        affectedUrl: `/${post.slug}/`,
        metric: `${wordCount} words`,
      });
    }
  }

  // 5. Blog posts missing meta description
  const noMetaPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      OR: [
        { metaDescription: null },
        { metaDescription: "" },
      ],
    },
    select: { slug: true, title: true },
    take: 20,
  });

  for (const post of noMetaPosts) {
    recommendations.push({
      id: `no-meta-${post.slug}`,
      severity: "critical",
      category: "Meta Tags",
      title: `Missing meta description: "${post.title}"`,
      description: `This blog post has no meta description. Google will auto-generate one from page content, which is usually less compelling. Write a 120-160 character description with your target keyword.`,
      affectedUrl: `/${post.slug}/`,
    });
  }

  // 6. High-traffic 404 pages needing redirects
  const high404s = await prisma.notFoundUrl.findMany({
    where: {
      status: "ACTIVE",
      hitCount: { gte: 5 },
    },
    orderBy: { hitCount: "desc" },
    take: 10,
  });

  for (const nf of high404s) {
    recommendations.push({
      id: `404-${nf.id}`,
      severity: nf.hitCount >= 20 ? "critical" : "warning",
      category: "404 Errors",
      title: `High-traffic 404: ${nf.url}`,
      description: `This URL has been hit ${nf.hitCount} times. Create a redirect to the appropriate page to recover lost traffic and link equity.`,
      affectedUrl: nf.url,
      metric: `${nf.hitCount} hits`,
    });
  }

  // Sort by severity
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  recommendations.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return recommendations;
}
