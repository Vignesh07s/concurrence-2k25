import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Contact Icons */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="mailto:concurrence.cseripple@rgmcet.edu.in"
            className="hover:text-indigo-400 transition duration-300"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/concurrence_2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* RGMCET Branding */}
        <p className="font-semibold text-gray-200">
          <a href="https://www.rgmcet.edu.in/" target="_blank" rel="noreferrer">RGMCET</a>
           - 
          <a href="https://www.rgmcet.edu.in/department-of-cse" target="_blank" rel="noreferrer">CSE Department</a>
        </p>

        {/* Copyright Message */}
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} RIPPLE 2K25. All rights reserved.
        </p>

        
      </div>
    </footer>
  );
};

export default Footer;
