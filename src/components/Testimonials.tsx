"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya S.",
    rating: 5,
    text: "Best dhaba-style chole bhature in Sydney. Tastes exactly like the parathas my dadi used to make.",
    where: "Seven Hills",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Honey ji's hospitality is unmatched. The shahi paneer is rich without being heavy — easily a 10/10.",
    where: "Parramatta",
  },
  {
    name: "Anita K.",
    rating: 5,
    text: "Catered our Diwali function for 80 guests. Everything was fresh, on time and the variety was incredible.",
    where: "Blacktown",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Pyaar from our guests</p>
        <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">What people say</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="ornate-card relative flex h-full flex-col p-6"
          >
            <div className="text-5xl font-display leading-none text-brand-gold/40">“</div>
            <blockquote className="-mt-2 flex-1 text-brand-ink/80">{t.text}</blockquote>
            <div className="mt-4 flex items-center justify-between">
              <figcaption>
                <div className="font-medium text-brand-ink">{t.name}</div>
                <div className="text-xs text-brand-ink/50">{t.where}</div>
              </figcaption>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
