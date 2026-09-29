import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  UtensilsCrossed,
  Info,
  Phone,
  ShoppingBag,
  Crown,
  Menu as MenuIcon,
  X,
  User,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { rupee } from '../data/menu';

const BASE_NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/menu', label: 'The Menu', icon: UtensilsCrossed },
  { to: '/about', label: 'Our Story', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
];

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-lg text-cream">🍽️</span>
      <span className="font-display text-2xl font-semibold tracking-tight text-ink">Restro<span className="text-ember">.</span></span>
    </Link>
  );
}

/** Fixed vertical navigation rail (desktop). */
function SideRail() {
  const { user, isLoggedIn, openAuthModal } = useAuth();

  // Only suggest/display Membership to customers who have already created an account
  const navItems = isLoggedIn
    ? [
        ...BASE_NAV.slice(0, 2),
        { to: '/membership', label: 'Plus Rewards', icon: Crown },
        ...BASE_NAV.slice(2),
      ]
    : BASE_NAV;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sand/80 bg-cream/70 px-6 py-8 backdrop-blur-xl lg:flex">
      <Wordmark />
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {navItems.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={(n as any).end}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-medium transition ${
                isActive ? 'bg-ink text-cream' : 'text-ink/60 hover:bg-white hover:text-ink'
              }`
            }
          >
            <n.icon className="h-5 w-5" /> {n.label}
          </NavLink>
        ))}

        {/* Customer Account Nav Link */}
        {isLoggedIn ? (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `group mt-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-medium transition ${
                isActive ? 'bg-ink text-cream' : 'text-ink/70 hover:bg-white hover:text-ink'
              }`
            }
          >
            <User className="h-5 w-5 text-ember" />
            <span className="truncate">{user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'My Account'}</span>
          </NavLink>
        ) : (
          <button
            onClick={() => openAuthModal(undefined, 'Sign in or Create Account')}
            className="group mt-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-[15px] font-medium text-ink/70 hover:bg-white hover:text-ink transition"
          >
            <Lock className="h-5 w-5 text-amber-600" />
            <span>Sign In / Register</span>
          </button>
        )}
      </nav>

      <div className="mt-6 rounded-3xl bg-ink p-5 text-cream">
        <p className="font-display text-lg leading-snug">Hungry?</p>
        <p className="mt-1 text-sm text-cream/60">Fresh Indian classics, 30-min delivery.</p>
        <Link to="/menu" className="mt-3 inline-flex items-center gap-1 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white">Order now</Link>
      </div>
    </aside>
  );
}

/** Slim top bar (mobile) with slide-down menu. */
function MobileBar() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, openAuthModal, requireAuth } = useAuth();
  const nav = useNavigate();

  const navItems = isLoggedIn
    ? [
        ...BASE_NAV.slice(0, 2),
        { to: '/membership', label: 'Plus Rewards', icon: Crown },
        ...BASE_NAV.slice(2),
      ]
    : BASE_NAV;

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-sand/80 bg-cream/85 px-4 backdrop-blur-xl">
        <Wordmark />
        <div className="flex items-center gap-1.5">
          {isLoggedIn ? (
            <Link
              to="/account"
              className="grid h-10 w-10 place-items-center rounded-2xl border border-sand bg-white text-ink/70"
              title={user?.name}
            >
              <User className="h-5 w-5 text-ember" />
            </Link>
          ) : (
            <button
              onClick={() => openAuthModal(undefined, 'Sign In or Register')}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-sand bg-white text-amber-700"
              title="Sign In / Register"
            >
              <Lock className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={() => {
              if (!isLoggedIn) {
                requireAuth(() => nav('/cart'), 'Sign in to access your cart');
              } else {
                nav('/cart');
              }
            }}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-cream"
            aria-label="View Cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-sand bg-white"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-cream/98 px-4 py-6 backdrop-blur">
          <nav className="flex flex-col gap-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={(n as any).end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-4 font-display text-xl ${
                    isActive ? 'bg-ink text-cream' : 'text-ink'
                  }`
                }
              >
                <n.icon className="h-5 w-5" /> {n.label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <NavLink
                to="/account"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-4 font-display text-xl ${
                    isActive ? 'bg-ink text-cream' : 'text-ink'
                  }`
                }
              >
                <User className="h-5 w-5 text-ember" /> {user?.name || 'My Account'}
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  openAuthModal(undefined, 'Sign In or Register');
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-4 font-display text-xl text-ink text-left"
              >
                <Lock className="h-5 w-5 text-amber-600" /> Sign In / Register
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

/** Floating glass cart dock (all breakpoints). */
function CartDock() {
  const { count, subtotal } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();
  const nav = useNavigate();

  if (count === 0) return null;

  const handleClick = () => {
    if (!isLoggedIn) {
      requireAuth(() => nav('/checkout'), 'Sign in to review and complete your order');
    } else {
      nav('/cart');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-ink/95 py-2.5 pl-3 pr-5 text-cream shadow-lift backdrop-blur transition hover:scale-[1.03]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ember">
        <ShoppingBag className="h-4 w-4" />
      </span>
      <span className="text-sm">
        <span className="font-semibold">{count} item{count > 1 ? 's' : ''}</span>
        <span className="mx-1.5 text-cream/40">·</span>
        <span className="font-display font-semibold">{rupee(subtotal)}</span>
      </span>
      <span className="text-cream/50">→</span>
    </button>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:pl-64">
      <SideRail />
      <MobileBar />
      {children}
      <CartDock />
    </div>
  );
}
