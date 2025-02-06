import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

function EventCard({ image, eventName, date, startTime, endTime, location }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the event details page using the eventId
    navigate(`/events/${eventName}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 dark:text-white transition-transform duration-300 hover:scale-105"
      aria-label={`View details for ${eventName}`}
    >
      {/* Event Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={`${eventName}`}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">{eventName}</h2>
        <div className="text-gray-500 dark:text-gray-400 space-y-2">
          {/* Date and Time */}
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faCalendarDay} className='pr-3' />
            <span>{date}</span>
          </div>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faClock} className='pr-3' />
            <span>{startTime} - {endTime}</span>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 6.627-9 13-9 13s-9-6.373-9-13a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location || 'Location not specified'}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default EventCard;