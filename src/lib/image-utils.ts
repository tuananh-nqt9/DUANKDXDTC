/**
 * Image Optimization Utilities
 * Tối ưu hóa hình ảnh cho performance
 */

import { ImageProps } from "next/image";

// ===== CLOUDINARY CONFIG (Optional - nếu dùng Cloudinary) =====
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

/**
 * Generate optimized image URL
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: "webp" | "avif" | "auto";
  } = {}
): string {
  const { width, quality = 80, format = "auto" } = options;

  // Nếu là external URL, return as-is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Nếu là local image, Next.js sẽ tự optimize
  return src;
}

/**
 * Lazy loading image với blur placeholder
 */
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${src}?w=${width}&q=${quality || 75}`;
};

/**
 * Common image sizes cho responsive
 */
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 320, height: 240 },
  medium: { width: 640, height: 480 },
  large: { width: 1024, height: 768 },
  hero: { width: 1920, height: 1080 },
};

/**
 * Default blur data URL
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

/**
 * Generate placeholder for images
 */
export function generatePlaceholder(width: number, height: number, text?: string): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3E${
    text || "Loading..."
  }%3C/text%3E%3C/svg%3E`;
}

/**
 * Common image props for optimization
 */
export const optimizedImageProps: Partial<ImageProps> = {
  loading: "lazy",
  placeholder: "blur",
  blurDataURL: BLUR_DATA_URL,
  quality: 80,
};
