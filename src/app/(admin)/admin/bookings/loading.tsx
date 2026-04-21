import {
  AdminPageHeader,
  StatCardSkeleton,
  TableSkeleton,
} from "@/components/admin/ui";

export default function BookingsLoading() {
  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Manage group departure bookings"
      />
      <StatCardSkeleton cols={5} />
      <div className="h-16 mb-4 bg-white rounded-lg shadow-sm border border-slate-200 animate-pulse" />
      <TableSkeleton rows={8} cols={8} />
    </div>
  );
}
