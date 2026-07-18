import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import ListEditor from "@/components/admin/ListEditor";
import FormShell, { type FormShellState } from "@/components/admin/FormShell";
import { disposeFormDeletions } from "@/lib/admin-media";

async function getGuide(id: string) {
  if (id === "new") return null;

  const guide = await prisma.guide.findUnique({
    where: { id },
  });

  return guide;
}

async function saveGuide(_prev: FormShellState, formData: FormData): Promise<FormShellState> {
  "use server";

  try {
    const session = await auth();
    if (!session) return { error: "You are not signed in. Please log in and try again." };

    const id = formData.get("id") as string | null;
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { error: "Name is required." };

    // Slug falls back to the name so the field can be left blank when adding.
    const rawSlug = ((formData.get("slug") as string) || name).toLowerCase();
    const slug = rawSlug
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!slug) return { error: "Could not build a URL slug from that name. Enter one manually." };

    // Reject a slug already taken by a different guide — the DB constraint would
    // otherwise surface as an opaque Prisma error.
    const clash = await prisma.guide.findUnique({ where: { slug } });
    if (clash && clash.id !== id) {
      return { error: `Another guide already uses the slug "${slug}". Choose a different one.` };
    }

    const parseList = (field: string) => {
      const raw = formData.get(field) as string;
      return raw ? raw.split("\n").map((v) => v.trim()).filter(Boolean) : [];
    };

    const orderStr = formData.get("order") as string;

    const data = {
      slug,
      name,
      role: formData.get("role") as string,
      image: (formData.get("image") as string) || null,
      bio: formData.get("bio") as string,
      quote: (formData.get("quote") as string) || null,
      experience: (formData.get("experience") as string) || null,
      summits: (formData.get("summits") as string) || null,
      specialty: (formData.get("specialty") as string) || null,
      specialties: parseList("specialties"),
      certifications: parseList("certifications"),
      languages: parseList("languages"),
      routes: parseList("routes"),
      isFounder: formData.get("isFounder") === "on",
      isMountainGuide: formData.get("isMountainGuide") === "on",
      isActive: formData.get("isActive") === "on",
      order: orderStr ? parseInt(orderStr, 10) || 0 : 0,
    };

    if (id && id !== "new") {
      await prisma.guide.update({
        where: { id },
        data,
      });
    } else {
      await prisma.guide.create({
        data,
      });
    }

    await disposeFormDeletions(formData, ["image"]);
  } catch (e) {
    console.error("Save guide failed:", e);
    return {
      error:
        e instanceof Error ? e.message : "Save failed. Please check the form and try again.",
    };
  }

  redirect("/admin/guides");
}

async function deleteGuide(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  await prisma.guide.delete({ where: { id } });
  redirect("/admin/guides");
}

export default async function GuideEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = await getGuide(id);

  if (id !== "new" && !guide) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/guides" className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "Add Guide" : "Edit Guide"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new team member profile" : guide?.name}
            </p>
          </div>
        </div>
        {!isNew && guide?.isActive && (
          <a
            href="/our-guides/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Guides Page
          </a>
        )}
      </div>

      <FormShell action={saveGuide} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="field-name"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    name="name"
                    required
                    defaultValue={guide?.name || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Florent Ipanga"
                  />
                </div>

                <div>
                  <label
                    htmlFor="field-role"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Role / Job Title *
                  </label>
                  <input
                    id="field-role"
                    type="text"
                    name="role"
                    required
                    defaultValue={guide?.role || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., Senior Mountain Guide"
                  />
                </div>

                <div>
                  <label
                    htmlFor="field-slug"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    URL Slug
                  </label>
                  <input
                    id="field-slug"
                    type="text"
                    name="slug"
                    defaultValue={guide?.slug || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="auto-generated from name"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Internal identifier. Leave blank to generate from the name.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="field-order"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Display Order
                  </label>
                  <input
                    id="field-order"
                    type="number"
                    name="order"
                    defaultValue={guide?.order ?? 0}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="0"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Lower numbers appear first on the guides page.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="field-experience"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Experience
                  </label>
                  <input
                    id="field-experience"
                    type="text"
                    name="experience"
                    defaultValue={guide?.experience || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 11+ years"
                  />
                </div>

                <div>
                  <label
                    htmlFor="field-summits"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Summits
                  </label>
                  <input
                    id="field-summits"
                    type="text"
                    name="summits"
                    defaultValue={guide?.summits || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="e.g., 120+"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="field-bio"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Biography *
                </label>
                <textarea
                  id="field-bio"
                  name="bio"
                  required
                  rows={7}
                  defaultValue={guide?.bio || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Tell visitors about this guide's background and expertise..."
                />
              </div>

              <div>
                <label
                  htmlFor="field-quote"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Personal Quote
                </label>
                <textarea
                  id="field-quote"
                  name="quote"
                  rows={3}
                  defaultValue={guide?.quote || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="A short quote shown on their profile card"
                />
              </div>

              <div>
                <label
                  htmlFor="field-specialty"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Specialty Summary
                </label>
                <input
                  id="field-specialty"
                  type="text"
                  name="specialty"
                  defaultValue={guide?.specialty || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="e.g., Acclimatization coaching, group morale management"
                />
                <p className="text-xs text-slate-500 mt-1">
                  One-line summary used on the Kilimanjaro guides page.
                </p>
              </div>
            </div>

            {/* Specialties & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Specialties
                </h2>
                <ListEditor
                  name="specialties"
                  defaultValue={guide?.specialties || []}
                  placeholder="Add a specialty and press Enter"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Certifications
                </h2>
                <ListEditor
                  name="certifications"
                  defaultValue={guide?.certifications || []}
                  placeholder="Add a certification and press Enter"
                  variant="success"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Routes
                </h2>
                <ListEditor
                  name="routes"
                  defaultValue={guide?.routes || []}
                  placeholder="Add a route and press Enter"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Languages
                </h2>
                <ListEditor
                  name="languages"
                  defaultValue={guide?.languages || []}
                  placeholder="Add a language and press Enter"
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
                  defaultChecked={guide?.isActive ?? true}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Active (visible on site)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFounder"
                  defaultChecked={guide?.isFounder ?? false}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Founder (featured at top)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isMountainGuide"
                  defaultChecked={guide?.isMountainGuide ?? true}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Kilimanjaro guide</span>
              </label>
              <p className="text-xs text-slate-500">
                Kilimanjaro guides also appear on the Our Kilimanjaro Guides page.
              </p>
            </div>

            {/* Photo */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Photo</h3>

              <ImageUploadField
                name="image"
                defaultValue={guide?.image}
                folder="guides"
                label="Guide Photo"
                helpText="Portrait photo shown on the guides page. Square or portrait crops work best."
                deleteFromR2
                deferDeletion
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/guides"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Guide" : "Save Changes"}
          </button>
        </div>
      </FormShell>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deleteGuide}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton
              message="Are you sure you want to delete this guide?"
              label="Delete Guide"
            />
          </form>
        </div>
      )}
    </div>
  );
}
