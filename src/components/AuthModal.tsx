import { useState } from 'react';
import { X, Phone, User, MapPin, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth, CustomerAddress } from '../context/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSuccess?: () => void;
};

export default function AuthModal({ isOpen, onClose, title, onSuccess }: Props) {
  const { login, signUp } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
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

  if (!isOpen) return null;

  const handleSignInPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone);
    onClose();
    if (onSuccess) onSuccess();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const address: CustomerAddress = {
      fullName,
      phone: signupPhone,
      flat,
      area,
      city,
      pincode,
    };
    signUp({
      name: fullName,
      phone: signupPhone,
      email: signupEmail || undefined,
      address,
    });
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-cream border border-sand shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-sand/60 text-ink/70 hover:bg-sand hover:text-ink transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-ember text-base">🍽️</span>
            <span className="font-display font-bold text-lg text-ink">Restro Account Required</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-ink leading-tight">
            {title || 'Sign In or Register to Order'}
          </h2>
          <p className="mt-1 text-xs text-ink/65 leading-relaxed">
            Please authenticate your account and delivery details before adding items or completing your order.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-5 flex rounded-2xl border border-sand bg-white/60 p-1">
          <button
            type="button"
            onClick={() => { setTab('signin'); setStep('phone'); }}
            className={`flex-1 rounded-xl py-2 text-center text-sm font-semibold transition ${
              tab === 'signin' ? 'bg-ink text-cream shadow-sm' : 'text-ink/60 hover:text-ink'
            }`}
          >
            Sign In (Mobile)
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 rounded-xl py-2 text-center text-sm font-semibold transition ${
              tab === 'signup' ? 'bg-ink text-cream shadow-sm' : 'text-ink/60 hover:text-ink'
            }`}
          >
            New Customer Register
          </button>
        </div>

        {/* SIGN IN TAB */}
        {tab === 'signin' ? (
          <div>
            {step === 'phone' ? (
              <form onSubmit={handleSignInPhone} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink/70">Enter Mobile Number</label>
                  <div className="mt-1 flex items-center gap-2 rounded-2xl border border-sand bg-white px-3 py-1 focus-within:border-ember">
                    <Phone className="h-4 w-4 text-ink/40" />
                    <span className="text-sm font-semibold text-ink/60">+91</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent py-2.5 text-sm outline-none"
                      autoFocus
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-ink/50">We'll send a 4-digit verification code to this number.</p>
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Send OTP & Continue <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink/70">
                    Enter OTP sent to +91 {phone}
                  </label>
                  <div className="mt-2 flex justify-between gap-2.5">
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
                        className="h-12 w-full rounded-2xl border border-sand bg-white text-center font-display text-xl font-bold outline-none focus:border-ember focus:ring-4 focus:ring-ember/15"
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-center text-[11px] text-veg font-medium">
                    ✓ Demo OTP prefilled: 1234
                  </p>
                </div>

                <button type="submit" className="btn-primary w-full py-3">
                  Verify & Continue to Order
                </button>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="w-full text-xs text-ink/50 hover:text-ember underline text-center"
                >
                  ← Change mobile number
                </button>
              </form>
            )}
          </div>
        ) : (
          /* REGISTER TAB */
          <form onSubmit={handleSignUp} className="space-y-3.5">
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
                  autoFocus
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-ink/70">Mobile *</label>
                <div className="mt-1 flex items-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2 focus-within:border-ember">
                  <span className="text-xs font-bold text-ink/50">+91</span>
                  <input
                    required
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    maxLength={10}
                    placeholder="10-digit"
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
              <span className="text-xs font-bold text-ink/80 flex items-center gap-1 mb-2">
                <MapPin className="h-3.5 w-3.5 text-ember" /> Delivery Address *
              </span>
              <div className="space-y-2">
                <input
                  required
                  value={flat}
                  onChange={(e) => setFlat(e.target.value)}
                  placeholder="Flat / House / Door No. *"
                  className="input py-2 text-sm bg-white"
                />
                <input
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Street / Area / Landmark *"
                  className="input py-2 text-sm bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="input py-2 text-sm bg-white"
                  />
                  <input
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode *"
                    maxLength={6}
                    className="input py-2 text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary mt-2 w-full py-3">
              Register & Continue to Order <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-sand/60 flex items-center justify-between text-xs text-ink/50">
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-veg" /> Secure verification</span>
          <span>Encrypted 256-bit</span>
        </div>
      </div>
    </div>
  );
}
