"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Phone, MapPin, Share2, CheckCircle2, MessageCircle, UserCheck } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const TOTAL = 15 * 60;

const steps = [
  {
    title: "Administer EpiPen",
    detail: "Outer thigh · Hold 10 seconds · Remove cap first",
  },
  {
    title: "Call 911 immediately",
    detail: "Tell them: severe allergic reaction, EpiPen given",
  },
  {
    title: "Lay flat, elevate legs",
    detail: "Do not stand or walk · Keep airways clear",
  },
  {
    title: "Stay still and calm",
    detail: "Second dose may be needed after 5–15 min",
  },
];

export default function EmergencyScreen({ navigate, goBack }: Props) {
  const [seconds, setSeconds] = useState(TOTAL);
  const [doneStep, setDoneStep] = useState(-1);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setNotified(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const progress = seconds / TOTAL;
  const R = 52;
  const circumference = 2 * Math.PI * R;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000000", fontFamily: "var(--font)" }}>
      <StatusBar dark />

      {/* Back */}
      <button
        onClick={goBack}
        style={{ position: "absolute", top: "56px", left: "16px", display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px", borderRadius: "99px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500, zIndex: 10, border: "none" }}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
        Back
      </button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 16px 0", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "36px", marginBottom: "16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "99px", background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.3)", marginBottom: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF3B30" }} className="pulse-dot" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#FF3B30", letterSpacing: "0.08em", textTransform: "uppercase" }}>Emergency Active</span>
          </div>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>Epinephrine Administered</p>
        </div>

        {/* Timer + Contacts row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
          {/* Circular timer */}
          <div style={{ position: "relative", width: "120px", height: "120px", flexShrink: 0 }}>
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <circle cx="60" cy="60" r={R} fill="none" stroke="#FF3B30" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={circumference - circumference * progress}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: "26px", fontWeight: 800, color: "white", letterSpacing: "-1px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{mins}:{secs}</p>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Next Dose</p>
            </div>
          </div>

          {/* Contacts notified */}
          <div style={{ flex: 1, background: "#1C1C1E", borderRadius: "14px", padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <UserCheck size={13} color={notified ? "#34C759" : "#8E8E93"} strokeWidth={2} />
              <p style={{ fontSize: "11px", fontWeight: 600, color: notified ? "#34C759" : "#8E8E93" }}>
                {notified ? "Contacts Notified" : "Notifying..."}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "white" }}>M</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mom</p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{notified ? "Notified 3s ago" : "Sending..."}</p>
              </div>
              {notified && <CheckCircle2 size={13} color="#34C759" strokeWidth={2.5} />}
            </div>
            <a href="tel:+12135550189" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", background: "rgba(52,199,89,0.12)", borderRadius: "8px", padding: "6px 0", textDecoration: "none" }}>
              <Phone size={11} color="#34C759" strokeWidth={2} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#34C759" }}>Call Now</span>
            </a>
          </div>
        </div>

        {/* Protocol steps */}
        <div style={{ background: "#1C1C1E", borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", padding: "10px 16px 6px" }}>Protocol</p>
          {steps.map(({ title, detail }, i) => {
            const done = i <= doneStep;
            const active = i === doneStep + 1;
            return (
              <button
                key={title}
                onClick={() => setDoneStep(i)}
                style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 16px", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", textAlign: "left" }}
              >
                {done
                  ? <CheckCircle2 size={18} color="#34C759" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
                  : (
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "1px", background: active ? "#FF3B30" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: active ? "white" : "rgba(255,255,255,0.25)" }}>{i + 1}</span>
                    </div>
                  )
                }
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: done ? 400 : (active ? 600 : 400), color: done ? "rgba(255,255,255,0.3)" : (active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)"), textDecoration: done ? "line-through" : "none" }}>{title}</p>
                  {active && <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px", lineHeight: 1.4 }}>{detail}</p>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          <a href="tel:911" style={{ textDecoration: "none" }}>
            <div style={{ padding: "11px 8px", background: "#FF3B30", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", boxShadow: "0 4px 14px rgba(255,59,48,0.3)" }}>
              <Phone size={18} color="white" strokeWidth={2} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>Call 911</span>
            </div>
          </a>
          <button onClick={() => navigate("find-er")} style={{ padding: "11px 8px", background: "#1C1C1E", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", border: "none" }}>
            <MapPin size={18} color="rgba(255,255,255,0.65)" strokeWidth={2} />
            <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Find ER</span>
          </button>
          <button onClick={() => navigate("medical-id")} style={{ padding: "11px 8px", background: "#1C1C1E", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", border: "none" }}>
            <Share2 size={18} color="rgba(255,255,255,0.65)" strokeWidth={2} />
            <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Share ID</span>
          </button>
        </div>
      </div>
      <div style={{ height: "16px" }} />
    </div>
  );
}
