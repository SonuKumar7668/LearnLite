export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {message.content}
      </p>
    );
  }

  return <AIResponse data={message.content} />;
}

function AIResponse({ data }) {
  if (!data) return null;

  // ✅ If AI returns plain string → render directly
  if (typeof data === "string") {
    return (
      <div
        className="text-[14px] font-light text-[#f0ece3]/80 leading-[1.8] whitespace-pre-wrap"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {data}
      </div>
    );
  }

  // ✅ If structured JSON → render nicely
  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {data.title && (
        <div>
          <span className="text-[10px] tracking-[0.12em] uppercase text-[#e8c547]/60 block mb-1">
            Topic
          </span>
          <h2
            className="text-[18px] font-normal text-[#f0ece3]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {data.title}
          </h2>
        </div>
      )}

      {data.title && <div className="w-8 h-px bg-[#e8c547]/30" />}

      {data.explanation && (
        <div>
          <span className="text-[10px] uppercase text-[#f0ece3]/25 block mb-2">
            Explanation
          </span>
          <p className="text-[14px] text-[#f0ece3]/70 leading-[1.8]">
            {data.explanation}
          </p>
        </div>
      )}

      {data.example && (
        <div className="px-4 py-4 border-l-2 border-[#e8c547]/40 bg-[#e8c547]/[0.04]">
          <span className="text-[10px] uppercase text-[#e8c547]/50 block mb-2">
            Example
          </span>
          <p className="text-[13px] text-[#f0ece3]/60 italic">
            {data.example}
          </p>
        </div>
      )}

      {data.summary && (
        <ul className="flex flex-col gap-2">
          {data.summary.map((s, i) => (
            <li key={i} className="text-[13px] text-[#f0ece3]/60">
              ◈ {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}