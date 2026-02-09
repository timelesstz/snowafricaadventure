"use client";

import { useState, useEffect } from "react";
import { X, FolderOpen } from "lucide-react";
import MediaUploader from "./MediaUploader";
import R2BrowserModal from "./R2BrowserModal";
import { clsx } from "clsx";

interface ImageUploadFieldProps {
  name: string; // Form field name for hidden input
  defaultValue?: string | null;
  value?: string | null;
  onChange?: (url: string | null) => void;
  folder?: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
  previewSize?: "sm" | "md" | "lg";
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
}: ImageUploadFieldProps) {
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);

  // Sync with controlled value if provided
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const previewSizes = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  const handleUpload = (media: { url: string }) => {
    setValue(media.url);
    onChange?.(media.url);
    setIsUploading(false);
  };

  const handleBrowseSelect = (url: string) => {
    setValue(url);
    onChange?.(url);
    setShowBrowser(false);
  };

  const handleRemove = () => {
    setValue(null);
    onChange?.(null);
  };

  return (
    <div className={className}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value || ""} />

      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {value ? (
        <div className="space-y-2">
          {/* Current Image Preview */}
          <div className="relative inline-block">
            <img
              src={value}
              alt={label}
              className={clsx(
                previewSizes[previewSize],
                "object-cover rounded-lg border border-slate-200"
              )}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Replace options */}
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

          {/* Uploader when replacing */}
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

      {helpText && (
        <p className="mt-1 text-sm text-slate-500">{helpText}</p>
      )}

      {/* R2 Browser Modal */}
      <R2BrowserModal
        open={showBrowser}
        onClose={() => setShowBrowser(false)}
        onSelect={handleBrowseSelect}
      />
    </div>
  );
}
