import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import {
  Field,
  FieldLabel,
  FieldHelp,
  FormSection,
  fieldControlClass,
} from "@/components/admin/ui";
import { disposeFormDeletions } from "@/lib/admin-media";

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

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const slug = (formData.get("slug") as string)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  const isPublished = formData.get("isPublished") === "on";

  const categoryIds = formData.getAll("categories") as string[];
  const tagsStr = formData.get("tags") as string;
  const tagNames = tagsStr
    ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const data = {
    slug,
    title: formData.get("title") as string,
    metaTitle: (formData.get("metaTitle") as string) || null,
    metaDescription: (formData.get("metaDescription") as string) || null,
    excerpt: (formData.get("excerpt") as string) || null,
    content: formData.get("content") as string,
    featuredImage: (formData.get("featuredImage") as string) || null,
    author: (formData.get("author") as string) || null,
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

    await prisma.postCategory.deleteMany({ where: { postId: id } });
    await prisma.postTag.deleteMany({ where: { postId: id } });
  } else {
    const newPost = await prisma.blogPost.create({
      data,
    });
    postId = newPost.id;
  }

  if (categoryIds.length > 0) {
    await prisma.postCategory.createMany({
      data: categoryIds.map((categoryId) => ({
        postId,
        categoryId,
      })),
    });
  }

  for (const tagName of tagNames) {
    const tagSlug = tagName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
    if (!tag) {
      tag = await prisma.tag.create({
        data: { slug: tagSlug, name: tagName },
      });
    }

    await prisma.postTag.create({
      data: { postId, tagId: tag.id },
    });
  }

  await disposeFormDeletions(formData, ["featuredImage"]);

  redirect("/admin/blog");
}

async function deletePost(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.blogPost.delete({ where: { id } });
  redirect("/admin/blog");
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
  const selectedCategories = post?.categories?.map((c) => c.categoryId) || [];
  const selectedTags = post?.tags?.map((t) => t.tag.name) || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            aria-label="Back to blog posts"
            className="p-2 hover:bg-slate-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-h1">
              {isNew ? "New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-body text-slate-600 mt-1">
              {isNew ? "Create a new blog post" : "Update post details"}
            </p>
          </div>
        </div>
        {!isNew && post?.isPublished && (
          <a
            href={`/${post.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            View Post
          </a>
        )}
      </div>

      <form action={savePost}>
        <input type="hidden" name="id" value={id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <FormSection title="Content">
              <Field>
                <FieldLabel htmlFor="title" required>
                  Title
                </FieldLabel>
                <input
                  id="title"
                  type="text"
                  name="title"
                  aria-label="Post title"
                  required
                  defaultValue={post?.title || ""}
                  className={`${fieldControlClass} text-lg`}
                  placeholder="Enter post title…"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="slug" required>
                  URL Slug
                </FieldLabel>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500" aria-hidden="true">/</span>
                  <input
                    id="slug"
                    type="text"
                    name="slug"
                    aria-label="URL slug"
                    required
                    defaultValue={post?.slug || ""}
                    className={fieldControlClass}
                    placeholder="url-slug"
                  />
                  <span className="text-slate-500" aria-hidden="true">/</span>
                </div>
                <FieldHelp>
                  This will be the URL of the post. Use lowercase letters,
                  numbers, and hyphens only.
                </FieldHelp>
              </Field>
              <Field>
                <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  aria-label="Post excerpt"
                  rows={3}
                  defaultValue={post?.excerpt || ""}
                  className={fieldControlClass}
                  placeholder="Brief summary for search results and social sharing…"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="content" required>
                  Content
                </FieldLabel>
                <textarea
                  id="content"
                  name="content"
                  aria-label="Post content"
                  required
                  rows={20}
                  defaultValue={post?.content || ""}
                  className={`${fieldControlClass} font-mono text-sm`}
                  placeholder="Write your blog post content here… (HTML supported)"
                />
                <FieldHelp>
                  HTML formatting is supported. Use heading tags, paragraphs,
                  lists, etc.
                </FieldHelp>
              </Field>
            </FormSection>
          </div>

          {/* Sidebar */}
          <div>
            <FormSection title="Publish">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={post?.isPublished || false}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Publish this post</span>
              </label>
              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <input
                  id="author"
                  type="text"
                  name="author"
                  aria-label="Author"
                  defaultValue={post?.author || "Snow Africa Team"}
                  className={fieldControlClass}
                />
              </Field>
            </FormSection>

            <FormSection title="Categories">
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
            </FormSection>

            <FormSection title="Tags">
              <Field>
                <FieldLabel htmlFor="tags">Tag names</FieldLabel>
                <input
                  id="tags"
                  type="text"
                  name="tags"
                  aria-label="Tags"
                  defaultValue={selectedTags.join(", ")}
                  className={fieldControlClass}
                  placeholder="safari, kilimanjaro, travel tips"
                />
                <FieldHelp>
                  Separate tags with commas. New tags will be created
                  automatically.
                </FieldHelp>
              </Field>
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
            </FormSection>

            <FormSection title="Featured Image">
              <ImageUploadField
                name="featuredImage"
                defaultValue={post?.featuredImage}
                folder="blog"
                label="Featured Image"
                helpText="Main image shown in listings and at top of post"
                deleteFromR2
                deferDeletion
              />
            </FormSection>

            <FormSection title="SEO">
              <Field>
                <FieldLabel htmlFor="metaTitle">Meta Title</FieldLabel>
                <input
                  id="metaTitle"
                  type="text"
                  name="metaTitle"
                  aria-label="Meta title"
                  defaultValue={post?.metaTitle || ""}
                  className={fieldControlClass}
                  placeholder="Custom title for search engines…"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="metaDescription">
                  Meta Description
                </FieldLabel>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  aria-label="Meta description"
                  rows={3}
                  defaultValue={post?.metaDescription || ""}
                  className={fieldControlClass}
                  placeholder="Description for search results…"
                />
              </Field>
            </FormSection>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Link
            href="/admin/blog"
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            {isNew ? "Create Post" : "Save Changes"}
          </button>
        </div>
      </form>

      {!isNew && (
        <div className="flex items-center justify-start mt-4">
          <form action={deletePost}>
            <input type="hidden" name="id" value={id} />
            <ConfirmDeleteButton
              message="Are you sure you want to delete this post?"
              label="Delete Post"
            />
          </form>
        </div>
      )}
    </div>
  );
}
