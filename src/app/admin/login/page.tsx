"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"email" | "google" | null>(null);

  // Exchange a Firebase ID token for a server-side session cookie.
  async function establishSession(idToken: string) {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      // Not authorized (or failed) — drop the client Firebase session too.
      await signOut(getFirebaseAuth()).catch(() => {});
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Sign-in failed");
    }
    router.replace("/admin");
    router.refresh();
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    setError(null);
    try {
      const auth = getFirebaseAuth();
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      await establishSession(await cred.user.getIdToken());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setLoading(null);
    }
  };

  const signInGoogle = async () => {
    setLoading("google");
    setError(null);
    try {
      const auth = getFirebaseAuth();
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      await establishSession(await cred.user.getIdToken());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
      <div className="ornate-card w-full p-8">
        <h1 className="font-display text-3xl text-brand-red">Admin sign-in</h1>
        <p className="mt-1 text-sm text-brand-ink/70">Sign in to manage orders and the menu.</p>

        <form onSubmit={submitEmail} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/70">
              Email
            </span>
            <input
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-brand-gold/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/70">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-brand-gold/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-brand-red"
            />
          </label>
          {error && (
            <div className="rounded-md border border-brand-red/40 bg-brand-red/10 p-2 text-sm text-brand-red">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading !== null}
            className="w-full rounded-full bg-brand-red py-2.5 text-sm font-semibold text-brand-cream hover:bg-brand-red-dark disabled:opacity-60"
          >
            {loading === "email" ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-brand-ink/40">
          <span className="h-px flex-1 bg-brand-gold/30" />
          or
          <span className="h-px flex-1 bg-brand-gold/30" />
        </div>

        <button
          type="button"
          onClick={signInGoogle}
          disabled={loading !== null}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-gold/40 bg-white/70 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-gold/10 disabled:opacity-60"
        >
          {loading === "google" ? "Opening Google…" : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
