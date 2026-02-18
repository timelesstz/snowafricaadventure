import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Paintbrush, PencilLine } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { getDefaultHeroes } from "@/components/layout/PageHero";

const PAGE_ORDER = [
  "homepage",
  "tanzania-safaris",
  "trekking",
  "tailor-made-safari",
  "zanzibar",
  "day-trips",
  "kilimanjaro-join-group-departures",
  "contact-us",
  "faq",
  "blog",
];

export default async function HeroesAdminPage() {
  await requireRole("EDITOR");

  const dbHeroes = await prisma.pageHero.findMany();
  const dbHeroMap = new Map(dbHeroes.map((h) => [h.pageSlug, h]));
  const defaults = getDefaultHeroes();

  const heroes = PAGE_ORDER.map((slug) => {
    const db = dbHeroMap.get(slug);
    const def = defaults[slug];
    return {
      pageSlug: slug,
      pageName: db?.pageName || def?.pageName || slug,
      heroType: db?.heroType || def?.heroType || "gradient",
      title: db?.title || def?.title || "",
      backgroundImage: db?.backgroundImage || def?.backgroundImage || null,
      isActive: db?.isActive ?? true,
      hasDbRecord: !!db,
      updatedAt: db?.updatedAt || null,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Page Heroes</h1>
          <p className="text-slate-500 mt-1">
            Manage hero sections across all public pages
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {heroes.map((hero) => (
          <Link
            key={hero.pageSlug}
            href={`/admin/heroes/${hero.pageSlug}/`}
            className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-amber-300"
          >
            {/* Hero Preview */}
            <div className="relative h-40 bg-slate-800">
              {hero.heroType === "image" && hero.backgroundImage ? (
                <>
                  <Image
                    src={hero.backgroundImage}
                    alt={hero.pageName}
                    fill
                    className="object-cover opacity-70"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
              )}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white font-bold text-lg truncate">
                  {hero.title.split("\n")[0]}
                </p>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  hero.heroType === "image"
                    ? "bg-blue-500/80 text-white"
                    : "bg-purple-500/80 text-white"
                }`}>
                  {hero.heroType === "image" ? (
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Image
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Paintbrush className="w-3 h-3" /> Gradient
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {hero.pageName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    /{hero.pageSlug === "homepage" ? "" : hero.pageSlug + "/"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {hero.hasDbRecord ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Customized
                    </span>
                  ) : (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                  <PencilLine className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
