import { useState } from "react";

const StudentEvents = () => {
  const [regNumber, setRegNumber] = useState("");
  const [eventCount, setEventCount] = useState(null);
  const [eventNames, setEventNames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!regNumber) {
      setError("Please enter a registration number.");
      setEventCount(null);
      setEventNames([]);
      return;
    }

    // Clear previous data before fetching new results
    setError("");
    setEventCount(null);
    setEventNames([]);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/studentDetails/${regNumber}`);
      const data = await response.json();

      if (response.ok) {
        setEventCount(data.eventCount);
        setEventNames(data.eventNames || []);
      } else {
        setError(data.error || "Failed to fetch event details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Check Registered Events
        </h2>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCheck}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Events"}
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {eventCount !== null && (
          <div className="mt-4 text-left"> {/* Left-aligned content */}
            <h3 className="text-lg font-medium">
              {eventCount > 0
                ? `Registered for ${eventCount} event${eventCount > 1 ? "s" : ""}`
                : "Not registered for any events."}
            </h3>


            {eventCount > 0 && (
              <ol className="mt-2 list-decimal list-inside"> {/* Ordered List */}
                {eventNames.map((event, index) => (
                  <li key={index} className="text-gray-700">
                    {event}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEvents;
