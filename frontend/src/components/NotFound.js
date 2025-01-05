import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl w-4/5 sm:w-1/3">
                <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-300">404</h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 my-4">Oops! The page you're looking for doesn't exist.</p>
                <Link 
                    to="/" 
                    className="text-lg text-blue-500 hover:underline mt-4 block dark:text-blue-400"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}
