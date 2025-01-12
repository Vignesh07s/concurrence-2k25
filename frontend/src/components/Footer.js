import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col items-center space-y-8">

        {/* Developed by Section */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Developed by CSE Web Team
          </h2>
          <p className="text-xl font-medium text-gray-300">RGMCET - CSE DEPARTMENT</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-8 text-2xl justify-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-transform duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-transform duration-300"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-transform duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-transform duration-300"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Footer Bottom - Contact & Visitor Counter */}
        <div className="text-center space-y-4">
          <p className="text-lg font-medium text-gray-300">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:ripple2k25@rgmcet.edu.in"
              className="text-indigo-400 hover:text-white transition duration-300"
            >
              ripple2k25@rgmcet.edu.in
            </a>
          </p>

          {/* Visitor Counter */}
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-300">Visitor Count:</p>
            <Link to="https://www.hitwebcounter.com" target="_blank">
              <img
                src="https://hitwebcounter.com/counter/counter.php?page=18404702&style=0006&nbdigits=5&type=page&initCount=0"
                title="Visit counter"
                alt="Visit counter"
                border="0"
                className="mx-auto mt-2"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} RIPPLE 2K25. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
