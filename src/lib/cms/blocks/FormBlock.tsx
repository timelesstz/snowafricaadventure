"use client";

import dynamic from "next/dynamic";

const TailorMadeForm = dynamic(
  () => import("@/components/forms/TailorMadeForm").then((m) => m.TailorMadeForm),
  { loading: () => <div className="animate-pulse bg-slate-100 rounded-xl h-96" /> }
);

const InquiryForm = dynamic(
  () => import("@/components/forms/InquiryForm").then((m) => m.InquiryForm),
  { loading: () => <div className="animate-pulse bg-slate-100 rounded-xl h-96" /> }
);

interface FormBlockProps {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  formType: string;
  bgColor: string;
}

export function FormBlock({ sectionLabel, heading, subtitle, formType, bgColor }: FormBlockProps) {
  const bgClass = bgColor === "muted" ? "bg-[var(--muted)]" : bgColor === "surface" ? "bg-[var(--surface)]" : "";

  return (
    <section id="inquiry-form" className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            {sectionLabel && (
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
                {sectionLabel}
              </span>
            )}
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {heading}
            </h2>
            {subtitle && (
              <p className="text-[var(--text-muted)]">{subtitle}</p>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[var(--border)]">
            {formType === "tailor-made" && <TailorMadeForm />}
            {formType === "safari-inquiry" && <InquiryForm tripType="Wildlife Safari" variant="full" />}
            {formType === "contact" && <InquiryForm variant="full" />}
            {formType === "general" && <InquiryForm variant="full" />}
          </div>
        </div>
      </div>
    </section>
  );
}

FormBlock.defaultProps = {
  sectionLabel: "Get Started",
  heading: "Let's Plan Your Adventure",
  subtitle: "Fill in your details and we'll get back to you within 24-48 hours.",
  formType: "tailor-made",
  bgColor: "muted",
};
