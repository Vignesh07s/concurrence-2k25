import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-purple-200">
      <section className="container mx-auto px-4 py-8">

        {/* CONCURRENCE 2K25 */}
        <div className="text-left mb-8">
          <h2 className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 relative pb-1">
            CONCURRENCE
            <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-purple-500 to-orange-400"></span>
          </h2>
          <h3 className="font-bold text-2xl text-green-700 mt-6">
            Objectives of this Program :
          </h3>
          <ul className="list-disc pl-6 text-gray-600 mt-4 text-base sm:text-xl">
            <li>
              <strong>Knowledge Dissemination:</strong> Events provide a platform for sharing knowledge, research, and innovative ideas.
            </li>
            <li>
              <strong>Skill Enhancement:</strong> Workshops and coding contests encourage problem-solving, creativity, and collaboration.
            </li>
            <li>
              <strong>Networking:</strong> Events connect students, professionals, and experts to exchange ideas and build relationships.
            </li>
            <li>
              <strong>Inspiration and Motivation:</strong> Talks by successful individuals inspire participants to pursue their goals.
            </li>
          </ul>
          <h3 className="font-bold text-2xl text-green-700 mt-8">
            Target Audience:
          </h3>
          <ul className="list-disc pl-6 text-gray-600 mt-4 text-base sm:text-xl">
            <li>Students from engineering and science disciplines.</li>
            <li>Tech enthusiasts and budding entrepreneurs.</li>
            <li>Innovators and creative thinkers.</li>
          </ul>
          <h3 className="font-bold text-2xl text-green-700 mt-8">
            Perks for Participants:
          </h3>
          <ul className="list-disc pl-6 text-gray-600 mt-4 text-base sm:text-xl">
            <li>Certificates of Participation for all attendees.</li>
            <li>Exciting cash prizes, trophies, and goodies for contest winners.</li>
            <li>Networking opportunities with industry leaders and experts.</li>
            <li>Skill development workshops in AI, IoT, and Web Development.</li>
            <li>Potential internship/job opportunities from participating companies.</li>
            <li>Public recognition on the event website and social media channels.</li>
            <li>Exclusive access to keynote sessions and panel discussions.</li>
            <li>Event-branded T-shirts, notebooks, and other swag for participants.</li>
          </ul>

          <h3 className="font-bold text-2xl text-green-700 mt-8">
            List of Events :
          </h3>
          <ul className="list-decimal pl-6 text-gray-600 mt-4 text-base sm:text-xl">
            <li>Coding Contest</li>
            <li>Technical Quiz</li>
            <li>Web Designing</li>
            <li>Bug Fixing</li>
            <li>Ideathon</li>
            <li>Paper Presentation</li>
            <li>Poster Presentation</li>
          </ul>
        </div>

        {/* CSE */}
        <div className="text-left mb-8">
          <Link to="https://www.rgmcet.edu.in/department-of-cse">
            <h2 className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 relative pb-1">
              CSE
              <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-purple-500 to-orange-400"></span>
            </h2>
          </Link>
          <div className="mt-6 text-base sm:text-xl text-gray-600">
            <h3 className="font-bold text-2xl text-green-700">
              Vision :
            </h3>
            <ul className="list-disc pl-6 mt-4">
              <li>Empower students with cutting-edge technologies.</li>
              <li>Train students as entrepreneurs to address societal needs.</li>
              <li>Develop smart applications for rural communities.</li>
            </ul>
            <h3 className="font-bold text-2xl text-green-700 mt-8">
              Mission :
            </h3>
            <ul className="list-disc pl-6 mt-4">
              <li>Offer undergraduate, postgraduate, and research programs in collaboration with industry.</li>
              <li>Foster innovation and research through focused groups.</li>
              <li>Expose students to the latest tools for societal applications.</li>
            </ul>
          </div>
        </div>

        {/* RGMCET */}
        <div className="text-left">
          <Link to="https://www.rgmcet.edu.in">
            <h2 className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 relative pb-1">
              RGMCET
              <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-purple-500 to-orange-400"></span>
            </h2>
          </Link>
          <div className="mt-6 text-base sm:text-xl text-gray-600">
            <h3 className="font-bold text-2xl text-green-700">
              Vision :
            </h3>
            <ul className="list-disc pl-6 mt-4">
              <li>Develop a rural-based college into an institute of global standards.</li>
              <li>Inculcate value-based education for peace and progress.</li>
            </ul>
            <h3 className="font-bold text-2xl text-green-700 mt-8">
              Mission :
            </h3>
            <ul className="list-disc pl-6 mt-4">
              <li>Build strong undergraduate programs with world-class infrastructure.</li>
              <li>Establish postgraduate programs in cutting-edge technologies.</li>
              <li>Encourage research and foster entrepreneurship.</li>
              <li>Collaborate with industries for demand-driven courses.</li>
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
};

export default About;
