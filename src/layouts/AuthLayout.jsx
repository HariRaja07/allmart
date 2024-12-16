import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // To render nested routes
import logo from "../assets/allMartLogo.png";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // This will be called when the images are fully loaded
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div>
      <div className="auth-content mx-auto min-h-screen flex">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex justify-center items-center p-8">
            <div className="flex flex-col justify-center w-1/2 h-fit p-4 rounded-2xl shadow-lg">
              <Outlet /> {/* This renders the child route's component */}
            </div>
          </div>
          <div className="bg-[#f45959]/40 h-full w-full">
            <div className="flex flex-col justify-center p-10 h-1/2">
              <img
                src={logo}
                alt="Logo"
                className={`h-40 object-scale-down object-left transition-opacity duration-500 ${
                  imagesLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad} // Trigger when the logo image is loaded
              />
              <span className="font-bold tracking-tight text-[#b70c0c] text-4xl text-left px-4 w-2/3">
                Your one-stop shop for everything you need, delivered right to your doorstep!
              </span>
            </div>
            <div className="flex flex-col justify-center p-10 h-1/2">
              <img
                src={authImage}
                alt="Logo"
                className={`h-96 object-scale-down object-left-bottom transition-opacity duration-500 ${
                  imagesLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad} // Trigger when the auth image is loaded
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
