"use client";

import { useState, useCallback } from "react";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "@/lib/cms/config";
import { Save, Eye, ArrowLeft, Globe, FileText } from "lucide-react";
import Link from "next/link";

interface PuckEditorWrapperProps {
  pageId: string;
  pageTitle: string;
  pageSlug: string;
  pageStatus: string;
  initialData: Data;
}

export function PuckEditorWrapper({
  pageId,
  pageTitle,
  pageSlug,
  pageStatus,
  initialData,
}: PuckEditorWrapperProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState(pageStatus);

  const handleSave = useCallback(
    async (data: Data) => {
      setSaving(true);
      setSaved(false);

      try {
        const response = await fetch(`/api/admin/pages/${pageId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ puckData: data }),
        });

        if (response.ok) {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      } catch (error) {
        console.error("Failed to save:", error);
      } finally {
        setSaving(false);
      }
    },
    [pageId]
  );

  const handlePublish = useCallback(async () => {
    const newStatus = status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const response = await fetch(`/api/admin/pages/${pageId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }, [pageId, status]);

  return (
    <div className="h-screen flex flex-col -m-6">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages/"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-semibold text-slate-900">{pageTitle}</h1>
            <p className="text-xs text-slate-400 font-mono">/p/{pageSlug}/</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              status === "PUBLISHED"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-sm text-green-600 font-medium">Saved!</span>
          )}
          <Link
            href={`/p/${pageSlug}/`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Link>
          <button
            onClick={handlePublish}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              status === "PUBLISHED"
                ? "text-amber-700 border-amber-200 hover:bg-amber-50"
                : "text-green-700 border-green-200 hover:bg-green-50"
            }`}
          >
            {status === "PUBLISHED" ? (
              <>
                <FileText className="w-4 h-4" />
                Unpublish
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                Publish
              </>
            )}
          </button>
          <button
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          config={puckConfig}
          data={initialData || { content: [], root: {} }}
          onPublish={handleSave}
        />
      </div>
    </div>
  );
}
