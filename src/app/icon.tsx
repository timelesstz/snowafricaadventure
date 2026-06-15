import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 32, height: 32 };

export default async function Icon() {
  let logoUrl: string | null = null;

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "site.logoUrl" },
    });
    logoUrl = setting?.value || null;
  } catch (error) {
    console.error("Failed to fetch logo from database:", error);
  }

  if (logoUrl) {
    // Return a simple redirect response by rendering the external image
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Logo"
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </div>
      ),
      { ...size }
    );
  }

  // Default favicon - simple mountain/safari themed icon
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
          borderRadius: "4px",
        }}
      >
        <svg
          width="24"
          height="24"
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
