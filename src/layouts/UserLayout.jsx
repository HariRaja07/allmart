import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Using Link for navigation
import { FaUser, FaHeart, FaTrashAlt, FaSignOutAlt } from "react-icons/fa"; // Importing icons from react-icons

const UserLayout = () => {
    const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("Profile");

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto min-h-screen flex p-10">

        {/* Sidebar Navigation */}
        <div className="mt-40 w-1/4 p-2">
          <div className="bg-white shadow-xl rounded-xl p-4 space-y-6 p-2 border-2 border-blue-300">

            {/* Navigation items with icons */}
            <Link
              to="/user/profile"
              onClick={() => handleNavClick("Profile")}
              className={`flex items-center space-x-4 p-4 rounded-lg w-full transition-colors ${
                selectedNav === "Profile" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-700 hover:bg-blue-100 "
              }`}
            >
              <FaUser className="text-xl" />
              <span className="text-lg">Profile</span>
            </Link>

            <Link
              to="/user/wishlist"
              onClick={() => handleNavClick("Wishlist")}
              className={`flex items-center space-x-4 p-4 rounded-lg w-full transition-colors ${
                selectedNav === "Wishlist" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <FaHeart className="text-xl" />
              <span className="text-lg">Wishlist</span>
            </Link>

            <Link
              to="/user/delete-account"
              onClick={() => handleNavClick("Delete Account")}
              className={`flex items-center space-x-4 p-4 rounded-lg w-full transition-colors ${
                selectedNav === "Delete Account" ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <FaTrashAlt className="text-xl" />
              <span className="text-lg">Delete Account</span>
            </Link>

            <div
              onClick={handleLogout}
              className={`flex items-center space-x-4 w-full bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600`}
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-lg">Logout</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-2">
          <Outlet /> {/* This renders the child route's component */}
        </div>

      </div>
    </div>
  );
};

export default UserLayout;
