// src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom'; // To render nested routes

const MainLayout = ({ cartItems, setCartItems }) => {
  return (
    <div>
      <Header cartItems={cartItems} setCartItems={setCartItems} />
      <div className="main-content">
        <Outlet /> {/* This renders the child route's component */}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
