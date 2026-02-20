"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#process", label: "Process" },
  { href: "#features", label: "Features" },
  { href: "#insights", label: "Insights" },
  { href: "#design-system", label: "Design" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,250,250,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00C896, #00a87e)", boxShadow: "0 4px 12px rgba(0,200,150,0.35)" }}
          >
            <span className="text-white font-black text-sm">I</span>
          </div>
          <span className="font-bold text-base" style={{ color: "#0d1117", fontFamily: "var(--font-dm-sans)" }}>
            Immuny
          </span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full hidden sm:inline"
            style={{ background: "rgba(0,200,150,0.1)", color: "#00a87e", border: "1px solid rgba(0,200,150,0.2)" }}
          >
            UX Case Study
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="animated-underline text-sm font-medium transition-colors duration-200"
              style={{ color: "#374151" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00C896")}
              onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.immuny.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #00C896, #00a87e)", color: "white", boxShadow: "0 2px 12px rgba(0,200,150,0.3)" }}
          >
            Visit Immuny ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-0.5 w-5 transition-all duration-300 rounded-full"
            style={{ background: "#0d1117", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{ background: "#0d1117", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{ background: "#0d1117", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "320px" : "0",
          background: "rgba(250,250,250,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: menuOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium"
              style={{ color: "#374151" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.immuny.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2.5 rounded-full text-center mt-2"
            style={{ background: "linear-gradient(135deg, #00C896, #00a87e)", color: "white" }}
          >
            Visit Immuny ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
