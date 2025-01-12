import React from "react";

export default function TotalRegistrations() {
  const totalRegistrations = 1234; // Hardcoded value for now

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center z-50 ">
      <div className="bg-gradient-to-r from-pink-500 to-cyan-400 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg flex items-center justify-center">
        <span className="text-sm sm:text-2xl">{totalRegistrations}</span>
        <div
          className="absolute inset-0 flex items-center justify-center sm:text-sm text-center font-extrabold"
          style={{
            transform: "rotate(-90deg)",
          }}
        >
          <svg
            className="w-full h-full px-1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,10 a40,40 0 1,1 0,80 a40,40 0 1,1 0,-80"
              fill="none"
              stroke="none"
              id="circlePath"
            />
            <text style={{ fontSize: "14px" }}>
              <textPath
                href="#circlePath"
                startOffset="25%"
                textAnchor="middle"
              >
                Total Registrations
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}