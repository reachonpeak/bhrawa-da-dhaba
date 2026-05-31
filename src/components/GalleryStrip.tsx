import Link from "next/link";
import Image from "next/image";
import { getGalleryPhotos } from "@/lib/gallery";

export function GalleryStrip() {
  const photos = getGalleryPhotos().slice(0, 8);
  if (photos.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">From our kitchen</p>
          <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">Snapshots</h2>
        </div>
        <Link
          href="/gallery"
          className="hidden text-sm font-medium text-brand-red hover:underline sm:block"
        >
          See full gallery →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((p, i) => (
          <Link
            key={p.src}
            href="/gallery"
            className={`group relative overflow-hidden rounded-xl border border-brand-gold/30 ${
              i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/gallery"
          className="text-sm font-medium text-brand-red hover:underline"
        >
          See full gallery →
        </Link>
      </div>
    </section>
  );
}
