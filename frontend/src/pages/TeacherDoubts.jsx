// ── src/pages/TeacherDoubts.jsx ──
import { useState } from "react";

const INITIAL_TICKETS = [
  {
    id: 1,
    student: "Basuki Nath Pandey",
    class: "Class 9",
    subject: "Mathematics",
    topic: "Trigonometry",
    question: "I don't understand how sin²θ + cos²θ = 1 is derived. Can you explain with a diagram?",
    status: "resolved",
    priority: "high",
    createdAt: "2 days ago",
    reply: "This identity comes directly from the Pythagorean theorem. In a right triangle with hypotenuse 1 (unit circle), the opposite side is sinθ and adjacent is cosθ. Since a² + b² = c², we get sin²θ + cos²θ = 1².",
    repliedAt: "1 day ago",
  },
  {
    id: 2,
    student: "Priya Sharma",
    class: "Class 9",
    subject: "Science",
    topic: "Electricity",
    question: "What is the difference between EMF and terminal voltage? My textbook explanation is confusing.",
    status: "open",
    priority: "medium",
    createdAt: "5 hours ago",
    reply: null,
    repliedAt: null,
  },
  {
    id: 3,
    student: "Arjun Mehta",
    class: "Class 9",
    subject: "Science",
    topic: "Electricity",
    question: "Why does resistance increase with temperature in conductors but decrease in semiconductors?",
    status: "in-review",
    priority: "low",
    createdAt: "1 hour ago",
    reply: null,
    repliedAt: null,
  },
  {
    id: 4,
    student: "Sneha Patel",
    class: "Class 8",
    subject: "Mathematics",
    topic: "Algebra",
    question: "How do I factorise x² + 5x + 6? I keep getting confused between the two middle terms.",
    status: "open",
    priority: "high",
    createdAt: "3 hours ago",
    reply: null,
    repliedAt: null,
  },
];

const statusMeta = {
  open:       { label: "Open",      color: "#e8c547", bg: "rgba(232,197,71,0.08)",  border: "rgba(232,197,71,0.2)"  },
  "in-review":{ label: "In Review", color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)" },
  resolved:   { label: "Resolved",  color: "#4ade80", bg: "rgba(74,222,128,0.06)",  border: "rgba(74,222,128,0.2)"  },
};
const priorityMeta = {
  high:   { label: "High",   color: "#f87171" },
  medium: { label: "Medium", color: "#e8c547" },
  low:    { label: "Low",    color: "#4ade80" },
};

export default function TeacherDoubts() {
  const [tickets, setTickets]       = useState(INITIAL_TICKETS);
  const [selected, setSelected]     = useState(null);
  const [reply, setReply]           = useState("");
  const [filterStatus, setFilter]   = useState("all");
  const [sending, setSending]       = useState(false);

  const filtered = tickets.filter(t => filterStatus === "all" || t.status === filterStatus);
  const active   = tickets.find(t => t.id === selected);

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 700));
    setTickets(prev => prev.map(t =>
      t.id === selected
        ? { ...t, reply, status: "resolved", repliedAt: "Just now" }
        : t
    ));
    setReply("");
    setSending(false);
  };

  const setStatus = (id, status) =>
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up { opacity:0; transform:translateY(18px); animation:fadeUp 0.55s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .card { border:1px solid rgba(240,236,227,0.07); border-radius:12px; background:rgba(255,255,255,0.02); }
        .tkt-input {
          width:100%; background:rgba(255,255,255,0.04);
          border:1px solid rgba(240,236,227,0.1); border-radius:4px;
          padding:10px 14px; font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:300; color:#f0ece3; outline:none;
          transition:border-color 0.2s; box-sizing:border-box;
        }
        .tkt-input::placeholder { color:rgba(240,236,227,0.2); }
        .tkt-input:focus { border-color:rgba(232,197,71,0.4); }
        .ticket-row { transition: background 0.15s, border-color 0.15s; cursor:pointer; }
        .ticket-row:hover { background:rgba(255,255,255,0.035); }
      `}</style>

      {/* BG grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>

      {/* Header */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(232,197,71,0.05) 0%,transparent 70%)" }}/>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="fade-up">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-2"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>Teacher Dashboard</span>
            <h1 className="text-[44px] max-md:text-[30px] font-normal leading-[1.1]">
              Student <em className="text-[#e8c547] italic">doubts.</em>
            </h1>
          </div>
          {/* Summary stats */}
          <div className="fade-up flex gap-3 flex-wrap" style={{ animationDelay: "0.12s" }}>
            {[
              { label: "Open",      val: tickets.filter(t=>t.status==="open").length,       color: "#e8c547" },
              { label: "In Review", val: tickets.filter(t=>t.status==="in-review").length,  color: "#a78bfa" },
              { label: "Resolved",  val: tickets.filter(t=>t.status==="resolved").length,   color: "#4ade80" },
            ].map(({ label, val, color }) => (
              <div key={label} className="card px-5 py-3 text-center">
                <p className="text-[24px] font-normal leading-none" style={{ color }}>{val}</p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 mt-1"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main — split layout */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-8 flex gap-6 max-lg:flex-col">

        {/* ── LEFT: TICKET LIST ── */}
        <div className="w-full lg:w-[380px] shrink-0">

          {/* Filter tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {["all", "open", "in-review", "resolved"].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className="px-3.5 py-1.5 rounded-[4px] border text-[11px] font-light cursor-pointer transition-all duration-150"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  background: filterStatus === s ? "rgba(232,197,71,0.1)" : "transparent",
                  borderColor: filterStatus === s ? "rgba(232,197,71,0.35)" : "rgba(240,236,227,0.1)",
                  color: filterStatus === s ? "#e8c547" : "rgba(240,236,227,0.4)",
                }}>
                {s === "all" ? `All (${tickets.length})` : `${statusMeta[s].label} (${tickets.filter(t=>t.status===s).length})`}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((t, i) => {
              const sm = statusMeta[t.status];
              const pm = priorityMeta[t.priority];
              const isActive = selected === t.id;
              return (
                <div key={t.id}
                  onClick={() => { setSelected(t.id); setReply(""); }}
                  className="ticket-row card p-5 fade-up"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    borderColor: isActive ? "rgba(232,197,71,0.3)" : "rgba(240,236,227,0.07)",
                    background: isActive ? "rgba(232,197,71,0.04)" : "rgba(255,255,255,0.02)",
                  }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] tracking-[0.09em] uppercase px-2 py-0.5 rounded-[3px] border"
                        style={{ fontFamily:"'DM Sans',sans-serif", color:sm.color, background:sm.bg, borderColor:sm.border }}>
                        {sm.label}
                      </span>
                      <span className="text-[10px] font-light" style={{ fontFamily:"'DM Sans',sans-serif", color:pm.color }}>
                        ● {pm.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-light text-[#f0ece3]/20 shrink-0"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>{t.createdAt}</span>
                  </div>

                  {/* Student */}
                  <p className="text-[12px] font-light text-[#e8c547]/60 mb-1"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {t.student} · {t.class}
                  </p>

                  {/* Question preview */}
                  <p className="text-[13px] font-light text-[#f0ece3]/55 leading-[1.6] line-clamp-2"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {t.question}
                  </p>

                  <p className="text-[11px] font-light text-[#f0ece3]/25 mt-2"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {t.subject} · {t.topic}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: DETAIL PANEL ── */}
        <div className="flex-1 min-w-0">
          {!active ? (
            <div className="card h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10">
              <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[20px] mb-5">◇</div>
              <p className="text-[20px] font-normal mb-2">Select a ticket</p>
              <p className="text-[13px] font-light text-[#f0ece3]/30"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                Click any doubt on the left to view and reply.
              </p>
            </div>
          ) : (
            <div className="card p-8 fade-up relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none"
                style={{ background:"radial-gradient(circle,rgba(232,197,71,0.06) 0%,transparent 70%)" }}/>

              {/* Ticket meta */}
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <span className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-[3px] border"
                      style={{ fontFamily:"'DM Sans',sans-serif",
                        color: statusMeta[active.status].color,
                        background: statusMeta[active.status].bg,
                        borderColor: statusMeta[active.status].border }}>
                      {statusMeta[active.status].label}
                    </span>
                    <span className="text-[10px] font-light"
                      style={{ fontFamily:"'DM Sans',sans-serif", color: priorityMeta[active.priority].color }}>
                      ● {priorityMeta[active.priority].label} priority
                    </span>
                    <span className="text-[11px] font-light text-[#f0ece3]/25"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>
                      #{active.id} · {active.createdAt}
                    </span>
                  </div>
                  <p className="text-[13px] font-light text-[#e8c547]/60"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {active.student} · {active.class} · {active.subject} — {active.topic}
                  </p>
                </div>

                {/* Status controls */}
                {active.status !== "resolved" && (
                  <div className="flex gap-2">
                    {active.status === "open" && (
                      <button onClick={() => setStatus(active.id, "in-review")}
                        className="px-4 py-2 text-[11px] font-light rounded-[4px] border border-[#a78bfa]/25 text-[#a78bfa]/70 bg-transparent cursor-pointer hover:border-[#a78bfa]/50 hover:text-[#a78bfa] transition-all duration-150"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>
                        Mark In Review
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Question */}
              <div className="mb-7">
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-3"
                  style={{ fontFamily:"'DM Sans',sans-serif" }}>Student's Question</span>
                <div className="px-5 py-5 rounded-[6px] border border-white/[0.07] bg-white/[0.02]">
                  <p className="text-[15px] font-light text-[#f0ece3]/75 leading-[1.8]"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    {active.question}
                  </p>
                </div>
              </div>

              {/* Existing reply */}
              {active.reply && (
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-[3px] border border-[#4ade80]/20 bg-[#4ade80]/[0.06] flex items-center justify-center text-[9px] text-[#4ade80]">T</div>
                    <span className="text-[11px] tracking-[0.08em] uppercase text-[#4ade80]/60"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>
                      Your reply · {active.repliedAt}
                    </span>
                  </div>
                  <div className="px-5 py-4 rounded-[6px] border-l-2 border-[#4ade80]/30 bg-[#4ade80]/[0.04]">
                    <p className="text-[14px] font-light text-[#f0ece3]/65 leading-[1.75]"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>
                      {active.reply}
                    </p>
                  </div>
                </div>
              )}

              {/* Reply box */}
              {active.status !== "resolved" && (
                <div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-3"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>Your Reply</span>
                  <textarea
                    rows={5}
                    placeholder="Write a clear, helpful reply…"
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    className="tkt-input resize-none mb-4"
                    style={{ lineHeight: 1.75 }}
                  />
                  <div className="flex gap-3">
                    <button onClick={handleReply} disabled={sending || !reply.trim()}
                      className="px-7 py-3 bg-[#e8c547] text-[#0a0f1e] text-[13px] font-medium rounded-[4px] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.28)] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed disabled:translate-y-0"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>
                      {sending ? "Sending…" : "Send Reply →"}
                    </button>
                    <button onClick={() => setStatus(active.id, "resolved")}
                      className="px-5 py-3 bg-transparent text-[#4ade80]/60 text-[13px] font-light rounded-[4px] border border-[#4ade80]/20 cursor-pointer hover:border-[#4ade80]/40 hover:text-[#4ade80] transition-all duration-200"
                      style={{ fontFamily:"'DM Sans',sans-serif" }}>
                      Mark Resolved
                    </button>
                  </div>
                </div>
              )}

              {active.status === "resolved" && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[#4ade80] text-[12px]">◈</span>
                  <span className="text-[12px] font-light text-[#4ade80]/50"
                    style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    This doubt has been resolved.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}