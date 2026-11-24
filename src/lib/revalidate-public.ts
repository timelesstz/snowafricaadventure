import { revalidatePath } from "next/cache";

/**
 * Trekking route pages are cached for 5 minutes (`revalidate` in
 * trekking/[routeSlug]/page.tsx). Call this after any write that changes
 * what they show (route content, departures, seats taken) so the change
 * appears at once. It refreshes every route page, which also covers a slug
 * change or a delete.
 */
export function revalidateRoutePages() {
  revalidatePath("/trekking/[routeSlug]", "page");
}

/**
 * Destination pages are cached for 5 minutes too (tanzania-destinations/
 * [destSlug]/page.tsx). Refreshes every destination page and the listing.
 */
export function revalidateDestinationPages() {
  revalidatePath("/tanzania-destinations/[destSlug]", "page");
  revalidatePath("/tanzania-destinations/");
}

/** Departure dates and seats appear on the join page and on route pages. */
export function revalidateDeparturePages() {
  revalidatePath("/kilimanjaro-join-group-departures/");
  revalidateRoutePages();
}
