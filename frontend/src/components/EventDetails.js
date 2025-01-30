import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RegistrationModal from './Registration';
import PaperSubmissionModal from './PaperSubmissionModal';

function EventDetails() {
  const { eventName } = useParams(); // Extract eventName from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);

  const paperModal = () => {
    setIsPaperModalOpen(true);
  };

  // Fetch event details based on eventName
  useEffect(() => {
    const decodedEventName = decodeURIComponent(eventName);
    decodedEventName.replace("-", ' ');
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/getEvent/${decodedEventName}`);
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
    setIsPaperModalOpen(false);
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
    <div className="bg-gradient-to-r bg-blue-100 min-h-screen pb-2 sm:pt-2 px-6 sm:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="md:bg-white p-0 sm:p-6 sm:py-3 rounded-lg md:shadow-lg">
          {/* Event Name */}
          <h1 className="text-4xl font-bold text-blue-700 text-center mb-3">{event.eventName}</h1>
          <hr className="border-t-2 border-blue-200 my-4" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
            {/* First Column */}
            <div className="space-y-6 mx-auto">
              {/* Image */}
              <img
                src={event.image}
                alt={event.eventName}
                height={300}
                width={300}
                className=" object-cover rounded-lg shadow-sm shadow-black"
              />
              {/* Location, Date, and Registration Fee */}
              <div className="text-gray-700">

                {/* Date and Time */}
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{`${new Date(event.date).toLocaleDateString('en-GB')} ${`| ${event.startTime} - ${event.endTime}`}`}</span>
                </div>
                <p>
                  <i className="fas fa-map-marker-alt mr-2 pr-2"></i>
                  {event.location}
                </p>
                <p>
                  <i className="fas fa-wallet text-green-500 mr-2"></i>
                  <strong>Registration Fee:</strong> ₹{event.registrationFee}
                </p>
                {/* Template (For Poster or Paper Presentation) */}
                {(event.eventName === 'Poster Presentation') && (
                  <div className="mt-2">
                    <a
                      href="https://drive.google.com/file/d/1y3LYD29X2GyAX4dpeNC8fEwyhr6twTKu/view?usp=drive_link"
                      target='_blank'
                      rel='noreferrer'
                      className='underline text-blue-500'
                    >
                      Click here for reference
                    </a>
                  </div>
                )}
                {/* Template (For Poster or Paper Presentation) */}
                {(event.eventName === 'Paper Presentation') && (
                  <div className="mt-2">
                    <a
                      href="https://drive.google.com/drive/folders/1BEcIoBt_zK4nDBQ2ZDrE-I65z1lkSRxB?usp=drive_link"
                      target='_blank'
                      rel='noreferrer'
                      className='underline text-blue-500'
                    >
                      Click here for reference
                    </a>
                  </div>
                )}
              </div>




              {/* Register Button */}
              <div className="mt-3 text-center hidden sm:block">
                {/* For Paper Presentation */}
                {event.eventName === 'Paper Presentation' ? (
                  <div className="mt-4">
                    <button
                      onClick={paperModal}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                      aria-label="Register for the event"
                    >
                      Submit Paper
                    </button>
                  </div>
                ) : (
                  // Default Register Button for other events
                  <div className="mt-3 text-center">
                    {event.registrationCount >= event.maxParticipants ? (
                      <button
                        className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md cursor-not-allowed"
                        aria-label="Registration Closed"
                        disabled
                      >
                        Registration Closed
                      </button>
                    ) : (
                      <button
                        onClick={openModal}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                        aria-label="Register for the event"
                      >
                        Register Now
                      </button>
                    )}
                  </div>
                )}

              </div>

            </div>

            {/* Second Column */}
            <div className="space-y-6">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">About the Event</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>
              {/* Rules & Guidelines */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Rules & Guidelines</h3>
                <ul className="text-gray-600 space-y-1">
                  {event.rulesAndGuidelines.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">
                        <i className="fas fa-check"></i>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Event Rounds */}
              {event.rounds.length > 0 && (
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
              )}
              {/* Prizes */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Prizes</h3>
                <p className="text-gray-600">TBA</p>
              </div>
              {/* Coordinators */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-1">Coordinators</h3>
                <ul className="list-none text-gray-600">
                  {event.coordinators.map((coordinator, index) => (
                    <li key={index}>
                      <strong>{coordinator.name}</strong> - Contact: {coordinator.contact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Register Button */}
          <div className="mt-3 text-center sm:hidden">
            {/* For Paper Presentation */}
            {event.eventName === 'Paper Presentation' ? (
              <div className="mt-4">
                <button
                  onClick={paperModal}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                  aria-label="Register for the event"
                >
                  Submit Paper
                </button>
              </div>
            ) : (
              // Default Register Button for other events
              <div className="mt-3 text-center">
                {event.registrationCount >= event.maxParticipants ? (
                  <button
                    className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md cursor-not-allowed"
                    aria-label="Registration Closed"
                    disabled
                  >
                    Registration Closed
                  </button>
                ) : (
                  <button
                    onClick={openModal}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                    aria-label="Register for the event"
                  >
                    Register Now
                  </button>
                )}
              </div>
            )}

          </div>


        </div>


      </div>

      {/* Registration Modal */}
      {isModalOpen && <RegistrationModal closeModal={closeModal} eventName={eventName} qrimg={event.qrimage} wlink={event.wlink}/>
      }

      {/* Paper Submission Modal */}
      {isPaperModalOpen && <PaperSubmissionModal closeModal={closeModal} wlink={event.wlink} />}

    </div>
  );
};

export default EventDetails;
