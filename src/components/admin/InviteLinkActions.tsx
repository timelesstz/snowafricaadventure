"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function InviteLinkActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (isActive && !confirm("Revoke this invite link? Guests will no longer be able to use it.")) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/invite-links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to update invite link");
      } else {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg disabled:opacity-50 ${
        isActive
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      {loading && <Loader2 className="w-3 h-3 animate-spin" />}
      {isActive ? "Revoke" : "Reactivate"}
    </button>
  );
}
