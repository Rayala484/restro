import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Shell from './components/Shell';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ItemDetail from './pages/ItemDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirm from './pages/OrderConfirm';
import Account from './pages/Account';
import Login from './pages/Login';
import { About, Contact, Membership, Legal } from './pages/Content';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <Shell>
      <ScrollTop />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderConfirm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/refund" element={<Legal kind="refund" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Shell>
  );
}
