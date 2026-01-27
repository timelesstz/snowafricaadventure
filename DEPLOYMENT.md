# Deployment Guide - Snow Africa Adventure

## Pre-Deployment Status

✅ All checks passed:
- Build successful
- 28/28 tests passing
- 0 ESLint errors
- 19 redirects configured
- Trailing slash enabled (WordPress compatibility)
- Sitemap and robots.txt configured
- Cron job configured

## Vercel Deployment

### 1. Connect Repository

```bash
# If not already connected to Vercel
npx vercel link
```

### 2. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

**Required:**
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Neon/Supabase) |
| `NEXTAUTH_URL` | `https://snowafricaadventure.com` |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `R2_ENDPOINT` | Cloudflare R2 endpoint |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_BUCKET_NAME` | `snowafrica` |
| `R2_PUBLIC_URL` | `https://cdn.snowafricaadventure.com` |
| `RESEND_API_KEY` | Resend API key for emails |
| `NOTIFICATION_EMAIL` | `info@snowafricaadventure.com` |
| `CRON_SECRET` | Generate with `openssl rand -base64 32` |

**Optional:**
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `SENTRY_DSN` | Sentry error tracking |

### 3. Deploy

```bash
# Deploy to production
npx vercel --prod

# Or push to main branch for auto-deploy
git push origin main
```

### 4. Post-Deployment

1. **Verify URLs work:**
   - https://snowafricaadventure.com/
   - https://snowafricaadventure.com/trekking/
   - https://snowafricaadventure.com/tanzania-safaris/
   - https://snowafricaadventure.com/climbing-kilimanjaro/

2. **Verify redirects:**
   - https://snowafricaadventure.com/terms-conditions/ → /terms-and-conditions/
   - https://snowafricaadventure.com/cart/ → /

3. **Run database seed (if new database):**
   ```bash
   # Push schema to database
   npx prisma db push

   # Seed production data
   npm run db:seed:production

   # Create admin user
   npm run db:seed:admin
   ```

4. **Verify cron job:**
   - Check Vercel Dashboard → Crons
   - Should see `/api/cron/departures` running daily at 3:00 AM UTC

## Domain Configuration

### DNS Settings

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Cloudflare R2 (CDN)

Configure `cdn.snowafricaadventure.com` to point to R2 bucket.

## Rollback

```bash
# List recent deployments
npx vercel ls

# Rollback to previous deployment
npx vercel rollback
```

## Monitoring

- **Vercel Analytics:** Enabled by default
- **Error Tracking:** Configure Sentry if needed
- **Uptime:** Use Vercel's built-in monitoring

## Quick Commands

```bash
# Pre-deploy check
npm run pre-deploy

# Build locally
npm run build

# Run tests
npm run test:run

# Check ESLint
npm run lint

# Verify URLs
npm run verify:urls
```
