import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [eventLive, setEventLive] = useState(false)

  useEffect(() => {
    const targetDate = new Date("2025-02-18T10:45:05+05:30");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setEventLive(true);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className="py-12 relative text-white min-h-[300px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/counterbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="container relative z-10 mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center">
        
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-5xl font-extrabold text-yellow-400">
          {eventLive ? "Event is live now!" : "Countdown to the Big Tech Event"}<span className="hidden sm:inline"> 🚀</span>
          </h2>
        </div>

        {/* Countdown Timer Section */}
        <div className="flex gap-3 sm:gap-6 mt-6 md:mt-0 flex-wrap justify-center">
          
          <div className="text-center bg-blue-800 p-3 rounded-lg shadow-lg w-16 sm:w-24 md:w-28">
            <span className="block text-3xl sm:text-5xl font-bold text-yellow-400">
              {timeLeft.days}
            </span>
            <span className="block text-xs sm:text-lg text-yellow-300 font-bold">
              Days
            </span>
          </div>
          <div className="text-center bg-blue-800 p-3 rounded-lg shadow-lg w-16 sm:w-24 md:w-28">
            <span className="block text-3xl sm:text-5xl font-bold text-yellow-400">
              {timeLeft.hours}
            </span>
            <span className="block text-xs sm:text-lg text-yellow-300 font-bold">
              Hours
            </span>
          </div>
          <div className="text-center bg-blue-800 p-3 rounded-lg shadow-lg w-16 sm:w-24 md:w-28">
            <span className="block text-3xl sm:text-5xl font-bold text-yellow-400">
              {timeLeft.minutes}
            </span>
            <span className="block text-xs sm:text-lg text-yellow-300 font-bold">
              Minutes
            </span>
          </div>
          <div className="text-center bg-blue-800 p-3 rounded-lg shadow-lg w-16 sm:w-24 md:w-28">
            <span className="block text-3xl sm:text-5xl font-bold text-yellow-400">
              {timeLeft.seconds}
            </span>
            <span className="block text-xs sm:text-lg text-yellow-300 font-bold">
              Seconds
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Countdown;