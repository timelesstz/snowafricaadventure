import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Mail, Search, Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { EmailStatus } from "@prisma/client";

async function getEmailLogs(params: {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
}) {
  const { status, type, search, page = 1 } = params;
  const limit = 25;

  const where = {
    ...(status && status !== "all" && { status: status as EmailStatus }),
    ...(type && type !== "all" && { type }),
    ...(search && {
      OR: [
        { recipient: { contains: search, mode: "insensitive" as const } },
        { subject: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [logs, total, stats] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.emailLog.count({ where }),
    prisma.emailLog.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const statusCounts: Record<EmailStatus, number> = {
    PENDING: 0,
    SENT: 0,
    FAILED: 0,
    BOUNCED: 0,
  };
  for (const s of stats) statusCounts[s.status] = s._count;

  const types = await prisma.emailLog.findMany({
    select: { type: true },
    distinct: ["type"],
  });

  return {
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    statusCounts,
    types: types.map((t) => t.type).sort(),
  };
}

function formatDateTime(date: Date | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: EmailStatus }) {
  const styles: Record<EmailStatus, string> = {
    SENT: "bg-emerald-100 text-emerald-700",
    PENDING: "bg-amber-100 text-amber-700",
    FAILED: "bg-red-100 text-red-700",
    BOUNCED: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

export default async function EmailLogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const { logs, total, totalPages, statusCounts, types } = await getEmailLogs({
    status: params.status,
    type: params.type,
    search: params.search,
    page,
  });

  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.type) qs.set("type", params.type);
  if (params.search) qs.set("search", params.search);
  const linkWithPage = (p: number) => {
    const copy = new URLSearchParams(qs);
    copy.set("page", String(p));
    return `/admin/email-log?${copy.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Email Log</h1>
        <p className="text-slate-600 mt-1">
          Delivery history for transactional emails. Failed sends can be diagnosed here before contacting support.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Sent" value={statusCounts.SENT} icon={CheckCircle2} color="bg-emerald-500" />
        <StatCard label="Pending" value={statusCounts.PENDING} icon={Clock} color="bg-amber-500" />
        <StatCard label="Failed" value={statusCounts.FAILED} icon={AlertCircle} color="bg-red-500" />
        <StatCard label="Bounced" value={statusCounts.BOUNCED} icon={Mail} color="bg-orange-500" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Recipient or subject..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="status"
              defaultValue={params.status || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All statuses</option>
              <option value="SENT">Sent</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="BOUNCED">Bounced</option>
            </select>
          </div>
          <select
            name="type"
            defaultValue={params.type || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            Filter
          </button>
        </form>
      </div>

      {logs.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <Mail className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No emails found</h3>
          <p className="text-slate-500">
            {params.status || params.type || params.search
              ? "Try adjusting your filters"
              : "Emails will appear here once the system starts sending them"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Recipient</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Subject</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Sent</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700 truncate max-w-[200px]">{log.recipient}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-slate-900 truncate max-w-[280px]" title={log.subject}>
                      {log.subject}
                    </div>
                    {log.error && (
                      <div className="text-xs text-red-600 truncate max-w-[280px] mt-1" title={log.error}>
                        {log.error}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{log.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDateTime(log.sentAt)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDateTime(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {(page - 1) * 25 + 1} to {Math.min(page * 25, total)} of {total}
          </p>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link href={linkWithPage(page - 1)} className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50">
                Previous
              </Link>
            )}
            <span className="px-3 py-1 text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={linkWithPage(page + 1)} className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: typeof Mail;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
