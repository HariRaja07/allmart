// src/CategoryPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import appleImage from "./assets/apple.jpg"
import bananaImage from "./assets/banana.jpg"
import mangoImage from "./assets/mango.jpg"
import strawberryImage from "./assets/strawberry.jpg"

import carrotImage from "./assets/carrot.jpg"
import tomatoImage from "./assets/tomato.jpg"
import onionImage from "./assets/onion.jpg"
import beansImage from "./assets/beans.jpg"


const items = {
  Fruits: [
    { name: 'Apple', image: appleImage , price: 1, quantity: 0 },
    { name: 'Banana', image: bananaImage , price: 1, quantity: 0 },
    { name: 'Mango', image: mangoImage , price: 1, quantity: 0 },
    { name: 'Strawberry', image: strawberryImage , price: 1, quantity: 0 },
    // ... other fruit items
  ],
  Vegetables: [
    { name: 'Carrot', image: carrotImage, price: 0.5, quantity: 0 },
    { name: 'Tomato', image: tomatoImage, price: 0.5, quantity: 0 },
    { name: 'Onion', image: onionImage, price: 0.5, quantity: 0 },
    { name: 'Green Fresh Beans', image: beansImage, price: 0.5, quantity: 0 },
    // ... other vegetable items
  ],
  // ... add other categories with items
};

const CategoryPage = ({ cartItems, setCartItems }) => {
  const { name } = useParams();
  const [itemList, setItemList] = useState(items[name] || []);

  const addToCart = (item) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
    }
    setCartItems(updatedItems);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {itemList.map(item => (
        <div key={item.name} className="border p-4 rounded-xl shadow-lg">
          <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl" />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>Price: ${item.price.toFixed(2)}</p>
          <button onClick={() => addToCart(item)} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
