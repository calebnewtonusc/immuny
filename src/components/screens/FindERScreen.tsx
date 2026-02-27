"use client";

import { useState } from "react";
import { ChevronLeft, MapPin, Navigation, Clock, Phone, Star } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

const S = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)";

type FilterType = "all" | "er" | "urgent";

const hospitals = [
  {
    name: "Keck Medical Center",
    type: "er" as FilterType,
    label: "Emergency Room",
    address: "1500 San Pablo St",
    dist: "0.8 mi", eta: "3 min", wait: "12 min",
    tag: "Nearest",
    rating: 4.6, phone: "+12135550100",
  },
  {
    name: "Good Samaritan Hospital",
    type: "er" as FilterType,
    label: "Emergency Room",
    address: "1225 Wilshire Blvd",
    dist: "1.4 mi", eta: "5 min", wait: "8 min",
    tag: "Low wait",
    rating: 4.4, phone: "+12135550200",
  },
  {
    name: "Kaiser Permanente",
    type: "urgent" as FilterType,
    label: "Urgent Care",
    address: "4867 Sunset Blvd",
    dist: "1.9 mi", eta: "7 min", wait: "25 min",
    tag: null,
    rating: 4.2, phone: "+12135550300",
  },
  {
    name: "Cedars-Sinai Medical",
    type: "er" as FilterType,
    label: "Emergency Room",
    address: "8700 Beverly Blvd",
    dist: "2.3 mi", eta: "9 min", wait: "35 min",
    tag: null,
    rating: 4.8, phone: "+12135550400",
  },
];

const filters: { id: FilterType | "all"; label: string }[] = [
  { id: "all",    label: "All"         },
  { id: "er",     label: "ER Only"     },
  { id: "urgent", label: "Urgent Care" },
];

export default function FindERScreen({ navigate, goBack }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType | "all">("all");

  const filtered = hospitals.filter(h => activeFilter === "all" || h.type === activeFilter);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F2F2F7", fontFamily: "var(--font)" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 10px" }}>
        <button onClick={goBack} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none" }}>
          <ChevronLeft size={18} color="#1C1C1E" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "#1C1C1E" }}>Nearest Emergency Care</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34C759" }} className="pulse-dot" />
            <p style={{ fontSize: "11px", color: "#8E8E93" }}>Live · Updated now</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{ height: "120px", borderRadius: "16px", background: "#EAEDEE", position: "relative", overflow: "hidden", boxShadow: S }}>
          {[25, 50, 75].map(pct => <div key={`h${pct}`} style={{ position: "absolute", top: `${pct}%`, left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.06)" }} />)}
          {[20, 40, 60, 80].map(pct => <div key={`v${pct}`} style={{ position: "absolute", left: `${pct}%`, top: 0, bottom: 0, width: "1px", background: "rgba(0,0,0,0.06)" }} />)}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M 108 96 Q 88 70 62 36" stroke="#8E8E93" strokeWidth="2" strokeDasharray="5 4" fill="none" opacity="0.6" />
          </svg>
          {/* You */}
          <div style={{ position: "absolute", left: "33%", top: "72%", transform: "translate(-50%,-50%)" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#1C1C1E", border: "2.5px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
          </div>
          <p style={{ position: "absolute", left: "33%", top: "84%", transform: "translateX(-50%)", fontSize: "7px", fontWeight: 700, color: "#8E8E93" }}>YOU</p>
          {/* Pins, ER red, UC gray */}
          {[
            { left: "19%", top: "24%", label: "ER", isER: true  },
            { left: "58%", top: "34%", label: "ER", isER: true  },
            { left: "74%", top: "56%", label: "UC", isER: false },
          ].map(({ left, top, label, isER }) => (
            <div key={label + left} style={{ position: "absolute", left, top, transform: "translate(-50%,-50%)" }}>
              <div style={{ padding: "2px 6px", background: isER ? "#FF3B30" : "#8E8E93", borderRadius: "6px", fontSize: "8px", fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: "2px" }}>
                <MapPin size={7} color="white" strokeWidth={2.5} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: "7px", padding: "0 16px 10px" }}>
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            style={{
              padding: "6px 14px", borderRadius: "99px", border: "none",
              background: activeFilter === id ? "#1C1C1E" : "white",
              color: activeFilter === id ? "white" : "#8E8E93",
              fontSize: "12px", fontWeight: 600,
              boxShadow: S,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Hospital list */}
      <div className="inner-scroll" style={{ flex: 1, padding: "0 16px" }}>
        <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: S, marginBottom: "12px" }}>
          {filtered.map(({ name, type, label, address, dist, eta, wait, tag, rating, phone }, i) => (
            <div key={name} style={{ borderTop: i > 0 ? "1px solid rgba(60,60,67,0.1)" : "none", padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                {/* Icon */}
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <MapPin size={16} color={type === "er" ? "#FF3B30" : "#8E8E93"} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#1C1C1E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
                    {tag && (
                      <span style={{ fontSize: "9px", fontWeight: 700, padding: "1px 6px", background: "#1C1C1E", borderRadius: "5px", color: "white", flexShrink: 0 }}>{tag}</span>
                    )}
                  </div>
                  <p style={{ fontSize: "11px", color: "#8E8E93", marginBottom: "5px" }}>{label} · {address}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Navigation size={9} color="#8E8E93" strokeWidth={2} />
                      <span style={{ fontSize: "11px", color: "#8E8E93" }}>{dist} · {eta}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={9} color="#8E8E93" strokeWidth={2} />
                      <span style={{ fontSize: "11px", color: "#8E8E93" }}>Wait {wait}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      <Star size={9} color="#8E8E93" strokeWidth={2} fill="#8E8E93" />
                      <span style={{ fontSize: "11px", color: "#8E8E93" }}>{rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <a href={`tel:${phone}`} style={{ flex: 1, height: "34px", background: "rgba(0,0,0,0.04)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", textDecoration: "none" }}>
                  <Phone size={13} color="#8E8E93" strokeWidth={2} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#8E8E93" }}>Call Ahead</span>
                </a>
                <button style={{ flex: 1, height: "34px", background: "#1C1C1E", borderRadius: "9px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                  <Navigation size={13} color="white" strokeWidth={2.5} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
