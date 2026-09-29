import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChefHat, Bike, PackageCheck, Phone, MapPin } from 'lucide-react';

const STEPS = [
  { icon: CheckCircle2, label: 'Order placed', note: 'We’ve received your order' },
  { icon: ChefHat, label: 'Preparing', note: 'Chef is cooking it fresh' },
  { icon: Bike, label: 'Out for delivery', note: 'Rider is on the way' },
  { icon: PackageCheck, label: 'Delivered', note: 'Enjoy your meal!' },
];

export default function OrderConfirm() {
  const { id } = useParams();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="container-x max-w-3xl py-10">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-ember to-chili p-8 text-center text-white">
          <div className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-white/20 text-4xl">🎉</div>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Order confirmed!</h1>
          <p className="mt-1 text-white/85">Order <span className="font-bold">#{id}</span> · arriving in ~30 mins</p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Timeline */}
          <div className="relative">
            {STEPS.map((s, i) => {
              const done = i < stage, active = i === stage;
              return (
                <div key={i} className="flex gap-4 pb-8 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <div className={`grid h-11 w-11 place-items-center rounded-full transition-all ${done || active ? 'bg-ember text-white' : 'bg-sand text-ink/40'} ${active ? 'ring-4 ring-ember/25 animate-pop' : ''}`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    {i < STEPS.length - 1 && <div className={`w-0.5 flex-1 ${done ? 'bg-ember' : 'bg-sand'}`} />}
                  </div>
                  <div className={`pt-1.5 ${done || active ? '' : 'opacity-50'}`}>
                    <p className="font-display font-bold">{s.label}{active && <span className="ml-2 chip bg-ember/10 text-ember">In progress</span>}</p>
                    <p className="text-sm text-ink/55">{s.note}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rider card */}
          <div className="mt-2 flex items-center gap-4 rounded-3xl border border-sand bg-cream p-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-ember/15 text-2xl">🛵</div>
            <div className="flex-1">
              <p className="font-display font-bold">Ravi is delivering your order</p>
              <p className="text-sm text-ink/55 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> 1.2 km away · TS 09 AB 1234</p>
            </div>
            <a href="tel:+910000000000" className="grid h-11 w-11 place-items-center rounded-full bg-ember text-white"><Phone className="h-5 w-5" /></a>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/menu" className="btn-ghost flex-1">Order more</Link>
            <Link to="/account/orders" className="btn-primary flex-1">View my orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
