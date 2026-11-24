/**
 * Passport numbers, dates of birth and medical notes are collected for park
 * permits and guide safety. The lead climber's self-service page proves
 * identity only with an email and an 8-character booking ref, so those fields
 * are never sent back to the browser. The page shows them as "on file", and a
 * blank field on save keeps the stored value instead of erasing it.
 */
export const SENSITIVE_CLIMBER_FIELDS = [
  "passportNumber",
  "dateOfBirth",
  "medicalConditions",
] as const;

export type SensitiveClimberField = (typeof SENSITIVE_CLIMBER_FIELDS)[number];
export type OnFile = Record<SensitiveClimberField, boolean>;

export function redactClimberDetails<T extends Record<string, unknown>>(
  details: T | null | undefined
): (Omit<T, SensitiveClimberField> & { onFile: OnFile }) | null {
  if (!details) return null;
  const rest: Record<string, unknown> = { ...details };
  const onFile = {} as OnFile;
  for (const field of SENSITIVE_CLIMBER_FIELDS) {
    onFile[field] = typeof rest[field] === "string" && (rest[field] as string).trim() !== "";
    delete rest[field];
  }
  return { ...(rest as Omit<T, SensitiveClimberField>), onFile };
}

/** For each sensitive field: a non-blank new value wins, otherwise keep what is stored. */
export function keepSensitiveWhenBlank(
  existing: Record<string, unknown> | null | undefined,
  incoming: Partial<Record<SensitiveClimberField, string | null | undefined>>
): Record<SensitiveClimberField, string | null> {
  const out = {} as Record<SensitiveClimberField, string | null>;
  for (const field of SENSITIVE_CLIMBER_FIELDS) {
    const next = incoming[field]?.trim();
    const prev = existing?.[field];
    out[field] = next ? next : typeof prev === "string" && prev ? prev : null;
  }
  return out;
}
