"use client";
import { SectionProps } from "@/types/sections.type";
import { localeBasedDir } from "@/util/formater";
import { NextPage } from "next";
import { useLocale, useTranslations } from "next-intl";

const ContactSection: NextPage<SectionProps> = ({ sectionRefs }) => {
  const  t  = useTranslations('contact');

  const locale  =useLocale()
  return (
    <section
    dir={localeBasedDir(locale)}
      id="contact"
      ref={(el) => {
        sectionRefs.current = el;
      }}
      className="h-screen panel bg-[#1a1a1a] text-white flex flex-col justify-center items-center px-6 text-center"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-yellow-300 mb-6">
        {t("title")}
      </h2>
      <p className="text-gray-400 text-lg mb-6">
        {t("description")}
      </p>
      <form
        className="max-w-xl w-full space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert(t("successAlert"));
        }}
      >
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        />
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        />
        <textarea
          placeholder={t("messagePlaceholder")}
          rows={5}
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-md"
        >
          {t("button")}
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
