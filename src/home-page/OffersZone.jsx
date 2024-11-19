import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ImBin } from "react-icons/im";
import axios from 'axios';

const backendUrl = "https://all-mart-e-com-server.onrender.com"; // Replace with your actual backend URL

const OffersZone = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);  // Store the items for the current category
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchoffers = async () => {
      try {
        setLoading(true);  // Set loading state before fetching data
        const response = await axios.get(`${backendUrl}/api/v1/offer`);
        setOffers(response.data.data.offers.slice(0, 4));  // Set the product list based on category
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Failed to fetch offers, please try again later.');
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchoffers();
  }, []);  // This effect runs once on component mount

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const discountedPrice = item.product?.sellingprice - (item.product?.sellingprice * (item.discount / 100));
    const formattedDiscountedPrice = isNaN(discountedPrice) ? item.product?.sellingprice : discountedPrice;
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ ...item.product, quantity: 1, discountedPrice: formattedDiscountedPrice });
    }
    setCartItems(updatedItems);
  };

  // Function to handle removing an item from the cart
  const removeFromCart = (item) => {
    const updatedItems = cartItems.filter(i => i.name !== item.name);
    setCartItems(updatedItems);
  };

  // Function to handle increasing quantity of an item
  const increaseQuantity = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    setCartItems(updatedItems);
  };

  // Function to handle decreasing quantity of an item
  const decreaseQuantity = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.name);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      removeFromCart(item); // Remove item if quantity is 1
    }
    setCartItems(updatedItems);
  };

  // Function to get the cart item for a specific item
  const getCartItem = (item) => {
    return cartItems.find(i => i.name === item.name);
  };

  return (
    <div className='flex flex-col p-4'>
      <div className="container mx-auto bg-[#fff6d4] rounded-lg">
      <div className="flex flex-row mx-auto p-2 container justify-between">
      <h2 className="inline-block text-3xl font-bold text-[#0f5286] font-[roboto] mb-6 border-2 border-[#0f5286] p-2 rounded-full bg-[#ffd124]">Offers Zone</h2>
        <Link 
          to="/offers-page" 
          className="font-semibold text-base text-[#e81e25] hover:text-[#0f5286] no-underline hover:underline"
        >
          View All Offers
        </Link>
      </div>
        

        {loading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {offers.length > 0 ? (
              offers.map(item => {
                const cartItem = getCartItem(item.product);  // Check if the item is in the cart
                const discountedPrice = item.product?.sellingprice - (item.product?.sellingprice * (item.discount / 100));
                const formattedDiscountedPrice = isNaN(discountedPrice) ? 0 : discountedPrice.toFixed(2);

                return (
                  <div key={item._id} className="border w-3/4 p-4 rounded-md shadow-lg bg-white relative">
                    <p className='absolute text-white font-semibold p-1 bg-[#e81e25] rounded'>{item.discount}% OFF</p>
                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-44 object-scale-down rounded-md border border-[#9c7b02] py-1" />
                    <h3 className="text-lg text-[#0f5286]">{item.product?.name}</h3>
                    <div className="flex justify-center items-center space-x-2">
                      <p className="text-xl font-semibold text-red-600">${formattedDiscountedPrice}</p>
                      <p className="text-base line-through mr-4">${item.product?.sellingprice.toFixed(2)}</p>
                    </div>
                    {cartItem ? (
                    <div className="flex items-center space-x-2 mt-8 border">
                      <button onClick={() => decreaseQuantity(item.product)} className="bg-red-500 text-white py-1 px-3 rounded">-</button>
                      <span className="text-lg font-semibold">{cartItem.quantity}</span>
                      <button onClick={() => increaseQuantity(item.product)} className="bg-green-500 text-white py-1 px-3 rounded">+</button>
                      <button onClick={() => removeFromCart(item.product)} className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"><ImBin className='w-7 h-7'/></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="bg-[#ffd124] font-semibold hover:bg-[#edbd07] py-2 px-4 rounded mt-8">
                      Add to Cart
                    </button>
                  )}
                  </div>
                );
              })
            ) : (
              <p>No offers available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersZone;
