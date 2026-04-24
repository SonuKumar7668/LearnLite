export default function Profile() {
  const user = {
    name: "Basuki Nath Pandey",
    email: "basuki@example.com",
    class: "Class 9",
    joinedDate: "August 2024",
    streak: 12,
  };

  const stats = {
    quizzesTaken: 24,
    avgScore: 78,
    totalStudyHours: 47,
    rank: 3,
    weakTopics: ["Trigonometry", "Electricity"],
    strongTopics: ["Photosynthesis", "Grammar", "History"],
  };

  const subjects = [
    { name: "Mathematics",    progress: 80, quizzes: 8,  avg: 74 },
    { name: "Science",        progress: 65, quizzes: 7,  avg: 68 },
    { name: "English",        progress: 90, quizzes: 5,  avg: 88 },
    { name: "Social Science", progress: 70, quizzes: 4,  avg: 72 },
  ];

  const recent = [
    { topic: "Photosynthesis",  subject: "Science",        score: "16/20", date: "Today" },
    { topic: "Newton's Laws",   subject: "Science",        score: "14/20", date: "Yesterday" },
    { topic: "Trigonometry",    subject: "Mathematics",    score: "10/20", date: "2 days ago" },
    { topic: "The Mughal Era",  subject: "Social Science", score: "18/20", date: "3 days ago" },
    { topic: "Parts of Speech", subject: "English",        score: "19/20", date: "4 days ago" },
  ];

  // Weekly activity — quizzes per day (Mon–Sun)
  const weekly = [
    { day: "Mon", count: 2 },
    { day: "Tue", count: 4 },
    { day: "Wed", count: 1 },
    { day: "Thu", count: 3 },
    { day: "Fri", count: 5 },
    { day: "Sat", count: 2 },
    { day: "Sun", count: 3 },
  ];
  const maxCount = Math.max(...weekly.map((d) => d.count));

  // Monthly score trend
  const monthly = [
    { month: "Sep", score: 62 },
    { month: "Oct", score: 68 },
    { month: "Nov", score: 71 },
    { month: "Dec", score: 75 },
    { month: "Jan", score: 73 },
    { month: "Feb", score: 78 },
  ];

  // SVG line chart helpers
  const chartW = 400, chartH = 100;
  const pad = { l: 8, r: 8, t: 10, b: 10 };
  const minScore = 55, maxScore = 90;
  const pts = monthly.map((m, i) => {
    const x = pad.l + (i / (monthly.length - 1)) * (chartW - pad.l - pad.r);
    const y = chartH - pad.b - ((m.score - minScore) / (maxScore - minScore)) * (chartH - pad.t - pad.b);
    return { x, y, ...m };
  });
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M${pts[0].x},${chartH - pad.b} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${chartH - pad.b} Z`;

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up { opacity:0; transform:translateY(20px); animation:fadeUp 0.6s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .card {
          border: 1px solid rgba(240,236,227,0.07);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          position: relative;
          overflow: hidden;
        }
        .card-glow::after {
          content:'';
          position:absolute;
          top:-40px; right:-40px;
          width:120px; height:120px;
          border-radius:50%;
          background: radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%);
          pointer-events:none;
        }
        .bar-track {
          width: 100%;
          height: 1px;
          background: rgba(240,236,227,0.06);
          position: relative;
        }
        .bar-fill {
          position: absolute;
          top: 0; left: 0;
          height: 1px;
          background: #e8c547;
          transition: width 0.8s ease;
        }
        .bar-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #e8c547;
        }
        .tooltip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: #1a2235;
          border: 1px solid rgba(232,197,71,0.2);
          border-radius: 4px;
          padding: 3px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #e8c547;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s;
        }
        .chart-dot:hover .tooltip { opacity: 1; }
      `}</style>

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative max-w-[1000px] mx-auto px-6 pt-32 pb-24">

        {/* ── PROFILE HEADER ── */}
        <div className="fade-up card card-glow p-8 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[10px] border border-[#e8c547]/25 bg-[#e8c547]/[0.07] flex items-center justify-center text-[28px] font-normal text-[#e8c547] shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Student Profile
              </span>
              <h1 className="text-[28px] font-normal leading-tight">{user.name}</h1>
              <p className="text-[13px] font-light text-[#f0ece3]/35 mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                {user.email} · {user.class} · Joined {user.joinedDate}
              </p>
            </div>
          </div>

          {/* Quick badges */}
          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2.5 rounded-[6px] border border-[#e8c547]/15 bg-[#e8c547]/[0.05] text-center">
              <p className="text-[20px] font-normal text-[#e8c547] leading-none">{user.streak}</p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/30 mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>Day streak</p>
            </div>
            <div className="px-4 py-2.5 rounded-[6px] border border-[#4ade80]/15 bg-[#4ade80]/[0.04] text-center">
              <p className="text-[20px] font-normal text-[#4ade80] leading-none">#{stats.rank}</p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/30 mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>Class rank</p>
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" style={{ animationDelay: "0.18s" }}>
          {[
            { label: "Quizzes taken",   value: stats.quizzesTaken,      unit: "",   color: "#e8c547" },
            { label: "Average score",   value: `${stats.avgScore}`,     unit: "%",  color: "#e8c547" },
            { label: "Study hours",     value: stats.totalStudyHours,   unit: "h",  color: "#a78bfa" },
            { label: "Topics covered",  value: 18,                      unit: "",   color: "#4ade80" },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="card p-6 text-center">
              <p className="text-[36px] font-normal leading-none mb-1" style={{ color }}>
                {value}<span className="text-[20px]">{unit}</span>
              </p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── ROW: SCORE TREND + WEEKLY ACTIVITY ── */}
        <div className="fade-up grid md:grid-cols-2 gap-6 mb-6" style={{ animationDelay: "0.26s" }}>

          {/* Score trend line chart */}
          <div className="card card-glow p-7">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Score Trend
            </span>
            <p className="text-[13px] font-light text-[#f0ece3]/30 mb-6" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Monthly average — last 6 months
            </p>

            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" style={{ overflow: "visible" }}>
              {/* Horizontal guides */}
              {[60, 70, 80].map((v) => {
                const y = chartH - pad.b - ((v - minScore) / (maxScore - minScore)) * (chartH - pad.t - pad.b);
                return (
                  <g key={v}>
                    <line x1={pad.l} y1={y} x2={chartW - pad.r} y2={y} stroke="rgba(240,236,227,0.05)" strokeWidth="1" />
                    <text x={pad.l} y={y - 3} fontSize="7" fill="rgba(240,236,227,0.2)" fontFamily="DM Sans, sans-serif">{v}%</text>
                  </g>
                );
              })}
              {/* Area fill */}
              <path d={areaPath} fill="url(#goldGrad)" opacity="0.15" />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8c547" />
                  <stop offset="100%" stopColor="#e8c547" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Line */}
              <polyline points={polyline} fill="none" stroke="#e8c547" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
              {/* Dots with tooltip */}
              {pts.map((p) => (
                <g key={p.month} className="chart-dot" style={{ cursor: "default" }}>
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#0a0f1e" stroke="#e8c547" strokeWidth="1.5" />
                  <foreignObject x={p.x - 30} y={p.y - 32} width="60" height="26">
                    <div className="tooltip">{p.score}%</div>
                  </foreignObject>
                </g>
              ))}
              {/* Month labels */}
              {pts.map((p) => (
                <text key={`l-${p.month}`} x={p.x} y={chartH + 4} textAnchor="middle" fontSize="8" fill="rgba(240,236,227,0.25)" fontFamily="DM Sans, sans-serif">
                  {p.month}
                </text>
              ))}
            </svg>
          </div>

          {/* Weekly activity bar chart */}
          <div className="card p-7">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Weekly Activity
            </span>
            <p className="text-[13px] font-light text-[#f0ece3]/30 mb-6" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Quizzes attempted this week
            </p>

            <div className="flex items-end justify-between gap-2 h-[90px]">
              {weekly.map(({ day, count }) => {
                const pct = (count / maxCount) * 100;
                const isToday = day === "Fri";
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-light text-[#f0ece3]/30" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {count}
                    </span>
                    <div className="w-full rounded-[3px] transition-all duration-700 relative group"
                      style={{
                        height: `${Math.max(pct, 8)}%`,
                        background: isToday ? "#e8c547" : "rgba(232,197,71,0.18)",
                        minHeight: 6,
                      }}
                    >
                      <div className="tooltip">{count} quiz{count !== 1 ? "zes" : ""}</div>
                    </div>
                    <span className="text-[10px] font-light" style={{
                      fontFamily: "'DM Sans',sans-serif",
                      color: isToday ? "#e8c547" : "rgba(240,236,227,0.25)",
                    }}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── SUBJECT PROGRESS ── */}
        <div className="fade-up card card-glow p-8 mb-6" style={{ animationDelay: "0.34s" }}>
          <div className="flex items-center justify-between mb-7">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547]" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Subject Progress
            </span>
            <span className="text-[11px] font-light text-[#f0ece3]/25" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Mastery · Quizzes · Avg score
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {subjects.map((sub) => (
              <div key={sub.name}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[14px] font-light text-[#f0ece3]/70" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    {sub.name}
                  </span>
                  <div className="flex items-center gap-5">
                    <span className="text-[12px] font-light text-[#f0ece3]/25" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {sub.quizzes} quizzes
                    </span>
                    <span className="text-[12px] font-light text-[#f0ece3]/25" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      avg {sub.avg}%
                    </span>
                    <span className="text-[13px] font-light text-[#e8c547]/70" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {sub.progress}%
                    </span>
                  </div>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${sub.progress}%` }} />
                  <div className="bar-dot" style={{ left: `${sub.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM ROW: TOPICS + RECENT ── */}
        <div className="fade-up grid md:grid-cols-5 gap-6" style={{ animationDelay: "0.42s" }}>

          {/* Topics — 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Weak */}
            <div className="card p-6 flex-1">
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#f87171]/60 block mb-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Needs Work
              </span>
              <div className="flex flex-wrap gap-2">
                {stats.weakTopics.map((t) => (
                  <span key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-[#f87171]/20 bg-[#f87171]/[0.05] text-[12px] font-light text-[#f87171]/70" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    <span className="w-1 h-1 rounded-full bg-[#f87171]/50 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Strong */}
            <div className="card p-6 flex-1">
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#4ade80]/60 block mb-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Strengths
              </span>
              <div className="flex flex-wrap gap-2">
                {stats.strongTopics.map((t) => (
                  <span key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-[#4ade80]/20 bg-[#4ade80]/[0.04] text-[12px] font-light text-[#4ade80]/70" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    <span className="w-1 h-1 rounded-full bg-[#4ade80]/50 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity — 3 cols */}
          <div className="md:col-span-3 card p-7">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Recent Activity
            </span>

            <div className="flex flex-col">
              {recent.map((item, i) => {
                const [got, total] = item.score.split("/").map(Number);
                const pct = Math.round((got / total) * 100);
                const good = pct >= 75;
                return (
                  <div key={i} className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[11px] shrink-0" style={{ color: good ? "#4ade80" : "#f87171" }}>
                        {good ? "◈" : "◇"}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-light text-[#f0ece3]/65 truncate" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          {item.topic}
                        </p>
                        <p className="text-[11px] font-light text-[#f0ece3]/25" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          {item.subject} · {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {/* Mini score bar */}
                      <div className="w-16 h-px bg-white/[0.07] relative hidden sm:block">
                        <div className="absolute top-0 left-0 h-px transition-all" style={{ width: `${pct}%`, background: good ? "#4ade80" : "#f87171" }} />
                      </div>
                      <span className="text-[13px] font-light w-12 text-right" style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: good ? "rgba(74,222,128,0.7)" : "rgba(248,113,113,0.7)",
                      }}>
                        {item.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}