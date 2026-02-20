"use client";

import { useState } from "react";
import { ChevronLeft, AlertCircle, CheckCircle2, ScanLine, Flashlight, RefreshCw } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
type ScanState = "idle" | "scanning" | "danger" | "safe";

interface Props {
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

export default function ScannerScreen({ navigate, goBack }: Props) {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [flash, setFlash] = useState(false);

  const handleScan = () => {
    setScanState("scanning");
    setTimeout(() => setScanState("danger"), 2200);
  };

  const handleReset = () => setScanState("idle");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0d1117",
        fontFamily: "var(--font)",
      }}
    >
      <StatusBar dark />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 18px 12px" }}>
        <button
          onClick={goBack}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={18} color="rgba(255,255,255,0.8)" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Food Scanner</p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>Point at food label or barcode</p>
        </div>
        <button
          onClick={() => setFlash(f => !f)}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: flash ? "rgba(255,235,0,0.2)" : "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Flashlight size={16} color={flash ? "#FFD60A" : "rgba(255,255,255,0.6)"} strokeWidth={2} />
        </button>
      </div>

      {/* Viewfinder */}
      <div style={{ padding: "0 18px 12px" }}>
        <div style={{
          height: "180px",
          borderRadius: "20px",
          background: scanState === "scanning" ? "rgba(0,200,150,0.04)" : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${scanState === "scanning" ? "rgba(0,200,150,0.5)" : scanState === "danger" ? "rgba(255,59,48,0.5)" : "rgba(255,255,255,0.1)"}`,
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
        }}>
          {/* Corner brackets */}
          {[
            { top: 10, left: 10,   borderTop: "2.5px solid",  borderLeft: "2.5px solid"  },
            { top: 10, right: 10,  borderTop: "2.5px solid",  borderRight: "2.5px solid" },
            { bottom: 10, left: 10,  borderBottom: "2.5px solid", borderLeft: "2.5px solid"  },
            { bottom: 10, right: 10, borderBottom: "2.5px solid", borderRight: "2.5px solid" },
          ].map((style, i) => (
            <div key={i} style={{
              position: "absolute", width: "20px", height: "20px",
              borderColor: scanState === "scanning" ? "#00C896" : scanState === "danger" ? "#FF3B30" : "rgba(255,255,255,0.4)",
              ...style,
            }} />
          ))}

          {/* Scan line */}
          {scanState === "scanning" && (
            <div
              className="scan-line"
              style={{
                position: "absolute", left: 0, right: 0, height: "2px",
                background: "linear-gradient(to right, transparent, #00C896, transparent)",
                boxShadow: "0 0 8px rgba(0,200,150,0.8)",
              }}
            />
          )}

          {/* Center content */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "8px",
          }}>
            {scanState === "idle" && (
              <>
                <ScanLine size={28} color="rgba(255,255,255,0.25)" strokeWidth={1.5} />
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Ready to scan</p>
              </>
            )}
            {scanState === "scanning" && (
              <>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  border: "3px solid rgba(0,200,150,0.3)",
                  borderTop: "3px solid #00C896",
                  animation: "spin 0.8s linear infinite",
                }} />
                <p style={{ fontSize: "11px", color: "#00C896", fontWeight: 600 }}>Analyzing...</p>
              </>
            )}
            {(scanState === "danger" || scanState === "safe") && (
              <div style={{ textAlign: "center" }}>
                {scanState === "danger"
                  ? <AlertCircle size={32} color="#FF3B30" strokeWidth={2} />
                  : <CheckCircle2 size={32} color="#00C896" strokeWidth={2} />
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results / Scan button */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 18px" }}>
        {scanState === "idle" && (
          <button
            onClick={handleScan}
            style={{
              width: "100%", padding: "16px",
              background: "linear-gradient(135deg, #00C896, #00a87e)",
              borderRadius: "16px", border: "none",
              fontSize: "14px", fontWeight: 700, color: "white",
              boxShadow: "0 4px 20px rgba(0,200,150,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <ScanLine size={18} color="white" strokeWidth={2.5} />
            Scan Now
          </button>
        )}

        {scanState === "scanning" && (
          <div style={{
            padding: "14px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "16px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Checking against your allergen profile...</p>
          </div>
        )}

        {scanState === "danger" && (
          <div>
            {/* Danger card */}
            <div style={{
              marginBottom: "10px",
              padding: "14px",
              background: "rgba(255,59,48,0.1)",
              borderRadius: "16px",
              border: "1px solid rgba(255,59,48,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <AlertCircle size={18} color="#FF3B30" strokeWidth={2} />
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#FF3B30" }}>ALLERGEN DETECTED</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Trader Joe's Granola Bar · 1.8oz</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Peanuts", "Tree Nuts", "May contain: Milk"].map(a => (
                  <span key={a} style={{
                    padding: "3px 9px",
                    background: "rgba(255,59,48,0.18)",
                    borderRadius: "99px",
                    fontSize: "10px", fontWeight: 600, color: "#FF5A4E",
                    border: "1px solid rgba(255,59,48,0.3)",
                  }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Safe alternatives */}
            <div style={{
              marginBottom: "10px",
              padding: "12px 14px",
              background: "rgba(0,200,150,0.07)",
              borderRadius: "16px",
              border: "1px solid rgba(0,200,150,0.2)",
            }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#00C896", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Safe Alternatives
              </p>
              {["Kind Oats & Honey Bar", "RxBar Blueberry"].map((item, i) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingBottom: i === 0 ? "7px" : 0,
                  paddingTop: i > 0 ? "7px" : 0,
                  borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <CheckCircle2 size={13} color="#00C896" strokeWidth={2.5} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{item}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#00C896", fontWeight: 700 }}>Safe</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              style={{
                width: "100%", padding: "12px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)",
              }}
            >
              <RefreshCw size={14} color="rgba(255,255,255,0.7)" strokeWidth={2} />
              Scan Again
            </button>
          </div>
        )}
      </div>

      <BottomNav active="scanner" navigate={(s) => navigate(s as Screen)} dark />

      {/* CSS for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
