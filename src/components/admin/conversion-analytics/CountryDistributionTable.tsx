"use client";

import { COUNTRIES } from "@/lib/countries";

interface CountryRow {
  countryCode: string | null;
  _count: { id: number };
}

interface CountryDistributionTableProps {
  data: CountryRow[];
  title?: string;
  showRevenue?: boolean;
  revenueData?: Array<{
    countryCode: string | null;
    _sum: { totalPrice: number | null };
  }>;
}

function getCountryInfo(code: string | null) {
  if (!code) return { name: "Unknown", flag: "" };
  const country = COUNTRIES.find((c) => c.code === code);
  return country
    ? { name: country.name, flag: country.flag }
    : { name: code, flag: "" };
}

export default function CountryDistributionTable({
  data,
  title = "Country Distribution",
  showRevenue = false,
  revenueData,
}: CountryDistributionTableProps) {
  const total = data.reduce((sum, row) => sum + row._count.id, 0);

  const revenueMap = new Map(
    revenueData?.map((r) => [r.countryCode, Number(r._sum.totalPrice || 0)]) ||
      []
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Country</th>
              <th className="pb-2 font-medium text-right">Count</th>
              <th className="pb-2 font-medium text-right">%</th>
              {showRevenue && (
                <th className="pb-2 font-medium text-right">Revenue</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const { name, flag } = getCountryInfo(row.countryCode);
              const pct = total > 0 ? ((row._count.id / total) * 100).toFixed(1) : "0";
              const revenue = revenueMap.get(row.countryCode);
              return (
                <tr
                  key={row.countryCode || i}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-2.5">
                    <span className="mr-2">{flag}</span>
                    <span className="text-slate-700">{name}</span>
                  </td>
                  <td className="py-2.5 text-right font-medium text-slate-900">
                    {row._count.id}
                  </td>
                  <td className="py-2.5 text-right text-slate-500">{pct}%</td>
                  {showRevenue && (
                    <td className="py-2.5 text-right text-slate-700">
                      {revenue !== undefined
                        ? `$${revenue.toLocaleString()}`
                        : "-"}
                    </td>
                  )}
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={showRevenue ? 4 : 3}
                  className="py-8 text-center text-slate-400"
                >
                  No data available yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
