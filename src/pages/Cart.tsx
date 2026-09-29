import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Lock, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { rupee } from '../data/menu';
import { FoodImage, VegBadge } from '../components/ui';

export default function Cart() {
  const { lines, inc, dec, remove, subtotal, count } = useCart();
  const { user, isLoggedIn } = useAuth();
  const nav = useNavigate();
  const delivery = subtotal >= 299 || subtotal === 0 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  if (count === 0) {
    return (
      <div className="container-x py-20 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-5xl shadow-card">🛒</div>
        <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-1 text-ink/50">Add some delicious dishes to get started.</p>
        <Link to="/menu" className="btn-primary mt-6">Browse menu <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <h1 className="mb-6 font-display text-3xl font-extrabold">Your Cart <span className="text-ink/40">({count})</span></h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {lines.map((l) => (
            <div key={l.key} className="card flex items-center gap-4 p-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><FoodImage src={l.dish.img} emoji={l.dish.emoji} alt={l.dish.name} className="h-full w-full" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><VegBadge veg={l.dish.veg} /><p className="truncate font-display font-semibold">{l.dish.name}</p></div>
                {l.options.length > 0 && <p className="truncate text-xs text-ink/50">{l.options.join(' · ')}</p>}
                <p className="mt-1 font-display font-bold text-ember">{rupee(l.unit)}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-sand bg-white p-1">
                <button onClick={() => dec(l.key)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                <button onClick={() => inc(l.key)} className="grid h-8 w-8 place-items-center rounded-full bg-ember text-white"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <button onClick={() => remove(l.key)} className="grid h-9 w-9 place-items-center rounded-full text-ink/40 hover:bg-chili/10 hover:text-chili"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <Link to="/menu" className="inline-flex items-center gap-1 text-sm font-semibold text-ember hover:underline">+ Add more items</Link>
        </div>

        {/* Bill */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20 p-5">
            <div className="mb-3 flex items-center gap-2 rounded-2xl border border-dashed border-ember/40 bg-ember/5 p-3">
              <Tag className="h-4 w-4 text-ember" />
              <input placeholder="Coupon code" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button className="text-sm font-bold text-ember">Apply</button>
            </div>
            <h3 className="mb-3 font-display text-lg font-bold">Bill details</h3>
            <dl className="space-y-2 text-sm">
              <Row k="Item total" v={rupee(subtotal)} />
              <Row k="Delivery fee" v={delivery === 0 ? 'FREE' : rupee(delivery)} accent={delivery === 0} />
              <Row k="Taxes & charges" v={rupee(taxes)} />
              <div className="my-2 border-t border-dashed border-sand" />
              <div className="flex justify-between font-display text-lg font-bold"><span>To pay</span><span>{rupee(total)}</span></div>
            </dl>
            {isLoggedIn ? (
              <>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-veg/10 p-2.5 text-xs text-veg">
                  <UserCheck className="h-4 w-4 shrink-0" />
                  <span className="truncate">Ordering as <strong>{user?.name || user?.phone}</strong></span>
                </div>
                <button onClick={() => nav('/checkout')} className="btn-primary mt-3 w-full">
                  <ShoppingBag className="h-5 w-5" /> Proceed to Checkout · {rupee(total)}
                </button>
              </>
            ) : (
              <>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-500/10 p-2.5 text-xs text-amber-800">
                  <Lock className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>Sign in required before placing order</span>
                </div>
                <button onClick={() => nav('/login?redirect=/checkout')} className="btn-primary mt-3 w-full">
                  <Lock className="h-5 w-5" /> Sign In to Place Order · {rupee(total)}
                </button>
              </>
            )}
            {delivery > 0 && <p className="mt-2 text-center text-xs text-ink/50">Add {rupee(299 - subtotal)} more for free delivery 🚴</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return <div className="flex justify-between"><dt className="text-ink/60">{k}</dt><dd className={accent ? 'font-bold text-veg' : 'font-medium'}>{v}</dd></div>;
}
