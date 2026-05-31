export function PhulkariDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 ${className}`}>
      <svg width="80" height="16" viewBox="0 0 80 16" className="text-brand-gold">
        <path
          d="M0 8 H30 M50 8 H80"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="35" cy="8" r="2" fill="currentColor" />
        <circle cx="45" cy="8" r="2" fill="currentColor" />
        <circle cx="40" cy="2" r="1.5" fill="currentColor" />
        <circle cx="40" cy="14" r="1.5" fill="currentColor" />
      </svg>
      <svg width="32" height="32" viewBox="0 0 32 32" className="text-brand-red">
        <g fill="currentColor">
          <circle cx="16" cy="16" r="3" />
          <path d="M16 4 L18 14 L16 16 L14 14 Z" />
          <path d="M16 28 L18 18 L16 16 L14 18 Z" />
          <path d="M4 16 L14 18 L16 16 L14 14 Z" />
          <path d="M28 16 L18 18 L16 16 L18 14 Z" />
          <path d="M7 7 L14 14 L16 16 L14 14 Z" opacity="0.7" />
          <path d="M25 25 L18 18 L16 16 L18 18 Z" opacity="0.7" />
          <path d="M7 25 L14 18 L16 16 L14 18 Z" opacity="0.7" />
          <path d="M25 7 L18 14 L16 16 L18 14 Z" opacity="0.7" />
        </g>
      </svg>
      <svg width="80" height="16" viewBox="0 0 80 16" className="text-brand-gold">
        <path
          d="M0 8 H30 M50 8 H80"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="35" cy="8" r="2" fill="currentColor" />
        <circle cx="45" cy="8" r="2" fill="currentColor" />
        <circle cx="40" cy="2" r="1.5" fill="currentColor" />
        <circle cx="40" cy="14" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
