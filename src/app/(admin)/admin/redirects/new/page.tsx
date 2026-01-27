import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RedirectForm } from "./RedirectForm";

async function getRedirect(id: string) {
  return prisma.redirect.findUnique({
    where: { id },
  });
}

export default async function NewRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{
    source?: string;
    notFoundId?: string;
    edit?: string;
  }>;
}) {
  const params = await searchParams;
  const sourceUrl = params.source || "";
  const notFoundId = params.notFoundId;
  const editId = params.edit;

  // If editing, fetch the existing redirect
  let existingRedirect = null;
  if (editId) {
    existingRedirect = await getRedirect(editId);
    if (!existingRedirect) {
      redirect("/admin/redirects");
    }
  }

  const isEditing = !!existingRedirect;
  const pageTitle = isEditing ? "Edit Redirect" : "Create Redirect";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/redirects"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{pageTitle}</h1>
          <p className="text-slate-600 mt-1">
            {isEditing
              ? "Modify the redirect configuration"
              : "Create a new URL redirect to fix broken links"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-2xl">
        <RedirectForm
          initialSourceUrl={existingRedirect?.sourceUrl || sourceUrl}
          initialDestinationUrl={existingRedirect?.destinationUrl || ""}
          initialType={existingRedirect?.type || "PERMANENT"}
          initialIsActive={existingRedirect?.isActive ?? true}
          initialNotes={existingRedirect?.notes || ""}
          notFoundId={notFoundId}
          editId={editId}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
