"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { useConfirm } from "@/components/admin/ui/useConfirm";

/** Row checkboxes join this form by id, so they can live in a server-rendered table. */
export const BULK_FORM_ID = "booking-bulk-delete";

interface DeleteResponse {
  deleted: string[];
  blocked: { id: string; name: string; reason: string }[];
  missing: string[];
  error?: string;
}

function selectedBoxes(): HTMLInputElement[] {
  return [...document.querySelectorAll<HTMLInputElement>(`input[form="${BULK_FORM_ID}"][name="id"]`)];
}

function reportResult(result: DeleteResponse) {
  const n = result.deleted.length;
  if (n > 0) toast.success(n === 1 ? "Booking deleted" : `${n} bookings deleted`);
  for (const b of result.blocked) toast.error(`${b.name} was kept: ${b.reason}.`);
  if (result.missing.length > 0) toast.message(`${result.missing.length} already gone`);
}

async function postDelete(ids: string[]): Promise<DeleteResponse> {
  const res = await fetch("/api/admin/bookings/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  const body = (await res.json().catch(() => null)) as DeleteResponse | null;
  if (!res.ok || !body) throw new Error(body?.error ?? "Could not delete. Please try again.");
  return body;
}

/** Trash button for one row. */
export function DeleteBookingButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    const ok = await confirm({
      title: "Delete booking?",
      description: `${name}'s booking and its climber links will be removed for good. This can't be undone.`,
      confirmLabel: "Delete booking",
      tone: "danger",
    });
    if (!ok) return;
    setBusy(true);
    try {
      reportResult(await postDelete([id]));
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    } finally {
      setBusy(false);
    }
  };

  const working = busy || pending;
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={working}
        aria-label={`Delete ${name}'s booking`}
        title="Delete booking"
        className="relative z-10 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
      >
        {working ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
      </button>
      {confirmDialog}
    </>
  );
}

/** "Select all on this page" checkbox for the table header. */
export function SelectAllBox() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => {
      const boxes = selectedBoxes().filter((b) => !b.disabled);
      const checked = boxes.filter((b) => b.checked).length;
      if (!ref.current) return;
      ref.current.checked = boxes.length > 0 && checked === boxes.length;
      ref.current.indeterminate = checked > 0 && checked < boxes.length;
      ref.current.disabled = boxes.length === 0;
    };
    sync();
    document.addEventListener("change", sync);
    document.addEventListener(SELECTION_RESET, sync);
    return () => {
      document.removeEventListener("change", sync);
      document.removeEventListener(SELECTION_RESET, sync);
    };
  }, []);

  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Select all bookings on this page"
      className="relative z-10 h-4 w-4 rounded border-slate-300 accent-amber-600"
      onChange={(e) => {
        const on = e.currentTarget.checked;
        for (const b of selectedBoxes()) if (!b.disabled) b.checked = on;
        document.dispatchEvent(new Event(SELECTION_RESET));
      }}
    />
  );
}

const SELECTION_RESET = "booking-selection-change";

/** Bar that appears once rows are ticked. Holds the form the checkboxes belong to. */
export function BulkDeleteBar() {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  const recount = useCallback(() => setCount(selectedBoxes().filter((b) => b.checked).length), []);

  useEffect(() => {
    document.addEventListener("change", recount);
    document.addEventListener(SELECTION_RESET, recount);
    return () => {
      document.removeEventListener("change", recount);
      document.removeEventListener(SELECTION_RESET, recount);
    };
  }, [recount]);

  const clear = () => {
    for (const b of selectedBoxes()) b.checked = false;
    document.dispatchEvent(new Event(SELECTION_RESET));
  };

  const onDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const ids = selectedBoxes().filter((b) => b.checked).map((b) => b.value);
    if (ids.length === 0) return;
    const ok = await confirm({
      title: ids.length === 1 ? "Delete 1 booking?" : `Delete ${ids.length} bookings?`,
      description:
        "They and their climber links will be removed for good. Bookings with money paid are always kept. This can't be undone.",
      confirmLabel: ids.length === 1 ? "Delete booking" : `Delete ${ids.length} bookings`,
      tone: "danger",
    });
    if (!ok) return;
    setBusy(true);
    try {
      reportResult(await postDelete(ids));
      clear();
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form id={BULK_FORM_ID} onSubmit={onDelete}>
      <div
        role="status"
        className={clsx(
          "flex items-center gap-3 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm",
          count === 0 && "hidden"
        )}
      >
        <span className="font-medium text-amber-950">{count} selected</span>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1 rounded text-amber-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
        <button
          type="submit"
          disabled={busy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" aria-hidden="true" />}
          Delete
        </button>
      </div>
      {confirmDialog}
    </form>
  );
}
