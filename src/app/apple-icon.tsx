import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default async function AppleIcon() {
  let iconUrl: string | null = null;

  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { in: ["site.appleTouchIconUrl", "site.logoUrl"] },
      },
    });

    const appleIcon = settings.find((s) => s.key === "site.appleTouchIconUrl");
    const logo = settings.find((s) => s.key === "site.logoUrl");

    iconUrl = appleIcon?.value || logo?.value || null;
  } catch (error) {
    console.error("Failed to fetch apple icon from database:", error);
  }

  // If we have an icon URL, render it
  if (iconUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            borderRadius: "22px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconUrl}
            alt="Apple Touch Icon"
            width={160}
            height={160}
            style={{ objectFit: "contain" }}
          />
        </div>
      ),
      { ...size }
    );
  }

  // Default apple icon - safari themed
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
          borderRadius: "22px",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "#F59E0B" }}
        >
          <path
            d="M12 2L2 22h20L12 2z"
            fill="currentColor"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
