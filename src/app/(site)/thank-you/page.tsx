import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, Phone, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Snow Africa Adventure",
  description: "Thank you for your inquiry. Our team will respond within 24 hours.",
  robots: { index: false, follow: false },
};

interface ThankYouPageProps {
  searchParams: Promise<{
    type?: string;
    name?: string;
    ref?: string;
  }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const type = params.type || "inquiry";
  const name = params.name || "Traveler";
  const ref = params.ref;

  const isBooking = type === "booking";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Thank You, {name}!
          </h1>

          {isBooking ? (
            <>
              <p className="text-lg text-slate-600 mb-2">
                Your booking inquiry has been received.
              </p>
              {ref && (
                <p className="text-amber-600 font-medium mb-6">
                  Reference: <span className="font-mono">{ref}</span>
                </p>
              )}
            </>
          ) : (
            <p className="text-lg text-slate-600 mb-6">
              Your inquiry has been successfully submitted.
            </p>
          )}

          {/* What's Next */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              What Happens Next?
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium text-slate-900">Confirmation Email</p>
                  <p className="text-sm text-slate-600">
                    You will receive an email confirmation shortly with your inquiry details.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium text-slate-900">Team Review</p>
                  <p className="text-sm text-slate-600">
                    Our expert travel consultants will review your request within 24 hours.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium text-slate-900">Personalized Response</p>
                  <p className="text-sm text-slate-600">
                    {isBooking
                      ? "We'll send you a detailed itinerary and payment options."
                      : "We'll contact you with tailored recommendations for your adventure."}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Need Immediate Assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@snowafricaadventure.com"
                className="flex items-center justify-center gap-2 text-slate-600 hover:text-amber-600"
              >
                <Mail className="w-5 h-5" />
                info@snowafricaadventure.com
              </a>
              <a
                href="https://wa.me/255766657854"
                className="flex items-center justify-center gap-2 text-slate-600 hover:text-amber-600"
              >
                <Phone className="w-5 h-5" />
                +255 766 657 854
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              Explore More
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              <Calendar className="w-5 h-5" />
              View Departures
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
