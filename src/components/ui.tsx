import { useState } from 'react';
import { Star, Flame } from 'lucide-react';

/** Food image that gracefully falls back to a warm gradient + emoji if it fails to load. */
export function FoodImage({ src, emoji, alt, className = '' }: { src: string; emoji: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-sand via-cream to-saffron/30 ${className}`}>
        <span className="text-5xl sm:text-6xl drop-shadow-sm">{emoji}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export function VegBadge({ veg }: { veg: boolean }) {
  const color = veg ? 'border-veg' : 'border-nonveg';
  const dot = veg ? 'bg-veg' : 'bg-nonveg';
  return (
    <span className={`veg-dot ${color} bg-white`} title={veg ? 'Veg' : 'Non-veg'}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </span>
  );
}

export function SpiceMeter({ level }: { level: number }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-0.5" title={`Spice ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <Flame key={i} className={`h-3.5 w-3.5 ${i <= level ? 'text-chili' : 'text-sand'}`} fill={i <= level ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

export function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
      <span className="inline-flex items-center gap-1 rounded-full bg-veg px-2 py-0.5 text-white">
        <Star className="h-3 w-3" fill="currentColor" /> {rating.toFixed(1)}
      </span>
      {count != null && <span className="text-ink/50 text-xs font-medium">({count.toLocaleString('en-IN')})</span>}
    </span>
  );
}
