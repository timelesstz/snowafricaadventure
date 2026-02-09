"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  Loader2,
  CheckCircle,
  FolderOpen,
  Image as ImageIcon,
  Link2,
  Link2Off,
} from "lucide-react";
import { clsx } from "clsx";

interface R2Item {
  key: string;
  url: string;
  size: number;
  lastModified: string;
  isTracked: boolean;
  usageCount: number;
  filename: string;
  folder: string;
}

interface R2BrowserModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
  onMultiSelect?: (urls: string[]) => void;
}

export default function R2BrowserModal({
  open,
  onClose,
  onSelect,
  multiple = false,
  onMultiSelect,
}: R2BrowserModalProps) {
  const [items, setItems] = useState<R2Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");
  const [nextToken, setNextToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());

  const PREFIXES = [
    { label: "All", value: "" },
    { label: "WP Uploads", value: "wp-content/uploads/" },
    { label: "Routes", value: "routes/" },
    { label: "Safaris", value: "safaris/" },
    { label: "Destinations", value: "destinations/" },
    { label: "Blog", value: "blog/" },
    { label: "Uploads", value: "uploads/" },
    { label: "Day Trips", value: "daytrips/" },
    { label: "General", value: "general/" },
  ];

  const fetchItems = useCallback(
    async (append = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: "60",
        });
        if (prefix) params.set("prefix", prefix);
        if (search) params.set("search", search);
        if (append && nextToken) params.set("token", nextToken);

        const res = await fetch(`/api/admin/media/r2-browse?${params}`);
        const data = await res.json();

        if (append) {
          setItems((prev) => [...prev, ...data.items]);
        } else {
          setItems(data.items);
        }
        setNextToken(data.nextToken);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to browse R2:", error);
      } finally {
        setLoading(false);
      }
    },
    [prefix, search, nextToken]
  );

  useEffect(() => {
    if (open) {
      setItems([]);
      setNextToken(undefined);
      setSelectedUrls(new Set());
      fetchItems();
    }
  }, [open, prefix]);

  // Debounce search
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setNextToken(undefined);
      fetchItems();
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleSelect = (url: string) => {
    if (multiple) {
      const newSet = new Set(selectedUrls);
      if (newSet.has(url)) {
        newSet.delete(url);
      } else {
        newSet.add(url);
      }
      setSelectedUrls(newSet);
    } else {
      onSelect(url);
      onClose();
    }
  };

  const handleConfirmMulti = () => {
    if (selectedUrls.size > 0 && onMultiSelect) {
      onMultiSelect(Array.from(selectedUrls));
    }
    onClose();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold">Browse R2 Images</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search + Folder Filter */}
        <div className="p-4 border-b space-y-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search images by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PREFIXES.map((p) => (
              <button
                key={p.value}
                onClick={() => {
                  setPrefix(p.value);
                  setNextToken(undefined);
                }}
                className={clsx(
                  "px-3 py-1 text-sm rounded-full border transition-colors",
                  prefix === p.value
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && items.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No images found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleSelect(item.url)}
                    className={clsx(
                      "relative group rounded-lg border-2 overflow-hidden text-left transition-all",
                      selectedUrls.has(item.url)
                        ? "border-amber-500 ring-2 ring-amber-200"
                        : "border-transparent hover:border-slate-300"
                    )}
                  >
                    {/* Image */}
                    <div className="aspect-square bg-slate-100">
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Selected check */}
                    {selectedUrls.has(item.url) && (
                      <div className="absolute top-1.5 right-1.5 p-0.5 bg-amber-500 rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Tracked badge */}
                    <div
                      className={clsx(
                        "absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium",
                        item.isTracked
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {item.isTracked ? (
                        <Link2 className="w-3 h-3 inline" />
                      ) : (
                        <Link2Off className="w-3 h-3 inline" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-1.5">
                      <p className="text-[11px] text-slate-700 truncate">
                        {item.filename}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatSize(item.size)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => fetchItems(true)}
                    disabled={loading}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    ) : null}
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {multiple && (
          <div className="flex items-center justify-between p-4 border-t bg-slate-50 flex-shrink-0">
            <span className="text-sm text-slate-500">
              {selectedUrls.size} image{selectedUrls.size !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMulti}
                disabled={selectedUrls.size === 0}
                className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                Add {selectedUrls.size} Image{selectedUrls.size !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
