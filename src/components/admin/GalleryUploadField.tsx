"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, GripVertical, Plus, FolderOpen, ImageOff, Info, Star, AlertTriangle } from "lucide-react";
import MediaUploader from "./MediaUploader";
import R2BrowserModal from "./R2BrowserModal";
import { clsx } from "clsx";

export type GalleryAlt = { alt: string; caption?: string };
export type GalleryAlts = Record<string, GalleryAlt>;

interface GalleryUploadFieldProps {
  name: string;
  defaultValue?: string[];
  value?: string[];
  onChange?: (urls: string[]) => void;
  folder?: string;
  label?: string;
  helpText?: string;
  maxImages?: number;
  className?: string;
  deleteFromR2?: boolean;
  deferDeletion?: boolean;
  featuredUrl?: string | null;
  onSetFeatured?: (url: string) => void;
  altsName?: string;
  defaultAlts?: GalleryAlts;
}

function GalleryThumb({ url, alt }: { url: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400"
        title={`Failed to load: ${url}`}
      >
        <ImageOff className="w-6 h-6" />
        <span className="text-[10px] mt-1">broken</span>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      className="object-cover"
      onError={() => setFailed(true)}
      unoptimized={url.startsWith("blob:") || url.startsWith("data:")}
    />
  );
}

export default function GalleryUploadField({
  name,
  defaultValue = [],
  value: controlledValue,
  onChange,
  folder = "general",
  label = "Gallery",
  helpText,
  maxImages = 20,
  className,
  deleteFromR2: shouldDeleteFromR2 = false,
  deferDeletion = false,
  featuredUrl = null,
  onSetFeatured,
  altsName,
  defaultAlts,
}: GalleryUploadFieldProps) {
  const [value, setValue] = useState(controlledValue ?? defaultValue);
  const [showUploader, setShowUploader] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [pendingDeletions, setPendingDeletions] = useState<string[]>([]);
  const [alts, setAlts] = useState<GalleryAlts>(defaultAlts ?? {});

  const updateAlt = (url: string, field: keyof GalleryAlt, value: string) => {
    setAlts((prev) => {
      const existing = prev[url] ?? { alt: "" };
      const next = { ...existing, [field]: value };
      // Drop empty entries to keep storage tight
      if (!next.alt && !next.caption) {
        const rest = { ...prev };
        delete rest[url];
        return rest;
      }
      return { ...prev, [url]: next };
    });
  };

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const updateValue = (newValue: string[]) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const disposeUrl = async (removedUrl: string) => {
    if (!shouldDeleteFromR2 || !removedUrl) return;
    if (deferDeletion) {
      setPendingDeletions((prev) =>
        prev.includes(removedUrl) ? prev : [...prev, removedUrl]
      );
      return;
    }
    try {
      await fetch("/api/admin/media/delete-by-url", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: removedUrl }),
      });
    } catch (e) {
      console.error("Failed to delete gallery image from R2:", e);
    }
  };

  const handleUpload = (media: { url: string }) => {
    if (value.length < maxImages) {
      updateValue([...value, media.url]);
    }
  };

  const handleMultiUpload = (mediaList: { url: string }[]) => {
    const newUrls = mediaList.map((m) => m.url);
    const combined = [...value, ...newUrls].slice(0, maxImages);
    updateValue(combined);
    setShowUploader(false);
  };

  const handleBrowseMultiSelect = (urls: string[]) => {
    const combined = [...value, ...urls].slice(0, maxImages);
    updateValue(combined);
    setShowBrowser(false);
  };

  const handleRemove = async (index: number) => {
    const removedUrl = value[index];
    updateValue(value.filter((_, i) => i !== index));
    await disposeUrl(removedUrl);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (
      draggedIndex !== null &&
      dragOverIndex !== null &&
      draggedIndex !== dragOverIndex
    ) {
      const newValue = [...value];
      const [dragged] = newValue.splice(draggedIndex, 1);
      newValue.splice(dragOverIndex, 0, dragged);
      updateValue(newValue);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={className}>
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      {altsName && (
        <input type="hidden" name={altsName} value={JSON.stringify(alts)} />
      )}
      {deferDeletion && shouldDeleteFromR2 && (
        <input
          type="hidden"
          name={`${name}_pendingDeletions`}
          value={JSON.stringify(pendingDeletions)}
        />
      )}
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          <span className="text-slate-400 font-normal ml-2">
            ({value.length}/{maxImages})
          </span>
        </label>
      )}

      {value.length > 1 && (
        <p className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5" />
          Drag thumbnails to reorder. The first image is used as the gallery lead.
        </p>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
          {value.map((url, index) => {
            const altMissing = altsName ? !alts[url]?.alt : false;
            return (
            <div key={`${url}-${index}`} className="flex flex-col gap-2">
            <div
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={clsx(
                "relative group aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-move bg-slate-50",
                draggedIndex === index
                  ? "opacity-50 border-amber-500"
                  : dragOverIndex === index
                  ? "border-amber-400 scale-105"
                  : "border-transparent hover:border-slate-300"
              )}
            >
              <GalleryThumb url={url} alt={alts[url]?.alt || `Gallery image ${index + 1}`} />

              <div className="absolute top-1 left-1 flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-black/70 text-white text-[11px] font-medium rounded">
                  {index + 1}
                </span>
                {featuredUrl === url && (
                  <span
                    className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-semibold rounded inline-flex items-center gap-0.5"
                    title="Currently the featured image"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
                {altMissing && (
                  <span
                    className="px-1 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-semibold rounded inline-flex items-center gap-0.5"
                    title="Missing alt text"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    No alt
                  </span>
                )}
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                <div className="absolute bottom-1 left-1 p-1 bg-white/90 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-3.5 h-3.5 text-slate-600" />
                </div>

                {onSetFeatured && featuredUrl !== url && (
                  <button
                    type="button"
                    onClick={() => onSetFeatured(url)}
                    className="absolute bottom-1 right-1 p-1 bg-white/90 text-amber-600 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-50"
                    title="Set as featured image"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {altsName && (
              <div className="space-y-1">
                <input
                  type="text"
                  value={alts[url]?.alt ?? ""}
                  onChange={(e) => updateAlt(url, "alt", e.target.value)}
                  placeholder="Alt text (for SEO + screen readers)"
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  aria-label={`Alt text for image ${index + 1}`}
                />
                <input
                  type="text"
                  value={alts[url]?.caption ?? ""}
                  onChange={(e) => updateAlt(url, "caption", e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  aria-label={`Caption for image ${index + 1}`}
                />
              </div>
            )}
            </div>
            );
          })}

          {value.length < maxImages && (
            <>
              <button
                type="button"
                onClick={() => setShowUploader(true)}
                className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <Plus className="w-6 h-6 text-slate-400" />
                <span className="text-xs text-slate-500">Upload</span>
              </button>
              <button
                type="button"
                onClick={() => setShowBrowser(true)}
                className="aspect-square rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <FolderOpen className="w-6 h-6 text-blue-400" />
                <span className="text-xs text-blue-500">Browse R2</span>
              </button>
            </>
          )}
        </div>
      )}

      {value.length === 0 || showUploader ? (
        <div className={value.length > 0 ? "mt-4" : ""}>
          <MediaUploader
            onUpload={handleUpload}
            onMultiUpload={handleMultiUpload}
            folder={folder}
            multiple
            showPreview={false}
            label={`Upload gallery images (${maxImages - value.length} remaining)`}
          />
          {value.length === 0 && (
            <div className="mt-3">
              <div className="text-center mb-2">
                <span className="text-xs text-slate-400">or</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBrowser(true)}
                className="w-full px-4 py-2.5 border-2 border-dashed border-blue-200 rounded-lg text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                Browse existing R2 images
              </button>
            </div>
          )}
          {showUploader && value.length > 0 && (
            <button
              type="button"
              onClick={() => setShowUploader(false)}
              className="mt-2 text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>
      ) : null}

      {helpText && <p className="mt-2 text-sm text-slate-500">{helpText}</p>}

      <R2BrowserModal
        open={showBrowser}
        onClose={() => setShowBrowser(false)}
        onSelect={(url) => {
          if (value.length < maxImages) {
            updateValue([...value, url]);
          }
          setShowBrowser(false);
        }}
        multiple
        onMultiSelect={handleBrowseMultiSelect}
      />
    </div>
  );
}
