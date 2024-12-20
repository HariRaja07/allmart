import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImBin } from "react-icons/im"; // Bin icon for deleting items
import { MdBookmarkRemove } from "react-icons/md";

const backendUrl = "https://allmart-ecom-server.onrender.com"; // Replace with your actual backend URL

const WishlistPage = ({ cartItems, setCartItems }) => {
  const [wishlistItems, setWishlistItems] = useState([]); // Store the items in the user's wishlist
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false); // Track the state of wishlist updating
  const [removeMessage, setRemoveMessage] = useState(""); // State to hold the removal success message
  const [removedItemId, setRemovedItemId] = useState(null); // Track the ID of the removed item

  // Function to get the JWT token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Fetch user's wishlist
  const fetchWishlist = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}/api/v1/users/wishlist`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setWishlistItems(response.data.data); // Set wishlist items
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist(); // Fetch wishlist on component mount
  }, []);

  // Handle removing an item from the wishlist
  const removeFromWishlist = async (itemId) => {
    const token = getToken();
    if (!token) return;

    setIsUpdatingWishlist(true); // Start updating wishlist

    try {
      await axios.delete(`${backendUrl}/api/v1/users/wishlist/remove`, {
        headers: {
          "x-auth-token": token,
        },
        data: { productId: itemId },
      });

      // Show success message immediately
      setRemoveMessage("Item removed successfully!");
      setRemovedItemId(itemId); // Set the removed item ID

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setRemoveMessage(""); // Hide the success message
        setRemovedItemId(null); // Reset the removed item ID
      }, 2000);

      // Delay updating the state to allow message display
      setTimeout(() => {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== itemId)
        );
      }, 2000); // Small delay (500ms) to allow the success message animation to show

    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    } finally {
      setIsUpdatingWishlist(false); // Stop updating wishlist
    }
  };

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
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

  // Function to get the cart item for a specific item
  const getCartItem = (item) => {
    return cartItems.find((i) => i.name === item.name);
  };

  return (
    <div className="flex flex-col container mx-auto mt-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-xl font-semibold">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlistItems.map((item) => (
            <div
              key={item.productId._id}
              className="bg-gray-100 w-3/4 min-h-72 p-4 rounded-md shadow-lg relative"
            >
              {/* If the item is removed, show only the message */}
              {removedItemId === item.productId._id ? (
                <div
                  className="flex flex-col space-y-2 bg-transparent bg-opacity-80 h-full flex justify-center items-center"
                  style={{ zIndex: 10 }}
                >
                    <MdBookmarkRemove className="h-8 w-auto text-green-500"/>
                  <p className="text-xl font-semibold text-green-600">
                    {removeMessage}
                  </p>
                </div>
              ) : (
                <>
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-full h-44 object-scale-down rounded-md bg-white shadow-xl py-1"
                  />
                  <h3 className="text-lg font-bold text-[#0f5286] mt-4">{item.productId.name}</h3>
                  <p className="text-lg text-gray-800 font-semibold">
                    ${item.productId.sellingprice.toFixed(2)}
                  </p>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(item.productId._id)}
                    className="absolute top-6 right-6 text-red-600 hover:text-red-700"
                  >
                    <ImBin className="w-6 h-6" />
                  </button>

                  {/* Add to Cart button */}
                  {getCartItem(item.productId) ? (
                                      <div className="flex items-center space-x-2 mt-8">
                                        <button
                                          onClick={() => decreaseQuantity(item.productId)}
                                          className="bg-red-500 text-white py-1 px-3 rounded"
                                        >
                                          -
                                        </button>
                                        <span className="text-lg font-semibold">
                                          {getCartItem(item.productId).quantity}
                                        </span>
                                        <button
                                          onClick={() => increaseQuantity(item.productId)}
                                          className="bg-green-500 text-white py-1 px-3 rounded"
                                        >
                                          +
                                        </button>
                                        <button
                                          onClick={() => removeFromCart(item.productId)}
                                          className="text-[#ffd124] hover:text-[#edbd07] py-1 px-3 rounded"
                                        >
                                          <ImBin className="w-7 h-7" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => addToCart(item.productId)}
                                        className="bg-[#ffd124] font-semibold hover:bg-[#edbd07] py-2 px-4 shadow-md rounded mt-8"
                                      >
                                        Add to Cart
                                      </button>
                                    )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
