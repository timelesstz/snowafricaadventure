import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

async function getBlogPost(id: string) {
  if (id === "new") return null;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  return post;
}

async function savePost(formData: FormData) {
  "use server";

  const id = formData.get("id") as string | null;
  const slug = (formData.get("slug") as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  const isPublished = formData.get("isPublished") === "on";

  const data = {
    slug,
    title: formData.get("title") as string,
    metaTitle: formData.get("metaTitle") as string || null,
    metaDescription: formData.get("metaDescription") as string || null,
    excerpt: formData.get("excerpt") as string || null,
    content: formData.get("content") as string,
    featuredImage: formData.get("featuredImage") as string || null,
    author: formData.get("author") as string || null,
    isPublished,
    publishedAt: isPublished ? new Date() : null,
  };

  if (id && id !== "new") {
    await prisma.blogPost.update({
      where: { id },
      data,
    });
  } else {
    await prisma.blogPost.create({
      data,
    });
  }

  redirect("/admin/blog");
}

async function deletePost(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  await prisma.blogPost.delete({ where: { id } });
  redirect("/admin/blog");
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (id !== "new" && !post) {
    notFound();
  }

  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isNew ? "New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isNew ? "Create a new blog post" : "Update post details"}
            </p>
          </div>
        </div>
        {!isNew && post?.isPublished && (
          <a
            href={`/${post.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            View Post
          </a>
        )}
      </div>

      <form action={savePost} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={post?.title || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-lg"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">/</span>
                  <input
                    type="text"
                    name="slug"
                    required
                    defaultValue={post?.slug || ""}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="url-slug"
                  />
                  <span className="text-slate-500">/</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  This will be the URL of the post. Use lowercase letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  rows={3}
                  defaultValue={post?.excerpt || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Brief summary for search results and social sharing..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  required
                  rows={20}
                  defaultValue={post?.content || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  placeholder="Write your blog post content here... (HTML supported)"
                />
                <p className="text-xs text-slate-500 mt-1">
                  HTML formatting is supported. Use heading tags, paragraphs, lists, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Publish</h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={post?.isPublished || false}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Publish this post</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  defaultValue={post?.author || "Snow Africa Team"}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Featured Image</h3>

              <ImageUploadField
                name="featuredImage"
                defaultValue={post?.featuredImage}
                folder="blog"
                label="Featured Image"
                helpText="Main image shown in listings and at top of post"
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
                  defaultValue={post?.metaTitle || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Custom title for search engines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows={3}
                  defaultValue={post?.metaDescription || ""}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Description for search results..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {!isNew && (
              <form action={deletePost}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  onClick={(e) => {
                    if (!confirm("Are you sure you want to delete this post?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </form>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              {isNew ? "Create Post" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
