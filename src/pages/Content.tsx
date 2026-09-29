import { Link } from 'react-router-dom';
import { Check, Crown, Mail, Phone, MapPin, Lock, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Shell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="container-x max-w-3xl py-10">
      <h1 className="font-display text-3xl font-extrabold">{title}</h1>
      {sub && <p className="mt-1 text-ink/55">{sub}</p>}
      <div className="prose-mt mt-6 space-y-4 text-ink/70">{children}</div>
    </div>
  );
}

export function About() {
  return (
    <Shell title="About Restro" sub="Real food, cooked with love — delivered fast.">
      <p>Restro started with one simple idea: everyone deserves a hot, home-style Indian meal without the wait. From slow-dum biryani to creamy butter chicken, every dish is prepared fresh to order in our own kitchens.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[['50k+', 'Orders delivered'], ['4.7★', 'Average rating'], ['28 min', 'Avg delivery time']].map(([n, l]) => (
          <div key={l} className="card p-5 text-center"><p className="font-display text-2xl font-extrabold text-ember">{n}</p><p className="text-sm text-ink/55">{l}</p></div>
        ))}
      </div>
      <p>We partner with local kitchens and full-time riders to keep quality high and delivery quick. No frozen shortcuts — just good food, made right.</p>
      <Link to="/menu" className="btn-primary">Explore the menu</Link>
    </Shell>
  );
}

export function Contact() {
  return (
    <Shell title="Get in touch" sub="We usually reply within a few minutes.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[[Phone, 'Call us', '+91 90000 00000'], [Mail, 'Email', 'hello@restro.in'], [MapPin, 'Visit', 'Hyderabad, India']].map(([Icon, t, v]: any) => (
          <div key={t} className="card flex flex-col items-start gap-2 p-5"><Icon className="h-6 w-6 text-ember" /><p className="font-display font-bold">{t}</p><p className="text-sm text-ink/60">{v}</p></div>
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="card space-y-3 p-6">
        <div className="grid gap-3 sm:grid-cols-2"><input className="input" placeholder="Your name" /><input className="input" placeholder="Email or phone" /></div>
        <textarea className="input" rows={4} placeholder="How can we help?" />
        <button className="btn-primary">Send message</button>
      </form>
    </Shell>
  );
}

export function Membership() {
  const { user, isLoggedIn, activateMembership } = useAuth();
  const perks = [
    '100% Free delivery on all orders',
    'Extra 10% instant off on whole menu',
    'Priority kitchen dispatch & customer care',
    'Exclusive members-only seasonal dishes',
  ];

  return (
    <Shell title="Restro Plus Loyalty" sub="Exclusive rewards program for our registered diners.">
      {!isLoggedIn ? (
        <div className="card p-8 text-center space-y-4 max-w-xl mx-auto border-2 border-dashed border-sand">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-500/10 text-amber-600">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl font-bold">Registered Account Required</h2>
          <p className="text-sm text-ink/65 leading-relaxed">
            Restro Plus is a VIP loyalty benefit reserved for registered customers. 
            Please sign in or create an account before activating membership.
          </p>
          <div className="pt-2">
            <Link to="/login?redirect=/membership" className="btn-primary">
              Sign In / Register to Unlock Plus →
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-4xl bg-gradient-to-br from-ink to-coal p-8 text-cream shadow-lift max-w-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-saffron">
              <Crown className="h-6 w-6" />
              <span className="font-display text-xl font-bold">Plus Membership</span>
            </div>
            {user?.isMember && (
              <span className="rounded-full bg-veg/20 text-veg border border-veg/40 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Active Member
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-cream/70 bg-white/10 p-2.5 rounded-xl">
            <UserCheck className="h-4 w-4 text-saffron shrink-0" />
            <span>Account: <strong>{user?.name}</strong> (+91 {user?.phone})</span>
          </div>

          <p className="mt-4 font-display text-4xl font-extrabold text-white">
            ₹99<span className="text-lg font-medium text-cream/60">/month</span>
          </p>

          <ul className="mt-5 space-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-cream/85">
                <Check className="h-4 w-4 text-veg shrink-0" /> {p}
              </li>
            ))}
          </ul>

          {user?.isMember ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-veg font-bold bg-veg/10 p-3 rounded-2xl border border-veg/30">
              <Sparkles className="h-5 w-5" /> Membership active on your account!
            </div>
          ) : (
            <button
              onClick={activateMembership}
              className="btn-primary mt-6 w-full bg-saffron text-ink hover:bg-saffron/90 font-bold"
            >
              Activate Plus for ₹99/month
            </button>
          )}
        </div>
      )}
    </Shell>
  );
}

const legal: Record<string, { title: string; body: string[] }> = {
  terms: { title: 'Terms of Service', body: ['This site is a UI showcase using demo data; no real orders are processed.', 'By using Restro you agree to order responsibly and provide accurate delivery details.', 'Prices, availability and delivery times are indicative and may change.'] },
  privacy: { title: 'Privacy Policy', body: ['We only use the details you enter to simulate the ordering experience in your browser.', 'No personal data is sent to a server in this demo; your cart is stored locally on your device.', 'For the production app, data is handled per our full privacy policy.'] },
  refund: { title: 'Refund & Cancellation', body: ['Orders can be cancelled before the kitchen starts preparing them.', 'Refunds for eligible cancellations are processed to the original payment method within 5–7 days.', 'For any issue with an order, contact support and we’ll make it right.'] },
};

export function Legal({ kind }: { kind: 'terms' | 'privacy' | 'refund' }) {
  const l = legal[kind];
  return <Shell title={l.title} sub="Last updated recently.">{l.body.map((p, i) => <p key={i}>{p}</p>)}</Shell>;
}
