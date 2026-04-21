import { useState } from "react";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import { BACKEND_URL } from "../App";
import axios from "axios";

export default function ChatLearn() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/chat`, { message: text });
      console.log("Response from backend:", res.data.response);
      const aiMsg = { role: "ai", content: res.data.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      className="h-screen flex flex-col bg-[#0a0f1e] text-[#f0ece3] overflow-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .dot-bounce {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(232,197,71,0.5);
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .dot-bounce:nth-child(2) { animation-delay: 0.2s; }
        .dot-bounce:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        .chat-scrollbar::-webkit-scrollbar { width: 4px; }
        .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(240,236,227,0.08); border-radius: 4px; }

        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,197,71,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top bar */}
      <div className="relative shrink-0 border-b border-white/[0.06] px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#e8c547] animate-pulse" />
          <span
            className="text-[13px] font-light text-[#f0ece3]/40"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            LearnLite <span className="text-[#e8c547]/60 mx-2">·</span> AI Tutor
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="text-[12px] font-light text-[#f0ece3]/25 hover:text-[#e8c547]/60 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "none", border: "none", cursor: "pointer" }}
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Chat area */}
      <div className="relative flex-1 overflow-y-auto chat-scrollbar px-4 md:px-0">

        {/* Empty state */}
        {isEmpty && (
          <div className="h-full flex flex-col justify-center items-center text-center px-6 fade-up">
            <div
              className="w-14 h-14 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[24px] mb-6"
            >
              ◈
            </div>
            <h2 className="text-[32px] font-normal leading-[1.2] mb-3">
              Ask me <em className="text-[#e8c547] italic">anything.</em>
            </h2>
            <p
              className="text-[14px] font-light text-[#f0ece3]/35 max-w-[340px] leading-[1.75]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Type a topic, concept, or question and I'll break it down into something you actually understand.
            </p>

            {/* Suggestion pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                "Explain photosynthesis",
                "What is Newton's 2nd law?",
                "How does the internet work?",
                "Simplify quantum entanglement",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 rounded-[4px] border border-white/[0.1] text-[13px] font-light text-[#f0ece3]/40 hover:border-[#e8c547]/40 hover:text-[#e8c547] transition-all duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "transparent", cursor: "pointer" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {!isEmpty && (
          <div className="max-w-[720px] mx-auto py-10 flex flex-col gap-8">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* AI avatar */}
                {msg.role === "ai" && (
                  <div className="shrink-0 w-7 h-7 rounded-[4px] border border-white/[0.1] bg-white/[0.03] flex items-center justify-center text-[12px] text-[#e8c547] mt-0.5">
                    ◈
                  </div>
                )}

                <div className={`max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <span
                    className="text-[10px] tracking-[0.1em] uppercase mb-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: msg.role === "user" ? "rgba(232,197,71,0.5)" : "rgba(240,236,227,0.2)",
                    }}
                  >
                    {msg.role === "user" ? "You" : "LearnLite"}
                  </span>

                  <div
                    className="px-5 py-4 rounded-[8px] border"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1.75,
                      ...(msg.role === "user"
                        ? {
                            background: "rgba(232,197,71,0.07)",
                            borderColor: "rgba(232,197,71,0.2)",
                            color: "#f0ece3",
                          }
                        : {
                            background: "rgba(255,255,255,0.02)",
                            borderColor: "rgba(240,236,227,0.07)",
                            color: "rgba(240,236,227,0.75)",
                          }),
                    }}
                  >
                    <ChatMessage message={msg} />
                  </div>
                </div>

                {/* User avatar */}
                {msg.role === "user" && (
                  <div className="shrink-0 w-7 h-7 rounded-[4px] border border-[#e8c547]/20 bg-[#e8c547]/[0.06] flex items-center justify-center text-[11px] text-[#e8c547] mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                  >
                    U
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="relative shrink-0 border-t border-white/[0.06] px-4 md:px-0 py-4">
        <div className="max-w-[720px] mx-auto">
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-7 h-7 rounded-[4px] border border-white/[0.1] bg-white/[0.03] flex items-center justify-center text-[12px] text-[#e8c547]">
        ◈
      </div>
      <div className="px-5 py-4 rounded-[8px] border border-white/[0.07] bg-white/[0.02] flex items-center gap-2">
        <div className="dot-bounce" />
        <div className="dot-bounce" />
        <div className="dot-bounce" />
      </div>
    </div>
  );
}