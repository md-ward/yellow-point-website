import { SectionProps } from "@/types/sections.type";
import { localeBasedDir } from "@/util/formater";
import { NextPage } from "next";
import { useLocale, useTranslations } from "next-intl";

const AboutSection: NextPage<SectionProps> = ({ sectionRefs }) => {
  const t = useTranslations("about");

  const locale = useLocale();
  return (
    <section
      dir={localeBasedDir(locale)}
      id="about"
      ref={(el) => {
        if (sectionRefs.current) {
          sectionRefs.current = el;
        }
      }}
      className="h-screen panel bg-[#121212] text-white flex flex-col justify-center items-center px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-yellow-300 mb-6">{t("title")}</h2>
      <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
        {t("description")}
      </p>
    </section>
  );
};

export default AboutSection;
