// src/components/TopDeals.jsx
import React from 'react';
import { items } from '../data/itemsData'; // Assuming you have a data file that holds items

const TopDeals = () => {
  const topDeals = items.topDeals || [];

  return (
    <div className='flex flex-col p-4'>
        <div className="container mx-auto bg-[#d4eafa] rounded-lg">
      <h2 className="inline-block text-3xl font-bold text-[#ffd124] border-2 border-[#ffd124] bg-[#0f5286] p-2 font-[roboto] mb-6 rounded-full">Top Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topDeals.map(item => {
          const discountedPrice = item.price - (item.price * (item.discount / 100));

          return (
            <div key={item.name} className="border w-3/4 p-4 rounded-md shadow-lg bg-white">
                <p className='absolute text-white font-semibold p-1 bg-[#e81e25] rounded'>{item.discount}% OFF</p>
              <img src={item.image} alt={item.name} className="w-full h-44 object-scale-down rounded-md border border-[#9c7b02] py-1" />
              <h3 className="text-lg text-[#0f5286]">{item.name}</h3>
              <div className="flex justify-center items-center space-x-2">
              <p className="text-xl font-semibold text-red-600">${discountedPrice.toFixed(2)}</p>
                <p className="text-base line-through mr-4">${item.price.toFixed(2)}</p>
              </div>
              
              <button
                className="w-full bg-[#ffd124] py-2 mt-4 rounded-md hover:bg-yellow-600"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
    
  );
};

export default TopDeals;
