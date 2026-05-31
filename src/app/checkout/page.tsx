"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatAUD } from "@/lib/utils";
import { business } from "@/lib/business";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupTime: "",
    notes: "",
  });

  const total = subtotal();
  const gst = total / 11;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-brand-red">Your thali is empty</h1>
        <p className="mt-3 text-brand-ink/70">Pick some dishes before checking out.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-brand-red px-6 py-2.5 font-medium text-brand-cream hover:bg-brand-red-dark"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, customer: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl text-brand-red sm:text-5xl">Checkout</h1>
        <p className="mt-2 text-brand-ink/70">
          Pickup from {business.address.full}
        </p>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
        <form onSubmit={submit} className="space-y-4">
          <div className="ornate-card p-6">
            <h2 className="font-display text-2xl text-brand-ink">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Phone" required>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Pickup time">
                <input
                  type="text"
                  placeholder="ASAP, or e.g. 7:30 pm"
                  value={form.pickupTime}
                  onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Special instructions" className="sm:col-span-2">
                <textarea
                  rows={3}
                  placeholder="Less spicy, extra raita, no onion, etc."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input"
                />
              </Field>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-brand-red/40 bg-brand-red/10 p-3 text-sm text-brand-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-red py-3.5 font-semibold text-brand-cream shadow-md transition hover:bg-brand-red-dark disabled:opacity-60"
          >
            {submitting ? "Redirecting to secure payment…" : `Pay ${formatAUD(total)} with card`}
          </button>
          <p className="text-center text-xs text-brand-ink/50">
            Secure payment via Stripe · Apple Pay & Google Pay supported
          </p>
        </form>

        <aside className="ornate-card h-fit p-6">
          <h2 className="font-display text-xl text-brand-ink">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3">
                <span className="text-brand-ink/80">
                  {l.qty}× {l.name}
                  {l.variant && <span className="text-brand-ink/50"> ({l.variant})</span>}
                </span>
                <span className="font-medium">{formatAUD(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-brand-gold/30 pt-3 text-sm">
            <div className="flex justify-between text-brand-ink/70">
              <span>Subtotal</span>
              <span>{formatAUD(total - gst)}</span>
            </div>
            <div className="flex justify-between text-brand-ink/70">
              <span>GST (10%)</span>
              <span>{formatAUD(gst)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-gold/20 pt-2 font-semibold text-brand-ink">
              <span>Total</span>
              <span>{formatAUD(total)}</span>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 8px;
          border: 1px solid rgba(224, 168, 46, 0.4);
          background: rgba(255, 255, 255, 0.7);
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        :global(.input:focus) {
          border-color: var(--brand-red);
          background: white;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/70">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      {children}
    </label>
  );
}
