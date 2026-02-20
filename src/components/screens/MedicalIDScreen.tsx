"use client";

import { useState } from "react";
import { ChevronLeft, Share2, Phone, Heart, AlertCircle, Pill, CheckCircle2, Copy } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";

interface Props {
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

export default function MedicalIDScreen({ navigate, goBack }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://immuny.app/id/alex-rivera-a1b2c3").catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 18px 10px" }}>
        <button
          onClick={goBack}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={18} color="#374151" strokeWidth={2.5} />
        </button>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0d1117" }}>Medical ID</p>
          <p style={{ fontSize: "10px", color: "#6B7280", marginTop: "1px" }}>Always accessible to first responders</p>
        </div>
      </div>

      <div className="inner-scroll" style={{ flex: 1, padding: "0 18px" }}>
        {/* ID Card */}
        <div style={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(160deg, #111827 0%, #0d1117 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.15)",
          marginBottom: "10px",
        }}>
          {/* Card header */}
          <div style={{
            padding: "14px 16px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(135deg, rgba(255,59,48,0.12) 0%, transparent 60%)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "6px",
                  background: "#FF3B30",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Heart size={12} color="white" strokeWidth={2.5} fill="white" />
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Immuny Medical ID
                </span>
              </div>
              <span style={{
                fontSize: "8px", fontWeight: 700, padding: "2px 7px",
                background: "rgba(52,199,89,0.2)", color: "#34C759",
                borderRadius: "6px", border: "1px solid rgba(52,199,89,0.3)",
              }}>
                ACTIVE
              </span>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "white", letterSpacing: "-0.4px" }}>Alex Rivera</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
              DOB: Jan 15, 1999 · Blood Type: A+
            </p>
          </div>

          {/* Critical allergens */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <AlertCircle size={12} color="#FF3B30" strokeWidth={2.5} />
              <p style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,59,48,0.9)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Critical Allergens
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {["Peanuts — Severe", "Tree Nuts — Severe", "Shellfish — Moderate"].map(a => (
                <span key={a} style={{
                  padding: "4px 10px",
                  background: "rgba(255,59,48,0.18)",
                  borderRadius: "99px",
                  fontSize: "10px", fontWeight: 600, color: "#FF5A4E",
                  border: "1px solid rgba(255,59,48,0.28)",
                }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Pill size={12} color="rgba(255,255,255,0.5)" strokeWidth={2} />
              <p style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Emergency Medications
              </p>
            </div>
            {[
              { name: "EpiPen 0.3mg", note: "Inject outer thigh — carry always" },
              { name: "Benadryl 25mg", note: "As needed for mild reactions" },
            ].map((med, i) => (
              <div key={med.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                paddingBottom: i === 0 ? "8px" : 0,
                paddingTop: i > 0 ? "8px" : 0,
                borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <CheckCircle2 size={12} color="#00C896" strokeWidth={2.5} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{med.name}</span>
                </div>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", textAlign: "right", maxWidth: "100px", lineHeight: 1.3 }}>{med.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contact */}
        <div style={{
          marginBottom: "10px",
          padding: "12px 14px",
          background: "white",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #0071E3, #0055CC)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "white" }}>M</span>
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0d1117" }}>Mom — Maria Rivera</p>
              <p style={{ fontSize: "10px", color: "#9CA3AF" }}>Emergency contact · +1 (213) 555-0189</p>
            </div>
          </div>
          <a
            href="tel:+12135550189"
            style={{
              width: "32px", height: "32px", borderRadius: "10px",
              background: "#34C759",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(52,199,89,0.35)",
            }}
          >
            <Phone size={15} color="white" strokeWidth={2.5} />
          </a>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            width: "100%", padding: "14px",
            background: copied
              ? "linear-gradient(135deg, #34C759, #2aa24a)"
              : "linear-gradient(135deg, #00C896, #00a87e)",
            borderRadius: "16px", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            boxShadow: "0 4px 20px rgba(0,200,150,0.3)",
            transition: "background 0.3s ease",
          }}
        >
          {copied
            ? <><CheckCircle2 size={18} color="white" strokeWidth={2.5} /><span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Link Copied!</span></>
            : <><Share2 size={18} color="white" strokeWidth={2} /><span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Share Medical ID</span></>
          }
        </button>

        {/* Lock screen note */}
        <p style={{ textAlign: "center", fontSize: "10px", color: "#9CA3AF", marginTop: "8px", lineHeight: 1.4 }}>
          Also accessible from lock screen · No authentication required in emergency
        </p>
      </div>

      <BottomNav active="medical-id" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
