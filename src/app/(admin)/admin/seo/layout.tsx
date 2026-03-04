import SeoSubNav from "@/components/admin/seo/SeoSubNav";

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-slate-900">SEO Dashboard</h1>
      </div>
      <SeoSubNav />
      {children}
    </div>
  );
}
