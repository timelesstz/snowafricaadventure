import Link from "next/link";
import { FileQuestion, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <FileQuestion className="w-7 h-7 text-slate-500" aria-hidden="true" />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 mb-2">
        Not found
      </h1>
      <p className="text-slate-600 max-w-md mb-6">
        The record or page you&apos;re looking for doesn&apos;t exist — it may
        have been deleted, or the link is out of date.
      </p>
      <div className="flex gap-3">
        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
          Dashboard
        </Link>
        <Link
          href="/admin/bookings"
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Bookings
        </Link>
      </div>
    </div>
  );
}
