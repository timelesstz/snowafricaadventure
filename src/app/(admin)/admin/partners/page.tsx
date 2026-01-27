import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Users, Eye, DollarSign, TrendingUp } from "lucide-react";

async function getPartners() {
  const partners = await prisma.partner.findMany({
    include: {
      commissionRates: true,
      _count: {
        select: { commissions: true },
      },
      commissions: {
        select: {
          commissionAmount: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate earnings for each partner
  return partners.map((partner) => {
    const totalEarnings = partner.commissions.reduce(
      (sum, c) => sum + Number(c.commissionAmount),
      0
    );
    const paidEarnings = partner.commissions
      .filter((c) => c.status === "PAID")
      .reduce((sum, c) => sum + Number(c.commissionAmount), 0);
    const pendingEarnings = partner.commissions
      .filter((c) => c.status === "PENDING" || c.status === "ELIGIBLE")
      .reduce((sum, c) => sum + Number(c.commissionAmount), 0);

    return {
      ...partner,
      totalEarnings,
      paidEarnings,
      pendingEarnings,
    };
  });
}

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Partners</h1>
          <p className="text-slate-600 mt-1">
            Manage partner agreements and commission rates
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Partner
        </Link>
      </div>

      {partners.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No partners yet
          </h3>
          <p className="text-slate-500 mb-4">
            Add your first partner to start tracking commissions
          </p>
          <Link
            href="/admin/partners/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Partner
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Partner
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Commission Rates
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Bookings
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Earnings
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/partners/${partner.id}`} className="block group">
                      <p className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                        {partner.name}
                      </p>
                      {partner.contactEmail && (
                        <p className="text-sm text-slate-500">
                          {partner.contactEmail}
                        </p>
                      )}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                      {partner.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {partner.commissionRates.map((rate) => (
                        <span
                          key={rate.id}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                        >
                          {rate.tripType}: {Number(rate.commissionRate)}%
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {partner._count.commissions}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          ${partner.totalEarnings.toLocaleString()}
                        </span>
                      </div>
                      {partner.pendingEarnings > 0 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-amber-500" />
                          <span className="text-xs text-amber-600">
                            ${partner.pendingEarnings.toLocaleString()} pending
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        partner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {partner.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/partners/${partner.id}/earnings`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-amber-600 hover:text-amber-700"
                    >
                      <DollarSign className="w-4 h-4" />
                      Earnings
                    </Link>
                    <Link
                      href={`/admin/partners/${partner.id}`}
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
      )}
    </div>
  );
}
