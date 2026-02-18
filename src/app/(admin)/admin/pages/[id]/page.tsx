import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { PuckEditorWrapper } from "./PuckEditorWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PageEditorPage({ params }: Props) {
  await requireRole("EDITOR");
  const { id } = await params;

  const page = await prisma.cmsPage.findUnique({
    where: { id },
  });

  if (!page) {
    notFound();
  }

  return (
    <PuckEditorWrapper
      pageId={page.id}
      pageTitle={page.title}
      pageSlug={page.slug}
      pageStatus={page.status}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialData={page.puckData as any}
    />
  );
}
