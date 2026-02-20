"use client";

import { Home, ScanLine, MapPin, CreditCard } from "lucide-react";

type NavTab = "home" | "scanner" | "find-er" | "medical-id";

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
];

export default function BottomNav({ active, navigate, dark = false }: BottomNavProps) {
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const bg = dark ? "#0d1117" : "#ffffff";

  return (
    <div
      className="flex items-center justify-around flex-shrink-0"
      style={{
        height: "70px",
        paddingBottom: "12px",
        paddingTop: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        borderTop: `1px solid ${borderColor}`,
        background: bg,
      }}
    >
      {tabs.map(({ id, Icon, label }) => {
        const isActive = active === id;
        const color = isActive ? "#00C896" : dark ? "rgba(255,255,255,0.3)" : "#9CA3AF";
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "4px 12px",
              borderRadius: "12px",
              background: isActive ? "rgba(0,200,150,0.08)" : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            <Icon size={20} color={color} strokeWidth={isActive ? 2.5 : 1.5} />
            <span style={{ fontSize: "9px", fontWeight: isActive ? 700 : 500, color }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
