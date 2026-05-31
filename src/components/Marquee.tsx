const phrases = [
  "Pure Vegetarian",
  "Hand-rolled Rotis",
  "Tandoor Fresh",
  "Authentic Punjabi",
  "Made with Ghee & Love",
  "South Indian · Bombay · Punjabi",
  "Catering Available",
];

export function Marquee() {
  const doubled = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden bg-brand-red py-3 text-brand-cream">
      <div className="marquee flex w-max gap-12 whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em]">
        {doubled.map((p, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{p}</span>
            <span className="text-brand-gold">❀</span>
          </span>
        ))}
      </div>
    </div>
  );
}
