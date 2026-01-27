/**
 * Email logging service
 * Tracks all sent emails for debugging and analytics
 */

import { prisma } from "@/lib/prisma";
import { EmailStatus, Prisma } from "@prisma/client";

export interface LogEmailData {
  recipient: string;
  subject: string;
  type: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log a pending email
 */
export async function logEmailPending(data: LogEmailData) {
  try {
    const log = await prisma.emailLog.create({
      data: {
        recipient: data.recipient,
        subject: data.subject,
        type: data.type,
        status: EmailStatus.PENDING,
        metadata: data.metadata as Prisma.InputJsonValue,
      },
    });
    return { success: true, logId: log.id };
  } catch (error) {
    console.error("Failed to log email:", error);
    return { success: false };
  }
}

/**
 * Update email log to sent
 */
export async function logEmailSent(logId: string, messageId?: string) {
  try {
    await prisma.emailLog.update({
      where: { id: logId },
      data: {
        status: EmailStatus.SENT,
        messageId,
        sentAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update email log:", error);
    return { success: false };
  }
}

/**
 * Update email log to failed
 */
export async function logEmailFailed(logId: string, error: string) {
  try {
    await prisma.emailLog.update({
      where: { id: logId },
      data: {
        status: EmailStatus.FAILED,
        error,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update email log:", error);
    return { success: false };
  }
}

/**
 * Get email logs with filtering
 */
export async function getEmailLogs(filters: {
  recipient?: string;
  type?: string;
  status?: EmailStatus;
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
}) {
  const where: Prisma.EmailLogWhereInput = {};

  if (filters.recipient) {
    where.recipient = { contains: filters.recipient, mode: "insensitive" };
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = filters.startDate;
    }
    if (filters.endDate) {
      where.createdAt.lte = filters.endDate;
    }
  }

  const [logs, total] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filters.limit || 50,
      skip: filters.offset || 0,
    }),
    prisma.emailLog.count({ where }),
  ]);

  return { logs, total };
}

/**
 * Get email statistics
 */
export async function getEmailStats(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [total, sent, failed, byType] = await Promise.all([
    prisma.emailLog.count({
      where: { createdAt: { gte: startDate } },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: startDate }, status: EmailStatus.SENT },
    }),
    prisma.emailLog.count({
      where: { createdAt: { gte: startDate }, status: EmailStatus.FAILED },
    }),
    prisma.emailLog.groupBy({
      by: ["type"],
      where: { createdAt: { gte: startDate } },
      _count: { type: true },
    }),
  ]);

  return {
    total,
    sent,
    failed,
    successRate: total > 0 ? ((sent / total) * 100).toFixed(1) : "0",
    byType: byType.map((t) => ({ type: t.type, count: t._count.type })),
  };
}

/**
 * Clean up old email logs
 */
export async function cleanupOldEmailLogs(daysOld: number = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  try {
    const result = await prisma.emailLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });
    return { success: true, deleted: result.count };
  } catch (error) {
    console.error("Failed to cleanup old email logs:", error);
    return { success: false, deleted: 0 };
  }
}
