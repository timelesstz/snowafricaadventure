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
  searchParams: Promise<{ status?: string; type?: string; search?: string; page?: string }>;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-600 mt-1">
            Manage customer inquiries and leads
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Inquiries</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.totalInquiries}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">New</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.newInquiries}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Contacted</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.contactedInquiries}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Converted</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.convertedInquiries}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Today</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.todayInquiries}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
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
            <select
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
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Inquiries Table */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No inquiries found
          </h3>
          <p className="text-slate-500">
            {search || status || type
              ? "Try adjusting your filters"
              : "Inquiries will appear here once customers submit forms"}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Details
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Travel Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Received
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {inquiry.fullName}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {inquiry.email}
                        </p>
                        {inquiry.phone && (
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inquiry.phonePrefix && `${inquiry.phonePrefix} `}
                            {inquiry.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <InquiryTypeBadge type={inquiry.type} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {inquiry.tripType && (
                          <p className="text-slate-700">{inquiry.tripType}</p>
                        )}
                        {(inquiry.numAdults || inquiry.numChildren) && (
                          <p className="text-slate-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {inquiry.numAdults || 0} adults
                            {inquiry.numChildren ? `, ${inquiry.numChildren} children` : ""}
                          </p>
                        )}
                        {inquiry.nationality && (
                          <p className="text-slate-500 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {inquiry.nationality}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {formatDate(inquiry.arrivalDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <InquiryStatusBadge status={inquiry.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDateTime(inquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of{" "}
                {total} inquiries
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/inquiries?page=${page - 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-3 py-1 text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/admin/inquiries?page=${page + 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
