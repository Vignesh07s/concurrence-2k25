import React, { useState, useEffect } from 'react';
import HeroSection from "./HeroSection"
import "../index.css";
import Countdown from "./CountDown"
import Schedule from './Schedule';
import Carousel from './Carousel';
import Footer from './Footer';
import WebTeam from './WebTeam';
const messages = [
  {
    name: "Dr. M. Santhiramudu",
    designation: "Chairman, RGMCET",
    image: "/images/chairman.jpeg",
    message: "Welcome to RIPPLE 2K25! A journey of innovation and excellence.",
  },
  {
    name: "M. Siva Ram",
    designation: "Managing Director, RGMCET",
    image: "/images/MD.jpg",
    message: "Let’s come together to create, collaborate, and celebrate technology.",
  },
  {
    name: "Dr. T Jayachandra Prasad",
    designation: "Principal, RGMCET",
    image: "/images/principal.jpg",
    message: "Join us in celebrating the spirit of innovation and creativity.",
  },
  {
    name: "Dr. D.V. Ashok Kumar",
    designation: "Dean-Admin. & Director Placements",
    image: "/images/dean-admin.jpg",
    message: "RIPPLE 2K25 is the epitome of technical brilliance and teamwork.",
  },
  {
    name: "Dr. B.Rami Reddy",
    designation: "Dean - Student Affairs",
    image: "/images/dean-students.jpg",
    message: "Engage in a tech journey that inspires and challenges you.",
  },
  {
    name: "Dr. K Subba Reddy",
    designation: "HOD, CSE",
    image: "/images/HOD.jpeg",
    message: "Join us in exploring the forefront of technology and innovation.",
  },
  {
    name: "Dr. M. Sravan Kumar Reddy",
    designation: "Associate Professor, RGMCET",
    image: "/images/sravan.jpeg",
    message: "Ripple 2K25 is a celebration of technical creativity and spirit.",
  },
  {
    name: "Mr. P Naveen Sundar Kumar",
    designation: "Assistant Professor, RGMCET",
    image: "/images/naveen.jpg",
    message: "Be part of a journey that transforms ideas into reality.",
  },
];


const Home = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  // Carousel logic for messages and images: Change every 3 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000); // Set to 7 seconds for quicker transitions

    return () => {
      clearInterval(messageInterval); // Cleanup on unmount
    };
  }, []);



  return (
    <div className="min-h-screen text-white">

      <HeroSection />
      <Countdown />
      <Schedule />

      {/* Dignitary Messages */}
      <div className="w-full px-4 py-4 sm:py-8 bg-gradient-to-b from-cyan-100 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Mobile Title */}
          <div className="block md:hidden text-center">
            <p className="text-xl sm:text-2xl font-bold text-black dark:text-gray-200">Dignitary Messages</p>
          </div>

          {/* PC Title */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="font-semibold text-black dark:text-gray-200 flex-shrink-0 ml-8 text-center md:text-left">
              <p className="text-3xl sm:text-4xl lg:text-5xl">Dignitary</p>
              <p className="text-xl sm:text-2xl lg:text-3xl">Messages</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="border-r-2 border-black dark:border-gray-600 h-32 hidden md:block"></div>

          {/* Message Content */}
          <div className="flex justify-center items-stretch space-x-6 w-full fade-in">
            {/* Image Column */}
            <div className="flex-shrink-0">
              <img
                src={messages[currentMessage].image}
                alt={messages[currentMessage].name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl border-2 border-black dark:border-gray-600"
              />
            </div>

            {/* Text Column */}
            <div className="flex flex-col justify-between space-y-4 h-full">
              <p className="italic text-sm font-semibold sm:text-base md:text-lg text-blue-900 dark:text-gray-300">
                {messages[currentMessage].message}
              </p>
              <div className="flex flex-col items-end space-y-1">
                <p className="text-sm sm:text-base md:text-2xl text-indigo-500 dark:text-indigo-400">
                  {messages[currentMessage].name}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-indigo-500 dark:text-indigo-400">
                  {messages[currentMessage].designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Past Event Glimpses */}
      <div className="w-full bg-gradient-to-b from-gray-100 to-cyan-100 py-8 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center mb-8">
          <p className="text-xl sm:text-4xl lg:text-5xl font-extrabold text-red-600 font-serif dark:text-red-400">
            A glimpse of our journey so far
          </p>
        </div>
        <Carousel />
      </div>

      <WebTeam />
      <Footer />
    </div>

  );
};

export default Home;