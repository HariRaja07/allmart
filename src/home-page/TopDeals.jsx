import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import axios from "axios";
import Wishlist from "../wishlist";

const backendUrl = "https://allmart-ecom-server.onrender.com"; // Replace with your actual backend URL

const TopDeals = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [activeDeals, setActiveDeals] = useState([]); // Store the items for the current category
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]); // Track user's wishlist items
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false); // Track wishlist update status

    const getToken = () => localStorage.getItem("token");
  //console.log(localStorage.getItem('token'));  // Check if token is set


  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true); // Set loading state before fetching data
        const response = await axios.get(`${backendUrl}/api/v1/deal`);
        const dealsData = response.data.data.activeDeals.slice(0, 4);
        //console.log(dealsData);
        setActiveDeals(dealsData); // Set the product list based on category
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError("Failed to fetch offers, please try again later.");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchDeals();
  }, []); // This effect runs once on component mount

  const fetchWishlist = async () => {
    const token = getToken();

    if (!token) return; // If no token, skip fetching wishlist

    try {
      const response = await axios.get(
        `${backendUrl}/api/v1/users/wishlist`,
        {
          headers: {
            "x-auth-token": token, // Include JWT token in headers
          },
        }
      );
      // Map wishlist to product IDs
      const pId = response.data.data.map((item) => item.productId._id);
      setWishlist(pId);
      console.log(pId);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  // Fetch user's wishlist on page load
  useEffect(() => {
    fetchWishlist();
  }, []); // This will run only once when the component is first mounted
  // Only fetch wishlist once, when the component is first rendered

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const discountedPrice =
      item.product?.sellingprice -
      item.product?.sellingprice * (item.discountPercentage / 100);
    const formattedDiscountedPrice = isNaN(discountedPrice)
      ? item.product?.sellingprice
      : discountedPrice;
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({
        ...item.product,
        quantity: 1,
        discountedPrice: formattedDiscountedPrice,
      });
    }
    setCartItems(updatedItems);
  };

  // Function to handle removing an item from the cart
  const removeFromCart = (item) => {
    const updatedItems = cartItems.filter((i) => i.name !== item.name);
    setCartItems(updatedItems);
  };

  // Function to handle increasing quantity of an item
  const increaseQuantity = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    setCartItems(updatedItems);
  };

  // Function to handle decreasing quantity of an item
  const decreaseQuantity = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((i) => i.name === item.name);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      removeFromCart(item); // Remove item if quantity is 1
    }
    setCartItems(updatedItems);
  };

  // Function to get the cart item for a specific item
  const getCartItem = (item) => {
    return cartItems.find((i) => i.name === item.name);
  };

  const openModal = (product) => {
    setSelectedProduct(product); // Set the selected product to show in the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedProduct(null); // Close the modal by resetting the selected product
  };

  return (
    <div className="flex flex-col p-4">
      <div className="container mx-auto bg-[#d4eafa] rounded-lg">
        <div className="flex flex-row mx-auto p-2 container justify-between">
          <h2 className="inline-block text-3xl font-bold text-[#ffd124] border-2 border-[#ffd124] bg-[#0f5286] p-2 font-[roboto] mb-6 rounded-full">
            Top Deals
          </h2>
          <Link
            to="/deals-page"
            className="font-semibold text-base text-[#e81e25] hover:text-[#0f5286] no-underline hover:underline"
          >
            View All Top-Deals
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {activeDeals.length > 0 ? (
              activeDeals.map((item) => {
                //console.log(item.product._id);
                const cartItem = getCartItem(item.product); // Check if the item is in the cart
                const discountedPrice =
                  item.product?.sellingprice -
                  item.product?.sellingprice * (item.discountPercentage / 100);
                const formattedDiscountedPrice = isNaN(discountedPrice)
                  ? 0
                  : discountedPrice.toFixed(2);

                return (
                  <div
                    key={item._id}
                    className="border w-3/4 p-4 rounded-md shadow-lg bg-white relative"
                    onClick={(e) => {
                      // Prevent modal from opening when clicking on the "Add to Cart" button
                      if (e.target.closest("button")) return;
                      openModal(item); // Open modal when clicking on the card (excluding the "Add to Cart" button)
                    }}
                  >
                    <p className="absolute text-white font-semibold p-1 bg-[#e81e25] rounded">
                      {item.discountPercentage}% OFF
                    </p>
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-full h-44 object-scale-down rounded-md border border-[#9c7b02] py-1"
                    />
                    <h3 className="text-lg text-[#0f5286]">
                      {item.product?.name}
                    </h3>
                    <div className="flex justify-center items-center space-x-2">
                      <p className="text-xl font-semibold text-red-600">
                        ${formattedDiscountedPrice}
                      </p>
                      <p className="text-base line-through mr-4">
                        ${item.product?.sellingprice.toFixed(2)}
                      </p>
                    </div>
                    <Wishlist 
                    item={item.product}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    isUpdatingWishlist={isUpdatingWishlist}
                    />
                    {cartItem ? (
                      <div className="flex items-center space-x-2 mt-8 border">
                        <button
                          onClick={() => decreaseQuantity(item.product)}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.product)}
                          className="bg-green-500 text-white py-1 px-3 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product)}
                          className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"
                        >
                          <ImBin className="w-7 h-7" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#ffd124] font-semibold hover:bg-[#edbd07] py-2 px-4 rounded mt-8"
                      >
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

      {/* Modal Popup */}
            {selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
                <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg max-w-4xl w-full">
                  <div className="flex justify-end ">
                    <button
                      onClick={closeModal}
                      className=" font-bold text-2xl text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
      
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center bg-white shadow-xl rounded-xl p-2">
                      <img
                        src={selectedProduct.product.image}
                        alt={selectedProduct.product.name}
                        className="flex items-center w-72 h-96 object-scale-down rounded-md"
                      />
                    </div>
      
                    <div className="flex flex-col justify-start space-y-2">
                      <div className="flex flex-col justify-start space-y-1 border-b py-2 border-[#ab9852]/50">
                        <h2 className="text-3xl font-bold text-[#0f5286]">
                          {selectedProduct.product.name}
                        </h2>
                        <p className="text-xs font-semibold text-gray-500">
                          Brand ID: {selectedProduct.product.brand.name}
                        </p>
                      </div>
      
                      <div className="flex flex-col">
                        <p className="text-xl text-[#e81e25] font-bold">
                          Deal of the Store:{" "}
                          <span className="bg-[#e81e25] text-white px-2 rounded-lg">
                            {selectedProduct.discountPercentage}% OFF
                          </span>
                        </p>
                      </div>
                      {selectedProduct.product.sellingprice &&
                      selectedProduct.discountPercentage !== undefined
                        ? (() => {
                            const discountedPrice =
                              selectedProduct.product.sellingprice -
                              selectedProduct.product.sellingprice *
                                (selectedProduct.discountPercentage / 100);
                            const formattedDiscountedPrice = isNaN(discountedPrice)
                              ? selectedProduct.product.sellingprice
                              : discountedPrice.toFixed(2);
                            return (
                              <div className="flex flex-col">
                                <div className="flex flex-row space-x-1 items-end">
                                  <p className="text-xl text-[#e81e25]">
                                    -{selectedProduct.discountPercentage}%
                                  </p>
                                  <p className="text-2xl font-semibold text-[#0f5286]">
                                    ${formattedDiscountedPrice}
                                  </p>
                                </div>
      
                                <p className="text-xs font-semibold line-through text-gray-500">
                                  M.R.P.:${selectedProduct.product.sellingprice}
                                </p>
                              </div>
                            );
                          })()
                        : null}
                      <div className="flex flex-col justify-start space-y-1 border-t py-2 border-[#ab9852]/50">
                        <p className="text-base font-semibold text-gray-700">
                          Description:
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                          {selectedProduct.product.desc}
                        </p>
                      </div>
      
                      {/* Add to Cart Section */}
                      {getCartItem(selectedProduct.product) ? (
                        <div className="flex items-center space-x-2 mt-8">
                          <button
                            onClick={() => decreaseQuantity(selectedProduct.product)}
                            className="bg-red-500 text-white py-1 px-3 rounded"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold">
                            {getCartItem(selectedProduct.product).quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(selectedProduct.product)}
                            className="bg-green-500 text-white py-1 px-3 rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(selectedProduct.product)}
                            className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"
                          >
                            <ImBin className="w-7 h-7" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="bg-[#ffd124] hover:bg-[#edbd07] text-black font-semibold py-2 px-6 w-1/3 rounded-md mt-8"
                        >
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

export default TopDeals;
