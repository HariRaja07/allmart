import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ImBin } from "react-icons/im";
import Wishlist from "../wishlist";

const backendUrl = "https://allmart-ecom-server.onrender.com"; // Replace with your actual backend URL

const LatestProducts = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]); // Store the last 10 added products
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product for modal
  const [wishlist, setWishlist] = useState([]); // Track user's wishlist items
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false); // Track wishlist update status

  const getToken = () => localStorage.getItem("token");
  //console.log(localStorage.getItem('token'));  // Check if token is set

  // Fetch latest 10 products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${backendUrl}/api/v1/product`);
        const latest = response.data.data.slice(-4); // Get the last 10 added products
        setLatestProducts(latest);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setError("Failed to fetch products, please try again later.");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchLatestProducts();
  }, []); // Fetch products once on mount

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

  // Add product to cart
  const addToCart = (item) => {
    const discountedPrice =
      item.sellingprice - item.sellingprice * (item.discountPercentage / 100);
    const formattedDiscountedPrice = isNaN(discountedPrice)
      ? item.sellingprice
      : discountedPrice;
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({
        ...item,
        quantity: 1,
        discountedPrice: formattedDiscountedPrice,
      });
    }
    setCartItems(updatedItems);
  };

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

  // Get cart item details for a specific item
  const getCartItem = (item) => {
    return cartItems.find((i) => i.name === item.name);
  };

  const openModal = (item) => {
    setSelectedProduct(item); // Set the selected product to show in the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedProduct(null); // Close the modal by resetting the selected product
  };

  return (
    <div className="flex flex-col p-4">
      <div className="container mx-auto bg-[#f5c890]/50 rounded-lg">
        <div className="flex justify-between mx-auto p-2">
          <h2 className="inline-block text-3xl font-bold text-[#b70c0c] border-2 border-[#b70c0c] bg-[#f2be63] p-2 mb-6 rounded-full">
            Latest Products
          </h2>
          <Link
                      to="/latest"
                      className="font-semibold text-base text-[#e81e25] hover:text-[#0f5286] no-underline hover:underline"
                    >
                      View All Newly Arrived Products
                    </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {latestProducts.length > 0 ? (
              latestProducts.map((item) => {
                const cartItem = getCartItem(item); // Check if the item is in the cart
                const discountedPrice =
                  item.sellingprice -
                  item.sellingprice * (item.discountPercentage / 100);
                const formattedDiscountedPrice = isNaN(discountedPrice)
                  ? item.sellingprice
                  : discountedPrice.toFixed(2);

                return (
                  <div
                    key={item._id}
                    className="border p-4 rounded-md shadow-lg bg-white relative"
                    onClick={(e) => {
                      // Prevent modal from opening when clicking on the "Add to Cart" button
                      if (e.target.closest("button")) return;
                      openModal(item); // Open modal when clicking on the card (excluding the "Add to Cart" button)
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-44 object-scale-down bg-gray-100 rounded-md shadow-md mb-4  p-2"
                    />
                    <h3 className="text-lg font-bold text-[#0f5286]">{item.name}</h3>
                    <div className="flex justify-start items-center space-x-2">
                      {/* {<p className="text-xl font-semibold text-red-600">
                        ${formattedDiscountedPrice}
                      </p>} */}
                      <p className="text-xl font-semibold text-gray-800">
                        ${item.sellingprice.toFixed(2)}
                      </p>
                    </div>
                    <Wishlist 
                    item={item}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    isUpdatingWishlist={isUpdatingWishlist}
                    />
                    {cartItem ? (
                      <div className="flex items-center space-x-2 mt-8 border">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="bg-green-500 text-white py-1 px-3 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item)}
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
              <p>No products available.</p>
            )}
          </div>
        )}
      </div>

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

export default LatestProducts;
