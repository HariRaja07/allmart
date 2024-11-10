import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'; // Ensure you have react-icons installed
import logo from "../assets/allMartLogo.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { IoIosMail } from "react-icons/io";


const footer = () => {
  return (
    <footer className="bg-[#0f5286] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 border-y-4 border-[#ffd124] p-4">
        {/* Logo and Company Name */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-40 bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
              <img
                src={logo}
                alt="SM Educational Consultant"
                className="h-auto w-36"
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/services" className="hover:text-gray-300">Track Your Order</Link>
          <Link to="/team" className="hover:text-gray-300">Help & Contact Us</Link>
          <Link to="/audit" className="hover:text-gray-300">Terms & Conditions</Link>
          <Link to="/about" className="hover:text-gray-300">Return and Shipment</Link>
          <Link to="/contact" className="hover:text-gray-300">Refund Policy</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-xl font-semibold">Category</h2>
          <Link to="/" className="hover:text-gray-300">Grocery</Link>
          <Link to="/services" className="hover:text-gray-300">Dairy</Link>
          <Link to="/team" className="hover:text-gray-300">Beverages</Link>
          <Link to="/audit" className="hover:text-gray-300">Baby & Pet Care</Link>
          <Link to="/about" className="hover:text-gray-300">Bath</Link>
          <Link to="/contact" className="hover:text-gray-300">Household Items</Link>
          <Link to="/contact" className="hover:text-gray-300">Toy & Stationary</Link>
          <Link to="/contact" className="hover:text-gray-300">Fruit and Vegetables</Link>
          <Link to="/contact" className="hover:text-gray-300">Electronics</Link>
          <Link to="/contact" className="hover:text-gray-300">Footwear</Link>
        </div>

        {/* Social Media & Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-lg font-semibold">Connect with Us</h2>
          <div className='flex flex-row space-x-2'>
              <IoLocationSharp size={24} />
              <span>DOHA | QATAR</span>
          </div>
          <div className='flex flex-row space-x-2'>
              <FaSquarePhone size={24} />
              <span>+974-50585005</span>
          </div>
          <div>
          <a
              href="Administration@allmart.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 flex flex-row space-x-2"
            >
              <IoIosMail size={24} />
              <span>Administration@allmart.me</span>
            </a>
          </div>
          <div>
          <a
              href="https://www.allmart.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 flex flex-row space-x-2"
            >
              <TfiWorld size={24} />
              <span>www.allmart.me</span>
            </a>
          </div>
        </div>
      </div>
      {/* Copyright Info */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} All Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default footer;
