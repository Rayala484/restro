import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AuthModal from '../components/AuthModal';

export type CustomerAddress = {
  fullName: string;
  phone: string;
  flat: string;
  area: string;
  city: string;
  pincode: string;
  notes?: string;
};

export type CustomerUser = {
  name: string;
  phone: string;
  email?: string;
  address?: CustomerAddress;
  isMember?: boolean;
};

type AuthCtx = {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  login: (phone: string, name?: string) => boolean;
  signUp: (data: { name: string; phone: string; email?: string; address: CustomerAddress }) => void;
  saveAddress: (address: CustomerAddress) => void;
  activateMembership: () => void;
  logout: () => void;
  openAuthModal: (action?: (user: CustomerUser) => void, title?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (action: (user: CustomerUser) => void, title?: string) => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const USER_KEY = 'restro_customer_user';
const USERS_DB_KEY = 'restro_registered_users';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [pendingAction, setPendingAction] = useState<((u: CustomerUser) => void) | null>(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {}
  }, [user]);

  const login = (phone: string, name?: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    let resolvedUser: CustomerUser;

    try {
      const db: Record<string, CustomerUser> = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
      if (db[cleanPhone]) {
        resolvedUser = db[cleanPhone];
      } else {
        resolvedUser = {
          name: name || `Customer ${cleanPhone.slice(-4)}`,
          phone: cleanPhone,
        };
      }
    } catch {
      resolvedUser = {
        name: name || `Customer ${cleanPhone.slice(-4)}`,
        phone: cleanPhone,
      };
    }

    setUser(resolvedUser);

    if (pendingAction) {
      const act = pendingAction;
      setPendingAction(null);
      setTimeout(() => act(resolvedUser), 50);
    }

    return true;
  };

  const signUp = (data: { name: string; phone: string; email?: string; address: CustomerAddress }) => {
    const cleanPhone = data.phone.replace(/\D/g, '').slice(-10);
    const newUser: CustomerUser = {
      name: data.name,
      phone: cleanPhone,
      email: data.email,
      address: data.address,
    };

    // Save to users registry
    try {
      const db: Record<string, CustomerUser> = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
      db[cleanPhone] = newUser;
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    } catch {}

    setUser(newUser);

    if (pendingAction) {
      const act = pendingAction;
      setPendingAction(null);
      setTimeout(() => act(newUser), 50);
    }
  };

  const saveAddress = (address: CustomerAddress) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, address, name: address.fullName || prev.name };
      try {
        const db: Record<string, CustomerUser> = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
        if (prev.phone && db[prev.phone]) {
          db[prev.phone] = updated;
          localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
        }
      } catch {}
      return updated;
    });
  };

  const activateMembership = () => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, isMember: true };
      try {
        const db: Record<string, CustomerUser> = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
        if (prev.phone && db[prev.phone]) {
          db[prev.phone] = updated;
          localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
        }
      } catch {}
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (action?: (u: CustomerUser) => void, title?: string) => {
    if (action) setPendingAction(() => action);
    setModalTitle(title);
    setModalOpen(true);
  };

  const closeAuthModal = () => {
    setModalOpen(false);
    setPendingAction(null);
  };

  const requireAuth = (action: (u: CustomerUser) => void, title?: string) => {
    if (user) {
      action(user);
    } else {
      openAuthModal(action, title);
    }
  };

  return (
    <Ctx.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        signUp,
        saveAddress,
        activateMembership,
        logout,
        openAuthModal,
        closeAuthModal,
        requireAuth,
      }}
    >
      {children}
      <AuthModal
        isOpen={modalOpen}
        onClose={closeAuthModal}
        title={modalTitle}
      />
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};
