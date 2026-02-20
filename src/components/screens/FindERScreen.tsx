"use client";

import { ChevronLeft, MapPin, Navigation, Clock, Phone, ChevronRight } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";

interface Props {
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

const hospitals = [
  {
    name: "Keck Medical Center",
    type: "Emergency Room",
    dist: "0.8 mi",
    eta: "3 min",
    wait: "~12 min",
    address: "1500 San Pablo St",
    open: true,
    primary: true,
    color: "#FF3B30",
  },
  {
    name: "Good Samaritan Hospital",
    type: "Emergency Room",
    dist: "1.4 mi",
    eta: "5 min",
    wait: "~8 min",
    address: "1225 Wilshire Blvd",
    open: true,
    primary: false,
    color: "#FF9500",
  },
  {
    name: "Kaiser Permanente Urgent",
    type: "Urgent Care",
    dist: "1.9 mi",
    eta: "7 min",
    wait: "~25 min",
    address: "4950 Sunset Blvd",
    open: true,
    primary: false,
    color: "#0071E3",
  },
];

export default function FindERScreen({ navigate, goBack }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F5F5F7",
        fontFamily: "var(--font)",
      }}
    >
      <StatusBar />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 18px 10px" }}>
        <button
          onClick={goBack}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={18} color="#374151" strokeWidth={2.5} />
        </button>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0d1117" }}>Nearest Emergency Care</p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34C759" }} className="pulse-dot" />
            <p style={{ fontSize: "10px", color: "#6B7280", fontWeight: 500 }}>Live data · Updated now</p>
          </div>
        </div>
      </div>

      {/* Map visualization */}
      <div style={{ padding: "0 18px 12px" }}>
        <div style={{
          height: "148px",
          borderRadius: "18px",
          background: "linear-gradient(145deg, #d4edda 0%, #c8e6c9 100%)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(0,150,100,0.15)",
        }}>
          {/* Grid lines */}
          {[0, 1, 2, 3].map(i => (
            <div key={`h${i}`} style={{ position: "absolute", top: `${25 * i}%`, left: 0, right: 0, height: "1px", background: "rgba(0,100,60,0.08)" }} />
          ))}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={`v${i}`} style={{ position: "absolute", left: `${(100 / 5) * i}%`, top: 0, bottom: 0, width: "1px", background: "rgba(0,100,60,0.08)" }} />
          ))}

          {/* Route path (SVG) */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M 120 118 Q 100 90 68 50" stroke="#0071E3" strokeWidth="2" strokeDasharray="5 4" fill="none" opacity="0.7" />
          </svg>

          {/* User location */}
          <div style={{ position: "absolute", left: "37%", top: "75%", transform: "translate(-50%, -50%)" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: "#0071E3", border: "2.5px solid white",
                boxShadow: "0 0 0 4px rgba(0,113,227,0.2), 0 2px 6px rgba(0,0,0,0.2)",
              }} />
            </div>
          </div>

          {/* Hospital pins */}
          <div style={{ position: "absolute", left: "21%", top: "28%", transform: "translate(-50%, -50%)" }}>
            <div style={{
              padding: "4px 8px", background: "#FF3B30",
              borderRadius: "8px", fontSize: "9px", fontWeight: 700, color: "white",
              boxShadow: "0 2px 8px rgba(255,59,48,0.4)",
              display: "flex", alignItems: "center", gap: "3px",
            }}>
              <MapPin size={9} color="white" strokeWidth={2.5} /> ER
            </div>
          </div>
          <div style={{ position: "absolute", left: "62%", top: "40%", transform: "translate(-50%, -50%)" }}>
            <div style={{
              padding: "4px 8px", background: "#FF9500",
              borderRadius: "8px", fontSize: "9px", fontWeight: 700, color: "white",
              boxShadow: "0 2px 8px rgba(255,149,0,0.3)",
              display: "flex", alignItems: "center", gap: "3px",
            }}>
              <MapPin size={9} color="white" strokeWidth={2.5} /> ER
            </div>
          </div>
          <div style={{ position: "absolute", left: "78%", top: "62%", transform: "translate(-50%, -50%)" }}>
            <div style={{
              padding: "4px 8px", background: "#0071E3",
              borderRadius: "8px", fontSize: "9px", fontWeight: 700, color: "white",
              boxShadow: "0 2px 8px rgba(0,113,227,0.3)",
              display: "flex", alignItems: "center", gap: "3px",
            }}>
              <MapPin size={9} color="white" strokeWidth={2.5} /> UC
            </div>
          </div>

          {/* You label */}
          <div style={{ position: "absolute", left: "37%", top: "88%", transform: "translateX(-50%)", fontSize: "8px", fontWeight: 700, color: "#0071E3" }}>
            YOU
          </div>
        </div>
      </div>

      {/* Hospital list */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {hospitals.map((h) => (
            <div
              key={h.name}
              style={{
                background: "white",
                borderRadius: "16px",
                border: `1px solid ${h.primary ? `${h.color}25` : "rgba(0,0,0,0.05)"}`,
                overflow: "hidden",
                boxShadow: h.primary ? `0 2px 12px ${h.color}15` : "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ padding: "11px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Icon */}
                <div style={{
                  width: "38px", height: "38px", borderRadius: "12px",
                  background: `${h.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <MapPin size={18} color={h.color} strokeWidth={2} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "2px" }}>
                    <p style={{
                      fontSize: "12px", fontWeight: 700, color: "#0d1117",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {h.name}
                    </p>
                    {h.primary && (
                      <span style={{
                        fontSize: "7px", fontWeight: 700, padding: "1px 5px",
                        background: h.color, borderRadius: "4px", color: "white",
                        flexShrink: 0,
                      }}>
                        NEAREST
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Navigation size={9} color="#9CA3AF" strokeWidth={2} />
                      <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{h.dist}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={9} color="#9CA3AF" strokeWidth={2} />
                      <span style={{ fontSize: "10px", color: "#9CA3AF" }}>Wait {h.wait}</span>
                    </div>
                  </div>
                </div>

                {/* Go button */}
                <button style={{
                  padding: "7px 12px",
                  background: h.color,
                  borderRadius: "10px", border: "none",
                  fontSize: "11px", fontWeight: 700, color: "white",
                  flexShrink: 0,
                  boxShadow: `0 2px 8px ${h.color}40`,
                }}>
                  Go
                </button>
              </div>

              {/* Bottom row */}
              <div style={{
                padding: "7px 12px",
                borderTop: "1px solid rgba(0,0,0,0.04)",
                background: "rgba(0,0,0,0.015)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={9} color="#9CA3AF" strokeWidth={2} />
                  <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{h.address}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Phone size={9} color="#0071E3" strokeWidth={2} />
                  <span style={{ fontSize: "10px", color: "#0071E3", fontWeight: 600 }}>Call ahead</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="find-er" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
