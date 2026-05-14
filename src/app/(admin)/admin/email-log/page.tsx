import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Mail,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Phone,
} from "lucide-react";
import { EmailStatus, CommunicationChannel } from "@prisma/client";
import {
  AdminPageHeader,
  StatCard,
  StatCardGrid,
  StatusBadge,
  type StatusTone,
  DataTable,
  type Column,
  DataToolbar,
  EmptyState,
  Pagination,
} from "@/components/admin/ui";

const PAGE_SIZE = 25;

const STATUS_TONE: Record<EmailStatus, StatusTone> = {
  SENT: "success",
  PENDING: "pending",
  FAILED: "danger",
  BOUNCED: "orange",
};

type LogRow = {
  id: string;
  channel: CommunicationChannel;
  recipient: string;
  subject: string;
  type: string;
  status: EmailStatus;
  error: string | null;
  sentAt: Date | null;
  createdAt: Date;
};

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

function ChannelBadge({ channel }: { channel: CommunicationChannel }) {
  if (channel === "WHATSAPP") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
        <MessageCircle className="w-3 h-3" />
        WhatsApp
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
      <Mail className="w-3 h-3" />
      Email
    </span>
  );
}

const columns: Column<LogRow>[] = [
  {
    key: "channel",
    header: "Channel",
    render: (row) => <ChannelBadge channel={row.channel} />,
  },
  {
    key: "recipient",
    header: "Recipient",
    cellClassName: "text-sm",
    render: (row) => (
      <Link
        href={`/admin/email-log/${row.id}/`}
        className="text-slate-700 hover:text-amber-600 truncate block max-w-50"
        title={row.recipient}
      >
        {row.recipient}
      </Link>
    ),
  },
  {
    key: "subject",
    header: "Subject / Action",
    cellClassName: "text-sm",
    render: (row) => (
      <Link href={`/admin/email-log/${row.id}/`} className="block group">
        <span className="text-slate-900 group-hover:text-amber-600 truncate block max-w-70" title={row.subject}>
          {row.subject}
        </span>
        {row.error && (
          <span className="text-xs text-red-600 truncate block max-w-70 mt-0.5" title={row.error}>
            {row.error}
          </span>
        )}
      </Link>
    ),
  },
  {
    key: "type",
    header: "Type",
    cellClassName: "text-xs text-slate-500 capitalize",
    render: (row) => row.type.replace(/_/g, " "),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <StatusBadge label={row.status} tone={STATUS_TONE[row.status]} size="sm" />
    ),
  },
  {
    key: "created",
    header: "Date",
    cellClassName: "text-xs text-slate-500",
    render: (row) => formatDateTime(row.createdAt),
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (row) => (
      <Link
        href={`/admin/email-log/${row.id}/`}
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-600"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    ),
  },
];

export default async function EmailLogPage({
  searchParams,
}: {
  searchParams: Promise<{
    channel?: string;
    status?: string;
    type?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const where = {
    ...(params.channel && params.channel !== "all" && {
      channel: params.channel as CommunicationChannel,
    }),
    ...(params.status && params.status !== "all" && {
      status: params.status as EmailStatus,
    }),
    ...(params.type && params.type !== "all" && { type: params.type }),
    ...(params.search && {
      OR: [
        { recipient: { contains: params.search, mode: "insensitive" as const } },
        { subject: { contains: params.search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [logs, total, emailStats, whatsappStats, typesRaw] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        channel: true,
        recipient: true,
        subject: true,
        type: true,
        status: true,
        error: true,
        sentAt: true,
        createdAt: true,
      },
    }),
    prisma.emailLog.count({ where }),
    prisma.emailLog.groupBy({
      by: ["status"],
      where: { channel: "EMAIL" },
      _count: true,
    }),
    prisma.emailLog.count({ where: { channel: "WHATSAPP" } }),
    prisma.emailLog.findMany({ select: { type: true }, distinct: ["type"] }),
  ]);

  const emailCounts: Record<EmailStatus, number> = {
    PENDING: 0,
    SENT: 0,
    FAILED: 0,
    BOUNCED: 0,
  };
  for (const s of emailStats) emailCounts[s.status] = s._count;
  const types = typesRaw.map((t) => t.type).sort();
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Communications Log"
        description="Email delivery and WhatsApp engagement tracking across all channels."
      />

      <StatCardGrid cols={5}>
        <StatCard label="Emails Sent" value={emailCounts.SENT.toLocaleString()} icon={CheckCircle2} tone="success" />
        <StatCard label="Emails Pending" value={emailCounts.PENDING.toLocaleString()} icon={Clock} tone="pending" />
        <StatCard label="Emails Failed" value={emailCounts.FAILED.toLocaleString()} icon={AlertCircle} tone="warning" />
        <StatCard label="Emails Bounced" value={emailCounts.BOUNCED.toLocaleString()} icon={Mail} tone="neutral" />
        <StatCard label="WhatsApp Clicks" value={whatsappStats.toLocaleString()} icon={Phone} tone="completed" />
      </StatCardGrid>

      <DataToolbar>
        <div className="flex-1 min-w-55 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Recipient or subject..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            name="channel"
            defaultValue={params.channel || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
          >
            <option value="all">All channels</option>
            <option value="EMAIL">Email</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>
        <select
          name="status"
          defaultValue={params.status || "all"}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
        >
          <option value="all">All statuses</option>
          <option value="SENT">Sent</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="BOUNCED">Bounced</option>
        </select>
        <select
          name="type"
          defaultValue={params.type || "all"}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
        >
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
        >
          Filter
        </button>
      </DataToolbar>

      {logs.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No communications found"
          message={
            params.status || params.type || params.search || params.channel
              ? "Try adjusting your filters"
              : "Emails and WhatsApp clicks will appear here once activity begins"
          }
        />
      ) : (
        <DataTable
          columns={columns}
          rows={logs}
          getRowKey={(row) => row.id}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
        basePath="/admin/email-log"
        params={{
          channel: params.channel,
          status: params.status,
          type: params.type,
          search: params.search,
        }}
        label="record"
      />
    </div>
  );
}
