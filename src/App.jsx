// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './home-page/Home';
import CategoryPage from './CategoryPage'; // New component for category items
import Cart from './Cart'; // New component for cart
import Confirmation from './Confirmation'; // Import Confirmation

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/category/:name" element={<CategoryPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;

