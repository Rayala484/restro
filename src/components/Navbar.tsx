import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, Search, User, Menu as MenuIcon, Home, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count, subtotal } = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const submit = (e: React.FormEvent) => { e.preventDefault(); nav('/menu?q=' + encodeURIComponent(q)); };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand/70 bg-cream/85 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember text-lg shadow-lift">🍛</span>
            <span className="font-display text-xl font-extrabold tracking-tight">Restro</span>
          </Link>

          <button className="ml-1 hidden items-center gap-1 rounded-full border border-sand bg-white px-3 py-1.5 text-sm font-medium sm:inline-flex">
            <MapPin className="h-4 w-4 text-ember" /> Hyderabad <span className="text-ink/40">▾</span>
          </button>

          <form onSubmit={submit} className="relative ml-auto hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search biryani, paneer, rolls…"
              className="w-full rounded-full border border-sand bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ember" />
          </form>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium hover:bg-white ${isActive ? 'text-ember' : 'text-ink/70 hover:text-ink'}`}>Home</NavLink>
            <NavLink to="/menu" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium hover:bg-white ${isActive ? 'text-ember' : 'text-ink/70 hover:text-ink'}`}>Menu</NavLink>
            <NavLink to="/about" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium hover:bg-white ${isActive ? 'text-ember' : 'text-ink/70 hover:text-ink'}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium hover:bg-white ${isActive ? 'text-ember' : 'text-ink/70 hover:text-ink'}`}>Contact</NavLink>
          </nav>

          <Link to="/login" className="ml-1 hidden rounded-full border border-sand bg-white p-2.5 sm:inline-flex" title="Account"><User className="h-5 w-5" /></Link>

          <Link to="/cart" className="btn-primary btn-sm ml-auto md:ml-0">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{count > 0 ? `${count} · ₹${subtotal}` : 'Cart'}</span>
            {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-bold text-ember sm:hidden">{count}</span>}
          </Link>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-4">
          {[['/', Home, 'Home'], ['/menu', UtensilsCrossed, 'Menu'], ['/account', User, 'Account'], ['/cart', ShoppingBag, 'Cart']].map(([to, Icon, label]: any) => (
            <NavLink key={label} to={to} className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${isActive ? 'text-ember' : 'text-ink/55'}`}>
              <Icon className="h-5 w-5" />{label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
