import prisma from "@/lib/prisma";
import { clsx } from "clsx";

export const dynamic = "force-dynamic";

async function getContentPerformance() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      content: true,
      metaTitle: true,
      metaDescription: true,
    },
    orderBy: { publishedAt: "desc" },
  });

  const enriched = await Promise.all(
    posts.map(async (post) => {
      const wordCount = post.content
        .replace(/<[^>]*>/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 0).length;

      // Get GSC metrics for this slug
      const gscMetrics = await prisma.gscPageMetric.aggregate({
        where: {
          date: { gte: thirtyDaysAgo },
          page: { contains: `/${post.slug}/` },
        },
        _sum: { clicks: true, impressions: true },
        _avg: { position: true },
      });

      // Get latest audit score
      const audit = await prisma.seoPageAudit.findFirst({
        where: { url: { contains: `/${post.slug}/` } },
        orderBy: { createdAt: "desc" },
        select: { score: true },
      });

      const clicks = gscMetrics._sum.clicks || 0;
      const impressions = gscMetrics._sum.impressions || 0;
      const avgPosition = Math.round((gscMetrics._avg.position || 0) * 10) / 10;

      // Determine status
      let status: "good" | "needs-attention" | "poor" = "good";
      if (wordCount < 300 || (!post.metaDescription && !post.metaTitle)) {
        status = "poor";
      } else if (impressions > 100 && clicks < 3) {
        status = "needs-attention";
      } else if (avgPosition > 20 && impressions < 50) {
        status = "needs-attention";
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        wordCount,
        clicks,
        impressions,
        avgPosition,
        seoScore: audit?.score ?? null,
        status,
        hasMetaTitle: !!post.metaTitle,
        hasMetaDesc: !!post.metaDescription,
      };
    })
  );

  // Sort by clicks descending
  return enriched.sort((a, b) => b.clicks - a.clicks);
}

export default async function ContentPerformancePage() {
  const content = await getContentPerformance();

  const statusColors = {
    good: "bg-green-100 text-green-700",
    "needs-attention": "bg-amber-100 text-amber-700",
    poor: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex gap-4 text-sm">
        <div className="px-4 py-2 bg-slate-50 rounded-lg">
          <span className="text-slate-500">Total posts:</span>{" "}
          <span className="font-semibold">{content.length}</span>
        </div>
        <div className="px-4 py-2 bg-green-50 rounded-lg">
          <span className="text-green-600">Good:</span>{" "}
          <span className="font-semibold">
            {content.filter((c) => c.status === "good").length}
          </span>
        </div>
        <div className="px-4 py-2 bg-amber-50 rounded-lg">
          <span className="text-amber-600">Needs attention:</span>{" "}
          <span className="font-semibold">
            {content.filter((c) => c.status === "needs-attention").length}
          </span>
        </div>
        <div className="px-4 py-2 bg-red-50 rounded-lg">
          <span className="text-red-600">Poor:</span>{" "}
          <span className="font-semibold">
            {content.filter((c) => c.status === "poor").length}
          </span>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">
                  Title
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Words
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Clicks (30d)
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Impressions
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  Avg. Position
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                  SEO Score
                </th>
                <th className="text-center px-5 py-3 text-xs font-medium text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {content.map((item) => (
                <tr key={item.id} className="hover:bg-slate-25">
                  <td className="px-5 py-3 max-w-xs">
                    <a
                      href={`/${item.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-900 hover:text-amber-600 truncate block"
                    >
                      {item.title}
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">
                      /{item.slug}/
                      {item.publishedAt && (
                        <>
                          {" "}
                          &middot;{" "}
                          {new Date(item.publishedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </>
                      )}
                    </p>
                  </td>
                  <td className="text-right px-3 py-3 text-slate-700">
                    {item.wordCount.toLocaleString()}
                  </td>
                  <td className="text-right px-3 py-3 text-slate-700 font-medium">
                    {item.clicks.toLocaleString()}
                  </td>
                  <td className="text-right px-3 py-3 text-slate-500">
                    {item.impressions.toLocaleString()}
                  </td>
                  <td className="text-right px-3 py-3 text-slate-700">
                    {item.avgPosition > 0 ? `#${item.avgPosition}` : "-"}
                  </td>
                  <td className="text-right px-3 py-3">
                    {item.seoScore !== null ? (
                      <span
                        className={clsx(
                          "font-medium",
                          item.seoScore >= 80
                            ? "text-green-600"
                            : item.seoScore >= 60
                            ? "text-amber-600"
                            : "text-red-600"
                        )}
                      >
                        {item.seoScore}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="text-center px-5 py-3">
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        statusColors[item.status]
                      )}
                    >
                      {item.status === "needs-attention"
                        ? "Needs Work"
                        : item.status === "poor"
                        ? "Poor"
                        : "Good"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
