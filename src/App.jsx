// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Import MainLayout
import AuthLayout from './layouts/AuthLayout'; // Import AuthLayout
import UserLayout from './layouts/UserLayout';
import Home from './home-page/Home';
import CategoryPage from './CategoryPage'; 
import Cart from './Cart'; 
import Confirmation from './Confirmation'; 
import CheckoutPage from './CheckoutPage';
import AllCategory from './AllCategory';
import TopDeals from './home-page/TopDeals';
import OffersZone from './home-page/OffersZone';
import OffersPage from './OffersPage';
import DealsPage from './DealsPage';
import Login from './login-components/Login';
import SignUp from './login-components/SignUp';
import Profile from './login-components/Profile';
import ResetPassword from './login-components/ResetPassword';
import ForgotPassword from './login-components/ForgotPassword';
import DeleteAccount from './login-components/DeleteAccount';
import LatestProducts from './home-page/LatestProducts';
import Latest from './Latest';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        {/* MainLayout for authenticated routes */}
        <Route path="/" element={<MainLayout cartItems={cartItems} setCartItems={setCartItems} />}>
          <Route path="/" exact element={<Home cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/category/:name" element={<CategoryPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/all-category" element={<AllCategory />} />
          <Route path="/top-deals" element={<TopDeals cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/offers-zone" element={<OffersZone cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/offers-page" element={<OffersPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/deals-page" element={<DealsPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/latest-products" element={<LatestProducts cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/latest" element={<Latest cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/user" element={<UserLayout/>}>
            <Route path="profile" element={<Profile />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
        </Route>

        {/* AuthLayout for authentication-related pages */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
