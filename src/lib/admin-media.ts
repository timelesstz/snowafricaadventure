import { prisma } from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";

const R2_DOMAINS = [
  "pub-cf9450d27ca744f1825d1e08b392f592.r2.dev",
  "cdn.snowafricaadventure.com",
];

function extractR2Key(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!R2_DOMAINS.some((d) => parsed.hostname === d)) return null;
    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}

export async function disposePendingDeletions(
  raw: string | null | undefined
): Promise<void> {
  if (!raw) return;
  let urls: string[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      urls = parsed.filter((u): u is string => typeof u === "string");
    }
  } catch {
    return;
  }
  for (const url of urls) {
    const key = extractR2Key(url);
    if (!key || key.startsWith("wp-content/uploads/")) continue;
    try {
      await deleteFromR2(key);
      const thumbKey = key.replace(/(\.[^/.]+)$/, "-thumb$1");
      await deleteFromR2(thumbKey).catch(() => {});
      await prisma.media.deleteMany({ where: { url } });
    } catch (e) {
      console.error("Deferred R2 delete failed:", e);
    }
  }
}

export async function disposeFormDeletions(
  formData: FormData,
  fieldNames: string[]
): Promise<void> {
  for (const name of fieldNames) {
    await disposePendingDeletions(formData.get(`${name}_pendingDeletions`) as string | null);
  }
}
