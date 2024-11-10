import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems, setCartItems }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false); // To toggle edit mode for address

  const navigate = useNavigate();
  const API_KEY = "b6016955a6214eabaea22d7f1d34b514"; // Replace with your actual API key

  // Fetch address using geolocation
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
        setAddress("Unable to fetch address");
      }
    } catch (error) {
      setAddress("Error fetching address");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchAddress(position.coords.latitude, position.coords.longitude);
          setLocationPermissionGranted(true);
        },
        () => {
          setLocationPermissionGranted(false);
        }
      );
    }
  }, []);

  // Handle promo code logic
  const handlePromoCodeApply = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(0.1 * totalAmount); // 10% discount for "DISCOUNT10"
    } else {
      alert("Invalid promo code");
    }
  };

  // Handle payment confirmation
  const handlePaymentConfirmation = () => {
    alert("Order confirmed!");
    setCartItems([]);
    navigate("/confirmation");
  };

  // Toggle edit mode for address
  const toggleEditAddress = () => {
    setIsEditAddress(!isEditAddress);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen mt-40">
      <h1 className="text-3xl font-bold text-center text-[#0f5286]">Checkout</h1>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#0f5286]">Delivery Information</h2>
        <div className="mt-4">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5286] text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5286] text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5286] text-sm"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Address</label>
          {isEditAddress ? (
            <div className="flex items-center">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Enter your address"
              />
              <button
                onClick={toggleEditAddress}
                className="ml-3 bg-[#ffd124] px-4 py-2 rounded-lg hover:bg-[#edbd07]"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={address || "Fetching your address..."}
                disabled
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-500"
              />
              <button
                onClick={toggleEditAddress}
                className="ml-3 bg-[#ffd124] px-4 py-2 rounded-lg hover:bg-[#edbd07] transition duration-300"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#0f5286]">Payment Method</h2>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={() => setPaymentMethod("Cash on Delivery")}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="Debit/Credit Card"
              checked={paymentMethod === "Debit/Credit Card"}
              onChange={() => setPaymentMethod("Debit/Credit Card")}
              className="mr-2"
            />
            Debit/Credit Card
          </label>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
              className="mr-2"
            />
            UPI
          </label>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#0f5286]">Promo Code</h2>
        <div className="mt-4 flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter promo code"
          />
          <button
            onClick={handlePromoCodeApply}
            className="bg-[#ffd124] p-3 ml-2 rounded-lg hover:bg-[#edbd07]"
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-500 mt-2 text-sm">Discount applied: ${discount.toFixed(2)}</p>
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#0f5286]">Order Summary</h2>
        <ul className="mt-4">
          {cartItems.map((item) => (
            <li key={item.name} className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm">{item.name}</span>
              <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <span className="font-semibold text-lg">Total:</span>
          <span className="font-semibold text-lg">${(totalAmount - discount).toFixed(2)}</span>
        </div>
        <div className="mt-6">
          <button
            onClick={handlePaymentConfirmation}
            className="w-full bg-[#ffd124] py-3 rounded-lg hover:bg-[#edbd07]"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
