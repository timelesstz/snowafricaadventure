"use client";

import { useEffect, useId, useRef } from "react";
import { clsx } from "clsx";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Minimal accessible modal built on the native `<dialog>` element.
 * showModal() handles focus trapping, Escape-to-close, and top-layer rendering.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  // Close on native `close` event (Escape, backdrop, programmatic close).
  const handleClose = () => {
    onClose();
  };

  // Close when clicking the backdrop (the dialog element itself, not its children).
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby={title ? titleId : undefined}
      className={clsx(
        "rounded-xl p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:animate-in open:fade-in-0 open:zoom-in-95",
        className
      )}
    >
      <div className="min-w-[320px] max-w-md p-6">
        {title && (
          <h2
            id={titleId}
            className="text-lg font-semibold text-slate-900 mb-2"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </dialog>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
}

export function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-slate-600 mb-5">{description}</p>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={clsx(
            "px-4 py-2 rounded-lg text-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            tone === "danger"
              ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
              : "bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500"
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  );
}
