/**
 * Blog Migration Script
 * Fetches all blog posts from WordPress REST API and migrates them to Prisma
 */

import "dotenv/config";
import prisma from "../../src/lib/prisma";

const WP_API = "https://snowafricaadventure.com/wp-json/wp/v2";
const DELAY_MS = 300;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Categories from WordPress sitemap
const CATEGORIES_DATA = [
  { slug: "blog", name: "Blog", description: "General blog posts" },
  { slug: "safari-tours", name: "Safari Tours", description: "Safari tours and packages" },
  { slug: "mount-kilimanjaro", name: "Mount Kilimanjaro", description: "Kilimanjaro climbing information" },
  { slug: "tanzania-destinations", name: "Tanzania Destinations", description: "Safari destinations in Tanzania" },
  { slug: "western-circuit", name: "Western Circuit", description: "Western Tanzania safari destinations" },
  { slug: "southern-circuit", name: "Southern Circuit", description: "Southern Tanzania safari destinations" },
  { slug: "northern-circuit", name: "Northern Circuit", description: "Northern Tanzania safari destinations" },
  { slug: "day-trip", name: "Day Trip", description: "Day trip excursions" },
  { slug: "kilimanjaro-climbing-guide", name: "Kilimanjaro Climbing Guide", description: "Guides for climbing Kilimanjaro" },
];

// Tags commonly used
const TAGS_DATA = [
  "kilimanjaro", "safari", "tanzania", "serengeti", "ngorongoro", "wildlife",
  "trekking", "climbing", "travel", "adventure", "africa", "migration",
  "camping", "luxury", "budget", "tips", "guide", "photography", "culture",
  "maasai", "zanzibar", "beaches", "birds", "elephants", "lions", "conservation"
];

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

interface WPCategory {
  id: number;
  slug: string;
  name: string;
}

interface WPTag {
  id: number;
  slug: string;
  name: string;
}

async function fetchAllPosts(): Promise<WPPost[]> {
  const allPosts: WPPost[] = [];
  let page = 1;
  let hasMore = true;

  console.log("  Fetching posts from WordPress API...");

  while (hasMore) {
    try {
      const url = `${WP_API}/posts?per_page=100&page=${page}&_embed=1`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const posts: WPPost[] = await response.json();

      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts.push(...posts);
        console.log(`    Page ${page}: ${posts.length} posts (total: ${allPosts.length})`);
        page++;
        await sleep(DELAY_MS);
      }
    } catch (error) {
      console.error(`  Error fetching page ${page}:`, error);
      hasMore = false;
    }
  }

  return allPosts;
}

async function fetchWPCategories(): Promise<Map<number, WPCategory>> {
  const categoryMap = new Map<number, WPCategory>();

  try {
    const response = await fetch(`${WP_API}/categories?per_page=100`);
    const categories: WPCategory[] = await response.json();

    for (const cat of categories) {
      categoryMap.set(cat.id, cat);
    }
  } catch (error) {
    console.error("  Error fetching categories:", error);
  }

  return categoryMap;
}

async function fetchWPTags(): Promise<Map<number, WPTag>> {
  const tagMap = new Map<number, WPTag>();

  try {
    const response = await fetch(`${WP_API}/tags?per_page=100`);
    const tags: WPTag[] = await response.json();

    for (const tag of tags) {
      tagMap.set(tag.id, tag);
    }
  } catch (error) {
    console.error("  Error fetching tags:", error);
  }

  return tagMap;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanContent(html: string): string {
  // Remove Elementor-specific classes but keep structure
  return html
    .replace(/class="[^"]*elementor[^"]*"/g, "")
    .replace(/data-[a-z-]+="[^"]*"/g, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function migrateCategories(dryRun: boolean): Promise<Map<string, string>> {
  console.log("\n📁 Migrating Blog Categories...\n");
  const categoryIdMap = new Map<string, string>();

  for (const cat of CATEGORIES_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create category: ${cat.name}`);
    } else {
      try {
        const created = await prisma.category.upsert({
          where: { slug: cat.slug },
          create: {
            slug: cat.slug,
            name: cat.name,
            description: cat.description,
          },
          update: {
            name: cat.name,
            description: cat.description,
          },
        });
        categoryIdMap.set(cat.slug, created.id);
        console.log(`  ✅ Category: ${cat.name}`);
      } catch (error) {
        console.error(`  ❌ Error creating category ${cat.slug}:`, error);
      }
    }
  }

  return categoryIdMap;
}

async function migrateTags(dryRun: boolean): Promise<Map<string, string>> {
  console.log("\n🏷️  Migrating Tags...\n");
  const tagIdMap = new Map<string, string>();

  for (const tagSlug of TAGS_DATA) {
    const name = tagSlug.charAt(0).toUpperCase() + tagSlug.slice(1);

    if (dryRun) {
      console.log(`  [DRY RUN] Would create tag: ${name}`);
    } else {
      try {
        const created = await prisma.tag.upsert({
          where: { slug: tagSlug },
          create: { slug: tagSlug, name },
          update: { name },
        });
        tagIdMap.set(tagSlug, created.id);
      } catch (error) {
        // Ignore duplicate errors
      }
    }
  }

  console.log(`  Created ${TAGS_DATA.length} tags`);
  return tagIdMap;
}

async function migratePosts(dryRun: boolean) {
  console.log("\n📝 Migrating Blog Posts...\n");

  // First migrate categories and tags
  const categoryIdMap = await migrateCategories(dryRun);
  const tagIdMap = await migrateTags(dryRun);

  // Fetch WordPress categories and tags for mapping
  const wpCategories = await fetchWPCategories();
  const wpTags = await fetchWPTags();

  // Fetch all posts
  const posts = await fetchAllPosts();
  console.log(`\n  Found ${posts.length} posts to migrate\n`);

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of posts) {
    const title = stripHtml(post.title.rendered);
    const excerpt = stripHtml(post.excerpt.rendered);
    const content = cleanContent(post.content.rendered);
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    // Map WordPress categories to our categories
    const postCategorySlugs: string[] = [];
    for (const wpCatId of post.categories) {
      const wpCat = wpCategories.get(wpCatId);
      if (wpCat) {
        // Map to our category slugs
        const mappedSlug = mapCategorySlug(wpCat.slug);
        if (mappedSlug && categoryIdMap.has(mappedSlug)) {
          postCategorySlugs.push(mappedSlug);
        }
      }
    }

    // Map WordPress tags
    const postTagSlugs: string[] = [];
    for (const wpTagId of post.tags) {
      const wpTag = wpTags.get(wpTagId);
      if (wpTag && tagIdMap.has(wpTag.slug)) {
        postTagSlugs.push(wpTag.slug);
      }
    }

    // Auto-detect tags from content
    const autoTags = detectTags(title + " " + content);
    for (const tag of autoTags) {
      if (tagIdMap.has(tag) && !postTagSlugs.includes(tag)) {
        postTagSlugs.push(tag);
      }
    }

    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${title.slice(0, 60)}...`);
      migrated++;
      continue;
    }

    try {
      // Check if post already exists
      const existing = await prisma.blogPost.findUnique({
        where: { slug: post.slug },
      });

      if (existing) {
        skipped++;
        continue;
      }

      // Create the blog post
      const createdPost = await prisma.blogPost.create({
        data: {
          slug: post.slug,
          title,
          metaTitle: `${title} | Snow Africa Adventure`,
          metaDescription: excerpt.slice(0, 160),
          excerpt,
          content,
          featuredImage,
          author: "Snow Africa Team",
          isPublished: true,
          publishedAt: new Date(post.date),
        },
      });

      // Link categories
      for (const catSlug of postCategorySlugs) {
        const catId = categoryIdMap.get(catSlug);
        if (catId) {
          await prisma.postCategory.create({
            data: {
              postId: createdPost.id,
              categoryId: catId,
            },
          }).catch(() => {}); // Ignore duplicates
        }
      }

      // Link tags
      for (const tagSlug of postTagSlugs) {
        const tagId = tagIdMap.get(tagSlug);
        if (tagId) {
          await prisma.postTag.create({
            data: {
              postId: createdPost.id,
              tagId: tagId,
            },
          }).catch(() => {}); // Ignore duplicates
        }
      }

      console.log(`  ✅ ${title.slice(0, 60)}...`);
      migrated++;
      await sleep(50);
    } catch (error) {
      console.error(`  ❌ Error migrating ${post.slug}:`, error);
      errors++;
    }
  }

  console.log(`\n  Summary: ${migrated} migrated, ${skipped} skipped, ${errors} errors`);
}

function mapCategorySlug(wpSlug: string): string | null {
  const mapping: Record<string, string> = {
    "blog": "blog",
    "safari-tours": "safari-tours",
    "mount-kilimanjaro": "mount-kilimanjaro",
    "tanzania-destinations": "tanzania-destinations",
    "western-circuit": "western-circuit",
    "southern-circuit": "southern-circuit",
    "northern-circuit": "northern-circuit",
    "day-trip": "day-trip",
    "kilimanjaro-climbing-guide": "kilimanjaro-climbing-guide",
    "uncategorized": "blog",
  };
  return mapping[wpSlug] || "blog";
}

function detectTags(text: string): string[] {
  const tags: string[] = [];
  const lowerText = text.toLowerCase();

  const tagKeywords: Record<string, string[]> = {
    "kilimanjaro": ["kilimanjaro", "kili"],
    "safari": ["safari"],
    "serengeti": ["serengeti"],
    "ngorongoro": ["ngorongoro", "crater"],
    "wildlife": ["wildlife", "animals"],
    "trekking": ["trekking", "trek", "hiking", "hike"],
    "climbing": ["climbing", "climb", "summit"],
    "migration": ["migration", "wildebeest"],
    "zanzibar": ["zanzibar"],
    "maasai": ["maasai", "masai"],
    "photography": ["photography", "photo"],
    "lions": ["lion", "lions"],
    "elephants": ["elephant", "elephants"],
    "culture": ["culture", "cultural", "tribe"],
    "conservation": ["conservation", "protect"],
  };

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      tags.push(tag);
    }
  }

  return tags;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("🚀 WordPress Blog Migration");
  console.log("===========================");
  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  }

  try {
    await migratePosts(dryRun);
    console.log("\n✅ Blog migration complete!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
