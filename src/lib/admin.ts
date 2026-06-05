// Admin auth now lives in `@/lib/auth` and is backed by Firebase Authentication
// (session cookies + an email allowlist). This module re-exports the stable
// surface so existing import sites (`@/lib/admin`) keep working unchanged.
//
// The previous custom HMAC cookie implementation — including the insecure
// "dev-secret-change-me" fallback secret — has been removed entirely.
export {
  ADMIN_COOKIE,
  isAdminAuthenticated,
  isEmailAllowed,
  getAllowedEmails,
} from "@/lib/auth";
