"use client";

import { useState, useEffect } from "react";
import IPhoneMockup from "./IPhoneMockup";
import { HomeScreen, EmergencyScreen, ScannerScreen, FindERScreen, MedicalIDScreen } from "./AppScreens";

const screens = [HomeScreen, EmergencyScreen, ScannerScreen, FindERScreen, MedicalIDScreen];
const screenLabels = ["Home", "Emergency", "Scanner", "Find ER", "Medical ID"];

export default function Hero() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveScreen(prev => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ActiveScreen = screens[activeScreen];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f0fdf9 0%, #fafafa 40%, #f0f4ff 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)",
        }} />
        {/* Grid dots */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(0,200,150,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text content */}
          <div
            className="flex-1 text-center lg:text-left"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="tag-pill">
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00C896", display: "inline-block" }} />
                HCI 201 · UX Case Study
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117", letterSpacing: "-2px" }}
            >
              Designed for
              <span className="block gradient-text">emergencies.</span>
              Built for{" "}
              <span style={{ color: "#0d1117" }}>humans.</span>
            </h1>

            <p
              className="text-lg sm:text-xl mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ color: "#4B5563" }}
            >
              A UX redesign of <strong>Immuny's allergy emergency app</strong>,
              focused on minimizing cognitive load and enabling faster response
              when every second counts.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mb-10">
              {[
                { num: "60M+", label: "Americans with allergies" },
                { num: "8 users", label: "Interviewed" },
                { num: "5 screens", label: "Redesigned" },
              ].map((stat) => (
                <div key={stat.num} className="text-center lg:text-left">
                  <p className="text-2xl font-black gradient-text" style={{ fontFamily: "var(--font-dm-sans)" }}>{stat.num}</p>
                  <p className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#features"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #00C896, #00a87e)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(0,200,150,0.35)",
                }}
              >
                Explore Redesign
              </a>
              <a
                href="#process"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  background: "white",
                  color: "#0d1117",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                View Process
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
              {["Figma", "Usability Testing", "User Interviews", "Cognitive Load", "Color Systems"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(0,0,0,0.04)", color: "#6B7280", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* iPhone mockup */}
          <div
            className="relative flex-shrink-0"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Ambient glow behind phone */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,200,150,0.25) 0%, transparent 70%)",
                filter: "blur(40px)",
                transform: "scale(1.4)",
              }}
            />

            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              <IPhoneMockup size="lg">
                <ActiveScreen />
              </IPhoneMockup>
            </div>

            {/* Screen selector dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {screenLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveScreen(i)}
                  className="transition-all duration-300 rounded-full font-semibold text-xs"
                  title={label}
                  style={{
                    padding: activeScreen === i ? "4px 12px" : "4px 4px",
                    width: activeScreen === i ? "auto" : "8px",
                    height: "8px",
                    background: activeScreen === i ? "#00C896" : "rgba(0,0,0,0.15)",
                    color: "white",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {activeScreen === i ? label : ""}
                </button>
              ))}
            </div>

            {/* Floating annotation */}
            <div
              className="absolute -right-4 sm:-right-16 top-1/4"
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.06)",
                minWidth: "140px",
                transform: "translateX(0)",
                animation: "float 6s ease-in-out infinite 1s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontSize: "14px" }}>🧠</span>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#0d1117" }}>Cognitive Load</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: "#E5E7EB", overflow: "hidden" }}>
                  <div style={{ width: "25%", height: "100%", background: "#00C896", borderRadius: "2px" }} />
                </div>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "#00C896" }}>-75%</span>
              </div>
              <p style={{ fontSize: "9px", color: "#9CA3AF", marginTop: "2px" }}>vs original design</p>
            </div>

            {/* Floating annotation 2 */}
            <div
              className="absolute -left-4 sm:-left-16 bottom-1/3"
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.06)",
                minWidth: "130px",
                animation: "float 6s ease-in-out infinite 2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                <span style={{ fontSize: "14px" }}>⚡</span>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#0d1117" }}>Response Time</span>
              </div>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#FF3B30", lineHeight: 1 }}>2.1s</p>
              <p style={{ fontSize: "9px", color: "#9CA3AF", marginTop: "1px" }}>avg to emergency action</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>Scroll to explore</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, #9CA3AF, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
