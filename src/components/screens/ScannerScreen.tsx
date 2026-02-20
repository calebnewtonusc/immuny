"use client";

import { useState } from "react";
import { ChevronLeft, AlertCircle, CheckCircle2, ScanLine, Zap, RefreshCw, ChevronDown, Clock } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
type ScanState = "idle" | "scanning" | "danger" | "safe";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const pastScans = [
  { name: "Kind Oats & Honey Bar",    safe: true,  time: "Yesterday" },
  { name: "RxBar Blueberry",          safe: true,  time: "2 days ago" },
  { name: "Cheez-It Crackers",        safe: true,  time: "3 days ago" },
];

const dangerIngredients = [
  { name: "Roasted Peanuts",    type: "contains" as const },
  { name: "Almonds",            type: "contains" as const },
  { name: "Cashew Pieces",      type: "contains" as const },
  { name: "Milk Derivatives",   type: "may-contain" as const },
];

const safeIngredients = [
  "Whole Grain Oats", "Honey", "Brown Rice Syrup",
  "Vanilla Extract", "Sea Salt", "Sunflower Oil",
];

export default function ScannerScreen({ navigate, goBack }: Props) {
  const [state, setState] = useState<ScanState>("idle");
  const [showIngredients, setShowIngredients] = useState(false);

  const scan = (result: "danger" | "safe" = "danger") => {
    setState("scanning");
    setTimeout(() => setState(result), 2400);
  };

  const borderColor = state === "scanning" ? "rgba(0,200,150,0.5)"
    : state === "danger" ? "rgba(255,59,48,0.5)"
    : state === "safe" ? "rgba(52,199,89,0.5)"
    : "rgba(255,255,255,0.08)";

  const viewfinderBg = state === "scanning" ? "rgba(0,200,150,0.03)"
    : state === "danger" ? "rgba(255,59,48,0.04)"
    : state === "safe" ? "rgba(52,199,89,0.04)"
    : "rgba(255,255,255,0.02)";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000000", fontFamily: "var(--font)" }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 12px" }}>
        <button onClick={goBack} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none" }}>
          <ChevronLeft size={18} color="rgba(255,255,255,0.7)" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "white" }}>Food Scanner</p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>Point at food label or barcode</p>
        </div>
        <button
          style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
          onClick={() => scan("safe")}
          title="Demo: scan safe"
        >
          <Zap size={15} color="rgba(255,255,255,0.6)" strokeWidth={2} />
        </button>
      </div>

      {/* Viewfinder */}
      <div style={{ padding: "0 16px 14px" }}>
        <div style={{
          height: "160px", borderRadius: "18px",
          background: viewfinderBg,
          border: `1.5px solid ${borderColor}`,
          position: "relative", overflow: "hidden",
          transition: "border-color 0.3s ease, background 0.3s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Corner brackets */}
          {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => {
            const t = "top" in pos; const l = "left" in pos;
            return (
              <div key={i} style={{
                position: "absolute", width: "20px", height: "20px", ...pos,
                borderTop: t ? `2.5px solid ${borderColor}` : undefined,
                borderBottom: !t ? `2.5px solid ${borderColor}` : undefined,
                borderLeft: l ? `2.5px solid ${borderColor}` : undefined,
                borderRight: !l ? `2.5px solid ${borderColor}` : undefined,
                transition: "border-color 0.3s ease",
              }} />
            );
          })}

          {state === "scanning" && (
            <div className="scan-line" style={{ position: "absolute", left: "14px", right: "14px", height: "2px", background: "linear-gradient(to right, transparent, #00C896, transparent)", boxShadow: "0 0 10px rgba(0,200,150,0.7)" }} />
          )}

          {state === "idle" && (
            <div style={{ textAlign: "center" }}>
              <ScanLine size={28} color="rgba(255,255,255,0.12)" strokeWidth={1.5} />
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "6px" }}>Ready to scan</p>
            </div>
          )}
          {state === "scanning" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2.5px solid rgba(0,200,150,0.15)", borderTop: "2.5px solid #00C896", margin: "0 auto 8px", animation: "spin 0.8s linear infinite" }} />
              <p style={{ fontSize: "12px", color: "#00C896", fontWeight: 500 }}>Analyzing...</p>
            </div>
          )}
          {state === "danger" && <AlertCircle size={32} color="#FF3B30" strokeWidth={2} />}
          {state === "safe"   && <CheckCircle2 size={32} color="#34C759" strokeWidth={2} />}
        </div>
      </div>

      {/* Content */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 16px" }}>

        {/* IDLE */}
        {state === "idle" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              onClick={() => scan("danger")}
              style={{ width: "100%", height: "48px", background: "#00C896", borderRadius: "14px", border: "none", fontSize: "15px", fontWeight: 600, color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <ScanLine size={18} color="white" strokeWidth={2.5} />
              Scan Now
            </button>
            <div style={{ background: "#1C1C1E", borderRadius: "16px", overflow: "hidden" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 16px 8px" }}>Scan History</p>
              {pastScans.map(({ name, safe, time }, i) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <CheckCircle2 size={15} color={safe ? "#34C759" : "#FF3B30"} strokeWidth={2.5} />
                  <span style={{ flex: 1, fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={9} color="rgba(255,255,255,0.2)" strokeWidth={2} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCANNING */}
        {state === "scanning" && (
          <div style={{ padding: "14px 16px", background: "#1C1C1E", borderRadius: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Checking against your allergen profile...</p>
          </div>
        )}

        {/* DANGER */}
        {state === "danger" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Header result */}
            <div style={{ padding: "14px 16px", background: "#1C1C1E", borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                <AlertCircle size={18} color="#FF3B30" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#FF3B30" }}>Allergens Detected</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Trader Joe&#39;s Granola Bar · 1.8oz</p>
                </div>
              </div>
              {/* Allergen chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                {dangerIngredients.map(({ name, type }) => (
                  <span key={name} style={{
                    padding: "4px 10px", borderRadius: "8px",
                    background: type === "contains" ? "rgba(255,59,48,0.18)" : "rgba(255,149,0,0.15)",
                    fontSize: "11px", fontWeight: 600,
                    color: type === "contains" ? "#FF5A4E" : "#FF9500",
                  }}>
                    {type === "may-contain" ? "May contain: " : ""}{name}
                  </span>
                ))}
              </div>
              {/* Ingredient list toggle */}
              <button
                onClick={() => setShowIngredients(v => !v)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "9px 12px", border: "none" }}
              >
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Full ingredient list</span>
                <ChevronDown size={14} color="rgba(255,255,255,0.3)" strokeWidth={2} style={{ transform: showIngredients ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {showIngredients && (
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginTop: "8px", padding: "0 2px" }}>
                  Whole grain oats, sugar, roasted peanuts, almonds, cashew pieces, honey, brown rice syrup, vanilla extract, sea salt, milk derivatives, soy lecithin.
                </p>
              )}
            </div>

            {/* Safe alternatives */}
            <div style={{ background: "#1C1C1E", borderRadius: "16px", overflow: "hidden" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#8E8E93", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 16px 8px" }}>Safe Alternatives</p>
              {["Kind Oats & Honey Bar", "RxBar Blueberry", "Larabar Apple Pie"].map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckCircle2 size={14} color="#34C759" strokeWidth={2.5} />
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{item}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#34C759", fontWeight: 600 }}>Safe</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setState("idle"); setShowIngredients(false); }}
              style={{ width: "100%", height: "46px", background: "#1C1C1E", borderRadius: "14px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}
            >
              <RefreshCw size={14} color="rgba(255,255,255,0.4)" strokeWidth={2} />
              Scan Again
            </button>
          </div>
        )}

        {/* SAFE */}
        {state === "safe" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ padding: "16px", background: "#1C1C1E", borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                <CheckCircle2 size={18} color="#34C759" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#34C759" }}>No Allergens Detected</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Kind Oats & Honey Bar · 1.4oz</p>
                </div>
              </div>
              <div style={{ background: "rgba(52,199,89,0.08)", borderRadius: "10px", padding: "10px 12px", marginBottom: "10px" }}>
                <p style={{ fontSize: "11px", color: "#34C759", fontWeight: 600, marginBottom: "4px" }}>Safe for your profile</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>No peanuts, tree nuts, shellfish, or dairy detected in ingredients or manufacturing warnings.</p>
              </div>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>Ingredients</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {safeIngredients.map(ing => (
                  <span key={ing} style={{ padding: "3px 9px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{ing}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setState("idle")}
              style={{ width: "100%", height: "46px", background: "#00C896", borderRadius: "14px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "white" }}
            >
              <ScanLine size={14} color="white" strokeWidth={2.5} />
              Scan Another
            </button>
          </div>
        )}
      </div>

      <BottomNav active="scanner" navigate={(s) => navigate(s as Screen)} dark />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
