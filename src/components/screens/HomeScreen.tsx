"use client";

import { AlertTriangle, Camera, MapPin, CreditCard, Pill, ChevronRight, Bell, ShieldAlert } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";

interface Props {
  navigate: (screen: Screen) => void;
}

export default function HomeScreen({ navigate }: Props) {
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

      {/* Scrollable content */}
      <div className="inner-scroll" style={{ flex: 1 }}>
        <div style={{ padding: "8px 18px 16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <p style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 500 }}>Good morning,</p>
              <p style={{ fontSize: "19px", fontWeight: 800, color: "#0d1117", letterSpacing: "-0.4px", lineHeight: 1.1 }}>Alex Rivera</p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "white", border: "1px solid rgba(0,0,0,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Bell size={16} color="#374151" strokeWidth={1.8} />
              </button>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #00C896, #00a87e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,200,150,0.3)",
              }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "white" }}>A</span>
              </div>
            </div>
          </div>

          {/* Alert banner */}
          <button
            onClick={() => navigate("scanner")}
            style={{
              width: "100%", marginBottom: "14px", padding: "10px 14px",
              background: "rgba(255,59,48,0.07)",
              borderRadius: "14px", border: "1px solid rgba(255,59,48,0.18)",
              display: "flex", alignItems: "center", gap: "10px", textAlign: "left",
            }}
          >
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#FF3B30", flexShrink: 0,
            }} className="pulse-dot" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#FF3B30", letterSpacing: "0.03em" }}>
                ALLERGEN ALERT
              </p>
              <p style={{ fontSize: "10px", color: "#9B7A7A", marginTop: "1px" }}>
                Possible peanut traces detected nearby
              </p>
            </div>
            <ChevronRight size={14} color="#FF3B30" strokeWidth={2.5} />
          </button>

          {/* Emergency button */}
          <button
            onClick={() => navigate("emergency")}
            style={{
              width: "100%", marginBottom: "16px",
              padding: "18px 16px",
              background: "linear-gradient(135deg, #FF3B30 0%, #FF6040 100%)",
              borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px",
              boxShadow: "0 8px 28px rgba(255,59,48,0.38), 0 3px 10px rgba(255,59,48,0.25)",
              border: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Pulse ring behind */}
            <div style={{
              position: "absolute",
              width: "60px", height: "60px", borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
            }} className="emergency-ring" />
            <ShieldAlert size={24} color="white" strokeWidth={2} />
            <span style={{ fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "0.02em" }}>
              EMERGENCY HELP
            </span>
          </button>

          {/* Quick actions */}
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
            Quick Actions
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {[
              { icon: Camera,     label: "Scan Food",   sub: "Check ingredients",  color: "#0071E3", bg: "#EFF6FF", screen: "scanner"    as Screen },
              { icon: MapPin,     label: "Find ER",     sub: "Nearest emergency",   color: "#FF9500", bg: "#FFF7ED", screen: "find-er"    as Screen },
              { icon: Pill,       label: "My Meds",     sub: "EpiPen & more",       color: "#8B5CF6", bg: "#F5F3FF", screen: "medical-id" as Screen },
              { icon: CreditCard, label: "Medical ID",  sub: "Share with responders",color: "#00C896", bg: "#F0FDF9", screen: "medical-id" as Screen },
            ].map(({ icon: Icon, label, sub, color, bg, screen }) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                style={{
                  padding: "13px 12px",
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  textAlign: "left",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px",
                  background: bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={17} color={color} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#0d1117", lineHeight: 1.2 }}>{label}</p>
                  <p style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "1px" }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Allergen profile */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0d1117" }}>My Allergens</p>
              <button style={{ fontSize: "11px", fontWeight: 600, color: "#00C896" }}>Edit</button>
            </div>
            <div style={{ padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                { label: "Peanuts", severity: "severe" },
                { label: "Tree Nuts", severity: "severe" },
                { label: "Shellfish", severity: "moderate" },
                { label: "Dairy", severity: "mild" },
              ].map(({ label, severity }) => (
                <span key={label} style={{
                  padding: "4px 10px",
                  borderRadius: "99px",
                  fontSize: "10px",
                  fontWeight: 600,
                  background: severity === "severe" ? "rgba(255,59,48,0.1)" : severity === "moderate" ? "rgba(255,149,0,0.1)" : "rgba(107,114,128,0.1)",
                  color: severity === "severe" ? "#FF3B30" : severity === "moderate" ? "#FF9500" : "#6B7280",
                  border: `1px solid ${severity === "severe" ? "rgba(255,59,48,0.2)" : severity === "moderate" ? "rgba(255,149,0,0.2)" : "rgba(107,114,128,0.15)"}`,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
