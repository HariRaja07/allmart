// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './home-page/Home';
import CategoryPage from './CategoryPage'; // New component for category items
import Cart from './Cart'; // New component for cart
import Confirmation from './Confirmation'; // Import Confirmation
import CheckoutPage from './CheckoutPage';
import Footer from './components/footer';
import AllCategory from './AllCategory';
import TopDeals from './home-page/TopDeals';
import OffersZone from './home-page/OffersZone';
import OffersPage from './OffersPage';
import DealsPage from './DealsPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Header cartItems={cartItems} setCartItems={setCartItems} /> {/* Pass setCartItems to Header */}
      <Routes>
        <Route path="/" exact element={<Home cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/category/:name" element={<CategoryPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/all-category" element={<AllCategory/>}/>
        <Route path="/top-deals" element={<TopDeals cartItems={cartItems} setCartItems={setCartItems} />} /> {/* TopDeals Route */}
        <Route path="/offers-zone" element={<OffersZone cartItems={cartItems} setCartItems={setCartItems} />} /> {/* OffersZone Route */}
        <Route path="/offers-page" element={<OffersPage cartItems={cartItems} setCartItems={setCartItems} />} /> {/* OffersZone Route */}
        <Route path="/deals-page" element={<DealsPage cartItems={cartItems} setCartItems={setCartItems} />} /> {/* OffersZone Route */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

