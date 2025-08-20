import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';

//less critical pages
const About = lazy(() => import('./pages/About'));
const Cart = lazy(() => import('./pages/Cart'));
const Collection = lazy(() => import('./pages/Collection'));
const Contact = lazy(() => import('./pages/Contact'));
const Orders = lazy(() => import('./pages/Orders'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Product = lazy(() => import('./pages/Product'));
const Verify = lazy(() => import('./pages/Verify'));

const App = () => {
  return (
    <div className="px-4 lg:px-[3vw]">
      <ToastContainer />
      <NavBar />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />        {/* eager load */}
          <Route path="/login" element={<Login />} />  {/* eager load */}
          
          <Route path="/about" element={<About />} />  {/* lazy */}
          <Route path="/cart" element={<Cart />} />    {/* lazy */}
          <Route path="/collection" element={<Collection />} /> {/* lazy */}
          <Route path="/orders" element={<Orders />} />  {/* lazy */}
          <Route path="/place-order" element={<PlaceOrder />} /> {/* lazy */}
          <Route path="/product/:productId" element={<Product />} /> {/* lazy */}
          <Route path="/contact" element={<Contact />} /> {/* lazy */}
          <Route path="/verify" element={<Verify />} />   {/* lazy */}
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
