import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Manage Your Climbers",
  description:
    "Review and manage climber details for your Kilimanjaro booking. Send completion links and track form status.",
  noIndex: true,
});

export default function ManageClimbersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
