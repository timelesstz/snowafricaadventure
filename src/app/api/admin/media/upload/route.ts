import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToR2, generateFileKey } from "@/lib/r2";
import {
  compressImage,
  generateThumbnail,
  isValidImage,
  getMimeType,
} from "@/lib/image-compression";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const alt = formData.get("alt") as string | null;
    const title = formData.get("title") as string | null;
    const compress = formData.get("compress") !== "false"; // Default to true

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed types: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const originalSize = buffer.length;

    const isImage = file.type.startsWith("image/") && file.type !== "image/gif";
    let finalBuffer: Buffer = buffer;
    let width: number | undefined;
    let height: number | undefined;
    let compressionPct: number | undefined;
    let mimeType = file.type;

    // Process images (except GIFs to preserve animation)
    if (isImage && compress) {
      const valid = await isValidImage(buffer);
      if (!valid) {
        return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
      }

      const result = await compressImage(buffer, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 85,
      });

      finalBuffer = Buffer.from(result.buffer);
      width = result.width;
      height = result.height;
      compressionPct = result.compressionPct;
      mimeType = getMimeType(result.format);
    }

    // Generate file key
    const extension = mimeType.split("/")[1] || "bin";
    const sanitizedName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    const key = generateFileKey(
      folder as "uploads" | "routes" | "safaris" | "destinations" | "blog" | "general",
      `${sanitizedName}.${extension}`
    );

    // Upload main file to R2
    const url = await uploadToR2(finalBuffer, key, mimeType);

    // Generate and upload thumbnail for images
    let thumbnailUrl: string | undefined;
    if (isImage) {
      try {
        const thumbnail = await generateThumbnail(buffer, 400);
        const thumbKey = key.replace(/(\.[^/.]+)$/, "-thumb$1");
        thumbnailUrl = await uploadToR2(thumbnail, thumbKey, "image/jpeg");
      } catch (e) {
        console.error("Thumbnail generation failed:", e);
        // Continue without thumbnail
      }
    }

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        key,
        url,
        thumbnailUrl,
        mimeType,
        size: finalBuffer.length,
        width,
        height,
        alt,
        title,
        folder,
        originalSize,
        compressionPct,
        uploadedBy: session.user.name || session.user.email || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      media: {
        id: media.id,
        url: media.url,
        thumbnailUrl: media.thumbnailUrl,
        filename: media.filename,
        size: media.size,
        originalSize: media.originalSize,
        compressionPct: media.compressionPct,
        width: media.width,
        height: media.height,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
