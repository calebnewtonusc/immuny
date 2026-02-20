"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Phone, MapPin, Share2, Clock, CheckCircle2 } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";

interface Props {
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

const TOTAL_SECONDS = 15 * 60; // 15 minutes

export default function EmergencyScreen({ navigate, goBack }: Props) {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const progress = seconds / TOTAL_SECONDS;

  const steps = [
    "Administer EpiPen into outer thigh",
    "Call 911 immediately",
    "Lay flat — elevate legs if possible",
    "Stay still, stay calm, stay awake",
    "Second dose ready at timer end",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0d0408",
        fontFamily: "var(--font)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(255,40,30,0.22) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <StatusBar dark />

      {/* Back button */}
      <button
        onClick={goBack}
        style={{
          position: "absolute", top: "56px", left: "18px",
          display: "flex", alignItems: "center", gap: "4px",
          padding: "6px 10px", borderRadius: "99px",
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "12px", fontWeight: 600,
          zIndex: 10,
        }}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
        Back
      </button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 20px 0", zIndex: 5 }}>
        {/* Emergency header */}
        <div style={{ textAlign: "center", paddingTop: "36px", marginBottom: "18px" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: "10px" }}>
            {/* Pulse rings */}
            <div style={{
              position: "absolute", inset: "-12px",
              borderRadius: "50%", border: "2px solid rgba(255,59,48,0.3)",
            }} className="emergency-ring" />
            <div style={{
              position: "absolute", inset: "-24px",
              borderRadius: "50%", border: "2px solid rgba(255,59,48,0.15)",
              animationDelay: "0.4s",
            }} className="emergency-ring" />
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(255,59,48,0.2)",
              border: "2px solid rgba(255,59,48,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF3B30" }} />
            </div>
          </div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,59,48,0.9)", letterSpacing: "0.12em", marginBottom: "2px" }}>
            EMERGENCY ACTIVE
          </p>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
            Epinephrine Administered
          </p>
        </div>

        {/* Timer */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: "20px",
          padding: "16px 20px",
          marginBottom: "14px",
          border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Progress bar at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
            background: "rgba(255,255,255,0.06)",
          }}>
            <div style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: `linear-gradient(to right, #FF3B30, #FF9500)`,
              transition: "width 1s linear",
              borderRadius: "0 2px 2px 0",
            }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "4px" }}>
            <Clock size={12} color="rgba(255,255,255,0.45)" />
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Time to Next Dose
            </p>
          </div>
          <p style={{
            fontSize: "52px", fontWeight: 900, color: "white",
            letterSpacing: "-3px", lineHeight: 1, fontVariantNumeric: "tabular-nums",
          }}>
            {mins}:{secs}
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>minutes remaining</p>
        </div>

        {/* Steps */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.07)",
          overflow: "hidden",
          marginBottom: "14px",
        }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "10px 14px 6px" }}>
            Protocol
          </p>
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 14px",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: step === i ? "rgba(255,59,48,0.12)" : "transparent",
                textAlign: "left",
              }}
            >
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                background: i <= step ? "#FF3B30" : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i < step
                  ? <CheckCircle2 size={12} color="white" strokeWidth={2.5} />
                  : <span style={{ fontSize: "10px", fontWeight: 700, color: i <= step ? "white" : "rgba(255,255,255,0.4)" }}>{i + 1}</span>
                }
              </div>
              <span style={{
                fontSize: "12px",
                fontWeight: i <= step ? 600 : 400,
                color: i <= step ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
              }}>
                {s}
              </span>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          <a
            href="tel:911"
            style={{
              padding: "12px 8px",
              background: "#FF3B30",
              borderRadius: "14px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(255,59,48,0.4)",
            }}
          >
            <Phone size={18} color="white" strokeWidth={2} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "white" }}>Call 911</span>
          </a>
          <button
            onClick={() => navigate("find-er")}
            style={{
              padding: "12px 8px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
            }}
          >
            <MapPin size={18} color="rgba(255,255,255,0.85)" strokeWidth={2} />
            <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Find ER</span>
          </button>
          <button
            onClick={() => navigate("medical-id")}
            style={{
              padding: "12px 8px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
            }}
          >
            <Share2 size={18} color="rgba(255,255,255,0.85)" strokeWidth={2} />
            <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Share ID</span>
          </button>
        </div>
      </div>

      {/* Bottom safe area */}
      <div style={{ height: "24px" }} />
    </div>
  );
}
