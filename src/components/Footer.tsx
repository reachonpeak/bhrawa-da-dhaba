import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-gold/30 bg-brand-ink text-brand-cream">
      <div className="phulkari-divider opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="relative h-24 w-32 bg-brand-cream-soft/95 rounded-lg p-2">
            <Image
              src="/images/logo.png"
              alt={business.name}
              fill
              sizes="128px"
              className="object-contain p-1"
            />
          </div>
          <div className="mt-3 font-script text-sm text-brand-cream/70">
            {business.nameGurmukhi}
          </div>
          <p className="mt-3 text-sm text-brand-cream/70">
            Authentic Punjabi flavours from our tandoor to your table. Pure
            vegetarian, made fresh, served with dhaba love.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Visit
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-cream/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a
                href={business.maps}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-gold"
              >
                {business.address.full}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a
                href={`tel:${business.phone.tel}`}
                className="hover:text-brand-gold"
              >
                {business.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a
                href={`mailto:${business.email}`}
                className="hover:text-brand-gold"
              >
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Hours
          </h3>
          <ul className="mt-4 space-y-1 text-sm text-brand-cream/80">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="font-mono text-brand-cream/60">
                  {h.open}–{h.close}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 text-xs text-brand-cream/50">
            <Clock className="h-3 w-3" /> Lunch special weekdays 11am–3pm
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-cream/80">
            <li><Link href="/menu" className="hover:text-brand-gold">Full Menu</Link></li>
            <li><Link href="/catering" className="hover:text-brand-gold">Catering</Link></li>
            <li><Link href="/about" className="hover:text-brand-gold">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-cream/10 px-6 py-4 text-center text-xs text-brand-cream/40 lg:px-8">
        © {new Date().getFullYear()} {business.name} · Owned by {business.owner}
      </div>
    </footer>
  );
}
