import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { generateTourOperatorSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import TawkTo from "@/components/TawkTo";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <WebVitalsReporter endpoint="/api/analytics/vitals" />
        <TawkTo />
      </body>
    </html>
  );
}
