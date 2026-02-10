"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";

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

interface LogoSettings {
  logoUrl: string | null;
  logoDarkUrl: string | null;
}

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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [logo, setLogo] = useState<LogoSettings>({ logoUrl: null, logoDarkUrl: null });
  const [isLoading, setIsLoading] = useState(true);

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
