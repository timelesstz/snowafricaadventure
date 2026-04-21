export const metadata = {
  title: "Invoice | Snow Africa Admin",
  robots: { index: false, follow: false },
};

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
