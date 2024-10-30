// src/CarouselBanner.js
import React from 'react';
import { Carousel } from 'antd';

const CarouselBanner = () => {
  const banners = [
    {
      id: 1,
      image: 'https://via.placeholder.com/800x400?text=Banner+1',
      alt: 'Banner 1',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/800x400?text=Banner+2',
      alt: 'Banner 2',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/800x400?text=Banner+3',
      alt: 'Banner 3',
    },
  ];

  return (
    <div className="mb-12 w-full mx-auto rounded-xl">
      <Carousel autoplay className='rounded-xl'>
        {banners.map((img) => (
          <div key={img.id}>
            <img
              src={img.image}
              alt={img.alt}
              className="w-full h-64 object-cover rounded-xl mt-5"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
