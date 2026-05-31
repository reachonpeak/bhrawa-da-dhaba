import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PhulkariDivider } from "@/components/PhulkariDivider";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Bharawan Daa Dhaba — our food, kitchen, and dhaba in Seven Hills, NSW.",
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <>
      <section className="bg-gradient-to-b from-brand-cream to-brand-cream-soft py-14 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-red">A taste before you arrive</p>
        <h1 className="mt-3 font-display text-5xl text-brand-red sm:text-6xl">Gallery</h1>
        <p className="mx-auto mt-3 max-w-2xl px-6 text-brand-ink/70">
          Glimpses from our kitchen — the food, the smiles, the dhaba.
        </p>
        <PhulkariDivider />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <GalleryGrid photos={photos} />
        )}
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="ornate-card mx-auto mt-8 max-w-2xl p-10 text-center">
      <div className="text-5xl">📸</div>
      <h2 className="mt-3 font-display text-2xl text-brand-red">No photos yet</h2>
      <p className="mt-2 text-sm text-brand-ink/70">
        Drop image files into{" "}
        <code className="rounded bg-brand-gold/15 px-1.5 py-0.5 text-xs">
          public/images/gallery/
        </code>{" "}
        and they&apos;ll appear here automatically.
      </p>
    </div>
  );
}
