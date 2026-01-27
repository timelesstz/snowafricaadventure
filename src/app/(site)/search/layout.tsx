import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Search",
  description:
    "Search for Kilimanjaro climbing routes, Tanzania safari packages, destinations, and travel guides. Find your perfect Tanzania adventure.",
  url: "/search/",
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
