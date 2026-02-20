"use client";

import { useState } from "react";
import { ChevronLeft, AlertCircle, CheckCircle2, ScanLine, Zap, RefreshCw, ChevronRight } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
type ScanState = "idle" | "scanning" | "danger" | "safe";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

export default function ScannerScreen({ navigate, goBack }: Props) {
  const [state, setState] = useState<ScanState>("idle");

  const scan = () => {
    setState("scanning");
    setTimeout(() => setState("danger"), 2400);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000000", fontFamily: "var(--font)" }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 12px" }}>
        <button
          onClick={goBack}
          style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none",
          }}
        >
          <ChevronLeft size={18} color="rgba(255,255,255,0.7)" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "white" }}>Food Scanner</p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>Point at food label or barcode</p>
        </div>
        <button
          style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", border: "none",
          }}
          onClick={scan}
        >
          <Zap size={15} color="rgba(255,255,255,0.6)" strokeWidth={2} />
        </button>
      </div>

      {/* Viewfinder */}
      <div style={{ padding: "0 16px 14px" }}>
        <div style={{
          height: "176px", borderRadius: "18px",
          background: state === "idle" ? "rgba(255,255,255,0.03)" : state === "scanning" ? "rgba(0,200,150,0.03)" : "rgba(255,59,48,0.04)",
          border: `1.5px solid ${state === "scanning" ? "rgba(0,200,150,0.45)" : state === "danger" ? "rgba(255,59,48,0.45)" : "rgba(255,255,255,0.08)"}`,
          position: "relative", overflow: "hidden",
          transition: "border-color 0.3s ease, background 0.3s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Corner brackets */}
          {[
            { top: 14, left: 14 },
            { top: 14, right: 14 },
            { bottom: 14, left: 14 },
            { bottom: 14, right: 14 },
          ].map((pos, i) => {
            const top = "top" in pos;
            const left = "left" in pos;
            return (
              <div key={i} style={{
                position: "absolute", width: "22px", height: "22px",
                ...pos,
                borderTop: (top ? "3px" : undefined) + (top ? " solid" : ""),
                borderBottom: (!top ? "3px" : undefined) + (!top ? " solid" : ""),
                borderLeft: (left ? "3px" : undefined) + (left ? " solid" : ""),
                borderRight: (!left ? "3px" : undefined) + (!left ? " solid" : ""),
                borderColor: state === "scanning" ? "#00C896" : state === "danger" ? "#FF3B30" : "rgba(255,255,255,0.3)",
                transition: "border-color 0.3s ease",
              }} />
            );
          })}

          {/* Scan line */}
          {state === "scanning" && (
            <div
              className="scan-line"
              style={{
                position: "absolute", left: "14px", right: "14px", height: "2px",
                background: "linear-gradient(to right, transparent, #00C896, transparent)",
                boxShadow: "0 0 10px rgba(0,200,150,0.7)",
              }}
            />
          )}

          {/* Center */}
          {state === "idle" && (
            <div style={{ textAlign: "center" }}>
              <ScanLine size={32} color="rgba(255,255,255,0.15)" strokeWidth={1.5} />
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}>Ready to scan</p>
            </div>
          )}
          {state === "scanning" && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "2.5px solid rgba(0,200,150,0.2)",
                borderTop: "2.5px solid #00C896",
                margin: "0 auto 8px",
                animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ fontSize: "12px", color: "#00C896", fontWeight: 500 }}>Analyzing ingredients...</p>
            </div>
          )}
          {(state === "danger" || state === "safe") && (
            <div style={{ textAlign: "center" }}>
              {state === "danger"
                ? <AlertCircle size={36} color="#FF3B30" strokeWidth={2} />
                : <CheckCircle2 size={36} color="#34C759" strokeWidth={2} />
              }
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 16px" }}>
        {state === "idle" && (
          <button
            onClick={scan}
            style={{
              width: "100%", height: "52px",
              background: "#00C896", borderRadius: "14px", border: "none",
              fontSize: "15px", fontWeight: 600, color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <ScanLine size={18} color="white" strokeWidth={2.5} />
            Scan Now
          </button>
        )}

        {state === "scanning" && (
          <div style={{
            padding: "14px 16px", background: "#1C1C1E",
            borderRadius: "14px", textAlign: "center",
          }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
              Checking against your allergen profile...
            </p>
          </div>
        )}

        {state === "danger" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Danger result */}
            <div style={{ padding: "14px 16px", background: "#1C1C1E", borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <AlertCircle size={18} color="#FF3B30" strokeWidth={2} />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#FF3B30" }}>Allergen Detected</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>Trader Joe's Granola Bar · 1.8oz</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Peanuts", "Tree Nuts", "May contain: Milk"].map(a => (
                  <span key={a} style={{
                    padding: "4px 10px",
                    background: "rgba(255,59,48,0.15)",
                    borderRadius: "8px",
                    fontSize: "11px", fontWeight: 600, color: "#FF5A4E",
                  }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Safe alternatives */}
            <div style={{ background: "#1C1C1E", borderRadius: "16px", overflow: "hidden" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 16px 8px" }}>
                Safe Alternatives
              </p>
              {["Kind Oats & Honey Bar", "RxBar Blueberry"].map((item, i) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 16px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckCircle2 size={14} color="#34C759" strokeWidth={2.5} />
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{item}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#34C759", fontWeight: 600 }}>Safe</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setState("idle")}
              style={{
                width: "100%", height: "48px",
                background: "#1C1C1E", borderRadius: "14px", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)",
              }}
            >
              <RefreshCw size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
              Scan Again
            </button>
          </div>
        )}
      </div>

      <BottomNav active="scanner" navigate={(s) => navigate(s as Screen)} dark />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
