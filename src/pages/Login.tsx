import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { FoodImage } from '../components/ui';
import { dishes } from '../data/menu';

export default function Login() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const nav = useNavigate();

  return (
    <div className="container-x grid items-center gap-10 py-10 lg:grid-cols-2">
      <div className="order-2 hidden overflow-hidden rounded-4xl shadow-lift lg:order-1 lg:block">
        <FoodImage src={dishes[3].img} emoji="🍗" alt="food" className="aspect-[4/5] w-full" />
      </div>

      <div className="order-1 mx-auto w-full max-w-md lg:order-2">
        <div className="card p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ember text-lg">🍛</span>
            <span className="font-display text-2xl font-extrabold">Restro</span>
          </div>
          <h1 className="font-display text-2xl font-bold">{step === 'phone' ? 'Login or sign up' : 'Verify your number'}</h1>
          <p className="mt-1 text-sm text-ink/55">{step === 'phone' ? 'Get hot food delivered in minutes.' : 'We sent a 4-digit code to your phone.'}</p>

          {step === 'phone' ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep('otp'); }} className="mt-6 space-y-4">
              <div className="flex items-center gap-2 rounded-2xl border border-sand bg-white px-3 focus-within:border-ember">
                <Phone className="h-4 w-4 text-ink/40" /><span className="text-sm font-semibold text-ink/60">+91</span>
                <input required inputMode="tel" maxLength={10} placeholder="Mobile number" className="w-full bg-transparent py-3 outline-none" />
              </div>
              <button className="btn-primary w-full">Continue <ArrowRight className="h-4 w-4" /></button>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); nav('/account'); }} className="mt-6 space-y-4">
              <div className="flex justify-between gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <input key={i} maxLength={1} inputMode="numeric" className="h-14 w-full rounded-2xl border border-sand bg-white text-center font-display text-2xl font-bold outline-none focus:border-ember focus:ring-4 focus:ring-ember/15" />
                ))}
              </div>
              <button className="btn-primary w-full">Verify & continue</button>
              <button type="button" onClick={() => setStep('phone')} className="w-full text-sm text-ink/50 hover:text-ember">← Change number</button>
            </form>
          )}

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink/45"><ShieldCheck className="h-3.5 w-3.5 text-veg" /> Demo login — no OTP is actually sent.</p>
        </div>
        <p className="mt-4 text-center text-xs text-ink/40">By continuing you agree to our Terms & Privacy Policy.</p>
      </div>
    </div>
  );
}
