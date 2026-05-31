import type { Metadata } from "next";
import { CateringForm } from "@/components/CateringForm";
import { PhulkariDivider } from "@/components/PhulkariDivider";

export const metadata: Metadata = {
  title: "Catering",
  description: "Punjabi & North Indian catering for weddings, birthdays, corporate lunches and parties across Sydney.",
};

export default function CateringPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-cream to-brand-cream-soft py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Feed your celebration</p>
        <h1 className="mt-3 font-display text-5xl text-brand-red sm:text-6xl">
          Catering
        </h1>
        <p className="mx-auto mt-3 max-w-2xl px-6 text-brand-ink/70">
          From intimate gatherings of 15 to weddings of 500 — we bring the dhaba to you.
        </p>
        <PhulkariDivider />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-5">
            <div className="ornate-card p-6">
              <h2 className="font-display text-2xl text-brand-red">What we cater</h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-brand-ink/80">
                <li>· Weddings & Sangeets</li>
                <li>· Corporate lunches</li>
                <li>· Birthday parties</li>
                <li>· Diwali & Holi events</li>
                <li>· Community functions</li>
                <li>· Office Friday lunches</li>
                <li>· Engagement parties</li>
                <li>· Funeral lunches</li>
              </ul>
            </div>
            <div className="ornate-card p-6">
              <h2 className="font-display text-2xl text-brand-red">How it works</h2>
              <ol className="mt-3 space-y-2 text-sm text-brand-ink/80">
                <li><strong>1.</strong> Tell us your date, headcount and any preferences.</li>
                <li><strong>2.</strong> We send a tailored menu and quote within 24 hours.</li>
                <li><strong>3.</strong> Pickup, delivery or full setup — your choice.</li>
              </ol>
            </div>
          </div>

          <CateringForm />
        </div>
      </section>
    </>
  );
}
