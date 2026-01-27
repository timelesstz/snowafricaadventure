import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import GalleryUploadField from "@/components/admin/GalleryUploadField";

async function getRoute(id: string) {
  if (id === "new") return null;

  const route = await prisma.trekkingRoute.findUnique({
    where: { id },
  });

  return route;
}

async function saveRoute(formData: FormData) {
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

  // Parse FAQs JSON
  const faqsStr = formData.get("faqs") as string;
  let faqs = null;
  if (faqsStr) {
    try {
      faqs = JSON.parse(faqsStr);
    } catch {
      faqs = null;
    }
  }

  const successRateStr = formData.get("successRate") as string;

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
    title: formData.get("title") as string,
    metaTitle: formData.get("metaTitle") as string || null,
    metaDescription: formData.get("metaDescription") as string || null,
    duration: formData.get("duration") as string,
    durationDays: parseInt(formData.get("durationDays") as string) || 7,
    maxPeople: parseInt(formData.get("maxPeople") as string) || null,
    startPoint: formData.get("startPoint") as string || null,
    endPoint: formData.get("endPoint") as string || null,
    ageRange: formData.get("ageRange") as string || null,
    physicalRating: formData.get("physicalRating") as string || null,
    successRate: successRateStr ? parseInt(successRateStr) : null,
    overview: formData.get("overview") as string,
    highlights,
    itinerary,
    routeMapImage: formData.get("routeMapImage") as string || null,
    inclusions,
    exclusions,
    faqs,
    featuredImage: formData.get("featuredImage") as string || null,
    gallery,
    isActive: formData.get("isActive") === "on",
  };

  if (id && id !== "new") {
    await prisma.trekkingRoute.update({
      where: { id },
      data,
    });
  } else {
    await prisma.trekkingRoute.create({
      data,
    });
  }

  redirect("/admin/routes");
}

async function deleteRoute(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  // Check for departures
  const departureCount = await prisma.groupDeparture.count({
    where: { routeId: id },
  });

  if (departureCount > 0) {
    throw new Error("Cannot delete route with existing departures");
  }

  await prisma.trekkingRoute.delete({ where: { id } });
  redirect("/admin/routes");
}

export default async function RouteEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const route = await getRoute(id);

  if (id !== "new" && !route) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/routes"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "Add Route" : "Edit Route"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new Kilimanjaro route" : route?.title}
            </p>
          </div>
        </div>
        {!isNew && route?.isActive && (
          <a
            href={`/trekking/${route.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Route
          </a>
        )}
      </div>

      <form action={saveRoute} className="space-y-6">
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
                    Route Name *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={route?.title || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Lemosho Route"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">/trekking/</span>
                    <input
                      type="text"
                      name="slug"
                      required
                      defaultValue={route?.slug || ""}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="lemosho-route"
                    />
                    <span className="text-slate-500">/</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    defaultValue={route?.duration || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 8 Days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    name="durationDays"
                    required
                    defaultValue={route?.durationDays || 7}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Physical Rating
                  </label>
                  <select
                    name="physicalRating"
                    defaultValue={route?.physicalRating || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select difficulty</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Difficult">Difficult</option>
                    <option value="Very Difficult">Very Difficult</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Success Rate (%)
                  </label>
                  <input
                    type="number"
                    name="successRate"
                    min="0"
                    max="100"
                    defaultValue={route?.successRate || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 95"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Point
                  </label>
                  <input
                    type="text"
                    name="startPoint"
                    defaultValue={route?.startPoint || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Londorossi Gate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Point
                  </label>
                  <input
                    type="text"
                    name="endPoint"
                    defaultValue={route?.endPoint || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Mweka Gate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Max Group Size
                  </label>
                  <input
                    type="number"
                    name="maxPeople"
                    defaultValue={route?.maxPeople || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Age Range
                  </label>
                  <input
                    type="text"
                    name="ageRange"
                    defaultValue={route?.ageRange || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 12 - 80+"
                  />
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
                  defaultValue={route?.overview || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Describe this route..."
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Highlights
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  One highlight per line
                </label>
                <textarea
                  name="highlights"
                  rows={6}
                  defaultValue={route?.highlights?.join("\n") || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  placeholder="Best acclimatization profile&#10;Scenic western approach&#10;Low traffic route"
                />
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What&apos;s Included (one per line)
                  </label>
                  <textarea
                    name="inclusions"
                    rows={8}
                    defaultValue={route?.inclusions?.join("\n") || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                    placeholder="Professional guides&#10;All park fees&#10;Quality camping equipment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What&apos;s Not Included (one per line)
                  </label>
                  <textarea
                    name="exclusions"
                    rows={8}
                    defaultValue={route?.exclusions?.join("\n") || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                    placeholder="International flights&#10;Travel insurance&#10;Tips for crew"
                  />
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Itinerary (JSON)
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter itinerary as JSON array
                </label>
                <textarea
                  name="itinerary"
                  rows={12}
                  defaultValue={route?.itinerary ? JSON.stringify(route.itinerary, null, 2) : ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  placeholder={`[
  {
    "day": 1,
    "title": "Arrival Day",
    "description": "...",
    "elevation": "1400m",
    "distance": "N/A"
  }
]`}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Format: Array of objects with day, title, description, elevation, distance, etc.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                FAQs (JSON)
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter FAQs as JSON array
                </label>
                <textarea
                  name="faqs"
                  rows={8}
                  defaultValue={route?.faqs ? JSON.stringify(route.faqs, null, 2) : ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  placeholder={`[
  {
    "question": "How difficult is this route?",
    "answer": "..."
  }
]`}
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
                  defaultChecked={route?.isActive ?? true}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Active (visible on site)</span>
              </label>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Images</h3>

              <ImageUploadField
                name="featuredImage"
                defaultValue={route?.featuredImage}
                folder="routes"
                label="Featured Image"
                helpText="Main image shown in listings and hero sections"
              />

              <ImageUploadField
                name="routeMapImage"
                defaultValue={route?.routeMapImage}
                folder="routes"
                label="Route Map Image"
                helpText="Map showing the trekking route"
              />

              <GalleryUploadField
                name="gallery"
                defaultValue={route?.gallery || []}
                folder="routes"
                label="Photo Gallery"
                helpText="Additional photos for the route page"
                maxImages={12}
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
                  defaultValue={route?.metaTitle || ""}
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
                  defaultValue={route?.metaDescription || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {!isNew && (
              <form action={deleteRoute}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  onClick={(e) => {
                    if (!confirm("Are you sure you want to delete this route? This cannot be undone.")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Route
                </button>
              </form>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/routes"
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              {isNew ? "Create Route" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
