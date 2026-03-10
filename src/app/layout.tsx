import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { generateTourOperatorSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { generateThemeCSS, DEFAULT_THEME } from "@/lib/theme";
import type { ThemeSettings, LogoSettings } from "@/lib/theme";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import TawkTo from "@/components/TawkTo";
import { prisma } from "@/lib/prisma";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

async function getThemeAndLogo(): Promise<{ theme: ThemeSettings; logo: LogoSettings }> {
  try {
    const [dbTheme, logoSettings] = await Promise.all([
      prisma.themeSetting.findFirst({ where: { isActive: true } }),
      prisma.siteSetting.findMany({
        where: { key: { in: ["site.logoUrl", "site.logoDarkUrl"] } },
      }),
    ]);

    const theme: ThemeSettings = dbTheme
      ? (dbTheme as unknown as ThemeSettings)
      : DEFAULT_THEME;

    const logoMap: Record<string, string> = {};
    logoSettings.forEach((s) => { logoMap[s.key] = s.value; });

    return {
      theme,
      logo: {
        logoUrl: logoMap["site.logoUrl"] || null,
        logoDarkUrl: logoMap["site.logoDarkUrl"] || null,
      },
    };
  } catch (error) {
    console.error("Failed to fetch theme server-side:", error);
    return {
      theme: DEFAULT_THEME,
      logo: { logoUrl: null, logoDarkUrl: null },
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, logo } = await getThemeAndLogo();
  const themeCSS = generateThemeCSS(theme);

  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        {/* Inject theme CSS variables server-side to prevent CLS */}
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        {/* Preconnect to CDN for faster image loading */}
        <link rel="preconnect" href="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev" />
        {/* Preload hero image for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateTourOperatorSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GoogleAnalytics />
        <ThemeProvider initialTheme={theme} initialLogo={logo}>
          {children}
        </ThemeProvider>
        <WebVitalsReporter endpoint="/api/analytics/vitals" />
        <TawkTo />
      </body>
    </html>
  );
}
