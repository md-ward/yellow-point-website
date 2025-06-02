"use client";

import { useEffect, useState, RefObject } from "react";
import {
  FaBullhorn,
  FaSearch,
  FaPaintBrush,
  FaFileAlt,
  FaMoneyBillWave,
  FaCamera,
  FaFilm,
  FaCode,
} from "react-icons/fa";

const servicesData = [
  {
    title: "Social Media Management",
    description:
      "We plan, create and manage your social networks to maximize reach, engagement, and community impact.",
    icon: <FaBullhorn className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "We apply best SEO practices including meta tags, backlinks, and performance optimization to help you rank at the top of Google.",
    icon: <FaSearch className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Branding & Identity",
    description:
      "From strategy and positioning to rebranding, we build strong, cohesive identities that connect emotionally and strategically.",
    icon: <FaPaintBrush className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Content Strategy",
    description:
      "We create custom, insight-driven content plans that resonate with your audience and elevate your brand narrative.",
    icon: <FaFileAlt className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Paid Ads & PPC",
    description:
      "We build high-converting ad campaigns that drive traffic, leads, and conversions across Google, Meta, and more.",
    icon: <FaMoneyBillWave className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Videography & Photography",
    description:
      "We produce professional content — from reels to podcasts — tailored for your brand’s story and audience.",
    icon: <FaCamera className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Motion Graphics",
    description:
      "From animated explainers to intros and story-driven visuals — we bring your brand’s motion identity to life.",
    icon: <FaFilm className="text-yellow-400 text-4xl" />,
  },
  {
    title: "Website Development",
    description:
      "We craft responsive, modern websites that deliver fast, intuitive, and elegant user experiences across all devices.",
    icon: <FaCode className="text-yellow-400 text-4xl" />,
  },
];

const ServicesSection = ({
  sectionRefs,
}: {
  sectionRefs: RefObject<HTMLElement | null>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setActiveIndex((prev) => (prev + 1) % servicesData.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      id="services"
      ref={(el) => {
        if (sectionRefs.current) sectionRefs.current = el;
      }}
      className="h-screen panel bg-gradient-to-tr from-black via-gray-900 to-black text-white flex flex-col justify-center items-center px-6"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-yellow-400 mb-3">Our Expertise</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          End-to-end digital marketing that delivers. Explore our core services that connect creativity, technology, and strategy.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl w-full">
        {/* Large Card */}
        <div
          className="bg-white text-black p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.02]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {servicesData[activeIndex].icon}
          <h3 className="text-2xl font-bold mt-4 mb-2">
            {servicesData[activeIndex].title}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {servicesData[activeIndex].description}
          </p>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {servicesData.map((service, index) =>
            index === activeIndex ? null : (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl text-center text-white hover:bg-white/20 transition-all"
              >
                {service.icon}
                <p className="mt-2 text-sm">{service.title}</p>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
