import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import GalleryUploadField from "@/components/admin/GalleryUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import ListEditor from "@/components/admin/ListEditor";
import SlugTitleFields from "@/components/admin/SlugTitleFields";
import MetaSeoFields from "@/components/admin/MetaSeoFields";
import FormShell, { type FormShellState } from "@/components/admin/FormShell";
import { disposeFormDeletions } from "@/lib/admin-media";

async function getDayTrip(id: string) {
  if (id === "new") return null;

  const dayTrip = await prisma.dayTrip.findUnique({
    where: { id },
  });

  return dayTrip;
}

async function saveDayTrip(_prev: FormShellState, formData: FormData): Promise<FormShellState> {
  "use server";

  try {
    const session = await auth();
    if (!session) return { error: "You are not signed in. Please log in and try again." };

    const id = formData.get("id") as string | null;
    const slug = (formData.get("slug") as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  // Parse array fields
  const highlightsStr = formData.get("highlights") as string;
  const highlights = highlightsStr ? highlightsStr.split("\n").map(h => h.trim()).filter(Boolean) : [];

  const inclusionsStr = formData.get("inclusions") as string;
  const inclusions = inclusionsStr ? inclusionsStr.split("\n").map(i => i.trim()).filter(Boolean) : [];

  const exclusionsStr = formData.get("exclusions") as string;
  const exclusions = exclusionsStr ? exclusionsStr.split("\n").map(e => e.trim()).filter(Boolean) : [];

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

  const priceFromStr = formData.get("priceFrom") as string;

  const data = {
    slug,
    title: formData.get("title") as string,
    metaTitle: formData.get("metaTitle") as string || null,
    metaDescription: formData.get("metaDescription") as string || null,
    destination: formData.get("destination") as string,
    description: formData.get("description") as string,
    highlights,
    inclusions,
    exclusions,
    gallery,
    galleryAlts,
    featuredImage: formData.get("featuredImage") as string || null,
    priceFrom: priceFromStr ? parseFloat(priceFromStr) : null,
    isActive: formData.get("isActive") === "on",
  };

  if (id && id !== "new") {
    await prisma.dayTrip.update({
      where: { id },
      data,
    });
  } else {
    await prisma.dayTrip.create({
      data,
    });
  }

    await disposeFormDeletions(formData, ["featuredImage", "gallery"]);
  } catch (e) {
    console.error("Save day-trip failed:", e);
    return {
      error:
        e instanceof Error
          ? e.message
          : "Save failed. Please check the form and try again.",
    };
  }

  redirect("/admin/day-trips");
}

async function deleteDayTrip(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  await prisma.dayTrip.delete({ where: { id } });
  redirect("/admin/day-trips");
}

export default async function DayTripEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dayTrip = await getDayTrip(id);

  if (id !== "new" && !dayTrip) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/day-trips"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "Add Day Trip" : "Edit Day Trip"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new day trip experience" : dayTrip?.title}
            </p>
          </div>
        </div>
        {!isNew && dayTrip?.isActive && (
          <a
            href={`/tanzania-day-tours/${dayTrip.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Day Trip
          </a>
        )}
      </div>

      <FormShell action={saveDayTrip} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SlugTitleFields
                  defaultTitle={dayTrip?.title || ""}
                  defaultSlug={dayTrip?.slug || ""}
                  titleLabel="Title"
                  titlePlaceholder="e.g., Materuni Waterfalls & Coffee Tour"
                  slugPlaceholder="materuni-waterfalls-coffee-tour"
                  slugPrefix="/tanzania-day-tours/"
                />

                <div>
                  <label htmlFor="field-destination" className="block text-sm font-medium text-slate-700 mb-2">
                    Destination *
                  </label>
                  <input
                    id="field-destination"
                    type="text"
                    name="destination"
                    required
                    defaultValue={dayTrip?.destination || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Arusha Region"
                  />
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
                    defaultValue={dayTrip?.priceFrom?.toString() || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 150"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="field-description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="field-description"
                  name="description"
                  required
                  rows={6}
                  defaultValue={dayTrip?.description || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Describe this day trip..."
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Highlights
              </h2>
              <ListEditor
                name="highlights"
                defaultValue={dayTrip?.highlights || []}
                placeholder="Add a highlight and press Enter"
              />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Inclusions
                </h2>
                <ListEditor
                  name="inclusions"
                  defaultValue={dayTrip?.inclusions || []}
                  placeholder="Add inclusion and press Enter"
                  variant="success"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Exclusions
                </h2>
                <ListEditor
                  name="exclusions"
                  defaultValue={dayTrip?.exclusions || []}
                  placeholder="Add exclusion and press Enter"
                  variant="danger"
                />
              </div>
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
                  defaultChecked={dayTrip?.isActive ?? true}
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
                defaultValue={dayTrip?.featuredImage}
                folder="daytrips"
                label="Featured Image"
                helpText="Main image shown in listings"
                deleteFromR2
                deferDeletion
              />

              <GalleryUploadField
                name="gallery"
                defaultValue={dayTrip?.gallery || []}
                folder="daytrips"
                label="Photo Gallery"
                helpText="Additional photos. Add alt text under each image for SEO + accessibility."
                maxImages={10}
                deleteFromR2
                deferDeletion
                altsName="galleryAlts"
                defaultAlts={(dayTrip?.galleryAlts as Record<string, { alt: string; caption?: string }> | null) ?? undefined}
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">SEO</h3>
              <MetaSeoFields
                defaultMetaTitle={dayTrip?.metaTitle || ""}
                defaultMetaDescription={dayTrip?.metaDescription || ""}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/day-trips"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Day Trip" : "Save Changes"}
          </button>
        </div>
      </FormShell>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deleteDayTrip}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton message="Are you sure you want to delete this day trip?" label="Delete Day Trip" />
          </form>
        </div>
      )}
    </div>
  );
}
