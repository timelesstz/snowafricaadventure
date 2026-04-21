import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import PrintActions from "./PrintActions";

export const metadata = {
  title: "Booking Invoice",
};

function formatDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function money(
  n: number | string | { toString(): string } | null | undefined,
  currency = "USD"
) {
  const value = n == null ? 0 : Number(n.toString());
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login/");
  }

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      departure: {
        include: {
          route: { select: { title: true, duration: true } },
        },
      },
    },
  });

  if (!booking) notFound();

  const ref = booking.id.slice(-8).toUpperCase();
  const totalPrice = Number(booking.totalPrice);
  const deposit = Number(booking.depositAmount || 0);
  const balance = Math.max(0, totalPrice - deposit);
  const climbers =
    (booking.climberDetails as Array<{
      name?: string;
      nationality?: string;
      passportNumber?: string;
    }>) || [];

  return (
    <div className="bg-white">
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          .no-print,
          nav,
          aside,
          .lg\\:hidden.fixed { display: none !important; }
          body { background: white !important; }
          .lg\\:pl-64 { padding-left: 0 !important; }
          main { padding: 0 !important; }
          .invoice-wrap {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
        @media screen {
          .invoice-wrap {
            max-width: 820px;
            margin: 2rem auto;
            background: white;
            padding: 3rem;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
            border-radius: 8px;
          }
        }
      `}</style>

      <PrintActions bookingRef={ref} />

      <div className="invoice-wrap">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {SITE_CONFIG.address.street}
            </p>
            <p className="text-sm text-slate-600">
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {SITE_CONFIG.email} · {SITE_CONFIG.phone}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
              Invoice
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-mono">REF: {ref}</p>
            <p className="text-sm text-slate-600">
              Issued: {formatDate(new Date())}
            </p>
            <p className="text-sm text-slate-600">
              Status: <span className="font-medium">{booking.status}</span>
            </p>
          </div>
        </div>

        {/* Bill To + Trip */}
        <div className="grid grid-cols-2 gap-8 py-6 border-b border-slate-200">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Bill To
            </h3>
            <p className="font-semibold text-slate-900">{booking.leadName}</p>
            <p className="text-sm text-slate-700">{booking.leadEmail}</p>
            {booking.leadPhone && (
              <p className="text-sm text-slate-700">{booking.leadPhone}</p>
            )}
            {booking.leadNationality && (
              <p className="text-sm text-slate-700">{booking.leadNationality}</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Trip
            </h3>
            <p className="font-semibold text-slate-900">
              {booking.departure.route.title}
            </p>
            <p className="text-sm text-slate-700">
              {booking.departure.route.duration}
            </p>
            <p className="text-sm text-slate-700 mt-1">
              Arrival: {formatDate(booking.departure.arrivalDate)}
            </p>
            <p className="text-sm text-slate-700">
              Trek: {formatDate(booking.departure.startDate)} —{" "}
              {formatDate(booking.departure.endDate)}
            </p>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full my-6 text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 text-slate-900">
                {booking.departure.route.title} — climb package
              </td>
              <td className="py-3 text-right text-slate-700">
                {booking.totalClimbers}
              </td>
              <td className="py-3 text-right text-slate-700">
                {money(booking.pricePerPerson)}
              </td>
              <td className="py-3 text-right text-slate-900 font-medium">
                {money(totalPrice)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between text-slate-700">
              <span>Subtotal</span>
              <span>{money(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Deposit{booking.depositPaid ? " (paid)" : ""}</span>
              <span>−{money(deposit)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-2 text-base font-semibold text-slate-900">
              <span>Balance due</span>
              <span>{booking.balancePaid ? money(0) : money(balance)}</span>
            </div>
            {booking.depositPaid && booking.depositPaidAt && (
              <p className="text-xs text-slate-500 text-right">
                Deposit received {formatDate(booking.depositPaidAt)}
              </p>
            )}
            {booking.balancePaid && booking.balancePaidAt && (
              <p className="text-xs text-slate-500 text-right">
                Balance received {formatDate(booking.balancePaidAt)}
              </p>
            )}
          </div>
        </div>

        {/* Climbers */}
        {climbers.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Climbers
            </h3>
            <ol className="space-y-1 text-sm">
              {climbers.map((c, i) => (
                <li key={i} className="text-slate-700">
                  {i + 1}. {c?.name || `Climber ${i + 1}`}
                  {c?.nationality && ` · ${c.nationality}`}
                  {c?.passportNumber && ` · Passport ${c.passportNumber}`}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <p>
            Thank you for choosing {SITE_CONFIG.name}. For questions about this
            invoice, reply to {SITE_CONFIG.email} or call {SITE_CONFIG.phone}.
          </p>
          <p className="mt-2">
            All amounts in USD unless stated otherwise. Payments are
            non-refundable within 60 days of departure.
          </p>
        </div>
      </div>
    </div>
  );
}
