import React from "react";
import { useNavigate } from "react-router-dom"; // Updated import

import CarouselBanner from "./CarouselBanner";
import AboutAllMart from "./AboutAllMart";
import CategoryList from "./CategoryList";
import OffersZone from "./OffersZone";
import TopDeals from "./TopDeals";
import LatestProducts from "./LatestProducts";

const Home = ({ cartItems, setCartItems }) => {

  return (
    <div className="flex flex-col pt-20">
      <CarouselBanner />
      <TopDeals cartItems={cartItems} setCartItems={setCartItems} />
      <CategoryList/>
      <OffersZone cartItems={cartItems} setCartItems={setCartItems} />
      <LatestProducts cartItems={cartItems} setCartItems={setCartItems} />
      <AboutAllMart/> 
    </div>
  );
};

export default Home;
