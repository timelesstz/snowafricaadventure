"use client";

import { useState } from "react";
import ImageUploadField from "./ImageUploadField";
import GalleryUploadField, { type GalleryAlts } from "./GalleryUploadField";

interface LinkedImageEditorProps {
  defaultFeatured?: string | null;
  defaultGallery?: string[];
  defaultGalleryAlts?: GalleryAlts;
  folder: string;
  featuredName?: string;
  galleryName?: string;
  galleryAltsName?: string;
  featuredLabel?: string;
  featuredHelpText?: string;
  galleryLabel?: string;
  galleryHelpText?: string;
  maxGalleryImages?: number;
}

export default function LinkedImageEditor({
  defaultFeatured = null,
  defaultGallery = [],
  defaultGalleryAlts,
  folder,
  featuredName = "featuredImage",
  galleryName = "gallery",
  galleryAltsName,
  featuredLabel = "Featured Image",
  featuredHelpText,
  galleryLabel = "Photo Gallery",
  galleryHelpText,
  maxGalleryImages = 12,
}: LinkedImageEditorProps) {
  const [featured, setFeatured] = useState<string | null>(defaultFeatured);
  const [gallery, setGallery] = useState<string[]>(defaultGallery);

  return (
    <div className="space-y-6">
      <ImageUploadField
        name={featuredName}
        value={featured}
        onChange={setFeatured}
        folder={folder}
        label={featuredLabel}
        helpText={featuredHelpText}
        previewSize="hero"
        deleteFromR2
        deferDeletion
      />

      <div className="border-t border-slate-200 pt-6">
        <GalleryUploadField
          name={galleryName}
          value={gallery}
          onChange={setGallery}
          folder={folder}
          label={galleryLabel}
          helpText={galleryHelpText}
          maxImages={maxGalleryImages}
          deleteFromR2
          deferDeletion
          featuredUrl={featured}
          onSetFeatured={(url) => setFeatured(url)}
          altsName={galleryAltsName}
          defaultAlts={defaultGalleryAlts}
        />
      </div>
    </div>
  );
}
