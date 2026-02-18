import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import GalleryUploadField from "@/components/admin/GalleryUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import ListEditor from "@/components/admin/ListEditor";

async function getDestination(id: string) {
  if (id === "new") return null;

  const destination = await prisma.destination.findUnique({
    where: { id },
  });

  return destination;
}

async function saveDestination(formData: FormData) {
  "use server";

  const id = formData.get("id") as string | null;
  const slug = (formData.get("slug") as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  // Parse array fields
  const highlightsStr = formData.get("highlights") as string;
  const highlights = highlightsStr ? highlightsStr.split("\n").map(h => h.trim()).filter(Boolean) : [];

  const wildlifeStr = formData.get("wildlife") as string;
  const wildlife = wildlifeStr ? wildlifeStr.split("\n").map(w => w.trim()).filter(Boolean) : [];

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

  const data = {
    slug,
    name: formData.get("name") as string,
    metaTitle: formData.get("metaTitle") as string || null,
    metaDescription: formData.get("metaDescription") as string || null,
    circuit: formData.get("circuit") as string,
    description: formData.get("description") as string,
    highlights,
    wildlife,
    bestTime: formData.get("bestTime") as string || null,
    featuredImage: formData.get("featuredImage") as string || null,
    gallery,
    isActive: formData.get("isActive") === "on",
  };

  if (id && id !== "new") {
    await prisma.destination.update({
      where: { id },
      data,
    });
  } else {
    await prisma.destination.create({
      data,
    });
  }

  redirect("/admin/destinations");
}

async function deleteDestination(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  // Check for safari packages using this destination
  const safariCount = await prisma.safariDestination.count({
    where: { destinationId: id },
  });

  if (safariCount > 0) {
    throw new Error("Cannot delete destination with existing safari packages");
  }

  await prisma.destination.delete({ where: { id } });
  redirect("/admin/destinations");
}

export default async function DestinationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (id !== "new" && !destination) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/destinations"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "Add Destination" : "Edit Destination"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new safari destination" : destination?.name}
            </p>
          </div>
        </div>
        {!isNew && destination?.isActive && (
          <a
            href={`/tanzania-destinations/${destination.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Destination
          </a>
        )}
      </div>

      <form action={saveDestination} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={destination?.name || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Serengeti National Park"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">/tanzania-destinations/</span>
                    <input
                      type="text"
                      name="slug"
                      required
                      defaultValue={destination?.slug || ""}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="serengeti-national-park"
                    />
                    <span className="text-slate-500">/</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Safari Circuit *
                  </label>
                  <select
                    name="circuit"
                    required
                    defaultValue={destination?.circuit || "Northern"}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="Northern">Northern Circuit</option>
                    <option value="Southern">Southern Circuit</option>
                    <option value="Western">Western Circuit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    name="bestTime"
                    defaultValue={destination?.bestTime || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., June to October"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  defaultValue={destination?.description || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Describe this destination..."
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
                defaultValue={destination?.highlights || []}
                placeholder="Add a highlight and press Enter"
              />
            </div>

            {/* Wildlife */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Wildlife
              </h2>
              <ListEditor
                name="wildlife"
                defaultValue={destination?.wildlife || []}
                placeholder="Add animal/species and press Enter"
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
                  defaultChecked={destination?.isActive ?? true}
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
                defaultValue={destination?.featuredImage}
                folder="destinations"
                label="Featured Image"
                helpText="Main image shown in listings"
                deleteFromR2
              />

              <GalleryUploadField
                name="gallery"
                defaultValue={destination?.gallery || []}
                folder="destinations"
                label="Photo Gallery"
                helpText="Additional photos"
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
                  defaultValue={destination?.metaTitle || ""}
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
                  defaultValue={destination?.metaDescription || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/destinations"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Destination" : "Save Changes"}
          </button>
        </div>
      </form>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deleteDestination}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton message="Are you sure you want to delete this destination?" label="Delete Destination" />
          </form>
        </div>
      )}
    </div>
  );
}
