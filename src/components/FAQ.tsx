"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Are all dishes vegetarian?",
    a: "Yes — Bharawan Daa Dhaba is 100% pure vegetarian. We have plenty of no-onion / no-garlic (NOG) options too, marked on each item.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes — choose Delivery at checkout. We deliver within metro Sydney; delivery fee and ETA are confirmed by phone after your order. For wider catering, see our catering page.",
  },
  {
    q: "Are prices GST inclusive?",
    a: "All prices on our menu and checkout include 10% Australian GST.",
  },
  {
    q: "How early should I order for pickup?",
    a: "Most orders are ready in 20–30 minutes. For large or thali orders, we recommend giving us 45 minutes — just leave a note at checkout.",
  },
  {
    q: "Do you cater for events?",
    a: "Yes — from 20 to 500 guests. Birthdays, weddings, Diwali parties, corporate lunches. Submit our catering form and we'll send a quote within a day.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Good to know</p>
        <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">Frequently asked</h2>
      </div>
      <div className="mt-10 divide-y divide-brand-gold/30 rounded-2xl border border-brand-gold/30 bg-white/60">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="block w-full px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-brand-ink">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-brand-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
              <div
                className={`grid overflow-hidden text-sm text-brand-ink/70 transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">{f.a}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
