import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

async function getReview(id: string) {
  if (id === "new") return null;

  const review = await prisma.review.findUnique({
    where: { id },
  });

  return review;
}

async function saveReview(formData: FormData) {
  "use server";

  const id = formData.get("id") as string | null;
  const data = {
    source: formData.get("source") as string,
    authorName: formData.get("authorName") as string,
    authorImage: formData.get("authorImage") as string || null,
    rating: parseInt(formData.get("rating") as string),
    title: formData.get("title") as string || null,
    content: formData.get("content") as string,
    tripType: formData.get("tripType") as string || null,
    verified: formData.get("verified") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    publishedAt: new Date(formData.get("publishedAt") as string),
  };

  if (id && id !== "new") {
    await prisma.review.update({
      where: { id },
      data,
    });
  } else {
    await prisma.review.create({
      data,
    });
  }

  redirect("/admin/reviews");
}

async function deleteReview(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  await prisma.review.delete({ where: { id } });
  redirect("/admin/reviews");
}

export default async function ReviewEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getReview(id);

  if (id !== "new" && !review) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/reviews"
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isNew ? "Add Review" : "Edit Review"}
          </h1>
          <p className="text-slate-600 mt-1">
            {isNew ? "Add a new customer review" : "Update review details"}
          </p>
        </div>
      </div>

      <form action={saveReview} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">
            Review Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                name="authorName"
                required
                defaultValue={review?.authorName || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Source *
              </label>
              <select
                name="source"
                required
                defaultValue={review?.source || "manual"}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                <option value="tripadvisor">TripAdvisor</option>
                <option value="google">Google</option>
                <option value="manual">Manual Entry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating *
              </label>
              <select
                name="rating"
                required
                defaultValue={review?.rating || 5}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Trip Type
              </label>
              <select
                name="tripType"
                defaultValue={review?.tripType || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                <option value="">Select trip type</option>
                <option value="Kilimanjaro Trekking">Kilimanjaro Trekking</option>
                <option value="Safari">Safari</option>
                <option value="Safari + Kilimanjaro">Safari + Kilimanjaro</option>
                <option value="Zanzibar">Zanzibar</option>
                <option value="Safari + Zanzibar">Safari + Zanzibar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={review?.title || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Published Date *
              </label>
              <input
                type="date"
                name="publishedAt"
                required
                defaultValue={review?.publishedAt ? new Date(review.publishedAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Review Content *
            </label>
            <textarea
              name="content"
              required
              rows={5}
              defaultValue={review?.content || ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Author Image URL
            </label>
            <input
              type="url"
              name="authorImage"
              defaultValue={review?.authorImage || ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="verified"
                defaultChecked={review?.verified || false}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-700">Verified Review</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={review?.isFeatured || false}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-700">Featured on Homepage</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/reviews"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            {isNew ? "Create Review" : "Save Changes"}
          </button>
        </div>
      </form>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deleteReview}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton message="Are you sure you want to delete this review?" label="Delete Review" />
          </form>
        </div>
      )}
    </div>
  );
}
