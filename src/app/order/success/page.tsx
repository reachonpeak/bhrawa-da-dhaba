import Link from "next/link";
import { PhulkariDivider } from "@/components/PhulkariDivider";
import { business } from "@/lib/business";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <ClearCartOnMount />
      <div className="text-6xl">🪔</div>
      <h1 className="mt-4 font-display text-5xl text-brand-red">Dhanyavaad!</h1>
      <p className="mt-2 text-lg text-brand-ink/70">Your order is confirmed.</p>
      <PhulkariDivider />
      <div className="ornate-card mt-2 p-8 text-left">
        <p className="text-brand-ink/80">
          A confirmation email is on its way. Please show it (or your order
          name) when you arrive.
        </p>
        <div className="mt-6 space-y-2 text-sm">
          <p><strong>Pickup:</strong> {business.address.full}</p>
          <p><strong>Phone:</strong> <a className="text-brand-red" href={`tel:${business.phone.tel}`}>{business.phone.display}</a></p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/menu" className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-medium text-brand-cream hover:bg-brand-red-dark">
          Order more
        </Link>
        <a href={business.maps} target="_blank" rel="noreferrer" className="rounded-full border border-brand-gold/40 px-5 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-gold/10">
          Get directions
        </a>
      </div>
    </div>
  );
}
