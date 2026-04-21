"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";

export default function PrintActions({ bookingRef }: { bookingRef: string }) {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="no-print sticky top-0 z-10 bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <Link
        href={`/admin/bookings/${id}`}
        className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to booking {bookingRef}
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        <Printer className="w-4 h-4" />
        Print / Save as PDF
      </button>
    </div>
  );
}
