export type MediaUsageType =
  | "route"
  | "safari"
  | "destination"
  | "daytrip"
  | "blog"
  | "review"
  | "page"
  | "cmspage"
  | "pagehero"
  | "homepage";

export interface MediaUsage {
  type: MediaUsageType;
  recordId: string;
  title: string;
  field: string;
  adminUrl: string;
  publicUrl: string | null;
}

const ADMIN_EDIT_PATHS: Record<MediaUsageType, (id: string, slug?: string) => string> = {
  route: (id) => `/admin/routes/${id}/`,
  safari: (id) => `/admin/safaris/${id}/`,
  destination: (id) => `/admin/destinations/${id}/`,
  daytrip: (id) => `/admin/day-trips/${id}/`,
  blog: (id) => `/admin/blog/${id}/`,
  review: (id) => `/admin/reviews/${id}/`,
  page: () => `/admin/pages/`,
  cmspage: (id) => `/admin/pages/${id}/`,
  pagehero: (_id, slug) => (slug ? `/admin/heroes/${slug}/` : `/admin/heroes/`),
  homepage: () => `/admin/homepage/`,
};

const PUBLIC_URL_BUILDERS: Record<MediaUsageType, (slug: string) => string | null> = {
  route: (s) => `/trekking/${s}/`,
  safari: (s) => `/tanzania-safaris/${s}/`,
  destination: (s) => `/tanzania-destinations/${s}/`,
  daytrip: (s) => `/tanzania-day-tours/${s}/`,
  blog: (s) => `/${s}/`,
  cmspage: (s) => `/${s}/`,
  page: (s) => `/${s}/`,
  pagehero: (s) => `/${s}/`,
  homepage: () => `/`,
  review: () => null,
};

export function buildUsage(
  type: MediaUsageType,
  recordId: string,
  title: string,
  field: string,
  slug?: string | null
): MediaUsage {
  const effectiveSlug = slug ?? undefined;
  return {
    type,
    recordId,
    title,
    field,
    adminUrl: ADMIN_EDIT_PATHS[type](recordId, effectiveSlug),
    publicUrl: effectiveSlug ? PUBLIC_URL_BUILDERS[type](effectiveSlug) : null,
  };
}
