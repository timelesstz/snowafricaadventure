"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the InquiryForm to reduce initial bundle size
const InquiryForm = dynamic(
  () => import("./InquiryForm").then((mod) => ({ default: mod.InquiryForm })),
  {
    ssr: false,
    loading: () => <InquiryFormSkeleton />,
  }
);

function InquiryFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-24 bg-gray-200 rounded" />
      <div className="h-12 bg-gray-300 rounded" />
    </div>
  );
}

interface LazyInquiryFormProps {
  relatedTo?: string;
  tripType?: string;
  variant?: "sidebar" | "full" | "hero";
  showInviteSection?: boolean;
}

export function LazyInquiryForm(props: LazyInquiryFormProps) {
  return (
    <Suspense fallback={<InquiryFormSkeleton />}>
      <InquiryForm {...props} />
    </Suspense>
  );
}

export default LazyInquiryForm;
