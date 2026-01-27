"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const TRUSTINDEX_WIDGET_ID = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID;

export type TripAdvisorWidgetVariant = "full" | "compact" | "badge" | "slider";

interface TripAdvisorWidgetProps {
  /**
   * Widget display variant
   * - full: Full widget with reviews
   * - compact: Smaller widget with fewer reviews
   * - badge: Rating badge only
   * - slider: Carousel/slider display
   */
  variant?: TripAdvisorWidgetVariant;
  /**
   * Optional custom widget ID (overrides env variable)
   * Get this from your Trustindex dashboard
   */
  widgetId?: string;
  /**
   * Custom CSS class for the container
   */
  className?: string;
}

/**
 * TripAdvisor Reviews Widget powered by Trustindex
 *
 * Setup Instructions:
 * 1. Create a free account at https://www.trustindex.io/
 * 2. Connect your TripAdvisor listing
 * 3. Customize your widget in the Trustindex dashboard
 * 4. Copy the widget ID and add to .env.local:
 *    NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID=your-widget-id
 *
 * @example
 * // Full widget on homepage
 * <TripAdvisorWidget variant="full" />
 *
 * // Compact badge in footer
 * <TripAdvisorWidget variant="badge" className="my-4" />
 */
export function TripAdvisorWidget({
  variant = "full",
  widgetId,
  className = "",
}: TripAdvisorWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const activeWidgetId = widgetId || TRUSTINDEX_WIDGET_ID;

  useEffect(() => {
    // Reinitialize widget when component mounts (for client-side navigation)
    if (isLoaded && typeof window !== "undefined" && window.Trustindex) {
      window.Trustindex.init();
    }
  }, [isLoaded]);

  if (!activeWidgetId) {
    // Show placeholder in development if widget ID not configured
    if (process.env.NODE_ENV === "development") {
      return (
        <div className={`bg-amber-50 border border-amber-200 rounded-lg p-6 text-center ${className}`}>
          <p className="text-amber-800 font-medium">TripAdvisor Widget Placeholder</p>
          <p className="text-amber-600 text-sm mt-2">
            Set NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID in .env.local to display the widget.
          </p>
          <p className="text-amber-500 text-xs mt-2">
            Get your widget ID from{" "}
            <a
              href="https://www.trustindex.io/widgets/tripadvisor-reviews-widget/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Trustindex
            </a>
          </p>
        </div>
      );
    }
    return null;
  }

  // Container classes based on variant
  const variantClasses = {
    full: "tripadvisor-widget-full",
    compact: "tripadvisor-widget-compact",
    badge: "tripadvisor-widget-badge",
    slider: "tripadvisor-widget-slider",
  };

  return (
    <div className={`tripadvisor-widget ${variantClasses[variant]} ${className}`}>
      {/* Trustindex Widget Container */}
      <div
        className="trustindex-widget"
        data-widget-id={activeWidgetId}
        data-no-script="1"
      />

      {/* Load Trustindex Script */}
      <Script
        id="trustindex-widget-script"
        strategy="lazyOnload"
        src={`https://cdn.trustindex.io/loader.js?${activeWidgetId}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

// Type declaration for Trustindex global
declare global {
  interface Window {
    Trustindex?: {
      init: () => void;
    };
  }
}

export default TripAdvisorWidget;
