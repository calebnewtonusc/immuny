"use client";

import { ShieldAlert, Camera, MapPin, CreditCard, Pill, ChevronRight, AlertTriangle } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; }

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

const quickActions = [
  { Icon: Camera,     label: "Scan Food",  color: "#007AFF", screen: "scanner"    as Screen },
  { Icon: MapPin,     label: "Find ER",    color: "#FF3B30", screen: "find-er"    as Screen },
  { Icon: Pill,       label: "My Meds",    color: "#FF9500", screen: "medical-id" as Screen },
  { Icon: CreditCard, label: "Medical ID", color: "#00C896", screen: "medical-id" as Screen },
];

const allergens = [
  { label: "Peanuts",    color: "#FF3B30" },
  { label: "Tree Nuts",  color: "#FF3B30" },
  { label: "Shellfish",  color: "#FF9500" },
  { label: "Dairy",      color: "#8E8E93" },
];

export default function HomeScreen({ navigate }: Props) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F2F7", fontFamily: "var(--font)" }}>
      <StatusBar />

      <div className="inner-scroll" style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px 0" }}>

          {/* Greeting */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <p style={{ fontSize: "13px", color: "#8E8E93", fontWeight: 400 }}>Good morning,</p>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.5px", lineHeight: 1.1 }}>Alex Rivera</p>
            </div>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "#00C896",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>A</span>
            </div>
          </div>

          {/* Alert */}
          <button
            onClick={() => navigate("scanner")}
            style={{
              width: "100%", marginBottom: "12px",
              padding: "11px 14px",
              background: "white",
              borderRadius: "14px",
              display: "flex", alignItems: "center", gap: "10px",
              boxShadow: CARD_SHADOW,
              border: "none", textAlign: "left",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF3B30", flexShrink: 0 }} className="pulse-dot" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#FF3B30" }}>Allergen Alert Nearby</p>
              <p style={{ fontSize: "12px", color: "#8E8E93", marginTop: "1px" }}>Possible peanut traces detected</p>
            </div>
            <ChevronRight size={16} color="#C7C7CC" strokeWidth={2} />
          </button>

          {/* Emergency button */}
          <button
            onClick={() => navigate("emergency")}
            style={{
              width: "100%", marginBottom: "12px",
              padding: "0 20px",
              height: "84px",
              background: "#FF3B30",
              borderRadius: "20px",
              display: "flex", alignItems: "center", gap: "16px",
              border: "none",
              boxShadow: "0 4px 16px rgba(255,59,48,0.28)",
              textAlign: "left",
            }}
          >
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <ShieldAlert size={24} color="white" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "17px", fontWeight: 800, color: "white", letterSpacing: "-0.2px", lineHeight: 1.1 }}>EMERGENCY HELP</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "3px", fontWeight: 400 }}>Tap for immediate assistance</p>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.5)" strokeWidth={2.5} />
          </button>

          {/* Quick actions — iOS grouped list */}
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            Quick Actions
          </p>
          <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: CARD_SHADOW, marginBottom: "12px" }}>
            {quickActions.map(({ Icon, label, color, screen }, i) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                style={{
                  width: "100%", padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "transparent", border: "none", textAlign: "left",
                  borderTop: i > 0 ? "1px solid rgba(60,60,67,0.1)" : "none",
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={color} strokeWidth={2} />
                </div>
                <span style={{ flex: 1, fontSize: "15px", fontWeight: 500, color: "#1C1C1E" }}>{label}</span>
                <ChevronRight size={16} color="#C7C7CC" strokeWidth={2} />
              </button>
            ))}
          </div>

          {/* Allergens */}
          <div style={{ background: "white", borderRadius: "16px", padding: "14px 16px", boxShadow: CARD_SHADOW, marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>My Allergens</p>
              <button style={{ fontSize: "13px", color: "#007AFF", fontWeight: 400 }}>Edit</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {allergens.map(({ label, color }) => (
                <span key={label} style={{
                  padding: "5px 11px",
                  background: `${color}12`,
                  borderRadius: "8px",
                  fontSize: "12px", fontWeight: 600, color,
                }}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
