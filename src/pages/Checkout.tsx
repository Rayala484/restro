import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Banknote, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { rupee } from '../data/menu';

export default function Checkout() {
  const { lines, subtotal, count, clear } = useCart();
  const nav = useNavigate();
  const [pay, setPay] = useState('upi');
  const delivery = subtotal >= 299 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  if (count === 0) { nav('/cart'); return null; }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'MT' + Math.floor(100000 + Math.random() * 899999);
    try { localStorage.setItem('restro_last_order', JSON.stringify({ id, total, items: lines.length, when: Date.now(), pay })); } catch {}
    clear();
    nav('/order/' + id);
  };

  return (
    <div className="container-x py-8">
      <button onClick={() => nav('/cart')} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ember"><ArrowLeft className="h-4 w-4" /> Back to cart</button>
      <h1 className="mb-6 font-display text-3xl font-extrabold">Checkout</h1>

      <form onSubmit={placeOrder} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Address */}
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold"><MapPin className="h-5 w-5 text-ember" /> Delivery address</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name" className="input" />
              <input required placeholder="Phone number" className="input" inputMode="tel" />
              <input required placeholder="Flat / House no." className="input" />
              <input required placeholder="Area / Locality" className="input" />
              <input required placeholder="City" className="input" defaultValue="Hyderabad" />
              <input required placeholder="Pincode" className="input" inputMode="numeric" />
              <textarea placeholder="Delivery notes (optional) — e.g. ring the bell" className="input sm:col-span-2" rows={2} />
            </div>
          </section>

          {/* Payment */}
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold"><CreditCard className="h-5 w-5 text-ember" /> Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ id: 'upi', icon: Wallet, label: 'UPI / Wallet' }, { id: 'card', icon: CreditCard, label: 'Card' }, { id: 'cod', icon: Banknote, label: 'Cash on delivery' }].map((m) => {
                const active = pay === m.id;
                return (
                  <button type="button" key={m.id} onClick={() => setPay(m.id)}
                    className={`flex items-center gap-2 rounded-2xl border p-4 text-left text-sm font-semibold transition ${active ? 'border-ember bg-ember/5 ring-2 ring-ember/20' : 'border-sand bg-white hover:border-ember/40'}`}>
                    <m.icon className={`h-5 w-5 ${active ? 'text-ember' : 'text-ink/40'}`} /> {m.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/50"><ShieldCheck className="h-3.5 w-3.5 text-veg" /> Demo checkout — no real payment is taken.</p>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20 p-5">
            <h3 className="mb-3 font-display text-lg font-bold">Order summary</h3>
            <ul className="mb-3 max-h-48 space-y-2 overflow-auto text-sm">
              {lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-2"><span className="truncate text-ink/70">{l.qty} × {l.dish.name}</span><span className="font-medium">{rupee(l.qty * l.unit)}</span></li>
              ))}
            </ul>
            <div className="space-y-1.5 border-t border-dashed border-sand pt-3 text-sm">
              <div className="flex justify-between"><span className="text-ink/60">Item total</span><span>{rupee(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-ink/60">Delivery</span><span className={delivery === 0 ? 'font-bold text-veg' : ''}>{delivery === 0 ? 'FREE' : rupee(delivery)}</span></div>
              <div className="flex justify-between"><span className="text-ink/60">Taxes</span><span>{rupee(taxes)}</span></div>
              <div className="mt-2 flex justify-between border-t border-dashed border-sand pt-2 font-display text-lg font-bold"><span>Total</span><span>{rupee(total)}</span></div>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full">Place order · {rupee(total)}</button>
            <Link to="/menu" className="mt-2 block text-center text-xs text-ink/50 hover:text-ember">Add more items</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
