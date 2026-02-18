import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

async function getBlogPost(id: string) {
  if (id === "new") return null;

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      categories: {
        include: { category: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });

  return post;
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

async function getTags() {
  return prisma.tag.findMany({
    orderBy: { name: "asc" },
  });
}

async function savePost(formData: FormData) {
  "use server";

  const id = formData.get("id") as string | null;
  const slug = (formData.get("slug") as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  const isPublished = formData.get("isPublished") === "on";

  // Get categories and tags from form
  const categoryIds = formData.getAll("categories") as string[];
  const tagsStr = formData.get("tags") as string;
  const tagNames = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];

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

  let postId: string;

  if (id && id !== "new") {
    await prisma.blogPost.update({
      where: { id },
      data,
    });
    postId = id;

    // Delete existing categories and tags
    await prisma.postCategory.deleteMany({ where: { postId: id } });
    await prisma.postTag.deleteMany({ where: { postId: id } });
  } else {
    const newPost = await prisma.blogPost.create({
      data,
    });
    postId = newPost.id;
  }

  // Add categories
  if (categoryIds.length > 0) {
    await prisma.postCategory.createMany({
      data: categoryIds.map(categoryId => ({
        postId,
        categoryId,
      })),
    });
  }

  // Add tags - create new tags if they don't exist
  for (const tagName of tagNames) {
    const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    // Find or create tag
    let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
    if (!tag) {
      tag = await prisma.tag.create({
        data: { slug: tagSlug, name: tagName },
      });
    }

    // Create post-tag relationship
    await prisma.postTag.create({
      data: { postId, tagId: tag.id },
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
  const [post, categories, tags] = await Promise.all([
    getBlogPost(id),
    getCategories(),
    getTags(),
  ]);

  if (id !== "new" && !post) {
    notFound();
  }

  const isNew = id === "new";
  const selectedCategories = post?.categories?.map(c => c.categoryId) || [];
  const selectedTags = post?.tags?.map(t => t.tag.name) || [];

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

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Categories</h3>

              {categories.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        name="categories"
                        value={cat.id}
                        defaultChecked={selectedCategories.includes(cat.id)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-slate-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No categories available.
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Tags</h3>

              <div>
                <input
                  type="text"
                  name="tags"
                  defaultValue={selectedTags.join(", ")}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="safari, kilimanjaro, travel tips"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Separate tags with commas. New tags will be created automatically.
                </p>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                  {tags.length > 10 && (
                    <span className="text-xs text-slate-400">
                      +{tags.length - 10} more
                    </span>
                  )}
                </div>
              )}
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

        <div className="flex items-center justify-end gap-3">
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
      </form>

      {!isNew && (
        <div className="flex items-center justify-start">
          <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton message="Are you sure you want to delete this post?" label="Delete Post" />
          </form>
        </div>
      )}
    </div>
  );
}
