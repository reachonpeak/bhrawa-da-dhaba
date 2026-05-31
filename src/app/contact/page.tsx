import type { Metadata } from "next";
import { VisitSection } from "@/components/VisitSection";
import { PhulkariDivider } from "@/components/PhulkariDivider";

export const metadata: Metadata = {
  title: "Contact & Find Us",
  description: "Find Bharawan Daa Dhaba in Seven Hills, Sydney. Address, phone, email and opening hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-cream to-brand-cream-soft py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Visit · Call · Email</p>
        <h1 className="mt-3 font-display text-5xl text-brand-red sm:text-6xl">Find us</h1>
        <PhulkariDivider />
      </section>
      <VisitSection />
    </>
  );
}
