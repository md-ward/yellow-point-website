"use client";
import { SectionProps } from "@/types/sections.type";
import React from "react";
import gsap from "gsap";
import { useLocale, useTranslations } from "next-intl";
import { localeBasedDir } from "@/util/formater";

const HeroSection: React.FC<SectionProps> = ({ sectionRefs }) => {
  const t = useTranslations("hero");
  const locale = useLocale();
  return (
    <section
      dir={localeBasedDir(locale)}
      id="#"
      ref={(el) => {
        if (el && sectionRefs.current) {
          sectionRefs.current = el;
        }
      }}
      className="h-screen panel bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center text-center px-4"
    >
      <div id="wrapper" className="opacity-0">
        <div id="hero-logo-title" className="flex flex-row items-center">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            {t("logoTitle")}
          </h1>
          <span className="bg-yellow-400 rounded-full ml-2 size-5 sm:size-11 aspect-square z-40" />
        </div>

        <div id="hero-content-container">
          <h1
            id="hero-title"
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            <span className="block hero-line">{t("titleLine1")}</span>
            <span className="block hero-line text-yellow-400">
              {t("titleLine2")}
            </span>
          </h1>
          <p
            id="hero-subtitle"
            className="mt-6 text-md text-gray-300 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </p>
          <button
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                duration: 0.3,
                ease: "back.inOut",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "back.inOut",
              });
            }}
            className="bg-yellow-400 cursor-pointer !ring-1 ring-white text-black px-8 py-4 rounded-full font-semibold shadow-md mt-4"
          >
            {t("cta")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
