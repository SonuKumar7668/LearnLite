import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-[8px] border border-white/[0.08] bg-white/[0.03]">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask any concept…"
        disabled={loading}
        className="flex-1 bg-transparent border-none outline-none text-[14px] font-light text-[#f0ece3] placeholder:text-[#f0ece3]/20 disabled:opacity-50"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />

      <button
        onClick={handleSend}
        disabled={loading || !text.trim()}
        className="shrink-0 w-8 h-8 rounded-[4px] flex items-center justify-center border-none cursor-pointer transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed disabled:translate-y-0"
        style={{
          background: text.trim() ? "#e8c547" : "rgba(232,197,71,0.12)",
        }}
      >
        {loading ? (
          <span
            className="w-3 h-3 rounded-full border border-[#0a0f1e]/40 border-t-transparent animate-spin block"
          />
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
              stroke={text.trim() ? "#0a0f1e" : "rgba(232,197,71,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}