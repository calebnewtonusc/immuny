"use client";

import { ShieldAlert, Camera, MapPin, CreditCard, Pill, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; }

const S = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

const quickActions = [
  { Icon: Camera,     label: "Scan Food",  sub: "Check ingredients", screen: "scanner"    as Screen },
  { Icon: MapPin,     label: "Find ER",    sub: "Nearest emergency", screen: "find-er"    as Screen },
  { Icon: Pill,       label: "My Meds",    sub: "EpiPen · Benadryl", screen: "medical-id" as Screen },
  { Icon: CreditCard, label: "Medical ID", sub: "Share instantly",   screen: "medical-id" as Screen },
];

const allergens = ["Peanuts", "Tree Nuts", "Shellfish", "Dairy"];

const recentScans = [
  { name: "Trader Joe's Granola Bar", danger: true,  time: "2h ago"     },
  { name: "Kind Oats & Honey Bar",    danger: false, time: "Yesterday"  },
  { name: "RxBar Blueberry",          danger: false, time: "2 days ago" },
];

export default function HomeScreen({ navigate }: Props) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F2F7", fontFamily: "var(--font)" }}>
      <StatusBar />

      <div className="inner-scroll" style={{ flex: 1 }}>
        <div style={{ padding: "10px 16px 0" }}>

          {/* Greeting */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "13px", color: "#8E8E93" }}>Good morning,</p>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.5px", lineHeight: 1.1 }}>Alex Rivera</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#00C896", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>A</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "11px", height: "11px", borderRadius: "50%", background: "#34C759", border: "2px solid #F2F2F7" }} />
            </div>
          </div>

          {/* Alert banner */}
          <button
            onClick={() => navigate("scanner")}
            style={{ width: "100%", marginBottom: "10px", padding: "11px 14px", background: "white", borderRadius: "14px", display: "flex", alignItems: "center", gap: "10px", boxShadow: S, border: "none", textAlign: "left" }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF3B30", flexShrink: 0 }} className="pulse-dot" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#FF3B30" }}>Allergen Alert Nearby</p>
              <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>Peanut traces detected · Tap to scan</p>
            </div>
            <ChevronRight size={16} color="#C7C7CC" strokeWidth={2} />
          </button>

          {/* Emergency button */}
          <button
            onClick={() => navigate("emergency")}
            style={{ width: "100%", marginBottom: "14px", padding: "0 18px", height: "88px", background: "#FF3B30", borderRadius: "20px", display: "flex", alignItems: "center", gap: "14px", border: "none", boxShadow: "0 4px 16px rgba(255,59,48,0.28)", textAlign: "left" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldAlert size={22} color="white" strokeWidth={2} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "-0.2px", whiteSpace: "nowrap" }}>Emergency Help</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginTop: "2px", whiteSpace: "nowrap" }}>Immediate assistance</p>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.5)" strokeWidth={2.5} />
          </button>

          {/* Quick actions 2x2 grid */}
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Quick Actions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            {quickActions.map(({ Icon, label, sub, screen }) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                style={{ background: "white", borderRadius: "16px", padding: "14px", border: "none", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", boxShadow: S, textAlign: "left" }}
              >
                <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={19} color="#3C3C43" strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>{label}</p>
                  <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Recent scans */}
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Recent Scans</p>
          <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: S, marginBottom: "14px" }}>
            {recentScans.map(({ name, danger, time }, i) => (
              <button
                key={name}
                onClick={() => navigate("scanner")}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "11px 16px", borderTop: i > 0 ? "1px solid rgba(60,60,67,0.1)" : "none", background: "transparent", border: "none", textAlign: "left" }}
              >
                {danger
                  ? <AlertCircle size={16} color="#FF3B30" strokeWidth={2} style={{ flexShrink: 0 }} />
                  : <CheckCircle2 size={16} color="#34C759" strokeWidth={2} style={{ flexShrink: 0 }} />
                }
                <p style={{ flex: 1, fontSize: "13px", fontWeight: 500, color: "#1C1C1E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
                  <Clock size={10} color="#C7C7CC" strokeWidth={2} />
                  <span style={{ fontSize: "11px", color: "#8E8E93" }}>{time}</span>
                </div>
              </button>
            ))}
          </div>

          {/* My Allergens */}
          <div style={{ background: "white", borderRadius: "16px", padding: "14px 16px", boxShadow: S, marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>My Allergens</p>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#00C896" }}>4 tracked</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {allergens.map(label => (
                <span key={label} style={{ padding: "5px 11px", background: "rgba(0,0,0,0.05)", borderRadius: "8px", fontSize: "12px", fontWeight: 500, color: "#3C3C43" }}>{label}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <BottomNav active="home" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
