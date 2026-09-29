import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { categories, dishes } from '../data/menu';
import MenuRow from '../components/MenuRow';

export default function Menu() {
  const [q, setQ] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [active, setActive] = useState('all');

  const filtered = useMemo(() =>
    dishes.filter((d) => (!vegOnly || d.veg) && (q.trim() === '' || (d.name + ' ' + d.desc).toLowerCase().includes(q.toLowerCase()))),
  [q, vegOnly]);

  const shownCats = categories.filter((c) => filtered.some((d) => d.category === c.id));

  const jump = (id: string) => {
    setActive(id);
    document.getElementById('cat-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10">
      <header className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">À la carte · {dishes.length} dishes</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">The Menu</h1>
      </header>

      {/* controls */}
      <div className="sticky top-0 z-30 -mx-5 mb-8 border-y border-sand/70 bg-cream/90 px-5 py-3 backdrop-blur sm:top-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu…" className="w-full rounded-full border border-sand bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ember" />
          </div>
          <button onClick={() => setVegOnly((v) => !v)} className={`chip border ${vegOnly ? 'border-veg bg-veg text-white' : 'border-sand bg-white text-ink/70'}`}>
            <span className="veg-dot border-veg bg-white"><span className="h-1.5 w-1.5 rounded-full bg-veg" /></span> Pure veg
          </button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        {/* category index */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink/40">Sections</p>
            {shownCats.map((c) => (
              <button key={c.id} onClick={() => jump(c.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${active === c.id ? 'bg-ink text-cream' : 'text-ink/60 hover:bg-white'}`}>
                <span>{c.emoji}</span> {c.name}
                <span className="ml-auto text-xs text-ink/30">{filtered.filter((d) => d.category === c.id).length}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* sections */}
        <div>
          {shownCats.length === 0 && (
            <div className="rounded-4xl border border-dashed border-sand p-16 text-center">
              <p className="text-4xl">🍽️</p><p className="mt-2 font-display text-xl">Nothing matches that.</p><p className="text-sm text-ink/50">Try another search or clear the veg filter.</p>
            </div>
          )}
          {shownCats.map((c) => (
            <section key={c.id} id={'cat-' + c.id} className="mb-14 scroll-mt-28">
              <div className="mb-1 flex items-center gap-3">
                <span className="text-3xl">{c.emoji}</span>
                <h2 className="font-display text-3xl font-semibold text-ink">{c.name}</h2>
                <span className="h-px flex-1 bg-sand" />
              </div>
              {filtered.filter((d) => d.category === c.id).map((d) => <MenuRow key={d.id} dish={d} />)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
