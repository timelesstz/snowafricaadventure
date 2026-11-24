import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isValidCronAuth } from "@/lib/cron-auth";
import { createResetToken, hashResetToken } from "@/lib/reset-token";
import { keepSensitiveWhenBlank, redactClimberDetails } from "@/lib/climber-privacy";

describe("isValidCronAuth", () => {
  const original = process.env.CRON_SECRET;
  beforeEach(() => {
    process.env.CRON_SECRET = "s3cret-value-for-tests";
  });
  afterEach(() => {
    process.env.CRON_SECRET = original;
  });

  it("accepts the exact bearer secret", () => {
    expect(isValidCronAuth("Bearer s3cret-value-for-tests")).toBe(true);
  });

  it("rejects a wrong, partial or longer secret", () => {
    expect(isValidCronAuth("Bearer wrong")).toBe(false);
    expect(isValidCronAuth("Bearer s3cret-value-for-test")).toBe(false);
    expect(isValidCronAuth("Bearer s3cret-value-for-tests-and-more")).toBe(false);
  });

  it("requires the Bearer prefix", () => {
    expect(isValidCronAuth("s3cret-value-for-tests")).toBe(false);
    expect(isValidCronAuth(null)).toBe(false);
    expect(isValidCronAuth(undefined)).toBe(false);
  });

  it("fails closed when CRON_SECRET is unset or empty", () => {
    delete process.env.CRON_SECRET;
    expect(isValidCronAuth("Bearer undefined")).toBe(false);
    expect(isValidCronAuth("Bearer ")).toBe(false);
    process.env.CRON_SECRET = "";
    expect(isValidCronAuth("Bearer ")).toBe(false);
  });
});

describe("password reset tokens", () => {
  it("stores only a hash that matches the emailed token", () => {
    const { token, tokenHash } = createResetToken();
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect(tokenHash).toMatch(/^[0-9a-f]{64}$/);
    expect(tokenHash).not.toBe(token);
    expect(hashResetToken(token)).toBe(tokenHash);
  });

  it("issues a different token each time", () => {
    expect(createResetToken().token).not.toBe(createResetToken().token);
  });
});

describe("climber privacy", () => {
  const stored = {
    name: "Asha Mrema",
    email: "asha@example.com",
    nationality: "Tanzania",
    passportNumber: "AB1234567",
    dateOfBirth: "1990-04-02",
    medicalConditions: "Asthma",
    dietaryRequirements: "Vegetarian",
  };

  it("never returns passport, date of birth or medical notes", () => {
    const out = redactClimberDetails(stored)!;
    expect(out).not.toHaveProperty("passportNumber");
    expect(out).not.toHaveProperty("dateOfBirth");
    expect(out).not.toHaveProperty("medicalConditions");
    expect(JSON.stringify(out)).not.toContain("AB1234567");
    expect(out.name).toBe("Asha Mrema");
    expect(out.dietaryRequirements).toBe("Vegetarian");
    expect(out.onFile).toEqual({ passportNumber: true, dateOfBirth: true, medicalConditions: true });
  });

  it("reports blank fields as not on file", () => {
    const out = redactClimberDetails({ name: "X", passportNumber: "  ", dateOfBirth: null })!;
    expect(out.onFile).toEqual({ passportNumber: false, dateOfBirth: false, medicalConditions: false });
    expect(redactClimberDetails(null)).toBeNull();
  });

  it("keeps stored values when the form leaves them blank", () => {
    expect(keepSensitiveWhenBlank(stored, { passportNumber: "", dateOfBirth: undefined, medicalConditions: "  " })).toEqual({
      passportNumber: "AB1234567",
      dateOfBirth: "1990-04-02",
      medicalConditions: "Asthma",
    });
  });

  it("lets a new value replace the stored one", () => {
    expect(keepSensitiveWhenBlank(stored, { passportNumber: "ZZ999" }).passportNumber).toBe("ZZ999");
    expect(keepSensitiveWhenBlank({}, {})).toEqual({
      passportNumber: null,
      dateOfBirth: null,
      medicalConditions: null,
    });
  });
});
