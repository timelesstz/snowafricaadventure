"use client";

import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ui/Dialog";

interface ConfirmDeleteButtonProps {
  message?: string;
  label?: string;
  title?: string;
  className?: string;
}

export default function ConfirmDeleteButton({
  message = "Are you sure you want to delete this? This cannot be undone.",
  title = "Confirm delete",
  label = "Delete",
  className = "inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg",
}: ConfirmDeleteButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    // Submit the enclosing form (server action) programmatically.
    buttonRef.current?.form?.requestSubmit();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
        {label}
      </button>
      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={title}
        description={message}
        confirmLabel={label}
        tone="danger"
      />
    </>
  );
}
