import { useState } from 'react';
import { X, Phone, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSuccess?: () => void;
};

export default function AuthModal({ isOpen, onClose, title, onSuccess }: Props) {
  const { login, signUp } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if existing user in localStorage registry
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    try {
      const db = JSON.parse(localStorage.getItem('restro_registered_users') || '{}');
      if (db[cleanPhone] && db[cleanPhone].name) {
        // Known user -> log in immediately
        login(cleanPhone);
        onClose();
        if (onSuccess) onSuccess();
        return;
      }
    } catch {}

    // If new user, ask for their name quickly (Swiggy/Zomato style)
    setStep('name');
  };

  const handleFinishSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    signUp({
      name: name.trim() || `Customer ${cleanPhone.slice(-4)}`,
      phone: cleanPhone,
    });
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md rounded-3xl bg-cream border border-sand shadow-2xl p-6 sm:p-8"
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

        {/* Brand Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ember text-base">🍽️</span>
            <span className="font-display font-extrabold text-xl text-ink">Restro</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-ink leading-tight">
            {step === 'phone' && (title || 'Login or Sign up')}
            {step === 'otp' && 'Verify with OTP'}
            {step === 'name' && 'Almost done!'}
          </h2>
          <p className="mt-1 text-xs text-ink/65 leading-relaxed">
            {step === 'phone' && 'Enter your 10-digit mobile number to continue. No password needed.'}
            {step === 'otp' && `Enter the 4-digit code sent to +91 ${phone.slice(-10)}`}
            {step === 'name' && 'Enter your name to personalize your order experience.'}
          </p>
        </div>

        {/* STEP 1: PHONE NUMBER */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink/70">Mobile Number</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-sand bg-white px-3.5 py-1.5 focus-within:border-ember focus-within:ring-2 focus-within:ring-ember/15">
                <Phone className="h-4 w-4 text-ink/40" />
                <span className="text-sm font-bold text-ink/70">+91</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  placeholder="Enter 10-digit mobile"
                  className="w-full bg-transparent py-2 text-sm font-medium outline-none"
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Continue with OTP <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* STEP 2: 4-DIGIT OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
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
              <p className="mt-2 text-center text-xs text-veg font-medium">
                ✓ Demo OTP auto-filled (1234)
              </p>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Verify & Proceed
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-xs text-ink/50 hover:text-ember underline text-center"
            >
              ← Edit mobile number
            </button>
          </form>
        )}

        {/* STEP 3: NAME (NEW USERS ONLY) */}
        {step === 'name' && (
          <form onSubmit={handleFinishSignup} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink/70">What should we call you? *</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-sand bg-white px-3.5 py-1.5 focus-within:border-ember focus-within:ring-2 focus-within:ring-ember/15">
                <User className="h-4 w-4 text-ink/40" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sai Kumar"
                  className="w-full bg-transparent py-2 text-sm font-medium outline-none"
                  autoFocus
                />
              </div>
              <p className="mt-1.5 text-[11px] text-ink/50">
                You can add or change your delivery address later at the Checkout step.
              </p>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Complete & Continue <CheckCircle2 className="h-4 w-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-3 border-t border-sand/60 flex items-center justify-between text-xs text-ink/50">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-veg" /> 100% Secure Instant Login
          </span>
          <span>Delivery address at checkout</span>
        </div>
      </div>
    </div>
  );
}
