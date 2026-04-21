import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SafariItineraryEditor from "@/components/admin/SafariItineraryEditor";
import ListEditor from "@/components/admin/ListEditor";
import SlugTitleFields from "@/components/admin/SlugTitleFields";
import MetaSeoFields from "@/components/admin/MetaSeoFields";
import LinkedImageEditor from "@/components/admin/LinkedImageEditor";
import PricingTiersEditor from "@/components/admin/PricingTiersEditor";
import FormShell, { type FormShellState } from "@/components/admin/FormShell";
import { disposeFormDeletions } from "@/lib/admin-media";

async function getSafari(id: string) {
  if (id === "new") return null;

  const safari = await prisma.safariPackage.findUnique({
    where: { id },
    include: {
      destinations: {
        include: {
          destination: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return safari;
}

async function getDestinations() {
  return prisma.destination.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
}

async function saveSafari(_prev: FormShellState, formData: FormData): Promise<FormShellState> {
  "use server";

  let id: string | null = null;
  try {
    const session = await auth();
    if (!session) return { error: "You are not signed in. Please log in and try again." };

    id = formData.get("id") as string | null;
    const slug = (formData.get("slug") as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  // Parse array fields
  const highlightsStr = formData.get("highlights") as string;
  const highlights = highlightsStr ? highlightsStr.split("\n").map(h => h.trim()).filter(Boolean) : [];

  const inclusionsStr = formData.get("inclusions") as string;
  const inclusions = inclusionsStr ? inclusionsStr.split("\n").map(i => i.trim()).filter(Boolean) : [];

  const exclusionsStr = formData.get("exclusions") as string;
  const exclusions = exclusionsStr ? exclusionsStr.split("\n").map(e => e.trim()).filter(Boolean) : [];

  // Parse itinerary JSON
  const itineraryStr = formData.get("itinerary") as string;
  let itinerary = null;
  if (itineraryStr) {
    try {
      itinerary = JSON.parse(itineraryStr);
    } catch {
      itinerary = null;
    }
  }

  // Parse destinations
  const destinationIds = formData.getAll("destinations") as string[];

  // Parse gallery JSON
  const galleryStr = formData.get("gallery") as string;
  let gallery: string[] = [];
  if (galleryStr) {
    try {
      gallery = JSON.parse(galleryStr);
    } catch {
      gallery = [];
    }
  }

  // Parse pricing tiers JSON
  const pricingTiersStr = formData.get("pricingTiers") as string;
  let pricingTiers = null;
  if (pricingTiersStr) {
    try {
      pricingTiers = JSON.parse(pricingTiersStr);
    } catch {
      pricingTiers = null;
    }
  }

  // Parse gallery alts JSON
  const galleryAltsStr = formData.get("galleryAlts") as string;
  let galleryAlts = null;
  if (galleryAltsStr) {
    try {
      const parsed = JSON.parse(galleryAltsStr);
      if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
        galleryAlts = parsed;
      }
    } catch {
      galleryAlts = null;
    }
  }

  const priceStr = formData.get("priceFrom") as string;
  const ratingStr = formData.get("rating") as string;

  const hasItinerary = Array.isArray(itinerary) && itinerary.length > 0;

  const formDurationDays = parseInt(formData.get("durationDays") as string);
  const formDuration = (formData.get("duration") as string) || "";
  const formParksCount = parseInt(formData.get("parksCount") as string);
  const formGameDrives = parseInt(formData.get("gameDrives") as string);

  let durationDays = Number.isFinite(formDurationDays) && formDurationDays > 0 ? formDurationDays : 1;
  let duration = formDuration;
  let parksCount = Number.isFinite(formParksCount) && formParksCount >= 0 ? formParksCount : 0;
  let gameDrives = Number.isFinite(formGameDrives) && formGameDrives >= 0 ? formGameDrives : 0;

  if (hasItinerary) {
    durationDays = itinerary.length;
    const nights = durationDays - 1;
    duration = `${durationDays} Day${durationDays !== 1 ? "s" : ""} ${nights} Night${nights !== 1 ? "s" : ""}`;

    const locations = new Set<string>();
    for (const day of itinerary) {
      if (day.location && typeof day.location === "string" && day.location.trim()) {
        locations.add(day.location.trim());
      }
    }
    if (locations.size > 0) {
      parksCount = locations.size;
    }

    let driveCount = 0;
    for (const day of itinerary) {
      const text = `${day.title || ""} ${day.description || ""}`.toLowerCase();
      if (text.includes("game drive") || text.includes("safari drive") || text.includes("morning drive") || text.includes("afternoon drive")) {
        driveCount++;
      }
    }
    if (driveCount > 0) {
      gameDrives = driveCount;
    }
  }

  const data = {
    slug,
    title: formData.get("title") as string,
    metaTitle: formData.get("metaTitle") as string || null,
    metaDescription: formData.get("metaDescription") as string || null,
    duration,
    durationDays,
    type: formData.get("type") as string,
    overview: formData.get("overview") as string,
    highlights,
    itinerary,
    inclusions,
    exclusions,
    featuredImage: formData.get("featuredImage") as string || null,
    gallery,
    galleryAlts,
    priceFrom: priceStr ? parseFloat(priceStr) : null,
    pricingTiers,
    gameDrives,
    parksCount,
    rating: ratingStr ? parseFloat(ratingStr) : 4.9,
    isActive: formData.get("isActive") === "on",
  };

  if (id && id !== "new") {
    const safariId: string = id;
    // Update safari
    await prisma.safariPackage.update({
      where: { id: safariId },
      data,
    });

    // Update destinations safely using a transaction
    await prisma.$transaction(async (tx) => {
      // Get existing destinations
      const existing = await tx.safariDestination.findMany({
        where: { safariId },
        select: { id: true, destinationId: true },
      });

      const existingDestIds = new Set(existing.map((e) => e.destinationId));
      const newDestIds = new Set(destinationIds);

      // Delete destinations that are no longer selected
      const toDelete = existing.filter((e) => !newDestIds.has(e.destinationId));
      if (toDelete.length > 0) {
        await tx.safariDestination.deleteMany({
          where: { id: { in: toDelete.map((d) => d.id) } },
        });
      }

      // Create new destinations that don't exist yet
      const toCreate = destinationIds.filter((destId) => !existingDestIds.has(destId));
      if (toCreate.length > 0) {
        await tx.safariDestination.createMany({
          data: toCreate.map((destId) => ({
            safariId,
            destinationId: destId,
            order: destinationIds.indexOf(destId),
          })),
        });
      }

      // Update order for existing destinations that remain
      for (const destId of destinationIds) {
        if (existingDestIds.has(destId)) {
          const record = existing.find((e) => e.destinationId === destId);
          if (record) {
            await tx.safariDestination.update({
              where: { id: record.id },
              data: { order: destinationIds.indexOf(destId) },
            });
          }
        }
      }
    });
  } else {
    // Create safari
    const newSafari = await prisma.safariPackage.create({
      data,
    });

    // Add destinations
    if (destinationIds.length > 0) {
      await prisma.safariDestination.createMany({
        data: destinationIds.map((destId, index) => ({
          safariId: newSafari.id,
          destinationId: destId,
          order: index,
        })),
      });
    }
  }

    await disposeFormDeletions(formData, ["featuredImage", "gallery"]);
  } catch (e) {
    console.error("Save safari failed:", e);
    return {
      error:
        e instanceof Error
          ? e.message
          : "Save failed. Please check the form and try again.",
    };
  }

  redirect("/admin/safaris");
}

async function deleteSafari(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.safariPackage.delete({ where: { id } });
  redirect("/admin/safaris");
}

export default async function SafariEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [safari, destinations] = await Promise.all([
    getSafari(id),
    getDestinations(),
  ]);

  if (id !== "new" && !safari) {
    notFound();
  }

  const isNew = id === "new";
  const selectedDestinations = safari?.destinations.map(d => d.destinationId) || [];
  const hasItinerary = Array.isArray(safari?.itinerary) && safari.itinerary.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/safaris"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "Add Safari Package" : "Edit Safari Package"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new safari package" : safari?.title}
            </p>
          </div>
        </div>
        {!isNew && safari && (
          <a
            href={`/tanzania-safaris/${safari.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            {safari.isActive ? "View Safari" : "Preview Draft"}
          </a>
        )}
      </div>

      <FormShell action={saveSafari} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        {/* Images — full-width, promoted to the top of the form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
            Images
          </h2>

          <LinkedImageEditor
            defaultFeatured={safari?.featuredImage}
            defaultGallery={safari?.gallery || []}
            defaultGalleryAlts={(safari?.galleryAlts as Record<string, { alt: string; caption?: string }> | null) ?? undefined}
            galleryAltsName="galleryAlts"
            folder="safaris"
            featuredHelpText="Shown as the hero on the safari detail page and as the thumbnail in listings. 16:9 landscape recommended."
            galleryHelpText="Additional photos for the safari page. Drag to reorder. Hover a thumbnail to set it as featured. Add alt text under each image for SEO + accessibility."
            maxGalleryImages={12}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SlugTitleFields
                  defaultTitle={safari?.title || ""}
                  defaultSlug={safari?.slug || ""}
                  titleLabel="Safari Name"
                  titlePlaceholder="e.g., 6 Days Serengeti & Ngorongoro Safari"
                  slugPlaceholder="6-days-serengeti-ngorongoro"
                  slugPrefix="/tanzania-safaris/"
                />

                <div>
                  <label htmlFor="field-duration" className="block text-sm font-medium text-slate-700 mb-2">
                    Duration
                  </label>
                  <input
                    id="field-duration"
                    type="text"
                    name="duration"
                    defaultValue={safari?.duration || ""}
                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${hasItinerary ? "bg-slate-50" : ""}`}
                    placeholder={hasItinerary ? "Auto-calculated from itinerary" : "e.g., 6 Days 5 Nights"}
                    readOnly={hasItinerary}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {hasItinerary ? "Auto-calculated from itinerary days" : "Will be auto-calculated once you add itinerary days"}
                  </p>
                </div>

                <div>
                  <label htmlFor="field-durationDays" className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (Days)
                  </label>
                  <input
                    id="field-durationDays"
                    type="number"
                    name="durationDays"
                    defaultValue={safari?.durationDays || 1}
                    min="1"
                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${hasItinerary ? "bg-slate-50" : ""}`}
                    readOnly={hasItinerary}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {hasItinerary ? "Auto-calculated from itinerary" : "Will be auto-calculated once you add itinerary days"}
                  </p>
                </div>

                <div>
                  <label htmlFor="field-type" className="block text-sm font-medium text-slate-700 mb-2">
                    Safari Type *
                  </label>
                  <select
                    id="field-type"
                    name="type"
                    required
                    defaultValue={safari?.type || "Mid-range"}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Mid-range">Mid-range</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="field-priceFrom" className="block text-sm font-medium text-slate-700 mb-2">
                    Price From (USD)
                  </label>
                  <input
                    id="field-priceFrom"
                    type="number"
                    name="priceFrom"
                    step="0.01"
                    defaultValue={safari?.priceFrom ? Number(safari.priceFrom) : ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 2500"
                  />
                </div>

                <div>
                  <label htmlFor="field-gameDrives" className="block text-sm font-medium text-slate-700 mb-2">
                    Game Drives
                  </label>
                  <input
                    id="field-gameDrives"
                    type="number"
                    name="gameDrives"
                    min="0"
                    defaultValue={safari?.gameDrives ?? (hasItinerary ? 6 : 0)}
                    placeholder={hasItinerary ? "Auto-calculated" : "e.g., 6"}
                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${hasItinerary ? "bg-slate-50" : ""}`}
                    readOnly={hasItinerary}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {hasItinerary ? "Auto-counted from itinerary days mentioning \"game drive\"" : "Will be auto-counted once you add itinerary days"}
                  </p>
                </div>

                <div>
                  <label htmlFor="field-parksCount" className="block text-sm font-medium text-slate-700 mb-2">
                    Parks Count
                  </label>
                  <input
                    id="field-parksCount"
                    type="number"
                    name="parksCount"
                    min="0"
                    defaultValue={safari?.parksCount ?? (hasItinerary ? 3 : 0)}
                    placeholder={hasItinerary ? "Auto-calculated" : "e.g., 3"}
                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none ${hasItinerary ? "bg-slate-50" : ""}`}
                    readOnly={hasItinerary}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {hasItinerary ? "Auto-counted from unique locations in itinerary" : "Will be auto-counted once you add itinerary days"}
                  </p>
                </div>

                <div>
                  <label htmlFor="field-rating" className="block text-sm font-medium text-slate-700 mb-2">
                    Rating
                  </label>
                  <input
                    id="field-rating"
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={safari?.rating ? Number(safari.rating) : 4.9}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 4.9"
                  />
                  <p className="text-xs text-slate-500 mt-1">Rating out of 5.0</p>
                </div>
              </div>

              <div>
                <label htmlFor="field-overview" className="block text-sm font-medium text-slate-700 mb-2">
                  Overview *
                </label>
                <textarea
                  id="field-overview"
                  name="overview"
                  required
                  rows={5}
                  defaultValue={safari?.overview || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Describe this safari package..."
                />
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Destinations
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {destinations.map((dest) => (
                  <label
                    key={dest.id}
                    className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      name="destinations"
                      value={dest.id}
                      defaultChecked={selectedDestinations.includes(dest.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-700">{dest.name}</span>
                  </label>
                ))}
              </div>
              {destinations.length === 0 && (
                <p className="text-sm text-slate-500">
                  No destinations available. <Link href="/admin/destinations/new" className="text-amber-600 hover:underline">Add destinations</Link> first.
                </p>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Highlights
              </h2>
              <ListEditor
                name="highlights"
                defaultValue={safari?.highlights || []}
                placeholder="Add a highlight and press Enter"
              />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    What&apos;s Included
                  </label>
                  <ListEditor
                    name="inclusions"
                    defaultValue={safari?.inclusions || []}
                    placeholder="Add inclusion and press Enter"
                    variant="success"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    What&apos;s Not Included
                  </label>
                  <ListEditor
                    name="exclusions"
                    defaultValue={safari?.exclusions || []}
                    placeholder="Add exclusion and press Enter"
                    variant="danger"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Group Pricing Tiers
              </h2>
              <p className="text-sm text-slate-500">
                Per-person pricing by group size. Shown as the public pricing table on the safari page. Leave empty to fall back to the single &ldquo;Price From&rdquo; value.
              </p>
              <PricingTiersEditor
                name="pricingTiers"
                defaultValue={safari?.pricingTiers as { groupSize: string; description: string; price: number; savings?: number; featured?: boolean }[] | null}
                defaultTiers={[
                  { groupSize: "1 Person", description: "Private safari experience", price: 4500 },
                  { groupSize: "2-4 People", description: "Small group adventure", price: 3500, savings: 1000, featured: true },
                  { groupSize: "5-7 People", description: "Medium group savings", price: 3200, savings: 1300 },
                  { groupSize: "8-10 People", description: "Large group discount", price: 2950, savings: 1550 },
                  { groupSize: "11 & Above", description: "Best value for groups", price: 2750, savings: 1750 },
                ]}
              />
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Itinerary
              </h2>
              <SafariItineraryEditor
                name="itinerary"
                defaultValue={safari?.itinerary as any[] | null}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Status</h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={safari?.isActive ?? true}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Active (visible on site)</span>
              </label>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">SEO</h3>
              <MetaSeoFields
                defaultMetaTitle={safari?.metaTitle || ""}
                defaultMetaDescription={safari?.metaDescription || ""}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/safaris"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Safari" : "Save Changes"}
          </button>
        </div>
      </FormShell>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deleteSafari}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton message="Are you sure you want to delete this safari?" label="Delete Safari" />
          </form>
        </div>
      )}
    </div>
  );
}
