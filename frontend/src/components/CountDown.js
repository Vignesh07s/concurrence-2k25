import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-02-18T00:00:00"); // Replace with your event date

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
      }
    };

    const intervalId = setInterval(updateCountdown, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <section
      className="py-12 bg-blue-600 text-white min-h-[300px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/counterbg.jpg')",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-5xl sm:text-6xl font-bold">
            Countdown
          </h2>
          <p className="mt-4 text-xl sm:text-2xl ">
            Count every second to the big day and don't miss a moment of the excitement!
          </p>
        </div>

        {/* Countdown Timer Section */}
        <div className="flex gap-8 mt-6 md:mt-0 flex-wrap justify-center">
          {/* Box for each time element */}
          <div className="text-center bg-blue-800 p-4 rounded-lg shadow-lg w-24 sm:w-24">
            <span className="block text-5xl font-bold ">{timeLeft.days}</span>
            <span className="block text-lg text-red-600 font-bold">Days</span>
          </div>
          <div className="text-center bg-blue-800 p-4 rounded-lg shadow-lg w-24 sm:w-24">
            <span className="block text-5xl font-bold">{timeLeft.hours}</span>
            <span className="block text-lg text-red-600 font-bold">Hours</span>
          </div>
          <div className="text-center bg-blue-800 p-4 rounded-lg shadow-lg w-24 sm:w-24">
            <span className="block text-5xl font-bold">{timeLeft.minutes}</span>
            <span className="block text-lg text-red-600 font-bold">Minutes</span>
          </div>
          <div className="text-center bg-blue-800 p-4 rounded-lg shadow-lg w-24 sm:w-24">
            <span className="block text-5xl font-bold">{timeLeft.seconds}</span>
            <span className="block text-lg text-red-600 font-bold">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
