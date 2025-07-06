import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ba701a33] text-black py-8 mt-10 shadow-inner rounded-t-2xl">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-6">

        {/* Left: Gym Name */}
        <div className="text-center lg:text-left space-y-2">
          <h3 className="bg-[#e8b37733] border-none outline-none text-black px-5 py-3 rounded-xl inline-block hover:bg-black hover:text-white transition shadow-sm shadow-black font-extrabold">
            FitZone Gym
          </h3>
          <p className="text-sm text-gray-700">Transform Your Body, Transform Your Life</p>
        </div>

        {/* Middle: Quick Links */}
        <div className="text-center">
          <ul className="flex flex-wrap gap-4 text-sm font-medium">
            <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">About</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Membership</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-4 text-lg justify-center lg:justify-end">
          <a href="#" className="hover:text-orange-500 transition-colors duration-200 shadow-lg shadow-black rounded-full p-2 "><FaFacebookF /></a>
          <a href="#" className="hover:text-orange-500 transition-colors duration-200 shadow-lg shadow-black rounded-full p-2 "><FaInstagram /></a>
          <a href="#" className="hover:text-orange-500 transition-colors duration-200 shadow-lg shadow-black rounded-full p-2 "><FaWhatsapp /></a>
        </div>

      </div>

      <p className="text-xs text-gray-600 text-center mt-6">© {new Date().getFullYear()} FitZone Gym. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
