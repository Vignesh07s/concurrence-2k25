import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import RegistrationModal from './Registration';
import { Link, useParams } from 'react-router-dom';

function EventDetails() {
  const { eventName } = useParams(); // Extract eventName from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch event details based on eventName
  useEffect(() => {
    const decodedEventName = decodeURIComponent(eventName);
    decodedEventName.replace("-", ' ');
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/events/getEvent/${decodedEventName}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventName]);

  // Open Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div id="preloder" className="fixed inset-0 flex justify-center items-center bg-gray-100">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl w-4/5 sm:w-1/3">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-300">404</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 my-4">Oops! The event you're looking for doesn't exist or may have been removed.</p>
          <Link
            to="/events"
            className="text-lg text-blue-500 hover:underline mt-4 block dark:text-blue-400"
          >
            Go back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r bg-blue-100 min-h-screen pt-2 px-6 sm:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="md:bg-white p-6 py-3 rounded-lg md:shadow-lg">
          {/* Event Name */}
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-3">{event.eventName}</h1>
          <hr className="border-t-2 border-blue-200 my-4" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            {/* First Column */}
            <div className="space-y-6 w-full mx-auto">
              {/* Image */}
              <img
                src="/webdesigning.jpg"
                alt={event.eventName}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
              {/* Location, Date, and Registration Fee */}
              <div className="text-gray-700">
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                  <strong>Date & Time:</strong> {format(new Date(event.date), 'MMMM dd, yyyy | hh:mm a')}
                </p>
                <p>
                  <i className="fas fa-wallet text-green-500 mr-2"></i>
                  <strong>Registration Fee:</strong> ₹{event.registrationFee}
                </p>
              </div>

            </div>

            {/* Second Column */}
            <div className="space-y-6">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">About the Event</h2>
                <p className="text-gray-600">{event.about}</p>
              </div>
              {/* Rules & Guidelines */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Rules & Guidelines</h3>
                <ul className="text-gray-600 space-y-1">
                  {event.rulesAndGuidelines.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Event Rounds */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Event Rounds</h3>
                <ul className="text-gray-600 space-y-1">
                  {event.rounds.map((round, index) => (
                    <li key={index}>
                      <span className="mr-2 text-green-500">🎯</span>
                      {round}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Prizes */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Prizes</h3>
                <p className="text-gray-600">{event.prizes}</p>
              </div>
              {/* Coordinators */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-1">Coordinators</h3>
                <ul className="list-none text-gray-600">
                  {event.coordinators.map((coordinator, index) => (
                    <li key={index}>
                      <strong>{coordinator.name}</strong> ({coordinator.role}) - Contact: {coordinator.contact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Register Button */}
          <div className="mt-3 text-center">
            <button
              onClick={openModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              aria-label="Register for the event"
            >
              Register Now
            </button>

          </div>

        </div>


      </div>

      {/* Registration Modal */}
      {isModalOpen && <RegistrationModal closeModal={closeModal} eventName={eventName} />
      }
    </div>
  );
};

export default EventDetails;
