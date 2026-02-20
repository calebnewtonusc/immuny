"use client";

import { ChevronLeft, MapPin, Navigation, Clock, Phone } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

const hospitals = [
  { name: "Keck Medical Center",     type: "Emergency Room",  dist: "0.8 mi", eta: "3 min", wait: "12 min", badge: "NEAREST", badgeColor: "#FF3B30" },
  { name: "Good Samaritan Hospital", type: "Emergency Room",  dist: "1.4 mi", eta: "5 min", wait: "8 min",  badge: null,      badgeColor: "#FF9500" },
  { name: "Kaiser Permanente",       type: "Urgent Care",     dist: "1.9 mi", eta: "7 min", wait: "25 min", badge: null,      badgeColor: "#007AFF" },
];

export default function FindERScreen({ navigate, goBack }: Props) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F2F7", fontFamily: "var(--font)" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 12px" }}>
        <button onClick={goBack} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none" }}>
          <ChevronLeft size={18} color="#1C1C1E" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E" }}>Nearest Emergency Care</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34C759" }} className="pulse-dot" />
            <p style={{ fontSize: "11px", color: "#8E8E93" }}>Live · Updated now</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{
          height: "144px", borderRadius: "16px",
          background: "#E8F5EA",
          position: "relative", overflow: "hidden",
          boxShadow: CARD_SHADOW,
        }}>
          {/* Subtle grid */}
          {[1, 2, 3].map(i => (
            <div key={`h${i}`} style={{ position: "absolute", top: `${25 * i}%`, left: 0, right: 0, height: "1px", background: "rgba(0,100,60,0.08)" }} />
          ))}
          {[1, 2, 3, 4].map(i => (
            <div key={`v${i}`} style={{ position: "absolute", left: `${20 * i}%`, top: 0, bottom: 0, width: "1px", background: "rgba(0,100,60,0.08)" }} />
          ))}

          {/* Route */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M 112 116 Q 90 85 65 46" stroke="#007AFF" strokeWidth="2.5" strokeDasharray="5 4" fill="none" opacity="0.6" />
          </svg>

          {/* You */}
          <div style={{ position: "absolute", left: "35%", top: "72%", transform: "translate(-50%,-50%)" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#007AFF", border: "2.5px solid white", boxShadow: "0 0 0 4px rgba(0,122,255,0.18), 0 2px 6px rgba(0,0,0,0.2)" }} />
          </div>
          <p style={{ position: "absolute", left: "35%", top: "85%", transform: "translateX(-50%)", fontSize: "8px", fontWeight: 700, color: "#007AFF" }}>YOU</p>

          {/* Pins */}
          {[
            { left: "20%", top: "26%", label: "ER", color: "#FF3B30" },
            { left: "60%", top: "38%", label: "ER", color: "#FF9500" },
            { left: "76%", top: "60%", label: "UC", color: "#007AFF" },
          ].map(({ left, top, label, color }) => (
            <div key={label + left} style={{ position: "absolute", left, top, transform: "translate(-50%,-50%)" }}>
              <div style={{
                padding: "3px 7px", background: color, borderRadius: "7px",
                fontSize: "9px", fontWeight: 700, color: "white",
                boxShadow: `0 2px 6px ${color}50`,
                display: "flex", alignItems: "center", gap: "2px",
              }}>
                <MapPin size={8} color="white" strokeWidth={2.5} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital list */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 16px" }}>
        <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: CARD_SHADOW }}>
          {hospitals.map(({ name, type, dist, eta, wait, badge, badgeColor }, i) => (
            <div key={name} style={{ borderTop: i > 0 ? "1px solid rgba(60,60,67,0.1)" : "none" }}>
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "12px",
                  background: `${badgeColor}12`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <MapPin size={18} color={badgeColor} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1C1C1E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {name}
                    </p>
                    {badge && (
                      <span style={{ fontSize: "8px", fontWeight: 700, padding: "1px 5px", background: badgeColor, borderRadius: "5px", color: "white", flexShrink: 0 }}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Navigation size={10} color="#8E8E93" strokeWidth={2} />
                      <span style={{ fontSize: "11px", color: "#8E8E93" }}>{dist} · {eta}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={10} color="#8E8E93" strokeWidth={2} />
                      <span style={{ fontSize: "11px", color: "#8E8E93" }}>Wait {wait}</span>
                    </div>
                  </div>
                </div>
                <button style={{
                  padding: "7px 14px", background: badgeColor, borderRadius: "10px",
                  border: "none", fontSize: "13px", fontWeight: 600, color: "white", flexShrink: 0,
                }}>
                  Go
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call ahead hint */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px" }}>
          <Phone size={12} color="#8E8E93" strokeWidth={2} />
          <p style={{ fontSize: "11px", color: "#8E8E93" }}>Tap a location to call ahead before arriving</p>
        </div>
      </div>

      <BottomNav active="find-er" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
