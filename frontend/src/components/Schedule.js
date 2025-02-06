import React, { useState } from "react";

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  const eventDays = [
    {
      day: "Day 1",
      date: "February 18, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Help Desk and Spot Registration",
          description: "Venue: Beside Account Section",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740260/helpdesk_hnibkx.png",
        },
        {
          time: "10:00 AM - 10:30 AM",
          title: "Inaugural Function",
          description: "Venue: MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736847272/inauguration_qdzudm.jpg",
        },
        {
          time: "10:30 AM - 11:00 AM",
          title: "Tea Break and Stalls Open",
          description: "Venue: TBA",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737739535/Break_jne2ut.jpg",
        },
        {
          time: "11:00 AM - 01:00 PM",
          title: "Coding Contest",
          description: "Venue: CSE and DS LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736577945/ekzgxcdpbun0ofuoqlnt.png",
        },
        {
          time: "11:00 AM - 01:00 PM",
          title: "Workshop",
          description: "Venue: MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096070/Workshop_wtqcw7.png",
        },
        {
          time: "02:00 PM - 04:00 PM",
          title: "Coding Contest Continued",
          description: "Venue: CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736577945/ekzgxcdpbun0ofuoqlnt.png",
        },
        {
          time: "02:00 PM - 04:30 PM",
          title: "Poster Presentation",
          description: "Venue: PG Block",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737095949/ylifai9nq5ri1sm6zeqc.png",
        },
        {
          time: "02:00 PM - 04:30 PM",
          title: "Workshop Continued",
          description: "Venue: MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096070/Workshop_wtqcw7.png",
        },
      ],
    },
    {
      day: "Day 2",
      date: "February 19, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Help Desk and Spot Registration",
          description: "Venue: Beside Account Section",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740260/helpdesk_hnibkx.png",
        },
        {
          time: "09:30 AM - 10:40 AM",
          title: "Paper Presentation",
          description: "Venue: Gallery / Class Rooms",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096015/Paper_presentation_axgiqk.png",
        },
        {
          time: "09:15 AM - 12:30 PM",
          title: "Technical Quiz",
          description: "Venue: MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737095856/Technical_quiz_xl6x7n.png",
        },
        {
          time: "01:30 PM - 04:00 PM",
          title: "Bug Fixing",
          description: "Venue: CSE LABs",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736529671/shxoartqpcv4eumtf5zx.png",
        },
        {
          time: "02:10 PM - 04:00 PM",
          title: "Paper Presentation Tracks Continued",
          description: "Venue: Gallery / Class Rooms",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096015/Paper_presentation_axgiqk.png",
        },
        {
          time: "04:00 PM - 04:30 PM",
          title: "Flash Mob",
          description: "Venue: Infront of PG Block",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737739740/flashmob_sojyfc.jpg",
        },
      ],
    },
    {
      day: "Day 3",
      date: "February 20, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Help Desk and Spot Registration",
          description: "Venue: Beside Account Section",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740260/helpdesk_hnibkx.png",
        },
        {
          time: "09:30 AM - 01:00 PM",
          title: "Web Designing",
          description: "Venue: CSE LABs",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1736528759/qxgvvry4vdallclgw3qe.jpg",
        },
        {
          time: "09:30 AM - 01:00 PM",
          title: "Climb to Victory",
          description: "Venue: ME Gallery",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737109407/Climb_to_Victory_z6du9g.png",
        },
        {
          time: "02:30 PM - 04:00 PM",
          title: "Valedictory Function & Prize Distribution",
          description: "Venue: Main Hall",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740018/prize_bz4fa4.jpg",
        },
        {
          time: "04:00 PM - 04:30 PM",
          title: "Certificate Distribution",
          description: "Venue: Registration Counter",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737739841/certificate_mahatq.jpg",
        },
      ],
    },
    {
      day: "Day 4",
      date: "February 21, 2025",
      events: [
        {
          time: "09:00 AM - 10:00 AM",
          title: "Inaugural Address and Problem Statement Announcement",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "10:00 AM - 10:40 AM",
          title: "Instruction Sessions & Problem Statement Brief",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "11:00 AM - 11:30 AM",
          title: "Ideathon: Idea Brainstorming and Submission",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "11:30 AM - 01:00 PM",
          title: "Idea Presentation and Evaluation",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "01:00 PM - 02:00 PM",
          title: "Lunch Break",
          venue: "TBA",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740406/lunch_d0wedz.png",
        },
        {
          time: "02:00 PM - 04:00 PM",
          title: "Qualified Teams Announcement and Initial Planning Phase",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "04:30 PM - 07:30 PM",
          title: "Kick-off: Problem Analysis and Prototype Planning",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "07:30 PM - 08:30 PM",
          title: "Dinner Break",
          venue: "TBA",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740406/lunch_d0wedz.png",
        },
        {
          time: "08:30 PM - 10:30 PM",
          title: "Code Sprint 1: Initial Development",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "10:30 PM - 12:00 AM",
          title: "Fun Activities",
          venue: "MECH GALLERY and Surroundings",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1738677475/download_byrnyl.png",
        },
      ],
    },
    {
      day: "Day 5",
      date: "February 22, 2025",
      events: [
        {
          time: "12:00 AM - 02:00 AM",
          title: "Overnight Coding Marathon",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "02:00 AM - 07:00 AM",
          title: "Overnight Development and Debugging",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "07:00 AM - 08:00 AM",
          title: "Breakfast Break",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740406/lunch_d0wedz.png",
        },
        {
          time: "8:00 AM - 12:00 PM",
          title: "Final Development and Testing",
          venue: "CSE LABS",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "12:00 PM - 01:00 PM",
          title: "Lunch Break",
          venue: "TBA",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740406/lunch_d0wedz.png",
        },
        {
          time: "12:00 PM - 03:00 PM",
          title: "Model Presentation and Technical Demonstration",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "03:00 PM - 04:00 PM",
          title: "Final Evaluation and Judge’s Feedback",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/dvlqrld7w/image/upload/v1737096262/image-removebg-preview_6_h9mnto.png",
        },
        {
          time: "04:00 PM - 05:00 PM",
          title: "Prize Distribution Ceremony",
          venue: "MECH GALLERY",
          image: "https://res.cloudinary.com/de1zmxpb7/image/upload/v1737740018/prize_bz4fa4.jpg",
        },
      ],
    },
  ];


  const downloadPDF = () => {
    const pdfUrl = "https://drive.google.com/uc?export=download&id=1Rd5rDl-r5WjlsDxslqqkIklB5ZBs2cVi";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "concurrence-schedule.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  


  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800 pt-3">
      <div className="max-w-3xl w-full rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center pb-4">
          EVENT SCHEDULE
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Download Schedule
          </button>
        </div>


        {/* Tabs for Day Selection */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5 justify-center px-2">
          {eventDays.map((day, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-white transition-all duration-300 ${index === activeDay
                ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                : "bg-blue-400 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-900"
                }`}
              onClick={() => setActiveDay(index)}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Notice */}
        <p className="text-center text-red-600 font-semibold mb-6">
          *Timing and venues are subject to change without prior notice.
        </p>

        {/* Event Details */}
        <div className="mt-8 px-2">
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

export default Schedule;