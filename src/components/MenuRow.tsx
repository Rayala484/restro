import { Link } from 'react-router-dom';
import { Plus, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { Dish, rupee } from '../data/menu';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FoodImage, VegBadge, SpiceMeter } from './ui';

/** Editorial menu-book row: thumbnail · name/desc · dotted leader · price · add. */
export default function MenuRow({ dish }: { dish: Dish }) {
  const { add } = useCart();
  const { requireAuth, isLoggedIn } = useAuth();
  const [added, setAdded] = useState(false);
  const hasOptions = !!dish.options?.length;

  const quickAdd = () => {
    if (hasOptions) return;
    requireAuth(() => {
      add(dish);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }, `Sign in to order ${dish.name}`);
  };

  return (
    <div className="group flex items-center gap-4 border-b border-sand/70 py-5 last:border-0">
      <Link to={`/item/${dish.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24">
        <FoodImage src={dish.img} emoji={dish.emoji} alt={dish.name} className="h-full w-full transition-transform duration-500 group-hover:scale-110" />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <VegBadge veg={dish.veg} />
          <Link to={`/item/${dish.id}`} className="truncate font-display text-lg font-semibold text-ink hover:text-ember sm:text-xl">{dish.name}</Link>
          <SpiceMeter level={dish.spice} />
        </div>
        <p className="mt-0.5 line-clamp-1 text-sm text-ink/55">{dish.desc}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-ink/45">
          <span className="inline-flex items-center gap-1 rounded-full bg-veg/10 px-2 py-0.5 font-semibold text-veg">★ {dish.rating.toFixed(1)}</span>
          <span>· {dish.prep} min</span>
        </div>
      </div>

      {/* dotted price leader */}
      <div className="hidden flex-1 border-b border-dotted border-sand sm:block" />

      <div className="flex shrink-0 items-center gap-3">
        <span className="font-display text-lg font-semibold text-ink">{rupee(dish.price)}</span>
        {hasOptions ? (
          <Link to={`/item/${dish.id}`} className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition hover:bg-ink hover:text-cream" title="Customise">
            <Plus className="h-4 w-4" />
          </Link>
        ) : (
          <button
            onClick={quickAdd}
            className={`grid h-9 w-9 place-items-center rounded-full transition ${
              added ? 'bg-veg text-white' : 'bg-ink text-cream hover:bg-ember'
            }`}
            title={isLoggedIn ? 'Add to cart' : 'Sign in & add to cart'}
          >
            {added ? (
              <Check className="h-4 w-4" />
            ) : !isLoggedIn ? (
              <Lock className="h-4 w-4 opacity-90" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
