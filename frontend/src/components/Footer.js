import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-white py-16 border-t-4 border-indigo-600">
      <div className="container mx-auto px-8 flex flex-col items-center space-y-12">

        {/* Footer Top - RGMCET Info & Contact */}
        <div className="flex justify-between items-center w-full space-x-12 text-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-4xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              RGMCET | CSE Department
            </h2>
            <p className="text-sm font-medium text-gray-200">Web Development Team - RIPPLE 2K25</p>
            <p className="text-sm font-medium text-gray-200">Visit us at: <strong>www.rgmcet.edu.in</strong></p>
          </div>

          {/* Contact and Quick Links */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ripple2k25@rgmcet.edu.in"
                className="text-indigo-300 hover:text-indigo-100 transition duration-300"
              >
                concurrence.cseripple@rgmcet.edu.in
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+919876543210"
                className="text-indigo-300 hover:text-indigo-100 transition duration-300"
              >
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-8 text-3xl justify-center">
          <a
            href="https://www.facebook.com/ripple2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/ripple2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/ripple2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/ripple2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/ripple2k25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Footer Bottom - Quick Links */}
        <div className="flex justify-center space-x-12 text-sm text-gray-200">
          <a href="#about" className="hover:text-indigo-400 transition duration-300">About Us</a>
          <a href="#events" className="hover:text-indigo-400 transition duration-300">Events</a>
          <a href="#team" className="hover:text-indigo-400 transition duration-300">Our Team</a>
          <a href="#contact" className="hover:text-indigo-400 transition duration-300">Contact</a>
        </div>

        {/* RGMCET Footer Branding */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Proudly Organized by</h3>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src="/images/rgmcet-logo.png" alt="RGMCET Logo" className="w-16 h-16" />
              <span className="font-bold text-white text-lg">RGMCET</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/images/cse-logo.png" alt="CSE Logo" className="w-16 h-16" />
              <span className="font-bold text-white text-lg">CSE Department</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright */}
        <div className="text-center mt-8 text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} RIPPLE 2K25. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
