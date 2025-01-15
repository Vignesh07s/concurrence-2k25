import React from 'react';
import { jsPDF } from 'jspdf';

const EventSchedule = () => {
  const scheduleData = [
    {
      date: 'Mon, May 01',
      events: [
        {
          time: '7:00 p.m. - 7:45 p.m.',
          title: 'Opening Session: Global Outlook',
          location: 'Main Stage',
        },
        {
          time: '7:00 p.m. - 7:45 p.m.',
          title: 'Ask the Experts',
          location: 'Sinclair Room',
        },
        {
          time: '8:00 p.m. - 9:30 p.m.',
          title: 'The Future of Solar Roofing',
          location: 'Sinclair Room',
        },
        {
          time: '8:00 p.m. - 8:45 p.m.',
          title: 'Offshore Wind Farms',
          location: 'Main Stage',
        },
      ],
    },
    {
      date: 'Tue, May 02',
      events: [
        {
          time: '9:00 a.m. - 9:45 a.m.',
          title: 'Keynote Speech: AI & Sustainability',
          location: 'Main Stage',
        },
        {
          time: '10:00 a.m. - 11:30 a.m.',
          title: 'Smart Cities: The Future of Urban Living',
          location: 'Sinclair Room',
        },
        {
          time: '11:00 a.m. - 12:00 p.m.',
          title: 'Tech in Healthcare: Innovations in Medicine',
          location: 'Hall 2',
        },
        {
          time: '12:00 p.m. - 1:00 p.m.',
          title: 'Networking Lunch',
          location: 'Dining Area',
        },
      ],
    },
    {
      date: 'Wed, May 03',
      events: [
        {
          time: '9:00 a.m. - 9:45 a.m.',
          title: 'Future of Blockchain Technology',
          location: 'Main Stage',
        },
        {
          time: '10:00 a.m. - 10:45 a.m.',
          title: 'Exploring Cybersecurity Threats',
          location: 'Tech Hub',
        },
      ],
    },
    {
      date: 'Thu, May 04',
      events: [
        {
          time: '7:00 p.m. - 7:45 p.m.',
          title: 'The Role of AI in Education',
          location: 'Main Stage',
        },
        {
          time: '8:00 p.m. - 9:30 p.m.',
          title: 'Digital Marketing Trends',
          location: 'Hall 1',
        },
      ],
    },
    {
      date: 'Fri, May 05',
      events: [
        {
          time: '10:00 a.m. - 10:45 a.m.',
          title: 'Closing Ceremony',
          location: 'Main Stage',
        },
        {
          time: '12:00 p.m. - 1:00 p.m.',
          title: 'Farewell Lunch',
          location: 'Dining Area',
        },
      ],
    },
  ];

  // Group events by time
  const groupEventsByTime = (events) => {
    return events.reduce((acc, event) => {
      if (!acc[event.time]) {
        acc[event.time] = [];
      }
      acc[event.time].push(event);
      return acc;
    }, {});
  };

  // Function to generate and download the PDF
  const downloadSchedulePDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text('Event Schedule for RIPPLE 2K25', 10, 20);

    // Add Schedule Data
    let yPosition = 30;
    scheduleData.forEach((day) => {
      doc.setFontSize(16);
      doc.text(day.date, 10, yPosition);
      yPosition += 10;

      day.events.forEach((event) => {
        doc.setFontSize(12);
        doc.text(`${event.time} - ${event.title} (${event.location})`, 10, yPosition);
        yPosition += 8;
      });

      yPosition += 10; // Add space between days
    });

    // Download the PDF
    doc.save('Event_Schedule_RIPPLE_2K25.pdf');
  };

  return (
    <div className='bg-gray-400'>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">Event Schedule</h1>
        <button
          onClick={downloadSchedulePDF}
          className="bg-green-700 text-black dark:text-white px-4 py-2 rounded mb-6"
        >
          Download Event Schedule PDF
        </button>
        <div>
          {scheduleData.map((day, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-4xl font-semibold mb-2 text-black dark:text-white">{day.date}</h2>
              {/* Thick Line after Day Title */}
              <div className="border-t-4 border-black dark:border-gray-700 mb-4"></div>
              <div className="border-gray-400 dark:border-gray-700">
                {/* Group events by time */}
                {Object.keys(groupEventsByTime(day.events)).map((time, i) => (
                  <div key={i} className="py-4 border-b border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{time}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {/* Display each event that occurs at the same time in a grid */}
                      {groupEventsByTime(day.events)[time].map((event, j) => (
                        <div
                          key={j}
                          className=" p-4 rounded-lg shadow-md border bg-gray-300 dark:bg-gray-800 dark:border-gray-600"
                        >
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {event.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
