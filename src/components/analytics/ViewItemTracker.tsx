"use client";

import { useEffect, useRef } from "react";
import { trackViewItem } from "@/lib/analytics";

interface ViewItemTrackerProps {
  itemId: string;
  itemName: string;
  itemCategory: "safari" | "kilimanjaro" | "daytrip" | "zanzibar";
  price?: number;
}

/**
 * Client component that tracks view_item event when mounted.
 * Use on detail pages to track product/tour views for e-commerce analytics.
 */
export function ViewItemTracker({
  itemId,
  itemName,
  itemCategory,
  price,
}: ViewItemTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per mount
    if (tracked.current) return;
    tracked.current = true;

    trackViewItem({
      itemId,
      itemName,
      itemCategory,
      price,
    });
  }, [itemId, itemName, itemCategory, price]);

  // This component renders nothing
  return null;
}
