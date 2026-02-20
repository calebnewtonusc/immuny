"use client";

import { useEffect, useState } from "react";
import IPhoneMockup from "@/components/IPhoneMockup";
import AppShell from "@/components/AppShell";

export default function Home() {
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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const el = document.querySelector(".inner-scroll") as HTMLElement | null;
      if (el) el.scrollTop += e.deltaY;
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main
      className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% -10%, #0f2235 0%, #060b14 55%, #030609 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
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

      {/* Footer */}
      <div className="absolute bottom-4 z-10 flex items-center gap-3">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}>
          Tap anywhere to interact
        </p>
        <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "10px" }}>·</span>
        <a
          href="https://www.immuny.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium"
          style={{ color: "rgba(0,200,150,0.5)", letterSpacing: "0.03em", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,200,150,0.85)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,200,150,0.5)")}
        >
          immuny.ai ↗
        </a>
      </div>
    </main>
  );
}
