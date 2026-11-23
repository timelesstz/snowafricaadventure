import { prisma } from "@/lib/prisma";
import { deleteBlocker, MAX_BULK_DELETE } from "./delete-rules";

export { deleteBlocker, MAX_BULK_DELETE } from "./delete-rules";

/**
 * Deletes bookings that pass deleteBlocker. Climber links go with the booking
 * (cascade); a pending commission is removed in the same transaction, so a
 * failure never leaves half a booking behind.
 */

export interface DeleteResult {
  deleted: string[];
  blocked: { id: string; name: string; reason: string }[];
  missing: string[];
}

export async function deleteBookings(ids: string[], actor: string): Promise<DeleteResult> {
  const unique = [...new Set(ids)].slice(0, MAX_BULK_DELETE);
  const found = await prisma.booking.findMany({
    where: { id: { in: unique } },
    select: { id: true, leadName: true, depositPaid: true, balancePaid: true, commission: { select: { status: true } } },
  });

  const blocked: DeleteResult["blocked"] = [];
  const deletable: string[] = [];
  for (const b of found) {
    const reason = deleteBlocker(b);
    if (reason) blocked.push({ id: b.id, name: b.leadName, reason });
    else deletable.push(b.id);
  }

  if (deletable.length > 0) {
    await prisma.$transaction([
      // Only PENDING or VOIDED commissions can be left at this point.
      prisma.commission.deleteMany({ where: { bookingId: { in: deletable } } }),
      prisma.booking.deleteMany({ where: { id: { in: deletable } } }),
    ]);
    console.info(`[bookings] ${actor} deleted ${deletable.length} booking(s): ${deletable.join(", ")}`);
  }

  const seen = new Set(found.map((b) => b.id));
  return { deleted: deletable, blocked, missing: unique.filter((id) => !seen.has(id)) };
}
