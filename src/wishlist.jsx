// Wishlist.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Heart icons for wishlist
import { useNavigate } from "react-router-dom";

const backendUrl = "https://allmart-ecom-server.onrender.com"; // Replace with your actual backend URL

const Wishlist = ({ item, wishlist, setWishlist, isUpdatingWishlist }) => {
  const getToken = () => localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleWishlist = async (item) => {
    const token = getToken();
    if (!token) {
      // If no token (user not logged in), redirect to login page
      alert("You must be logged in to add items to the wishlist.");
      navigate("/login"); // Navigate to login page
      return; // Exit early
    } // If no token, skip adding/removing from wishlist

    try {
      if (wishlist.includes(item._id)) {
        // If item is already in wishlist, remove it
        const response = await axios.delete(
          `${backendUrl}/api/v1/users/wishlist/remove`,
          {
            headers: {
              "x-auth-token": token,
            },
            data: { productId: item._id },
          }
        );
        // Remove from local state
        setWishlist(wishlist.filter((id) => id !== item._id));
      } else {
        // If item is not in wishlist, add it
        const response = await axios.post(
          `${backendUrl}/api/v1/users/wishlist/add`,
          {
            productId: item._id,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        // Add to local state
        setWishlist([...wishlist, item._id]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
      }
    }
  };

  const isInWishlist = wishlist.includes(item._id); // Check if item is in wishlist

  return (
    <div
      className={`wishlist-icon absolute top-6 right-6 cursor-pointer transition-all duration-300 
      ${isInWishlist ? "text-red-600" : "text-red-600"} 
      ${isInWishlist && !isUpdatingWishlist ? "transform scale-110" : ""}`}
      onClick={() => !isUpdatingWishlist && toggleWishlist(item)}
    >
      {isInWishlist ? (
        <FaHeart className="w-6 h-6" />
      ) : (
        <FaRegHeart className="w-6 h-6" />
      )}
    </div>
  );
};

export default Wishlist;
