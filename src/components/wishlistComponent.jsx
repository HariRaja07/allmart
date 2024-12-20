import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BsBookmarkHeartFill } from "react-icons/bs"; // Wishlist icon
import axios from "axios";

const backendUrl = "https://allmart-ecom-server.onrender.com";

const wishlistComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage logged-in state
  const [wishlistItems, setWishlistItems] = useState([]); // Wishlist items state
  const [userName, setUserName] = useState(""); // Store user's name
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch user wishlist items from the backend
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token'); // Example using localStorage for token
    if (token) {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/users/wishlist`, {
          headers: {
            "x-auth-token": token, // Add JWT token here
          },
        });
        setWishlistItems(response.data.data); // Set wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
  };
  // Check if user is logged in and fetch wishlist items
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchWishlist(); // Fetch wishlist when logged in
    } else {
      setIsLoggedIn(false);
      setLoading(false); // If not logged in, set loading to false
    }
  }, [navigate]);

  // Navigate to the wishlist page
  const navigateToWishlist = () => {
    navigate("/wishlist"); // Navigate to the wishlist page
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return (
          <div className="flex justify-between space-x-4">
            {/* Wishlist Icon */}
            <div
              onClick={navigateToWishlist} // On click, navigate to wishlist
              className={`relative flex flex-col items-center text-[#0f5286] hover:text-[#3b8ccb] cursor-pointer`}
            >
              <BsBookmarkHeartFill
                className={`w-7 h-7 ${wishlistItems.length > 0 ? "text-red-500" : ""}`} // Change icon color to red if wishlist has items
              />
              <span className="text-sm font-semibold">Wishlist</span>
            </div>
          </div>
  );
};

export default wishlistComponent;
