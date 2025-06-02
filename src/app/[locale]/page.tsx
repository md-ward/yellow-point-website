"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { useTranslations } from "next-intl";
import { SplitText } from "gsap/SplitText";
import HeroSection from "./sections/main";
import AboutSection from "./sections/about";
import MissionAndVision from "./sections/missionAndVision";
import ServicesSection from "./sections/servicesSection";
import PartnersSection from "./sections/partners";
import ContactSection from "./sections/contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // const t = useTranslations("Home");

  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const missionAndVisionRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const partnersRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const wrapper = document.getElementById("wrapper");
    const heroContentContainer = document.getElementById(
      "hero-content-container"
    );
    const logoTitle = document.getElementById("hero-logo-title");
    const logoTitleSplitted = new SplitText(logoTitle, { type: "words" });
    tl.to(wrapper, {
      opacity: 100,
    });

    tl.from([logoTitleSplitted.words, logoTitle?.children[1]], {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "back.inOut",
      stagger: 0.3,
    });
    tl.to([logoTitleSplitted.words, logoTitle?.children[1]], {
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "back.inOut",
      stagger: 0.3,
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
    if (heroContentContainer && heroContentContainer.children[2]) {
      tl.to(heroContentContainer.children[2], {
        scale: 1.2,
        duration: 0.3,
        color: "white",
        ease: "back.inOut",

        onComplete: () => {
          gsap.to(heroContentContainer.children[2], {
            scale: 1,
            duration: 0.4,
            color: "black",
            ease: "back.inOut",
          });
        },
      });
    }
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".panel");

    panels.forEach((panel) => {
      ScrollTrigger.create({
        anticipatePin: 1,
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
    <div className="overflow-hidden relative font-sans !w-screen">
      <div className="hidden md:fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="h-96 w-2 bg-gray-300 rounded-full relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full"
            style={{ height: 0 }}
          ></div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection sectionRefs={heroRef} />
      <AboutSection sectionRefs={aboutRef} />
      <MissionAndVision sectionRefs={missionAndVisionRef} />
      <ServicesSection sectionRefs={servicesRef} />
      <PartnersSection sectionRefs={partnersRef} />
      <ContactSection sectionRefs={contactRef} />
    </div>
  );
}
