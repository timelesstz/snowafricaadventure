import sharp from "sharp";

export interface CompressionResult {
  buffer: Buffer;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  compressionPct: number;
  format: "jpeg" | "png" | "webp";
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: "jpeg" | "png" | "webp" | "auto";
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 85,
  format: "auto",
};

/**
 * Compress an image while maintaining quality
 * Uses sharp for server-side image processing
 */
export async function compressImage(
  input: Buffer,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const originalSize = input.length;

  // Get image metadata
  const metadata = await sharp(input).metadata();
  const originalWidth = metadata.width || 0;
  const originalHeight = metadata.height || 0;

  // Determine output format
  let format: "jpeg" | "png" | "webp" = "jpeg";
  if (opts.format === "auto") {
    // Preserve PNG for images with transparency, otherwise use JPEG
    if (metadata.format === "png" && metadata.hasAlpha) {
      format = "png";
    } else if (metadata.format === "webp") {
      format = "webp";
    } else {
      format = "jpeg";
    }
  } else {
    format = opts.format;
  }

  // Calculate resize dimensions (maintain aspect ratio)
  let width = originalWidth;
  let height = originalHeight;

  if (originalWidth > opts.maxWidth || originalHeight > opts.maxHeight) {
    const widthRatio = opts.maxWidth / originalWidth;
    const heightRatio = opts.maxHeight / originalHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    width = Math.round(originalWidth * ratio);
    height = Math.round(originalHeight * ratio);
  }

  // Build sharp pipeline
  let pipeline = sharp(input).resize(width, height, {
    fit: "inside",
    withoutEnlargement: true,
  });

  // Apply format-specific compression
  let buffer: Buffer;
  switch (format) {
    case "png":
      buffer = await pipeline
        .png({
          quality: opts.quality,
          compressionLevel: 9,
        })
        .toBuffer();
      break;
    case "webp":
      buffer = await pipeline
        .webp({
          quality: opts.quality,
          effort: 6,
        })
        .toBuffer();
      break;
    case "jpeg":
    default:
      buffer = await pipeline
        .jpeg({
          quality: opts.quality,
          mozjpeg: true,
        })
        .toBuffer();
      break;
  }

  const compressedSize = buffer.length;
  const compressionPct = Math.round(
    ((originalSize - compressedSize) / originalSize) * 100
  );

  return {
    buffer,
    width,
    height,
    originalSize,
    compressedSize,
    compressionPct: Math.max(0, compressionPct),
    format,
  };
}

/**
 * Generate a thumbnail for an image
 */
export async function generateThumbnail(
  input: Buffer,
  size: number = 400
): Promise<Buffer> {
  return sharp(input)
    .resize(size, size, {
      fit: "cover",
      position: "center",
    })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

/**
 * Get image dimensions without processing
 */
export async function getImageDimensions(
  input: Buffer
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(input).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}

/**
 * Validate that a buffer is a valid image
 */
export async function isValidImage(input: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(input).metadata();
    return !!metadata.format;
  } catch {
    return false;
  }
}

/**
 * Get MIME type for compression format
 */
export function getMimeType(format: "jpeg" | "png" | "webp"): string {
  switch (format) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "jpeg":
    default:
      return "image/jpeg";
  }
}
