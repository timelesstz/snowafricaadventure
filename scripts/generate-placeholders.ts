import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const imagesDir = path.join(publicDir, "images");

// Ensure directories exist
const dirs = [
  "images",
  "images/blog",
  "images/routes",
  "images/destinations",
  "images/safaris",
  "images/zanzibar",
  "images/day-trips",
];

for (const dir of dirs) {
  const fullPath = path.join(publicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

interface PlaceholderImage {
  path: string;
  width: number;
  height: number;
  text: string;
  bgColor: string;
}

const placeholders: PlaceholderImage[] = [
  // Hero images
  { path: "hero-kilimanjaro.jpg", width: 1920, height: 1080, text: "Kilimanjaro Hero", bgColor: "#1a365d" },
  { path: "tailor-made-hero.jpg", width: 1920, height: 800, text: "Tailor Made Safari", bgColor: "#2d3748" },

  // Zanzibar
  { path: "zanzibar/hero.jpg", width: 1920, height: 800, text: "Zanzibar Beach", bgColor: "#0891b2" },

  // Day trips
  { path: "day-trips/materuni.jpg", width: 800, height: 600, text: "Materuni Falls", bgColor: "#059669" },
  { path: "day-trips/coffee-tour.jpg", width: 800, height: 600, text: "Coffee Tour", bgColor: "#92400e" },

  // Blog
  { path: "blog/migration.jpg", width: 800, height: 500, text: "Great Migration", bgColor: "#b45309" },
  { path: "blog/best-time-kili.jpg", width: 800, height: 500, text: "Best Time Kilimanjaro", bgColor: "#1e40af" },
  { path: "blog/route-comparison.jpg", width: 800, height: 500, text: "Route Comparison", bgColor: "#7c3aed" },

  // Routes
  { path: "routes/machame.jpg", width: 800, height: 600, text: "Machame Route", bgColor: "#0f766e" },
  { path: "routes/lemosho.jpg", width: 800, height: 600, text: "Lemosho Route", bgColor: "#4338ca" },
  { path: "routes/marangu.jpg", width: 800, height: 600, text: "Marangu Route", bgColor: "#be123c" },

  // Destinations
  { path: "destinations/serengeti.jpg", width: 800, height: 600, text: "Serengeti", bgColor: "#c2410c" },
  { path: "destinations/ngorongoro.jpg", width: 800, height: 600, text: "Ngorongoro", bgColor: "#15803d" },
  { path: "destinations/tarangire.jpg", width: 800, height: 600, text: "Tarangire", bgColor: "#a16207" },

  // Safaris
  { path: "safaris/budget.jpg", width: 800, height: 600, text: "Budget Safari", bgColor: "#0369a1" },
  { path: "safaris/luxury.jpg", width: 800, height: 600, text: "Luxury Safari", bgColor: "#9f1239" },
];

async function createPlaceholder(config: PlaceholderImage) {
  const { width, height, text, bgColor } = config;
  const filePath = path.join(imagesDir, config.path);

  // Create directory if needed
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create SVG with text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="${Math.min(width, height) / 10}px"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >${text}</text>
      <text
        x="50%"
        y="60%"
        font-family="Arial, sans-serif"
        font-size="${Math.min(width, height) / 20}px"
        fill="rgba(255,255,255,0.6)"
        text-anchor="middle"
      >${width}x${height}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(filePath);

  console.log(`✓ Created ${config.path}`);
}

async function main() {
  console.log("🖼️  Generating placeholder images...\n");

  for (const placeholder of placeholders) {
    await createPlaceholder(placeholder);
  }

  console.log("\n✅ All placeholder images created!");
}

main().catch(console.error);
