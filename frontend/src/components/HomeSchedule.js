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
          image: "https://via.placeholder.com/50",
        },
        {
          time: "11:00 AM - 4:30 PM",
          title: "Coding Contest",
          description: "Dr. K. Narshimulu\nMr. K. R Harinath",
          image: "https://via.placeholder.com/50",
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
      day: "Day 4",
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
      day: "Day 5",
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
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-3xl w-full  shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          EVENT SCHEDULE
        </h2>
        <p className="text-gray-500 text-center mt-2">Here is our event schedule</p>

        {/* Tabs */}
        <div className="flex justify-center mt-6 space-x-4">
          {eventDays.map((day, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-white transition-all duration-300 ${
                index === activeDay
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-800 hover:bg-blue-900"
              }`}
              onClick={() => setActiveDay(index)}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="mt-8">
          {eventDays.map((day, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === activeDay ? "block" : "hidden"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                {`${day.day} (${day.date}) Events`}
              </h3>
              {day.events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg hover:bg-red-100 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-sm font-medium text-gray-600 w-28 text-center">
                    {event.time}
                  </div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-12 h-12 rounded-full object-cover mx-4 hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500 whitespace-pre-line">
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
