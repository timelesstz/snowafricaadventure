interface SpacerBlockProps {
  height: string;
}

export function SpacerBlock({ height }: SpacerBlockProps) {
  const heightClasses: Record<string, string> = {
    sm: "h-8",
    md: "h-16",
    lg: "h-24",
    xl: "h-32",
  };

  return <div className={heightClasses[height] || "h-16"} />;
}

SpacerBlock.defaultProps = {
  height: "md",
};
