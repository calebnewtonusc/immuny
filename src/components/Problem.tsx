"use client";

import { useEffect, useRef } from "react";

const problems = [
  {
    icon: "🧠",
    title: "Cognitive Overload",
    description: "The original UI presented too many options simultaneously, making it impossible to act quickly during an allergic reaction.",
    stat: "7+ clicks",
    statLabel: "to reach emergency help",
    color: "#FF9500",
  },
  {
    icon: "👁️",
    title: "Poor Visual Hierarchy",
    description: "Critical actions like \"Emergency Help\" had no visual priority, blending in with secondary features on the same screen.",
    stat: "Low contrast",
    statLabel: "failed WCAG 2.1 AA",
    color: "#FF3B30",
  },
  {
    icon: "⏱️",
    title: "Slow Emergency Access",
    description: "Users struggled to find allergy information and nearby hospitals during timed usability tests, causing dangerous delays.",
    stat: "12 seconds",
    statLabel: "average task completion",
    color: "#0071E3",
  },
  {
    icon: "📱",
    title: "Non-Emergency-First Design",
    description: "The app prioritized general features over emergency workflows, inverting what matters most for allergy sufferers.",
    stat: "0 of 8",
    statLabel: "users found it intuitive",
    color: "#8B5CF6",
  },
];

const stats = [
  { num: "200K+", label: "Anaphylaxis cases per year in the US" },
  { num: "30 min", label: "Window to administer epinephrine" },
  { num: "1 in 13", label: "Children have food allergies" },
  { num: "40%", label: "Of patients don't carry their EpiPen" },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="problem" ref={sectionRef} className="section-pad" style={{ background: "#fafafa" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-scroll">
          <span className="tag-pill mb-4 inline-block">The Problem Space</span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117", letterSpacing: "-1.5px" }}
          >
            Allergic reactions don't wait
            <br />
            for <span className="gradient-text">good UX</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Our research uncovered critical usability failures in Immuny's original design
            that could have life-threatening consequences in emergency situations.
          </p>
        </div>

        {/* Stats banner */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 fade-in-scroll"
          style={{
            background: "linear-gradient(135deg, #0d1117 0%, #1a2332 100%)",
            borderRadius: "24px",
            padding: "32px 24px",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.num} className="text-center" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <p
                className="text-3xl font-black mb-1"
                style={{ fontFamily: "var(--font-dm-sans)", color: "#00C896" }}
              >
                {stat.num}
              </p>
              <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className="fade-in-scroll glass-card rounded-2xl p-6 group hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: `${problem.color}15` }}
                >
                  {problem.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
                    {problem.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: `${problem.color}12`, border: `1px solid ${problem.color}25` }}
                  >
                    <span
                      className="text-sm font-black"
                      style={{ color: problem.color, fontFamily: "var(--font-dm-sans)" }}
                    >
                      {problem.stat}
                    </span>
                    <span className="text-xs" style={{ color: problem.color, opacity: 0.8 }}>
                      {problem.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research quote */}
        <div
          className="mt-12 fade-in-scroll rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,200,150,0.08) 0%, rgba(0,200,150,0.03) 100%)",
            border: "1px solid rgba(0,200,150,0.2)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
            style={{ background: "linear-gradient(to bottom, #00C896, #00a87e)" }}
          />
          <p
            className="text-xl sm:text-2xl font-semibold italic mb-4 pl-4"
            style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}
          >
            "I panicked when I couldn't find the emergency button — I thought I was going to have a reaction and couldn't get help fast enough."
          </p>
          <p className="text-sm font-medium pl-4" style={{ color: "#9CA3AF" }}>
            — Participant P3, User Interview · Age 24, peanut allergy since childhood
          </p>
        </div>
      </div>
    </section>
  );
}
