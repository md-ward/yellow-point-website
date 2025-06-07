"use client";
import { SectionProps } from "@/types/sections.type";
import { localeBasedDir } from "@/util/formater";
import { NextPage } from "next";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const PartnersSection: NextPage<SectionProps> = ({ sectionRefs }) => {
  const ourPartners = [
    "/partners-1.png",
    "/partner-2.svg",
    "/partner-3.png",
    "/partner-4.png",
    "/partner-5.png",
    "/partner-6.png",
  ];

  const t = useTranslations("Partners");
  const locale = useLocale();

  return (
    <section
      dir={localeBasedDir(locale)}
      id="partners"
      ref={sectionRefs}
      className="!h-screen panel bg-[#0f0f0f] text-white px-6 flex flex-col justify-center items-center"
    >
      <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6 text-center">
        {t("title")}
      </h2>
      <p className="text-gray-400 text-lg mb-10 max-w-2xl text-center">
        {t("description")}
      </p>

      <div
        id="partner-carousel"
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory will-change-scroll scroll-smooth px-2 w-full justify-center pb-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {ourPartners.map((src, idx) => (
          <div
            key={idx}
            className="partner-logo min-w-[180px] bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 snap-start transition-transform hover:scale-105 flex items-center justify-center relative"
          >
            <Image
              src={src}
              alt={`Partner ${idx + 1}`}
              width={160}
              height={80}
              className="object-contain p-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
