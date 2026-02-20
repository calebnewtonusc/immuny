"use client";

import { useEffect, useRef } from "react";

const insights = [
  {
    icon: "😰",
    theme: "Panic Response",
    quote: "When I'm having a reaction, I can't read long menus. I just need one big button that says HELP.",
    participant: "P1 — 31, severe shellfish allergy",
    finding: "Users in simulated allergy scenarios had significantly slower reaction times with multi-option interfaces.",
    solution: "Emergency-first design: single dominant CTA on home screen.",
    severity: "Critical",
    color: "#FF3B30",
  },
  {
    icon: "🧩",
    theme: "Medication Confusion",
    quote: "I never know how long to wait between EpiPen doses. The timer idea would have saved me from the ER twice.",
    participant: "P4 — 19, peanut allergy",
    finding: "6 of 8 participants were unsure of the 15-minute window between epinephrine doses.",
    solution: "Built-in epinephrine countdown timer with haptic feedback.",
    severity: "High",
    color: "#FF9500",
  },
  {
    icon: "📍",
    theme: "Location Anxiety",
    quote: "I moved to a new neighborhood and have no idea where the closest ER is. That scares me every day.",
    participant: "P6 — 28, multiple food allergies",
    finding: "All participants wanted always-visible access to nearby emergency care, especially in unfamiliar areas.",
    solution: "Persistent 'Find ER' quick action on home screen with map view.",
    severity: "High",
    color: "#0071E3",
  },
  {
    icon: "🆔",
    theme: "Identity Communication",
    quote: "Paramedics couldn't read my phone because of glare and I couldn't speak. I needed something shareable.",
    participant: "P2 — 45, parent of child with allergies",
    finding: "Emergency responders need medical info quickly without device authentication barriers.",
    solution: "Lock screen accessible Medical ID with one-tap share.",
    severity: "Critical",
    color: "#8B5CF6",
  },
  {
    icon: "🍽️",
    theme: "Dining Anxiety",
    quote: "I hate eating at new restaurants. I spend 20 minutes asking staff about every ingredient.",
    participant: "P7 — 22, tree nut allergy",
    finding: "Restaurant situations were the highest-anxiety context, needing fast in-the-moment scanning.",
    solution: "One-tap food label scanner accessible from home quick actions.",
    severity: "Medium",
    color: "#00C896",
  },
  {
    icon: "👶",
    theme: "Guardian Use Case",
    quote: "My daughter is 8. I need to be able to hand my phone to a stranger and have them know exactly what to do.",
    participant: "P5 — 38, parent of child with severe allergies",
    finding: "Secondary users (parents, caregivers) need the app to be operable by non-owners in emergencies.",
    solution: "No-auth Medical ID + visual emergency protocol for bystanders.",
    severity: "High",
    color: "#FF6B35",
  },
];

const severityColors = {
  Critical: { bg: "#FF3B3012", text: "#FF3B30", border: "#FF3B3030" },
  High: { bg: "#FF950012", text: "#FF9500", border: "#FF950030" },
  Medium: { bg: "#00C89612", text: "#00C896", border: "#00C89630" },
};

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      id="insights"
      ref={sectionRef}
      className="section-pad"
      style={{ background: "#f8fffe" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 fade-in-scroll">
          <span className="tag-pill mb-4 inline-block">User Research</span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117", letterSpacing: "-1.5px" }}
          >
            8 interviews.
            <br />
            <span className="gradient-text">6 critical insights.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-12" style={{ color: "#6B7280" }}>
            We interviewed allergy sufferers, caregivers, and bystanders to understand the full
            emergency experience — and discovered the design gaps that make every second count more.
          </p>
        </div>

        {/* Research methodology bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 fade-in-scroll">
          {[
            { icon: "🎙️", num: "8", label: "User Interviews", sub: "45-60 min each" },
            { icon: "📋", num: "40+", label: "Data Points", sub: "Clustered via affinity map" },
            { icon: "⏱️", num: "3", label: "Usability Sessions", sub: "Think-aloud protocol" },
            { icon: "📊", num: "6", label: "Themes Found", sub: "Grounded theory coding" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <p
                className="text-2xl font-black mt-2 mb-0.5 gradient-text"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.num}
              </p>
              <p className="text-xs font-bold" style={{ color: "#0d1117" }}>{item.label}</p>
              <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Insight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((insight, i) => {
            const severity = severityColors[insight.severity as keyof typeof severityColors];
            return (
              <div
                key={insight.theme}
                className="fade-in-scroll glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderTop: `3px solid ${insight.color}`,
                }}
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "22px" }}>{insight.icon}</span>
                      <span
                        className="font-bold text-sm"
                        style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}
                      >
                        {insight.theme}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: severity.bg, color: severity.text, border: `1px solid ${severity.border}` }}
                    >
                      {insight.severity}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-sm italic leading-relaxed mb-3 pl-3"
                    style={{
                      color: "#374151",
                      borderLeft: `2px solid ${insight.color}`,
                    }}
                  >
                    "{insight.quote}"
                  </blockquote>
                  <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>— {insight.participant}</p>

                  {/* Finding */}
                  <div
                    className="rounded-xl p-3 mb-3"
                    style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#9CA3AF" }}>Finding</p>
                    <p className="text-xs leading-snug" style={{ color: "#4B5563" }}>{insight.finding}</p>
                  </div>

                  {/* Solution */}
                  <div
                    className="rounded-xl p-3"
                    style={{ background: `${insight.color}08`, border: `1px solid ${insight.color}20` }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wide mb-1"
                      style={{ color: insight.color }}
                    >
                      Design Solution
                    </p>
                    <p className="text-xs leading-snug" style={{ color: "#374151" }}>{insight.solution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
