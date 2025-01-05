import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventGallery = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const events = [
    { title: 'Ripple 2k24 - Welcome', date: '2nd April, 2024', location: 'College Auditorium', image: 'images/event1.jpg' },
    { title: 'Prize Distribution - Ripple 2k24', date: '4th April, 2024', location: 'Main Hall', image: 'images/event2.jpg' },
    { title: 'Team behind Ripple 2k24', date: '4th April, 2023', location: 'Conference Room', image: 'images/event3.jpg' },
    { title: 'Ripple 2k23 - Welcome', date: '17th March, 2023', location: 'Open Ground', image: 'images/event4.jpg' },
    { title: 'CSE Faculty Behind Ripple 2k23 Success', date: '17th March, 2023', location: 'Faculty Lounge', image: 'images/event5.jpg' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of animation in ms
      offset: 200,    // Distance to trigger animation
      once: true,     // Run animation only once
    });

    return () => clearTimeout(timer);
  }, []);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToPrevious = () => {
    const prevIndex = (currentImageIndex - 1 + events.length) % events.length;
    setCurrentImageIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % events.length;
    setCurrentImageIndex(nextIndex);
  };

  return loading ? (
    <div id="preloader" className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin" aria-label="Loading"></div>
    </div>
  ) : (
    <>
      <section className="breadcrumb-sections py-8 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Event Glimpses</h2>
          </div>
        </div>
      </section>

      <section className="event-gallery-section py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="event-item bg-cover bg-center h-96 rounded-lg overflow-hidden relative cursor-pointer"
                style={{ backgroundImage: `url('${event.image}')` }}
                data-aos="fade-up"
                onClick={() => openModal(index)}
              >
                <div className="event-tag bg-gradient-to-r from-blue-500 to-green-500 text-white py-1 px-3 inline-block rounded absolute top-4 left-4">
                  {event.location}
                </div>
                <div className="event-text p-4 bg-black bg-opacity-50 text-white rounded-b-lg absolute bottom-0 w-full">
                  <h6 className="font-semibold text-lg">{event.title}</h6>
                  <span className="text-sm text-gray-300">
                    <i className="fas fa-clock"></i> {event.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl mx-auto w-full ">
            <button
              className="absolute top-2 right-2 text-black text-2xl font-bold"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              &times;
            </button>
            <img
              src={events[currentImageIndex].image}
              alt={events[currentImageIndex].title}
              className="max-h-[80vh] w-auto mx-auto"
            />
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl font-extrabold bg-black bg-opacity-50 p-3 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              &#8249;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl font-extrabold bg-black bg-opacity-50 p-3 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              &#8250;
            </button>

          </div>
        </div>
      )}

      <footer className="footer-section py-8 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="ft-logo">
              <a href='/home' className="text-xl font-bold">RIPPLE 2K25</a>
              <p className="text-sm mt-2">Organized by Computer Science and Engineering</p>
            </div>
            <div className="copyright-text mt-4">
              <p>
                Copyright &copy; {2025} All rights reserved | Made by CSE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default EventGallery;
