import { useNavigate } from "react-router";

const FEATURES = [
  {
    icon: "◈",
    label: "AI Tutor",
    title: "Chat & Learn",
    desc: "Ask anything, get instant clarity.",
    path: "/chat",
    color: "#e8c547",
    bg: "rgba(232,197,71,0.06)",
    border: "rgba(232,197,71,0.15)",
    span: "col-span-2",
  },
  {
    icon: "◇",
    label: "Smart Quiz",
    title: "Test Yourself",
    desc: "AI-generated quizzes on any topic.",
    path: "/quiz",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.05)",
    border: "rgba(74,222,128,0.15)",
    span: "col-span-1",
  },
  {
    icon: "◉",
    label: "Study Notes",
    title: "Notes Library",
    desc: "Curated notes for Class 6–10.",
    path: "/notes",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.05)",
    border: "rgba(167,139,250,0.15)",
    span: "col-span-1",
  },
  {
    icon: "▣",
    label: "Focus Timer",
    title: "Pomodoro",
    desc: "25-min sessions. Track deep focus.",
    path: "/pomodoro",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.15)",
    span: "col-span-1",
  },
  {
    icon: "⊕",
    label: "Doubts",
    title: "Ask a Doubt",
    desc: "Raise tickets. Teachers reply fast.",
    path: "/doubts",
    color: "#f87171",
    bg: "rgba(248,113,113,0.05)",
    border: "rgba(248,113,113,0.15)",
    span: "col-span-1",
  },
  {
    icon: "◎",
    label: "Educators",
    title: "Our Teachers",
    desc: "Browse expert teachers by subject.",
    path: "/teachers",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.05)",
    border: "rgba(74,222,128,0.15)",
    span: "col-span-1",
  },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] flex flex-col"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up { opacity:0; transform:translateY(16px); animation:fadeUp 0.5s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .feat-card {
          border-radius: 12px;
          border: 1px solid rgba(240,236,227,0.07);
          background: rgba(255,255,255,0.02);
          padding: 28px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.045);
          transform: translateY(-2px);
        }
        .feat-card::before {
          content:'';
          position:absolute;
          top:0; left:0;
          width:100%; height:2px;
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.3s ease;
        }
        .feat-card:hover::before { transform:scaleX(1); }
      `}</style>

      {/* BG grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.022) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>

      {/* ── CONTENT ── */}
      <div className="relative flex-1 flex flex-col max-w-[1050px] mx-auto w-full px-6 md:px-10 pt-28 pb-10 gap-8">

        {/* Heading row */}
        <div className="fade-up flex items-end justify-between flex-wrap gap-4">
          <div>
            <span
              className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-2"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              Everything included
            </span>
            <h1 className="text-[42px] max-md:text-[30px] font-normal leading-[1.1]">
              All <em className="text-[#e8c547] italic">features.</em>
            </h1>
          </div>
          <p
            className="text-[14px] font-light text-[#f0ece3]/35 max-w-[300px] leading-[1.7] text-right max-md:text-left"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            Everything you need to learn, practise, and improve — in one place.
          </p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="fade-up flex-1 grid grid-cols-4 grid-rows-2 gap-4 max-md:grid-cols-2 max-md:grid-rows-4"
          style={{ animationDelay: "0.12s" }}>

          {FEATURES.map((f, i) => (
            <div
              key={f.path}
              onClick={() => navigate(f.path)}
              className={`feat-card ${f.span}`}
              style={{
                borderColor: "rgba(240,236,227,0.07)",
                animationDelay: `${0.1 + i * 0.05}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.border;
                e.currentTarget.querySelector(".feat-bar").style.transform = "scaleX(1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(240,236,227,0.07)";
                e.currentTarget.querySelector(".feat-bar").style.transform = "scaleX(0)";
              }}
            >
              {/* Top bar */}
              <div className="feat-bar absolute top-0 left-0 w-full h-[2px] transition-transform duration-300"
                style={{ background: f.color, transform: "scaleX(0)", transformOrigin: "left" }}/>

              {/* Corner glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${f.color}10 0%, transparent 70%)` }}/>

              {/* Label + icon */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-[3px]"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    color: f.color,
                    background: f.bg,
                    border: `1px solid ${f.border}`,
                  }}
                >
                  {f.label}
                </span>
                <span className="text-[22px]" style={{ color: f.color, opacity: 0.5 }}>
                  {f.icon}
                </span>
              </div>

              {/* Text + arrow */}
              <div>
                <h2 className="text-[20px] font-normal leading-tight mb-1.5">{f.title}</h2>
                <p
                  className="text-[13px] font-light leading-[1.65] mb-4"
                  style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(240,236,227,0.4)" }}
                >
                  {f.desc}
                </p>
                <span
                  className="text-[12px] font-light transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans',sans-serif", color: f.color + "70" }}
                >
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}