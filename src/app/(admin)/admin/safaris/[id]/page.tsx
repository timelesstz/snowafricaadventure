import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import GalleryUploadField from "@/components/admin/GalleryUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SafariItineraryEditor from "@/components/admin/SafariItineraryEditor";
import ListEditor from "@/components/admin/ListEditor";

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

async function saveSafari(formData: FormData) {
  "use server";

  const id = formData.get("id") as string | null;
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

  const priceStr = formData.get("priceFrom") as string;
  const ratingStr = formData.get("rating") as string;

  // Auto-compute stats from itinerary when available
  let durationDays = parseInt(formData.get("durationDays") as string) || 1;
  let duration = formData.get("duration") as string;
  let parksCount = 3;
  let gameDrives = 6;

  if (itinerary && Array.isArray(itinerary) && itinerary.length > 0) {
    durationDays = itinerary.length;
    const nights = durationDays - 1;
    duration = `${durationDays} Day${durationDays !== 1 ? "s" : ""} ${nights} Night${nights !== 1 ? "s" : ""}`;

    // Count unique parks/locations from itinerary
    const locations = new Set<string>();
    for (const day of itinerary) {
      if (day.location && typeof day.location === "string" && day.location.trim()) {
        locations.add(day.location.trim());
      }
    }
    if (locations.size > 0) {
      parksCount = locations.size;
    }

    // Count game drives from itinerary day titles/descriptions
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
    priceFrom: priceStr ? parseFloat(priceStr) : null,
    gameDrives,
    parksCount,
    rating: ratingStr ? parseFloat(ratingStr) : 4.9,
    isActive: formData.get("isActive") === "on",
  };

  if (id && id !== "new") {
    // Update safari
    await prisma.safariPackage.update({
      where: { id },
      data,
    });

    // Update destinations - delete existing and recreate
    await prisma.safariDestination.deleteMany({
      where: { safariId: id },
    });

    if (destinationIds.length > 0) {
      await prisma.safariDestination.createMany({
        data: destinationIds.map((destId, index) => ({
          safariId: id,
          destinationId: destId,
          order: index,
        })),
      });
    }
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

  redirect("/admin/safaris");
}

async function deleteSafari(formData: FormData) {
  "use server";

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
        {!isNew && safari?.isActive && (
          <a
            href={`/tanzania-safaris/${safari.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Safari
          </a>
        )}
      </div>

      <form action={saveSafari} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Safari Name *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={safari?.title || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 6 Days Serengeti & Ngorongoro Safari"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">/tanzania-safaris/</span>
                    <input
                      type="text"
                      name="slug"
                      required
                      defaultValue={safari?.slug || ""}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="6-days-serengeti-ngorongoro"
                    />
                    <span className="text-slate-500">/</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={safari?.duration || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-50"
                    placeholder="Auto-calculated from itinerary"
                    readOnly
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-calculated from itinerary days</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    name="durationDays"
                    defaultValue={safari?.durationDays || 1}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-50"
                    readOnly
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-calculated from itinerary</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Safari Type *
                  </label>
                  <select
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price From (USD)
                  </label>
                  <input
                    type="number"
                    name="priceFrom"
                    step="0.01"
                    defaultValue={safari?.priceFrom ? Number(safari.priceFrom) : ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 2500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Game Drives
                  </label>
                  <input
                    type="number"
                    name="gameDrives"
                    min="0"
                    defaultValue={safari?.gameDrives ?? 6}
                    placeholder="Auto-calculated"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-50"
                    readOnly
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-counted from itinerary days mentioning &quot;game drive&quot;</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parks Count
                  </label>
                  <input
                    type="number"
                    name="parksCount"
                    min="0"
                    defaultValue={safari?.parksCount ?? 3}
                    placeholder="Auto-calculated"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-50"
                    readOnly
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-counted from unique locations in itinerary</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rating
                  </label>
                  <input
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Overview *
                </label>
                <textarea
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

            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Images</h3>

              <ImageUploadField
                name="featuredImage"
                defaultValue={safari?.featuredImage}
                folder="safaris"
                label="Featured Image"
                helpText="Main image shown in listings and hero sections"
                deleteFromR2
              />

              <GalleryUploadField
                name="gallery"
                defaultValue={safari?.gallery || []}
                folder="safaris"
                label="Photo Gallery"
                helpText="Additional photos for the safari page"
                maxImages={12}
                deleteFromR2
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">SEO</h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  defaultValue={safari?.metaTitle || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows={3}
                  defaultValue={safari?.metaDescription || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
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
      </form>

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
