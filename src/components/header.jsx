import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaChevronDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import logo from "../assets/allMartLogo.png";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import CartComponent from "./cartComponent";
import LoginComponent from "./loginComponent";
const backendUrl = "https://all-mart-e-com-server.onrender.com";

const Header = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage logged-in state
  const [userName, setUserName] = useState(""); // Store user's name
  const [userDetails, setUserDetails] = useState(null);

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [scrolling, setScrolling] = useState(false); // Track scrolling

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    // You can replace this with your authentication logic to check if the user is logged in
    const token = localStorage.getItem('token'); // Example using localStorage
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails(token); // Fetch user details if logged in
    } else {
      setIsLoggedIn(false); // If no token, set logged in state to false
     // Navigate to login page if not logged in
    }
  }, [navigate]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');  // Or from Redux or Context API
      const response = await fetch(`${backendUrl}/api/v1/users/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,  // Add JWT token here
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User details:', data);
        setUserDetails(data);
        setUserName(data.email);
      } else {
        const errorData = await response.json();
        console.error('Error fetching user details:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${backendUrl}/api/v1/categories`
        );
        // Now extract the categories array from the response data
        setCategory(categoryResponse.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategory([]); // Fallback to empty array in case of an error
      }
    };

    fetchData();
  }, []);
  console.log(cartItems);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Navigate to the selected category
  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const API_KEY = "b6016955a6214eabaea22d7f1d34b514"; // Replace with your actual OpenCage API key

  // Function to get the user's location
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

  // Function to fetch the address using latitude and longitude
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

  // Request location access when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationPermissionGranted(true);
          getLocation();
        },
        () => {
          setLocationPermissionGranted(false);
        }
      );
    }
  }, []);

  // Track scroll position to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-[#89CFF0] to-[#F08080] "></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFFFFF]"></div>
      <div className="relative z-10 p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row justify-between">
          <div className="w-32">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          {/* Conditional Category Button - visible at top */}
          {scrolling && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => navigate("/")}
                className="w-full md:w-auto bg-transparent flex flex-col items-center space-x-2 text-[#0f5286] hover:text-[#9c7b02]"
              >
                <FaHome className="w-7 h-7 " />
                <span className="font-semibold">Home</span>
              </button>

              <button
                onClick={() => navigate("/all-category")}
                className="w-full md:w-auto bg-transparent flex flex-col items-center space-x-2 text-[#0f5286] hover:text-[#9c7b02]"
              >
                <BiSolidCategory className="w-7 h-7 " />
                <span className="font-semibold">Category</span>
              </button>
            </div>
          )}

          <div className="mr-3 ml-3 bg-[#3b8ccb] rounded-full px-5 py-1 shadow-lg text-white">
            <p className="text-base font-bold font-[Roboto]">
              Delivery Time:{" "}
              <span className="font-extrabold font-[Roboto]">30-45 mins</span>
            </p>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="flex flex-row">
                <p className="text-sm max-w-xs truncate font-[Roboto]">
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
        </div>

        <div className="flex justify-between space-x-4">
          <div className="relative mr-4 w-96 text-gray-800">
            <IoSearchOutline className="absolute left-3 top-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for..."
              className="border border-gray-300 shadow-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>

          <div className="flex flex-col items-center text-[#0f5286] hover:text-[#3b8ccb]">
            <BsBookmarkHeartFill className="w-7 h-7" />
            <span className="text-sm font-[Roboto] font-semibold">
              Wishlist
            </span>
          </div>
          <LoginComponent isLoggedIn={isLoggedIn} userName={userName} />
          <CartComponent cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>

      {/* Side Cart Panel */}

      {/* Shop by Category Button - visible when scrolled down */}
      {!scrolling && (
        <div className="relative z-10 px-4 py-2 bg-[#faf2d4]/50 flex flex-row space-x-4">
          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto px-6 py-3 bg-[#ffd124] font-semibold rounded-md shadow-lg hover:bg-[#edbd07] transition duration-300 flex flex-row items-center space-x-2"
          >
            <FaHome className="w-7 h-7 text-[#0f5286]" />
            <span>Home</span>
          </button>

          <button
            onClick={toggleDropdown}
            className="w-full md:w-auto px-6 py-3 bg-[#ffd124] font-semibold rounded-md shadow-lg hover:bg-[#edbd07] transition duration-300 flex flex-row items-center space-x-2"
          >
            <BiSolidCategory className="w-7 h-7 text-[#0f5286]" />
            <span>Shop by Category</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-16 w-auto bg-gray-100 shadow-lg rounded-md z-10">
              <div className=" grid grid-cols-3 gap-4 p-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className="px-4 py-2 text-gray-800 hover:bg-[#ffffff] rounded-md cursor-pointer"
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
