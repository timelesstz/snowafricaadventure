import { AdminPageHeader, TableSkeleton } from "@/components/admin/ui";

export default function PartnersLoading() {
  return (
    <div>
      <AdminPageHeader
        title="Partners"
        description="Manage partner agreements and commission rates"
      />
      <TableSkeleton rows={6} cols={7} />
    </div>
  );
}
