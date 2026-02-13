"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { Upload, X, Loader2 } from "lucide-react";

interface ThemeSettings {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  primaryDark: string;
  primaryLight: string;
  secondaryColor: string;
  secondaryDark: string;
  secondaryLight: string;
  accentColor: string;
  accentLight: string;
  backgroundColor: string;
  foregroundColor: string;
  surfaceColor: string;
  mutedColor: string;
  borderColor: string;
  textColor: string;
  textMuted: string;
  textLight: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
}

const fontOptions = [
  { value: "Outfit", label: "Outfit" },
  { value: "Inter", label: "Inter" },
  { value: "Sora", label: "Sora" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "Poppins", label: "Poppins" },
  { value: "Fraunces", label: "Fraunces" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond" },
  { value: "Playfair Display", label: "Playfair Display" },
];

const radiusOptions = [
  { value: "0", label: "None (0)" },
  { value: "0.25rem", label: "Small (0.25rem)" },
  { value: "0.5rem", label: "Medium (0.5rem)" },
  { value: "0.75rem", label: "Large (0.75rem)" },
  { value: "1rem", label: "XL (1rem)" },
  { value: "1.5rem", label: "2XL (1.5rem)" },
];

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer overflow-hidden"
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-[var(--text)]">{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs text-[var(--text-muted)] bg-transparent border-none p-0 w-24 focus:outline-none uppercase"
        />
      </div>
    </div>
  );
}

function LogoUploadInput({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "branding");
      formData.append("compress", "true");

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.media.url);
    } catch {
      alert("Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text)] mb-2">{label}</label>
      <p className="text-xs text-[var(--text-muted)] mb-3">{description}</p>
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="w-40 h-20 border border-[var(--border)] rounded-lg flex items-center justify-center bg-white overflow-hidden shrink-0">
          {value ? (
            <Image src={value} alt={label} width={160} height={80} className="object-contain w-full h-full p-2" />
          ) : (
            <span className="text-xs text-[var(--text-muted)]">No logo</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/svg+xml,image/webp,image/jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              if (fileRef.current) fileRef.current.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          )}
          {/* Manual URL input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL..."
            className="px-3 py-1.5 text-xs border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] w-64"
          />
        </div>
      </div>
    </div>
  );
}

function FaviconUploadInput({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "branding");
      formData.append("compress", "false"); // Don't compress favicons

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.media.url);
    } catch {
      alert("Failed to upload favicon");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text)] mb-2">{label}</label>
      <p className="text-xs text-[var(--text-muted)] mb-3">{description}</p>
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="w-16 h-16 border border-[var(--border)] rounded-lg flex items-center justify-center bg-white overflow-hidden shrink-0">
          {value ? (
            <Image src={value} alt={label} width={64} height={64} className="object-contain w-full h-full p-1" />
          ) : (
            <span className="text-xs text-[var(--text-muted)] text-center">No icon</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/x-icon,image/ico,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              if (fileRef.current) fileRef.current.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          )}
          {/* Manual URL input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL..."
            className="px-3 py-1.5 text-xs border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] w-64"
          />
        </div>
      </div>
    </div>
  );
}

export default function ThemeSettingsPage() {
  const { refreshTheme } = useTheme();
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoDarkUrl, setLogoDarkUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [appleTouchIconUrl, setAppleTouchIconUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchTheme();
    fetchLogo();
    fetchFavicon();
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await fetch("/api/theme");
      if (response.ok) {
        const data = await response.json();
        setTheme(data);
      }
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLogo = async () => {
    try {
      const res = await fetch("/api/site-settings/logo");
      if (res.ok) {
        const data = await res.json();
        setLogoUrl(data.logoUrl || "");
        setLogoDarkUrl(data.logoDarkUrl || "");
      }
    } catch (error) {
      console.error("Failed to fetch logo:", error);
    }
  };

  const fetchFavicon = async () => {
    try {
      const res = await fetch("/api/site-settings/favicon");
      if (res.ok) {
        const data = await res.json();
        setFaviconUrl(data.faviconUrl || "");
        setAppleTouchIconUrl(data.appleTouchIconUrl || "");
      }
    } catch (error) {
      console.error("Failed to fetch favicon:", error);
    }
  };

  const handleSave = async () => {
    if (!theme) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const [themeRes, logoRes, faviconRes] = await Promise.all([
        fetch("/api/theme", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(theme),
        }),
        fetch("/api/site-settings/logo", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ logoUrl, logoDarkUrl }),
        }),
        fetch("/api/site-settings/favicon", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ faviconUrl, appleTouchIconUrl }),
        }),
      ]);

      if (themeRes.ok && logoRes.ok && faviconRes.ok) {
        setMessage({ type: "success", text: "Theme, logo, and favicon saved successfully! Changes are now live." });
        await refreshTheme();
      } else {
        setMessage({ type: "error", text: "Failed to save some settings." });
      }
    } catch (error) {
      console.error("Failed to save theme:", error);
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  const updateTheme = (key: keyof ThemeSettings, value: string) => {
    if (!theme) return;
    setTheme({ ...theme, [key]: value });
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--secondary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="p-8">
        <div className="text-red-500">Failed to load theme settings.</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] font-heading">
            Theme Settings
          </h1>
          <p className="text-[var(--text-muted)] mt-1">
            Customize your website&apos;s colors, fonts, and styling
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[var(--secondary)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-dark)] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Theme Name & Description */}
      <div className="bg-white rounded-xl p-6 border border-[var(--border)] mb-6">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Theme Identity</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Theme Name
            </label>
            <input
              type="text"
              value={theme.name}
              onChange={(e) => updateTheme("name", e.target.value)}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Description
            </label>
            <input
              type="text"
              value={theme.description}
              onChange={(e) => updateTheme("description", e.target.value)}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Logo Settings */}
      <div className="bg-white rounded-xl p-6 border border-[var(--border)] mb-6">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-1">Site Logo</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Upload your logo images. Recommended: PNG or SVG with transparent background, at least 400px wide.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LogoUploadInput
            label="Primary Logo"
            description="Displayed in the header and footer on light backgrounds."
            value={logoUrl}
            onChange={setLogoUrl}
          />
          <LogoUploadInput
            label="Dark Background Logo"
            description="Used in the footer or dark sections. Leave empty to use the primary logo."
            value={logoDarkUrl}
            onChange={setLogoDarkUrl}
          />
        </div>
        {/* Logo Preview */}
        {logoUrl && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <h3 className="text-sm font-medium text-[var(--text)] mb-3">Preview</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-[var(--border)] rounded-lg">
                <Image src={logoUrl} alt="Logo on light" width={120} height={40} className="object-contain h-10 w-auto" />
                <span className="text-xs text-[var(--text-muted)]">Light bg</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg">
                <Image src={logoDarkUrl || logoUrl} alt="Logo on dark" width={120} height={40} className="object-contain h-10 w-auto" />
                <span className="text-xs text-slate-400">Dark bg</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Favicon Settings */}
      <div className="bg-white rounded-xl p-6 border border-[var(--border)] mb-6">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-1">Favicon</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Upload your favicon (browser tab icon). Recommended: PNG or ICO, 32x32 pixels minimum. For Apple devices, use 180x180 pixels.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FaviconUploadInput
            label="Favicon"
            description="Displayed in browser tabs. Use 32x32 or 64x64 PNG/ICO."
            value={faviconUrl}
            onChange={setFaviconUrl}
          />
          <FaviconUploadInput
            label="Apple Touch Icon"
            description="For iOS home screen. Use 180x180 PNG."
            value={appleTouchIconUrl}
            onChange={setAppleTouchIconUrl}
          />
        </div>
        {/* Favicon Preview */}
        {faviconUrl && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <h3 className="text-sm font-medium text-[var(--text)] mb-3">Preview</h3>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center overflow-hidden bg-white">
                  <Image src={faviconUrl} alt="Favicon" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-xs text-[var(--text-muted)]">Browser tab</span>
              </div>
              {appleTouchIconUrl && (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl border border-[var(--border)] flex items-center justify-center overflow-hidden bg-white">
                    <Image src={appleTouchIconUrl} alt="Apple Touch Icon" width={56} height={56} className="object-contain" />
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">iOS icon</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Color Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Primary Colors */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Primary Colors</h2>
          <div className="space-y-4">
            <ColorInput
              label="Primary"
              value={theme.primaryColor}
              onChange={(v) => updateTheme("primaryColor", v)}
            />
            <ColorInput
              label="Primary Dark"
              value={theme.primaryDark}
              onChange={(v) => updateTheme("primaryDark", v)}
            />
            <ColorInput
              label="Primary Light"
              value={theme.primaryLight}
              onChange={(v) => updateTheme("primaryLight", v)}
            />
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Secondary Colors</h2>
          <div className="space-y-4">
            <ColorInput
              label="Secondary"
              value={theme.secondaryColor}
              onChange={(v) => updateTheme("secondaryColor", v)}
            />
            <ColorInput
              label="Secondary Dark"
              value={theme.secondaryDark}
              onChange={(v) => updateTheme("secondaryDark", v)}
            />
            <ColorInput
              label="Secondary Light"
              value={theme.secondaryLight}
              onChange={(v) => updateTheme("secondaryLight", v)}
            />
          </div>
        </div>

        {/* Accent Colors */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Accent Colors</h2>
          <div className="space-y-4">
            <ColorInput
              label="Accent"
              value={theme.accentColor}
              onChange={(v) => updateTheme("accentColor", v)}
            />
            <ColorInput
              label="Accent Light"
              value={theme.accentLight}
              onChange={(v) => updateTheme("accentLight", v)}
            />
          </div>
        </div>

        {/* Neutral Colors */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Neutral Colors</h2>
          <div className="space-y-4">
            <ColorInput
              label="Background"
              value={theme.backgroundColor}
              onChange={(v) => updateTheme("backgroundColor", v)}
            />
            <ColorInput
              label="Surface"
              value={theme.surfaceColor}
              onChange={(v) => updateTheme("surfaceColor", v)}
            />
            <ColorInput
              label="Border"
              value={theme.borderColor}
              onChange={(v) => updateTheme("borderColor", v)}
            />
          </div>
        </div>

        {/* Text Colors */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Text Colors</h2>
          <div className="space-y-4">
            <ColorInput
              label="Text"
              value={theme.textColor}
              onChange={(v) => updateTheme("textColor", v)}
            />
            <ColorInput
              label="Text Muted"
              value={theme.textMuted}
              onChange={(v) => updateTheme("textMuted", v)}
            />
            <ColorInput
              label="Text Light"
              value={theme.textLight}
              onChange={(v) => updateTheme("textLight", v)}
            />
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Heading Font
              </label>
              <select
                value={theme.headingFont}
                onChange={(e) => updateTheme("headingFont", e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Body Font
              </label>
              <select
                value={theme.bodyFont}
                onChange={(e) => updateTheme("bodyFont", e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Border Radius
              </label>
              <select
                value={theme.borderRadius}
                onChange={(e) => updateTheme("borderRadius", e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
              >
                {radiusOptions.map((radius) => (
                  <option key={radius.value} value={radius.value}>
                    {radius.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Live Preview</h2>
        <div
          className="p-6 rounded-xl"
          style={{ backgroundColor: theme.surfaceColor }}
        >
          <div className="flex gap-4 mb-4">
            <button
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}
            >
              Primary Button
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: theme.secondaryColor, borderRadius: theme.borderRadius }}
            >
              Secondary Button
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${theme.borderColor}`,
                color: theme.textColor,
                borderRadius: theme.borderRadius,
              }}
            >
              Outline Button
            </button>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: theme.backgroundColor,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: theme.borderRadius,
            }}
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: theme.textColor }}
            >
              Sample Card Title
            </h3>
            <p style={{ color: theme.textMuted }}>
              This is sample body text showing how your theme colors will look
              in actual content.
            </p>
            <a
              href="#"
              className="inline-block mt-2 font-semibold"
              style={{ color: theme.secondaryColor }}
            >
              Learn more &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
