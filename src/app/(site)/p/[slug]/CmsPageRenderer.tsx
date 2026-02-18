"use client";

import { Render, type Data } from "@measured/puck";
import { puckConfig } from "@/lib/cms/config";

interface CmsPageRendererProps {
  data: Data;
}

export function CmsPageRenderer({ data }: CmsPageRendererProps) {
  return <Render config={puckConfig} data={data} />;
}
