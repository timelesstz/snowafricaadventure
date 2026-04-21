import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Users, Eye, DollarSign, TrendingUp } from "lucide-react";
import {
  AdminPageHeader,
  EmptyState,
  DataTable,
  StatusBadge,
  type Column,
} from "@/components/admin/ui";

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

type PartnerRow = Awaited<ReturnType<typeof getPartners>>[number];

export default async function PartnersPage() {
  const partners = await getPartners();

  const addPartnerButton = (
    <Link
      href="/admin/partners/new"
      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
    >
      <Plus className="w-4 h-4" aria-hidden="true" />
      Add Partner
    </Link>
  );

  const columns: Column<PartnerRow>[] = [
    {
      key: "partner",
      header: "Partner",
      render: (p) => (
        <Link href={`/admin/partners/${p.id}`} className="block group">
          <p className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
            {p.name}
          </p>
          {p.contactEmail && (
            <p className="text-sm text-slate-500">{p.contactEmail}</p>
          )}
        </Link>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (p) => <StatusBadge label={p.type} tone="neutral" />,
    },
    {
      key: "rates",
      header: "Commission Rates",
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.commissionRates.map((rate) => (
            <span
              key={rate.id}
              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
            >
              {rate.tripType}: {Number(rate.commissionRate)}%
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "bookings",
      header: "Bookings",
      render: (p) => <span className="text-slate-600">{p._count.commissions}</span>,
    },
    {
      key: "earnings",
      header: "Earnings",
      render: (p) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-green-600" aria-hidden="true" />
            <span className="text-sm font-medium text-green-700">
              ${p.totalEarnings.toLocaleString()}
            </span>
          </div>
          {p.pendingEarnings > 0 && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-amber-500" aria-hidden="true" />
              <span className="text-xs text-amber-600">
                ${p.pendingEarnings.toLocaleString()} pending
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <StatusBadge
          label={p.isActive ? "Active" : "Inactive"}
          tone={p.isActive ? "success" : "danger"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (p) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/partners/${p.id}/earnings`}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-amber-600 hover:text-amber-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <DollarSign className="w-4 h-4" aria-hidden="true" />
            Earnings
          </Link>
          <Link
            href={`/admin/partners/${p.id}`}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Partners"
        description="Manage partner agreements and commission rates"
        actions={addPartnerButton}
      />

      {partners.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No partners yet"
          message="Add your first partner to start tracking commissions"
          action={addPartnerButton}
        />
      ) : (
        <DataTable
          columns={columns}
          rows={partners}
          getRowKey={(p) => p.id}
        />
      )}
    </div>
  );
}
