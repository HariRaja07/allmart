import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // To make API calls
import { ImBin } from "react-icons/im";

const backendUrl = "https://all-mart-e-com-server.onrender.com"; // Replace with your actual backend URL

const OffersPage = ({ cartItems, setCartItems }) => {
  //const { name } = useParams();  // Get category name from URL
  const [offers, setOffers] = useState([]);  // Store the items for the current category
  const [loading, setLoading] = useState(true);  // Loading state to handle the request
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Fetch the items for the selected category whenever 'name' changes
  useEffect(() => {
    const fetchoffers = async () => {
      try {
        setLoading(true);  // Set loading state before fetching data
        const response = await axios.get(`${backendUrl}/api/v1/offer`);
        setOffers(response.data.data.offers);  // Set the product list based on category
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchoffers();
  }, []);  // This effect runs when the 'name' parameter (category) changes

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const discountedPrice = item.product?.sellingprice - (item.product?.sellingprice * (item.discount / 100));
    const formattedDiscountedPrice = isNaN(discountedPrice) ? item.product?.sellingprice : discountedPrice;
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.product?.name);
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

  const openModal = (product) => {
    setSelectedProduct(product);  // Set the selected product to show in the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedProduct(null);  // Close the modal by resetting the selected product
  };

  return (
    <div className='flex flex-col container mx-auto mt-40 min-h-screen bg-[#fff6d4] rounded-lg mb-12'>
      <h2 className="inline-block text-3xl font-bold text-[#0f5286] font-[roboto] mb-6 border-2 border-[#0f5286] p-2 rounded-full bg-[#ffd124] text-center">Offers Zone</h2>

      {/* Loading state */}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex justify-items-center gap-10 p-4 mt-4">
          {offers.length > 0 ? (
            offers.map(item => {
              const cartItem = getCartItem(item.product);  // Check if the item is in the cart
              const discountedPrice = item.product?.sellingprice - (item.product?.sellingprice * (item.discount / 100));
              const formattedDiscountedPrice = isNaN(discountedPrice) ? 0 : discountedPrice.toFixed(2);
              return (
                <div key={item._id} 
                className="border w-3/4 p-4 rounded-md shadow-lg bg-white"
                onClick={(e) => {
                    // Prevent modal from opening when clicking on the "Add to Cart" button
                    if (e.target.closest('button')) return;
                    openModal(item); // Open modal when clicking on the card (excluding the "Add to Cart" button)
                  }}>
                  <p className='absolute text-white font-semibold p-1 bg-[#e81e25] rounded'>{item.discount}% OFF</p>
                  <img src={item.product?.image} alt={item.product?.name} className="w-full h-44 object-scale-down rounded-md border border-[#9c7b02] py-1" />
                  <h3 className="text-lg text-[#0f5286]">{item.product?.name}</h3>
                  <div className="flex justify-center items-center space-x-2">
                  <p className='text-lg text-[#0f5286] font-semibold'>${formattedDiscountedPrice}</p>
                  <p className="text-base line-through mr-4">${item.product?.sellingprice.toFixed(2)}</p>
                  </div>
                  {/* Display the Add to Cart button or the quantity controls */}
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
            <p>No products available in this category.</p>
          )}
        </div>
      )}

      {/* Modal Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
          <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg max-w-6xl w-full">
            <div className='flex justify-end '>
            <button onClick={closeModal} className=" font-bold text-2xl text-gray-700">&times;</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className='flex justify-center border p-2'>
                <img src={selectedProduct.product.image} alt={selectedProduct.product.name} className="flex items-center w-72 h-96 object-scale-down border rounded-md" />
                </div>
              
              <div className="flex flex-col justify-start space-y-2">
                <div className='flex flex-col justify-start space-y-1 border-b py-2 border-[#ab9852]'>
                <h2 className="text-4xl font-semibold text-[#0f5286]">{selectedProduct.product.name}</h2>
                <p className="text-sm font-semibold text-[#e81e25]">Brand ID: {selectedProduct.product.brand}</p>
                </div>
                <div className='flex flex-col justify-start space-y-1 border-b py-2 border-[#ab9852]'>
                <p className="text-base font-semibold text-gray-700">Description:</p>
                <p className="text-sm font-semibold text-gray-600">{selectedProduct.product.desc}</p>
                </div>
                <div className='flex flex-col'>
                <p className="text-xl text-[#e81e25] font-bold">Offer of the Store: <span className='bg-[#e81e25] text-white px-2 rounded-lg'>{selectedProduct.discount}% OFF</span></p>
                </div>
                
                {selectedProduct.product.sellingprice && selectedProduct.discount !== undefined ? (
                  (() => {
                    const discountedPrice = selectedProduct.product.sellingprice - (selectedProduct.product.sellingprice * (selectedProduct.discount / 100));
                    const formattedDiscountedPrice = isNaN(discountedPrice) ? selectedProduct.product.sellingprice : discountedPrice.toFixed(2);
                    return (
                      <div className="flex flex-col">
                        <div className='flex flex-row space-x-1 items-end'>
                        <p className="text-xl text-[#e81e25]">-{selectedProduct.discount}%</p>
                        <p className="text-2xl font-semibold text-[#0f5286]">${formattedDiscountedPrice}</p>
                        </div>
                        
                        <p className="text-xs font-semibold line-through text-gray-500">M.R.P.:${selectedProduct.product.sellingprice}</p>
                      </div>
                    );
                  })()
                ) : null}
                {/* Add to Cart Section */}
                {getCartItem(selectedProduct.product) ? (
                  <div className="flex items-center space-x-2 mt-8 border">
                    <button onClick={() => decreaseQuantity(selectedProduct.product)} className="bg-red-500 text-white py-1 px-3 rounded">-</button>
                    <span className="text-lg font-semibold">{getCartItem(selectedProduct.product).quantity}</span>
                    <button onClick={() => increaseQuantity(selectedProduct.product)} className="bg-green-500 text-white py-1 px-3 rounded">+</button>
                    <button onClick={() => removeFromCart(selectedProduct.product)} className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"><ImBin className='w-7 h-7'/></button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(selectedProduct)} className="bg-[#ffd124] hover:bg-[#edbd07] text-black font-semibold py-2 px-6 rounded-md mt-8">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
