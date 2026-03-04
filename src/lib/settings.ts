import prisma from "@/lib/prisma";

/**
 * Fetch the "Years Experience" value from admin settings.
 * Configured at /admin/homepage → Statistics → Experience Value.
 * Falls back to "15+" if not set.
 */
export async function getExperienceYears(): Promise<string> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "homepage.stats.experience" },
    });
    return setting?.value || "15+";
  } catch (error) {
    console.error("[Settings] Failed to fetch experience years:", error);
    return "15+";
  }
}
