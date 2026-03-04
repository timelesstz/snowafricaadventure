import { google, Auth } from "googleapis";

let cachedAuth: Auth.GoogleAuth | null = null;

function getServiceAccountKey(): Record<string, string> | null {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!encoded) return null;

  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
  } catch {
    console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY");
    return null;
  }
}

export function getGoogleAuth() {
  if (cachedAuth) return cachedAuth;

  const key = getServiceAccountKey();
  if (!key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set or invalid"
    );
  }

  cachedAuth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });

  return cachedAuth;
}

export function getSearchConsoleClient() {
  const auth = getGoogleAuth();
  return google.searchconsole({ version: "v1", auth });
}

export function getAnalyticsDataClient() {
  const auth = getGoogleAuth();
  return google.analyticsdata({ version: "v1beta", auth });
}

export function isGoogleConfigured(): boolean {
  return !!getServiceAccountKey();
}

export function getServiceAccountEmail(): string | null {
  const key = getServiceAccountKey();
  return key?.client_email ?? null;
}
