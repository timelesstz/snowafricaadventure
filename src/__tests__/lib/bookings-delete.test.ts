import { describe, expect, it } from "vitest";
import { CommissionStatus } from "@prisma/client";
import { deleteBlocker } from "@/lib/bookings/delete-rules";

const unpaid = { depositPaid: false, balancePaid: false, commission: null };

describe("deleteBlocker", () => {
  it("allows an unpaid booking with no commission", () => {
    expect(deleteBlocker(unpaid)).toBeNull();
  });
  it("allows a pending or voided commission, which goes with the booking", () => {
    expect(deleteBlocker({ ...unpaid, commission: { status: CommissionStatus.PENDING } })).toBeNull();
    expect(deleteBlocker({ ...unpaid, commission: { status: CommissionStatus.VOIDED } })).toBeNull();
  });
  it("keeps any booking with money paid", () => {
    expect(deleteBlocker({ ...unpaid, depositPaid: true })).toMatch(/paid/);
    expect(deleteBlocker({ ...unpaid, balancePaid: true })).toMatch(/paid/);
  });
  it("keeps bookings whose partner commission is earned or paid", () => {
    expect(deleteBlocker({ ...unpaid, commission: { status: CommissionStatus.ELIGIBLE } })).toMatch(/commission/);
    expect(deleteBlocker({ ...unpaid, commission: { status: CommissionStatus.PAID } })).toMatch(/commission/);
  });
});
