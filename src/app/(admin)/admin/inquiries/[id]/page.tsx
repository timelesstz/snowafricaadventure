import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Calendar,
  Users,
  Clock,
  MessageSquare,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { InquiryStatusBadge } from "@/components/admin/inquiries/InquiryStatusBadge";
import { InquiryTypeBadge } from "@/components/admin/inquiries/InquiryTypeBadge";
import { InquiryActions } from "@/components/admin/inquiries/InquiryActions";
import { ConvertToBookingButton } from "@/components/admin/inquiries/ConvertToBookingButton";
import { InquiryEmailForm } from "@/components/admin/inquiries/InquiryEmailForm";
import { InquiryEditForm } from "@/components/admin/inquiries/InquiryEditForm";

async function getInquiry(id: string) {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  return inquiry;
}

async function getEmailHistory(email: string) {
  return prisma.emailLog.findMany({
    where: { recipient: { contains: email, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      subject: true,
      status: true,
      createdAt: true,
    },
  });
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await getInquiry(id);
  const emailHistory = await getEmailHistory(inquiry.email);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/inquiries"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Inquiry from {inquiry.fullName}
            </h1>
            <p className="text-slate-600 mt-1">
              Received {formatDateTime(inquiry.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <InquiryEditForm inquiry={inquiry} />
          <InquiryTypeBadge type={inquiry.type} />
          <InquiryStatusBadge status={inquiry.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-500">Full Name</label>
                <p className="text-slate-900 font-medium">{inquiry.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Email</label>
                <p className="text-slate-900">
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
                  >
                    <Mail className="w-4 h-4" />
                    {inquiry.email}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
              {inquiry.phone && (
                <div>
                  <label className="text-sm text-slate-500">Phone</label>
                  <p className="text-slate-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {inquiry.phonePrefix && `${inquiry.phonePrefix} `}
                    {inquiry.phone}
                  </p>
                </div>
              )}
              {inquiry.nationality && (
                <div>
                  <label className="text-sm text-slate-500">Nationality</label>
                  <p className="text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    {inquiry.nationality}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Trip Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-500">Inquiry Type</label>
                <p className="text-slate-900 mt-1">
                  <InquiryTypeBadge type={inquiry.type} />
                </p>
              </div>
              {inquiry.tripType && (
                <div>
                  <label className="text-sm text-slate-500">Trip Type</label>
                  <p className="text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {inquiry.tripType}
                  </p>
                </div>
              )}
              {inquiry.arrivalDate && (
                <div>
                  <label className="text-sm text-slate-500">
                    Preferred Travel Date
                  </label>
                  <p className="text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {formatDate(inquiry.arrivalDate)}
                  </p>
                </div>
              )}
              {(inquiry.numAdults || inquiry.numChildren) && (
                <div>
                  <label className="text-sm text-slate-500">Group Size</label>
                  <p className="text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    {inquiry.numAdults || 0} adult
                    {(inquiry.numAdults || 0) !== 1 && "s"}
                    {inquiry.numChildren
                      ? `, ${inquiry.numChildren} child${inquiry.numChildren !== 1 ? "ren" : ""}`
                      : ""}
                  </p>
                </div>
              )}
              {inquiry.relatedTo && (
                <div>
                  <label className="text-sm text-slate-500">Related To</label>
                  <p className="text-slate-900">{inquiry.relatedTo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {inquiry.additionalInfo && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-slate-400" />
                Message
              </h2>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700 whitespace-pre-wrap">
                  {inquiry.additionalInfo}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Email Form */}
          <div id="reply-form">
            <InquiryEmailForm
              inquiryId={inquiry.id}
              recipientName={inquiry.fullName}
              recipientEmail={inquiry.email}
            />
          </div>

          {/* Actions */}
          <InquiryActions inquiry={inquiry} />

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Inquiry Received
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatDateTime(inquiry.createdAt)}
                  </p>
                </div>
              </div>
              {inquiry.updatedAt > inquiry.createdAt && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Last Updated
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDateTime(inquiry.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email history */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Email History
            </h2>
            {emailHistory.length === 0 ? (
              <p className="text-sm text-slate-500">
                No emails sent to this lead yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {emailHistory.map((log) => (
                  <li key={log.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/admin/email-log/${log.id}`}
                        className="text-sm font-medium text-slate-900 hover:text-amber-700 line-clamp-1"
                      >
                        {log.subject}
                      </Link>
                      <p className="text-xs text-slate-500">
                        {new Date(log.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        log.status === "SENT"
                          ? "bg-green-100 text-green-700"
                          : log.status === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="#reply-form"
                className="flex items-center gap-2 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors justify-center"
              >
                <Mail className="w-4 h-4" />
                Reply by Email
              </a>
              <ConvertToBookingButton
                inquiryId={inquiry.id}
                fullName={inquiry.fullName}
                defaultClimbers={(inquiry.numAdults || 1) + (inquiry.numChildren || 0)}
                isConverted={inquiry.status === "converted"}
              />
              <a
                href={`mailto:${inquiry.email}?subject=Re: Your ${inquiry.type} inquiry`}
                className="flex items-center gap-2 w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors justify-center"
                title="Opens your own mail app — the reply won't be logged here, so remember to mark the inquiry as Contacted"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Mail App
              </a>
              {inquiry.phone && (
                <a
                  href={`tel:${inquiry.phonePrefix || ""}${inquiry.phone}`}
                  className="flex items-center gap-2 w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
