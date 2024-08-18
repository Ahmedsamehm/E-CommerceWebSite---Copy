import React, { useContext, useState } from "react";
import Slider from "react-slick";

export default function DetailsSlider({ images }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // For screens less than 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For screens less than 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For screens less than 480px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section id="DetailsSlider">
      <Slider {...settings}>
        {images?.map((image, index) => {
          return (
            <div key={index} className="shadow-md  ">
              <img src={image} className="object-cover bg-center" alt="" />
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
