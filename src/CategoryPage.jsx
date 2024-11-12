import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // To make API calls
import { ImBin } from "react-icons/im";

const backendUrl = "https://all-mart-e-com-server.onrender.com"; // Replace with your actual backend URL

const CategoryPage = ({ cartItems, setCartItems }) => {
  const { name } = useParams();  // Get category name from URL
  const [itemList, setItemList] = useState([]);  // Store the items for the current category
  const [loading, setLoading] = useState(true);  // Loading state to handle the request

  // Fetch the items for the selected category whenever 'name' changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);  // Set loading state before fetching data
        const response = await axios.get(`${backendUrl}/api/v1/product/category/${name}`);
        setItemList(response.data.data);  // Set the product list based on category
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchItems();
  }, [name]);  // This effect runs when the 'name' parameter (category) changes

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
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
    <div className='flex flex-col container mx-auto mt-40 min-h-screen'>
      <p className='text-4xl font-bold'>{name} Products</p>

      {/* Loading state */}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex justify-items-center gap-10 p-4 mt-4">
          {itemList.length > 0 ? (
            itemList.map(item => {
              const cartItem = getCartItem(item);  // Check if the item is in the cart
              return (
                <div key={item._id} className="border w-3/4 p-4 rounded-md shadow-lg">
                  <img src={item.image} alt={item.name} className="w-full h-44 object-scale-down rounded-md border border-[#9c7b02] py-1" />
                  <h3 className="text-lg text-[#0f5286]">{item.name}</h3>
                  <p className='text-lg text-[#0f5286] font-semibold'>${item.sellingprice.toFixed(2)}</p>

                  {/* Display the Add to Cart button or the quantity controls */}
                  {cartItem ? (
                    <div className="flex items-center space-x-2 mt-8 border">
                      <button onClick={() => decreaseQuantity(item)} className="bg-red-500 text-white py-1 px-3 rounded">-</button>
                      <span className="text-lg font-semibold">{cartItem.quantity}</span>
                      <button onClick={() => increaseQuantity(item)} className="bg-green-500 text-white py-1 px-3 rounded">+</button>
                      <button onClick={() => removeFromCart(item)} className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"><ImBin className='w-7 h-7'/></button>
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
            <p>No products available in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
