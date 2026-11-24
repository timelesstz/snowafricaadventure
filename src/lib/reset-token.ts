import { createHash, randomBytes } from "crypto";

/**
 * Password-reset tokens are emailed in plain form but stored only as a
 * SHA-256 digest, so a database leak cannot be replayed into account takeover.
 * The token carries 256 random bits, so an unsalted fast hash is enough.
 */
export function createResetToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString("hex");
  return { token, tokenHash: hashResetToken(token) };
}

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
