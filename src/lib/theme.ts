// Shared theme types and utilities — importable from both server and client components

export interface ThemeSettings {
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

export interface LogoSettings {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  certificationLogos: { url: string; alt: string }[];
}

/**
 * Theme values are rendered inside a <style> tag. Drop anything that could close
 * the declaration, the rule or the tag itself, and fall back to the default.
 */
function safeCssValue(value: string | null | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const v = value.trim();
  if (!v || v.length > 100 || /[<>{};"'\\]/.test(v)) return fallback;
  return v;
}

/**
 * Generate inline CSS string from theme settings (for SSR injection)
 */
export function generateThemeCSS(theme: ThemeSettings): string {
  return `:root {
  --primary: ${safeCssValue(theme.primaryColor, DEFAULT_THEME.primaryColor)};
  --primary-dark: ${safeCssValue(theme.primaryDark, DEFAULT_THEME.primaryDark)};
  --primary-light: ${safeCssValue(theme.primaryLight, DEFAULT_THEME.primaryLight)};
  --secondary: ${safeCssValue(theme.secondaryColor, DEFAULT_THEME.secondaryColor)};
  --secondary-dark: ${safeCssValue(theme.secondaryDark, DEFAULT_THEME.secondaryDark)};
  --secondary-light: ${safeCssValue(theme.secondaryLight, DEFAULT_THEME.secondaryLight)};
  --accent: ${safeCssValue(theme.accentColor, DEFAULT_THEME.accentColor)};
  --accent-light: ${safeCssValue(theme.accentLight, DEFAULT_THEME.accentLight)};
  --background: ${safeCssValue(theme.backgroundColor, DEFAULT_THEME.backgroundColor)};
  --foreground: ${safeCssValue(theme.foregroundColor, DEFAULT_THEME.foregroundColor)};
  --surface: ${safeCssValue(theme.surfaceColor, DEFAULT_THEME.surfaceColor)};
  --muted: ${safeCssValue(theme.mutedColor, DEFAULT_THEME.mutedColor)};
  --border: ${safeCssValue(theme.borderColor, DEFAULT_THEME.borderColor)};
  --text: ${safeCssValue(theme.textColor, DEFAULT_THEME.textColor)};
  --text-muted: ${safeCssValue(theme.textMuted, DEFAULT_THEME.textMuted)};
  --text-light: ${safeCssValue(theme.textLight, DEFAULT_THEME.textLight)};
  --radius: ${safeCssValue(theme.borderRadius, DEFAULT_THEME.borderRadius)};
}`;
}

// Default theme fallback
export const DEFAULT_THEME: ThemeSettings = {
  id: "default",
  name: "Modern Adventure",
  description: "Clean slate grays with warm amber accents",
  primaryColor: "#d97706",
  primaryDark: "#b45309",
  primaryLight: "#fef3c7",
  secondaryColor: "#059669",
  secondaryDark: "#047857",
  secondaryLight: "#d1fae5",
  accentColor: "#f59e0b",
  accentLight: "#fef3c7",
  backgroundColor: "#ffffff",
  foregroundColor: "#0f172a",
  surfaceColor: "#f8fafc",
  mutedColor: "#f1f5f9",
  borderColor: "#e2e8f0",
  textColor: "#1e293b",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  headingFont: "Outfit",
  bodyFont: "Sora",
  borderRadius: "0.75rem",
};
