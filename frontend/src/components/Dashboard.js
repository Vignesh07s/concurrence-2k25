import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios for API calls

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch event data from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // API call to fetch registration counts for all events
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/events/participantsCount`
        );

        const eventsData = response.data;

        // Update state with the fetched data
        setEvents(eventsData);

        // Calculate total registrations
        const total = eventsData.reduce(
          (sum, event) => sum + event.registrationCount,
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
    <div className="p-8 min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
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
                <h3 className="text-xl font-bold">{event.eventName} {event.registrationCount === event.maxParticipants ? <span role="img" aria-label="lock">🔒</span> : ""}</h3>
                <p className="mt-2">
                  Registrations:{" "}
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {event.registrationCount}
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