"use client";

import { Bot, User } from "lucide-react";
import { clsx } from "clsx";

interface BotBadgeProps {
  isBot: boolean;
  botName?: string | null;
  size?: "sm" | "md";
}

export function BotBadge({ isBot, botName, size = "md" }: BotBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  if (isBot) {
    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1 rounded-full font-medium bg-purple-100 text-purple-800",
          sizeClasses
        )}
        title={botName || "Bot"}
      >
        <Bot className={iconSize} />
        {botName || "Bot"}
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-medium bg-sky-100 text-sky-800",
        sizeClasses
      )}
    >
      <User className={iconSize} />
      Human
    </span>
  );
}
