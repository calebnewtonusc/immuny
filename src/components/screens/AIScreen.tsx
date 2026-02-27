"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Send, Sparkles, StopCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StatusBar from "@/components/ui/StatusBar";

type Screen = "home" | "emergency" | "scanner" | "find-er" | "medical-id" | "ai";
interface Props { navigate: (s: Screen) => void; goBack: () => void; }

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
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
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { id: `assistant-${Date.now()}`, role: "assistant", content: "", streaming: true }]);
    setInput("");
    setLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Request failed" }));
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "assistant", content: data.error || "Unable to get a response right now." },
        ]);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        full += text;
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "assistant", content: full, streaming: true },
        ]);
      }

      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: full, streaming: false },
      ]);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "assistant", content: "Unable to reach the AI. Please try again." },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  function stop() {
    abortRef.current?.abort();
    setLoading(false);
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.streaming) return [...prev.slice(0, -1), { ...last, streaming: false }];
      return prev;
    });
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

        {messages.map((msg) => (
          <div
            key={msg.id}
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
              lineHeight: 1.6,
            }}>
              {/* Typing dots when streaming with no content yet */}
              {!msg.content && msg.streaming && (
                <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                  {[0, 1, 2].map(d => (
                    <span key={d} style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                      animation: "pulse 1.2s ease-in-out infinite",
                      animationDelay: `${d * 200}ms`,
                    }} />
                  ))}
                </span>
              )}

              {msg.role === "user" && (
                <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
              )}

              {msg.role === "assistant" && msg.content && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p style={{ margin: "0 0 6px", lineHeight: 1.6 }}>{children}</p>,
                    strong: ({ children }) => <strong style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>{children}</strong>,
                    ul: ({ children }) => <ul style={{ margin: "4px 0", paddingLeft: 16, listStyleType: "disc" }}>{children}</ul>,
                    ol: ({ children }) => <ol style={{ margin: "4px 0", paddingLeft: 16 }}>{children}</ol>,
                    li: ({ children }) => <li style={{ margin: "2px 0" }}>{children}</li>,
                    code: ({ children }) => <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 3, fontSize: 11, fontFamily: "monospace" }}>{children}</code>,
                    h1: ({ children }) => <h1 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.95)", margin: "8px 0 4px" }}>{children}</h1>,
                    h2: ({ children }) => <h2 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "6px 0 3px" }}>{children}</h2>,
                    h3: ({ children }) => <h3 style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: "5px 0 2px" }}>{children}</h3>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              )}

              {/* Streaming cursor */}
              {msg.role === "assistant" && msg.content && msg.streaming && (
                <span style={{
                  display: "inline-block",
                  width: 2, height: 12,
                  background: "rgba(255,255,255,0.5)",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }} />
              )}
            </div>
          </div>
        ))}
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
        {loading ? (
          <button
            onClick={stop}
            style={{ width: "38px", height: "38px", borderRadius: "12px", background: "rgba(255,79,91,0.12)", border: "1px solid rgba(255,79,91,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <StopCircle size={15} color="#FF4F5B" />
          </button>
        ) : (
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: input.trim() ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.07)",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s",
            }}
          >
            <Send size={15} color={input.trim() ? "#000000" : "rgba(255,255,255,0.2)"} strokeWidth={2} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}
