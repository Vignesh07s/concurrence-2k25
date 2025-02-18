import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";

const Gallery = () => {

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const imgRefs = useRef([]);

  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/gallery`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    imgRefs.current.forEach((img) => {
      observer.observe(img);
    });

    return () => observer.disconnect();
  }, [images]);

  
  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  
  const handleClose = () => {
    setCurrentIndex(null);
  };

  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {loading ? (
        <Loader/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              ref={(el) => (imgRefs.current[index] = el)}
              data-src={image}
              alt={`Img ${index + 1}`}
              onClick={() => handleImageClick(index)}
              loading="lazy"
              className="w-full h-52 object-cover rounded-lg shadow-lg cursor-pointer"
            />
          ))}
        </div>
      )}

      {/* Full-Screen View */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-2xl z-50"
          >
            &times;
          </button>

          
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Img ${currentIndex + 1}`}
              className="sm:max-w-full max-h-[75vh] object-cover rounded-lg shadow-lg px-2"
            />

            
            <div className="flex justify-center items-center space-x-6 w-full mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
