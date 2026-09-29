import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, User, MapPin, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { FoodImage } from '../components/ui';
import { dishes } from '../data/menu';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const nav = useNavigate();
  const { login, signUp, isLoggedIn, user } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  // Sign in state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);

  // Sign up state
  const [fullName, setFullName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [pincode, setPincode] = useState('500081');

  // If already logged in, redirect
  if (isLoggedIn && user) {
    nav(redirect);
    return null;
  }

  const handleSignInPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone);
    nav(redirect);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({
      name: fullName,
      phone: signupPhone,
      email: signupEmail || undefined,
      address: {
        fullName,
        phone: signupPhone,
        flat,
        area,
        city,
        pincode,
      },
    });
    nav(redirect);
  };

  return (
    <div className="container-x grid items-center gap-10 py-10 lg:grid-cols-2">
      <div className="order-2 hidden overflow-hidden rounded-4xl shadow-lift lg:order-1 lg:block">
        <FoodImage src={dishes[3].img} emoji="🍗" alt="food" className="aspect-[4/5] w-full" />
      </div>

      <div className="order-1 mx-auto w-full max-w-md lg:order-2">
        <div className="card p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ember text-lg">🍛</span>
              <span className="font-display text-2xl font-extrabold">Restro</span>
            </div>
            {redirect === '/checkout' && (
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800">
                Checkout Step 1
              </span>
            )}
          </div>

          {redirect === '/checkout' && (
            <div className="mb-5 rounded-2xl border border-ember/20 bg-ember/5 p-3 text-xs text-ink/80">
              <p className="font-semibold text-ember">Sign in or create an account to place your order.</p>
              <p className="text-[11px] text-ink/60 mt-0.5">We need your contact and delivery address to deliver hot meals to your doorstep.</p>
            </div>
          )}

          {/* Mode Switcher */}
          <div className="mb-6 flex rounded-2xl border border-sand bg-cream/40 p-1">
            <button
              type="button"
              onClick={() => { setMode('signin'); setStep('phone'); }}
              className={`flex-1 rounded-xl py-2 text-center text-sm font-semibold transition ${
                mode === 'signin' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-xl py-2 text-center text-sm font-semibold transition ${
                mode === 'signup' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'
              }`}
            >
              Create Account
            </button>
          </div>

          {mode === 'signin' ? (
            <div>
              <h1 className="font-display text-2xl font-bold">
                {step === 'phone' ? 'Welcome back!' : 'Verify your number'}
              </h1>
              <p className="mt-1 text-sm text-ink/55">
                {step === 'phone' ? 'Enter your phone number to sign in.' : `Enter the 4-digit code sent to +91 ${phone}`}
              </p>

              {step === 'phone' ? (
                <form onSubmit={handleSignInPhone} className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-sand bg-white px-3 focus-within:border-ember">
                    <Phone className="h-4 w-4 text-ink/40" />
                    <span className="text-sm font-semibold text-ink/60">+91</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent py-3 outline-none"
                    />
                  </div>
                  <button className="btn-primary w-full">
                    Send OTP <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <div className="flex justify-between gap-3">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        value={d}
                        onChange={(e) => {
                          const val = e.target.value.slice(-1);
                          const next = [...otp];
                          next[i] = val;
                          setOtp(next);
                        }}
                        maxLength={1}
                        inputMode="numeric"
                        className="h-14 w-full rounded-2xl border border-sand bg-white text-center font-display text-2xl font-bold outline-none focus:border-ember focus:ring-4 focus:ring-ember/15"
                      />
                    ))}
                  </div>
                  <button className="btn-primary w-full">
                    Verify & Continue to {redirect === '/checkout' ? 'Order' : 'Account'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full text-sm text-ink/50 hover:text-ember"
                  >
                    ← Change number
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div>
              <h1 className="font-display text-2xl font-bold">New Customer Registration</h1>
              <p className="mt-1 text-sm text-ink/55">Create your account to unlock orders and tracking.</p>

              <form onSubmit={handleSignUp} className="mt-5 space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-ink/70">Full Name *</label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 focus-within:border-ember">
                    <User className="h-4 w-4 text-ink/40" />
                    <input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sai Kumar"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Mobile Number *</label>
                    <div className="mt-1 flex items-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2 focus-within:border-ember">
                      <span className="text-xs font-bold text-ink/50">+91</span>
                      <input
                        required
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        maxLength={10}
                        placeholder="Mobile"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink/70">Email (Optional)</label>
                    <div className="mt-1 flex items-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2 focus-within:border-ember">
                      <Mail className="h-4 w-4 text-ink/40" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-sand">
                  <span className="text-xs font-bold text-ink/70 flex items-center gap-1 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-ember" /> Delivery Address Details *
                  </span>
                  <div className="space-y-2">
                    <input
                      required
                      value={flat}
                      onChange={(e) => setFlat(e.target.value)}
                      placeholder="Flat / House / Door No. *"
                      className="input py-2 text-sm"
                    />
                    <input
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Street / Area / Landmark *"
                      className="input py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="input py-2 text-sm"
                      />
                      <input
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Pincode *"
                        maxLength={6}
                        className="input py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-4 w-full">
                  Create Account & Continue to Order <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink/45">
            <ShieldCheck className="h-3.5 w-3.5 text-veg" /> Verified customer session with encrypted details.
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-ink/40">By continuing you agree to our Terms & Privacy Policy.</p>
      </div>
    </div>
  );
}
