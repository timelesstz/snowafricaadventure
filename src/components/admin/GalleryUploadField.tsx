"use client";

import { useState, useEffect } from "react";
import { X, GripVertical, Plus, FolderOpen } from "lucide-react";
import MediaUploader from "./MediaUploader";
import R2BrowserModal from "./R2BrowserModal";
import { clsx } from "clsx";

interface GalleryUploadFieldProps {
  name: string; // Form field name for hidden input
  defaultValue?: string[];
  value?: string[];
  onChange?: (urls: string[]) => void;
  folder?: string;
  label?: string;
  helpText?: string;
  maxImages?: number;
  className?: string;
  deleteFromR2?: boolean; // When true, removing an image also deletes it from R2
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
}: GalleryUploadFieldProps) {
  const [value, setValue] = useState(controlledValue ?? defaultValue);
  const [showUploader, setShowUploader] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Sync with controlled value if provided
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const updateValue = (newValue: string[]) => {
    setValue(newValue);
    onChange?.(newValue);
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
    if (shouldDeleteFromR2 && removedUrl) {
      try {
        await fetch("/api/admin/media/delete-by-url", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: removedUrl }),
        });
      } catch (e) {
        console.error("Failed to delete gallery image from R2:", e);
      }
    }
  };

  // Drag and drop reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
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
      {/* Hidden input for form submission - stores JSON array */}
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          <span className="text-slate-400 font-normal ml-2">
            ({value.length}/{maxImages})
          </span>
        </label>
      )}

      {/* Gallery Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={clsx(
                "relative group aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-move",
                draggedIndex === index
                  ? "opacity-50 border-amber-500"
                  : dragOverIndex === index
                  ? "border-amber-400 scale-105"
                  : "border-transparent hover:border-slate-300"
              )}
            >
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                {/* Drag Handle */}
                <div className="absolute top-1 left-1 p-1 bg-white/80 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-4 h-4 text-slate-600" />
                </div>

                {/* Index Badge */}
                <div className="absolute top-1 right-8 px-2 py-0.5 bg-black/60 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {index + 1}
                </div>

                {/* Remove Button */}
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
          ))}

          {/* Add More Buttons */}
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

      {/* Empty State or Uploader */}
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

      {helpText && (
        <p className="mt-2 text-sm text-slate-500">{helpText}</p>
      )}

      {/* R2 Browser Modal */}
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
