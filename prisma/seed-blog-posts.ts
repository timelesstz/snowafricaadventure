/**
 * Seed All Blog Posts
 * Adds all blog posts from live site with placeholder content
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";
import fs from "fs";
import path from "path";

interface PostData {
  slug: string;
  title: string;
  category: string;
}

async function main() {
  console.log("📝 Seeding all blog posts...\n");

  // Load blog posts data
  const filepath = path.join(__dirname, "migrations/data/blog-posts-all.json");
  const content = fs.readFileSync(filepath, "utf-8");
  const postsData: PostData[] = JSON.parse(content);

  // Get category IDs
  const categories = await prisma.category.findMany();
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    categoryMap[cat.slug] = cat.id;
  }

  // Get existing post slugs
  const existingPosts = await prisma.blogPost.findMany({
    select: { slug: true },
  });
  const existingSlugs = new Set(existingPosts.map((p) => p.slug));

  console.log(`Found ${existingPosts.length} existing posts`);
  console.log(`Will add ${postsData.length - existingPosts.length} new posts\n`);

  let created = 0;
  let skipped = 0;

  for (const post of postsData) {
    if (existingSlugs.has(post.slug)) {
      skipped++;
      continue;
    }

    const newPost = await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: `Guide about ${post.title.toLowerCase()}. Content to be migrated from WordPress.`,
        content: `# ${post.title}\n\nThis content will be migrated from the WordPress site.\n\n[Content migration pending]`,
        isPublished: true,
        publishedAt: new Date(),
        author: "Snow Africa Team",
      },
    });

    // Link to category if exists
    if (post.category && categoryMap[post.category]) {
      await prisma.postCategory.create({
        data: {
          postId: newPost.id,
          categoryId: categoryMap[post.category],
        },
      });
    }

    created++;
  }

  console.log(`✅ Created ${created} new blog posts`);
  console.log(`⏭️  Skipped ${skipped} existing posts`);

  // Final count
  const totalPosts = await prisma.blogPost.count();
  console.log(`\n📊 Total blog posts in database: ${totalPosts}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
