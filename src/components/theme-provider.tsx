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

interface ThemeContextType {
  theme: ThemeSettings | null;
  isLoading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchTheme = async () => {
    try {
      const response = await fetch("/api/theme", {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setTheme(data);
        applyThemeToDOM(data);
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
    <ThemeContext.Provider value={{ theme, isLoading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
