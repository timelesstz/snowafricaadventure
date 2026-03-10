"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import type { ThemeSettings, LogoSettings } from "@/lib/theme";

// Re-export types for existing consumers
export type { ThemeSettings, LogoSettings } from "@/lib/theme";
export { generateThemeCSS } from "@/lib/theme";

interface ThemeContextType {
  theme: ThemeSettings | null;
  logo: LogoSettings;
  isLoading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  logo: { logoUrl: null, logoDarkUrl: null },
  isLoading: true,
  refreshTheme: async () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyThemeToDOM(theme: ThemeSettings) {
  const root = document.documentElement;

  // Primary colors
  root.style.setProperty("--primary", theme.primaryColor);
  root.style.setProperty("--primary-dark", theme.primaryDark);
  root.style.setProperty("--primary-light", theme.primaryLight);

  // Secondary colors
  root.style.setProperty("--secondary", theme.secondaryColor);
  root.style.setProperty("--secondary-dark", theme.secondaryDark);
  root.style.setProperty("--secondary-light", theme.secondaryLight);

  // Accent colors
  root.style.setProperty("--accent", theme.accentColor);
  root.style.setProperty("--accent-light", theme.accentLight);

  // Neutral colors
  root.style.setProperty("--background", theme.backgroundColor);
  root.style.setProperty("--foreground", theme.foregroundColor);
  root.style.setProperty("--surface", theme.surfaceColor);
  root.style.setProperty("--muted", theme.mutedColor);
  root.style.setProperty("--border", theme.borderColor);

  // Text colors
  root.style.setProperty("--text", theme.textColor);
  root.style.setProperty("--text-muted", theme.textMuted);
  root.style.setProperty("--text-light", theme.textLight);

  // Border radius
  root.style.setProperty("--radius", theme.borderRadius);
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeSettings | null;
  initialLogo?: LogoSettings | null;
}

export function ThemeProvider({ children, initialTheme, initialLogo }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeSettings | null>(initialTheme || null);
  const [logo, setLogo] = useState<LogoSettings>(initialLogo || { logoUrl: null, logoDarkUrl: null });
  const [isLoading, setIsLoading] = useState(!initialTheme);

  const fetchTheme = async () => {
    try {
      const [themeRes, logoRes] = await Promise.all([
        fetch("/api/theme", { cache: "no-store" }),
        fetch("/api/site-settings/logo", { cache: "no-store" }),
      ]);
      if (themeRes.ok) {
        const data = await themeRes.json();
        setTheme(data);
        applyThemeToDOM(data);
      }
      if (logoRes.ok) {
        const data = await logoRes.json();
        setLogo(data);
      }
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Skip initial fetch if we have server-provided data
    if (initialTheme) {
      setIsLoading(false);
      return;
    }
    fetchTheme();
  }, []);

  const refreshTheme = async () => {
    setIsLoading(true);
    await fetchTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, logo, isLoading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
