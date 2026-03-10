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
}

/**
 * Generate inline CSS string from theme settings (for SSR injection)
 */
export function generateThemeCSS(theme: ThemeSettings): string {
  return `:root {
  --primary: ${theme.primaryColor};
  --primary-dark: ${theme.primaryDark};
  --primary-light: ${theme.primaryLight};
  --secondary: ${theme.secondaryColor};
  --secondary-dark: ${theme.secondaryDark};
  --secondary-light: ${theme.secondaryLight};
  --accent: ${theme.accentColor};
  --accent-light: ${theme.accentLight};
  --background: ${theme.backgroundColor};
  --foreground: ${theme.foregroundColor};
  --surface: ${theme.surfaceColor};
  --muted: ${theme.mutedColor};
  --border: ${theme.borderColor};
  --text: ${theme.textColor};
  --text-muted: ${theme.textMuted};
  --text-light: ${theme.textLight};
  --radius: ${theme.borderRadius};
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
