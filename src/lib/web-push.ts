import webpush from "web-push";
import { prisma } from "@/lib/prisma";

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT ?? "mailto:admin@snowafricaadventure.com";

let configured = false;
function ensureConfigured(): boolean {
  if (configured) return true;
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) return false;
  try {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
    configured = true;
    return true;
  } catch (err) {
    console.error("VAPID configuration failed:", err);
    return false;
  }
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
  badge?: string;
}

export async function sendPushToAllAdmins(payload: PushPayload): Promise<void> {
  if (!ensureConfigured()) return;

  const subs = await prisma.pushSubscription.findMany();
  if (subs.length === 0) return;

  const json = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url ?? "/admin/notifications",
    tag: payload.tag,
    icon: payload.icon ?? "/admin-icon-192.png",
    badge: payload.badge ?? "/admin-icon-192.png",
  });

  const results = await Promise.allSettled(
    subs.map((s) =>
      webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        json
      )
    )
  );

  const deadEndpoints: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const err = r.reason as { statusCode?: number } | undefined;
      if (err?.statusCode === 404 || err?.statusCode === 410) {
        deadEndpoints.push(subs[i].endpoint);
      } else {
        console.warn("Push send failed:", err);
      }
    }
  });

  if (deadEndpoints.length > 0) {
    await prisma.pushSubscription
      .deleteMany({ where: { endpoint: { in: deadEndpoints } } })
      .catch((err) => console.error("Failed to clean dead push subscriptions:", err));
  }
}
