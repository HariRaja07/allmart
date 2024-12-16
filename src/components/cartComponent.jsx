import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { BsCartXFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const cartComponent = ({ cartItems, setCartItems }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const [isCartPanelVisible, setIsCartPanelVisible] = useState(false);
  const updateQuantity = (itemName, newQuantity) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity = newQuantity;
      if (updatedCart[itemIndex].quantity <= 0) {
        updatedCart.splice(itemIndex, 1); // Remove item if quantity is 0
      }
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.discountedPrice ? item.discountedPrice : item.sellingprice) *
        item.quantity,
    0
  );
  return (
    <div>
      <div>
        <button
          className="relative flex flex-col items-center text-[#0f5286] hover:text-[#3b8ccb]  "
          onClick={() => setIsCartPanelVisible(!isCartPanelVisible)}
        >
          <FaShoppingCart className="w-7 h-7" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-[#ffd124] text-xs rounded-full w-4 h-4 flex items-center justify-center border-solid border border-[#9c7b02]">
              {totalItems}
            </span>
          )}
          <span className=" text-sm font-[Roboto] font-semibold ">Cart</span>
        </button>
      </div>

      <div
        className={`fixed z-50 top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
          isCartPanelVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end px-2 mt-2">
          <button
            onClick={() => setIsCartPanelVisible(false)}
            className="bg-gray-300 text-gray-800 rounded-lg"
          >
            <IoIosClose className="h-7 w-7" />
          </button>
        </div>
        <div className="px-4 py-1">
          <h2 className="font-bold text-2xl mb-4 text-[#0f5286]">Cart</h2>
          {cartItems.length === 0 ? (
            <div className="flex flex-col space-y-2 items-center">
              <BsCartXFill className="w-8 h-8 text-[#e81e25]" />
              <p className="font-semibold text-xl">Sorry,Your cart is empty!</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <ul>
                {cartItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center py-4 border-b border-gray-200 p-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-lg font-semibold">{item.name}</span>
                      <div className="text-sm text-gray-600">
                        <span>
                          Price: $
                          {item.discountedPrice
                            ? item.discountedPrice.toFixed(2)
                            : item.sellingprice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded-md mr-2"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded-md ml-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="text-lg font-bold">
                      $
                      {(item.discountedPrice
                        ? item.discountedPrice
                        : item.sellingprice * item.quantity
                      ).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="ml-2 text-[#e81e25]"
                    >
                      <ImBin className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <span className="font-bold text-xl text-[#0f5286]">Total:</span>
                <span className="font-semibold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                navigate("/confirmation");
                setIsCartPanelVisible(false);
                setCartItems([]);
              }}
              className={`px-4 py-2 rounded-lg flex flex-row justify-between items-center w-full ${
                cartItems.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#ffd124] hover:bg-[#edbd07]"
              }`}
              disabled={cartItems.length === 0}
            >
              <span className="bg-[#9c7b02] text-white rounded-full px-3 py-1">
                {totalItems}
              </span>
              <span className="text-[#0f5286] font-bold text-lg">Checkout</span>
              <span className="bg-[#9c7b02] text-white rounded-full px-2">
                ${totalAmount.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cartComponent;
