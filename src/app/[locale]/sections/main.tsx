import { SectionProps } from "@/types/sections.type";
import React from "react";

const HeroSection: React.FC<SectionProps> = ({ sectionRefs }) => {
  return (
    <section
      id="#"
      ref={(el) => {
        if (el && sectionRefs.current) {
          sectionRefs.current = el;
        }
      }}
      className="h-screen panel bg-gradient-to-br  from-black via-gray-900 to-black text-white flex flex-col items-center justify-center text-center px-4"
    >
      <div id="wrapper" className="opacity-0">
        <div id="hero-logo-title" className="flex flex-row items-center ">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            Yellow Point Media
          </h1>
          <span className="bg-yellow-400 rounded-full ml-2 size-5 sm:size-11 aspect-square z-40" />
        </div>

        <div id="hero-content-container">
          <h1
            id="hero-title"
            className="text-5xl md:text-7xl font-extrabold leading-tight  "
          >
            <span className="block hero-line">Built on Experience,</span>
            <span className="block hero-line text-yellow-400">
              Driven by Creativity
            </span>
          </h1>
          <p
            id="hero-subtitle"
            className="mt-6 text-md text-gray-300 max-w-2xl mx-auto"
          >
            Yellow Point Media is a trusted, award-winning digital marketing
            agency based in Al-Ain — connecting brands and people through
            powerful storytelling and innovative strategies.
          </p>
          <button className=" bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold shadow-md hover:scale-105 mt-4">
            Let’s Elevate Your Brand
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
