import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { categories } from "./data/categoriesData";

const AllCategory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top of the page
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.replace(/\s+/g, '')}`);
  };

  return (
    <div className="p-6 bg-[#F5F5F5] flex flex-col mx-auto p-2 container space-y-2 mt-40">
      <p className="text-2xl border-b font-bold text-[#0f5286] font-[Roboto]">
        Browse All Category
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white shadow-lg overflow-hidden text-center transition-transform duration-200 hover:scale-110 border border-[#9c7b02]"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-between p-2 space-x-4">
                <div className="flex flex-col space-y-4 text-justify">
                  <h2 className="text-2xl font-semibold text-[#0f5286]">
                    {category.name}
                  </h2>
                  <p className="text-base text-[#0f5286]">
                    {category.description}
                  </p>
                </div>

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-28 w-28"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
