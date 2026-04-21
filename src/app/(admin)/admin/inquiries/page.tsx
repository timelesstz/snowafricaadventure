import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { InquiryStatusBadge } from "@/components/admin/inquiries/InquiryStatusBadge";
import { InquiryTypeBadge } from "@/components/admin/inquiries/InquiryTypeBadge";
import type { Inquiry } from "@prisma/client";
import {
  AdminPageHeader,
  StatCard,
  StatCardGrid,
  EmptyState,
  DataToolbar,
  DataTable,
  Pagination,
  type Column,
} from "@/components/admin/ui";

async function getInquiries(params: {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
}) {
  const { status, type, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(status && status !== "all" && { status }),
    ...(type && type !== "all" && { type }),
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.inquiry.count({ where }),
  ]);

  return { inquiries, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getInquiryStats() {
  const [
    totalInquiries,
    newInquiries,
    contactedInquiries,
    convertedInquiries,
    todayInquiries,
  ] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.inquiry.count({ where: { status: "contacted" } }),
    prisma.inquiry.count({ where: { status: "converted" } }),
    prisma.inquiry.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);

  return {
    totalInquiries,
    newInquiries,
    contactedInquiries,
    convertedInquiries,
    todayInquiries,
  };
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    type?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const type = params.type;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ inquiries, total, totalPages }, stats] = await Promise.all([
    getInquiries({ status, type, search, page }),
    getInquiryStats(),
  ]);

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "converted", label: "Converted" },
    { value: "closed", label: "Closed" },
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "safari", label: "Safari" },
    { value: "trekking", label: "Trekking" },
    { value: "group", label: "Group Departure" },
    { value: "custom", label: "Custom" },
    { value: "contact", label: "Contact" },
  ];

  const columns: Column<Inquiry>[] = [
    {
      key: "contact",
      header: "Contact",
      render: (i) => (
        <div>
          <p className="font-medium text-slate-900">{i.fullName}</p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <Mail className="w-3 h-3" aria-hidden="true" />
            {i.email}
          </p>
          {i.phone && (
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Phone className="w-3 h-3" aria-hidden="true" />
              {i.phonePrefix && `${i.phonePrefix} `}
              {i.phone}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (i) => <InquiryTypeBadge type={i.type} size="sm" />,
    },
    {
      key: "details",
      header: "Details",
      render: (i) => (
        <div className="text-sm">
          {i.tripType && <p className="text-slate-700">{i.tripType}</p>}
          {(i.numAdults || i.numChildren) && (
            <p className="text-slate-500 flex items-center gap-1">
              <Users className="w-3 h-3" aria-hidden="true" />
              {i.numAdults || 0} adults
              {i.numChildren ? `, ${i.numChildren} children` : ""}
            </p>
          )}
          {i.nationality && (
            <p className="text-slate-500 flex items-center gap-1">
              <Globe className="w-3 h-3" aria-hidden="true" />
              {i.nationality}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "travelDate",
      header: "Travel Date",
      render: (i) => (
        <span className="text-sm text-slate-600">
          {formatDate(i.arrivalDate)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (i) => <InquiryStatusBadge status={i.status} size="sm" />,
    },
    {
      key: "received",
      header: "Received",
      render: (i) => (
        <span className="text-sm text-slate-500">
          {formatDateTime(i.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (i) => (
        <Link
          href={`/admin/inquiries/${i.id}`}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Inquiries"
        description="Manage customer inquiries and leads"
      />

      <StatCardGrid cols={5}>
        <StatCard label="Total Inquiries" value={stats.totalInquiries} icon={MessageSquare} />
        <StatCard label="New" value={stats.newInquiries} icon={Clock} tone="info" />
        <StatCard label="Contacted" value={stats.contactedInquiries} icon={Mail} tone="pending" />
        <StatCard label="Converted" value={stats.convertedInquiries} icon={CheckCircle} tone="success" />
        <StatCard label="Today" value={stats.todayInquiries} icon={Calendar} tone="completed" />
      </StatCardGrid>

      <DataToolbar>
        <div className="flex-1 min-w-[200px]">
          <label className="sr-only" htmlFor="inquiry-search">
            Search inquiries
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="inquiry-search"
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by name or email…"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <label className="sr-only" htmlFor="inquiry-status">
            Filter by status
          </label>
          <select
            id="inquiry-status"
            name="status"
            defaultValue={status || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="sr-only" htmlFor="inquiry-type">
            Filter by type
          </label>
          <select
            id="inquiry-type"
            name="type"
            defaultValue={type || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          Filter
        </button>
      </DataToolbar>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No inquiries found"
          message={
            search || status || type
              ? "Try adjusting your filters"
              : "Inquiries will appear here once customers submit forms"
          }
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={inquiries}
            getRowKey={(i) => i.id}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={20}
            basePath="/admin/inquiries"
            params={{ status, type, search }}
            label="inquiry"
          />
        </>
      )}
    </div>
  );
}
