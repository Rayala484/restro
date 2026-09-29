import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
  Lock,
  Edit2,
  CheckCircle2,
  Phone,
  User,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { rupee } from '../data/menu';

export default function Checkout() {
  const { lines, subtotal, count, clear } = useCart();
  const { user, isLoggedIn, saveAddress, login, openAuthModal } = useAuth();
  const nav = useNavigate();

  const [pay, setPay] = useState('upi');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Address form fields
  const [fullName, setFullName] = useState(user?.address?.fullName || user?.name || '');
  const [phone, setPhone] = useState(user?.address?.phone || user?.phone || '');
  const [flat, setFlat] = useState(user?.address?.flat || '');
  const [area, setArea] = useState(user?.address?.area || '');
  const [city, setCity] = useState(user?.address?.city || 'Hyderabad');
  const [pincode, setPincode] = useState(user?.address?.pincode || '500081');
  const [notes, setNotes] = useState(user?.address?.notes || '');

  // Quick inline sign-in phone
  const [quickPhone, setQuickPhone] = useState('');
  const [quickName, setQuickName] = useState('');

  const delivery = subtotal >= 299 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  if (count === 0) {
    nav('/cart');
    return null;
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flat || !area || !pincode || !fullName || !phone) return;
    saveAddress({
      fullName,
      phone,
      flat,
      area,
      city,
      pincode,
      notes,
    });
    setIsEditingAddress(false);
  };

  const hasCompleteAddress = Boolean(
    user?.address?.flat && user?.address?.area && user?.address?.pincode
  );

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      nav('/login?redirect=/checkout');
      return;
    }

    if (!hasCompleteAddress && !isEditingAddress) {
      setIsEditingAddress(true);
      return;
    }

    const orderAddress = user?.address || {
      fullName,
      phone,
      flat,
      area,
      city,
      pincode,
      notes,
    };

    const id = 'MT' + Math.floor(100000 + Math.random() * 899999);
    const orderData = {
      id,
      customerName: user?.name || fullName,
      customerPhone: user?.phone || phone,
      deliveryAddress: orderAddress,
      total,
      subtotal,
      delivery,
      taxes,
      items: lines.map((l) => ({ name: l.dish.name, qty: l.qty, price: l.unit })),
      when: Date.now(),
      pay,
    };

    try {
      localStorage.setItem('restro_last_order', JSON.stringify(orderData));
      const existing = JSON.parse(localStorage.getItem('restro_order_history') || '[]');
      existing.unshift(orderData);
      localStorage.setItem('restro_order_history', JSON.stringify(existing));
    } catch {}

    clear();
    nav('/order/' + id);
  };

  return (
    <div className="container-x py-8">
      <button
        onClick={() => nav('/cart')}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ember"
      >
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </button>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Complete Your Order</h1>
          <p className="text-sm text-ink/55 mt-1">Authenticate, verify delivery address, and confirm payment.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-ink/70">
          <span className={`h-2 w-2 rounded-full ${isLoggedIn ? 'bg-veg' : 'bg-amber-500'}`} />
          {isLoggedIn ? `Signed in as ${user?.name || user?.phone}` : 'Guest (Sign in required)'}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* STEP 1: AUTHENTICATION GATE */}
          {!isLoggedIn ? (
            <section className="card border-2 border-amber-500/30 bg-amber-500/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-500 text-white font-bold text-sm">
                  1
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">Sign In or Create Account</h2>
                  <p className="text-xs text-ink/60">An active account is required to place and track your order.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-sand shadow-sm space-y-4">
                <p className="text-sm font-semibold text-ink/80">
                  Quick Mobile Sign-In / Registration:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-xl border border-sand px-3 py-2">
                    <User className="h-4 w-4 text-ink/40" />
                    <input
                      placeholder="Your Full Name"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-sand px-3 py-2">
                    <span className="text-xs font-bold text-ink/40">+91</span>
                    <input
                      placeholder="10-digit Phone Number"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      maxLength={10}
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (quickPhone.trim().length >= 10) {
                        login(quickPhone, quickName);
                      }
                    }}
                    className="btn-primary"
                  >
                    Quick Sign In & Continue
                  </button>
                  <Link
                    to="/login?redirect=/checkout"
                    className="text-xs font-semibold text-ember hover:underline"
                  >
                    Or open full Login / Register screen →
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <div className="card p-4 flex items-center justify-between bg-veg/5 border border-veg/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-veg shrink-0" />
                <div>
                  <p className="text-xs font-bold text-veg uppercase tracking-wider">Step 1 Completed</p>
                  <p className="text-sm font-semibold text-ink">
                    Signed in as <strong>{user?.name}</strong> (+91 {user?.phone})
                  </p>
                </div>
              </div>
              <Link to="/login?redirect=/checkout" className="text-xs text-ink/50 hover:text-ember underline">
                Switch account
              </Link>
            </div>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember text-white font-bold text-sm">
                  2
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">Delivery Address</h2>
                  <p className="text-xs text-ink/60">Where should we deliver your hot food?</p>
                </div>
              </div>
              {hasCompleteAddress && !isEditingAddress && (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-ember hover:underline"
                >
                  <Edit2 className="h-3.5 w-3.5" /> Change
                </button>
              )}
            </div>

            {hasCompleteAddress && !isEditingAddress ? (
              <div className="rounded-2xl border border-sand bg-cream/40 p-4 space-y-1">
                <p className="text-sm font-bold text-ink">{user?.address?.fullName || user?.name}</p>
                <p className="text-xs text-ink/70">
                  {user?.address?.flat}, {user?.address?.area}
                </p>
                <p className="text-xs text-ink/70">
                  {user?.address?.city} - {user?.address?.pincode}
                </p>
                <p className="text-xs font-medium text-ink/50 pt-1">
                  📞 Contact: +91 {user?.address?.phone || user?.phone}
                </p>
                {user?.address?.notes && (
                  <p className="text-xs text-amber-800 bg-amber-500/10 p-2 rounded-lg mt-2">
                    Note: {user.address.notes}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Full Name *</label>
                    <input
                      required
                      placeholder="Receiver's Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Phone Number *</label>
                    <input
                      required
                      placeholder="10-digit Mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      maxLength={10}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Flat / House / Door No. *</label>
                    <input
                      required
                      placeholder="e.g. Flat 402, Sai Residency"
                      value={flat}
                      onChange={(e) => setFlat(e.target.value)}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Street / Area / Landmark *</label>
                    <input
                      required
                      placeholder="e.g. Hitech City Road"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">City *</label>
                    <input
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Pincode *</label>
                    <input
                      required
                      placeholder="e.g. 500081"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      inputMode="numeric"
                      maxLength={6}
                      className="input mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-ink/70">Delivery Instructions (Optional)</label>
                    <textarea
                      placeholder="e.g. Ring the bell, leave at the security gate"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="input mt-1"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" className="btn-primary">
                    Save Address & Continue
                  </button>
                  {hasCompleteAddress && (
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="text-xs font-semibold text-ink/50 hover:text-ink"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </section>

          {/* STEP 3: PAYMENT METHOD */}
          <section className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember text-white font-bold text-sm">
                3
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">Payment Method</h2>
                <p className="text-xs text-ink/60">Choose your preferred payment option.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: 'upi', icon: Wallet, label: 'UPI / Wallet' },
                { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
                { id: 'cod', icon: Banknote, label: 'Cash on Delivery' },
              ].map((m) => {
                const active = pay === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPay(m.id)}
                    className={`flex items-center gap-2 rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                      active
                        ? 'border-ember bg-ember/5 ring-2 ring-ember/20'
                        : 'border-sand bg-white hover:border-ember/40'
                    }`}
                  >
                    <m.icon className={`h-5 w-5 ${active ? 'text-ember' : 'text-ink/40'}`} /> {m.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/50">
              <ShieldCheck className="h-3.5 w-3.5 text-veg" /> Demo mode enabled — test orders can be placed safely without payment gateway charges.
            </p>
          </section>
        </div>

        {/* SIDEBAR ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20 p-5 space-y-4">
            <h3 className="font-display text-lg font-bold">Order Summary</h3>
            <ul className="max-h-48 space-y-2 overflow-auto text-sm divide-y divide-sand/50">
              {lines.map((l) => (
                <li key={l.key} className="pt-2 first:pt-0 flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-ink/80 font-medium">
                      {l.qty} × {l.dish.name}
                    </p>
                    {l.options.length > 0 && (
                      <p className="truncate text-[11px] text-ink/40">{l.options.join(', ')}</p>
                    )}
                  </div>
                  <span className="font-semibold shrink-0">{rupee(l.qty * l.unit)}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-1.5 border-t border-dashed border-sand pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/60">Item total</span>
                <span>{rupee(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Delivery fee</span>
                <span className={delivery === 0 ? 'font-bold text-veg' : ''}>
                  {delivery === 0 ? 'FREE' : rupee(delivery)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Taxes & charges (5%)</span>
                <span>{rupee(taxes)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-dashed border-sand pt-2 font-display text-lg font-bold">
                <span>Grand Total</span>
                <span>{rupee(total)}</span>
              </div>
            </div>

            {/* ACTION BUTTON */}
            {!isLoggedIn ? (
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => openAuthModal(undefined, 'Sign In or Register to Place Order')}
                  className="btn-primary w-full"
                >
                  <Lock className="h-4 w-4" /> Sign In to Place Order
                </button>
                <p className="text-center text-[11px] text-amber-800">
                  Please sign in or register above to complete checkout.
                </p>
              </div>
            ) : !hasCompleteAddress ? (
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="btn-primary w-full"
                >
                  <MapPin className="h-4 w-4" /> Enter Delivery Address
                </button>
                <p className="text-center text-[11px] text-amber-800">
                  Complete your delivery address above to place order.
                </p>
              </div>
            ) : (
              <form onSubmit={placeOrder} className="pt-2">
                <button type="submit" className="btn-primary w-full">
                  Place Order · {rupee(total)}
                </button>
                <p className="mt-2 text-center text-[11px] text-ink/50">
                  Delivering to: {user?.address?.flat}, {user?.address?.area}
                </p>
              </form>
            )}

            <Link
              to="/menu"
              className="mt-2 block text-center text-xs text-ink/50 hover:text-ember"
            >
              ← Add more items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
