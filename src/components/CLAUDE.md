# /src/components

> React components organized by domain and function

## Directory Structure

| Directory | Purpose |
|-----------|---------|
| `ui/` | Reusable primitives (Button, Badge, Accordion, Breadcrumbs, QuickFacts) |
| `layout/` | Header, Footer, Navigation, page layouts |
| `admin/` | Admin dashboard components (see `admin/CLAUDE.md`) |
| `forms/` | Booking and inquiry forms with Zod validation |
| `cards/` | Tour cards, blog cards, destination cards |
| `routes/` | Trekking route page components (Hero, Itinerary, PriceTable) |
| `tours/` | Safari tour page components |
| `departures/` | Group departure display components |
| `blog/` | Blog post components |
| `reviews/` | Testimonial and review components |
| `seo/` | JSON-LD structured data components |
| `analytics/` | Google Analytics wrapper |
| `social/` | Social share buttons |
| `schema/` | Schema.org structured data |

## Patterns

- **Barrel exports**: Most directories have `index.ts` for clean imports
- **Server-first**: Default to Server Components, add `"use client"` only for interactivity
- **Colocated styles**: Tailwind classes inline, no separate CSS files

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Header` | `layout/Header.tsx` | Site navigation with mobile menu |
| `Footer` | `layout/Footer.tsx` | Site footer with links |
| `FaqAccordion` | `ui/FaqAccordion.tsx` | Expandable FAQ sections |
| `Breadcrumbs` | `ui/Breadcrumbs.tsx` | Navigation breadcrumbs |
| `TawkTo` | `TawkTo.tsx` | Live chat widget integration |
| `theme-provider` | `theme-provider.tsx` | CSS variable theming |

## Dependencies

- **Imports from**: `@/lib/utils`, `@/lib/prisma`, `@/lib/schemas`
- **Used by**: `src/app/` pages

<!-- CUSTOM_NOTES_START -->
<!-- CUSTOM_NOTES_END -->
