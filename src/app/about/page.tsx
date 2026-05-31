import type { Metadata } from "next";
import { StorySection } from "@/components/StorySection";
import { PhulkariDivider } from "@/components/PhulkariDivider";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story behind ${business.name} — a pure-vegetarian Punjabi dhaba in Seven Hills, Sydney.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-cream to-brand-cream-soft py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Our story</p>
        <h1 className="mt-3 font-display text-5xl text-brand-red sm:text-6xl">
          The Dhaba Way
        </h1>
        <p className="mx-auto mt-3 max-w-2xl px-6 text-brand-ink/70">
          Punjabi hospitality, served the way it was meant to be — warm, generous, and unhurried.
        </p>
        <PhulkariDivider />
      </section>

      <StorySection />

      <section className="bg-brand-ink py-20 text-brand-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl text-brand-gold sm:text-4xl">
            “Atithi Devo Bhava”
          </h2>
          <p className="mt-2 font-script text-lg text-brand-cream/70">
            The guest is god
          </p>
          <p className="mt-6 text-brand-cream/80">
            Every plate we serve carries the memory of a Punjabi kitchen — the
            clink of brass, the whisper of ghee on hot tava, the smell of cumin
            cracking in the kadhai. Whether you&apos;re a first-time visitor or
            a regular, you&apos;re family at our dhaba.
          </p>
          <p className="mt-6 font-display text-xl text-brand-gold">
            — {business.owner}
          </p>
        </div>
      </section>
    </>
  );
}
