// src/Confirmation.jsx
import React from 'react';

const Confirmation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p className="text-lg mb-6">Thank you for your order! Your items will arrive soon at your doorstep.</p>
        <p className="text-sm text-gray-500">You will receive a confirmation email shortly.</p>
      </div>
    </div>
  );
};

export default Confirmation;
