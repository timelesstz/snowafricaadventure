import { requireRole } from "@/lib/auth";
import { AdminRole } from "@prisma/client";
import NotificationsClient from "./NotificationsClient";

export const metadata = {
  title: "Notifications · Admin",
};

export default async function NotificationsPage() {
  await requireRole(AdminRole.EDITOR);
  return <NotificationsClient />;
}
