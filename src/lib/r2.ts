import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `R2 media storage is unavailable. Check your .env and restart.`
    );
  }
  return value;
}

// Lazily construct the R2 client so that importing this module (e.g. during
// `next build` page-data collection) doesn't require R2 credentials to exist.
// Pages that don't actually call R2 at build time will never touch getR2().
let cached: {
  client: S3Client;
  bucket: string;
  publicUrl: string;
} | null = null;

function getR2() {
  if (cached) return cached;
  const endpoint = requireEnv("R2_ENDPOINT");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");
  const bucket = requireEnv("R2_BUCKET_NAME");
  const publicUrl = requireEnv("R2_PUBLIC_URL");

  cached = {
    client: new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    }),
    bucket,
    publicUrl,
  };
  return cached;
}

/**
 * Upload a file to Cloudflare R2
 */
export async function uploadToR2(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<string> {
  const { client, bucket } = getR2();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
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
  const { client, bucket } = getR2();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
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
  const { client, bucket } = getR2();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Get the public URL for a file
 */
export function getR2Url(key: string): string {
  const { publicUrl } = getR2();
  return `${publicUrl}/${key}`;
}

/**
 * Generate a unique file key with proper path structure
 */
export function generateFileKey(
  category:
    | "uploads"
    | "routes"
    | "safaris"
    | "destinations"
    | "blog"
    | "general"
    | "daytrips"
    | "reviews"
    | "homepage",
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
export async function listR2Objects(
  options: {
    prefix?: string;
    maxKeys?: number;
    continuationToken?: string;
  } = {}
): Promise<{
  objects: { key: string; size: number; lastModified: Date | undefined }[];
  nextToken: string | undefined;
  isTruncated: boolean;
}> {
  const { client, bucket } = getR2();
  const result = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
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
    const { client, bucket } = getR2();
    const result = await client.send(
      new HeadObjectCommand({ Bucket: bucket, Key: key })
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
