import React from 'react';
import { FaArrowRight, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import profileImage from '../assets/profileImage.jpg';

const Advertisement = () => {
  return (
    <div className="bg-gradient-to-r from-orange-200 via-orange-300 to-red-400 text-white rounded-2xl p-8 shadow-lg max-w-5xl mx-auto my-10 flex flex-col lg:flex-row items-center justify-between gap-10 hover:shadow-black transition duration-300">

      {/* Image Area */}
      <div className="flex-1 flex items-center justify-center">
        <img 
          src={profileImage} 
          alt="Pranshu Chauhan" 
          className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
        />
      </div>

      {/* Text Area */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
          Pranshu Chauhan
        </h2>

        <p className="text-lg text-gray-900 mb-4" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          Website Designer & Developer
        </p>

        <p className="mb-4 text-sm leading-relaxed text-gray-800" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
          I create beautiful, responsive websites for gyms, fitness centers, personal trainers, shops, and any small business. 
          Let me help you bring your business online and grow your customer base!
        </p>

        {/* Contact Info */}
        <div className="flex gap-4 mb-4 text-lg justify-center lg:justify-start">
          <a href="mailto:pranshuchauhan149@gmail.com" className="hover:text-black shadow-lg shadow-black rounded-full p-2 transition"><FaEnvelope /></a>
          <a href="tel:+916388655896" className="hover:text-black shadow-lg shadow-black rounded-full p-2 transition"><FaPhoneAlt /></a>
          <a href="https://wa.me/916388655896" target="_blank" rel="noopener noreferrer" className="hover:text-black shadow-lg shadow-black rounded-full p-2 transition"><FaWhatsapp /></a>
        </div>

        <a href="https://wa.me/916388655896" target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black hover:text-white transition shadow-lg shadow-black">
            Contact Me <FaArrowRight />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Advertisement;
