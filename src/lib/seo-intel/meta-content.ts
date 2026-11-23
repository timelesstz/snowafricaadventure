import prisma from "@/lib/prisma";
import type { ContentKind } from "@/lib/seo-overview";
import { publicPathFor, pathKey } from "./paths";

/**
 * Read and update the meta fields of one content item by id. Writes are
 * targeted `update` calls on a single row plus an additive change-log entry —
 * nothing is ever deleted or recreated.
 */

export interface MetaContent {
  kind: ContentKind;
  id: string;
  title: string;
  slug: string;
  path: string;
  isLive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  /** Plain-text body excerpt for the AI prompt. */
  excerpt: string;
}

function plain(text: string | null | undefined, max = 1500): string {
  if (!text) return "";
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const select = { id: true, slug: true, metaTitle: true, metaDescription: true } as const;

export async function loadMetaContent(kind: ContentKind, id: string): Promise<MetaContent | null> {
  const finish = (
    row: { id: string; slug: string; metaTitle: string | null; metaDescription: string | null } | null,
    title: string,
    isLive: boolean,
    excerpt: string
  ): MetaContent | null =>
    row && {
      kind,
      id: row.id,
      title,
      slug: row.slug,
      path: pathKey(publicPathFor(kind, row.slug)),
      isLive,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      excerpt,
    };

  switch (kind) {
    case "route": {
      const r = await prisma.trekkingRoute.findUnique({
        where: { id },
        select: { ...select, title: true, isActive: true, overview: true, duration: true },
      });
      return r && finish(r, r.title, r.isActive, plain(`${r.duration ?? ""} ${r.overview ?? ""}`));
    }
    case "safari": {
      const s = await prisma.safariPackage.findUnique({
        where: { id },
        select: { ...select, title: true, isActive: true, overview: true, duration: true },
      });
      return s && finish(s, s.title, s.isActive, plain(`${s.duration ?? ""} ${s.overview ?? ""}`));
    }
    case "destination": {
      const d = await prisma.destination.findUnique({
        where: { id },
        select: { ...select, name: true, isActive: true, description: true },
      });
      return d && finish(d, d.name, d.isActive, plain(d.description));
    }
    case "day-trip": {
      const t = await prisma.dayTrip.findUnique({
        where: { id },
        select: { ...select, title: true, isActive: true, description: true },
      });
      return t && finish(t, t.title, t.isActive, plain(t.description));
    }
    case "blog": {
      const p = await prisma.blogPost.findUnique({
        where: { id },
        select: { ...select, title: true, isPublished: true, excerpt: true, content: true },
      });
      return p && finish(p, p.title, p.isPublished, plain(`${p.excerpt ?? ""} ${p.content ?? ""}`));
    }
  }
}

export interface MetaPatch {
  metaTitle?: string;
  metaDescription?: string;
}

async function writeMeta(kind: ContentKind, id: string, data: MetaPatch) {
  switch (kind) {
    case "route":
      return prisma.trekkingRoute.update({ where: { id }, data, select: { id: true } });
    case "safari":
      return prisma.safariPackage.update({ where: { id }, data, select: { id: true } });
    case "destination":
      return prisma.destination.update({ where: { id }, data, select: { id: true } });
    case "day-trip":
      return prisma.dayTrip.update({ where: { id }, data, select: { id: true } });
    case "blog":
      return prisma.blogPost.update({ where: { id }, data, select: { id: true } });
  }
}

export interface ApplyResult {
  changed: Array<"metaTitle" | "metaDescription">;
  path: string;
}

/**
 * Apply a reviewed meta change to one item and log each changed field.
 * Unchanged fields are skipped so the log only holds real edits.
 */
export async function applyMetaChange(
  current: MetaContent,
  patch: MetaPatch,
  meta: { source: "ai" | "manual"; reason?: string | null; userId?: string | null; userEmail?: string | null }
): Promise<ApplyResult> {
  const data: MetaPatch = {};
  const changed: ApplyResult["changed"] = [];
  if (patch.metaTitle !== undefined && patch.metaTitle !== (current.metaTitle ?? "")) {
    data.metaTitle = patch.metaTitle;
    changed.push("metaTitle");
  }
  if (patch.metaDescription !== undefined && patch.metaDescription !== (current.metaDescription ?? "")) {
    data.metaDescription = patch.metaDescription;
    changed.push("metaDescription");
  }
  if (changed.length === 0) return { changed, path: current.path };

  await writeMeta(current.kind, current.id, data);
  await prisma.seoContentChange.createMany({
    data: changed.map((field) => ({
      contentKind: current.kind,
      contentId: current.id,
      path: current.path,
      field,
      before: current[field],
      after: data[field] ?? null,
      source: meta.source,
      reason: meta.reason ?? null,
      userId: meta.userId ?? null,
      userEmail: meta.userEmail ?? null,
    })),
  });
  return { changed, path: current.path };
}
