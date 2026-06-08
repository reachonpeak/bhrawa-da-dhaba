import type { NextConfig } from "next";

// Content-Security-Policy allowing Firebase Auth (incl. Google popup), Stripe and Square.
// NOTE: script-src uses 'unsafe-inline' because Next.js injects inline bootstrap
// scripts and the auth/payment popups need inline execution. Tighten to a
// nonce-based policy later if desired.
//
// 'unsafe-eval' is allowed ONLY in development — Next.js dev (HMR + eval source
// maps) requires it. The production bundle contains no eval()/new Function(), so
// we omit it in prod for a stronger policy.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : "",
  "https://apis.google.com https://www.gstatic.com https://js.stripe.com https://*.squarecdn.com https://sandbox.web.squarecdn.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://api.stripe.com https://*.squareup.com https://*.squarecdn.com",
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://*.google.com https://js.stripe.com https://*.squareup.com https://*.squarecdn.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
