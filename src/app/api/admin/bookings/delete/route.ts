import { NextResponse } from "next/server";
import { z } from "zod";
import { AdminRole } from "@prisma/client";
import { auth, requireRole } from "@/lib/auth";
import { MAX_BULK_DELETE, deleteBookings } from "@/lib/bookings/delete";

const bodySchema = z.object({
  ids: z.array(z.string().min(1).max(64)).min(1).max(MAX_BULK_DELETE),
});

// POST /api/admin/bookings/delete - Delete several bookings (ADMIN+ only).
// Bookings with money attached are skipped and reported back, never deleted.
export async function POST(request: Request) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    return NextResponse.json({ error: msg }, { status: msg === "Insufficient permissions" ? 403 : 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: `Send 1 to ${MAX_BULK_DELETE} booking IDs.` }, { status: 400 });
  }

  try {
    const session = await auth();
    const result = await deleteBookings(parsed.data.ids, session?.user?.email ?? "unknown admin");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting bookings:", error);
    return NextResponse.json({ error: "Failed to delete bookings" }, { status: 500 });
  }
}
