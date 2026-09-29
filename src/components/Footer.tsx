import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sand bg-coal text-cream">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember text-lg">🍛</span>
            <span className="font-display text-xl font-extrabold">Restro</span>
          </div>
          <p className="max-w-xs text-sm text-cream/60">Fresh Indian food, cooked to order and delivered hot to your door. Biryani, curries, tandoori & more.</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Twitter, Facebook].map((I, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-ember"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {[
          { h: 'Explore', links: [['Menu', '/menu'], ['Offers', '/'], ['Membership', '/membership'], ['About us', '/about']] },
          { h: 'Help', links: [['Contact', '/contact'], ['Track order', '/account'], ['FAQs', '/contact'], ['Refund policy', '/refund']] },
          { h: 'Legal', links: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Refunds', '/refund']] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-cream/80">{col.h}</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              {col.links.map(([l, h]) => <li key={l}><Link to={h} className="hover:text-ember">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Restro · Crafted with 🧡 in India · This is a UI showcase (demo data).
      </div>
    </footer>
  );
}
