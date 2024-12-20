import React, {useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const backendUrl = "https://allmart-ecom-server.onrender.com";
import grocery from "../assets/grocery.png";
import electronics from "../assets/electronics.png";
import beverages from "../assets/beverages.png";
import kitchen from "../assets/kitchen.png";
import toy from "../assets/toy.png";
import footwear from "../assets/footwear.png";
import bath from "../assets/bath.png";
import pet from "../assets/pet.png";

const categories = [
  { name: "Grocery", image: grocery },
  { name: "Beverages", image: beverages },
  { name: "Bath And Body", image: bath },
  { name: "Pet Care", image: pet },
  { name: "Home And Kitchen", image: kitchen },
  { name: "Electronics", image: electronics },
  { name: "Toy And Stationary", image: toy },
  { name: "Footwear", image: footwear },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const [homeCategories, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const categoryResponse = await axios.get(`${backendUrl}/api/v1/homeCategory`);
          // Now extract the categories array from the response data
          setCategory(categoryResponse.data.data.homeCategories);
      } catch (error) {
          console.error('Error fetching categories:', error);
          setCategory([]); // Fallback to empty array in case of an error
      }
  };

    fetchData();
  }, []);

  // Scroll to top when the component mounts or when "See All Categories" is clicked
  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top of the page
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="p-6 bg-[#F5F5F5] flex flex-col space-y-2">
      <div className="flex flex-row mx-auto p-2 container justify-between">
        <p className="text-2xl font-bold text-[#0f5286] font-[Roboto]">Get it all right here </p>
        <Link 
          to="/all-category" 
          className="font-semibold text-base text-[#e81e25] hover:text-[#0f5286] no-underline hover:underline"
        >
          See All Categories
        </Link>
      </div>
      <div className="flex flex-row min-w-6xl mx-auto container justify-start gap-8">
        {homeCategories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center bg-transparent p-4 hover:shadow-xl transform transition-all duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category.category?.name)}
          >
            <div className="relative mb-4 flex items-center justify-center">
              {/* Background Circle */}
              <div className="absolute bg-gradient-to-r from-[#e81e25] via-[#ffd124] to-[#0f5286] opacity-50 rounded-full h-28 w-28"></div>

              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-32 w-32 object-scale-down z-10"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#0f5286] font-[Roboto]">{category.category?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
