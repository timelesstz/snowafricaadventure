"use client";

import { useState } from "react";
import { Link2, Pencil } from "lucide-react";

interface SlugTitleFieldsProps {
  defaultTitle?: string | null;
  defaultSlug?: string | null;
  titleName?: string;
  slugName?: string;
  titleLabel?: string;
  titlePlaceholder?: string;
  slugPlaceholder?: string;
  slugPrefix?: string;
  slugSuffix?: string;
  required?: boolean;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function SlugTitleFields({
  defaultTitle = "",
  defaultSlug = "",
  titleName = "title",
  slugName = "slug",
  titleLabel = "Title",
  titlePlaceholder,
  slugPlaceholder,
  slugPrefix,
  slugSuffix = "/",
  required = true,
}: SlugTitleFieldsProps) {
  const [title, setTitle] = useState(defaultTitle ?? "");
  const [slugOverride, setSlugOverride] = useState<string | null>(
    defaultSlug ? defaultSlug : null
  );

  const linked = slugOverride === null;
  const slug = linked ? slugify(title) : slugOverride;

  const titleId = `field-${titleName}`;
  const slugId = `field-${slugName}`;

  return (
    <>
      <div className="md:col-span-2">
        <label htmlFor={titleId} className="block text-sm font-medium text-slate-700 mb-2">
          {titleLabel}
          {required && " *"}
        </label>
        <input
          id={titleId}
          type="text"
          name={titleName}
          required={required}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          placeholder={titlePlaceholder}
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={slugId} className="block text-sm font-medium text-slate-700">
            URL Slug
            {required && " *"}
          </label>
          {linked ? (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Link2 className="w-3 h-3" /> Auto from title
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSlugOverride(null)}
              className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
            >
              <Pencil className="w-3 h-3" /> Re-link to title
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {slugPrefix && (
            <span className="text-slate-500 whitespace-nowrap">{slugPrefix}</span>
          )}
          <input
            id={slugId}
            type="text"
            name={slugName}
            required={required}
            value={slug}
            onChange={(e) => setSlugOverride(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            placeholder={slugPlaceholder}
          />
          {slugSuffix && <span className="text-slate-500">{slugSuffix}</span>}
        </div>
      </div>
    </>
  );
}
