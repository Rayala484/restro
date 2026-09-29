import { Link } from 'react-router-dom';
import { MapPin, Heart, Wallet, LogOut, ChevronRight, Package } from 'lucide-react';
import { rupee } from '../data/menu';

export default function Account() {
  let last: any = null;
  try { last = JSON.parse(localStorage.getItem('restro_last_order') || 'null'); } catch {}

  const orders = [
    ...(last ? [{ id: last.id, total: last.total, when: 'Just now', status: 'On the way', items: 'Your latest order' }] : []),
    { id: 'MT902114', total: 528, when: 'Yesterday, 8:42 PM', status: 'Delivered', items: 'Chicken Biryani, Butter Naan ×2' },
    { id: 'MT881245', total: 318, when: 'Sep 24, 1:10 PM', status: 'Delivered', items: 'Paneer Butter Masala, Garlic Naan' },
    { id: 'MT874009', total: 197, when: 'Sep 20, 9:05 PM', status: 'Delivered', items: 'Veg Dum Biryani' },
  ];

  return (
    <div className="container-x py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-ember to-chili text-3xl text-white">S</div>
            <h1 className="mt-3 font-display text-xl font-bold">Spasha</h1>
            <p className="text-sm text-ink/50">spashacrm@gmail.com</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[['12', 'Orders'], ['₹340', 'Wallet'], ['4', 'Saved']].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-cream p-3"><p className="font-display text-lg font-bold">{n}</p><p className="text-xs text-ink/50">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="card mt-4 divide-y divide-sand">
            {[[MapPin, 'Saved addresses'], [Heart, 'Favourites'], [Wallet, 'MT Wallet & offers']].map(([Icon, label]: any) => (
              <button key={label} className="flex w-full items-center gap-3 p-4 text-left hover:bg-cream">
                <Icon className="h-5 w-5 text-ember" /><span className="flex-1 text-sm font-semibold">{label}</span><ChevronRight className="h-4 w-4 text-ink/30" />
              </button>
            ))}
            <Link to="/login" className="flex w-full items-center gap-3 p-4 text-left text-chili hover:bg-chili/5"><LogOut className="h-5 w-5" /><span className="flex-1 text-sm font-semibold">Log out</span></Link>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold"><Package className="h-6 w-6 text-ember" /> Order history</h2>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="card flex items-center gap-4 p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream text-xl">🍛</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><p className="font-display font-bold">#{o.id}</p>
                    <span className={`chip ${o.status === 'Delivered' ? 'bg-veg/10 text-veg' : 'bg-ember/10 text-ember'}`}>{o.status}</span></div>
                  <p className="truncate text-sm text-ink/60">{o.items}</p>
                  <p className="text-xs text-ink/40">{o.when}</p>
                </div>
                <div className="text-right"><p className="font-display font-bold">{rupee(o.total)}</p>
                  <Link to={`/order/${o.id}`} className="text-xs font-semibold text-ember hover:underline">Track / Reorder</Link></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
