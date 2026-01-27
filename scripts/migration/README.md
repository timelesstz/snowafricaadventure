# WordPress to Next.js Migration

This directory contains scripts to migrate content from the WordPress site (snowafricaadventure.com) to the new Next.js application.

## Migration Strategy

Since the WordPress site uses Elementor, direct REST API content extraction is limited. We use a hybrid approach:

1. **Pre-defined Data**: Routes, safaris, destinations, and day trips are manually curated from WordPress content into TypeScript data structures
2. **REST API**: Blog posts are fetched via WordPress REST API
3. **SEO Data**: Meta titles and descriptions are extracted where available

## Scripts

### Main CLI

```bash
# Show help
npx tsx scripts/migration/index.ts help

# Export WordPress content to JSON for review
npx tsx scripts/migration/index.ts export

# Run all migrations (dry run first!)
npx tsx scripts/migration/index.ts all --dry-run

# Run specific migration
npx tsx scripts/migration/index.ts routes --dry-run
npx tsx scripts/migration/index.ts blogs --dry-run

# Verify migration integrity
npx tsx scripts/migration/index.ts verify
```

### Individual Scripts

```bash
# Enhanced migration with pre-defined data
npx tsx scripts/migration/migrate-enhanced.ts --dry-run
npx tsx scripts/migration/migrate-enhanced.ts --type=routes
npx tsx scripts/migration/migrate-enhanced.ts --type=safaris

# Blog post migration from REST API
npx tsx scripts/migration/migrate-blogs.ts --dry-run
npx tsx scripts/migration/migrate-blogs.ts
```

## Migration Order

Run migrations in this order to respect foreign key relationships:

1. **Destinations** - Required for safari package relationships
2. **Routes** - Trekking routes
3. **Safaris** - Safari packages (references destinations)
4. **Day Trips** - Day trip excursions
5. **Blogs** - Blog posts with categories and tags

## Data Files

| File | Description |
|------|-------------|
| `types.ts` | TypeScript types for WordPress API and migration data |
| `wordpress-api.ts` | Utilities for fetching WordPress content |
| `content-parser.ts` | HTML parsing and content extraction |
| `migrate-enhanced.ts` | Main migration with pre-defined data |
| `migrate-blogs.ts` | Blog post migration via REST API |
| `migrate-pages.ts` | Static page migration |
| `index.ts` | Master CLI orchestrator |

## Pre-defined Content

The `migrate-enhanced.ts` file contains manually curated content for:

### Trekking Routes (10)
- 7-Day Machame Route
- 6-Day Machame Route
- 8-Day Lemosho Route
- 7-Day Lemosho Route
- 6-Day Rongai Route
- 5-Day Marangu Route
- 6-Day Marangu Route
- 9-Day Northern Circuit
- 7-Day Shira Route
- 8-Day Umbwe Route

### Safari Packages (8)
- 3-Day Budget Safari
- 4-Day Tarangire & Serengeti
- 5-Day Luxury Safari
- 6-Day Camping Safari
- 7-Day Lodge Safari
- 8-Day Best of Tanzania
- And more...

### Destinations (12)
- Serengeti National Park
- Ngorongoro Crater
- Tarangire National Park
- Lake Manyara National Park
- Arusha National Park
- Mkomazi National Park
- Ruaha National Park
- Selous/Nyerere Game Reserve
- And more...

### Day Trips (6)
- Materuni Waterfalls
- Chemka Hot Springs
- Arusha Day Trip
- Ngorongoro Day Trip
- And more...

## Post-Migration Checklist

After running migrations:

- [ ] Run `npx tsx scripts/migration/index.ts verify` to check content
- [ ] Check database content via Prisma Studio: `npx prisma studio`
- [ ] Verify URLs match WordPress site structure
- [ ] Test all route and safari detail pages
- [ ] Verify images are loading (may need to update URLs)
- [ ] Check blog posts render correctly
- [ ] Validate SEO meta tags

## Troubleshooting

### "Unique constraint violation"
Content already exists. Use `--force` flag to overwrite or skip existing records.

### "Foreign key constraint"
Run migrations in correct order (destinations before safaris).

### Missing images
Images are referenced by WordPress URLs. For production, consider:
1. Downloading and hosting locally
2. Using next/image with WordPress domain
3. Setting up image proxy

## Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://..."
```

Optional:
```
WP_API_URL="https://snowafricaadventure.com/wp-json/wp/v2"
```
