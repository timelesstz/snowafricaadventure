import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { getDefaultHeroes } from "@/components/layout/PageHero";
import { HeroEditorForm } from "./HeroEditorForm";

interface Props {
  params: Promise<{ pageSlug: string }>;
}

export default async function EditHeroPage({ params }: Props) {
  await requireRole("EDITOR");
  const { pageSlug } = await params;

  const defaults = getDefaultHeroes();
  const defaultHero = defaults[pageSlug];

  if (!defaultHero) {
    notFound();
  }

  const dbHero = await prisma.pageHero.findUnique({
    where: { pageSlug },
  });

  // Merge DB data with defaults
  const hero = {
    pageSlug,
    pageName: dbHero?.pageName || defaultHero.pageName,
    heroType: dbHero?.heroType || defaultHero.heroType || "image",
    title: dbHero?.title || defaultHero.title,
    subtitle: dbHero?.subtitle ?? defaultHero.subtitle ?? "",
    badgeText: dbHero?.badgeText ?? defaultHero.badgeText ?? "",
    ctaPrimaryText: dbHero?.ctaPrimaryText ?? defaultHero.ctaPrimaryText ?? "",
    ctaPrimaryUrl: dbHero?.ctaPrimaryUrl ?? defaultHero.ctaPrimaryUrl ?? "",
    ctaSecondaryText: dbHero?.ctaSecondaryText ?? defaultHero.ctaSecondaryText ?? "",
    ctaSecondaryUrl: dbHero?.ctaSecondaryUrl ?? defaultHero.ctaSecondaryUrl ?? "",
    backgroundImage: dbHero?.backgroundImage ?? defaultHero.backgroundImage ?? "",
    overlayGradient: dbHero?.overlayGradient || defaultHero.overlayGradient || "from-black/70 via-black/50 to-transparent",
    overlayDirection: dbHero?.overlayDirection || defaultHero.overlayDirection || "to-r",
    overlayOpacity: dbHero?.overlayOpacity ?? defaultHero.overlayOpacity ?? 70,
    gradientFrom: dbHero?.gradientFrom ?? defaultHero.gradientFrom ?? "",
    gradientTo: dbHero?.gradientTo ?? defaultHero.gradientTo ?? "",
    minHeight: dbHero?.minHeight || defaultHero.minHeight || "70vh",
    textAlignment: dbHero?.textAlignment || defaultHero.textAlignment || "left",
    textColor: dbHero?.textColor ?? "",
    showScrollIndicator: dbHero?.showScrollIndicator ?? defaultHero.showScrollIndicator ?? false,
    isActive: dbHero?.isActive ?? true,
  };

  async function saveHero(formData: FormData) {
    "use server";

    const data = {
      pageSlug,
      pageName: formData.get("pageName") as string,
      heroType: formData.get("heroType") as string,
      title: formData.get("title") as string,
      subtitle: (formData.get("subtitle") as string) || null,
      badgeText: (formData.get("badgeText") as string) || null,
      ctaPrimaryText: (formData.get("ctaPrimaryText") as string) || null,
      ctaPrimaryUrl: (formData.get("ctaPrimaryUrl") as string) || null,
      ctaSecondaryText: (formData.get("ctaSecondaryText") as string) || null,
      ctaSecondaryUrl: (formData.get("ctaSecondaryUrl") as string) || null,
      backgroundImage: (formData.get("backgroundImage") as string) || null,
      overlayGradient: (formData.get("overlayGradient") as string) || "from-black/70 via-black/50 to-transparent",
      overlayDirection: (formData.get("overlayDirection") as string) || "to-r",
      overlayOpacity: parseInt(formData.get("overlayOpacity") as string) || 70,
      gradientFrom: (formData.get("gradientFrom") as string) || null,
      gradientTo: (formData.get("gradientTo") as string) || null,
      minHeight: (formData.get("minHeight") as string) || "70vh",
      textAlignment: (formData.get("textAlignment") as string) || "left",
      textColor: (formData.get("textColor") as string) || null,
      showScrollIndicator: formData.get("showScrollIndicator") === "true",
      isActive: formData.get("isActive") !== "false",
    };

    await prisma.pageHero.upsert({
      where: { pageSlug },
      create: data,
      update: data,
    });

    redirect("/admin/heroes/");
  }

  return (
    <div>
      <Link
        href="/admin/heroes/"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Heroes
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Edit Hero: {hero.pageName}
          </h1>
          <p className="text-slate-500 mt-1">
            /{pageSlug === "homepage" ? "" : pageSlug + "/"}
          </p>
        </div>
      </div>

      <HeroEditorForm hero={hero} action={saveHero} />
    </div>
  );
}
