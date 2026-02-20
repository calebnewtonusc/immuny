"use client";

import { Home, ScanLine, MapPin, CreditCard, Sparkles } from "lucide-react";

type NavTab = "home" | "scanner" | "find-er" | "medical-id" | "ai";

interface BottomNavProps {
  active: NavTab;
  navigate: (screen: NavTab) => void;
  dark?: boolean;
}

const tabs: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "home",       Icon: Home,       label: "Home"    },
  { id: "scanner",    Icon: ScanLine,   label: "Scan"    },
  { id: "find-er",    Icon: MapPin,     label: "Find ER" },
  { id: "medical-id", Icon: CreditCard, label: "ID Card" },
  { id: "ai",         Icon: Sparkles,   label: "AI"      },
];

export default function BottomNav({ active, navigate, dark = false }: BottomNavProps) {
  const bg          = dark ? "#0a0a0a"                : "#ffffff";
  const border      = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const activeColor = dark ? "rgba(255,255,255,0.88)" : "#1C1C1E";

  return (
    <div style={{ display: "flex", height: "52px", background: bg, borderTop: `1px solid ${border}`, flexShrink: 0 }}>
      {tabs.map(({ id, Icon, label }) => {
        const isActive = active === id;
        const color    = isActive ? activeColor : (dark ? "rgba(255,255,255,0.28)" : "#AEAEB2");
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "8px",
              gap: "3px",
              background: "transparent",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              borderTop: `2px solid ${isActive ? activeColor : "transparent"}`,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <Icon size={19} color={color} strokeWidth={isActive ? 2.2 : 1.5} />
            <span style={{ fontSize: "9px", fontWeight: isActive ? 700 : 400, color, letterSpacing: "0.01em" }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
