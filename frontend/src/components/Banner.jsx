import React from 'react';
import banner3 from '../assets/banner_black.png';
import banner4 from '../assets/banner2_black.png';

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mt-4 bg-[#ba701a33] rounded-2xl shadow-lg shadow-gray-400 py-6 h-auto w-full">
      
      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 pl-4 lg:pl-16">
        <h1 className="text-2xl lg:text-4xl font-bold text-black">
          Welcome to the Gym Management Dashboard
        </h1>
        <p className="text-sm text-gray-600 lg:text-base">
          Manage Members, Trainers, Payments, and More—All in One Place.
        </p>
      </div>

      {/* Image Section — No Padding, Touching Border */}
      <div className="w-full lg:w-1/2 flex justify-end items-center mt-6 lg:mt-0">
        <div className="flex h-full gap-2">
          <img 
            src={banner4} 
            className="w-[150px] lg:w-[300px] rounded-lg object-contain" 
            alt="Gym Banner 1" 
          />
          <img 
            src={banner3} 
            className="w-[150px] lg:w-[300px] rounded-lg object-contain" 
            alt="Gym Banner 2" 
          />
        </div>
      </div>

    </div>
  );
};

export default Banner;
