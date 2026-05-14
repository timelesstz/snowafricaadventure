import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Hash,
  FileJson,
  RefreshCw,
  Send,
  MessageCircle,
  Globe,
  Monitor,
} from "lucide-react";
import { EmailStatus, CommunicationChannel } from "@prisma/client";
import { StatusBadge, type StatusTone } from "@/components/admin/ui";
import { ResendButton } from "./ResendButton";

const STATUS_TONE: Record<EmailStatus, StatusTone> = {
  SENT: "success",
  PENDING: "pending",
  FAILED: "danger",
  BOUNCED: "orange",
};

const STATUS_ICON: Record<EmailStatus, typeof CheckCircle2> = {
  SENT: CheckCircle2,
  PENDING: Clock,
  FAILED: AlertCircle,
  BOUNCED: AlertTriangle,
};

function formatDateTime(date: Date | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function timeSince(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function EmailLogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const log = await prisma.emailLog.findUnique({ where: { id } });
  if (!log) notFound();

  const isWhatsApp = log.channel === CommunicationChannel.WHATSAPP;

  const relatedLogs = await prisma.emailLog.findMany({
    where: isWhatsApp
      ? { channel: "WHATSAPP", id: { not: log.id } }
      : { recipient: log.recipient, id: { not: log.id } },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      channel: true,
      subject: true,
      status: true,
      type: true,
      createdAt: true,
    },
  });
  const Icon = STATUS_ICON[log.status];
  const metadata = log.metadata as Record<string, unknown> | null;

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link
        href="/admin/email-log/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Communications Log
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${
              isWhatsApp ? "bg-green-100" :
              log.status === "SENT" ? "bg-green-100" :
              log.status === "PENDING" ? "bg-yellow-100" :
              log.status === "FAILED" ? "bg-red-100" : "bg-orange-100"
            }`}>
              {isWhatsApp ? (
                <MessageCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Icon className={`w-5 h-5 ${
                  log.status === "SENT" ? "text-green-600" :
                  log.status === "PENDING" ? "text-yellow-600" :
                  log.status === "FAILED" ? "text-red-600" : "text-orange-600"
                }`} />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-900 truncate">{log.subject}</h1>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                  isWhatsApp ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {isWhatsApp ? "WhatsApp" : "Email"}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {isWhatsApp ? "To:" : "To:"} <span className="font-medium text-slate-700">{log.recipient}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <StatusBadge label={log.status} tone={STATUS_TONE[log.status]} />
            {log.status === "FAILED" && log.channel === "EMAIL" && (
              <ResendButton emailId={log.id} />
            )}
          </div>
        </div>

        {/* Detail grid */}
        {isWhatsApp ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <DetailField icon={MessageCircle} label="Action" value={log.type.replace(/_/g, " ")} />
              <DetailField icon={Globe} label="Page" value={(metadata?.page as string) || "—"} />
              <DetailField icon={Clock} label="Clicked" value={formatDateTime(log.createdAt)} sub={timeSince(log.createdAt)} />
            </div>
            {metadata?.userAgent ? (
              <div className="grid grid-cols-1 divide-y divide-slate-100 border-t border-slate-100">
                <DetailField icon={Monitor} label="User Agent" value={String(metadata.userAgent)} mono />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <DetailField icon={Mail} label="Recipient" value={log.recipient} />
              <DetailField icon={Hash} label="Type" value={log.type} />
              <DetailField icon={Clock} label="Created" value={formatDateTime(log.createdAt)} sub={timeSince(log.createdAt)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-t border-slate-100">
              <DetailField icon={Send} label="Sent At" value={log.sentAt ? formatDateTime(log.sentAt) : "Not sent yet"} />
              <DetailField icon={RefreshCw} label="Updated" value={formatDateTime(log.updatedAt)} />
              <DetailField icon={Hash} label="Message ID" value={log.messageId || "—"} mono />
            </div>
          </>
        )}
      </div>

      {/* Error section */}
      {log.error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <h2 className="text-sm font-semibold text-red-800">Error Details</h2>
          </div>
          <pre className="text-sm text-red-700 whitespace-pre-wrap break-words font-mono bg-red-100/50 rounded-md p-3">
            {log.error}
          </pre>
        </div>
      ) : null}

      {/* WhatsApp pre-filled message */}
      {isWhatsApp && metadata?.message ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <h2 className="text-sm font-semibold text-slate-800">Pre-filled Message</h2>
          </div>
          <div className="p-5">
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <p className="text-sm text-slate-800 leading-relaxed">{String(metadata.message)}</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Metadata section */}
      {metadata && Object.keys(metadata).length > 0 && !isWhatsApp ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <FileJson className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-800">Metadata</h2>
          </div>
          <div className="p-4">
            <pre className="text-xs text-slate-600 whitespace-pre-wrap break-words font-mono bg-slate-50 rounded-md p-4 max-h-80 overflow-y-auto">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
        </div>
      ) : null}

      {/* Timeline: related communications */}
      {relatedLogs.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">
              {isWhatsApp ? "Recent WhatsApp clicks" : `Other emails to ${log.recipient}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {relatedLogs.length} related record{relatedLogs.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {relatedLogs.map((related) => (
              <Link
                key={related.id}
                href={`/admin/email-log/${related.id}/`}
                className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors"
              >
                <StatusBadge
                  label={related.status}
                  tone={STATUS_TONE[related.status]}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-800 truncate">{related.subject}</p>
                  <p className="text-xs text-slate-400">{related.type}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">
                  {timeSince(related.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({
  icon: FieldIcon,
  label,
  value,
  sub,
  mono,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  sub?: string;
  mono?: boolean;
}) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-2 mb-1">
        <FieldIcon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-sm text-slate-900 truncate ${mono ? "font-mono text-xs" : ""}`} title={value}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}
