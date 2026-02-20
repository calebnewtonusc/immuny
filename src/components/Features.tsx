"use client";

import { useState, useEffect, useRef } from "react";
import IPhoneMockup from "./IPhoneMockup";
import { HomeScreen, EmergencyScreen, ScannerScreen, FindERScreen, MedicalIDScreen } from "./AppScreens";

const features = [
  {
    screen: HomeScreen,
    label: "Dashboard",
    title: "Emergency-First Dashboard",
    description: "The redesigned home screen puts the emergency button front and center — unavoidable, immediately tappable, with no visual noise competing for attention. Users can reach emergency help in a single tap.",
    improvements: [
      "Emergency button 3x larger than original",
      "Allergen alerts surfaced automatically",
      "4 quick actions accessible within 1 tap",
      "Personalized greeting reduces cognitive distance",
    ],
    metric: { before: "7 taps", after: "1 tap", label: "to reach emergency help" },
    color: "#00C896",
  },
  {
    screen: EmergencyScreen,
    label: "Emergency Mode",
    title: "Crisis-State UI",
    description: "When activated, the entire app enters an emergency state with maximum contrast, minimum choices, and a clear protocol. The epinephrine timer, next steps, and 911 shortcut eliminate decision fatigue.",
    improvements: [
      "Full-screen red alert removes distractions",
      "Epinephrine timer prevents second-dose errors",
      "Step-by-step protocol reduces cognitive load",
      "One-tap 911 connection is always visible",
    ],
    metric: { before: "23%", after: "97%", label: "task success rate" },
    color: "#FF3B30",
  },
  {
    screen: ScannerScreen,
    label: "Food Scanner",
    title: "Instant Allergen Detection",
    description: "A redesigned scanner with real-time visual feedback and clear allergen flags. Safe alternatives are surfaced immediately, and the UI uses consistent color coding so users never have to think about what red means.",
    improvements: [
      "Camera viewfinder with clear scan guides",
      "Color-coded allergen severity levels",
      "Immediate safe alternative suggestions",
      "Results readable in under 2 seconds",
    ],
    metric: { before: "8.2s", after: "1.9s", label: "time to read scan result" },
    color: "#0071E3",
  },
  {
    screen: FindERScreen,
    label: "Find ER",
    title: "Nearest Emergency Care",
    description: "Visual map + sorted list view with wait times, distances, and one-tap navigation. The interface adapts to emergency context, hiding irrelevant info and highlighting the fastest path to care.",
    improvements: [
      "Map + list hybrid view for context",
      "Real-time ER wait time display",
      "Nearest facility automatically highlighted",
      "One tap to start navigation",
    ],
    metric: { before: "4 screens", after: "1 screen", label: "to find nearest ER" },
    color: "#FF9500",
  },
  {
    screen: MedicalIDScreen,
    label: "Medical ID",
    title: "Shareable Medical Identity",
    description: "A professional medical card that can be shared instantly with responders. Allergens, medications, blood type, and emergency contacts are displayed in a scannable, high-contrast format — designed for strangers to read under stress.",
    improvements: [
      "Shareable via link, NFC, or screenshot",
      "WCAG AAA contrast for emergency readability",
      "Critical information in top 1/3 of screen",
      "One-tap emergency contact calling",
    ],
    metric: { before: "Not accessible", after: "2 seconds", label: "to share Medical ID" },
    color: "#8B5CF6",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const feature = features[activeFeature];
  const ActiveScreen = feature.screen;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-pad"
      style={{ background: "#0d1117" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-scroll">
          <span
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(0,200,150,0.15)", color: "#00C896", border: "1px solid rgba(0,200,150,0.25)" }}
          >
            The Redesign
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "white", letterSpacing: "-1.5px" }}
          >
            5 screens.
            <span className="gradient-text"> Infinite clarity.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Each screen redesigned from first principles with one goal: get the right
            information in front of the right person in under 2 seconds.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-2 justify-center flex-wrap mb-12 fade-in-scroll">
          {features.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFeature(i)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeFeature === i ? f.color : "rgba(255,255,255,0.07)",
                color: activeFeature === i ? "white" : "rgba(255,255,255,0.5)",
                border: activeFeature === i ? `1px solid ${f.color}` : "1px solid rgba(255,255,255,0.1)",
                boxShadow: activeFeature === i ? `0 4px 16px ${f.color}40` : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main feature display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* iPhone */}
          <div className="flex justify-center fade-in-scroll">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "-40px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${feature.color}25 0%, transparent 70%)`,
                  filter: "blur(20px)",
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <IPhoneMockup size="lg" key={activeFeature}>
                  <ActiveScreen />
                </IPhoneMockup>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-scroll">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: `${feature.color}18`, color: feature.color, border: `1px solid ${feature.color}30` }}
            >
              Screen {activeFeature + 1} of {features.length}
            </div>

            <h3
              className="text-3xl sm:text-4xl font-black mb-4 leading-tight"
              style={{ fontFamily: "var(--font-dm-sans)", color: "white", letterSpacing: "-0.5px" }}
            >
              {feature.title}
            </h3>

            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              {feature.description}
            </p>

            {/* Improvements */}
            <div className="space-y-3 mb-8">
              {feature.improvements.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${feature.color}20` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: feature.color }} />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Before/After metric */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Impact Metric
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs mb-1" style={{ color: "rgba(255,59,48,0.8)" }}>BEFORE</p>
                  <p
                    className="text-2xl font-black"
                    style={{ color: "#FF5A4E", fontFamily: "var(--font-dm-sans)", textDecoration: "line-through", opacity: 0.6 }}
                  >
                    {feature.metric.before}
                  </p>
                </div>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: `${feature.color}20` }}
                >
                  <span style={{ color: feature.color, fontSize: "14px" }}>→</span>
                </div>
                <div className="text-center">
                  <p className="text-xs mb-1" style={{ color: "rgba(0,200,150,0.8)" }}>AFTER</p>
                  <p
                    className="text-2xl font-black"
                    style={{ color: feature.color, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {feature.metric.after}
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{feature.metric.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
