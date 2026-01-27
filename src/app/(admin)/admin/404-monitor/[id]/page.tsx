import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  User,
  Calendar,
  ExternalLink,
  Clock,
  Globe,
} from "lucide-react";
import { NotFoundStatusBadge } from "@/components/admin/404-monitor/NotFoundStatusBadge";
import { BotBadge } from "@/components/admin/404-monitor/BotBadge";
import { NotFoundStatusActions } from "./NotFoundStatusActions";

async function getNotFoundUrl(id: string) {
  const notFoundUrl = await prisma.notFoundUrl.findUnique({
    where: { id },
    include: {
      redirect: true,
    },
  });

  if (!notFoundUrl) return null;

  // Get recent hits
  const recentHits = await prisma.notFoundHit.findMany({
    where: { url: notFoundUrl.url },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return { notFoundUrl, recentHits };
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default async function NotFoundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getNotFoundUrl(id);

  if (!data) {
    notFound();
  }

  const { notFoundUrl, recentHits } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/404-monitor"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">404 URL Details</h1>
          <code className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded mt-1 inline-block">
            {notFoundUrl.url}
          </code>
        </div>
        <NotFoundStatusBadge status={notFoundUrl.status} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Hits</p>
              <p className="text-xl font-bold text-slate-900">
                {notFoundUrl.hitCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Bot Hits</p>
              <p className="text-xl font-bold text-slate-900">
                {notFoundUrl.botHitCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Human Hits</p>
              <p className="text-xl font-bold text-slate-900">
                {notFoundUrl.humanHitCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">First Seen</p>
              <p className="text-sm font-medium text-slate-900">
                {formatDateTime(notFoundUrl.firstHitAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Redirect Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>
          <NotFoundStatusActions
            id={notFoundUrl.id}
            currentStatus={notFoundUrl.status}
            hasRedirect={!!notFoundUrl.redirect}
          />

          {notFoundUrl.status === "ACTIVE" && !notFoundUrl.redirect && (
            <Link
              href={`/admin/redirects/new?source=${encodeURIComponent(notFoundUrl.url)}&notFoundId=${notFoundUrl.id}`}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Create Redirect
            </Link>
          )}
        </div>

        {/* Redirect Info (if exists) */}
        {notFoundUrl.redirect && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Redirect Configuration
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Destination</p>
                <code className="text-sm text-slate-900 bg-slate-100 px-2 py-1 rounded">
                  {notFoundUrl.redirect.destinationUrl}
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-600">Type</p>
                <span className="text-sm font-medium text-slate-900">
                  {notFoundUrl.redirect.type === "PERMANENT"
                    ? "301 Permanent"
                    : "302 Temporary"}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <span
                  className={`text-sm font-medium ${notFoundUrl.redirect.isActive ? "text-emerald-600" : "text-slate-500"}`}
                >
                  {notFoundUrl.redirect.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <Link
                href={`/admin/redirects?search=${encodeURIComponent(notFoundUrl.url)}`}
                className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
              >
                View Redirect Details
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Hits */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Hits ({recentHits.length})
          </h2>
        </div>
        {recentHits.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No hits recorded yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Time
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Referrer
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    User Agent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentHits.map((hit) => (
                  <tr key={hit.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span title={formatDateTime(hit.createdAt)}>
                          {formatRelativeTime(hit.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <BotBadge
                        isBot={hit.isBot}
                        botName={hit.botName}
                        size="sm"
                      />
                    </td>
                    <td className="px-6 py-3">
                      {hit.referer ? (
                        <span
                          className="text-sm text-slate-600 truncate max-w-xs inline-block"
                          title={hit.referer}
                        >
                          {hit.referer}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">Direct</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className="text-xs text-slate-500 truncate max-w-xs inline-block font-mono"
                        title={hit.userAgent || "Unknown"}
                      >
                        {hit.userAgent?.substring(0, 60) || "Unknown"}
                        {hit.userAgent && hit.userAgent.length > 60 && "..."}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
