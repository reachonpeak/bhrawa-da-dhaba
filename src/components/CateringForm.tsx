"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CateringForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send");
      setSent(true);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="ornate-card flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="text-5xl">🪔</div>
        <h3 className="mt-3 font-display text-2xl text-brand-red">Thank you!</h3>
        <p className="mt-2 text-brand-ink/70">
          We&apos;ll be in touch within 24 hours with a tailored menu and quote.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="ornate-card space-y-3 p-6">
      <h2 className="font-display text-2xl text-brand-red">Enquire</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="name" label="Your name" required />
        <Input name="phone" label="Phone" type="tel" required />
        <Input name="email" label="Email" type="email" required className="sm:col-span-2" />
        <Input name="eventDate" label="Event date" type="date" />
        <Input name="guests" label="Number of guests" type="number" min={10} />
        <Input name="eventType" label="Event type" placeholder="Wedding, birthday, office…" className="sm:col-span-2" />
        <label className="sm:col-span-2 block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/70">
            Tell us more
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="Cuisine preferences, dietary needs, venue, delivery vs pickup…"
            className="w-full rounded-lg border border-brand-gold/40 bg-white/70 p-3 text-sm focus:border-brand-red focus:bg-white focus:outline-none"
          />
        </label>
      </div>
      {err && <p className="text-sm text-brand-red">{err}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-red py-3 font-semibold text-brand-cream hover:bg-brand-red-dark disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Input({
  name, label, type = "text", required, placeholder, className = "", min,
}: {
  name: string; label: string; type?: string; required?: boolean;
  placeholder?: string; className?: string; min?: number;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-ink/70">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full rounded-lg border border-brand-gold/40 bg-white/70 p-2.5 text-sm focus:border-brand-red focus:bg-white focus:outline-none"
      />
    </label>
  );
}
