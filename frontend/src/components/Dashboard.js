import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate fetching event data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              { name: "Coding Contest", registrations: 120 },
              { name: "Poster Presentation", registrations: 80 },
              { name: "Workshop", registrations: 150 },
              { name: "Paper Presentation", registrations: 90 },
              { name: "Technical Quiz", registrations: 100 },
              { name: "Bug Fixing", registrations: 70 },
              { name: "Web Designing", registrations: 110 },
              { name: "Climb to Victory", registrations: 60 },
              { name: "Hackathon", registrations: 130 },
            ]);
          }, 1000)
        );

        setEvents(response);
        const total = response.reduce(
          (sum, event) => sum + event.registrations,
          0
        );
        setTotalRegistrations(total);
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Dashboard</h1>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading data...</p>
        </div>
      ) : (
        <div>
          {/* Total Registrations */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Total Registrations</h2>
              <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">
                {totalRegistrations}
              </p>
            </div>
            <div className="text-blue-500 dark:text-blue-400 text-6xl">📊</div>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border-l-4 border-blue-500 dark:border-blue-400 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="mt-2">
                  Registrations:{" "}
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {event.registrations}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
