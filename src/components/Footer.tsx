"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d1117",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00C896, #00a87e)", boxShadow: "0 4px 12px rgba(0,200,150,0.35)" }}
              >
                <span className="text-white font-black text-sm">I</span>
              </div>
              <span className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>Immuny</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              A UX case study redesigning Immuny's allergy emergency app to minimize
              cognitive load and save lives.
            </p>
            <a
              href="https://www.immuny.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-colors duration-200"
              style={{ color: "#00C896" }}
            >
              Visit Immuny.ai ↗
            </a>
          </div>

          {/* Case study */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Case Study
            </h4>
            <div className="space-y-2">
              {[
                { href: "#problem", label: "Problem Space" },
                { href: "#process", label: "Design Process" },
                { href: "#features", label: "Key Screens" },
                { href: "#insights", label: "User Research" },
                { href: "#design-system", label: "Design System" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#00C896")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Methods */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Methods Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "User Interviews",
                "Affinity Mapping",
                "Persona Development",
                "Journey Mapping",
                "Crazy 8s",
                "Figma Prototyping",
                "Think-Aloud Testing",
                "A/B Testing",
                "WCAG Audit",
                "Competitive Analysis",
              ].map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 text-xs rounded-md font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "24px" }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 Immuny UX Case Study · HCI 201 · USC Viterbi School of Engineering
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#00C896", boxShadow: "0 0 6px #00C896" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Built with Next.js + Tailwind · Deployed on Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
