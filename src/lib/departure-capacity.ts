import { Prisma } from "@prisma/client";

/**
 * Serialize capacity-changing writes on the departure row. The lock and every
 * subsequent capacity read/write must use this same transaction client.
 */
export async function lockDepartureForCapacity(
  tx: Prisma.TransactionClient,
  departureId: string
): Promise<boolean> {
  const rows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT id FROM "GroupDeparture" WHERE id = ${departureId} FOR UPDATE
  `;
  return rows.length > 0;
}

/** Thrown inside a transaction when a booking write would overbook a departure. */
export class SeatLimitError extends Error {
  constructor(public available: number, public max: number) {
    super("Not enough seats on this departure");
  }
}
