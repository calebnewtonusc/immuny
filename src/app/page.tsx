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

      {/* Header text */}
      <div
        className="mb-5 text-center z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="flex items-center gap-2 justify-center mb-1.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00C896, #00a87e)",
              boxShadow: "0 0 20px rgba(0,200,150,0.4)",
            }}
          >
            <span className="text-white font-black text-xs">I</span>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Immuny</span>
        </div>
        <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
          UX REDESIGN — INTERACTIVE PROTOTYPE
        </p>
      </div>

      {/* Phone */}
      <div
        className="z-10 phone-float"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <IPhoneMockup>
          <AppShell />
        </IPhoneMockup>
      </div>

      {/* Footer hint */}
      <p
        className="absolute bottom-4 text-xs z-10"
        style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}
      >
        Tap anywhere to interact
      </p>
    </main>
  );
}
