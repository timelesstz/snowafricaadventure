# /src/lib

> Core utilities, services, and shared logic for the application

## Key Files

| File | Purpose |
|------|---------|
| `prisma.ts` | Prisma singleton with Accelerate connection pooling |
| `auth.ts` | NextAuth v5 config, `requireRole()` helper |
| `auth-types.ts` | Role enum, session types, permission maps |
| `schemas.ts` | Zod validation (inquiry, contact, booking forms) |
| `r2.ts` | Cloudflare R2 storage with pre-signed URLs |
| `commission.ts` | Auto-creates commissions on booking creation |
| `constants.ts` | `SITE_CONFIG` with site metadata |
| `seo.ts` | SEO helpers, meta tag generation |
| `utils.ts` | `cn()` classname merger, formatters |
| `countries.ts` | Country list with codes for forms |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `email/` | Resend (primary) + Nodemailer (fallback), typed templates |
| `notifications/` | In-app notification system |
| `services/` | Business logic (departure rotation) |
| `analytics/` | Analytics helpers |

## Email System (`email/`)

- `index.ts` — Nodemailer SMTP transport, `sendEmail()`, `sendAdminNotification()`
- `send.ts` — Resend API wrapper (primary provider)
- `templates.ts` — HTML email templates for all notification types
- `logger.ts` — Email logging to database

**Pattern**: Try Resend first, fall back to Nodemailer SMTP

## Dependencies

- **Used by**: All API routes, server components, middleware
- **Imports from**: `@prisma/client`, `next-auth`, `zod`, `resend`

<!-- CUSTOM_NOTES_START -->
<!-- CUSTOM_NOTES_END -->
