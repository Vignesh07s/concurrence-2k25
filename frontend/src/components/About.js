import React from "react";

const About = () => {
  return (
    <div className="p-8">
      {/* Ripple Information */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">RIPPLE 2K25</h1>
        <p className="text-lg text-gray-700">
          RIPPLE 2K25 is an innovative event aimed at bringing together brilliant minds to showcase their skills and foster collaboration across various domains.
        </p>
      </div>

      {/* CSE Dept Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">CSE Department</h2>
        <p className="text-lg text-gray-700">
          The Computer Science and Engineering (CSE) department at RGMCET focuses on providing quality education in the field of computer science, preparing students for real-world challenges.
        </p>
      </div>

      {/* RGMCET Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4">RGMCET (Rajeev Gandhi Memorial College of Engineering & Technology)</h3>
        <p className="text-lg text-gray-700">
          RGMCET, located in Nandyal, is a premier institution that offers undergraduate and postgraduate programs in engineering and technology. The college aims to provide high-quality education with a focus on innovation, skill development, and research.
        </p>
      </div>

      {/* Objectives Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Objectives:</h3>
        <ul className="list-disc ml-6">
          <li>Objective 1: To encourage innovation and creativity.</li>
          <li>Objective 2: To provide a platform for students to showcase their skills.</li>
          <li>Objective 3: To promote collaboration among students and professionals.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
