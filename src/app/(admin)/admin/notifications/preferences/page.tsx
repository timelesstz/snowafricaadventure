import { requireRole } from "@/lib/auth";
import { AdminRole } from "@prisma/client";
import PreferencesClient from "./PreferencesClient";

export const metadata = {
  title: "Notification preferences · Admin",
};

export default async function NotificationPreferencesPage() {
  await requireRole(AdminRole.EDITOR);
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? null;
  return <PreferencesClient vapidPublicKey={publicKey} />;
}
