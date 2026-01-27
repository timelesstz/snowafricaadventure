"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

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

export default function ThemeSettingsPage() {
  const { refreshTheme } = useTheme();
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchTheme();
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

  const handleSave = async () => {
    if (!theme) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Theme saved successfully! Changes are now live." });
        await refreshTheme();
      } else {
        setMessage({ type: "error", text: "Failed to save theme settings." });
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
