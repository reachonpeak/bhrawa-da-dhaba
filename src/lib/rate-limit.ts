import "server-only";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting helper.
 *
 * Uses Upstash Redis (durable, works across Vercel's serverless instances) when
 * UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are configured. Otherwise
 * falls back to a best-effort in-memory limiter — fine for local dev, but NOT
 * reliable on serverless where each invocation may be a fresh instance.
 */

type Limiter = (key: string) => Promise<{ ok: boolean }>;

function buildUpstashLimiter(limit: number, windowSec: number): Limiter | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: "ratelimit",
  });
  return async (key: string) => {
    const { success } = await ratelimit.limit(key);
    return { ok: success };
  };
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryLimiter(limit: number, windowSec: number): Limiter {
  return async (key: string) => {
    const now = Date.now();
    const windowMs = windowSec * 1000;
    const entry = memoryStore.get(key);
    if (!entry || entry.resetAt <= now) {
      memoryStore.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true };
    }
    entry.count += 1;
    return { ok: entry.count <= limit };
  };
}

/**
 * Returns { ok: false } when the caller has exceeded `limit` requests within
 * `windowSec` seconds for the given `key` (typically `route:ip`).
 */
export async function checkRateLimit(
  key: string,
  limit = 5,
  windowSec = 60
): Promise<{ ok: boolean }> {
  const limiter = buildUpstashLimiter(limit, windowSec) ?? memoryLimiter(limit, windowSec);
  try {
    return await limiter(key);
  } catch {
    // Never let a limiter outage take down the endpoint.
    return { ok: true };
  }
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
