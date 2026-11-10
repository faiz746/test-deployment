import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid red",
          }}
        >
          <h3>{item}</h3>
        </div>
      ))}
    </Slider>
  );
}
