import React, { useState } from 'react';

const PaperSubmissionModal = ({ closeModal, wlink }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    registrationNumber: '',
    paperFile: null,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for the main modal
  const [isSuccessShow, setIsSuccessShow] = useState(false); // Single state for success and modal visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFormData({ ...formData, paperFile: file });
      setError(''); // Clear any previous error on valid file selection
    } else {
      setError('Please upload a valid Word document.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.registrationNumber || !formData.paperFile) {
      setError('All fields are required.');
      return;
    }
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('registrationNumber', formData.registrationNumber);
    formDataToSend.append('paperFile', formData.paperFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/register/submitPaper`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSuccessShow(true);
        setError('');
      } else {
        throw new Error('Failed to submit paper.');
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Hide loader in case of an error
    }
    finally {
      setIsLoading(false); // Hide loader in case of an error 
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessShow(false);
    closeModal(); // Close the parent modal as well after success
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      {/* Loader Modal */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {!isSuccessShow ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Submit Paper</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="registrationNumber">Registration Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold" htmlFor="paperFile">Upload Paper</label>
                <input
                  type="file"
                  id="paperFile"
                  name="paperFile"
                  accept=".docx"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                >
                  Submit Paper
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
              <p className="text-sm">Your paper has been successfully submitted.</p>
<<<<<<< HEAD
              <a
                href={wlink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-6 py-3 text-xs text-blue-700 underline"
              >
                Join the WhatsApp Group for further updates
              </a>
=======
          <a
                href={wlink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md mb-4"
            >
              Join the WhatsApp Group for further updates
            </a>
>>>>>>> 6ebc884189b7b0bbcabd9a49d720beecf8e856ee
              <button
                onClick={closeSuccessModal}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperSubmissionModal;
