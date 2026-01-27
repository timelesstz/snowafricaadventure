"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface UploadedMedia {
  id: string;
  url: string;
  thumbnailUrl?: string;
  filename: string;
  size: number;
  originalSize?: number;
  compressionPct?: number;
  width?: number;
  height?: number;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "processing" | "complete" | "error";
  error?: string;
  result?: UploadedMedia;
}

interface MediaUploaderProps {
  onUpload: (media: UploadedMedia) => void;
  onMultiUpload?: (media: UploadedMedia[]) => void;
  folder?: string;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  compress?: boolean;
  className?: string;
  showPreview?: boolean;
  label?: string;
  currentImage?: string;
}

export default function MediaUploader({
  onUpload,
  onMultiUpload,
  folder = "general",
  multiple = false,
  accept = "image/*",
  maxSize = 20 * 1024 * 1024, // 20MB
  compress = true,
  className,
  showPreview = true,
  label = "Upload Image",
  currentImage,
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const uploadFile = async (file: File, index: number): Promise<UploadedMedia | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("compress", compress ? "true" : "false");

    // Update status to uploading
    setUploads((prev) =>
      prev.map((u, i) =>
        i === index ? { ...u, status: "uploading", progress: 10 } : u
      )
    );

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploads((prev) =>
          prev.map((u, i) =>
            i === index && u.status === "uploading" && u.progress < 90
              ? { ...u, progress: u.progress + 10 }
              : u
          )
        );
      }, 200);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();

      // Update to processing/complete
      setUploads((prev) =>
        prev.map((u, i) =>
          i === index
            ? { ...u, status: "complete", progress: 100, result: data.media }
            : u
        )
      );

      return data.media;
    } catch (error) {
      setUploads((prev) =>
        prev.map((u, i) =>
          i === index
            ? {
                ...u,
                status: "error",
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : u
        )
      );
      return null;
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    // Validate files
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Initialize upload state
    const initialUploads: UploadProgress[] = validFiles.map((file) => ({
      file,
      progress: 0,
      status: "pending",
    }));
    setUploads(initialUploads);

    // Upload files
    const results: UploadedMedia[] = [];
    for (let i = 0; i < validFiles.length; i++) {
      const result = await uploadFile(validFiles[i], i);
      if (result) {
        results.push(result);
        if (!multiple) {
          onUpload(result);
        }
      }
    }

    if (multiple && results.length > 0 && onMultiUpload) {
      onMultiUpload(results);
    }

    // Clear completed uploads after delay
    setTimeout(() => {
      setUploads((prev) => prev.filter((u) => u.status === "error"));
    }, 3000);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        if (!multiple && files.length > 1) {
          processFiles([files[0]]);
        } else {
          processFiles(files);
        }
      }
    },
    [multiple, folder, compress, maxSize]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={className}>
      {/* Current Image Preview */}
      {currentImage && showPreview && (
        <div className="mb-3">
          <img
            src={currentImage}
            alt="Current"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={clsx(
          "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
          isDragging
            ? "border-amber-500 bg-amber-50"
            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          {isDragging ? (
            <>
              <Upload className="w-10 h-10 text-amber-500" />
              <p className="text-amber-600 font-medium">Drop files here</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-slate-400" />
              <p className="text-slate-600 font-medium">{label}</p>
              <p className="text-sm text-slate-500">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-slate-400">
                Max {maxSize / 1024 / 1024}MB • {compress ? "Auto-compressed" : "No compression"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploads.map((upload, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg border",
                upload.status === "complete"
                  ? "bg-green-50 border-green-200"
                  : upload.status === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-slate-50 border-slate-200"
              )}
            >
              {/* Preview or Icon */}
              <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded overflow-hidden">
                {upload.result?.thumbnailUrl || upload.result?.url ? (
                  <img
                    src={upload.result.thumbnailUrl || upload.result.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : upload.file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(upload.file)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {upload.file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{formatSize(upload.file.size)}</span>
                  {upload.result?.compressionPct && upload.result.compressionPct > 0 && (
                    <span className="text-green-600">
                      -{upload.result.compressionPct}% saved
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                {(upload.status === "uploading" || upload.status === "processing") && (
                  <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                )}

                {/* Error Message */}
                {upload.status === "error" && upload.error && (
                  <p className="text-xs text-red-600 mt-1">{upload.error}</p>
                )}
              </div>

              {/* Status Icon */}
              <div className="flex-shrink-0">
                {upload.status === "uploading" || upload.status === "processing" ? (
                  <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                ) : upload.status === "complete" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : upload.status === "error" ? (
                  <button
                    onClick={() => removeUpload(index)}
                    className="p-1 hover:bg-red-100 rounded"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                ) : (
                  <AlertCircle className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
