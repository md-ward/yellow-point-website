import { SectionProps } from "@/types/sections.type";
import { NextPage } from "next";

const MissionAndVision: NextPage<SectionProps> = ({ sectionRefs }) => {
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
            Our Mission
          </h3>
          <p className="text-gray-300">
            To make your brand seen. We specialize in creating bold,
            high-visibility campaigns across digital and out-of-home media,
            delivering results that speak volumes.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-300">
            To be the region’s most trusted media partner — empowering
            audiences, clients, and communities through inspiring storytelling,
            strategic innovation, and meaningful connections.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
