"use client";

import { useState } from "react";
import { ChevronLeft, Share2, Phone, Heart, AlertCircle, Pill, CheckCircle2, Lock } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

export default function MedicalIDScreen({ navigate, goBack }: Props) {
  const [copied, setCopied] = useState(false);

  const share = () => {
    navigator.clipboard?.writeText("https://immuny.app/id/alex-rivera").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F2F7", fontFamily: "var(--font)" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 12px" }}>
        <button onClick={goBack} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none" }}>
          <ChevronLeft size={18} color="#1C1C1E" strokeWidth={2.5} />
        </button>
        <div>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E" }}>Medical ID</p>
          <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>Accessible in emergencies</p>
        </div>
      </div>

      <div className="inner-scroll" style={{ flex: 1, padding: "0 16px" }}>
        {/* ID Card */}
        <div style={{
          background: "#1C1C1E", borderRadius: "20px",
          overflow: "hidden", marginBottom: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}>
          {/* Card header */}
          <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={12} color="white" strokeWidth={2} fill="white" />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Immuny Medical ID
                </span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 8px", background: "rgba(52,199,89,0.18)", color: "#34C759", borderRadius: "6px" }}>
                ACTIVE
              </span>
            </div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "white", letterSpacing: "-0.4px" }}>Alex Rivera</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>Born Jan 15, 1999 · Blood: A+</p>
          </div>

          {/* Allergens */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
              <AlertCircle size={13} color="#FF3B30" strokeWidth={2.5} />
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#FF3B30", textTransform: "uppercase", letterSpacing: "0.06em" }}>Critical Allergens</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                { label: "Peanuts",   severity: "Severe"   },
                { label: "Tree Nuts", severity: "Severe"   },
                { label: "Shellfish", severity: "Moderate" },
              ].map(({ label, severity }) => (
                <span key={label} style={{
                  padding: "5px 11px", borderRadius: "8px",
                  background: "rgba(255,59,48,0.15)", fontSize: "11px",
                  fontWeight: 600, color: "#FF5A4E",
                }}>
                  {label} — {severity}
                </span>
              ))}
            </div>
          </div>

          {/* Meds */}
          <div style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
              <Pill size={13} color="rgba(255,255,255,0.4)" strokeWidth={2} />
              <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Medications</p>
            </div>
            {[
              { name: "EpiPen 0.3mg",   note: "Inject outer thigh · Always carry" },
              { name: "Benadryl 25mg",  note: "As needed for mild reactions" },
            ].map(({ name, note }, i) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: i > 0 ? "10px" : 0, paddingBottom: i < 1 ? "10px" : 0, borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <CheckCircle2 size={14} color="#34C759" strokeWidth={2.5} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{name}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contact */}
        <div style={{ background: "white", borderRadius: "16px", padding: "12px 16px", boxShadow: CARD_SHADOW, marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>M</span>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1C1C1E" }}>Mom — Maria Rivera</p>
              <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>+1 (213) 555-0189</p>
            </div>
          </div>
          <a href="tel:+12135550189" style={{
            width: "36px", height: "36px", borderRadius: "12px",
            background: "#34C759",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Phone size={16} color="white" strokeWidth={2.5} />
          </a>
        </div>

        {/* Share */}
        <button
          onClick={share}
          style={{
            width: "100%", height: "52px",
            background: copied ? "#34C759" : "#00C896",
            borderRadius: "14px", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            fontSize: "15px", fontWeight: 600, color: "white",
            transition: "background 0.25s ease",
          }}
        >
          {copied
            ? <><CheckCircle2 size={18} color="white" strokeWidth={2.5} />Link Copied!</>
            : <><Share2 size={18} color="white" strokeWidth={2} />Share Medical ID</>
          }
        </button>

        {/* Lock screen note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "10px" }}>
          <Lock size={11} color="#8E8E93" strokeWidth={2} />
          <p style={{ fontSize: "11px", color: "#8E8E93" }}>
            Accessible from lock screen · No authentication required
          </p>
        </div>
      </div>

      <BottomNav active="medical-id" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
