import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getKilimanjaroRouteLinks } from "@/lib/route-links";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Route pages listed in the footer come from the DB (cached for an hour),
  // so only live routes are linked.
  const routeLinks = await getKilimanjaroRouteLinks();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {/* Year resolved on the server so the client never re-derives it — a
          client-side new Date() can disagree with the server across a New
          Year boundary and trigger a hydration mismatch. */}
      <Footer currentYear={new Date().getFullYear()} routeLinks={routeLinks} />
    </div>
  );
}
