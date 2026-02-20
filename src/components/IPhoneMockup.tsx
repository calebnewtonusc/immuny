"use client";

import { ReactNode } from "react";

interface IPhoneMockupProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { outer: "w-52 h-[430px]", inner: "rounded-[34px]", island: "w-20 h-6 top-2", islandRounded: "rounded-[14px]" },
  md: { outer: "w-64 h-[530px]", inner: "rounded-[40px]", island: "w-24 h-7 top-2.5", islandRounded: "rounded-[18px]" },
  lg: { outer: "w-72 h-[590px]", inner: "rounded-[44px]", island: "w-28 h-8 top-3", islandRounded: "rounded-[20px]" },
};

export default function IPhoneMockup({ children, className = "", size = "md" }: IPhoneMockupProps) {
  const s = sizes[size];

  return (
    <div className={`relative ${s.outer} ${className}`} style={{
      background: "linear-gradient(145deg, #2c2c2e 0%, #1a1a1c 50%, #0d0d0f 100%)",
      borderRadius: size === "lg" ? "50px" : size === "md" ? "46px" : "40px",
      boxShadow: `
        0 0 0 1.5px #3a3a3c,
        0 0 0 3px #1c1c1e,
        0 40px 80px rgba(0,0,0,0.45),
        0 20px 40px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.08),
        inset 0 0 0 1px rgba(255,255,255,0.04)
      `,
      padding: "12px",
    }}>
      {/* Right power button */}
      <div style={{
        position: "absolute",
        right: "-4px",
        top: "120px",
        width: "4px",
        height: "64px",
        background: "linear-gradient(to right, #2c2c2e, #444446)",
        borderRadius: "0 3px 3px 0",
      }} />
      {/* Left volume buttons */}
      <div style={{
        position: "absolute",
        left: "-4px",
        top: "88px",
        width: "4px",
        height: "34px",
        background: "linear-gradient(to left, #2c2c2e, #444446)",
        borderRadius: "3px 0 0 3px",
      }} />
      <div style={{
        position: "absolute",
        left: "-4px",
        top: "134px",
        width: "4px",
        height: "64px",
        background: "linear-gradient(to left, #2c2c2e, #444446)",
        borderRadius: "3px 0 0 3px",
      }} />
      <div style={{
        position: "absolute",
        left: "-4px",
        top: "210px",
        width: "4px",
        height: "64px",
        background: "linear-gradient(to left, #2c2c2e, #444446)",
        borderRadius: "3px 0 0 3px",
      }} />

      {/* Screen */}
      <div className={`w-full h-full bg-black ${s.inner} overflow-hidden relative`}>
        {/* Dynamic Island */}
        <div
          className={`absolute ${s.island} left-1/2 -translate-x-1/2 bg-black z-20 ${s.islandRounded}`}
          style={{ boxShadow: "0 0 0 1.5px #1c1c1e" }}
        />
        {/* Screen content */}
        <div className="w-full h-full relative z-10">
          {children}
        </div>
      </div>

      {/* Reflection sheen */}
      <div className="absolute inset-0 pointer-events-none" style={{
        borderRadius: "inherit",
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
      }} />
    </div>
  );
}
