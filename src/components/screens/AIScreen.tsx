"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Send, Sparkles, Loader2 } from "lucide-react";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id" | "ai";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "What do I do if I accidentally ate peanuts?",
  "When should I use my EpiPen vs. Benadryl?",
  "Is dairy in a product dangerous for me?",
  "How do I recognize anaphylaxis symptoms?",
];

export default function AIScreen({ goBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.text || "Sorry, I could not get a response right now." },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Unable to reach the AI. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000000", fontFamily: "var(--font)" }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 16px 12px", flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "none" }}
        >
          <ChevronLeft size={18} color="rgba(255,255,255,0.7)" strokeWidth={2.5} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "white" }}>Immuny AI</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "1px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#34C759" }} />
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Allergy assistant</p>
          </div>
        </div>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={15} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="inner-scroll" style={{ flex: 1, padding: "0 16px", overflowY: "auto" }}>

        {messages.length === 0 && (
          <div style={{ paddingBottom: "16px" }}>
            <div style={{ padding: "14px 16px", background: "#1C1C1E", borderRadius: "16px", marginBottom: "14px" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                I know your allergen profile and can help you navigate allergy situations, emergencies, and food safety questions.
              </p>
            </div>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Suggested</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {QUICK_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  style={{ width: "100%", padding: "11px 14px", background: "#1C1C1E", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "left", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ marginBottom: "10px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
          >
            <div style={{
              maxWidth: "86%",
              padding: "10px 13px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "#2C2C2E" : "#161616",
              border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.06)" : "none",
              fontSize: "13px",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.5,
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 13px", background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px 16px 16px 4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Loader2 size={13} color="rgba(255,255,255,0.3)" style={{ animation: "spin 1s linear infinite" }} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: "10px 16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#000000", flexShrink: 0, display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(input); }}
          placeholder="Ask about your allergies..."
          disabled={loading}
          style={{ flex: 1, padding: "10px 14px", background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "13px", color: "rgba(255,255,255,0.85)", outline: "none" }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          style={{
            width: "38px", height: "38px", borderRadius: "12px",
            background: input.trim() && !loading ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.07)",
            border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.2s",
          }}
        >
          <Send size={15} color={input.trim() && !loading ? "#000000" : "rgba(255,255,255,0.2)"} strokeWidth={2} />
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
