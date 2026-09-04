import prisma from "@/lib/prisma";
import type { Recommendation } from "./types";

/**
 * Trivia that happens to contain a commercial word. "first person to climb
 * Kilimanjaro" is a history question, not a booking intent, but it matched on
 * "climb" and was shown with a Commercial intent badge.
 */
const TRIVIA_PATH = /(first-person|history-of|who-was|who-were|-facts|oldest-|youngest-)/i;

/**
 * Vulnerability scans, not lost visitors. The site is a WordPress migration,
 * so these get probed constantly — but /wp-admin/ was never a page a reader
 * could reach, and the dashboard was advising a 301 redirect for it. There is
 * nothing to redirect to and nothing to recover.
 */
const BOT_PROBE =
  /(^\/wp-admin|^\/wp-login|^\/xmlrpc|^\/wp-includes|\.php$|^\/\.env|^\/\.git|^\/phpmyadmin|^\/administrator|^\/vendor\/|^\/cgi-bin)/i;

/** Paths whose visitors could plausibly book something. */
const COMMERCIAL_PATH =
  /(operator|compan|price|cost|budget|book|package|tour|safari|climb|trek|route|itinerar|holiday|departure|guide)/i;

/**
 * Queries Google usually answers in the results itself — a yes/no, a number,
 * a comparison — so the searcher never needs to click through.
 *
 * Judged on the query rather than the URL. An earlier version pattern-matched
 * the slug, which was wrong in both directions: it wrote off /tanzania-festival/
 * as trivia when festival-goers do have to open something to plan around it,
 * and it waved through /is-lion-hunting-legal-in-africa/ as a quick win when
 * that question is answered in the result itself.
 */
const QUESTION_OPENERS = [
  "is", "are", "was", "were", "do", "does", "did", "can", "when", "why", "who",
  "how many", "how much", "how tall", "how high", "how old", "how long",
];

/** True when Google most likely answered this query in the results itself. */
function isZeroClickQuery(query: string): boolean {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/);
  if (words.includes("vs") || words.includes("versus")) return true;
  return QUESTION_OPENERS.some(
    (opener) => q === opener || q.startsWith(opener + " ")
  );
}

/** Fallback for pages whose queries Search Console will not name. */
const INFORMATIONAL_PATH = /(-vs-|versus|height|tall|deaths|facts|meaning)/i;

/**
 * Generate SEO recommendations based on stored data.
 * Analyzes GSC metrics, page audits, 404s, and content.
 */
export async function generateRecommendations(): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // 1. Pages with impressions that are not converting to clicks.
  //
  // The previous version of this rule flagged anything under 2% CTR as a
  // critical "improve the title tag" issue, regardless of where the page
  // ranked. That produced ~40 critical items, most of them impossible or
  // pointless to act on:
  //
  //   - Nine were anchor fragments (/page/#section) of a single article.
  //     Google shows those as jump-to-section links; a fragment cannot have
  //     its own title tag, so the advice could never be followed.
  //   - Others sat at position 47-81. Nobody scrolls that far, so a title
  //     rewrite changes nothing; the problem is rank, not wording.
  //
  // CTR is only meaningfully "low" relative to position, so the rule now
  // splits by rank and says something different — and true — in each band.
  const lowCtrPages = await prisma.gscPageMetric.groupBy({
    by: ["page"],
    where: { date: { gte: thirtyDaysAgo } },
    _sum: { clicks: true, impressions: true },
    _avg: { ctr: true, position: true },
    having: { impressions: { _sum: { gt: 100 } } },
    orderBy: { _sum: { impressions: "desc" } },
    take: 80,
  });

  // A page's average position is averaged across every query it appeared for,
  // including incidental ones. /kilimanjaro-age-limits/ reads as position 6
  // because it brushes past "kilimanjaro" and "ngorongoro crater" at position
  // 3 — while the question that page actually answers, "how old do you have to
  // be to climb kilimanjaro", sits at 23. Rewriting a title for a page-one
  // ranking it does not really hold is wasted work, so each recommendation
  // carries the position of the query genuinely driving it.
  const candidatePages = lowCtrPages
    .map((r) => r.page)
    .filter((page) => !page.includes("#"));

  const queryRows = candidatePages.length
    ? await prisma.gscSearchQuery.groupBy({
        by: ["page", "query"],
        where: { page: { in: candidatePages }, date: { gte: thirtyDaysAgo } },
        _sum: { impressions: true },
        _avg: { position: true },
        orderBy: { _sum: { impressions: "desc" } },
        take: 1000,
      })
    : [];

  // groupBy is already impressions-descending, so the first row per page wins.
  const topQuery = new Map<string, { query: string; position: number }>();
  const knownImpressions = new Map<string, number>();
  for (const row of queryRows) {
    // `page` is nullable on GscSearchQuery; rows without one tell us nothing.
    if (!row.page) continue;
    knownImpressions.set(
      row.page,
      (knownImpressions.get(row.page) ?? 0) + (row._sum.impressions || 0)
    );
    if (topQuery.has(row.page)) continue;
    topQuery.set(row.page, {
      query: row.query,
      position: row._avg.position || 0,
    });
  }

  for (const row of lowCtrPages) {
    // Anchor fragments are sections of a page, not pages. Nothing about them
    // is separately editable, so they are never actionable.
    if (row.page.includes("#")) continue;

    const impressions = row._sum.impressions || 0;
    const clicks = row._sum.clicks || 0;
    const position = row._avg.position || 0;
    const ctr = impressions > 0 ? clicks / impressions : 0;
    if (impressions < 200) continue;

    const path = row.page.replace(/^https?:\/\/[^/]+/, "");
    const commercial =
      COMMERCIAL_PATH.test(path) &&
      !INFORMATIONAL_PATH.test(path) &&
      !TRIVIA_PATH.test(path);
    const pct = (ctr * 100).toFixed(1);

    if (position <= 10) {
      // Genuinely on page one. A weak snippet is a plausible cause here — but
      // question-shaped pages often lose the click to Google answering inline,
      // which no rewrite fixes. Say so rather than promising a win.
      if (ctr >= 0.02) continue;
      const top = topQuery.get(row.page);
      // Either signal is enough. A comparison page stays a comparison page even
      // when the query bringing it impressions is the bare mountain name —
      // /kilimanjaro-vs-aconcagua/ ranks for "aconcagua", but those searchers
      // want Aconcagua, not a comparison, and no title fixes that.
      const zeroClickRisk =
        INFORMATIONAL_PATH.test(path) ||
        (top ? isZeroClickQuery(top.query) : false);
      // Google withholds low-volume queries, so the rows we have rarely explain
      // every impression. When they explain almost none of them, we genuinely
      // do not know what this page ranks for, and naming a "driving query"
      // would be a guess. When the one query we can see is itself buried, the
      // page-one average is an artifact of incidental appearances.
      const coverage = (knownImpressions.get(row.page) ?? 0) / impressions;
      const misleading = coverage < 0.25 || Boolean(top && top.position > 15);
      recommendations.push({
        id: `low-ctr-${row.page}`,
        // Critical is reserved for a commercial page that genuinely holds page
        // one and still is not clicked — the case where a snippet rewrite pays
        // off the same day. A page whose average is an artifact does not
        // qualify, however commercial it is: its own card says the rewrite is
        // not the lever, so flagging it critical contradicted the advice.
        severity: commercial && !misleading ? "critical" : "warning",
        category: "CTR Optimization",
        title: zeroClickRisk
          ? "Ranks on page one but the answer is given in the results"
          : "Ranks on page one but few people click",
        description: misleading
          ? `The page averages position ${position.toFixed(0)}, but that average is spread thin. Search Console names queries for only ${(coverage * 100).toFixed(0)}% of these impressions${top ? `, the largest being "${top.query}" at position ${top.position.toFixed(0)}` : ""} — so the page-one average comes mostly from incidental appearances, and a snippet rewrite has little to bite on.`
          : zeroClickRisk
            ? `Position ${position.toFixed(0)} with ${impressions.toLocaleString()} impressions and only ${pct}% CTR. The query driving it${top ? `, "${top.query}",` : ""} is the kind Google answers in the results itself, so most of these people were never going to click. A rewrite rarely recovers them.`
            : `Position ${position.toFixed(0)} with ${impressions.toLocaleString()} impressions and only ${pct}% CTR, driven mainly by "${top?.query ?? "unknown"}". At this rank the snippet is the most likely cause.`,
        action: misleading
          ? "Find the query you actually want this page to win, then build for it. A title rewrite is not the lever here."
          : zeroClickRisk
            ? "Only worth effort if this audience can be converted — otherwise deprioritise in favour of commercial pages."
            : "Rewrite the title and meta description so they answer the driving query in the searcher's own words.",
        affectedUrl: row.page,
        metric: `${pct}% CTR at position ${position.toFixed(0)}`,
        estimatedClicks:
          zeroClickRisk || misleading
            ? 0
            : Math.max(0, Math.round(impressions * 0.03 - clicks)),
        effort: misleading ? "high" : "low",
        commercial,
        position,
        impressions,
        clicks,
      });
    } else if (position <= 30) {
      // Close enough that rank is worth chasing.
      recommendations.push({
        id: `striking-distance-${row.page}`,
        severity: commercial ? "warning" : "info",
        category: "Ranking Opportunity",
        title: "Within reach of page one",
        description: `Position ${position.toFixed(0)} with ${impressions.toLocaleString()} impressions. Close enough that a modest ranking gain would produce real traffic — top three results take roughly 1.4% CTR here against 0.04% past position 50.`,
        action: "Add internal links from stronger pages, deepen the content, and cover the subtopics competitors rank for.",
        affectedUrl: row.page,
        metric: `position ${position.toFixed(0)} · ${impressions.toLocaleString()} impressions`,
        estimatedClicks: Math.round(impressions * 0.01),
        effort: "medium",
        commercial,
        position,
        impressions,
        clicks,
      });
    } else if (commercial) {
      // Too deep for a snippet fix to matter, and only worth surfacing at all
      // when the page has commercial intent.
      recommendations.push({
        id: `deep-rank-${row.page}`,
        severity: "warning",
        category: "Ranking",
        title: "Commercial page buried in the results",
        description: `Position ${position.toFixed(0)} with ${impressions.toLocaleString()} impressions and ${clicks} clicks. This is a commercial page, so the visibility is worth having — but at this rank almost nobody sees it. This is a ranking problem, not a title problem.`,
        action: "Check the page is crawled and internally linked, then build topical depth and authority. Do not expect a title rewrite to help.",
        affectedUrl: row.page,
        metric: `position ${position.toFixed(0)}`,
        estimatedClicks: 0,
        effort: "high",
        commercial,
        position,
        impressions,
        clicks,
      });
    }
  }

  // 2. Queries losing ground.
  //
  // This previously ran one aggregate per query inside the loop — 100
  // sequential round trips, which was most of why this page was slow to load.
  // Both windows are now a single grouped query each.
  const [recentQueries, priorQueries] = await Promise.all([
    prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where: { date: { gte: sevenDaysAgo } },
      _avg: { position: true },
      _sum: { impressions: true, clicks: true },
      having: { impressions: { _sum: { gt: 10 } } },
      orderBy: { _sum: { impressions: "desc" } },
      take: 100,
    }),
    prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where: {
        date: {
          gte: new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          lt: sevenDaysAgo,
        },
      },
      _avg: { position: true },
      _sum: { impressions: true },
      having: { impressions: { _sum: { gt: 10 } } },
      orderBy: { _sum: { impressions: "desc" } },
      take: 500,
    }),
  ]);

  const priorPositions = new Map(
    priorQueries.map((q) => [q.query, q._avg.position || 0])
  );

  for (const recent of recentQueries) {
    const currentPos = recent._avg?.position || 0;
    const priorPos = priorPositions.get(recent.query);
    if (!priorPos || currentPos - priorPos <= 5) continue;

    const impressions = recent._sum.impressions || 0;
    const clicks = recent._sum.clicks || 0;
    // A slide from 60 to 70 costs nothing — nobody was clicking either way.
    // A slide out of the top ten is the one worth waking up for.
    const wasVisible = priorPos <= 20;

    recommendations.push({
      id: `pos-drop-${recent.query}`,
      severity: wasVisible ? "warning" : "info",
      category: "Position Drop",
      title: `Position dropped for "${recent.query}"`,
      description: wasVisible
        ? `Average position fell from ${priorPos.toFixed(1)} to ${currentPos.toFixed(1)} over the last 7 days. This query was visible enough to earn clicks, so the loss is real.`
        : `Average position fell from ${priorPos.toFixed(1)} to ${currentPos.toFixed(1)} over the last 7 days — but it was already too deep to earn clicks, so little was lost.`,
      action: wasVisible
        ? "Check whether the page changed, and compare against whoever now outranks it."
        : "No action needed unless this query matters commercially.",
      metric: `${priorPos.toFixed(1)} → ${currentPos.toFixed(1)}`,
      estimatedClicks: 0,
      effort: "medium",
      position: currentPos,
      impressions,
      clicks,
    });
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
      action: "Open the page auditor for this URL and work through the critical issues it lists.",
      affectedUrl: audit.url,
      metric: `${audit.score}/100`,
      effort: "medium",
    });
  }

  // 4. Blog posts with thin content.
  //
  // This used to select every published post's full `content` and count words
  // in JS. With 291 posts of HTML that is a multi-megabyte response on every
  // page load, and Prisma Accelerate caps responses at 5MB — so the rule was
  // one long article away from failing outright. Postgres counts the words.
  const thinPosts = await prisma.$queryRaw<
    { slug: string; title: string; words: number }[]
  >`
    SELECT slug,
           title,
           COALESCE(
             array_length(
               regexp_split_to_array(
                 trim(regexp_replace(content, '<[^>]*>', ' ', 'g')),
                 '\s+'
               ),
               1
             ),
             0
           )::int AS words
    FROM "BlogPost"
    WHERE "isPublished" = true
    ORDER BY 3 ASC
    LIMIT 30
  `;

  for (const post of thinPosts) {
    if (post.words >= 300) continue;
    recommendations.push({
      id: `thin-content-${post.slug}`,
      severity: "warning",
      category: "Content Quality",
      title: `Thin content: "${post.title}"`,
      description: `This post has ${post.words} words. Pages this short rarely rank for anything competitive, and they dilute the topical strength of the posts around them.`,
      action: "Expand it to cover the question properly, or merge it into a stronger related post and redirect.",
      affectedUrl: `/${post.slug}/`,
      metric: `${post.words} words`,
      estimatedClicks: 0,
      effort: "medium",
    });
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
      // Not critical: Google writes a serviceable one from the page. It costs
      // some CTR, it does not cost the ranking.
      severity: "warning",
      category: "Meta Tags",
      title: `Missing meta description: "${post.title}"`,
      description: `No meta description, so Google writes its own from the page body. That is usually adequate but rarely persuasive.`,
      action: "Write 120-160 characters that give the searcher a reason to choose this result.",
      affectedUrl: `/${post.slug}/`,
      effort: "low",
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

  // Every 404 the dashboard was flagging turned out to be already fixed —
  // four had redirects sitting in next.config.ts and one was a live page —
  // because nothing marks a NotFoundUrl resolved when the redirect lands.
  // Redirects created through the admin at least can be cross-checked here.
  const existingRedirects = new Set(
    (
      await prisma.redirect.findMany({
        where: { isActive: true },
        select: { sourceUrl: true },
      })
    ).map((r) => r.sourceUrl)
  );

  for (const nf of high404s) {
    // A scanner hitting /wp-admin/ 7 times is not lost traffic to recover.
    if (BOT_PROBE.test(nf.url)) continue;
    if (existingRedirects.has(nf.url)) continue;

    recommendations.push({
      id: `404-${nf.id}`,
      severity: nf.hitCount >= 20 ? "critical" : "warning",
      category: "404 Errors",
      title: `High-traffic 404: ${nf.url}`,
      description: `This URL has been hit ${nf.hitCount} times. Create a redirect to the appropriate page to recover lost traffic and link equity.`,
      action: "Add a 301 redirect to the closest equivalent page in the redirect manager.",
      affectedUrl: nf.url,
      metric: `${nf.hitCount} hits`,
      effort: "low",
    });
  }

  // Order by severity, then by what acting would actually be worth, then by
  // commercial intent. Without this the list is dominated by whichever pages
  // happen to have the most impressions, which is not the same as the most
  // worth doing.
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  recommendations.sort((a, b) => {
    const bySeverity = severityOrder[a.severity] - severityOrder[b.severity];
    if (bySeverity !== 0) return bySeverity;
    const byImpact = (b.estimatedClicks ?? 0) - (a.estimatedClicks ?? 0);
    if (byImpact !== 0) return byImpact;
    return Number(b.commercial ?? false) - Number(a.commercial ?? false);
  });

  return recommendations;
}
