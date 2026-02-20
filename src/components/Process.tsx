"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Empathize",
    subtitle: "Research & Discovery",
    color: "#0071E3",
    icon: "🔍",
    description: "Conducted 8 semi-structured user interviews with allergy sufferers aged 18-45. Performed competitive analysis of 6 similar apps. Analyzed 200+ App Store reviews for pain patterns.",
    methods: ["User Interviews", "Competitive Analysis", "App Review Analysis"],
    output: "Affinity diagram with 40+ insights grouped into 5 themes",
  },
  {
    num: "02",
    title: "Define",
    subtitle: "Problem Framing",
    color: "#8B5CF6",
    icon: "🎯",
    description: "Created 3 persona archetypes representing our core users. Mapped the complete emergency experience through journey mapping. Defined 2 core HMW statements to guide ideation.",
    methods: ["Persona Development", "Journey Mapping", "HMW Statements"],
    output: "Primary persona: \"Emergency Alex\" — 24, severe nut allergy, high anxiety",
  },
  {
    num: "03",
    title: "Ideate",
    subtitle: "Concept Generation",
    color: "#FF9500",
    icon: "💡",
    description: "Ran 2 ideation workshops generating 80+ concepts using Crazy 8s. Prioritized 12 features using an impact/effort matrix. Sketched 3 distinct navigation architectures.",
    methods: ["Crazy 8s", "Impact/Effort Matrix", "Architecture Sketches"],
    output: "12 prioritized feature concepts across 4 core flows",
  },
  {
    num: "04",
    title: "Prototype",
    subtitle: "Design & Build",
    color: "#00C896",
    icon: "🎨",
    description: "Built 5 key screens in Figma with a custom component library. Established a medical-grade color system with WCAG AA compliance. Created interactive prototypes for all 3 main flows.",
    methods: ["Figma Prototyping", "Component Library", "Color Accessibility Testing"],
    output: "35-screen prototype with 3 interactive user flows",
  },
  {
    num: "05",
    title: "Test",
    subtitle: "Validation & Iteration",
    color: "#FF3B30",
    icon: "✅",
    description: "Conducted think-aloud sessions with 5 participants. Measured task completion time and error rates. Ran A/B test on emergency button placement with 20 remote users.",
    methods: ["Think-Aloud Testing", "Task Analysis", "A/B Testing"],
    output: "Task completion time reduced from 12s to 2.1s on emergency flow",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-pad"
      style={{ background: "#f8fffe" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-scroll">
          <span className="tag-pill mb-4 inline-block">Design Process</span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117", letterSpacing: "-1.5px" }}
          >
            How we solved it
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6B7280" }}>
            A full double-diamond design process grounded in real user research and
            validated through iterative testing.
          </p>
        </div>

        {/* Process timeline */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="fade-in-scroll group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ border: `1px solid ${step.color}20` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left accent */}
                  <div
                    className="sm:w-48 p-6 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3"
                    style={{ background: `${step.color}08` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${step.color}15` }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <p
                        className="text-3xl font-black"
                        style={{ color: step.color, fontFamily: "var(--font-dm-sans)", opacity: 0.4 }}
                      >
                        {step.num}
                      </p>
                      <p className="font-black text-lg leading-tight" style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}>
                        {step.title}
                      </p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: "#9CA3AF" }}>{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="flex-1 p-6">
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {step.methods.map((method) => (
                        <span
                          key={method}
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `${step.color}10`,
                            color: step.color,
                            border: `1px solid ${step.color}20`,
                          }}
                        >
                          {method}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex items-start gap-2 rounded-xl p-3"
                      style={{ background: `${step.color}08`, border: `1px solid ${step.color}15` }}
                    >
                      <span style={{ fontSize: "14px", marginTop: "1px" }}>📌</span>
                      <p className="text-xs leading-snug font-medium" style={{ color: "#4B5563" }}>
                        <strong style={{ color: step.color }}>Output:</strong> {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="flex justify-start sm:justify-center py-2 pl-6 sm:pl-0">
                  <div
                    style={{
                      width: "2px",
                      height: "24px",
                      background: `linear-gradient(to bottom, ${step.color}40, ${steps[i + 1].color}40)`,
                      borderRadius: "1px",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
