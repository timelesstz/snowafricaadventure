import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CmsPageRenderer } from "./CmsPageRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await prisma.cmsPage.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });

  if (!page) return {};

  return {
    title: `${page.title} | Snow Africa Adventure`,
    description: page.description || undefined,
  };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;

  const page = await prisma.cmsPage.findUnique({
    where: { slug },
  });

  if (!page || page.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CmsPageRenderer data={page.puckData as any} />
    </div>
  );
}
