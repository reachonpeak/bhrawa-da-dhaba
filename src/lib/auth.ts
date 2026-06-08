import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";

export const ADMIN_COOKIE = "dhaba_admin";

// Firebase session cookie lifetime (max allowed by Firebase is 14 days).
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/** Single source of truth for the session cookie flags — used for both set and clear. */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Parsed allowlist of admin emails from ADMIN_ALLOWED_EMAILS (comma-separated). */
export function getAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email?: string | null): boolean {
  if (!email) return false;
  return getAllowedEmails().includes(email.toLowerCase());
}

/**
 * Whether a decoded Firebase token represents a sufficiently-trusted identity.
 *
 * We require a verified email for OAuth providers (e.g. Google). For the
 * email/password provider we accept the account as long as its email is on the
 * allowlist: the admin provisions these accounts manually, and because the
 * allowlisted email already exists it cannot be hijacked via Firebase's public
 * self-signup API (the address is taken). The allowlist remains the gate.
 */
function isTrustedIdentity(decoded: { email?: string; email_verified?: boolean; firebase?: { sign_in_provider?: string } }): boolean {
  if (!isEmailAllowed(decoded.email)) return false;
  if (decoded.email_verified === true) return true;
  return decoded.firebase?.sign_in_provider === "password";
}

/**
 * Authoritative server-side admin check. Verifies the Firebase session cookie
 * (with revocation check) AND re-checks the email allowlist on every request, so
 * removing an email or revoking tokens locks out existing sessions immediately.
 *
 * Keeps the original name + Promise<boolean> signature so existing call sites
 * (admin layout/pages and the admin menu API routes) work unchanged.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const auth = getAdminAuth();
  if (!auth) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  try {
    const decoded = await auth.verifySessionCookie(cookie, true /* checkRevoked */);
    return isTrustedIdentity(decoded);
  } catch {
    return false;
  }
}

type SessionResult = { ok: true } | { ok: false; status: number; error: string };

/**
 * Verifies a client ID token, enforces the allowlist + verified email, mints a
 * Firebase session cookie and sets it. Returns a generic error result on
 * failure (no internal details leaked to the client).
 */
export async function createAdminSession(idToken: unknown): Promise<SessionResult> {
  if (typeof idToken !== "string" || !idToken) {
    return { ok: false, status: 400, error: "Missing credential" };
  }
  const auth = getAdminAuth();
  if (!auth) {
    return { ok: false, status: 503, error: "Admin authentication is not configured" };
  }
  try {
    const decoded = await auth.verifyIdToken(idToken, true /* checkRevoked */);
    if (!isTrustedIdentity(decoded)) {
      return { ok: false, status: 403, error: "Not authorized" };
    }
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    });
    (await cookies()).set(ADMIN_COOKIE, sessionCookie, {
      ...SESSION_COOKIE_OPTIONS,
      maxAge: SESSION_MAX_AGE_MS / 1000,
    });
    return { ok: true };
  } catch {
    return { ok: false, status: 401, error: "Authentication failed" };
  }
}

/** Best-effort logout: revoke the session's refresh tokens and clear the cookie. */
export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  const auth = getAdminAuth();
  if (cookie && auth) {
    try {
      const decoded = await auth.verifySessionCookie(cookie);
      await auth.revokeRefreshTokens(decoded.sub);
    } catch {
      // ignore — we still clear the cookie below
    }
  }
  store.set(ADMIN_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
}
