import { AdminPageHeader, TableSkeleton } from "@/components/admin/ui";

export default function UsersLoading() {
  return (
    <div>
      <AdminPageHeader
        title="User Management"
        description="Manage admin users and their access levels"
      />
      <TableSkeleton rows={5} cols={5} />
    </div>
  );
}
