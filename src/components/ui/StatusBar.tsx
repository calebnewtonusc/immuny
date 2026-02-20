"use client";

import { Signal, Wifi, Battery } from "lucide-react";

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const color = dark ? "rgba(255,255,255,0.9)" : "#0d1117";
  return (
    <div
      className="flex items-center justify-between flex-shrink-0"
      style={{
        height: "52px",
        paddingTop: "16px",
        paddingLeft: "22px",
        paddingRight: "22px",
      }}
    >
      <span style={{ fontSize: "12px", fontWeight: 700, color, letterSpacing: "-0.2px" }}>
        9:41
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Signal size={13} color={color} strokeWidth={2} />
        <Wifi size={13} color={color} strokeWidth={2} />
        <Battery size={17} color={color} strokeWidth={2} />
      </div>
    </div>
  );
}
