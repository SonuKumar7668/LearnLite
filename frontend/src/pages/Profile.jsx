export default function Profile() {
  const user = {
    name: "Basuki Nath Pandey",
    email: "basuki@example.com",
    class: "Class 9",
  };

  const stats = {
    quizzesTaken: 24,
    avgScore: 78,
    weakTopics: ["Trigonometry", "Electricity"],
  };

  const subjects = [
    { name: "Mathematics", progress: 80 },
    { name: "Science", progress: 65 },
    { name: "English", progress: 90 },
    { name: "Social Science", progress: 70 },
  ];

  const recent = [
    { topic: "Photosynthesis", score: "16/20" },
    { topic: "Newton's Laws", score: "14/20" },
    { topic: "Trigonometry", score: "10/20" },
  ];

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
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

      <div className="relative max-w-[900px] mx-auto px-6 pt-32 pb-20">

        {/* ── USER INFO ── */}
        <div className="fade-up mb-10" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-5 mb-6">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-[8px] border border-[#e8c547]/20 bg-[#e8c547]/[0.06] flex items-center justify-center text-[22px] font-normal text-[#e8c547] shrink-0"
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <span
                className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Student Profile
              </span>
              <h1 className="text-[32px] font-normal leading-none">{user.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t border-white/[0.06] pt-5">
            {[
              { label: "Email", value: user.email },
              { label: "Class", value: user.class },
            ].map(({ label, value }) => (
              <div key={label}>
                <span
                  className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
                <span
                  className="text-[14px] font-light text-[#f0ece3]/60"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          className="fade-up grid grid-cols-3 gap-4 mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            { label: "Quizzes taken", value: stats.quizzesTaken },
            { label: "Average score", value: `${stats.avgScore}%` },
            { label: "Weak topics", value: stats.weakTopics.length },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="border border-white/[0.07] rounded-xl bg-white/[0.02] px-6 py-6 text-center"
            >
              <p className="text-[38px] font-normal text-[#e8c547] leading-none mb-2">
                {value}
              </p>
              <p
                className="text-[11px] tracking-[0.1em] uppercase text-[#f0ece3]/25"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── SUBJECT PROGRESS ── */}
        <div
          className="fade-up border border-white/[0.07] rounded-xl bg-white/[0.02] p-8 mb-6 relative overflow-hidden"
          style={{ animationDelay: "0.3s" }}
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%)" }}
          />
          <span
            className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Subject Progress
          </span>

          <div className="flex flex-col gap-5">
            {subjects.map((sub) => (
              <div key={sub.name}>
                <div className="flex justify-between mb-2">
                  <span
                    className="text-[14px] font-light text-[#f0ece3]/65"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {sub.name}
                  </span>
                  <span
                    className="text-[13px] font-light text-[#e8c547]/70"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {sub.progress}%
                  </span>
                </div>
                {/* Track */}
                <div className="w-full h-px bg-white/[0.07] relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-[#e8c547] transition-all duration-700"
                    style={{ width: `${sub.progress}%` }}
                  />
                  {/* Dot at end of bar */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#e8c547] transition-all duration-700"
                    style={{ left: `${sub.progress}%`, marginLeft: "-3px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          className="fade-up grid md:grid-cols-2 gap-6"
          style={{ animationDelay: "0.4s" }}
        >

          {/* Weak Topics */}
          <div className="border border-white/[0.07] rounded-xl bg-white/[0.02] p-8">
            <span
              className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Weak Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {stats.weakTopics.map((topic) => (
                <span
                  key={topic}
                  className="flex items-center gap-2 px-4 py-2 rounded-[4px] border border-[#f87171]/20 bg-[#f87171]/[0.05] text-[13px] font-light text-[#f87171]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#f87171]/50 shrink-0" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-white/[0.07] rounded-xl bg-white/[0.02] p-8">
            <span
              className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Recent Activity
            </span>
            <div className="flex flex-col gap-3">
              {recent.map((item, i) => {
                const [got, total] = item.score.split("/").map(Number);
                const pct = Math.round((got / total) * 100);
                const good = pct >= 75;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[12px]"
                        style={{ color: good ? "#4ade80" : "#f87171" }}
                      >
                        {good ? "◈" : "◇"}
                      </span>
                      <span
                        className="text-[14px] font-light text-[#f0ece3]/60"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.topic}
                      </span>
                    </div>
                    <span
                      className="text-[13px] font-light"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: good ? "rgba(74,222,128,0.7)" : "rgba(248,113,113,0.7)",
                      }}
                    >
                      {item.score}
                    </span>
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