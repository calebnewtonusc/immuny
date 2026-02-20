"use client";

import { useState } from "react";
import { ChevronLeft, Share2, Phone, Heart, AlertCircle, Pill, CheckCircle2, Lock, User, Shield } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const S = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

const allergens = [
  { label: "Peanuts",   severity: "Severe"   },
  { label: "Tree Nuts", severity: "Severe"   },
  { label: "Shellfish", severity: "Moderate" },
];

const meds = [
  { name: "EpiPen 0.3mg",   note: "Inject outer thigh · Hold 10s · Always carry" },
  { name: "Benadryl 25mg",  note: "As needed for mild reactions"                  },
  { name: "Zyrtec 10mg",    note: "Daily antihistamine · Morning"                 },
];

const conditions = ["Anaphylaxis Risk", "Mild Asthma", "Seasonal Allergies"];

const contacts = [
  { initial: "M", name: "Mom — Maria Rivera", phone: "+12135550189", color: "#007AFF" },
  { initial: "D", name: "Dad — Carlos Rivera", phone: "+12135550177", color: "#34C759" },
];

export default function MedicalIDScreen({ navigate, goBack }: Props) {
  const [copied, setCopied] = useState(false);

  const share = () => {
    navigator.clipboard?.writeText("https://immuny.ai/id/alex-rivera").catch(() => {});
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
        <div style={{ background: "#1C1C1E", borderRadius: "20px", overflow: "hidden", marginBottom: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
          {/* Card header */}
          <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={12} color="white" strokeWidth={2} fill="white" />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Immuny Medical ID</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 8px", background: "rgba(52,199,89,0.18)", color: "#34C759", borderRadius: "6px" }}>ACTIVE</span>
            </div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "white", letterSpacing: "-0.4px" }}>Alex Rivera</p>
            <div style={{ display: "flex", gap: "14px", marginTop: "4px" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Born Jan 15, 1999</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Blood: A+</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>175 lb · 5&#39;10"</p>
            </div>
          </div>

          {/* Conditions */}
          <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Shield size={12} color="#FF9500" strokeWidth={2.5} />
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#FF9500", textTransform: "uppercase", letterSpacing: "0.06em" }}>Conditions</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {conditions.map(c => (
                <span key={c} style={{ padding: "3px 9px", background: "rgba(255,149,0,0.12)", borderRadius: "7px", fontSize: "11px", fontWeight: 600, color: "#FF9500" }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <AlertCircle size={12} color="#FF3B30" strokeWidth={2.5} />
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#FF3B30", textTransform: "uppercase", letterSpacing: "0.06em" }}>Critical Allergens</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {allergens.map(({ label, severity }) => (
                <span key={label} style={{ padding: "4px 10px", borderRadius: "8px", background: "rgba(255,59,48,0.15)", fontSize: "11px", fontWeight: 600, color: "#FF5A4E" }}>
                  {label} — {severity}
                </span>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div style={{ padding: "12px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Pill size={12} color="rgba(255,255,255,0.35)" strokeWidth={2} />
              <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Medications</p>
            </div>
            {meds.map(({ name, note }, i) => (
              <div key={name} style={{ display: "flex", alignItems: "flex-start", gap: "10px", paddingTop: i > 0 ? "8px" : 0, paddingBottom: i < meds.length - 1 ? "8px" : 0, borderBottom: i < meds.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <CheckCircle2 size={13} color="#34C759" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{name}</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "1px", lineHeight: 1.4 }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div style={{ background: "white", borderRadius: "16px", padding: "12px 16px", boxShadow: S, marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#007AFF18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={16} color="#007AFF" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>Aetna PPO</p>
              <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>Member #AET-4421-989023</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "10px", color: "#8E8E93" }}>Group</p>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#1C1C1E" }}>USC-2024</p>
            </div>
          </div>
        </div>

        {/* Primary doctor */}
        <div style={{ background: "white", borderRadius: "16px", padding: "12px 16px", boxShadow: S, marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#00C89618", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <User size={16} color="#00C896" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>Dr. Sarah Chen</p>
              <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>Allergist · Cedars-Sinai</p>
            </div>
            <a href="tel:+13105550312" style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Phone size={14} color="white" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Emergency contacts */}
        {contacts.map(({ initial, name, phone, color }) => (
          <div key={name} style={{ background: "white", borderRadius: "16px", padding: "12px 16px", boxShadow: S, marginBottom: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>{initial}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E" }}>{name}</p>
              <p style={{ fontSize: "11px", color: "#8E8E93", marginTop: "1px" }}>{phone}</p>
            </div>
            <a href={`tel:${phone}`} style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Phone size={14} color="white" strokeWidth={2.5} />
            </a>
          </div>
        ))}

        {/* Share */}
        <button
          onClick={share}
          style={{ width: "100%", height: "50px", background: copied ? "#34C759" : "#00C896", borderRadius: "14px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "15px", fontWeight: 600, color: "white", transition: "background 0.25s ease", marginBottom: "4px" }}
        >
          {copied
            ? <><CheckCircle2 size={18} color="white" strokeWidth={2.5} />Link Copied!</>
            : <><Share2 size={18} color="white" strokeWidth={2} />Share Medical ID</>
          }
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "8px" }}>
          <Lock size={11} color="#8E8E93" strokeWidth={2} />
          <p style={{ fontSize: "11px", color: "#8E8E93" }}>Accessible from lock screen · No authentication required</p>
        </div>
      </div>

      <BottomNav active="medical-id" navigate={(s) => navigate(s as Screen)} />
    </div>
  );
}
