"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Phone, MapPin, Share2, CheckCircle2, AlertTriangle } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const TOTAL = 15 * 60;

export default function EmergencyScreen({ navigate, goBack }: Props) {
  const [seconds, setSeconds] = useState(TOTAL);
  const [doneStep, setDoneStep] = useState(-1);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const progress = seconds / TOTAL;

  const R = 56;
  const circumference = 2 * Math.PI * R;
  const dash = circumference * progress;

  const steps = [
    "Administer EpiPen into outer thigh",
    "Call 911 immediately",
    "Lay flat, elevate legs if possible",
    "Stay awake, stay calm, stay still",
  ];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000000", fontFamily: "var(--font)" }}>
      <StatusBar dark />

      {/* Back */}
      <button
        onClick={goBack}
        style={{
          position: "absolute", top: "56px", left: "16px",
          display: "flex", alignItems: "center", gap: "4px",
          padding: "6px 12px", borderRadius: "99px",
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "13px", fontWeight: 500,
          zIndex: 10,
        }}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
        Back
      </button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 16px 0", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "40px", marginBottom: "20px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 12px", borderRadius: "99px",
            background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.3)",
            marginBottom: "8px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF3B30" }} className="pulse-dot" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#FF3B30", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Emergency Active
            </span>
          </div>
          <p style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
            Epinephrine Administered
          </p>
        </div>

        {/* Circular timer */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ position: "relative", width: "140px", height: "140px" }}>
            <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <circle
                cx="70" cy="70" r={R}
                fill="none" stroke="#FF3B30" strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - dash}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <p style={{ fontSize: "32px", fontWeight: 800, color: "white", letterSpacing: "-1px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                {mins}:{secs}
              </p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px" }}>
                Next Dose
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{
          background: "#1C1C1E",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "14px",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 16px 8px" }}>
            Protocol
          </p>
          {steps.map((step, i) => {
            const done = i <= doneStep;
            return (
              <button
                key={step}
                onClick={() => setDoneStep(i)}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 16px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: "transparent", border: "none", textAlign: "left",
                }}
              >
                {done
                  ? <CheckCircle2 size={20} color="#34C759" strokeWidth={2} style={{ flexShrink: 0 }} />
                  : (
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                      background: i === doneStep + 1 ? "#FF3B30" : "rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: i === doneStep + 1 ? "white" : "rgba(255,255,255,0.3)" }}>{i + 1}</span>
                    </div>
                  )
                }
                <span style={{
                  fontSize: "13px",
                  fontWeight: done ? 400 : (i === doneStep + 1 ? 600 : 400),
                  color: done ? "rgba(255,255,255,0.4)" : (i === doneStep + 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"),
                  textDecoration: done ? "line-through" : "none",
                }}>
                  {step}
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          <a href="tel:911" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "12px 8px",
              background: "#FF3B30", borderRadius: "14px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              boxShadow: "0 4px 14px rgba(255,59,48,0.35)",
            }}>
              <Phone size={20} color="white" strokeWidth={2} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>Call 911</span>
            </div>
          </a>
          <button
            onClick={() => navigate("find-er")}
            style={{
              padding: "12px 8px", background: "#1C1C1E", borderRadius: "14px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              border: "none",
            }}
          >
            <MapPin size={20} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Find ER</span>
          </button>
          <button
            onClick={() => navigate("medical-id")}
            style={{
              padding: "12px 8px", background: "#1C1C1E", borderRadius: "14px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              border: "none",
            }}
          >
            <Share2 size={20} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Share ID</span>
          </button>
        </div>
      </div>

      <div style={{ height: "20px" }} />
    </div>
  );
}
