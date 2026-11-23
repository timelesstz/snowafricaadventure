import { AdminPageHeader, StatCardSkeleton, TableSkeleton } from "@/components/admin/ui";

export default function BookingsLoading() {
  return (
    <div aria-busy="true">
      <AdminPageHeader
        title="Bookings"
        description="Group departure bookings: who is coming, what they owe and when they climb."
      />
      <StatCardSkeleton cols={4} />
      <div className="mb-0 h-14 rounded-t-lg border border-b-0 border-slate-200 bg-white animate-pulse" />
      <TableSkeleton rows={8} cols={6} />
    </div>
  );
}
