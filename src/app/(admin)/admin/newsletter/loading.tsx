import {
  AdminPageHeader,
  StatCardSkeleton,
  TableSkeleton,
} from "@/components/admin/ui";

export default function NewsletterLoading() {
  return (
    <div>
      <AdminPageHeader
        title="Newsletter Subscribers"
        description="People who opted in to receive updates from Snow Africa Adventure."
      />
      <StatCardSkeleton cols={3} />
      <div className="h-16 mb-4 bg-white rounded-lg shadow-sm border border-slate-200 animate-pulse" />
      <TableSkeleton rows={10} cols={6} />
    </div>
  );
}
