import ConversionSubNav from "@/components/admin/conversion-analytics/ConversionSubNav";

export default function ConversionAnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Conversion Analytics
        </h1>
      </div>
      <ConversionSubNav />
      {children}
    </div>
  );
}
