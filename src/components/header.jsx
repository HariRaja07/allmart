// src/Header.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaChevronDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import logo from "../assets/allMartLogo.png";

const Header = ({cartItems}) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate(); // Initialize useNavigate

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const API_KEY = "b6016955a6214eabaea22d7f1d34b514"; // Replace with your actual OpenCage API key

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          fetchAddress(lat, lng); // Fetch address when location is set
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        const formattedAddress = [
          components.road,
          components.suburb,
          components.city,
          components.state,
          components.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(formattedAddress);
      } else {
        setError("Unable to fetch address");
      }
    } catch (err) {
      setError("Error fetching address");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <header className=" relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#89CFF0] to-[#F08080] opacity-75"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFFFFF]"></div>
      <div className="relative z-10 p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="w-32">
        <img src={logo} alt="Logo" className="h-12" />
      </div>
      <div className="mr-3 ml-3">
        <p className="text-lg font-bold font-[Roboto]">
          Delivery Time:{" "}
          <span className="font-extrabold font-[Roboto]">30-45 mins</span>
        </p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-row">
            <p className="text-base max-w-xs truncate font-[Roboto]">
              {address ? address : "Fetching address..."}
            </p>
            {address && (
              <button
                onClick={() => setPopupVisible(!popupVisible)}
                className="ml-1 hover:text-blue-500"
              >
                <FaChevronDown />
              </button>
            )}
            {popupVisible && (
              <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                <p className="text-base font-semibold">{address}</p>
                <button
                  onClick={() => setPopupVisible(false)}
                  className="mt-2 text-red-500"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative mr-4 w-full text-gray-800">
        <IoSearchOutline className="absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for..."
          className="border border-gray-200 shadow-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
      </div>
      <div className="flex flex-col items-center">
        <LuUserCircle2 className="w-8 h-8" />
        <button className="text-gray-700 hover:text-blue-500 text-sm font-[Roboto] font-semibold">
          Login
        </button>
      </div>
      <div className="flex flex-col items-center ml-2">
        <IoCartOutline className="mr-1 w-8 h-8" />
        <span className="text-red-500">{totalItems}</span> {/* Cart count */}
        <button className="text-gray-700 hover:text-blue-500 text-sm font-[Roboto] font-semibold" onClick={() => navigate('/cart')}>
          Cart
        </button>
      </div>
      </div>
      
    </header>
  );
};

export default Header;
