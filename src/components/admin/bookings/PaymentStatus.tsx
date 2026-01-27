"use client";

import { Check, X, Clock } from "lucide-react";
import { clsx } from "clsx";

interface PaymentStatusProps {
  depositPaid: boolean;
  balancePaid: boolean;
  depositAmount?: number | null;
  totalPrice: number;
  size?: "sm" | "md";
}

export function PaymentStatus({
  depositPaid,
  balancePaid,
  depositAmount,
  totalPrice,
  size = "md",
}: PaymentStatusProps) {
  const depositAmountNum = depositAmount ? Number(depositAmount) : 0;
  const totalPriceNum = Number(totalPrice);
  const balanceAmount = totalPriceNum - depositAmountNum;

  const isFullyPaid = depositPaid && balancePaid;
  const isPartiallyPaid = depositPaid && !balancePaid;
  const isUnpaid = !depositPaid && !balancePaid;

  return (
    <div className={clsx("space-y-1", size === "sm" ? "text-xs" : "text-sm")}>
      {/* Overall Status */}
      <div className="flex items-center gap-2">
        {isFullyPaid ? (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <Check className="w-4 h-4" />
            Fully Paid
          </span>
        ) : isPartiallyPaid ? (
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            <Clock className="w-4 h-4" />
            Deposit Paid
          </span>
        ) : (
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <X className="w-4 h-4" />
            Unpaid
          </span>
        )}
      </div>

      {/* Breakdown */}
      <div className="text-slate-500 space-y-0.5">
        <div className="flex items-center justify-between">
          <span>Deposit:</span>
          <span className={depositPaid ? "text-green-600" : "text-slate-400"}>
            ${depositAmountNum.toLocaleString()}
            {depositPaid && " ✓"}
          </span>
        </div>
        {balanceAmount > 0 && (
          <div className="flex items-center justify-between">
            <span>Balance:</span>
            <span className={balancePaid ? "text-green-600" : "text-slate-400"}>
              ${balanceAmount.toLocaleString()}
              {balancePaid && " ✓"}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between font-medium text-slate-700 pt-1 border-t border-slate-200">
          <span>Total:</span>
          <span>${totalPriceNum.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
