// LoginButton.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const loginComponent = ({ isLoggedIn, userName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/user/profile"); // Navigate to profile page if logged in
    } else {
      navigate("/login"); // Navigate to login page if not logged in
    }
  };

  return (
    <div className="flex flex-col items-center text-[#0f5286] hover:text-[#3b8ccb]">
      <FaUserCircle className="w-7 h-7" />
      <button
        onClick={handleClick}
        className="text-sm font-[Roboto] font-semibold truncate w-12"
      >
        {isLoggedIn ? userName : "Login"}
      </button>
    </div>
  );
};

export default loginComponent;
