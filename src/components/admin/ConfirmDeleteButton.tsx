"use client";

import { Trash2 } from "lucide-react";

interface ConfirmDeleteButtonProps {
  message?: string;
  label?: string;
  className?: string;
}

export default function ConfirmDeleteButton({
  message = "Are you sure you want to delete this? This cannot be undone.",
  label = "Delete",
  className = "inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg",
}: ConfirmDeleteButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(message)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 className="w-4 h-4" />
      {label}
    </button>
  );
}
