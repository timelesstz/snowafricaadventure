"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config, PuckComponent } from "@measured/puck";
import { HeroBlock } from "./blocks/HeroBlock";
import { TextBlock } from "./blocks/TextBlock";
import { ImageTextBlock } from "./blocks/ImageTextBlock";
import { StepsBlock } from "./blocks/StepsBlock";
import { FeaturesBlock } from "./blocks/FeaturesBlock";
import { TestimonialsBlock } from "./blocks/TestimonialsBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { FormBlock } from "./blocks/FormBlock";
import { ChecklistBlock } from "./blocks/ChecklistBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { SpacerBlock } from "./blocks/SpacerBlock";

// Cast block components to Puck's expected type
const asBlock = (fn: any) => fn as PuckComponent<any>;

export const puckConfig: Config<any> = {
  categories: {
    layout: {
      title: "Layout",
      components: ["HeroBlock", "SpacerBlock"],
    },
    content: {
      title: "Content",
      components: ["TextBlock", "ImageTextBlock", "GalleryBlock"],
    },
    engagement: {
      title: "Engagement",
      components: ["FeaturesBlock", "StepsBlock", "ChecklistBlock"],
    },
    social: {
      title: "Social Proof",
      components: ["TestimonialsBlock", "FaqBlock"],
    },
    actions: {
      title: "Actions",
      components: ["CtaBlock", "FormBlock"],
    },
  },
  components: {
    HeroBlock: {
      label: "Hero Section",
      defaultProps: HeroBlock.defaultProps,
      render: asBlock(HeroBlock),
    },
    TextBlock: {
      label: "Text Section",
      defaultProps: TextBlock.defaultProps,
      render: asBlock(TextBlock),
    },
    ImageTextBlock: {
      label: "Image + Text",
      defaultProps: ImageTextBlock.defaultProps,
      render: asBlock(ImageTextBlock),
    },
    StepsBlock: {
      label: "Process Steps",
      defaultProps: StepsBlock.defaultProps,
      render: asBlock(StepsBlock),
    },
    FeaturesBlock: {
      label: "Feature Cards",
      defaultProps: FeaturesBlock.defaultProps,
      render: asBlock(FeaturesBlock),
    },
    TestimonialsBlock: {
      label: "Testimonials",
      defaultProps: TestimonialsBlock.defaultProps,
      render: asBlock(TestimonialsBlock),
    },
    FaqBlock: {
      label: "FAQ Section",
      defaultProps: FaqBlock.defaultProps,
      render: asBlock(FaqBlock),
    },
    CtaBlock: {
      label: "Call to Action",
      defaultProps: CtaBlock.defaultProps,
      render: asBlock(CtaBlock),
    },
    FormBlock: {
      label: "Inquiry Form",
      defaultProps: FormBlock.defaultProps,
      render: asBlock(FormBlock),
    },
    ChecklistBlock: {
      label: "Checklist",
      defaultProps: ChecklistBlock.defaultProps,
      render: asBlock(ChecklistBlock),
    },
    GalleryBlock: {
      label: "Image Gallery",
      defaultProps: GalleryBlock.defaultProps,
      render: asBlock(GalleryBlock),
    },
    SpacerBlock: {
      label: "Spacer",
      defaultProps: SpacerBlock.defaultProps,
      render: asBlock(SpacerBlock),
    },
  },
};
