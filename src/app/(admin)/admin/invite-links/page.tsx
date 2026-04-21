import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Search, Filter, ExternalLink, Mail, MousePointerClick } from "lucide-react";
import { InviteLinkActions } from "@/components/admin/InviteLinkActions";

async function getInviteLinks(params: {
  active?: string;
  search?: string;
  page?: number;
}) {
  const { active, search, page = 1 } = params;
  const limit = 25;

  const where = {
    ...(active === "active" && { isActive: true }),
    ...(active === "inactive" && { isActive: false }),
    ...(search && {
      OR: [
        { code: { contains: search, mode: "insensitive" as const } },
        { creatorEmail: { contains: search, mode: "insensitive" as const } },
        { creatorName: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [links, total, totalBookings, totalClicks] = await Promise.all([
    prisma.inviteLink.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        departure: {
          include: { route: { select: { title: true } } },
        },
      },
    }),
    prisma.inviteLink.count({ where }),
    prisma.inviteLink.aggregate({ _sum: { bookingCount: true } }),
    prisma.inviteLink.aggregate({ _sum: { clickCount: true } }),
  ]);

  return {
    links,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    totalBookings: totalBookings._sum.bookingCount || 0,
    totalClicks: totalClicks._sum.clickCount || 0,
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

export default async function InviteLinksPage({
  searchParams,
}: {
  searchParams: Promise<{ active?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const { links, total, totalPages, totalBookings, totalClicks } = await getInviteLinks({
    active: params.active,
    search: params.search,
    page,
  });

  const qs = new URLSearchParams();
  if (params.active) qs.set("active", params.active);
  if (params.search) qs.set("search", params.search);
  const linkWithPage = (p: number) => {
    const copy = new URLSearchParams(qs);
    copy.set("page", String(p));
    return `/admin/invite-links?${copy.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Invite Links</h1>
        <p className="text-slate-600 mt-1">
          Group-booking invite links created by lead climbers to recruit friends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard label="Total Links" value={total} icon={Users} color="bg-blue-500" />
        <SummaryCard label="Total Clicks" value={totalClicks} icon={MousePointerClick} color="bg-purple-500" />
        <SummaryCard label="Resulting Bookings" value={totalBookings} icon={Mail} color="bg-emerald-500" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Code, creator name, or email..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="active"
              defaultValue={params.active || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Revoked</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            Filter
          </button>
        </form>
      </div>

      {links.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No invite links found</h3>
          <p className="text-slate-500">
            {params.active || params.search
              ? "Try adjusting your filters"
              : "Invite links appear here when lead climbers share their bookings"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Code</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Creator</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Departure</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Clicks</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Bookings</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Expires</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">{link.code}</code>
                      <Link
                        href={`/invite/${link.code}`}
                        target="_blank"
                        className="text-slate-400 hover:text-amber-600"
                        title="Open invite link"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {link.inviteeEmails.length} invited
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-slate-900">{link.creatorName}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[160px]">{link.creatorEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {link.departure?.route?.title || "—"}
                    {link.departure && (
                      <div className="text-xs text-slate-500">
                        {formatDate(link.departure.arrivalDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">{link.clickCount}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-700">{link.bookingCount}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDate(link.expiresAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        link.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {link.isActive ? "Active" : "Revoked"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <InviteLinkActions id={link.id} isActive={link.isActive} />
                  </td>
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

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: typeof Users;
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
