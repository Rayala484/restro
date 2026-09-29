import { Link } from 'react-router-dom';
import { MapPin, Heart, Wallet, LogOut, ChevronRight, Package, UserCheck, Lock } from 'lucide-react';
import { rupee } from '../data/menu';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, isLoggedIn, logout } = useAuth();

  let history: any[] = [];
  try {
    history = JSON.parse(localStorage.getItem('restro_order_history') || '[]');
  } catch {}

  let last: any = null;
  try {
    last = JSON.parse(localStorage.getItem('restro_last_order') || 'null');
  } catch {}

  const orders = [
    ...(history.length > 0
      ? history.map((o) => ({
          id: o.id,
          total: o.total,
          when: new Date(o.when).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          status: 'Confirmed',
          items: Array.isArray(o.items) ? o.items.map((i: any) => `${i.qty}× ${i.name}`).join(', ') : 'Order items',
        }))
      : last
      ? [{ id: last.id, total: last.total, when: 'Just now', status: 'On the way', items: 'Your latest order' }]
      : []),
    { id: 'MT902114', total: 528, when: 'Yesterday, 8:42 PM', status: 'Delivered', items: 'Chicken Biryani, Butter Naan ×2' },
    { id: 'MT881245', total: 318, when: 'Sep 24, 1:10 PM', status: 'Delivered', items: 'Paneer Butter Masala, Garlic Naan' },
    { id: 'MT874009', total: 197, when: 'Sep 20, 9:05 PM', status: 'Delivered', items: 'Veg Dum Biryani' },
  ];

  if (!isLoggedIn || !user) {
    return (
      <div className="container-x py-16 text-center max-w-md mx-auto">
        <div className="card p-8 text-center space-y-4">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-500/10 text-amber-600">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="font-display text-2xl font-bold">Sign In Required</h1>
          <p className="text-sm text-ink/60">
            Sign in or create an account to view your past orders, delivery addresses, and account details.
          </p>
          <Link to="/login" className="btn-primary w-full">
            Sign In / Register
          </Link>
        </div>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="container-x py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-ember to-chili text-3xl font-extrabold text-white">
              {initial}
            </div>
            <h1 className="mt-3 font-display text-xl font-bold">{user.name}</h1>
            <p className="text-sm font-semibold text-ink/70">+91 {user.phone}</p>
            {user.email && <p className="text-xs text-ink/50 mt-0.5">{user.email}</p>}

            {user.address && (
              <div className="mt-4 text-left rounded-2xl bg-cream/60 p-3.5 border border-sand text-xs text-ink/70 space-y-0.5">
                <p className="font-bold text-ink flex items-center gap-1.5 mb-1 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-ember" /> Default Delivery Address
                </p>
                <p>{user.address.flat}, {user.address.area}</p>
                <p>{user.address.city} - {user.address.pincode}</p>
              </div>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                [`${orders.length}`, 'Orders'],
                ['₹340', 'Wallet'],
                ['1', 'Address'],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-cream p-3">
                  <p className="font-display text-lg font-bold">{n}</p>
                  <p className="text-xs text-ink/50">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4 divide-y divide-sand">
            {[[MapPin, 'Delivery address'], [Heart, 'Favourites'], [Wallet, 'Wallet & offers']].map(
              ([Icon, label]: any) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-cream"
                >
                  <Icon className="h-5 w-5 text-ember" />
                  <span className="flex-1 text-sm font-semibold">{label}</span>
                  <ChevronRight className="h-4 w-4 text-ink/30" />
                </button>
              )
            )}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 p-4 text-left text-chili hover:bg-chili/5"
            >
              <LogOut className="h-5 w-5" />
              <span className="flex-1 text-sm font-semibold">Log out</span>
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
            <Package className="h-6 w-6 text-ember" /> Order history
          </h2>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="card flex items-center gap-4 p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream text-xl">🍛</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold">#{o.id}</p>
                    <span
                      className={`chip ${
                        o.status === 'Delivered'
                          ? 'bg-veg/10 text-veg'
                          : 'bg-ember/10 text-ember'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <p className="truncate text-sm text-ink/60">{o.items}</p>
                  <p className="text-xs text-ink/40">{o.when}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{rupee(o.total)}</p>
                  <Link
                    to={`/order/${o.id}`}
                    className="text-xs font-semibold text-ember hover:underline"
                  >
                    Track / Receipt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
