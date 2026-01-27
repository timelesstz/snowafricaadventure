"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Trash2,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
  FileText,
  HardDrive,
  Link2,
  Link2Off,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  Loader2,
} from "lucide-react";
import { clsx } from "clsx";
import MediaUploader from "@/components/admin/MediaUploader";

interface Media {
  id: string;
  filename: string;
  key: string;
  url: string;
  thumbnailUrl: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  title: string | null;
  folder: string;
  originalSize: number | null;
  compressionPct: number | null;
  usageCount: number;
  createdAt: string;
}

interface Stats {
  totalFiles: number;
  totalSize: number;
  orphanedCount: number;
  folders: { name: string; count: number }[];
}

interface MediaUsage {
  type: string;
  id: string;
  title: string;
}

type ViewMode = "grid" | "list";
type FilterMode = "all" | "orphaned" | "used";

export default function MediaLibrary() {
  const [media, setMedia] = useState<Media[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [folder, setFolder] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showUploader, setShowUploader] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [mediaUsage, setMediaUsage] = useState<MediaUsage[]>([]);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "24",
        filter,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      if (folder !== "all") params.append("folder", folder);
      if (search) params.append("search", search);

      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();

      setMedia(data.media);
      setStats(data.stats);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filter, folder, search]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleScanUsage = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/admin/media/scan-usage", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        fetchMedia();
      }
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setScanning(false);
    }
  };

  const handleDeleteOrphaned = async () => {
    if (!confirm(`Delete all ${stats?.orphanedCount || 0} orphaned images? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteOrphaned: true }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMedia();
        alert(`Deleted ${data.deleted} orphaned images`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected images? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedIds(new Set());
        fetchMedia();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectMedia = async (item: Media) => {
    setSelectedMedia(item);
    // Fetch usage
    try {
      const res = await fetch(`/api/admin/media/${item.id}`);
      const data = await res.json();
      setMediaUsage(data.usage || []);
    } catch (error) {
      console.error("Failed to fetch usage:", error);
      setMediaUsage([]);
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const selectAll = () => {
    if (selectedIds.size === media.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(media.map((m) => m.id)));
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Files</p>
                <p className="text-xl font-bold">{stats.totalFiles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HardDrive className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Size</p>
                <p className="text-xl font-bold">{formatSize(stats.totalSize)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Link2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">In Use</p>
                <p className="text-xl font-bold">
                  {stats.totalFiles - stats.orphanedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Link2Off className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Orphaned</p>
                <p className="text-xl font-bold text-amber-600">
                  {stats.orphanedCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as FilterMode);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Images</option>
            <option value="used">In Use</option>
            <option value="orphaned">Orphaned</option>
          </select>

          {/* Folder */}
          <select
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Folders</option>
            {stats?.folders.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name} ({f.count})
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "p-2",
                viewMode === "grid" ? "bg-slate-100" : "hover:bg-slate-50"
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "p-2",
                viewMode === "list" ? "bg-slate-100" : "hover:bg-slate-50"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Upload
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t">
          <button
            onClick={handleScanUsage}
            disabled={scanning}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            {scanning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Scan Usage
          </button>

          {stats && stats.orphanedCount > 0 && (
            <button
              onClick={handleDeleteOrphaned}
              disabled={deleting}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete {stats.orphanedCount} Orphaned
            </button>
          )}

          {selectedIds.size > 0 && (
            <>
              <span className="text-sm text-slate-500">
                {selectedIds.size} selected
              </span>
              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            </>
          )}

          <button
            onClick={selectAll}
            className="ml-auto text-sm text-slate-600 hover:text-slate-800"
          >
            {selectedIds.size === media.length ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>

      {/* Uploader */}
      {showUploader && (
        <div className="bg-white rounded-lg border p-4">
          <MediaUploader
            onUpload={() => {
              fetchMedia();
            }}
            onMultiUpload={() => {
              fetchMedia();
            }}
            multiple
            folder="uploads"
          />
        </div>
      )}

      {/* Media Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No media found</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "relative group bg-white rounded-lg border overflow-hidden cursor-pointer transition-all",
                selectedIds.has(item.id)
                  ? "ring-2 ring-amber-500"
                  : "hover:shadow-md"
              )}
              onClick={() => handleSelectMedia(item)}
            >
              {/* Checkbox */}
              <div
                className="absolute top-2 left-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(item.id);
                }}
              >
                <div
                  className={clsx(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    selectedIds.has(item.id)
                      ? "bg-amber-500 border-amber-500"
                      : "bg-white/80 border-slate-300 group-hover:border-slate-400"
                  )}
                >
                  {selectedIds.has(item.id) && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Usage Badge */}
              <div
                className={clsx(
                  "absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded text-xs font-medium",
                  item.usageCount > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                )}
              >
                {item.usageCount > 0 ? (
                  <span className="flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    {item.usageCount}
                  </span>
                ) : (
                  <Link2Off className="w-3 h-3" />
                )}
              </div>

              {/* Image */}
              <div className="aspect-square bg-slate-100">
                {item.mimeType.startsWith("image/") ? (
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={item.alt || item.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-12 h-12 text-slate-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs text-slate-700 truncate">{item.filename}</p>
                <p className="text-xs text-slate-400">{formatSize(item.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="w-8 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === media.length}
                    onChange={selectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Preview
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Filename
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Folder
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Usage
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {media.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => handleSelectMedia(item)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(item.id);
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 bg-slate-100 rounded overflow-hidden">
                      {item.mimeType.startsWith("image/") ? (
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="w-5 h-5 m-auto text-slate-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 max-w-xs truncate">
                    {item.filename}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatSize(item.size)}
                    {item.compressionPct && item.compressionPct > 0 && (
                      <span className="text-green-600 ml-1">
                        (-{item.compressionPct}%)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {item.folder}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                        item.usageCount > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {item.usageCount > 0 ? (
                        <>
                          <Link2 className="w-3 h-3" />
                          {item.usageCount} uses
                        </>
                      ) : (
                        <>
                          <Link2Off className="w-3 h-3" />
                          Orphaned
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatDate(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Detail Panel */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Media Details</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Preview */}
                <div>
                  {selectedMedia.mimeType.startsWith("image/") ? (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.alt || selectedMedia.filename}
                      className="w-full rounded-lg border"
                    />
                  ) : (
                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500">Filename</label>
                    <p className="font-medium break-all">{selectedMedia.filename}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500">Size</label>
                      <p>{formatSize(selectedMedia.size)}</p>
                      {selectedMedia.originalSize && selectedMedia.compressionPct && (
                        <p className="text-xs text-green-600">
                          Saved {selectedMedia.compressionPct}% ({formatSize(selectedMedia.originalSize - selectedMedia.size)})
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Dimensions</label>
                      <p>
                        {selectedMedia.width && selectedMedia.height
                          ? `${selectedMedia.width} × ${selectedMedia.height}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Folder</label>
                    <p>{selectedMedia.folder}</p>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedMedia.url}
                        readOnly
                        className="flex-1 px-2 py-1 text-sm border rounded bg-slate-50"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                        className="px-2 py-1 text-sm border rounded hover:bg-slate-50"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Usage */}
                  <div>
                    <label className="text-xs text-slate-500 flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      Used In ({mediaUsage.length})
                    </label>
                    {mediaUsage.length > 0 ? (
                      <ul className="mt-1 space-y-1">
                        {mediaUsage.map((u, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-center gap-2"
                          >
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
                              {u.type}
                            </span>
                            <span className="truncate">{u.title}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-amber-600 flex items-center gap-1 mt-1">
                        <AlertTriangle className="w-4 h-4" />
                        Not used anywhere (orphaned)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Uploaded</label>
                    <p>{formatDate(selectedMedia.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t bg-slate-50">
              <a
                href={selectedMedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm border rounded-lg hover:bg-white"
              >
                Open Original
              </a>
              <button
                onClick={async () => {
                  if (!confirm("Delete this image? This cannot be undone.")) return;
                  try {
                    await fetch(`/api/admin/media/${selectedMedia.id}`, {
                      method: "DELETE",
                    });
                    setSelectedMedia(null);
                    fetchMedia();
                  } catch (error) {
                    console.error("Delete failed:", error);
                  }
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
