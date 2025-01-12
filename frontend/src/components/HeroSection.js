import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <header className="relative bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/images/CSE.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-10">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-400 brightness-110 contrast-125">
          RIPPLE 2K25
        </h1>
        {/* Subtitle */}
        <p className="mt-4 text-lg sm:text-2xl lg:text-3xl italic">
          "Ignite Innovation, Embrace the Future"
        </p>
        {/* Description */}
        <p className="mt-4 sm:mt-6 max-w-xl lg:max-w-2xl mx-auto text-sm sm:text-lg lg:text-xl">
          A premier technical extravaganza by RGMCET.
        </p>
        <p className="mt-4 sm:mt-6 max-w-xl lg:max-w-2xl mx-auto text-sm sm:text-lg lg:text-xl">
          Join us to experience cutting-edge technology, innovation, and inspiration like never before.
        </p>
        {/* Call to Action */}
        <div className="mt-6 sm:mt-8">
          <Link
            to="/events"
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
