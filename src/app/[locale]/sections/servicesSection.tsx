"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
    icon: <FaBullhorn className="text-yellow-400 text-5xl" />,
  },
  {
    title: "SEO Optimization",
    description:
      "We apply SEO best practices to help you rank at the top of Google.",
    icon: <FaSearch className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Branding & Identity",
    description:
      "We build strong, cohesive brand identities that resonate emotionally.",
    icon: <FaPaintBrush className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Content Strategy",
    description:
      "Insight-driven content plans that elevate your brand's narrative.",
    icon: <FaFileAlt className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Paid Ads",
    description: "We build high-converting PPC campaigns across platforms.",
    icon: <FaMoneyBillWave className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Photography",
    description: "Reels, podcasts, and content to amplify your visual brand.",
    icon: <FaCamera className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Motion Graphics",
    description: "Animated visuals that tell your story and boost engagement.",
    icon: <FaFilm className="text-yellow-400 text-5xl" />,
  },
  {
    title: "Web Development",
    description:
      "Modern, responsive websites with fast, intuitive experiences.",
    icon: <FaCode className="text-yellow-400 text-5xl" />,
  },
];

const radius = 250;

const ServicesSection = ({
  sectionRefs,
}: {
  sectionRefs: RefObject<HTMLElement | null>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const total = servicesData.length;
    const angleStep = (360 / total) * (Math.PI / 180);

    cardsRef.current.forEach((card, i) => {
      const angle = angleStep * ((i - activeIndex + total) % total);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (card) {
        const isActive = i === activeIndex;
        gsap.to(card, {
          x,
          y,
          opacity: isActive ? 1 : 0.5,
          scale: isActive ? 1.2 : 0.85,
          duration: 0.4,
          ease: "power3.inOut",
          zIndex: isActive ? 2 : 1,
          boxShadow: isActive
            ? "0 0 25px rgba(255, 255, 100, 0.9)"
            : "0 0 8px rgba(0, 0, 0, 0.4)",
          onComplete: () => {
            if (isActive) setDisplayedIndex(i);
          },
        });
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setActiveIndex((prev) => (prev + 1) % servicesData.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      id="services"
      ref={(el) => {
        if (sectionRefs.current) sectionRefs.current = el;
      }}
      className="!min-h-screen panel h-full !pt-20  md:!pt-10 flex flex-col !justify-center items-center     bg-gradient-to-tr from-black via-gray-900 to-black text-white relative"
    >
      <h2 className="text-4xl font-bold text-yellow-400 text-center">
        Our Expertise
      </h2>

      <div
        ref={containerRef}
        className="relative w-[700px] h-[700px] max-w-[95vw] max-h-[95vw] hidden md:flex items-center justify-center"
      >
        {servicesData.map((service, i) => (
          <div
            onMouseEnter={(el) => {
              setPaused(true);
              gsap.to(el.currentTarget, {
                scale: 1.2,
                duration: 0.2,
                ease: "back.inOut",
              });
            }}
            onMouseLeave={(el) => {
              setPaused(false);
              gsap.to(el.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: "back.inOut",
              });
            }}
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`absolute size-20 rounded-full   bg-white text-black flex items-center justify-center text-2xl cursor-pointer transition-transform duration-300 ${
              i === activeIndex ? "ring-4 ring-yellow-400 shadow-xl" : ""
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {service.icon}
          </div>
        ))}

        <div className="absolute w-96 h-48  sm:w-[28rem] text-center text-white px-8 py-8 border border-yellow-400 rounded-3xl bg-black/60 backdrop-blur-xl">
          {/* {servicesData[displayedIndex].icon} */}
          <h3 className="text-3xl font-bold mt-3 mb-2">
            {servicesData[displayedIndex].title}
          </h3>
          <p className="text-gray-300 text-base sm:text-lg">
            {servicesData[displayedIndex].description}
          </p>
        </div>
      </div>

      <div className="md:hidden w-full overflow-x-auto scroll-smooth flex flex-col justify-center snap-x snap-mandatory px-4 py-6">
        <div className="flex gap-4 w-max">
          {servicesData.map((service, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0 bg-white/10 backdrop-blur border border-yellow-400 rounded-2xl !grow w-80 h-60 px-6 py-5 text-center shadow-md"
            >
              <div className="text-yellow-400 text-3xl mb-3 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-yellow-200">
                {service.title}
              </h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
