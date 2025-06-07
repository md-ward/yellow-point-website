"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

const LanguageButton = ({ style }: { style: "dropDown" | "inlineSlid" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);
  const isOpen = useRef(false);

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (!toggleRef.current || !menuRef.current) return;

      const toggleMenu = () => {
        if (isOpen.current) {
          gsap.to(menuRef.current, {
            width: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            pointerEvents: "none",
          });
          //@ts-expect-error no error
          gsap.to(toggleRef.current.querySelector("svg"), {
            rotate: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        } else {
          gsap.to(menuRef.current, {
            width: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            pointerEvents: "auto",
          });
          //@ts-expect-error no error

          gsap.to(toggleRef.current.querySelector("svg"), {
            rotate: 90,
            duration: 0.3,
            ease: "power2.out",
          });
        }
        isOpen.current = !isOpen.current;
      };

      toggleRef.current.addEventListener("click", toggleMenu);

      return () => {
        toggleRef.current?.removeEventListener("click", toggleMenu);
        gsap.killTweensOf(menuRef.current);
        //@ts-expect-error no error
        gsap.killTweensOf(toggleRef.current?.querySelector("svg"));
      };
    },
    {
      scope: containerRef,
    },
  );

  const changeLocale = (locale: string) => {
    if (locale === currentLocale) return;

    const newPathname = pathname.replace(/^\/(ar|en)/, `/${locale}`);
    router.push(newPathname);

    // Close menu on selection by animating manually:
    if (menuRef.current && toggleRef.current) {
      gsap.to(menuRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
      gsap.to(toggleRef.current.querySelector("svg"), {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      isOpen.current = false;
    }
  };

  return (
    <span
      className={`bg-accent-dark cursor-pointer items-center !p-2 ${
        style === "dropDown" ? "flex flex-col-reverse" : "flex flex-row-reverse"
      } items-center gap-2 rounded-full font-medium text-white select-none dark:text-white`}
    >
      <span
        ref={toggleRef}
        className="flex h-fit w-fit flex-nowrap items-center gap-2 whitespace-nowrap"
        aria-haspopup="true"
        aria-expanded={false}
      >
        🌐 {currentLocale.toUpperCase()}
        <ChevronDown size={18} />
      </span>

      <span
        ref={menuRef}
        className="pointer-events-none ml-2 flex w-0 flex-row gap-1 overflow-hidden"
        style={{ whiteSpace: "nowrap", opacity: 0 }}
        role="menu"
      >
        {["en", "ar"].map((locale) => (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            className={`cursor-pointer rounded-xl p-1 px-2 text-sm whitespace-nowrap ${
              locale === currentLocale
                ? "bg-yellow-400 cursor-default"
                : "hover:bg-accent-dark"
            }`}
            role="menuitem"
            disabled={locale === currentLocale}
          >
            {locale === "en" ? "English" : "العربية"}
          </button>
        ))}
      </span>
    </span>
  );
};

export default LanguageButton;
