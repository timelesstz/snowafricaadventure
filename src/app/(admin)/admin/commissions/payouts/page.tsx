import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Wallet } from "lucide-react";
import PayoutStatusBadge from "@/components/admin/PayoutStatusBadge";
import PayoutActions from "@/components/admin/PayoutActions";

async function getPayouts() {
  const payouts = await prisma.commissionPayout.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fetch partner names
  const partnerIds = [...new Set(payouts.map((p) => p.partnerId))];
  const partners = await prisma.partner.findMany({
    where: { id: { in: partnerIds } },
    select: { id: true, name: true },
  });
  const partnerMap = new Map(partners.map((p) => [p.id, p.name]));

  return payouts.map((p) => ({
    ...p,
    partnerName: partnerMap.get(p.partnerId) || "Unknown",
  }));
}

export default async function PayoutsPage() {
  const payouts = await getPayouts();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/commissions"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payouts</h1>
          <p className="text-slate-600 mt-1">
            Manage commission payouts to partners
          </p>
        </div>
      </div>

      {payouts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Wallet className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No payouts yet
          </h3>
          <p className="text-slate-500">
            Payouts will appear here when you generate them for partners
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Partner
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Period
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                  Commissions
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                  Amount
                </th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payout.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {payout.partnerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payout.periodStart.toLocaleDateString()} -{" "}
                    {payout.periodEnd.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">
                    {payout.totalCommissions}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    ${Number(payout.totalAmount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <PayoutStatusBadge status={payout.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <PayoutActions id={payout.id} status={payout.status} />
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
