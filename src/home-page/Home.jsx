import React from "react";
import { useNavigate } from 'react-router-dom'; // Updated import

import CarouselBanner from "./CarouselBanner";
import logo from "../assets/allMartLogo.png";
import advertise from "../assets/discount.png";


import fruitsImage from "../assets/fruits.jpg"; // Placeholder image for fruits
import vegetablesImage from "../assets/vegetables.jpg"; // Placeholder image for vegetables
import masalaImage from "../assets/masala.jpg"; // Placeholder image for packaged foods
import attaImage from "../assets/atta.png";
import babycare from "../assets/babycare.jpg";
import bath from "../assets/bath.jpg";
import biscuit from "../assets/biscuit.jpg";
import breakfast from "../assets/breakfast.jpg";
import chips from "../assets/chips.jpg";
import cleaning from "../assets/cleaning.jpg";
import coffee from "../assets/coffee.jpg";
import dairy from "../assets/dairy.jpg";
import feminine from "../assets/feminine.jpg";
import frozen from "../assets/frozen.png";
import grooming from "../assets/grooming.jpg";
import hair from "../assets/hair.jpg";
import icecream from "../assets/icecream.jpg";
import juices from "../assets/juices.jpg";
import meat from "../assets/meat.jpg";
import packaged from "../assets/packaged.jpg";
import skincare from "../assets/skincare.jpg";
import sweets from "../assets/sweets.jpg";
const categories = [
  { name: "Fruits", image: fruitsImage },
  { name: "Vegetables", image: vegetablesImage },
  { name: "Atta, Dals, Rice and oils", image: attaImage },
  { name: "Masala and Dry Fruits", image: masalaImage },
  { name: "Sweet Cravings", image: sweets },
  { name: "Frozen Foods", image: frozen },
  { name: "Ice Creams & More", image: icecream },
  { name: "Packaged Food", image: packaged },
  { name: "Dairy, Bread & Eggs", image: dairy },
  { name: "Cold Drinks & Juices", image: juices },
  { name: "Munchies", image: chips },
  { name: "Meat and Fish", image: meat },
  { name: "Breakfast & Sauces", image: breakfast },
  { name: "Tea, Coffee & More", image: coffee },
  { name: "Biscuits & Cookies", image: biscuit },
  { name: "Skincare", image: skincare },
  { name: "Bath & Body", image: bath },
  { name: "Hair Care", image: hair },
  { name: "Cleaning Essentials", image: cleaning },
  { name: "Grooming Essentials", image: grooming },
  { name: "Feminine Hygiene", image: feminine },
  { name: "Baby Care", image: babycare },
];

const Home = () => {

  const navigate = useNavigate(); // Use useNavigate

  const handleCategoryClick = (name) => {
    navigate(`/category/${name}`); // Use navigate instead of history.push
  };

  return (
    <div className="flex flex-row justify-center items-start">
      {/* Left Advertisement */}
      <div className="fixed left-0 flex flex-col mt-20 gap-10 advertisement left-ad">
        {/* Placeholder for left advertisement */}
        <img src={advertise} alt="Left Advertisement Banner" className="banner-image rounded" />
        <img src={advertise} alt="Left Advertisement Banner" className="banner-image rounded" />
      </div>

      <div className="content flex-1 container mx-auto">
        <CarouselBanner />
        <div className="flex flex-row justify-center items-center bg-gradient-to-b from-[#89CFF0] to-[#F08080] rounded">
          <h1 className="text-8xl font-semibold text-center my-6 font-[Cambria]">
            Welcome to
          </h1>
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div>
          <p className="text-3xl font-bold my-6 font-[Cambria]">Explore by Categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-4">
        {categories.map((category) => (
          <div key={category.name} className="card" onClick={() => handleCategoryClick(category.name)}>
            <img src={category.image} alt={category.name} className="category-image" />
            <h2 className="category-name">{category.name}</h2>
          </div>
        ))}
      </div>
      </div>

      {/* Right Advertisement */}
      <div className="fixed right-0 flex flex-col gap-10 mt-20 advertisement right-ad">
        {/* Placeholder for right advertisement */}
        <img src={advertise} alt="Left Advertisement Banner" className="banner-image rounded" />
        <img src={advertise} alt="Left Advertisement Banner" className="banner-image rounded" />
      </div>
    </div>
  );
};

export default Home;
