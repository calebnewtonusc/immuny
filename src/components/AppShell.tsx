"use client";

import { useState, useCallback } from "react";
import HomeScreen from "@/components/screens/HomeScreen";
import EmergencyScreen from "@/components/screens/EmergencyScreen";
import ScannerScreen from "@/components/screens/ScannerScreen";
import FindERScreen from "@/components/screens/FindERScreen";
import MedicalIDScreen from "@/components/screens/MedicalIDScreen";
import BottomNav from "@/components/ui/BottomNav";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id";
type NavTab = "home" | "scanner" | "find-er" | "medical-id";

interface NavState {
  screen: Screen;
  key: number;
  dir: "forward" | "back";
}

export default function AppShell() {
  const [history, setHistory] = useState<Screen[]>(["home"]);
  const [navState, setNavState] = useState<NavState>({ screen: "home", key: 0, dir: "forward" });

  const navigate = useCallback((screen: Screen) => {
    setHistory(prev => [...prev, screen]);
    setNavState(prev => ({ screen, key: prev.key + 1, dir: "forward" }));
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      const target = newHistory[newHistory.length - 1];
      setNavState(p => ({ screen: target, key: p.key + 1, dir: "back" }));
      return newHistory;
    });
  }, []);

  const animClass = navState.dir === "forward" ? "screen-forward" : "screen-back";

  const renderScreen = () => {
    switch (navState.screen) {
      case "home":
        return <HomeScreen navigate={navigate} />;
      case "emergency":
        return <EmergencyScreen navigate={navigate} goBack={goBack} />;
      case "scanner":
        return <ScannerScreen navigate={navigate} goBack={goBack} />;
      case "find-er":
        return <FindERScreen navigate={navigate} goBack={goBack} />;
      case "medical-id":
        return <MedicalIDScreen navigate={navigate} goBack={goBack} />;
    }
  };

  const tabScreens: Screen[] = ["home", "scanner", "find-er", "medical-id"];
  const showNav = tabScreens.includes(navState.screen);
  const navActive = navState.screen as NavTab;

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", background: "#F2F2F7" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          key={navState.key}
          className={animClass}
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        >
          {renderScreen()}
        </div>
      </div>
      {showNav && <BottomNav active={navActive} navigate={(s) => navigate(s as Screen)} />}
    </div>
  );
}
