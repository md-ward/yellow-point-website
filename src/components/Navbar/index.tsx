"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Circle, Menu, X } from "lucide-react";

const Navbar = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Home");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Animate navbar entrance
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Menu open and close animations
  const openMenu = () => {
    setMenuOpen(true);
    gsap.to(menuRef.current, {
      y: 0,
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      pointerEvents: "auto",
    });
    gsap.fromTo(
      ".menu-link",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.2,
        duration: 0.4,
        ease: "power3.out",
      }
    );
  };

  const closeMenu = () =>
    new Promise<void>((resolve) => {
      setMenuOpen(false);
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        pointerEvents: "none",
        onComplete: () => resolve(),
      });
    });

  // Navigation logic
  const handleNavClick = async (href: string) => {
    await closeMenu();
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (href === "/") {
      document.body.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  // ESC key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Route change closes menu
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (menuOpen) closeMenu();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="flex fixed items-center justify-between px-6 py-4  top-0 w-full z-[100]   h-20  "
      >
        <div className="text-2xl capitalize font-bold flex items-center transition-colors duration-300">
          <p className="text-yellow-400">yellow</p>
          <p
            className={`ml-1 nav-brand-text transition-colors duration-300 text-white`}
          >
            point
          </p>
          <Circle
            size={18}
            className={`ml-2 nav-circle transition-colors duration-300 text-yellow-400 fill-yellow-400`}
          />
        </div>

        <button
          onClick={menuOpen ? closeMenu : openMenu}
          className="hover:scale-110 transition cursor-pointer z-[201]"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu
              className="menu-icon text-white transition-colors duration-300"
              size={28}
            />
          )}
        </button>
      </nav>

      {/* BACKGROUND OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full flex  h-full bg-black/40 z-[150] opacity-0 pointer-events-none backdrop-blur-sm"
      />

      {/* MENU PANEL */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-full bg-yellow-300 text-black z-[200] flex flex-col items-center justify-center space-y-6 translate-y-[-100%] opacity-0 pointer-events-none"
      >
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-black hover:scale-110 transition cursor-pointer"
        >
          <X size={32} />
        </button>

        <button
          onClick={() => handleNavClick("/")}
          className="menu-link text-4xl font-semibold hover:text-yellow-600 transition"
        >
          {t("nav.home")}
        </button>
        <button
          onClick={() => handleNavClick("#about")}
          className="menu-link text-4xl font-semibold hover:text-yellow-600 transition"
        >
          {t("nav.about")}
        </button>
        <div className="relative  w-full flex items-center justify-center">
          <button
            onClick={() => handleNavClick("#services")}
            className="menu-link  text-4xl font-semibold w-fit hover:text-yellow-600 transition"
          >
            {t("nav.services")}
          </button>
        </div>
        <button
          onClick={() => handleNavClick("#partners")}
          className="menu-link  text-4xl font-semibold w-fit hover:text-yellow-600 transition"
        >
          {t("nav.partners")}
        </button>
        <button
          onClick={() => handleNavClick("#contact")}
          className="menu-link text-2xl mt-6 bg-black text-yellow-300 px-6 py-2 rounded-full hover:scale-105 transition"
        >
          {t("nav.contact")}
        </button>
      </div>
    </>
  );
};

export default Navbar;
