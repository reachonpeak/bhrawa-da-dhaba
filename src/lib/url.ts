/**
 * Trusted base URL for building outbound redirect targets (Stripe/Square checkout).
 *
 * SECURITY: never derive the redirect base from the request `Origin`/`Host`
 * headers — those are client-controlled and enable open-redirect / phishing.
 * Always use the configured canonical site URL instead.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  // Vercel injects this for the current deployment when NEXT_PUBLIC_SITE_URL is unset.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}
