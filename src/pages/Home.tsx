import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Clock, Leaf } from 'lucide-react';
import { dishes, categories, rupee } from '../data/menu';
import { FoodImage } from '../components/ui';
import MenuRow from '../components/MenuRow';

export default function Home() {
  const signatures = dishes.filter((d) => d.popular).slice(0, 3);
  const previewCats = categories.slice(0, 3);

  return (
    <div>
      {/* ── HERO ── editorial, asymmetric */}
      <section className="relative overflow-hidden px-5 pt-10 sm:px-10 lg:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ember">
              <span className="h-px w-8 bg-ember" /> Est. Kitchen · Hyderabad
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A modern table<br />for Indian<br /><span className="italic text-ember">classics.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
              Dum biryani, clay-oven tandoori and slow-simmered curries — plated with care and brought to your door in thirty minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/menu" className="btn-primary bg-ink hover:bg-coal">Explore the menu <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/menu" className="btn-ghost">Today’s specials</Link>
            </div>
            <div className="mt-10 flex items-center gap-8">
              {[['4.7', 'Guest rating'], ['50k+', 'Plates served'], ['28 min', 'Avg. delivery']].map(([n, l]) => (
                <div key={l}><p className="font-display text-2xl font-semibold text-ink">{n}</p><p className="text-xs uppercase tracking-wider text-ink/40">{l}</p></div>
              ))}
            </div>
          </div>

          {/* image column — big offset arch */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] shadow-lift">
              <FoodImage src={dishes[0].img} emoji="🍛" alt="Signature biryani" className="h-full w-full" />
            </div>
            <div className="absolute -left-3 bottom-10 flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 shadow-card sm:-left-6">
              <Star className="h-4 w-4 text-ember" fill="currentColor" /><span className="text-sm font-semibold">Chef’s signature</span>
            </div>
            <div className="absolute -right-2 top-8 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-cream shadow-lift sm:-right-4">
              <Clock className="h-4 w-4 text-ember" /><span className="text-sm font-semibold">Fresh to order</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE STRIP ── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">This week</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">Signatures worth the trip.</h2>
          </div>
          <Link to="/menu" className="hidden text-sm font-semibold text-ink underline-offset-4 hover:underline sm:inline">Full menu</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {signatures.map((d, i) => (
            <Link key={d.id} to={`/item/${d.id}`} className={`group relative overflow-hidden rounded-4xl shadow-card ${i === 1 ? 'sm:mt-8' : ''}`}>
              <FoodImage src={d.img} emoji={d.emoji} alt={d.name} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                <p className="font-display text-xl font-semibold">{d.name}</p>
                <p className="mt-0.5 text-sm text-cream/70">{rupee(d.price)} · ★ {d.rating.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── THE MENU (editorial preview) ── */}
      <section className="border-y border-sand bg-white/50">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-10">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">À la carte</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">The Menu</h2>
            <p className="mx-auto mt-3 max-w-md text-ink/55">A tight, seasonal selection — every dish cooked to order.</p>
          </div>
          {previewCats.map((c) => (
            <div key={c.id} className="mb-10">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="font-display text-2xl font-semibold text-ink">{c.name}</h3>
                <span className="h-px flex-1 bg-sand" />
              </div>
              {dishes.filter((d) => d.category === c.id).slice(0, 3).map((d) => <MenuRow key={d.id} dish={d} />)}
            </div>
          ))}
          <div className="text-center">
            <Link to="/menu" className="btn-primary bg-ink hover:bg-coal">See the full menu <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── STORY / VALUES ── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { icon: Leaf, t: 'Cooked fresh', d: 'No frozen shortcuts. Every order begins when you place it.' },
            { icon: Clock, t: 'On time, hot', d: 'Full-time riders and tight kitchens keep it to ~30 minutes.' },
            { icon: Star, t: 'Loved by many', d: 'A 4.7 average across 50,000+ plates and counting.' },
          ].map((s, i) => (
            <div key={i} className="rounded-4xl border border-sand bg-cream p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-cream"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{s.t}</h3>
              <p className="mt-2 text-ink/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-center text-cream sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 text-[10rem] opacity-10">🍛</div>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">Hungry yet?</h2>
          <p className="mx-auto mt-3 max-w-md text-cream/60">Your table’s ready — order in a couple of taps.</p>
          <Link to="/menu" className="btn-primary mt-6 bg-ember hover:bg-emberdark">Start your order <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
