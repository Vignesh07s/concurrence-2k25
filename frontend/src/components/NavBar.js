import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // Track menu state
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    const [darkMode, setDarkMode] = useState(storedDarkMode);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);  // Toggle the menu state on button click
    };

    // Initialize darkMode state from localStorage, default to false if not found
    

    useEffect(() => {
        // Set the class for dark mode on the root element (html)
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Persist the dark mode setting to localStorage whenever it changes
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]); // This effect runs every time darkMode changes

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg dark:bg-gray-800 dark:text-white">
            <nav className="container mx-auto flex justify-between items-center p-4">
                <div className="text-lg font-bold text-white">Ripple 2k25</div>

                {/* Desktop menu */}
                <ul className="hidden sm:flex space-x-6 text-lg">
                    <li className='pr-3'>
                        {/* Dark Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode}
                            className="fixed bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition z-60"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                    </li>
                    <li><a href="/" className="hover:text-gray-300 dark:hover:text-gray-400">Home</a></li>
                    <li><a href="/about" className="hover:text-gray-300 dark:hover:text-gray-400">About</a></li>
                    <li><Link to="/events" className="hover:text-gray-300 dark:hover:text-gray-400">Events</Link></li>
                    <li><Link to="/event-schedule" className="hover:text-gray-300 dark:hover:text-gray-400">Schedule</Link></li>
                    <li><Link to="/gallery" className="hover:text-gray-300 dark:hover:text-gray-400">Gallery</Link></li>
                    <li><Link to="/contact" className="hover:text-gray-300 dark:hover:text-gray-400">Contact</Link></li>
                </ul>

                {/* Hamburger icon (mobile menu button) */}
                <button
                    className="sm:hidden flex flex-col justify-center items-center space-y-1"
                    onClick={toggleMenu}  // Toggle menu on click
                >
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                    <div className="w-6 h-1 bg-white dark:bg-gray-200"></div>
                </button>
            </nav>

            {/* Mobile menu with blur effect and sidebar */}
            {isMenuOpen && (
                <>
                    {/* Background blur overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50 backdrop-blur-md z-40"
                        onClick={toggleMenu}  // Close the menu if the background is clicked
                    ></div>

                    {/* Sidebar menu */}
                    <div className="fixed top-0 right-0 w-3/5 sm:w-2/5 h-full bg-gradient-to-b from-indigo-600 via-purple-700 to-blue-800 text-white z-40 p-6 space-y-6 rounded-l-3xl shadow-xl transform transition-all duration-300 dark:bg-gradient-to-b dark:from-gray-700 dark:via-gray-800 dark:to-black">
                        <ul>
                            <li><a href="/" className="text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">Home</a></li>
                            <li><a href="/about" className="text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">About</a></li>
                            <li><a href="/events" className="text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">Events</a></li>
                            <li><a href="/register" className="text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">Register</a></li>
                            <li><a href="/contact" className="text-xl font-semibold hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">Contact</a></li>
                        </ul>
                    </div>
                </>
            )}
        </header>
    );
}
