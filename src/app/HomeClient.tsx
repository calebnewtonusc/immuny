"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import IPhoneMockup from "@/components/IPhoneMockup";
import AppShell from "@/components/AppShell";

export default function HomeClient() {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const phoneH = 740;
      const phoneW = 345;
      const scaleH = (window.innerHeight - 40) / phoneH;
      const scaleW = (window.innerWidth - 40) / phoneW;
      setScale(Math.min(1, scaleH, scaleW));
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    const el = document.querySelector(".inner-scroll") as HTMLElement | null;
    if (el) el.scrollTop += e.deltaY;
  };

  return (
    <main
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% -10%, #0f2235 0%, #060b14 55%, #030609 100%)",
      }}
      onWheel={handleWheel}
    >
      {/* Logo, top left */}
      <a
        href="https://www.immuny.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-5 left-5 z-20 group"
      >
        <Image
          src="/immuny-logo.avif"
          alt="Immuny"
          width={120}
          height={120}
          className="rounded-2xl object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          unoptimized
        />
      </a>

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.1) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(8px)",
        }}
      />

      {/* Phone */}
      <div
        className="z-10 phone-float"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <IPhoneMockup>
          <AppShell />
        </IPhoneMockup>
      </div>

      {/* immuny.ai, right of phone */}
      <a
        href="https://www.immuny.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-10"
        style={{
          right: "32px", top: "50%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", textOrientation: "mixed",
          fontSize: "11px", fontWeight: 500,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em", textDecoration: "none",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,200,150,0.7)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
      >
        immuny.ai ↗
      </a>
    </main>
  );
}
