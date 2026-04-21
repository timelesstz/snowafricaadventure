"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, FolderOpen, Loader2, ImageOff } from "lucide-react";
import MediaUploader from "./MediaUploader";
import R2BrowserModal from "./R2BrowserModal";
import { clsx } from "clsx";

interface ImageUploadFieldProps {
  name: string;
  defaultValue?: string | null;
  value?: string | null;
  onChange?: (url: string | null) => void;
  folder?: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
  previewSize?: "sm" | "md" | "lg" | "hero";
  deleteFromR2?: boolean;
  deferDeletion?: boolean;
}

function ImagePreview({
  url,
  alt,
  isHero,
}: {
  url: string;
  alt: string;
  isHero: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-1 text-slate-400 p-2"
        title={`Failed to load: ${url}`}
      >
        <ImageOff className="w-8 h-8" />
        <span className="text-xs text-center break-all px-2">
          Image failed to load
        </span>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      sizes={isHero ? "(max-width: 768px) 100vw, 640px" : "192px"}
      className="object-cover"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

async function deleteImageFromR2(url: string): Promise<void> {
  try {
    await fetch("/api/admin/media/delete-by-url", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch (e) {
    console.error("Failed to delete image from R2:", e);
  }
}

export default function ImageUploadField({
  name,
  defaultValue,
  value: controlledValue,
  onChange,
  folder = "general",
  label = "Image",
  helpText,
  required = false,
  className,
  previewSize = "md",
  deleteFromR2: shouldDeleteFromR2 = false,
  deferDeletion = false,
}: ImageUploadFieldProps) {
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [pendingDeletions, setPendingDeletions] = useState<string[]>([]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const previewClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    hero: "w-full max-w-2xl aspect-[16/9]",
  };

  const disposeOldImage = useCallback(
    async (oldUrl: string | null) => {
      if (!shouldDeleteFromR2 || !oldUrl) return;
      if (deferDeletion) {
        setPendingDeletions((prev) => (prev.includes(oldUrl) ? prev : [...prev, oldUrl]));
        return;
      }
      setIsDeleting(true);
      await deleteImageFromR2(oldUrl);
      setIsDeleting(false);
    },
    [shouldDeleteFromR2, deferDeletion]
  );

  const handleUpload = async (media: { url: string }) => {
    const oldUrl = value;
    setValue(media.url);
    onChange?.(media.url);
    setIsUploading(false);
    await disposeOldImage(oldUrl);
  };

  const handleBrowseSelect = async (url: string) => {
    const oldUrl = value;
    setValue(url);
    onChange?.(url);
    setShowBrowser(false);
    await disposeOldImage(oldUrl);
  };

  const handleRemove = async () => {
    const oldUrl = value;
    setValue(null);
    onChange?.(null);
    await disposeOldImage(oldUrl);
  };

  const isHero = previewSize === "hero";

  return (
    <div className={className}>
      <input type="hidden" name={name} value={value || ""} />
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
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {value ? (
        <div className="space-y-3">
          <div
            className={clsx(
              "relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50",
              previewClasses[previewSize],
              isHero ? "" : "inline-block"
            )}
          >
            <ImagePreview key={value} url={value} alt={label} isHero={isHero} />
            <button
              type="button"
              onClick={handleRemove}
              disabled={isDeleting}
              className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded-full shadow hover:bg-red-600 transition-colors disabled:opacity-50"
              title="Remove image"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsUploading(true)}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              Upload new
            </button>
            <button
              type="button"
              onClick={() => setShowBrowser(true)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              Browse R2
            </button>
          </div>

          {isUploading && (
            <MediaUploader
              onUpload={handleUpload}
              folder={folder}
              showPreview={false}
              label="Upload new image"
            />
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <MediaUploader
            onUpload={handleUpload}
            folder={folder}
            showPreview={false}
            label={`Upload ${label.toLowerCase()}`}
          />
          <div className="text-center">
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

      {helpText && <p className="mt-2 text-sm text-slate-500">{helpText}</p>}

      <R2BrowserModal
        open={showBrowser}
        onClose={() => setShowBrowser(false)}
        onSelect={handleBrowseSelect}
      />
    </div>
  );
}
