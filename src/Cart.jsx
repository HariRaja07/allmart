// src/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = ({ cartItems = [] }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    // Navigate to confirmation page on payment
    navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y divide-gray-300">
            {cartItems.map(item => (
              <div key={item.name} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} (x{item.quantity})</p>
                  </div>
                </div>
                <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mt-4">Total: ${totalAmount.toFixed(2)}</h2>
          <button 
            onClick={handlePayment}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300">
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
