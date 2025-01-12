import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          {/* Social Handles */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
  
          {/* Contact Email */}
          <div className="mb-4">
            <p className="text-sm">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ripple2k25@rgmcet.edu.in"
                className="text-indigo-400 hover:underline"
              >
                ripple2k25@rgmcet.edu.in
              </a>
            </p>
          </div>
  
          {/* Visitor Counter */}
          <div className="mb-4">
            <p className="text-sm font-semibold">Visitor Count:</p>
            <Link to="https://www.hitwebcounter.com" target="_blank">
              <img
                src="https://hitwebcounter.com/counter/counter.php?page=18404702&style=0006&nbdigits=5&type=page&initCount=0"
                title="Counter Widget"
                alt="Visit counter for websites"
                border="0"
                className="mt-2 mx-auto"
              />
            </Link>
          </div>
  
          {/* Copyright */}
          <div className="mt-4">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} RIPPLE 2K25. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  