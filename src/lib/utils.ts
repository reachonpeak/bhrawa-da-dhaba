import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAUD(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape user-supplied values before interpolating them into HTML (e.g. email templates). */
export function escapeHtml(input: unknown): string {
  return String(input ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Validate an email address and reject CRLF (header-injection) and over-long values. */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  if (/[\r\n]/.test(email)) return false; // header injection
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Allow only http(s) absolute URLs or site-relative paths for image fields. */
export function isSafeImageUrl(url: string): boolean {
  if (typeof url !== "string" || !url) return false;
  if (url.startsWith("/")) return true; // site-relative asset under /public
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false; // also rejects javascript: / data: and malformed URLs
  }
}
