import React, { useState, useEffect } from 'react';
import HeroSection from "./HeroSection"
import "../index.css";
import Countdown from "./CountDown"
import HomeSchedule from './HomeSchedule';
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

// Sample images for gallery (replace these with actual event images later)
const galleryImages = [
  '/images/event1.jpg',
  '/images/event2.jpg',
  '/images/event3.jpg',
  '/images/event4.jpg',
  '/images/event5.jpg',
];

const Home = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Carousel logic for messages and images: Change every 3 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 7000); // Set to 7 seconds for quicker transitions

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 3000); // Set to 3 seconds for image transitions

    return () => {
      clearInterval(messageInterval); // Cleanup on unmount
      clearInterval(imageInterval); // Cleanup on unmount
    };
  }, []);

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
      
      <HeroSection />
      <Countdown />
      <HomeSchedule/>

     {/* Dignitary Messages */}
     <div className="w-full px-4 py-8">
        <div className="border-t-2 border-b-2 border-gray-400 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Section Name on the Right */}
            <div className="font-semibold text-white flex-shrink-0 ml-8 text-center md:text-left hidden md:block">
              <p className="text-4xl md:text-5xl">Dignitary</p>
              <p className="text-2xl md:text-3xl">Messages</p>
            </div>

            {/* Vertical Line */}
            <div className="border-r-2 border-white h-32 hidden md:block"></div>

            {/* Message Content in the Center */}
            {/* <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-6 w-full"> */}
            <div className="flex justify-center items-stretch space-x-6 w-full">
              {/* Image Column */}
              <div className="flex-shrink-0">
                <img
                  src={messages[currentMessage].image}
                  alt={messages[currentMessage].name}
                  className="w-32 h-36 md:w-32 md:h-32 rounded-xl border-4 border-white"
                />
              </div>

              {/* Message Column with Animation */}
              <div className="flex flex-col justify-between space-y-4 h-full">
                <p className="italic text-base md:text-lg text-gray-200">{messages[currentMessage].message}</p>
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-base md:text-2xl font-semibold text-white">{messages[currentMessage].name}</p>
                  <p className="text-sm md:text-base text-gray-300">{messages[currentMessage].designation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Past Event Glimpses */}
      <div className="w-full  bg-customWhite pb-4">
        <div className="text-center mb-8">
          <p className="text-4xl font-extrabold text-red-600 font-serif">Past Events</p>
          <p className="text-xl text-black">A glimpse of our journey so far</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={galleryImages[currentImage]}
              alt={`event-${currentImage + 1}`}
              className="w-[34em] h-[22.75em] object-cover mx-auto" // Fixed width and height in em
            />
          </div>
        </div>
      </div>
      

      <br></br>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>© 2025 RIPPLE 2K25. Built by the CSE Department Web Team.</p>
      </footer>
    </div>
  );
};

export default Home;
