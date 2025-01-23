import React, { useState } from 'react';
import Select from 'react-select';

const RegistrationModal = ({ closeModal, eventName, qrimg }) => {
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
    paymentScreenshot: null,
  });

  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessShow, setIsSuccessShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const colleges = [
    { value: "ALITS", label: "Anantha Lakshmi Institute of Technology and Sciences (ALITS)" },
    { value: "Ashoka Women's Engineering College", label: "Ashoka Women's Engineering College" },
    { value: "BITS", label: "Bheema Institute of technology & Science (BITS)" },
    { value: "BRNK", label: "Brindavan Institute of Technology and Science (BRNK)" },
    { value: "CBIT", label: "Chaitanya Bharathi Institute of Technology (CBIT)" },
    { value: 'KVSRIT', label: 'Dr.K.V.Subba Reddy Institute of Technology (KVSRIT)' },
    { value: 'GPREC', label: 'G Pulla Reddy Engineering College (GPREC)' },
    { value: 'GPCET', label: 'G. Pullaiah College of Engineering and Technology (GPCET)' },
    { value: "GATE", label: "GATES Institute of Technology (GATE)" },
    { value: "GITAMW", label: "Gouthami Institute of Technology and Management for Women (GITAMW)" },
    { value: "KSRMCE", label: "KSRM College Of Engineering (KSRMCE)" },
    { value: 'RGMCET', label: 'Rajeev Gandhi Memorial College of Engineering and Technology (RGMCET)' },
    { value: "RECW", label: "Ravindra College of Engineering for Women (RECW)" },
    { value: "Rayalaseema University", label: "Rayalaseema University" },
    { value: "RUCE", label: "Rayalaseema University college of Engineering (RUCE)" },
    { value: "CVRT", label: "SIR C.V RAMAN INSTITUTE OF TECHNOLOGY SCIENCES (CVRT)" },
    { value: 'SVREC', label: 'SVR Engineering College (SVREC)' },
    { value: "SJCET", label: "St.Johns College of Engineering and Technology (SJCET)"},
    { value: "SSSE", label: "Sanskrithi School of Engineering (SSSE)" },
    { value: 'SREC', label: 'Santhiram Engineering College (SREC)' },
    { value: "SKUCET", label: "Sri Krishnadevaraya University College of Engineering and Technology (SKUCET)" },
    { value: "SRIT", label: "Srinivasa Ramanujan Institute of Technology (SRIT)" },
    { value: "TEC", label: "Tadipatri Engineering College (TEC)" },
  ];

  const departments = [
    { value: 'CSE', label: 'Computer Science and Engineering (CSE)' },
    { value: 'CSE AI-ML', label: 'CSE - Artificial Intelligence & Machine Learning (CSE AI-ML)' },
    { value: 'CSE BS', label: 'CSE - Business Systems (CSE BS)' },
    { value: 'CSE CS', label: 'CSE - Cyber Security (CSE CS)' },
    { value: 'CSE DS', label: 'CSE - Data Science (CSE DS)' },
    { value: 'CE', label: 'Civil Engineering (CE)' },
    { value: 'ECE', label: 'Electronics and Communication Engineering (ECE)' },
    { value: 'EEE', label: 'Electrical and Electronics Engineering (EEE)' },
    { value: 'ME', label: 'Mechanical Engineering (ME)' },
  ];


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage('File size exceeds the 5MB limit.');
      return;
    }
        
    if (file) {
      setFormData({ ...formData, paymentScreenshot: file });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCollegeChange = (selectedOption) => {
    setFormData({ ...formData, college: selectedOption });
  };

  const handleDepartmentChange = (selectedOption) => {
    setFormData({ ...formData, department: selectedOption });
  };

  const handleImageUpload = async (file) => {
    const imageData = new FormData();
    const customFileName = `${eventName}_${formData.registrationId}`;
    imageData.append('file', file);
    imageData.append('upload_preset', 'PaymentScreenshots');
    imageData.append('cloud_name', 'dvfb9n5h5');
    imageData.append('public_id', `payments/${customFileName}`);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dvfb9n5h5/upload`, {
        method: 'POST',
        body: imageData,
      });
      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      setErrorMessage('Error uploading image. Please try again.');
      return null;
    }
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
        college: formData.college.value,
        department: formData.department.value,
        event: eventName.replace("-", " "),
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/register/validate`, {
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
      let uploadedImageUrl = await handleImageUpload(formData.paymentScreenshot);

      if (!uploadedImageUrl) {
        setErrorMessage('Payment screenshot upload failed.');
        setLoading(false);
        return;
      }

      const payload = {
        registrationId: formData.registrationId.toUpperCase(),
        transactionId: formData.transactionId,
        paymentScreenshotUrl: uploadedImageUrl, // Use the uploaded image URL
        event: eventName.replace("-", " "),
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/register/confirm`, {
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
                  placeholder="Enter email address for communication"
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">College</label>
                <Select
                  options={colleges}
                  value={formData.college}
                  onChange={handleCollegeChange}
                  placeholder="Select your college"
                  isSearchable
                  required
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      cursor: 'text' // Change cursor to text (I-beam)
                    }),
                  }}
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-gray-700 font-medium">Branch</label>
                <Select
                  options={departments}
                  value={formData.department}
                  onChange={handleDepartmentChange}
                  placeholder="Select your department"
                  isSearchable
                  required
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      cursor: 'text' // Change cursor to text (I-beam)
                    }),
                  }}
                />
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
                  src={qrimg}
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
              <div>
                <label className="block text-gray-700 font-medium">Upload Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
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