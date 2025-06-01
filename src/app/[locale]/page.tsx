"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // const t = useTranslations("Home");
  const ourPartners = [
    "/partners-1.png",
    "/partner-2.svg",
    "/partner-3.png",
    "/partner-4.png",
    "/partner-5.png",
    "/partner-6.png",
  ];
  // Refs for ScrollTrigger and GSAP animations
  // "servicesRef" is a ref for the Services section
  // "cardsRef" is an array of refs for the Service Cards
  const servicesRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const partnersRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    const heroContentContainer = document.getElementById(
      "hero-content-container"
    );
    const logoTitle = document.getElementById("hero-logo-title");
    const logoTitleSplitted = new SplitText(logoTitle, { type: "words" });

    tl.from([logoTitleSplitted.words, logoTitle?.children[1]], {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "back.inOut",
      stagger: 0.3,
    });
    tl.to([logoTitleSplitted.words, logoTitle?.children[1]], {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "back.inOut",
      stagger: 0.3,
      display: "none",
    });

    if (heroContentContainer) {
      tl.from(heroContentContainer.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "back.inOut",
        stagger: 0.2,
      });
    }
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".panel");

    
    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel as HTMLElement,
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: 0.3,
        
        snap: {
          snapTo: 1,
          duration: 0.3,
          inertia: true,
          ease: "power2.out",
        },
        
        markers: false,
      });
    });

    gsap.from(cardsRef.current, {
      y: 120,
      opacity: 0,
      scale: 0.9,
      rotateX: 15,
      duration: 1,
      ease: "expo.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    const partnerLogos = partnersRef.current?.querySelectorAll(".partner-logo");
    if (partnerLogos && partnerLogos.length > 0) {
      gsap.fromTo(
        partnerLogos,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    gsap.to(progressBarRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);
  //! Vertical Carousel
  useGSAP(() => {
    const container = document.getElementById("partner-carousel");
    let scrollX = 0;
    const step = 200;

    const interval = setInterval(() => {
      if (!container) return;
      if (scrollX + container.clientWidth >= container.scrollWidth) {
        scrollX = 0;
      } else {
        scrollX += step;
      }
      container.scrollTo({ left: scrollX, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative font-sans">
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="h-96 w-2 bg-gray-300 rounded-full relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full"
            style={{ height: 0 }}
          ></div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="#"
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="h-screen panel bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center text-center px-4"
      >
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
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="h-screen panel bg-[#121212] text-white flex flex-col justify-center items-center px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-yellow-300 mb-6">
          Built on Culture, Rooted in Results
        </h2>
        <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
          Since 2018, Yellow Point Media has grown from a local agency into a
          leading force in digital marketing across the UAE and GCC. With deep
          cultural insight, technological expertise, and a results-first
          mindset, we help brands capture attention and deliver measurable
          impact.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="h-screen panel bg-[#1e1e1e] text-white flex flex-col justify-center items-center px-6">
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
              audiences, clients, and communities through inspiring
              storytelling, strategic innovation, and meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={(el) => {
          servicesRef.current = el;
          sectionRefs.current[2] = el;
        }}
        className="sm:h-screen panel bg-white text-black flex flex-col justify-center items-center "
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Expertise
          </h2>
          <p className="text-gray-600 text-lg">
            End-to-end digital marketing that delivers. Explore our full range
            of services tailored for brand success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            "Social Media Management",
            "Search Engine Optimization (SEO)",
            "Branding & Identity",
            "Content Strategy",
            "Paid Ads & PPC",
            "Videography & Photography",
            "Motion Graphics",
            "Website Development",
          ].map((title, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <ServiceCard
                title={title}
                description="Explore how we amplify engagement, reach, and impact with creative strategy and bold design."
              />
            </div>
          ))}
        </div>
      </section>

      {/* Our Success Partners Section */}
      <section
        ref={partnersRef}
        className="sm:h-screen panel bg-[#0f0f0f] text-white px-6 flex flex-col justify-center items-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6 text-center">
          Our Success Partners
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl text-center">
          From government entities to innovative startups, our partners trust us
          to build lasting connections through strategic media and design.
        </p>

        <div
          id="partner-carousel"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory will-change-scroll scroll-smooth px-2 w-full justify-center  pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {ourPartners.map((src, idx) => (
            <div
              key={idx}
              className="partner-logo min-w-[180px]  bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 snap-start transition-transform hover:scale-105  flex items-center justify-center relative"
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

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="h-screen panel bg-[#1a1a1a] text-white flex flex-col justify-center items-center px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-yellow-300 mb-6">
          Let’s Build Something Great
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Whether you&apos;re launching a new brand or scaling an existing one,
          we&apos;re here to help you break through. Let&apos;s start a
          conversation.
        </p>
        <form
          className="max-w-xl w-full space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105">
      <h3 className="text-xl font-bold text-yellow-500 mb-2">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed">{description}</p>
    </div>
  );
}
