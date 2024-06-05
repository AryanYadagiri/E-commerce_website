import React from "react";
import Card from "./Card";

const Carousel = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="carousel-item px-[5rem] space-x-4">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button className="btn btn-circle">❮</button>
          <button className="btn btn-circle">❯</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
