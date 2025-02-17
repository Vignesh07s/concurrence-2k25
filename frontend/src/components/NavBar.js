import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    const [darkMode, setDarkMode] = useState(storedDarkMode);

    const updates = [
        "Registrations are closed for all events except hackathon",
        "Spot registrations are available for some events",
        "Contact event coordinators regarding accommodation",
        "Download the schedule from the schedule page",
        ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg dark:bg-gray-800 dark:text-white">
            <nav className="container mx-auto flex justify-between items-center px-4 py-2">
                <div className="flex items-center space-x-2">
                    <Link to="/">
                        <img
                            src="https://res.cloudinary.com/dvlqrld7w/image/upload/v1736579186/rhlwstkp8wvq55psgknu.png"
                            alt="Ripple 2K25 Logo"
                            className="h-10 w-10 object-contain rounded-full shadow-lg hover:shadow-xl transition duration-300"
                        />
                    </Link>
                    <span className="text-xl font-bold text-white dark:text-gray-200">
                        RIPPLE 2K25
                    </span>
                </div>


                {/* Desktop menu */}
                <ul className="hidden sm:flex space-x-6 text-lg">
                    <li className="pr-3">
                        <button
                            onClick={toggleDarkMode}
                            className="fixed bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition z-60"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                    </li>
                    <li><Link to="/dashboard" className="hover:text-gray-300 dark:hover:text-gray-400">Dashboard</Link></li>
                    <li><Link to="/" className="hover:text-gray-300 dark:hover:text-gray-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-gray-300 dark:hover:text-gray-400">About</Link></li>
                    <li><Link to="/events" className="hover:text-gray-300 dark:hover:text-gray-400">Events</Link></li>
                    <li><Link to="/schedule" className="hover:text-gray-300 dark:hover:text-gray-400">Schedule</Link></li>
                    <li><Link to="/gallery" className="hover:text-gray-300 dark:hover:text-gray-400">Gallery</Link></li>
                    <li><Link to="/contact" className="hover:text-gray-300 dark:hover:text-gray-400">Contact</Link></li>
                </ul>

                {/* Hamburger icon */}
                <button
                    className="sm:hidden flex flex-col justify-center items-center space-y-1"
                    onClick={toggleMenu}
                >
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                </button>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-50 backdrop-blur-md z-40"
                        onClick={toggleMenu}
                    ></div>
                    <div className="fixed top-0 right-0 w-3/5 sm:w-2/5 bg-blue-600 text-white z-50 shadow-xl transform transition-transform duration-300 dark:bg-gray-800 h-full">
                        <button
                            className="text-white text-2xl font-bold w-full text-right p-3"
                            onClick={toggleMenu}
                            aria-label="Close Menu"
                        >
                            ✖️
                        </button>

                        {/* Navigation Links */}

                        <ul className="space-y-4">
                            <li>
                                <Link
                                    to="/"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    About
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Events
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/schedule"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Schedule
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Gallery
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Contact
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="block text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 pl-3"
                                    onClick={toggleMenu}
                                >
                                    Dashboard
                                </Link>
                                <hr className="my-2 border-gray-400 dark:border-gray-600" />
                            </li>
                        </ul>


                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition p-3 ml-3"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                    </div>



                </>
            )}
            

            <Marquee className="text-yellow-400 dark:text-yellow-300 bg-blue-900 font-bold" pauseOnHover={true} speed={120}>
                {updates.map((update, index) => (
                    <span key={index} className="mx-6">
                        {update}
                    </span>
                ))}
            </Marquee>

        </header>

    );
}
