import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { Marquee } from "@/components/Marquee";
import { PhulkariDivider } from "@/components/PhulkariDivider";
import { SignatureDishes } from "@/components/SignatureDishes";
import { GalleryStrip } from "@/components/GalleryStrip";
import { StorySection } from "@/components/StorySection";
import { VisitSection } from "@/components/VisitSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <Marquee />
      <SignatureDishes />
      <PhulkariDivider />
      <GalleryStrip />
      <PhulkariDivider />
      <StorySection />
      <PhulkariDivider />
      <Testimonials />
      <PhulkariDivider />
      <VisitSection />
      <PhulkariDivider />
      <FAQ />
      <section className="bg-brand-red py-14 text-center text-brand-cream">
        <h2 className="font-display text-3xl sm:text-4xl">Catering for every celebration</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-cream/80">
          Birthdays, weddings, Diwali parties, office lunches — let our dhaba feed your guests.
        </p>
        <Link href="/catering" className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-ink hover:bg-brand-cream">
          Enquire about catering
        </Link>
      </section>
    </>
  );
}
