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

/** Departure dates and seats appear on the join page and on route pages. */
export function revalidateDeparturePages() {
  revalidatePath("/kilimanjaro-join-group-departures/");
  revalidateRoutePages();
}
