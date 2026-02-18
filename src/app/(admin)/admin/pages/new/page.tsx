import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export default async function NewCmsPage() {
  await requireRole("EDITOR");

  async function createPage(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!title || !slug) return;

    const existing = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (existing) {
      // Redirect back if duplicate
      redirect("/admin/pages/new/?error=duplicate");
    }

    const page = await prisma.cmsPage.create({
      data: {
        title,
        slug,
        puckData: { content: [], root: {} },
        status: "DRAFT",
      },
    });

    redirect(`/admin/pages/${page.id}/`);
  }

  return (
    <div>
      <Link
        href="/admin/pages/"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Pages
      </Link>

      <div className="max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Create New Page</h1>

        <form action={createPage} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Page Title *
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="e.g., Tailor-Made Safari"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                URL Slug *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">/p/</span>
                <input
                  type="text"
                  name="slug"
                  required
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  placeholder="tailor-made-safari"
                />
                <span className="text-sm text-slate-500">/</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Lowercase letters, numbers, and hyphens only
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Create & Open Editor
            </button>
            <Link
              href="/admin/pages/"
              className="px-6 py-3 border border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
