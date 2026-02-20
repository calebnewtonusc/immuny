"use client";

// ─── Screen 1: Home / Dashboard ───────────────────────────────────────────
export function HomeScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div style={{ height: "48px", paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#0d1117" }}>9:41</span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="#0d1117"><path d="M1 7h2v3H1V7zm3-3h2v6H4V4zm3-3h2v9H7V1zm3 1.5h2V10h-2V2.5z"/></svg>
          <svg width="14" height="12" viewBox="0 0 14 12" fill="#0d1117"><path d="M7 2.5C4.8 2.5 2.8 3.4 1.3 4.9L0 3.6C1.9 1.7 4.3.5 7 .5s5.1 1.2 7 3.1l-1.3 1.3C11.2 3.4 9.2 2.5 7 2.5zm0 4c-1.1 0-2.1.4-2.9 1.1L3 6.2C4.1 5.2 5.5 4.5 7 4.5s2.9.7 4 1.7l-1.1 1.4C9.1 6.9 8.1 6.5 7 6.5zm0 3c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"/></svg>
          <div style={{ width: "22px", height: "11px", borderRadius: "3px", border: "1.5px solid #0d1117", padding: "1.5px", display: "flex" }}>
            <div style={{ width: "70%", height: "100%", background: "#34C759", borderRadius: "1.5px" }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "11px", color: "#6B7280", fontWeight: 500 }}>Good morning,</p>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0d1117" }}>Alex ✋</p>
        </div>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #00C896, #00a87e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>A</span>
        </div>
      </div>

      {/* Alert badge */}
      <div style={{ margin: "0 16px 12px", padding: "10px 14px", background: "rgba(255, 59, 48, 0.08)", borderRadius: "12px", border: "1px solid rgba(255,59,48,0.15)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF3B30", flexShrink: 0, animation: "pulse 2s infinite" }} />
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#FF3B30" }}>ALLERGY ALERT NEARBY</p>
          <p style={{ fontSize: "10px", color: "#6B7280", marginTop: "1px" }}>Restaurant may contain peanuts</p>
        </div>
      </div>

      {/* Emergency button */}
      <div style={{ margin: "0 16px 16px", display: "flex", justifyContent: "center" }}>
        <button style={{
          width: "100%",
          padding: "16px",
          background: "linear-gradient(135deg, #FF3B30, #FF6B35)",
          borderRadius: "18px",
          border: "none",
          boxShadow: "0 8px 24px rgba(255,59,48,0.35), 0 2px 8px rgba(255,59,48,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "white", letterSpacing: "0.3px" }}>EMERGENCY HELP</span>
        </button>
      </div>

      {/* Quick actions */}
      <div style={{ padding: "0 16px", marginBottom: "12px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Quick Actions</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { icon: "🔍", label: "Scan Food", color: "#E8FBF6", textColor: "#00a87e" },
            { icon: "🏥", label: "Find ER", color: "#FFF0F0", textColor: "#FF3B30" },
            { icon: "💊", label: "My Meds", color: "#FFF8E8", textColor: "#FF9500" },
            { icon: "📋", label: "Medical ID", color: "#F0F4FF", textColor: "#0071E3" },
          ].map((item) => (
            <div key={item.label} style={{ padding: "12px", background: item.color, borderRadius: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: item.textColor }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ marginTop: "auto", padding: "10px 16px 20px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-around" }}>
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "📷", label: "Scan", active: false },
          { icon: "🗺️", label: "Map", active: false },
          { icon: "👤", label: "Profile", active: false },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{ fontSize: "9px", fontWeight: item.active ? 700 : 400, color: item.active ? "#00C896" : "#9CA3AF" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 2: Emergency Active ───────────────────────────────────────────
export function EmergencyScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "linear-gradient(180deg, #FF1A0F 0%, #CC1500 100%)", fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div style={{ height: "48px", paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>9:41</span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: "22px", height: "11px", borderRadius: "3px", border: "1.5px solid rgba(255,255,255,0.6)", padding: "1.5px", display: "flex" }}>
            <div style={{ width: "70%", height: "100%", background: "rgba(255,255,255,0.9)", borderRadius: "1.5px" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 20px", paddingTop: "8px" }}>
        {/* Emergency indicator */}
        <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", boxShadow: "0 0 0 8px rgba(255,255,255,0.1), 0 0 0 16px rgba(255,255,255,0.05)" }}>
          <span style={{ fontSize: "32px" }}>⚡</span>
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "white", textAlign: "center", marginBottom: "4px", letterSpacing: "-0.3px" }}>EMERGENCY ACTIVE</h2>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", textAlign: "center", marginBottom: "16px" }}>Epinephrine administered</p>

        {/* Timer */}
        <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "20px", padding: "16px 28px", marginBottom: "16px", textAlign: "center", backdropFilter: "blur(10px)" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Time to next dose</p>
          <p style={{ fontSize: "40px", fontWeight: 800, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>14:32</p>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>minutes remaining</p>
        </div>

        {/* Steps */}
        <div style={{ width: "100%", background: "rgba(0,0,0,0.15)", borderRadius: "16px", padding: "12px", marginBottom: "12px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Next Steps</p>
          {["Call 911 immediately", "Lay flat, elevate legs", "Stay awake & calm", "Second EpiPen ready"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: i === 0 ? "white" : "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "9px", fontWeight: 700, color: i === 0 ? "#FF1A0F" : "rgba(255,255,255,0.7)" }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: "11px", color: i === 0 ? "white" : "rgba(255,255,255,0.7)", fontWeight: i === 0 ? 600 : 400 }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Call button */}
        <button style={{ width: "100%", padding: "14px", background: "white", borderRadius: "16px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>📞</span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#FF1A0F" }}>Call 911 Now</span>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Food Scanner ────────────────────────────────────────────────
export function ScannerScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0d1117", fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div style={{ height: "48px", paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>9:41</span>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "white" }}>Food Scanner</p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Scan barcode or label</p>
        </div>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "14px" }}>⚙️</span>
        </div>
      </div>

      {/* Camera viewfinder */}
      <div style={{ margin: "0 16px", height: "160px", borderRadius: "20px", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(0,200,150,0.4)" }}>
        {/* Scan line animation */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #00C896, transparent)", boxShadow: "0 0 8px #00C896", opacity: 0.8 }} />
        {/* Corner marks */}
        {[{ top: 8, left: 8, borderTop: "2px solid #00C896", borderLeft: "2px solid #00C896" },
          { top: 8, right: 8, borderTop: "2px solid #00C896", borderRight: "2px solid #00C896" },
          { bottom: 8, left: 8, borderBottom: "2px solid #00C896", borderLeft: "2px solid #00C896" },
          { bottom: 8, right: 8, borderBottom: "2px solid #00C896", borderRight: "2px solid #00C896" }
        ].map((style, i) => (
          <div key={i} style={{ position: "absolute", width: "20px", height: "20px", ...style }} />
        ))}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "6px" }}>📷</div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Point camera at food label</p>
        </div>
      </div>

      {/* Detected result */}
      <div style={{ margin: "12px 16px", padding: "12px", background: "rgba(255, 59, 48, 0.12)", borderRadius: "16px", border: "1px solid rgba(255,59,48,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", color: "white" }}>!</span>
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#FF5A4E" }}>ALLERGEN DETECTED</p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Trader Joe's Granola Bar</p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {["🥜 Peanuts", "🌰 Tree Nuts", "🐄 Milk"].map(allergen => (
            <span key={allergen} style={{ padding: "4px 10px", background: "rgba(255,59,48,0.2)", borderRadius: "99px", fontSize: "10px", fontWeight: 600, color: "#FF5A4E", border: "1px solid rgba(255,59,48,0.3)" }}>{allergen}</span>
          ))}
        </div>
      </div>

      {/* Safe alternatives */}
      <div style={{ margin: "0 16px", padding: "12px", background: "rgba(0,200,150,0.08)", borderRadius: "16px", border: "1px solid rgba(0,200,150,0.2)" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#00C896", marginBottom: "8px" }}>SAFE ALTERNATIVES NEARBY</p>
        {["Kind Oats & Honey Bar", "RxBar Chocolate Chip"].map((item, i) => (
          <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: i === 0 ? "0 0 6px 0" : "6px 0 0 0", borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px" }}>✅</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>{item}</span>
            </div>
            <span style={{ fontSize: "10px", color: "#00C896", fontWeight: 600 }}>Safe</span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ marginTop: "auto", padding: "10px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-around" }}>
        {["🏠", "📷", "🗺️", "👤"].map((icon, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <span style={{ fontSize: "18px" }}>{icon}</span>
            <span style={{ fontSize: "9px", color: i === 1 ? "#00C896" : "rgba(255,255,255,0.3)", fontWeight: i === 1 ? 700 : 400 }}>
              {["Home", "Scan", "Map", "Profile"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 4: Find ER ────────────────────────────────────────────────────
export function FindERScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div style={{ height: "48px", paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#0d1117" }}>9:41</span>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 12px" }}>
        <p style={{ fontSize: "17px", fontWeight: 700, color: "#0d1117" }}>Nearest Emergency Care</p>
        <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>Based on your location</p>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: "0 16px 12px", height: "130px", borderRadius: "18px", background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)", position: "relative", overflow: "hidden", border: "1px solid rgba(0,200,150,0.2)" }}>
        {/* Map grid lines */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", top: `${25 * i}%`, left: 0, right: 0, height: "1px", background: "rgba(0,150,100,0.1)" }} />
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ position: "absolute", left: `${20 * i}%`, top: 0, bottom: 0, width: "1px", background: "rgba(0,150,100,0.1)" }} />
        ))}
        {/* You are here */}
        <div style={{ position: "absolute", left: "40%", top: "55%", transform: "translate(-50%,-50%)" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#0071E3", border: "2px solid white", boxShadow: "0 0 0 4px rgba(0,113,227,0.2)" }} />
        </div>
        {/* Hospitals */}
        <div style={{ position: "absolute", left: "25%", top: "25%", transform: "translate(-50%,-50%)" }}>
          <div style={{ padding: "3px 6px", background: "#FF3B30", borderRadius: "8px", color: "white", fontSize: "8px", fontWeight: 700, boxShadow: "0 2px 8px rgba(255,59,48,0.4)" }}>🏥 ER</div>
        </div>
        <div style={{ position: "absolute", left: "65%", top: "40%", transform: "translate(-50%,-50%)" }}>
          <div style={{ padding: "3px 6px", background: "#FF9500", borderRadius: "8px", color: "white", fontSize: "8px", fontWeight: 700, boxShadow: "0 2px 8px rgba(255,149,0,0.3)" }}>🏥 ER</div>
        </div>
        <div style={{ position: "absolute", left: "50%", top: "75%", transform: "translate(-50%,-50%)" }}>
          <div style={{ padding: "3px 6px", background: "#6B7280", borderRadius: "8px", color: "white", fontSize: "8px", fontWeight: 700 }}>🏥 UC</div>
        </div>
        {/* Route line */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M 97 114 Q 80 90 58 40" stroke="#0071E3" strokeWidth="2" strokeDasharray="4 3" fill="none" opacity="0.7"/>
        </svg>
      </div>

      {/* ER list */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          { name: "USC Keck Medical Center", dist: "0.8 mi", eta: "3 min", wait: "12 min", type: "Emergency Room", color: "#FF3B30", badge: "NEAREST" },
          { name: "Good Samaritan Hospital", dist: "1.4 mi", eta: "5 min", wait: "8 min", type: "Emergency Room", color: "#FF9500", badge: null },
        ].map((er) => (
          <div key={er.name} style={{ padding: "12px", background: "white", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${er.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "16px" }}>🏥</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#0d1117" }}>{er.name.length > 22 ? er.name.slice(0,22) + "…" : er.name}</p>
                  {er.badge && <span style={{ padding: "1px 5px", background: er.color, borderRadius: "4px", fontSize: "7px", fontWeight: 700, color: "white" }}>{er.badge}</span>}
                </div>
                <p style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "1px" }}>{er.dist} • {er.eta} drive • ~{er.wait} wait</p>
              </div>
            </div>
            <button style={{ padding: "6px 12px", background: er.color, borderRadius: "10px", border: "none", fontSize: "10px", fontWeight: 700, color: "white" }}>
              Go
            </button>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ marginTop: "auto", padding: "10px 16px 20px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-around" }}>
        {["🏠", "📷", "🗺️", "👤"].map((icon, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <span style={{ fontSize: "18px" }}>{icon}</span>
            <span style={{ fontSize: "9px", color: i === 2 ? "#00C896" : "#9CA3AF", fontWeight: i === 2 ? 700 : 400 }}>
              {["Home", "Scan", "Map", "Profile"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 5: Medical ID ─────────────────────────────────────────────────
export function MedicalIDScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#FAFAFA", fontFamily: "'Inter', sans-serif" }}>
      {/* Status bar */}
      <div style={{ height: "48px", paddingTop: "14px", paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#0d1117" }}>9:41</span>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 12px" }}>
        <p style={{ fontSize: "17px", fontWeight: 700, color: "#0d1117" }}>Medical ID</p>
        <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>Shareable in emergencies</p>
      </div>

      {/* Medical card */}
      <div style={{ margin: "0 16px 12px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", background: "linear-gradient(135deg, #0d1117 0%, #1a2332 100%)" }}>
        {/* Card top */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "12px" }}>❤️</span>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>IMMUNY MEDICAL ID</span>
            </div>
            <span style={{ fontSize: "9px", padding: "2px 6px", background: "rgba(0,200,150,0.2)", color: "#00C896", borderRadius: "6px", fontWeight: 700 }}>ACTIVE</span>
          </div>
          <p style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>Alex Rivera</p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "1px" }}>DOB: Jan 15, 1999 • Blood: A+</p>
        </div>

        {/* Allergens */}
        <div style={{ padding: "12px 16px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,59,48,0.9)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Critical Allergens</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {["🥜 Peanuts", "🌰 Tree Nuts", "🦐 Shellfish"].map(a => (
              <span key={a} style={{ padding: "4px 10px", background: "rgba(255,59,48,0.2)", borderRadius: "99px", fontSize: "10px", fontWeight: 600, color: "#FF5A4E", border: "1px solid rgba(255,59,48,0.3)" }}>{a}</span>
            ))}
          </div>

          <p style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Medications</p>
          {[{ name: "EpiPen 0.3mg", note: "Carry at all times" }, { name: "Benadryl 25mg", note: "As needed" }].map((med) => (
            <div key={med.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>💊 {med.name}</span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{med.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contact */}
      <div style={{ margin: "0 16px", padding: "12px 14px", background: "white", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #0071E3, #0055CC)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "16px" }}>👤</span>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0d1117" }}>Mom — Maria Rivera</p>
            <p style={{ fontSize: "10px", color: "#9CA3AF" }}>+1 (213) 555-0189</p>
          </div>
        </div>
        <button style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#34C759", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "14px" }}>📞</span>
        </button>
      </div>

      {/* Share button */}
      <div style={{ padding: "12px 16px 20px", marginTop: "auto" }}>
        <button style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #00C896, #00a87e)", borderRadius: "16px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 16px rgba(0,200,150,0.3)" }}>
          <span style={{ fontSize: "14px" }}>🔗</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Share Medical ID</span>
        </button>
      </div>
    </div>
  );
}
