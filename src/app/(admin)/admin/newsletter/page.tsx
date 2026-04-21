import { prisma } from "@/lib/prisma";
import { Mail, Search, Filter, Download, UserCheck, UserX } from "lucide-react";
import type { NewsletterSubscription } from "@prisma/client";
import {
  AdminPageHeader,
  StatCard,
  StatCardGrid,
  EmptyState,
  DataToolbar,
  DataTable,
  Pagination,
  StatusBadge,
  type Column,
} from "@/components/admin/ui";

async function getSubscribers(params: {
  active?: string;
  search?: string;
  source?: string;
  page?: number;
}) {
  const { active, search, source, page = 1 } = params;
  const limit = 50;

  const where = {
    ...(active === "active" && { isActive: true }),
    ...(active === "inactive" && { isActive: false }),
    ...(source && source !== "all" && { source }),
    ...(search && {
      OR: [
        { email: { contains: search, mode: "insensitive" as const } },
        { name: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [subs, total, activeCount, inactiveCount, sources] = await Promise.all([
    prisma.newsletterSubscription.findMany({
      where,
      orderBy: { subscribedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.newsletterSubscription.count({ where }),
    prisma.newsletterSubscription.count({ where: { isActive: true } }),
    prisma.newsletterSubscription.count({ where: { isActive: false } }),
    prisma.newsletterSubscription.findMany({
      select: { source: true },
      distinct: ["source"],
    }),
  ]);

  return {
    subs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    activeCount,
    inactiveCount,
    sources: sources
      .map((s) => s.source)
      .filter((s): s is string => Boolean(s))
      .sort(),
  };
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{
    active?: string;
    search?: string;
    source?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const { subs, total, totalPages, activeCount, inactiveCount, sources } =
    await getSubscribers({
      active: params.active,
      search: params.search,
      source: params.source,
      page,
    });

  const exportUrl = `/api/admin/newsletter/export${
    params.active ? `?active=${params.active}` : ""
  }`;

  const columns: Column<NewsletterSubscription>[] = [
    {
      key: "email",
      header: "Email",
      cellClassName: "max-w-[260px]",
      render: (s) => (
        <span className="text-sm text-slate-700 truncate block">{s.email}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (s) => <span className="text-sm text-slate-700">{s.name || "—"}</span>,
    },
    {
      key: "source",
      header: "Source",
      render: (s) => <span className="text-xs text-slate-500">{s.source || "—"}</span>,
    },
    {
      key: "subscribed",
      header: "Subscribed",
      render: (s) => (
        <span className="text-xs text-slate-500">{formatDate(s.subscribedAt)}</span>
      ),
    },
    {
      key: "unsubscribed",
      header: "Unsubscribed",
      render: (s) => (
        <span className="text-xs text-slate-500">{formatDate(s.unsubscribedAt)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (s) => (
        <StatusBadge
          label={s.isActive ? "Active" : "Unsubscribed"}
          tone={s.isActive ? "completed" : "neutral"}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Newsletter Subscribers"
        description="People who opted in to receive updates from Snow Africa Adventure."
        actions={
          <a
            href={exportUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export CSV
          </a>
        }
      />

      <StatCardGrid cols={3}>
        <StatCard
          label="Total Subscribers"
          value={(activeCount + inactiveCount).toLocaleString()}
          icon={Mail}
          tone="info"
        />
        <StatCard label="Active" value={activeCount.toLocaleString()} icon={UserCheck} tone="completed" />
        <StatCard label="Unsubscribed" value={inactiveCount.toLocaleString()} icon={UserX} />
      </StatCardGrid>

      <DataToolbar>
        <div className="flex-1 min-w-[220px] relative">
          <label className="sr-only" htmlFor="newsletter-search">
            Search subscribers
          </label>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="newsletter-search"
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Email or name…"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <label className="sr-only" htmlFor="newsletter-active">
            Filter by active status
          </label>
          <select
            id="newsletter-active"
            name="active"
            defaultValue={params.active || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Unsubscribed</option>
          </select>
        </div>
        <label className="sr-only" htmlFor="newsletter-source">
          Filter by source
        </label>
        <select
          id="newsletter-source"
          name="source"
          defaultValue={params.source || "all"}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="all">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          Filter
        </button>
      </DataToolbar>

      {subs.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No subscribers found"
          message={
            params.active || params.source || params.search
              ? "Try adjusting your filters"
              : "Subscribers will appear here when visitors opt in"
          }
        />
      ) : (
        <>
          <DataTable columns={columns} rows={subs} getRowKey={(s) => s.id} />
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={50}
            basePath="/admin/newsletter"
            params={{
              active: params.active,
              source: params.source,
              search: params.search,
            }}
            label="subscriber"
          />
        </>
      )}
    </div>
  );
}
