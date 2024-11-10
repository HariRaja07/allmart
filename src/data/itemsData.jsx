import riceImage from "../assets/items/rice.jpg";
import pastaImage from "../assets/items/pasta.jpg";
import oliveOilImage from "../assets/items/olive.jpg";
import orangeJuiceImage from "../assets/items/tropicana.jpg";
import coffeeImage from "../assets/items/coffee.jpg";
import greenTeaImage from "../assets/items/greenTea.jpg";
import diapersImage from "../assets/items/diapers.jpg";
import babyLotionImage from "../assets/items/babyLotion.jpg";
import babyWipesImage from "../assets/items/babyWipes.jpg";
import catFoodImage from "../assets/items/catFood.jpg";
import dogLeashImage from "../assets/items/dogLeash.jpg";
import birdCageImage from "../assets/items/birdCage.jpg";
import shampooImage from "../assets/items/shampoo.jpg";
import conditionerImage from "../assets/items/conditioner.jpg";
import bodyWashImage from "../assets/items/bodyWash.jpg";
import dishSoapImage from "../assets/items/dishSoap.jpg";
import trashBagsImage from "../assets/items/trashBags.jpg";
import toiletPaperImage from "../assets/items/toiletPaper.jpg";
import milkImage from "../assets/items/milk.jpg";
import cheeseImage from "../assets/items/cheese.jpg";
import butterImage from "../assets/items/butter.jpg";
import toyCarImage from "../assets/items/toyCar.jpg";
import pencilsImage from "../assets/items/pencils.jpg";
import notebooksImage from "../assets/items/notebooks.jpg";
import smartphoneImage from "../assets/items/smartphone.jpg";
import laptopImage from "../assets/items/laptop.jpg";
import headphonesImage from "../assets/items/headphone.jpg";
import appleImage from "../assets/items/apple.jpg";
import bananaImage from "../assets/items/banana.jpg";
import carrotImage from "../assets/items/carrot.jpg";
import coffeeMakerImage from "../assets/items/coffeeMaker.jpg";
import blenderImage from "../assets/items/blender.jpg";
import microwaveImage from "../assets/items/microwave.jpg";
import phoneCaseImage from "../assets/items/phoneCase.jpg";
import laptopChargerImage from "../assets/items/laptopCharger.jpg";
import powerBankImage from "../assets/items/powerBank.jpg";
import runningShoesImage from "../assets/items/runningShoes.jpg";
import sandalsImage from "../assets/items/sandals.jpg";
import bootsImage from "../assets/items/boots.jpg";
import chipsImage from "../assets/items/chips.jpg";
import cookiesImage from "../assets/items/cookies.jpg";
import candyImage from "../assets/items/candy.jpg";
import noodlesImage from "../assets/items/noodles.jpg";
import frozenPizzaImage from "../assets/items/frozenPizza.jpg";
import microwaveMealsImage from "../assets/items/microwaveMeals.jpg";

export const items = {
  Grocery: [
    { name: 'Rice', image: riceImage, price: 2.5, quantity: 0, description: 'A staple food grain, perfect for various dishes.' },
    { name: 'Pasta', image: pastaImage, price: 1.2, quantity: 0, description: 'Delicious Italian pasta for all your favorite sauces.' },
    { name: 'Olive Oil', image: oliveOilImage, price: 4.0, quantity: 0, description: 'High-quality olive oil for cooking and salads.' }
  ],
  Beverages: [
    { name: 'Orange Juice', image: orangeJuiceImage, price: 3.0, quantity: 0, description: 'Freshly squeezed orange juice for a refreshing start to your day.' },
    { name: 'Coffee', image: coffeeImage, price: 5.0, quantity: 0, description: 'Rich and aromatic coffee for your morning boost.' },
    { name: 'Green Tea', image: greenTeaImage, price: 2.5, quantity: 0, description: 'A healthy, antioxidant-packed green tea to refresh you.' }
  ],
  BabyCare: [
    { name: 'Diapers', image: diapersImage, price: 10.0, quantity: 0, description: 'Soft and comfortable diapers for your little one.' },
    { name: 'Baby Lotion', image: babyLotionImage, price: 3.5, quantity: 0, description: 'Gentle lotion to keep your baby’s skin soft and smooth.' },
    { name: 'Baby Wipes', image: babyWipesImage, price: 2.0, quantity: 0, description: 'Convenient wipes for quick and easy cleaning.' }
  ],
  PetCare: [
    { name: 'Cat Food', image: catFoodImage, price: 5.5, quantity: 0, description: 'Nutritious food to keep your cat healthy and happy.' },
    { name: 'Dog Leash', image: dogLeashImage, price: 8.0, quantity: 0, description: 'Durable leash for your daily walks with your dog.' },
    { name: 'Bird Cage', image: birdCageImage, price: 20.0, quantity: 0, description: 'A spacious and comfortable cage for your pet birds.' }
  ],
  BathAndBody: [
    { name: 'Shampoo', image: shampooImage, price: 3.5, quantity: 0, description: 'Nourishing shampoo for soft, shiny hair.' },
    { name: 'Conditioner', image: conditionerImage, price: 4.0, quantity: 0, description: 'Moisturizing conditioner to hydrate and strengthen your hair.' },
    { name: 'Body Wash', image: bodyWashImage, price: 2.0, quantity: 0, description: 'Refreshing body wash for a clean and invigorated feel.' }
  ],
  HouseholdItems: [
    { name: 'Dish Soap', image: dishSoapImage, price: 1.5, quantity: 0, description: 'Cleans dishes with ease, leaving them sparkling clean.' },
    { name: 'Trash Bags', image: trashBagsImage, price: 2.0, quantity: 0, description: 'Sturdy bags for all your household waste needs.' },
    { name: 'Toilet Paper', image: toiletPaperImage, price: 3.0, quantity: 0, description: 'Soft and durable toilet paper for daily use.' }
  ],
  Dairy: [
    { name: 'Milk', image: milkImage, price: 1.2, quantity: 0, description: 'Fresh milk for your tea, coffee, and baking needs.' },
    { name: 'Cheese', image: cheeseImage, price: 3.5, quantity: 0, description: 'A variety of cheeses to add flavor to your dishes.' },
    { name: 'Butter', image: butterImage, price: 2.5, quantity: 0, description: 'Creamy butter to spread on your bread or use in cooking.' }
  ],
  ToyAndStationary: [
    { name: 'Toy Car', image: toyCarImage, price: 7.0, quantity: 0, description: 'A fun, colorful toy car for kids to enjoy.' },
    { name: 'Pencils', image: pencilsImage, price: 1.0, quantity: 0, description: 'Wooden pencils for school or office use.' },
    { name: 'Notebooks', image: notebooksImage, price: 2.5, quantity: 0, description: 'Spiral-bound notebooks for jotting down your notes.' }
  ],
  Electronics: [
    { name: 'Smartphone', image: smartphoneImage, price: 299.0, quantity: 0, description: 'Latest smartphone with high-performance specs.' },
    { name: 'Laptop', image: laptopImage, price: 599.0, quantity: 0, description: 'Powerful laptop for work, play, and everything in between.' },
    { name: 'Headphones', image: headphonesImage, price: 89.0, quantity: 0, description: 'Noise-cancelling headphones for an immersive audio experience.' }
  ],
  FruitsAndVegetables: [
    { name: 'Apple', image: appleImage, price: 1.0, quantity: 0, description: 'Crisp and sweet apples, a healthy snack option.' },
    { name: 'Banana', image: bananaImage, price: 0.5, quantity: 0, description: 'Ripe and delicious bananas, perfect for breakfast.' },
    { name: 'Carrot', image: carrotImage, price: 0.8, quantity: 0, description: 'Fresh carrots, great for salads or snacking.' }
  ],
  HomeAndKitchen: [
    { name: 'Coffee Maker', image: coffeeMakerImage, price: 49.0, quantity: 0, description: 'Brew your perfect cup of coffee with this easy-to-use machine.' },
    { name: 'Blender', image: blenderImage, price: 35.0, quantity: 0, description: 'Powerful blender for smoothies, soups, and more.' },
    { name: 'Microwave', image: microwaveImage, price: 100.0, quantity: 0, description: 'Compact microwave to quickly heat up your meals.' }
  ],
  ElectronicAccessories: [
    { name: 'Phone Case', image: phoneCaseImage, price: 10.0, quantity: 0, description: 'Protect your smartphone with this durable phone case.' },
    { name: 'Laptop Charger', image: laptopChargerImage, price: 25.0, quantity: 0, description: 'Reliable charger to keep your laptop powered up.' },
    { name: 'Power Bank', image: powerBankImage, price: 30.0, quantity: 0, description: 'Portable power bank to charge your devices on the go.' }
  ],
  Footwear: [
    { name: 'Running Shoes', image: runningShoesImage, price: 50.0, quantity: 0, description: 'Comfortable running shoes for your workouts.' },
    { name: 'Sandals', image: sandalsImage, price: 25.0, quantity: 0, description: 'Stylish sandals for casual wear in warmer months.' },
    { name: 'Boots', image: bootsImage, price: 80.0, quantity: 0, description: 'Durable boots for outdoor adventures or winter weather.' }
  ],
  FoodAndSnacks: [
    { name: 'Chips', image: chipsImage, price: 1.5, quantity: 0, description: 'Crispy chips, perfect for snacking anytime.' },
    { name: 'Cookies', image: cookiesImage, price: 2.0, quantity: 0, description: 'Soft, delicious cookies for a sweet treat.' },
    { name: 'Candy', image: candyImage, price: 0.8, quantity: 0, description: 'Colorful candy for a quick sugar rush.' }
  ],
  ReadyToEat: [
    { name: 'Instant Noodles', image: noodlesImage, price: 1.0, quantity: 0, description: 'Quick and easy instant noodles for a fast meal.' },
    { name: 'Frozen Pizza', image: frozenPizzaImage, price: 4.5, quantity: 0, description: 'Frozen pizza for a delicious, hassle-free meal.' },
    { name: 'Microwave Meals', image: microwaveMealsImage, price: 3.0, quantity: 0, description: 'Ready-to-heat meals, perfect for busy days.' }
  ],

  // src/data/itemsData.js
    // src/data/itemsData.js
    topDeals: [
      {
        name: 'Blender',
        price: 99.99,
        image: blenderImage,
        discount: 20, // Discount percentage
      },
      {
        name: 'Microwave',
        price: 49.99,
        image: microwaveImage,
        discount: 10, // Discount percentage
      },
      // Add more top deals here
    ],
    offersZone: [
      {
        name: 'Coffee Maker',
        price: 29.99,
        image: coffeeMakerImage,
        discount: 15, // Discount percentage
      },
      {
        name: 'Iphone',
        price: 19.99,
        image: smartphoneImage,
        discount: 30, // Discount percentage
      },
      // Add more offers here
    ],
  
    // Other categories like electronics, clothing, etc.
  
};