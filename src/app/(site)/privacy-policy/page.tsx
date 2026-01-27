import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description:
    "Privacy policy for Snow Africa Adventure. Learn how we collect, use, and protect your personal information.",
  url: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary-dark)] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-[var(--text-light)]">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
            <p className="lead">
              At Snow Africa Adventure, we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This policy explains how we collect, use, and safeguard your data.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you:
            </p>
            <ul>
              <li>Submit an inquiry or booking request</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email, phone, or social media</li>
              <li>Complete a booking or payment</li>
              <li>Provide feedback or reviews</li>
            </ul>

            <h3>Types of Information</h3>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, email address, phone
                number, mailing address
              </li>
              <li>
                <strong>Travel Details:</strong> Nationality, passport
                information (for booking purposes), dietary requirements, health
                information (for safety purposes)
              </li>
              <li>
                <strong>Payment Information:</strong> Payment card details are
                processed securely by our payment providers and are not stored
                on our servers
              </li>
              <li>
                <strong>Communications:</strong> Records of correspondence with
                us
              </li>
              <li>
                <strong>Website Usage:</strong> Information collected
                automatically via cookies and analytics tools
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Process your bookings and provide requested services</li>
              <li>Communicate about your trip and send important updates</li>
              <li>Respond to your inquiries and customer service requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our services and website experience</li>
              <li>Comply with legal obligations</li>
              <li>Ensure safety during your activities</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Hotels, lodges, parks,
                airlines, and other suppliers necessary to fulfill your booking
              </li>
              <li>
                <strong>Payment Processors:</strong> To process payments
                securely
              </li>
              <li>
                <strong>Government Authorities:</strong> When required by law
                (e.g., park entry, visa requirements)
              </li>
              <li>
                <strong>Emergency Services:</strong> In case of medical or safety
                emergencies
              </li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties for their marketing purposes.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no internet
              transmission is completely secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>Our website uses cookies to:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content</li>
              <li>Enable social media features</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Note that
              disabling cookies may affect website functionality.
            </p>

            <h3>Analytics</h3>
            <p>
              We use analytics services (such as Google Analytics) to understand
              how visitors use our website. These services collect anonymized
              data about your browsing behavior.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Request data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details
              below.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, comply with legal
              obligations, resolve disputes, and enforce agreements. Typically:
            </p>
            <ul>
              <li>Booking records: 7 years (for tax and legal purposes)</li>
              <li>Marketing preferences: Until you unsubscribe</li>
              <li>Website analytics: 26 months</li>
            </ul>

            <h2>8. International Transfers</h2>
            <p>
              As an international tour operator, your information may be
              transferred to and processed in countries outside your home
              country, including Tanzania. We ensure appropriate safeguards are
              in place for such transfers.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not
              knowingly collect personal information from children under 16
              without parental consent. If you believe we have collected
              information from a child, please contact us.
            </p>

            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites. We are not
              responsible for the privacy practices of these sites. We encourage
              you to review their privacy policies.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of significant changes by posting a notice on our
              website or by email. Your continued use of our services after
              changes constitutes acceptance of the updated policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              For questions, concerns, or requests regarding this privacy policy
              or your personal information, please contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </li>
              <li>
                <strong>Phone:</strong> {SITE_CONFIG.phone}
              </li>
              <li>
                <strong>Address:</strong> {SITE_CONFIG.address.street},{" "}
                {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
              </li>
            </ul>
            <p>We aim to respond to all inquiries within 30 days.</p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center">
            <Link
              href="/terms-and-conditions/"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              Terms and Conditions
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
