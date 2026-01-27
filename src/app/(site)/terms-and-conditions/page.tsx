import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for booking safaris, treks, and tours with Snow Africa Adventure. Read about our booking policies, payments, and cancellation terms.",
  url: "/terms-and-conditions/",
});

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary-dark)] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Terms and Conditions
          </h1>
          <p className="text-[var(--text-light)]">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
            <p className="lead">
              These terms and conditions govern your use of Snow Africa
              Adventure services and website. By booking with us, you agree to
              these terms.
            </p>

            <h2>1. Booking and Confirmation</h2>
            <p>
              A booking is confirmed once we receive your deposit and send you a
              written confirmation. Please review your confirmation carefully
              and notify us of any errors within 48 hours.
            </p>
            <ul>
              <li>
                Kilimanjaro climbs: 30% deposit required at booking, balance due
                30 days before departure
              </li>
              <li>
                Safari packages: 30% deposit required at booking, balance due 30
                days before departure
              </li>
              <li>Day trips: Full payment required at booking</li>
              <li>
                Group departures: 30% deposit to secure your spot, balance due
                45 days before departure
              </li>
            </ul>

            <h2>2. Payment Methods</h2>
            <p>We accept the following payment methods:</p>
            <ul>
              <li>Bank transfer (USD)</li>
              <li>Credit/debit card (Visa, Mastercard) - 3% processing fee</li>
              <li>PayPal - 4% processing fee</li>
              <li>Cash (USD) upon arrival</li>
            </ul>
            <p>
              All prices are quoted in US Dollars (USD) unless otherwise stated.
              Payments in other currencies will be converted at the prevailing
              exchange rate.
            </p>

            <h2>3. Cancellation Policy</h2>
            <p>
              We understand plans can change. Our cancellation policy is as
              follows:
            </p>

            <h3>Kilimanjaro Climbs & Safaris</h3>
            <ul>
              <li>More than 60 days before departure: Full refund minus $100 admin fee</li>
              <li>31-60 days before departure: 50% refund</li>
              <li>15-30 days before departure: 25% refund</li>
              <li>Less than 15 days before departure: No refund</li>
            </ul>

            <h3>Group Departures</h3>
            <ul>
              <li>More than 60 days: Full refund minus $100 admin fee</li>
              <li>45-60 days: 70% refund</li>
              <li>30-44 days: 50% refund</li>
              <li>Less than 30 days: No refund</li>
            </ul>

            <h3>Day Trips</h3>
            <ul>
              <li>More than 48 hours: Full refund</li>
              <li>24-48 hours: 50% refund</li>
              <li>Less than 24 hours: No refund</li>
            </ul>

            <p>
              Cancellations must be made in writing via email to{" "}
              <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
            </p>

            <h2>4. Changes and Amendments</h2>
            <p>
              We will do our best to accommodate changes to your booking.
              Amendment requests made more than 30 days before departure are
              subject to a $50 admin fee plus any supplier charges. Changes
              within 30 days may not be possible and may be treated as
              cancellations.
            </p>

            <h2>5. Travel Insurance</h2>
            <p>
              <strong>
                Travel insurance is mandatory for all Kilimanjaro climbs and
                strongly recommended for all other activities.
              </strong>{" "}
              Your insurance must cover emergency evacuation, trip cancellation,
              medical expenses, and personal belongings.
            </p>
            <p>
              For Kilimanjaro climbs, your policy must specifically cover
              trekking/mountaineering up to 6,000 meters altitude and emergency
              helicopter evacuation.
            </p>

            <h2>6. Health and Fitness</h2>
            <p>
              You are responsible for ensuring you are physically fit and
              healthy for your chosen activity. For Kilimanjaro climbs, we
              recommend consulting a doctor before booking, especially if you
              have any pre-existing medical conditions.
            </p>
            <p>
              You must disclose any medical conditions that may affect your
              ability to participate safely. Our guides reserve the right to
              prevent anyone from continuing if they believe it poses a safety
              risk.
            </p>

            <h2>7. Itinerary Changes</h2>
            <p>
              While we make every effort to follow the planned itinerary,
              changes may be necessary due to weather, road conditions, wildlife
              movements, park regulations, or other factors beyond our control.
              We reserve the right to modify itineraries to ensure safety and
              maximize your experience.
            </p>
            <p>
              No refunds will be given for itinerary changes caused by
              circumstances beyond our control.
            </p>

            <h2>8. Liability</h2>
            <p>
              Snow Africa Adventure acts as an agent for various suppliers
              (hotels, lodges, transport, etc.) and is not liable for any loss,
              damage, injury, or death arising from services provided by these
              suppliers.
            </p>
            <p>
              We are not responsible for delays, changes, or cancellations
              caused by weather, political instability, natural disasters,
              pandemic, or other force majeure events.
            </p>
            <p>
              Our maximum liability is limited to the total amount paid for your
              trip.
            </p>

            <h2>9. Complaints</h2>
            <p>
              If you have any issues during your trip, please inform your guide
              immediately so we can address them on the spot. If you wish to
              file a formal complaint, please do so in writing within 14 days of
              your trip completion.
            </p>

            <h2>10. Photography and Marketing</h2>
            <p>
              We may take photographs during your trip for marketing purposes.
              If you do not wish to be photographed, please inform your guide at
              the start of your trip. By participating in our activities, you
              grant us permission to use photos containing your likeness for
              promotional purposes unless you opt out.
            </p>

            <h2>11. Environmental Responsibility</h2>
            <p>
              We are committed to responsible tourism. All participants must
              respect wildlife, local communities, and the environment. Littering,
              feeding wildlife, or engaging in any activity that harms the
              environment or local culture is strictly prohibited and may result
              in immediate termination of your trip without refund.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the United Republic of
              Tanzania. Any disputes shall be resolved through arbitration in
              Arusha, Tanzania.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
            </p>
            <ul>
              <li>Email: {SITE_CONFIG.email}</li>
              <li>Phone: {SITE_CONFIG.phone}</li>
              <li>
                Address: {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}
                , {SITE_CONFIG.address.country}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center">
            <Link
              href="/privacy-policy/"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-[var(--text-light)]">|</span>
            <Link
              href="/contact-us/"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              Contact Us
            </Link>
            <span className="text-[var(--text-light)]">|</span>
            <Link
              href="/about-us/"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
