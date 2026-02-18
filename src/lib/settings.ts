import prisma from "@/lib/prisma";

/**
 * Fetch the "Years Experience" value from admin settings.
 * Configured at /admin/homepage → Statistics → Experience Value.
 * Falls back to "15+" if not set.
 */
export async function getExperienceYears(): Promise<string> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "homepage.stats.experience" },
  });
  return setting?.value || "15+";
}
