// ── src/pages/StudentDoubts.jsx ──
import { useState } from "react";

const INITIAL_DOUBTS = [
  {
    id: 1,
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
    subject: "Science",
    topic: "Electricity",
    question: "Why does resistance increase with temperature in conductors but decrease in semiconductors?",
    status: "in-review",
    priority: "low",
    createdAt: "1 hour ago",
    reply: null,
    repliedAt: null,
  },
];

const SUBJECTS = ["Mathematics", "Science", "English", "Social Science"];

const statusMeta = {
  open:      { label: "Open",      color: "#e8c547",  bg: "rgba(232,197,71,0.08)",  border: "rgba(232,197,71,0.2)"  },
  "in-review":{ label: "In Review", color: "#a78bfa",  bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)" },
  resolved:  { label: "Resolved",  color: "#4ade80",  bg: "rgba(74,222,128,0.06)",  border: "rgba(74,222,128,0.2)"  },
};
const priorityMeta = {
  high:   { label: "High",   color: "#f87171" },
  medium: { label: "Medium", color: "#e8c547" },
  low:    { label: "Low",    color: "#4ade80" },
};

export default function StudentDoubts() {
  const [doubts, setDoubts]         = useState(INITIAL_DOUBTS);
  const [showForm, setShowForm]     = useState(false);
  const [expanded, setExpanded]     = useState(null);
  const [filterStatus, setFilter]   = useState("all");
  const [form, setForm]             = useState({ subject: "", topic: "", question: "", priority: "medium" });
  const [submitting, setSubmitting] = useState(false);

  const filtered = doubts.filter(d => filterStatus === "all" || d.status === filterStatus);

  const handleSubmit = async () => {
    if (!form.subject || !form.topic || !form.question.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    const newDoubt = {
      id: Date.now(),
      ...form,
      status: "open",
      createdAt: "Just now",
      reply: null,
      repliedAt: null,
    };
    setDoubts(prev => [newDoubt, ...prev]);
    setForm({ subject: "", topic: "", question: "", priority: "medium" });
    setShowForm(false);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up { opacity:0; transform:translateY(18px); animation:fadeUp 0.55s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .card { border:1px solid rgba(240,236,227,0.07); border-radius:12px; background:rgba(255,255,255,0.02); }
        .dl-input {
          width:100%; background:rgba(255,255,255,0.04);
          border:1px solid rgba(240,236,227,0.1); border-radius:4px;
          padding:10px 14px; font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:300; color:#f0ece3; outline:none;
          transition:border-color 0.2s; box-sizing:border-box;
        }
        .dl-input::placeholder { color:rgba(240,236,227,0.2); }
        .dl-input:focus { border-color:rgba(232,197,71,0.4); }
        .dl-select { appearance:none; cursor:pointer; }
        .dl-select option { background:#0d1220; }
        .ticket:hover { border-color:rgba(240,236,227,0.13); background:rgba(255,255,255,0.035); }
        .ticket { transition: border-color 0.2s, background 0.2s; }
      `}</style>

      {/* BG grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>

      {/* Header */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(232,197,71,0.05) 0%,transparent 70%)" }}/>
        <div className="max-w-[860px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="fade-up">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-2"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>My Doubts</span>
            <h1 className="text-[44px] max-md:text-[32px] font-normal leading-[1.1]">
              Ask a <em className="text-[#e8c547] italic">doubt.</em>
            </h1>
            <p className="text-[14px] font-light text-[#f0ece3]/40 mt-2 max-w-[380px]"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Raise a ticket for any concept you're stuck on. Your teacher will reply shortly.
            </p>
          </div>
          <div className="fade-up flex items-center gap-3" style={{ animationDelay: "0.15s" }}>
            {/* Stats */}
            <div className="flex gap-3">
              {[
                { label: "Open",     val: doubts.filter(d=>d.status==="open").length,      color: "#e8c547" },
                { label: "Resolved", val: doubts.filter(d=>d.status==="resolved").length,  color: "#4ade80" },
              ].map(({ label, val, color }) => (
                <div key={label} className="card px-4 py-2.5 text-center">
                  <p className="text-[22px] font-normal leading-none" style={{ color }}>{val}</p>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 mt-1"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowForm(v => !v)}
              className="px-6 py-3 bg-[#e8c547] text-[#0a0f1e] text-[13px] font-medium rounded-[4px] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.3)] transition-all duration-200"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {showForm ? "Cancel" : "Raise Doubt +"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-[860px] mx-auto px-6 md:px-8 py-10">

        {/* ── NEW DOUBT FORM ── */}
        {showForm && (
          <div className="fade-up card p-8 mb-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(232,197,71,0.07) 0%,transparent 70%)" }}/>
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-6"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>New Doubt</span>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {/* Subject */}
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-2"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>Subject</label>
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  className="dl-input dl-select">
                  <option value="">Select subject</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Topic */}
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-2"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>Topic</label>
                <input type="text" placeholder="e.g. Trigonometry" value={form.topic}
                  onChange={e => setForm({...form, topic: e.target.value})} className="dl-input"/>
              </div>
              {/* Priority */}
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-2"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>Priority</label>
                <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                  className="dl-input dl-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-2"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Your Question</label>
              <textarea rows={4} placeholder="Describe your doubt in detail…" value={form.question}
                onChange={e => setForm({...form, question: e.target.value})}
                className="dl-input resize-none" style={{ lineHeight: 1.7 }}/>
            </div>

            <button onClick={handleSubmit} disabled={submitting || !form.subject || !form.topic || !form.question.trim()}
              className="px-8 py-3 bg-[#e8c547] text-[#0a0f1e] text-[13px] font-medium rounded-[4px] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.28)] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {submitting ? "Submitting…" : "Submit Doubt →"}
            </button>
          </div>
        )}

        {/* ── FILTER TABS ── */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "open", "in-review", "resolved"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-4 py-2 rounded-[4px] border text-[12px] font-light cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                background: filterStatus === s ? "rgba(232,197,71,0.1)" : "transparent",
                borderColor: filterStatus === s ? "rgba(232,197,71,0.35)" : "rgba(240,236,227,0.1)",
                color: filterStatus === s ? "#e8c547" : "rgba(240,236,227,0.4)",
              }}>
              {s === "all" ? "All" : statusMeta[s]?.label}
              {s !== "all" && (
                <span className="ml-1.5 opacity-60">
                  {doubts.filter(d => d.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TICKETS ── */}
        <div className="flex flex-col gap-4">
          {filtered.map((doubt, i) => {
            const sm = statusMeta[doubt.status];
            const pm = priorityMeta[doubt.priority];
            const isOpen = expanded === doubt.id;
            return (
              <div key={doubt.id}
                className="card ticket cursor-pointer"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setExpanded(isOpen ? null : doubt.id)}>

                {/* Top row */}
                <div className="flex items-start justify-between gap-4 p-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                      {/* Status badge */}
                      <span className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-[3px] border font-medium"
                        style={{ fontFamily: "'DM Sans',sans-serif", color: sm.color, background: sm.bg, borderColor: sm.border }}>
                        {sm.label}
                      </span>
                      {/* Priority */}
                      <span className="text-[10px] tracking-[0.08em] uppercase font-light"
                        style={{ fontFamily: "'DM Sans',sans-serif", color: pm.color }}>
                        ● {pm.label} priority
                      </span>
                      {/* Subject · Topic */}
                      <span className="text-[11px] font-light text-[#f0ece3]/25"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {doubt.subject} · {doubt.topic}
                      </span>
                    </div>
                    <p className={`text-[15px] font-light leading-[1.6] text-[#f0ece3]/70 ${!isOpen ? "line-clamp-2" : ""}`}
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {doubt.question}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[11px] font-light text-[#f0ece3]/20"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {doubt.createdAt}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.3 }}>
                      <path d="M2 5L7 10L12 5" stroke="#f0ece3" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Expanded: reply or pending */}
                {isOpen && (
                  <div className="border-t border-white/[0.06] mx-6 pb-6 pt-5" onClick={e => e.stopPropagation()}>
                    {doubt.reply ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-[3px] border border-[#4ade80]/20 bg-[#4ade80]/[0.06] flex items-center justify-center text-[9px] text-[#4ade80]">T</div>
                          <span className="text-[11px] tracking-[0.08em] uppercase text-[#4ade80]/60" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                            Teacher replied · {doubt.repliedAt}
                          </span>
                        </div>
                        <div className="px-5 py-4 rounded-[6px] border-l-2 border-[#4ade80]/30 bg-[#4ade80]/[0.04]">
                          <p className="text-[14px] font-light text-[#f0ece3]/65 leading-[1.75]"
                            style={{ fontFamily: "'DM Sans',sans-serif" }}>
                            {doubt.reply}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e8c547] animate-pulse shrink-0"/>
                        <p className="text-[13px] font-light text-[#f0ece3]/30" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          Waiting for teacher's reply…
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[18px] font-normal mb-2">No doubts here</p>
              <p className="text-[13px] font-light text-[#f0ece3]/30" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Raise a new doubt using the button above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}