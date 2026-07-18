"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/components/admin/ui/useConfirm";

interface RedirectDeleteButtonProps {
  id: string;
  sourceUrl: string;
}

export function RedirectDeleteButton({ id, sourceUrl }: RedirectDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();

  async function handleDelete() {
    const ok = await confirm({
      title: "Delete redirect",
      description: `Are you sure you want to delete the redirect for "${sourceUrl}"?`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/redirects/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const error = await res.json();
          alert(error.message || "Failed to delete redirect");
          return;
        }

        router.refresh();
      } catch (error) {
        console.error("Error deleting redirect:", error);
        alert("Failed to delete redirect");
      }
    });
  }

  return (
    <>
      {confirmDialog}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
