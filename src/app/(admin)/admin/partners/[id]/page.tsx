import { prisma } from "@/lib/prisma";
import { getPartnerFullEarnings } from "@/lib/commission";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  User,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Pencil,
  Mountain,
  Compass,
  Sun,
  Palmtree,
  FileText,
  AlertCircle,
} from "lucide-react";
import { PartnerActions } from "./PartnerActions";

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

const partnerTypeColors: Record<string, string> = {
  MARKETING: "bg-purple-100 text-purple-700",
  DEVELOPER: "bg-blue-100 text-blue-700",
  AFFILIATE: "bg-green-100 text-green-700",
  AGENT: "bg-amber-100 text-amber-700",
};

async function getPartner(id: string) {
  return prisma.partner.findUnique({
    where: { id },
    include: {
      commissionRates: {
        orderBy: { tripType: "asc" },
      },
      _count: {
        select: { commissions: true },
      },
    },
  });
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const { id } = await params;

  const partner = await getPartner(id);

  if (!partner) {
    notFound();
  }

  const earnings = await getPartnerFullEarnings(id);

  // Check if agreement is expiring soon (within 30 days)
  const agreementExpiringSoon =
    partner.agreementExpiry &&
    new Date(partner.agreementExpiry) <
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const agreementExpired =
    partner.agreementExpiry && new Date(partner.agreementExpiry) < new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/partners"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                {partner.name}
              </h1>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  partnerTypeColors[partner.type] || "bg-slate-100 text-slate-700"
                }`}
              >
                {partner.type}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  partner.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {partner.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-slate-600 mt-1">
              Partner since{" "}
              {partner.agreementDate
                ? new Date(partner.agreementDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : new Date(partner.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/partners/${id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit Partner
        </Link>
      </div>

      {/* Alerts */}
      {agreementExpired && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-700">Agreement Expired</p>
            <p className="text-sm text-red-600">
              The agreement expired on{" "}
              {new Date(partner.agreementExpiry!).toLocaleDateString()}. Please
              renew the agreement.
            </p>
          </div>
        </div>
      )}

      {agreementExpiringSoon && !agreementExpired && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <div>
            <p className="font-medium text-amber-700">Agreement Expiring Soon</p>
            <p className="text-sm text-amber-600">
              The agreement will expire on{" "}
              {new Date(partner.agreementExpiry!).toLocaleDateString()}. Consider
              renewing soon.
            </p>
          </div>
        </div>
      )}

      {/* Earnings Summary Cards */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Partner Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Contact Name</p>
                  <p className="font-medium text-slate-900">
                    {partner.contactName || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">
                    {partner.contactEmail ? (
                      <a
                        href={`mailto:${partner.contactEmail}`}
                        className="text-amber-600 hover:underline"
                      >
                        {partner.contactEmail}
                      </a>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Phone className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">
                    {partner.contactPhone || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Building2 className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Partner Type</p>
                  <p className="font-medium text-slate-900">{partner.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement & Payout */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              Agreement & Payout
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Agreement Start</p>
                  <p className="font-medium text-slate-900">
                    {partner.agreementDate
                      ? new Date(partner.agreementDate).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Agreement Expiry</p>
                  <p
                    className={`font-medium ${
                      agreementExpired
                        ? "text-red-600"
                        : agreementExpiringSoon
                        ? "text-amber-600"
                        : "text-slate-900"
                    }`}
                  >
                    {partner.agreementExpiry
                      ? new Date(partner.agreementExpiry).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Payout Frequency</p>
                  <p className="font-medium text-slate-900">
                    {partner.payoutFrequency}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Payout Method</p>
                  <p className="font-medium text-slate-900">
                    {partner.payoutMethod || "—"}
                  </p>
                </div>
              </div>
            </div>

            {partner.notes && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Notes</p>
                <p className="text-sm text-slate-700">{partner.notes}</p>
              </div>
            )}
          </div>

          {/* Recent Commissions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Commissions
              </h2>
              <Link
                href={`/admin/partners/${id}/earnings`}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                View All →
              </Link>
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
                      Trip
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
                  {earnings.recentCommissions.slice(0, 5).map((commission) => (
                    <tr key={commission.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(commission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {tripTypeIcons[commission.tripType || ""] || (
                            <Compass className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="text-sm">
                            {commission.routeTitle}
                          </span>
                        </div>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Commission Rates */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Commission Rates
            </h2>
            <div className="space-y-3">
              {partner.commissionRates.length === 0 ? (
                <p className="text-slate-500 text-sm">No rates configured</p>
              ) : (
                partner.commissionRates.map((rate) => (
                  <div
                    key={rate.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      rate.isActive
                        ? "bg-slate-50 border border-slate-200"
                        : "bg-slate-100 border border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tripTypeIcons[rate.tripType] || (
                        <Compass className="w-4 h-4" />
                      )}
                      <span className="font-medium text-slate-700">
                        {tripTypeLabels[rate.tripType] || rate.tripType}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">
                      {Number(rate.commissionRate)}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Earnings by Trip Type */}
          {earnings.byTripType.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Earnings by Trip Type
              </h2>
              <div className="space-y-4">
                {earnings.byTripType.map((item) => (
                  <div key={item.tripType}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {tripTypeIcons[item.tripType] || (
                          <Compass className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium text-slate-700">
                          {tripTypeLabels[item.tripType] || item.tripType}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">
                        ${item.commissionAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{item.bookings} bookings</span>
                      <span>${item.bookingAmount.toLocaleString()} value</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Bookings</span>
                <span className="font-semibold">
                  {partner._count.commissions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Voided</span>
                <span className="font-semibold text-red-600">
                  {earnings.summary.voided.count} ($
                  {earnings.summary.voided.amount.toLocaleString()})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Member Since</span>
                <span className="font-semibold">
                  {new Date(partner.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Partner Actions (Interactive) */}
          <PartnerActions
            partnerId={id}
            partnerName={partner.name}
            partnerEmail={partner.contactEmail}
            hasPendingCommissions={earnings.summary.pending.count > 0 || earnings.summary.eligible.count > 0}
          />

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Links
            </h2>
            <div className="space-y-2">
              <Link
                href={`/admin/partners/${id}/earnings`}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                View Full Earnings Report
              </Link>
              <Link
                href={`/admin/partners/${id}/edit`}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit Partner Details
              </Link>
              <Link
                href={`/admin/commissions?partnerId=${id}`}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                View All Commissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
