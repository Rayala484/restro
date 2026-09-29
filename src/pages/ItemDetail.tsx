import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, Clock, ArrowLeft, ShoppingBag, Lock, UserCheck } from 'lucide-react';
import { dishById, rupee, dishes } from '../data/menu';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FoodImage, VegBadge, SpiceMeter, Stars } from '../components/ui';
import DishCard from '../components/DishCard';

export default function ItemDetail() {
  const { id } = useParams();
  const dish = dishById(id || '');
  const nav = useNavigate();
  const { add } = useCart();
  const { user, isLoggedIn, requireAuth } = useAuth();
  const [qty, setQty] = useState(1);
  const [chosen, setChosen] = useState<Record<string, string>>({});

  if (!dish) {
    return (
      <div className="container-x py-20 text-center">
        <p className="text-2xl">🤔 Dish not found</p>
        <Link to="/menu" className="btn-primary mt-4">Back to menu</Link>
      </div>
    );
  }

  const groups = useMemo(() => {
    const g: Record<string, typeof dish.options> = {};
    (dish.options || []).forEach((o) => { (g[o.group] ||= [] as any).push(o); });
    return g;
  }, [dish]);

  const selectedOpts = Object.entries(chosen).map(([group, name]) => {
    const o = (dish.options || []).find((x) => x.group === group && x.name === name);
    return o ? { name: o.name, delta: o.delta } : null;
  }).filter(Boolean) as { name: string; delta: number }[];

  const unit = dish.price + selectedOpts.reduce((s, o) => s + o.delta, 0);

  const addToCart = () => {
    requireAuth(() => {
      add(dish, selectedOpts, qty);
      nav('/cart');
    }, `Sign in to order ${dish.name}`);
  };

  const similar = dishes.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 4);

  return (
    <div className="container-x py-6">
      <button onClick={() => nav(-1)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ember">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-4xl shadow-lift">
          <FoodImage src={dish.img} emoji={dish.emoji} alt={dish.name} className="aspect-square w-full" />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-3">
            <VegBadge veg={dish.veg} />
            <SpiceMeter level={dish.spice} />
            {dish.popular && <span className="chip bg-ember/10 text-ember">🔥 Popular</span>}
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-tight">{dish.name}</h1>
          <div className="mt-2 flex items-center gap-4">
            <Stars rating={dish.rating} count={dish.ratingCount} />
            <span className="inline-flex items-center gap-1 text-sm text-ink/50">
              <Clock className="h-4 w-4" /> {dish.prep} min
            </span>
          </div>
          <p className="mt-4 text-ink/70">{dish.desc}</p>

          {Object.entries(groups).map(([group, opts]) => (
            <div key={group} className="mt-6">
              <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-ink/70">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {opts!.map((o) => {
                  const active = chosen[group] === o.name;
                  return (
                    <button
                      key={o.name}
                      onClick={() => setChosen((c) => ({ ...c, [group]: active ? '' : o.name }))}
                      className={`chip border px-4 py-2 ${
                        active
                          ? 'border-ember bg-ember text-white'
                          : 'border-sand bg-white text-ink/70 hover:border-ember/50'
                      }`}
                    >
                      {o.name}{o.delta ? ` +${rupee(o.delta)}` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Auth status banner before ordering */}
          <div className="mt-8">
            {!isLoggedIn ? (
              <div className="mb-3 flex items-center gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900">
                <Lock className="h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Sign In / Registration required to order:</strong> Provide your name, mobile, and address to place an order.
                </span>
              </div>
            ) : (
              <div className="mb-3 flex items-center gap-2 rounded-2xl border border-veg/20 bg-veg/5 p-2.5 text-xs text-veg">
                <UserCheck className="h-4 w-4 shrink-0" />
                <span>Signed in as <strong>{user?.name}</strong> (+91 {user?.phone})</span>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-sand bg-white p-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-display font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ember text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={addToCart} className="btn-primary flex-1">
                {!isLoggedIn ? <Lock className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {!isLoggedIn ? `Sign in to Add ${qty} · ${rupee(unit * qty)}` : `Add ${qty} · ${rupee(unit * qty)}`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold">You may also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((d) => <DishCard key={d.id} dish={d} />)}
          </div>
        </section>
      )}
    </div>
  );
}
