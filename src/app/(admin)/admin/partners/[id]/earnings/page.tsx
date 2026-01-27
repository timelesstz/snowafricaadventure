import { prisma } from "@/lib/prisma";
import { getPartnerFullEarnings } from "@/lib/commission";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Mountain,
  Compass,
  Sun,
  Palmtree,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const tripTypeIcons: Record<string, React.ReactNode> = {
  kilimanjaro: <Mountain className="w-5 h-5" />,
  safari: <Compass className="w-5 h-5" />,
  daytrip: <Sun className="w-5 h-5" />,
  zanzibar: <Palmtree className="w-5 h-5" />,
};

const tripTypeLabels: Record<string, string> = {
  kilimanjaro: "Kilimanjaro",
  safari: "Safari",
  daytrip: "Day Trips",
  zanzibar: "Zanzibar",
};

export default async function PartnerEarningsPage({ params }: PageProps) {
  const { id } = await params;

  const partner = await prisma.partner.findUnique({
    where: { id },
    include: {
      commissionRates: true,
    },
  });

  if (!partner) {
    notFound();
  }

  const earnings = await getPartnerFullEarnings(id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/partners"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {partner.name} - Earnings
          </h1>
          <p className="text-slate-600 mt-1">
            Commission earnings breakdown and history
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Payable</p>
              <p className="text-2xl font-bold text-green-700">
                ${earnings.summary.totalPayable.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-amber-700">
                ${earnings.summary.pending.amount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                {earnings.summary.pending.count} commissions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Eligible</p>
              <p className="text-2xl font-bold text-blue-700">
                ${earnings.summary.eligible.amount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                {earnings.summary.eligible.count} commissions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Paid (All Time)</p>
              <p className="text-2xl font-bold text-slate-700">
                ${earnings.summary.paid.amount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                {earnings.summary.paid.count} commissions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings by Trip Type */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Earnings by Trip Type
        </h2>
        {earnings.byTripType.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            No commission data yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {earnings.byTripType.map((item) => (
              <div
                key={item.tripType}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-slate-100 rounded">
                    {tripTypeIcons[item.tripType] || (
                      <Compass className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium text-slate-900">
                    {tripTypeLabels[item.tripType] || item.tripType}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Bookings</span>
                    <span className="font-medium">{item.bookings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Booking Value</span>
                    <span className="font-medium">
                      ${item.bookingAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-slate-600">Commission</span>
                    <span className="font-semibold text-green-700">
                      ${item.commissionAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Commission Rates */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Commission Rates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partner.commissionRates.map((rate) => (
            <div
              key={rate.id}
              className={`border rounded-lg p-4 ${
                rate.isActive
                  ? "border-green-200 bg-green-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {tripTypeIcons[rate.tripType] || <Compass className="w-4 h-4" />}
                <span className="font-medium">
                  {tripTypeLabels[rate.tripType] || rate.tripType}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {Number(rate.commissionRate)}%
              </p>
              {!rate.isActive && (
                <span className="text-xs text-red-600">Inactive</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Commissions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Commissions
          </h2>
        </div>
        {earnings.recentCommissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No commissions recorded yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Route/Trip
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Booking Value
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Rate
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Commission
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {earnings.recentCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(commission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tripTypeIcons[commission.tripType || ""] || (
                        <Compass className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm font-medium">
                        {commission.routeTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    ${commission.bookingAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {commission.commissionRate}%
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-green-700">
                    ${commission.commissionAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        commission.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : commission.status === "ELIGIBLE"
                          ? "bg-blue-100 text-blue-700"
                          : commission.status === "VOIDED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {commission.status === "PAID" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {commission.status === "VOIDED" && (
                        <XCircle className="w-3 h-3" />
                      )}
                      {commission.status === "PENDING" && (
                        <Clock className="w-3 h-3" />
                      )}
                      {commission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
