"use client";
import { SectionProps } from "@/types/sections.type";
import { NextPage } from "next";
import { useTranslations } from "next-intl";

const MissionAndVision: NextPage<SectionProps> = ({ sectionRefs }) => {
  const  t  = useTranslations('missionAndVision');

  return (
    <section
      ref={(el) => {
        if (el && sectionRefs.current) {
          sectionRefs.current = el;
        }
      }}
      className="h-screen panel bg-[#1e1e1e] text-white flex flex-col justify-center items-center px-6"
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            {t("missionTitle")}
          </h3>
          <p className="text-gray-300">
            {t("missionText")}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            {t("visionTitle")}
          </h3>
          <p className="text-gray-300">
            {t("visionText")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
