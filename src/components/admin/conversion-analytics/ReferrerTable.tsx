"use client";

import { ExternalLink } from "lucide-react";

interface ReferrerRow {
  referrerUrl: string | null;
  _count: { id: number };
}

interface ReferrerTableProps {
  data: ReferrerRow[];
  title?: string;
}

function cleanReferrer(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch {
    return url;
  }
}

export default function ReferrerTable({
  data,
  title = "Top Referrers",
}: ReferrerTableProps) {
  const filtered = data.filter(
    (row) => row.referrerUrl && row.referrerUrl.length > 0
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Referrer</th>
              <th className="pb-2 font-medium text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-700 truncate max-w-xs">
                      {cleanReferrer(row.referrerUrl!)}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-right font-medium text-slate-900">
                  {row._count.id}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="py-8 text-center text-slate-400">
                  No referrer data captured yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
