import { config } from 'dotenv';
import { resolve } from 'path';

// Load env before anything else
config({ path: resolve(process.cwd(), '.env.local') });

// Dynamic import after env is loaded
async function main() {
  const { default: prisma } = await import('../src/lib/prisma');

  const safaris = await prisma.safariPackage.findMany({
    select: {
      slug: true,
      title: true,
      duration: true,
      type: true,
      itinerary: true,
      inclusions: true,
      exclusions: true,
      overview: true,
    },
    orderBy: { title: 'asc' }
  });

  console.log('Total Safari Packages:', safaris.length);
  console.log('\n--- Safari Packages ---\n');

  safaris.forEach(s => {
    const itinDays = s.itinerary ? (Array.isArray(s.itinerary) ? s.itinerary.length : 'invalid') : 0;
    console.log(`${s.title}`);
    console.log(`  Slug: ${s.slug}`);
    console.log(`  Duration: ${s.duration} | Type: ${s.type}`);
    console.log(`  Itinerary days: ${itinDays}`);
    console.log(`  Inclusions: ${s.inclusions?.length || 0} | Exclusions: ${s.exclusions?.length || 0}`);
    console.log(`  Overview: ${s.overview ? s.overview.substring(0, 100) + '...' : 'MISSING'}`);
    console.log('');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
