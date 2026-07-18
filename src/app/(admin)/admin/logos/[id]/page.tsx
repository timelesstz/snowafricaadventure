import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import FormShell, { type FormShellState } from "@/components/admin/FormShell";
import { disposeFormDeletions } from "@/lib/admin-media";

const PLACEMENTS = [
  {
    value: "homepage",
    label: "Homepage",
    help: "Accreditation strip near the top of the homepage",
  },
  {
    value: "about",
    label: "About Us",
    help: "“Our Commitment” and “Trusted by Industry Leaders” sections",
  },
  { value: "footer", label: "Footer", help: "“Accredited & Trusted” row, site-wide" },
];

async function getLogo(id: string) {
  if (id === "new") return null;
  return prisma.logo.findUnique({ where: { id } });
}

async function saveLogo(_prev: FormShellState, formData: FormData): Promise<FormShellState> {
  "use server";

  try {
    const session = await auth();
    if (!session) return { error: "You are not signed in. Please log in and try again." };

    const id = formData.get("id") as string | null;
    const name = (formData.get("name") as string)?.trim();
    if (!name) return { error: "Name is required — it is also the image's alt text." };

    const image = (formData.get("image") as string) || "";
    if (!image) return { error: "Please upload a logo image." };

    const rawSlug = ((formData.get("slug") as string) || name).toLowerCase();
    const slug = rawSlug
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!slug) return { error: "Could not build a slug from that name. Enter one manually." };

    const clash = await prisma.logo.findUnique({ where: { slug } });
    if (clash && clash.id !== id) {
      return { error: `Another logo already uses the slug "${slug}". Choose a different one.` };
    }

    const placements = PLACEMENTS.filter((p) => formData.get(`placement.${p.value}`) === "on").map(
      (p) => p.value
    );

    const orderStr = formData.get("order") as string;

    const data = {
      slug,
      name,
      image,
      linkUrl: (formData.get("linkUrl") as string) || null,
      placements,
      order: orderStr ? parseInt(orderStr, 10) || 0 : 0,
      isActive: formData.get("isActive") === "on",
    };

    if (id && id !== "new") {
      await prisma.logo.update({ where: { id }, data });
    } else {
      await prisma.logo.create({ data });
    }

    await disposeFormDeletions(formData, ["image"]);
  } catch (e) {
    console.error("Save logo failed:", e);
    return {
      error: e instanceof Error ? e.message : "Save failed. Please check the form and try again.",
    };
  }

  redirect("/admin/logos");
}

async function deleteLogo(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.logo.delete({ where: { id: formData.get("id") as string } });
  redirect("/admin/logos");
}

export default async function LogoEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const logo = await getLogo(id);

  if (id !== "new" && !logo) notFound();

  const isNew = id === "new";
  const current = logo?.placements ?? ["homepage", "about", "footer"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/logos" className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? "Add Logo" : "Edit Logo"}</h1>
          <p className="text-slate-600 mt-1">
            {isNew ? "Add an accreditation or partner logo" : logo?.name}
          </p>
        </div>
      </div>

      <FormShell action={saveLogo} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Logo Details
              </h2>

              <div>
                <label
                  htmlFor="field-name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Name *
                </label>
                <input
                  id="field-name"
                  type="text"
                  name="name"
                  required
                  defaultValue={logo?.name || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="e.g., KPAP Certified Partner"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Doubles as the image alt text, so name the organisation this logo actually
                  belongs to.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="field-slug"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Slug
                  </label>
                  <input
                    id="field-slug"
                    type="text"
                    name="slug"
                    defaultValue={logo?.slug || ""}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="auto-generated from name"
                  />
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
                    defaultValue={logo?.order ?? 0}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Lower numbers appear first.</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="field-linkUrl"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Link URL
                </label>
                <input
                  id="field-linkUrl"
                  type="url"
                  name="linkUrl"
                  defaultValue={logo?.linkUrl || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="https://tatotz.org/"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Optional. If set, the logo links to the organisation&apos;s site.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
                Where it appears
              </h2>
              <p className="text-sm text-slate-600">
                Tick every surface this logo should show on. One logo can appear in several
                places — you only upload it once.
              </p>
              {PLACEMENTS.map((p) => (
                <label key={p.value} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`placement.${p.value}`}
                    defaultChecked={current.includes(p.value)}
                    className="w-5 h-5 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>
                    <span className="text-slate-700 font-medium">{p.label}</span>
                    <span className="block text-xs text-slate-500">{p.help}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Status</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={logo?.isActive ?? true}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Active (visible on site)</span>
              </label>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Image</h3>
              <ImageUploadField
                name="image"
                defaultValue={logo?.image}
                folder="logos"
                label="Logo Image"
                helpText="Transparent PNG or SVG works best. It is shown white-on-dark in the footer and homepage strip."
                deleteFromR2
                deferDeletion
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/logos" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Logo" : "Save Changes"}
          </button>
        </div>
      </FormShell>

      {!isNew && (
        <form action={deleteLogo}>
          <input type="hidden" name="id" value={id} />
          <ConfirmDeleteButton message="Are you sure you want to delete this logo?" label="Delete Logo" />
        </form>
      )}
    </div>
  );
}
