import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const VALID = /\.(jpe?g|png|webp|avif)$/i;

export type GalleryPhoto = {
  src: string;
  alt: string;
};

/**
 * Lists every image file in /public/images/gallery and returns
 * web-ready src paths. Add files there and they appear automatically.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  try {
    const files = fs
      .readdirSync(GALLERY_DIR)
      .filter((f) => VALID.test(f) && !f.startsWith("."))
      .sort();
    return files.map((file) => ({
      src: `/images/gallery/${file}`,
      alt: humanise(file),
    }));
  } catch {
    return [];
  }
}

function humanise(filename: string): string {
  return filename
    .replace(/\.(jpe?g|png|webp|avif)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
