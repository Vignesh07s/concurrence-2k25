import React, { useState } from "react";

const EventSchedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  const eventDays = [
    {
      day: "Day 1",
      date: "February 18, 2025",
      events: [
        {
          time: "10:00 AM - 11:00 AM",
          title: "Inauguration",
          description: "Chief members\nConveners",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736847272/inauguration_qdzudm.jpg",
        },
        {
          time: "11:00 AM - 4:30 PM",
          title: "Coding Contest",
          description: "Dr. K. Narshimulu\nMr. K. R Harinath",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736577945/ekzgxcdpbun0ofuoqlnt.png",
        },
        {
          time: "10:00 AM - 11:00 AM",
          title: "Web designing",
          description: "Chief members\nConveners",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736528759/qxgvvry4vdallclgw3qe.jpg",
        },
        {
          time: "11:00 AM - 4:30 PM",
          title: "Paper presentation",
          description: "Dr. K. Narshimulu\nMr. K. R Harinath",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736579087/irnya0rgy3d2vq80wfht.jpg",
        },
      ],
    },
    {
      day: "Day 2",
      date: "February 19, 2025",
      events: [
        {
          time: "9:00 AM - 10:30 AM",
          title: "Tech Talk",
          description: "Dr. A. Suresh\nMs. B. Priya",
          image: "https://via.placeholder.com/50",
        },
        {
          time: "11:00 AM - 1:00 PM",
          title: "Workshop on AI",
          description: "Mr. V. Ramesh\nMs. C. Geetha",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      day: "Day 3",
      date: "February 20, 2025",
      events: [
        {
          time: "10:00 AM - 12:00 PM",
          title: "Panel Discussion",
          description: "Industry Experts\nModerators",
          image: "https://via.placeholder.com/50",
        },
        {
          time: "1:30 PM - 4:00 PM",
          title: "Networking Session",
          description: "Professionals & Students",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      day: "Day 4", // Changed order
      date: "February 21, 2025",
      events: [
        {
          time: "9:30 AM - 11:30 AM",
          title: "Startup Showcase",
          description: "Young Entrepreneurs",
          image: "https://via.placeholder.com/50",
        },
        {
          time: "12:00 PM - 3:00 PM",
          title: "Design Thinking Workshop",
          description: "Ms. Deepa\nDr. Rajeev",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      day: "Day 5", // Changed order
      date: "February 22, 2025",
      events: [
        {
          time: "10:00 AM - 12:00 PM",
          title: "Hackathon Finale",
          description: "Top Teams\nJudges Panel",
          image: "https://via.placeholder.com/50",
        },
        {
          time: "2:00 PM - 4:00 PM",
          title: "Closing Ceremony",
          description: "Organizing Committee",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
  ];

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800 pt-3">
      <div className="max-w-3xl w-full rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center pb-4">
          EVENT SCHEDULE
        </h2>

        {/* Tabs for Day Selection */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5 justify-center">
          {eventDays.map((day, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-white transition-all duration-300 ${
                index === activeDay
                  ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                  : "bg-blue-400 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-900"
              }`}
              onClick={() => setActiveDay(index)}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Event Details */}
        <div className="mt-8">
          {eventDays.map((day, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${index === activeDay ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                {`${day.day} (${day.date}) Events`}
              </h3>
              {day.events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg hover:bg-red-100 dark:hover:bg-green-800 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 w-full md:w-28 text-center">
                    {event.time}
                  </div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-12 h-12 rounded-full object-cover mx-4"
                  />
                  <div className="mt-2 md:mt-0 md:ml-4">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{event.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;