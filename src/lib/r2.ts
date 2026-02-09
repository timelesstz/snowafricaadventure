import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize R2 client
const R2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

/**
 * Upload a file to Cloudflare R2
 */
export async function uploadToR2(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<string> {
  await R2.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  return getR2Url(key);
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<void> {
  await R2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
  );
}

/**
 * Get a signed URL for private file access
 */
export async function getSignedR2Url(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(R2, command, { expiresIn });
}

/**
 * Get the public URL for a file
 */
export function getR2Url(key: string): string {
  return `${PUBLIC_URL}/${key}`;
}

/**
 * Generate a unique file key with proper path structure
 */
export function generateFileKey(
  category: "uploads" | "routes" | "safaris" | "destinations" | "blog" | "general" | "daytrips" | "reviews" | "homepage",
  filename: string
): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "-");

  return `${category}/${year}/${month}/${timestamp}-${sanitizedFilename}`;
}

/**
 * List objects in R2 bucket with pagination
 */
export async function listR2Objects(options: {
  prefix?: string;
  maxKeys?: number;
  continuationToken?: string;
} = {}): Promise<{
  objects: { key: string; size: number; lastModified: Date | undefined }[];
  nextToken: string | undefined;
  isTruncated: boolean;
}> {
  const result = await R2.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: options.prefix,
      MaxKeys: options.maxKeys || 100,
      ContinuationToken: options.continuationToken,
    })
  );

  return {
    objects: (result.Contents || []).map((obj) => ({
      key: obj.Key!,
      size: obj.Size || 0,
      lastModified: obj.LastModified,
    })),
    nextToken: result.NextContinuationToken,
    isTruncated: result.IsTruncated || false,
  };
}

/**
 * Get metadata for a single R2 object
 */
export async function getR2ObjectMeta(key: string): Promise<{
  size: number;
  contentType: string | undefined;
  lastModified: Date | undefined;
} | null> {
  try {
    const result = await R2.send(
      new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key })
    );
    return {
      size: result.ContentLength || 0,
      contentType: result.ContentType,
      lastModified: result.LastModified,
    };
  } catch {
    return null;
  }
}

export default R2;
