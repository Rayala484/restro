import { Link } from 'react-router-dom';
import { Check, Crown, Mail, Phone, MapPin } from 'lucide-react';

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
  const perks = ['Free delivery on every order', 'Extra 10% off, always', 'Priority kitchen & support', 'Members-only weekend deals'];
  return (
    <Shell title="Restro Plus" sub="More food, more savings — for regulars.">
      <div className="overflow-hidden rounded-4xl bg-gradient-to-br from-ink to-coal p-8 text-cream shadow-lift">
        <div className="flex items-center gap-2 text-saffron"><Crown className="h-6 w-6" /><span className="font-display text-xl font-bold">Plus Membership</span></div>
        <p className="mt-2 font-display text-4xl font-extrabold">₹99<span className="text-lg font-medium text-cream/60">/month</span></p>
        <ul className="mt-5 space-y-2">
          {perks.map((p) => <li key={p} className="flex items-center gap-2 text-cream/85"><Check className="h-5 w-5 text-veg" /> {p}</li>)}
        </ul>
        <button className="btn-primary mt-6 bg-saffron text-ink hover:bg-saffron/90">Join Plus</button>
      </div>
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
