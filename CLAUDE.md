# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Snow Africa Adventure — a safari and Kilimanjaro trekking booking platform built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Prisma 7 (PostgreSQL via Accelerate), and NextAuth v5.

## Commands

```bash
# Development
npm run dev                # Start dev server (port 3000)
npm run build              # Production build
npm run lint               # ESLint

# Testing
npm test                   # Vitest watch mode
npm run test:run           # Vitest single run
npm run test:coverage      # Vitest with coverage
npm run test:e2e           # Playwright headless
npm run test:e2e:ui        # Playwright with UI
npm run test:e2e:headed    # Playwright with visible browser

# Database
npm run db:push            # Push Prisma schema (no migration)
npm run db:studio          # Open Prisma Studio GUI
npm run db:seed            # Seed dev data
npm run db:seed:production # Seed production data
npm run db:seed:admin      # Create admin user

# Deployment
npm run pre-deploy         # All pre-deployment checks
npm run verify:urls        # Verify URLs work
```

## Architecture

### Route Groups (App Router)

- `src/app/(site)/` — Public website: safaris, trekking routes, destinations, day trips, blog, booking forms
- `src/app/(admin)/admin/` — Admin dashboard: CRUD for all content, bookings, inquiries, partners, commissions, media library, 404 monitor, redirects
- `src/app/api/` — API routes: admin endpoints (protected), public booking/inquiry/search endpoints, cron jobs, health check

### Auth & Roles

NextAuth v5 (beta.30) with Credentials provider. Role hierarchy: `SUPER_ADMIN > ADMIN > EDITOR > VIEWER`. Middleware (`src/middleware.ts`) enforces route-level permissions via `ROUTE_PERMISSIONS` map and redirects unauthenticated users to `/admin/login/`.

### Data Layer

- **Prisma Client** with Accelerate connection pooling — singleton in `src/lib/prisma.ts`
- **Must use** `DATABASE_URL_ACCELERATE` (not plain DATABASE_URL)
- **30+ models** covering: content (TrekkingRoute, SafariPackage, Destination, DayTrip, BlogPost), bookings (GroupDeparture, Booking, Inquiry), commerce (Partner, Commission, CommissionPayout), and system (Media, Redirect, NotFoundUrl, Notification, EmailLog)

### Key Libraries

- `src/lib/auth.ts` — NextAuth config, session helpers, `requireRole()`
- `src/lib/prisma.ts` — Prisma singleton
- `src/lib/schemas.ts` — Zod validation (inquirySchema, contactSchema, groupBookingSchema, tailorMadeSchema)
- `src/lib/email/` — Resend (primary) + Nodemailer (fallback), typed templates
- `src/lib/r2.ts` — Cloudflare R2 storage (S3-compatible) with pre-signed URLs
- `src/lib/commission.ts` — Auto-creates commissions on booking creation
- `src/lib/constants.ts` — SITE_CONFIG with site metadata

### Component Organization

- `src/components/ui/` — Reusable primitives (Button, Badge, Accordion, Breadcrumbs)
- `src/components/layout/` — Header, Footer, Navigation
- `src/components/admin/` — Admin dashboard components (sidebar, media uploader, CRUD tables)
- `src/components/forms/` — Booking and inquiry forms
- `src/components/cards/` — Tour/testimonial cards
- Domain-specific: `tours/`, `routes/`, `departures/`, `blog/`, `reviews/`, `seo/`, `analytics/`

### Patterns

- **Server Components by default** — only use `"use client"` for interactive parts
- **Trailing slashes enabled** in `next.config.ts` (WordPress migration compatibility)
- **Path alias:** `@/*` maps to `./src/*`
- **Fonts:** Outfit (headings, `--font-outfit`), Sora (body, `--font-sora`)
- **Image pipeline:** Next.js Image + Sharp compression + R2 CDN (`cdn.snowafricaadventure.com`)
- **Theme system:** ThemeSetting model stores brand colors, exposed as CSS variables
- **Cron:** `/api/cron/departures` runs daily at 3 AM UTC (Vercel Cron) for departure auto-rotation

### Testing

- **Unit tests:** Vitest + @testing-library/react in `src/__tests__/`
- **E2E tests:** Playwright in `e2e/` — Chromium + iPhone 13 mobile
- **Playwright auto-starts** dev server via config

## Environment Variables

**Required:** `DATABASE_URL_ACCELERATE`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`, `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `CRON_SECRET`

**Optional:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

## Deployment

Deployed on **Vercel**. After deploy: push Prisma schema (`db:push`), seed production data, create admin user, configure Vercel cron, set up Cloudflare R2 CDN and domain DNS.
