import React, { useRef } from "react";
import Slider from "react-slick";

const images = [
  '/images/event1.jpg',
  '/images/event2.jpg',
  '/images/event3.jpg',
  '/images/event4.jpg',
  '/images/event5.jpg',
];

const Carousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 relative overflow-hidden">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-4">
            <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-64"
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        {/* Previous Button */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;