"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { SliderData } from "./SliderData";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + length) % length);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <div id="gallery" className="max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold text-center p-4">Gallery</h1>
      <div className="relative flex justify-center p-8">
        {SliderData?.map((slide, idx) => {
          return (
            <div
              key={idx}
              className={
                idx === current
                  ? "opacity-[1] ease-in duration-1000"
                  : "opacity-0"
              }
            >
              <FaArrowCircleLeft
                onClick={prevSlide}
                className="absolute top-[50%] left-[30px] text-white/70 cursor-pointer select-none z-[2] ml-5"
                size={50}
              />
              {idx === current && (
                <Image
                  src={slide.image}
                  alt="/"
                  width="1440"
                  height="600"
                  style={{ objectFit: "cover"}}
                  priority
                />
              )}
              <FaArrowCircleRight
                onClick={nextSlide}
                className="absolute top-[50%] right-[30px] text-white/70 cursor-pointer select-none z-[2] mr-5"
                size={50}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
