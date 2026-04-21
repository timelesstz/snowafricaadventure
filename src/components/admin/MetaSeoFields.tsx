"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface MetaSeoFieldsProps {
  defaultMetaTitle?: string | null;
  defaultMetaDescription?: string | null;
  metaTitleName?: string;
  metaDescriptionName?: string;
}

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

function rangeStatus(len: number, min: number, max: number) {
  if (len === 0) return { color: "text-slate-400", label: "" };
  if (len < min) return { color: "text-amber-600", label: "Too short for SEO" };
  if (len > max) return { color: "text-red-600", label: "Too long — Google may truncate" };
  return { color: "text-emerald-600", label: "Good length" };
}

export default function MetaSeoFields({
  defaultMetaTitle = "",
  defaultMetaDescription = "",
  metaTitleName = "metaTitle",
  metaDescriptionName = "metaDescription",
}: MetaSeoFieldsProps) {
  const [title, setTitle] = useState(defaultMetaTitle ?? "");
  const [desc, setDesc] = useState(defaultMetaDescription ?? "");

  const titleStatus = rangeStatus(title.length, TITLE_MIN, TITLE_MAX);
  const descStatus = rangeStatus(desc.length, DESC_MIN, DESC_MAX);

  const titleId = `field-${metaTitleName}`;
  const descId = `field-${metaDescriptionName}`;

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={titleId} className="block text-sm font-medium text-slate-700">
            Meta Title
          </label>
          <span className={clsx("text-xs tabular-nums", titleStatus.color)}>
            {title.length}/{TITLE_MAX}
            {titleStatus.label && <span className="ml-2">{titleStatus.label}</span>}
          </span>
        </div>
        <input
          id={titleId}
          type="text"
          name={metaTitleName}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          placeholder="Shown in browser tabs and search results"
        />
        <p className="text-xs text-slate-500 mt-1">
          Aim for {TITLE_MIN}–{TITLE_MAX} characters.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={descId} className="block text-sm font-medium text-slate-700">
            Meta Description
          </label>
          <span className={clsx("text-xs tabular-nums", descStatus.color)}>
            {desc.length}/{DESC_MAX}
            {descStatus.label && <span className="ml-2">{descStatus.label}</span>}
          </span>
        </div>
        <textarea
          id={descId}
          name={metaDescriptionName}
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          placeholder="Snippet shown under the title in Google results"
        />
        <p className="text-xs text-slate-500 mt-1">
          Aim for {DESC_MIN}–{DESC_MAX} characters.
        </p>
      </div>
    </>
  );
}
