import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Loader from './Loader';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`);
        const data = await response.json();

        // Format the date to DD-MM-YYYY
        const formattedEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date).toLocaleDateString('en-GB'), // Format to DD-MM-YYYY
        }));

        setEvents(formattedEvents); // Set the formatted events data
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300 mb-6">
        Our Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.eventName}
            image={event.image}
            eventName={event.eventName}
            date={event.date}
            startTime={event.startTime}
            endTime={event.endTime}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;