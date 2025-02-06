import React, { useRef } from "react";
import Slider from "react-slick";

const images = [
  'https://res.cloudinary.com/dq32ieeyv/image/upload/v1737049226/Gallery/t4zrz9ayaeze5fvg3zgg.jpg',
  'https://res.cloudinary.com/dpld8yjdt/image/upload/v1738684531/20240404_152126_beqktd.jpg',
  "https://res.cloudinary.com/dpld8yjdt/image/upload/v1738685764/f6810205-f6da-498d-b0a4-cc5428fe5b3c.png",
  'https://res.cloudinary.com/dq32ieeyv/image/upload/v1737049235/Gallery/tg8dfdk41yikrudnrvl6.jpg',
  "https://res.cloudinary.com/dpld8yjdt/image/upload/v1738684768/12_20240404_151708_gqbppd.jpg",
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
    autoplay: true,
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

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Previous
        </button>
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