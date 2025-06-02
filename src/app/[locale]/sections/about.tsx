import { SectionProps } from "@/types/sections.type";
import { NextPage } from "next";

const AboutSection: NextPage<SectionProps> = ({ sectionRefs }) => {
  return (
    <section
      id="about"
      ref={(el) => {
        if (sectionRefs.current) {
          sectionRefs.current= el;
        }
      }}
      className="h-screen panel bg-[#121212] text-white flex flex-col justify-center items-center px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-yellow-300 mb-6">
        Built on Culture, Rooted in Results
      </h2>
      <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
        Since 2018, Yellow Point Media has grown from a local agency into a
        leading force in digital marketing across the UAE and GCC. With deep
        cultural insight, technological expertise, and a results-first mindset,
        we help brands capture attention and deliver measurable impact.
      </p>
    </section>
  );
};

export default AboutSection;
