"use client";

import { motion } from "framer-motion";

const pillars = [
  { icon: "🌿", title: "Pure Vegetarian", body: "Every dish, every day. No exceptions, just like the dhabas back home." },
  { icon: "🔥", title: "Tandoor Fresh", body: "Naans, rotis and kulchas baked to order in our wood-fired tandoor." },
  { icon: "🥣", title: "Slow & Honest", body: "Dal makhani simmers for hours. Saag is hand-pounded. The good things take time." },
  { icon: "🪔", title: "Dhaba Heart", body: "Generous portions, warm welcomes — the spirit of a roadside Punjabi kitchen." },
];

export function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Our story</p>
          <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">
            From the streets of Punjab to Seven Hills
          </h2>
          <p className="mt-5 text-brand-ink/75">
            A dhaba isn&apos;t just a restaurant — it&apos;s a feeling. The
            charpoy in the corner, the clink of steel thalis, the unhurried
            simmer of a slow dal. We brought that feeling with us and we serve
            it on every plate.
          </p>
          <p className="mt-4 text-brand-ink/75">
            Owned and run by <strong>Honey Khaneja</strong>, every recipe in our
            kitchen is family — passed from grandmothers, refined by mothers,
            served by us.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="ornate-card p-5"
            >
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-2 font-display text-lg text-brand-red">{p.title}</h3>
              <p className="mt-1 text-sm text-brand-ink/70">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
