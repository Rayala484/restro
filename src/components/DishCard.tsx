import { Link } from 'react-router-dom';
import { Plus, Clock } from 'lucide-react';
import { Dish, rupee } from '../data/menu';
import { useCart } from '../context/CartContext';
import { FoodImage, VegBadge, SpiceMeter, Stars } from './ui';

export default function DishCard({ dish }: { dish: Dish }) {
  const { add } = useCart();
  const hasOptions = !!dish.options?.length;

  return (
    <div className="card group overflow-hidden flex flex-col animate-rise">
      <Link to={`/item/${dish.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <FoodImage src={dish.img} emoji={dish.emoji} alt={dish.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        {dish.popular && (
          <span className="chip absolute left-3 top-3 bg-ink/85 text-white backdrop-blur">🔥 Popular</span>
        )}
        <span className="absolute right-3 top-3"><VegBadge veg={dish.veg} /></span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <Link to={`/item/${dish.id}`} className="font-display text-lg font-semibold leading-tight hover:text-ember">
            {dish.name}
          </Link>
        </div>
        <div className="mb-2 flex items-center gap-3">
          <Stars rating={dish.rating} />
          <SpiceMeter level={dish.spice} />
          <span className="inline-flex items-center gap-1 text-xs text-ink/50"><Clock className="h-3 w-3" />{dish.prep}m</span>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-ink/60">{dish.desc}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-xl font-bold">{rupee(dish.price)}</span>
          {hasOptions ? (
            <Link to={`/item/${dish.id}`} className="btn-primary btn-sm">Customise <Plus className="h-4 w-4" /></Link>
          ) : (
            <button onClick={() => add(dish)} className="btn-primary btn-sm">Add <Plus className="h-4 w-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
