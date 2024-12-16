import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // To make API calls
import { ImBin } from "react-icons/im";

const backendUrl = "https://all-mart-e-com-server.onrender.com"; // Replace with your actual backend URL

const Latest = ({ cartItems, setCartItems }) => {
  const [itemList, setItemList] = useState([]);  // Store the items for the current category
  const [loading, setLoading] = useState(true);  // Loading state to handle the request
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
      window.scrollTo(0, 0);  // Scroll to top of the page
    }, []);
  // Fetch the items for the selected category whenever 'name' changes
  useEffect(() => {
    const fetchLatestProducts = async () => {
        try {
          setLoading(true); // Start loading
          const response = await axios.get(`${backendUrl}/api/v1/product`);
          const latest = response.data.data.slice(-10); // Get the last 10 added products
          setItemList(latest);
          setLoading(false); // Stop loading
        } catch (error) {
          console.error("Error fetching latest products:", error);
          setError("Failed to fetch products, please try again later.");
          setLoading(false); // Stop loading even if there's an error
        }
      };
  
      fetchLatestProducts();
    }, []); // Fetch products once on mount

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

  const openModal = (product) => {
    setSelectedProduct(product);  // Set the selected product to show in the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedProduct(null);  // Close the modal by resetting the selected product
  };

  return (
    <div className='flex flex-col container mx-auto mt-40 min-h-screen'>
      <p className='text-4xl font-bold'>Newly Arrived Products</p>

      {/* Loading state */}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex justify-items-center gap-10 p-4 mt-4">
          {itemList.length > 0 ? (
            itemList.map(item => {
              const cartItem = getCartItem(item);  // Check if the item is in the cart
              return (
                <div key={item._id} 
                className="border w-3/4 p-4 rounded-md shadow-lg"
                onClick={(e) => {
                  // Prevent modal from opening when clicking on the "Add to Cart" button
                  if (e.target.closest('button')) return;
                  openModal(item); // Open modal when clicking on the card (excluding the "Add to Cart" button)
                }}>
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

      {/* Modal Popup */}
      {selectedProduct && (
              <>
                {console.log(selectedProduct)} {/* Log the selected product */}
                <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
                  <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg max-w-6xl w-full">
                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="font-bold text-2xl text-gray-700"
                      >
                        &times;
                      </button>
                    </div>
      
                    {/* Render selected product details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center border p-2">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="flex items-center w-72 h-96 object-scale-down border rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-start space-y-2">
                        <div className="flex flex-col justify-start space-y-1 border-b py-2 border-[#ab9852]">
                          <p className="text-4xl font-semibold text-[#0f5286]">
                            {selectedProduct.name}
                          </p>{" "}
                          {/* Access 'name' property */}
                          <p className="text-sm font-semibold text-[#e81e25]">
                            <strong>Brand:</strong> {selectedProduct.brand.name}
                          </p>{" "}
                          {/* Access 'brand.name' */}
                        </div>
                        <div className="flex flex-col justify-start space-y-1 border-b py-2 border-[#ab9852]">
                          <p className="text-base font-semibold text-gray-700">
                            Description:
                          </p>{" "}
                          {/* Access 'desc' property */}
                          <p className="text-sm font-semibold text-gray-600">
                            {selectedProduct.desc}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-semibold border-b py-2 border-[#ab9852] text-gray-700">
                            <strong>M.R.P:$</strong> {selectedProduct.sellingprice}
                          </p>{" "}
                          {/* Access 'category.name' */}
                        </div>
                        {getCartItem(selectedProduct) ? (
                          <div className="flex items-center space-x-2 mt-8 border">
                            <button
                              onClick={() => decreaseQuantity(selectedProduct)}
                              className="bg-red-500 text-white py-1 px-3 rounded"
                            >
                              -
                            </button>
                            <span className="text-lg font-semibold">
                              {getCartItem(selectedProduct).quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(selectedProduct)}
                              className="bg-green-500 text-white py-1 px-3 rounded"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(selectedProduct)}
                              className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"
                            >
                              <ImBin className="w-7 h-7" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(selectedProduct)}
                            className="bg-[#ffd124] hover:bg-[#edbd07] text-black font-semibold py-2 px-6 rounded-md mt-8"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
    </div>
  );
};

export default Latest;
