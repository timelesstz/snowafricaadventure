import SeoSubNav from "@/components/admin/seo/SeoSubNav";
import { loadFreshness } from "@/lib/seo-overview";

export default async function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const freshness = await loadFreshness();
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
        <h1 className="text-2xl font-bold text-slate-900">SEO</h1>
        <p className="text-sm text-slate-500">
          Search Console, Analytics and on-site checks, refreshed every morning
        </p>
      </div>
      <SeoSubNav freshness={freshness} />
      {children}
    </div>
  );
}
