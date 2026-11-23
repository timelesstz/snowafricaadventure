import { createHash, timingSafeEqual } from "crypto";

/**
 * Checks an `Authorization: Bearer <CRON_SECRET>` header.
 *
 * Fails closed when CRON_SECRET is unset, so a missing env var never leaves a
 * cron world-callable. Both sides are hashed to equal-length digests before a
 * constant-time compare, so response timing reveals nothing about the secret.
 */
export function isValidCronAuth(authHeader: string | null | undefined): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || !authHeader?.startsWith("Bearer ")) return false;

  const given = createHash("sha256").update(authHeader.slice(7)).digest();
  const expected = createHash("sha256").update(secret).digest();
  return timingSafeEqual(given, expected);
}
