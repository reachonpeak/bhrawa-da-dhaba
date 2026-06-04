import { business } from "@/lib/business";
import { Phone, Mail, MapPin } from "lucide-react";
import { OpenStatus } from "@/components/OpenStatus";

export function VisitSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Come hungry</p>
          <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">
            Visit our dhaba
          </h2>
          <p className="mt-3 text-brand-ink/70">
            Tucked in Seven Hills — easy parking, easier hospitality.
          </p>
          <ul className="mt-6 space-y-4 text-brand-ink/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-red" />
              <div>
                <div className="font-medium">{business.address.full}</div>
                <a
                  href={business.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-red underline-offset-2 hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-brand-red" />
              <a href={`tel:${business.phone.tel}`} className="font-medium hover:text-brand-red">
                {business.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand-red" />
              <a href={`mailto:${business.email}`} className="font-medium hover:text-brand-red">
                {business.email}
              </a>
            </li>
          </ul>

          <div className="ornate-card mt-6 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg text-brand-red">Hours</h3>
              <OpenStatus />
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-brand-ink/80">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span className="font-mono text-brand-ink/60">{h.open}–{h.close}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-gold/30 shadow-lg">
          <iframe
            src={business.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 420 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map to Bharawan Daa Dhaba"
          />
        </div>
      </div>
    </section>
  );
}
