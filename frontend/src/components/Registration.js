import React, { useState } from 'react';

const RegistrationModal = ({ closeModal, eventName }) => {
  const [formData, setFormData] = useState({
    name: '',
    registrationId: '',
    phoneNumber: '',
    email: '',
    gender: '',
    year: '',
    semester: '',
    college: '',
    department: '',
    transactionId: '',
  });

  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessShow, setIsSuccessShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        registrationId: formData.registrationId.toUpperCase(),
        yearSem: formData.year + "-" + formData.semester,
        phoneNumber: formData.phoneNumber,
        college: formData.college,
        department: formData.department,
        event: eventName.replace("-", " "),
      };
      const response = await fetch("https://concurrence-2k25-backend.vercel.app/api/v1/register/validate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setShowPaymentStep(true);
      } else {
        setErrorMessage(data.message || 'Validation failed.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const payload = {
        registrationId: formData.registrationId.toUpperCase(),
        transactionId: formData.transactionId,
        event: eventName.replace("-", " "),
      };
<<<<<<< HEAD
      const response = await fetch("https://concurrence-2k25-server.vercel.app/api/v1/register/confirm", {
=======
      const response = await fetch("https://concurrence-2k25-backend.vercel.app/api/v1/register/confirm", {
>>>>>>> c0a4bd2bbe6deeffaf163773107ed66916c19e9a
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSuccessShow(true);
      } else {
        setErrorMessage(data.message || 'Confirmation failed.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-sm">
      {loading && (
        <div id="preloder" className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10  bg-white rounded-lg shadow-lg w-[400px] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[90vh] overflow-auto relative my-4">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {!isSuccessShow && !showPaymentStep ? (
          <>
            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
              Register for the Event
            </h3>
            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              {/* Form Fields */}
              <div>
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              {/* Registration Number */}
              <div>
                <label className="block text-gray-700 font-medium">Registration Number</label>
                <input
                  type="text"
                  name="registrationId"
                  value={formData.registrationId}
                  onChange={handleChange}
                  required
                  placeholder="Enter your college registration number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              {/* Email Address */}
              <div>
                <label className="block text-gray-700 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Year & Semester */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                  >
                    <option value="" disabled>Select Year</option>
                    <option value="I">1st Year</option>
                    <option value="II">2nd Year</option>
                    <option value="III">3rd Year</option>
                    <option value="IV">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="I">1st Semester</option>
                    <option value="II">2nd Semester</option>
                  </select>
                </div>
              </div>
              {/* College */}
              <div>
                <label className="block text-gray-700 font-medium">College</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                >
                  <option value="" disabled>Select your college</option>
                  <option value="RGMCET, Nandyal">RGMCET, Nandyal</option>
                  <option value="SREC, Nandyal">SREC, Nandyal</option>
                  <option value="SVREC, Nandyal">SVREC, Nandyal</option>
                  <option value="GPREC, Kurnool">GPREC, Kurnool</option>
                  <option value="GPCET, Kurnool">GPCET, Kurnool</option>
                  <option value="KVSRIT, Nandyal">KVSRIT, Nandyal</option>
                  <option value="Ashoka Womens Engineering College">Ashoka Women's Engineering College</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-gray-700 font-medium">Branch</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                >
                  <option value="" disabled>Select your branch</option>
                  <option value="CSE">Computer Science and Engineering</option>
                  <option value="CSE DS">CSE - Data Science</option>
                  <option value="CSE BS">CSE - Business Systems</option>
                  <option value="CSE AI-ML">CSE - Artificial Intelligence & Machine Learning</option>
                  <option value="CSE CS">CSE - Cyber Security</option>
                  <option value="ECE">Electronics and Communication Engineering</option>
                  <option value="EEE">Electrical and Electronics Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                </select>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className={`px-6 py-2 ${loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    } text-white rounded-lg shadow-md flex items-center`}
                  disabled={loading}
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </>
        ) : showPaymentStep && !isSuccessShow ? (
          <>
            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
              Payment Details
            </h3>
            {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-4">
                <img
                  src="/QR.jpeg"
                  alt="QR Code"
                  className="w-32 h-32"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                  placeholder="Enter transaction ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          // Success message
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
              Registration Successful!
            </h3>
            <p className="text-gray-700 text-center mb-4">
              Thank you for registering. Please check your email for confirmation details.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
