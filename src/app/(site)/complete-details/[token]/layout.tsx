import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Complete Your Climber Details",
  description:
    "Securely submit your passport and travel details for your upcoming Kilimanjaro climb.",
  noIndex: true,
});

export default function CompleteDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
