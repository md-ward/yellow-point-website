"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations, useLocale } from "next-intl";

const InitialAlert = () => {
  const [visible, setVisible] = useState(false);
  const alertRef = useRef(null);
  const t = useTranslations("Alert");
  const locale = useLocale();

  useGSAP(() => {
    if (visible && alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [visible]);

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenInitialAlert");
    if (!seen) {
      setVisible(true);
      localStorage.setItem("hasSeenInitialAlert", "true");
    }
  }, []);

  const handleDismiss = () => {
    gsap.to(alertRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={alertRef}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    >
      <div className="bg-white text-black max-w-lg w-full p-6 rounded-2xl shadow-2xl border border-yellow-400 text-center space-y-4 mx-4">
        <h2 className="text-2xl font-bold text-yellow-500">{t("title")}</h2>
        <p className="text-base sm:text-lg">{t("message")}</p>
        <button
          onClick={handleDismiss}
          className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
};

export default InitialAlert;
