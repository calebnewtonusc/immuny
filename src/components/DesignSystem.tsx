"use client";

import { useEffect, useRef } from "react";

const colors = [
  { name: "Emergency Red", hex: "#FF3B30", usage: "Emergency actions, danger alerts, critical allergens" },
  { name: "Mint Green", hex: "#00C896", usage: "Safe states, success, primary brand actions" },
  { name: "Ocean Blue", hex: "#0071E3", usage: "Navigation, maps, informational states" },
  { name: "Alert Orange", hex: "#FF9500", usage: "Warnings, cautions, secondary alerts" },
  { name: "Royal Purple", hex: "#8B5CF6", usage: "Medical ID, profile, secondary features" },
  { name: "Night Navy", hex: "#0d1117", usage: "Dark mode base, high-contrast text" },
  { name: "Cloud Gray", hex: "#F3F4F6", usage: "Backgrounds, dividers, inactive states" },
  { name: "Text Gray", hex: "#6B7280", usage: "Body text, labels, secondary information" },
];

const typography = [
  { name: "Display XL", size: "52px", weight: "800", font: "DM Sans", usage: "Page titles, hero headings" },
  { name: "Display L", size: "36px", weight: "700", font: "DM Sans", usage: "Section headings" },
  { name: "Display M", size: "24px", weight: "700", font: "DM Sans", usage: "Card titles, screen headers" },
  { name: "Body L", size: "16px", weight: "400", font: "Inter", usage: "Primary body text" },
  { name: "Body M", size: "14px", weight: "400", font: "Inter", usage: "Secondary text, descriptions" },
  { name: "Label", size: "12px", weight: "600", font: "Inter", usage: "Tags, badges, captions" },
  { name: "Micro", size: "10px", weight: "600", font: "Inter", usage: "Status bars, metadata, timestamps" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

const principles = [
  {
    icon: "⚡",
    title: "Immediate Clarity",
    description: "Every screen has one primary action. Visual hierarchy guides users without conscious decision-making.",
    rule: "1 primary CTA per screen, 3x minimum size difference from secondary",
  },
  {
    icon: "🎨",
    title: "Semantic Color",
    description: "Colors carry meaning, not just aesthetics. Red = danger, green = safe, orange = caution — always consistent.",
    rule: "No color used for decoration that could conflict with semantic meaning",
  },
  {
    icon: "📐",
    title: "Touch-First Layout",
    description: "All interactive elements meet Apple's 44pt minimum touch target. Thumb zones are respected in layout.",
    rule: "Minimum 44x44pt touch targets, critical actions in thumb reachable zone",
  },
  {
    icon: "♿",
    title: "WCAG AA Accessibility",
    description: "Every text-background combination meets WCAG 2.1 AA contrast. Emergency states meet AAA.",
    rule: "4.5:1 normal text, 7:1 for emergency critical information",
  },
];

export default function DesignSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-in-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 60);
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
      id="design-system"
      ref={sectionRef}
      className="section-pad"
      style={{ background: "#fafafa" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-scroll">
          <span className="tag-pill mb-4 inline-block">Design System</span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117", letterSpacing: "-1.5px" }}
          >
            A system built for
            <span className="gradient-text"> high stakes</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Every design token — color, type, spacing — was chosen with purpose.
            This isn't a typical app. Every decision can affect someone's life.
          </p>
        </div>

        {/* Design Principles */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {principles.map((principle, i) => (
            <div
              key={principle.title}
              className="fade-in-scroll glass-card rounded-2xl p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(0,200,150,0.1)" }}
                >
                  {principle.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}>
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#6B7280" }}>
                    {principle.description}
                  </p>
                  <p
                    className="text-xs font-mono px-3 py-2 rounded-lg"
                    style={{ background: "rgba(0,200,150,0.08)", color: "#00a87e", border: "1px solid rgba(0,200,150,0.15)" }}
                  >
                    ↳ {principle.rule}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Color palette */}
        <div className="mb-16 fade-in-scroll">
          <h3
            className="text-2xl font-black mb-6"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117" }}
          >
            Color System
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colors.map((color) => (
              <div key={color.hex} className="group">
                <div
                  className="h-20 rounded-2xl mb-3 relative overflow-hidden transition-transform duration-200 group-hover:scale-105"
                  style={{ background: color.hex }}
                >
                  {/* Contrast checker */}
                  <div
                    className="absolute bottom-2 right-2 text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      color: "white",
                      fontSize: "10px",
                    }}
                  >
                    {color.hex}
                  </div>
                </div>
                <p className="text-sm font-bold" style={{ color: "#0d1117" }}>{color.name}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: "#9CA3AF" }}>{color.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography scale */}
        <div className="mb-16 fade-in-scroll glass-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <h3
              className="text-2xl font-black"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117" }}
            >
              Type Scale
            </h3>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
              Inter for UI, DM Sans for display — both optimized for screen readability
            </p>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
            {typography.map((type) => (
              <div key={type.name} className="flex items-center gap-6 px-6 py-4">
                <div className="w-20 flex-shrink-0">
                  <p className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>{type.name}</p>
                  <p className="text-xs" style={{ color: "#C4C9D4" }}>{type.font}</p>
                </div>
                <p
                  className="flex-1"
                  style={{
                    fontSize: parseInt(type.size) > 24 ? "24px" : type.size,
                    fontWeight: parseInt(type.weight),
                    fontFamily: type.font === "DM Sans" ? "var(--font-dm-sans)" : "var(--font-inter)",
                    color: "#0d1117",
                    lineHeight: 1.2,
                  }}
                >
                  Aa
                </p>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(0,0,0,0.04)", color: "#6B7280" }}>
                    {type.size}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(0,0,0,0.04)", color: "#6B7280" }}>
                    {type.weight}
                  </span>
                </div>
                <p className="text-xs hidden lg:block" style={{ color: "#9CA3AF", width: "160px" }}>{type.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div className="fade-in-scroll">
          <h3
            className="text-2xl font-black mb-6"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#0d1117" }}
          >
            Spacing Scale
          </h3>
          <div className="flex items-end gap-4 flex-wrap">
            {spacing.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div
                  style={{
                    width: `${Math.min(size * 1.2, 80)}px`,
                    height: `${Math.min(size * 1.2, 80)}px`,
                    background: "linear-gradient(135deg, #00C896, #00a87e)",
                    borderRadius: "6px",
                    opacity: 0.15 + (size / 64) * 0.85,
                  }}
                />
                <span className="text-xs font-mono font-bold" style={{ color: "#9CA3AF" }}>{size}pt</span>
              </div>
            ))}
          </div>
          <p className="text-sm mt-4" style={{ color: "#9CA3AF" }}>
            4pt base grid — every spacing value is a multiple of 4 for consistent rhythm and alignment.
          </p>
        </div>
      </div>
    </section>
  );
}
