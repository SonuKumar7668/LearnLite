// ── src/pages/PomodoroTimer.jsx ──
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MODES = {
  focus:      { label: "Focus",       duration: 25 * 60, color: "#e8c547" },
  shortBreak: { label: "Short Break", duration: 5  * 60, color: "#4ade80" },
  longBreak:  { label: "Long Break",  duration: 30 * 60, color: "#a78bfa" },
};

const SUBJECTS = ["Mathematics", "Science", "English", "Social Science", "Other"];

const INITIAL_LOG = [
  { id: 1, subject: "Mathematics",    sessions: 3, minutes: 75, date: "Today" },
  { id: 2, subject: "Science",        sessions: 2, minutes: 50, date: "Today" },
  { id: 3, subject: "English",        sessions: 4, minutes: 100, date: "Yesterday" },
  { id: 4, subject: "Social Science", sessions: 1, minutes: 25, date: "Yesterday" },
];

function pad(n) { return String(n).padStart(2, "0"); }

export default function PomodoroTimer() {
  const [mode, setMode]             = useState("focus");
  const [timeLeft, setTimeLeft]     = useState(MODES.focus.duration);
  const [running, setRunning]       = useState(false);
  //const [round, setRound]           = useState(1);          // 1–4
  const [completedInSet, setCompletedInSet] = useState(0);  // focus rounds done
  const [subject, setSubject]       = useState("Mathematics");
  const [log, setLog]               = useState(INITIAL_LOG);
  const [sessionDone, setSessionDone] = useState(false);
  const intervalRef = useRef(null);
  //const audioCtx    = useRef(null);

  const currentMode = MODES[mode];
  const totalSeconds = currentMode.duration;
  const elapsed = totalSeconds - timeLeft;
  const progress = elapsed / totalSeconds;                   // 0 → 1
  const circumference = 2 * Math.PI * 108;                  // r=108

    const { userInfo } = useContext(AuthContext);
// ── COMPLETE ──
  function handleComplete() {
    playDing();
    setRunning(false);
    setSessionDone(true);

    if (mode === "focus") {
      const next = completedInSet + 1;
      setCompletedInSet(next);

      // Log the session
      setLog(prev => {
        const idx = prev.findIndex(l => l.subject === subject && l.date === "Today");
        if (idx >= 0) {
          return prev.map((l, i) => i === idx
            ? { ...l, sessions: l.sessions + 1, minutes: l.minutes + 25 }
            : l);
        }
        return [{ id: Date.now(), subject, sessions: 1, minutes: 25, date: "Today" }, ...prev];
      });

      // After 4 focus rounds → long break
      if (next >= 4) {
        setCompletedInSet(0);
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
      //setRound(r => Math.min(r + 1, 4));
    } else {
      // After any break → back to focus
      switchMode("focus");
      //setRound(1);
    }
  }
  // ── TICK ──
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            handleComplete();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  

  function switchMode(m) {
    setMode(m);
    setTimeLeft(MODES[m].duration);
    setRunning(false);
    setSessionDone(false);
  }

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(currentMode.duration);
    setSessionDone(false);
  }

  // ── DING via Web Audio ──
  function playDing() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(); osc.stop(ctx.currentTime + 1.2);
    } catch(err) {
        console.warn("Audio API not supported:", err);
    }
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  // Weekly bar data (hardcoded + today's live sessions)
  const todayFocus = log.filter(l => l.date === "Today").reduce((a, b) => a + b.sessions, 0);
  const weekly = [
    { day: "Mon", sessions: 4 },
    { day: "Tue", sessions: 6 },
    { day: "Wed", sessions: 3 },
    { day: "Thu", sessions: 7 },
    { day: "Fri", sessions: 5 },
    { day: "Sat", sessions: 2 },
    { day: "Sun", sessions: todayFocus },
  ];
  const maxW = Math.max(...weekly.map(d => d.sessions), 1);

  const totalTodayMins = log.filter(l => l.date === "Today").reduce((a, b) => a + b.minutes, 0);
  const totalSessions  = log.reduce((a, b) => a + b.sessions, 0);

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up { opacity:0; transform:translateY(18px); animation:fadeUp 0.55s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .card { border:1px solid rgba(240,236,227,0.07); border-radius:12px; background:rgba(255,255,255,0.02); }
        .mode-btn {
          padding: 7px 18px;
          border-radius: 4px;
          border: 1px solid rgba(240,236,227,0.1);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s;
          color: rgba(240,236,227,0.4);
        }
        .mode-btn:hover { color: rgba(240,236,227,0.7); border-color: rgba(240,236,227,0.2); }
        .dl-select {
          appearance: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(240,236,227,0.65);
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .dl-select:focus { border-color: rgba(232,197,71,0.4); }
        .dl-select option { background: #0d1220; }
        @keyframes ringPulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(232,197,71,0.3)); }
          50%       { filter: drop-shadow(0 0 16px rgba(232,197,71,0.55)); }
        }
        .ring-pulse { animation: ringPulse 2s ease-in-out infinite; }
        @keyframes scalePop { 0%{transform:scale(0.95)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }
        .scale-pop { animation: scalePop 0.35s ease; }
      `}</style>

      {/* BG grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-12 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(232,197,71,0.06) 0%,transparent 70%)" }}/>
        <div className="fade-up">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-3"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>Focus Timer</span>
          <h1 className="text-[48px] max-md:text-[34px] font-normal leading-[1.1]">
             <em className="text-[#e8c547] italic">{userInfo.name}</em>
          </h1>
          <p className="text-[14px] font-light text-[#f0ece3]/40 mt-3 max-w-[380px] mx-auto"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>
            25 min focus · 5 min break · repeat. Build deep focus one session at a time.
          </p>
        </div>
      </div>

      <div className="relative max-w-[1000px] mx-auto px-6 md:px-10 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: TIMER ── */}
          <div className="flex flex-col gap-5">

            {/* Mode tabs */}
            <div className="fade-up flex gap-2 justify-center" style={{ animationDelay: "0.1s" }}>
              {Object.entries(MODES).map(([key, m]) => (
                <button key={key} onClick={() => switchMode(key)} className="mode-btn"
                  style={{
                    background: mode === key ? "rgba(255,255,255,0.05)" : "transparent",
                    borderColor: mode === key ? m.color + "55" : "rgba(240,236,227,0.1)",
                    color: mode === key ? m.color : "rgba(240,236,227,0.4)",
                  }}>
                  {m.label}
                </button>
              ))}
            </div>

            {/* SVG ring timer */}
            <div className="fade-up flex flex-col items-center" style={{ animationDelay: "0.18s" }}>
              <div className="relative" style={{ width: 260, height: 260 }}>

                {/* Glow behind ring */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${currentMode.color}11 0%, transparent 65%)` }}/>

                <svg width="260" height="260" viewBox="0 0 260 260"
                  className={running ? "ring-pulse" : ""}>
                  {/* Track */}
                  <circle cx="130" cy="130" r="108"
                    fill="none" stroke="rgba(240,236,227,0.06)" strokeWidth="6"/>
                  {/* Progress arc */}
                  <circle cx="130" cy="130" r="108"
                    fill="none"
                    stroke={currentMode.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "130px 130px", transition: "stroke-dashoffset 0.8s ease, stroke 0.4s" }}
                  />
                  {/* Dot at tip */}
                  {running && (
                    <circle
                      cx={130 + 108 * Math.cos((progress * 2 * Math.PI) - Math.PI / 2)}
                      cy={130 + 108 * Math.sin((progress * 2 * Math.PI) - Math.PI / 2)}
                      r="5" fill={currentMode.color}
                      style={{ filter: `drop-shadow(0 0 4px ${currentMode.color})` }}
                    />
                  )}
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[11px] tracking-[0.14em] uppercase mb-2"
                    style={{ fontFamily: "'DM Sans',sans-serif", color: currentMode.color + "99" }}>
                    {currentMode.label}
                  </span>
                  <p className="text-[52px] font-normal leading-none tracking-tight"
                    style={{ color: currentMode.color }}>
                    {pad(mins)}:{pad(secs)}
                  </p>
                  {/* Round dots */}
                  <div className="flex gap-1.5 mt-3">
                    {[1,2,3,4].map(n => (
                      <div key={n} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: n <= completedInSet ? "#e8c547" : "rgba(240,236,227,0.12)" }}/>
                    ))}
                  </div>
                  <p className="text-[11px] font-light text-[#f0ece3]/25 mt-1.5"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Round {Math.min(completedInSet + 1, 4)} of 4
                  </p>
                </div>
              </div>
            </div>

            {/* Subject selector */}
            <div className="fade-up" style={{ animationDelay: "0.24s" }}>
              <label className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 block mb-2"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Studying</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="dl-select w-full" disabled={running}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Controls */}
            <div className="fade-up flex gap-3" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => { setRunning(r => !r); setSessionDone(false); }}
                className="flex-1 py-3.5 text-[14px] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  background: currentMode.color,
                  color: "#0a0f1e",
                  boxShadow: running ? `0 6px 24px ${currentMode.color}44` : "none",
                }}>
                {running ? "Pause" : (timeLeft < totalSeconds ? "Resume" : "Start")} {running ? "⏸" : "▶"}
              </button>
              <button onClick={reset}
                className="px-5 py-3.5 text-[13px] font-light rounded-[4px] border border-white/[0.1] bg-transparent text-[#f0ece3]/40 cursor-pointer hover:border-white/25 hover:text-[#f0ece3]/70 transition-all duration-200"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Reset
              </button>
            </div>

            {/* Session done banner */}
            {sessionDone && (
              <div className="fade-up px-5 py-4 rounded-[6px] border border-[#4ade80]/25 bg-[#4ade80]/[0.05] flex items-center gap-3">
                <span className="text-[#4ade80] text-[16px]">◈</span>
                <p className="text-[13px] font-light text-[#4ade80]/80"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  {mode !== "focus"
                    ? "Focus session logged! Enjoy your break."
                    : "Break over — time to focus again!"}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: STATS ── */}
          <div className="flex flex-col gap-5">

            {/* Today quick stats */}
            <div className="fade-up grid grid-cols-3 gap-3" style={{ animationDelay: "0.14s" }}>
              {[
                { label: "Sessions today", value: todayFocus,       color: "#e8c547" },
                { label: "Focus minutes",  value: totalTodayMins,   color: "#a78bfa" },
                { label: "Total sessions", value: totalSessions,    color: "#4ade80" },
              ].map(({ label, value, color }) => (
                <div key={label} className="card px-4 py-5 text-center">
                  <p className="text-[28px] font-normal leading-none mb-1.5" style={{ color }}>
                    {value}
                  </p>
                  <p className="text-[10px] tracking-[0.09em] uppercase text-[#f0ece3]/25"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Weekly bar chart */}
            <div className="fade-up card p-7" style={{ animationDelay: "0.2s" }}>
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>This Week</span>
              <p className="text-[12px] font-light text-[#f0ece3]/25 mb-6"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Focus sessions per day</p>
              <div className="flex items-end justify-between gap-2 h-[80px]">
                {weekly.map(({ day, sessions }) => {
                  const isToday = day === "Sun";
                  const pct = (sessions / maxW) * 100;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                      <span className="text-[10px] font-light text-[#f0ece3]/30"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>{sessions}</span>
                      <div className="w-full rounded-[3px] transition-all duration-700"
                        style={{
                          height: `${Math.max(pct, 6)}%`,
                          background: isToday ? "#e8c547" : "rgba(232,197,71,0.15)",
                          minHeight: 4,
                        }}/>
                      <span className="text-[10px] font-light"
                        style={{ fontFamily: "'DM Sans',sans-serif",
                          color: isToday ? "#e8c547" : "rgba(240,236,227,0.22)" }}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subject log */}
            <div className="fade-up card p-7" style={{ animationDelay: "0.28s" }}>
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-5"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Session Log</span>
              <div className="flex flex-col gap-0">
                {log.map((entry) => (
                  <div key={entry.id}
                    className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
                    <div>
                      <p className="text-[14px] font-light text-[#f0ece3]/65"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {entry.subject}
                      </p>
                      <p className="text-[11px] font-light text-[#f0ece3]/25"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {entry.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-light text-[#e8c547]/70"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {entry.sessions} session{entry.sessions !== 1 ? "s" : ""}
                      </p>
                      <p className="text-[11px] font-light text-[#f0ece3]/25"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {entry.minutes} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="fade-up card p-6" style={{ animationDelay: "0.36s" }}>
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-4"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Tips</span>
              <ul className="flex flex-col gap-3">
                {[
                  "Put your phone face-down during focus sessions.",
                  "Use breaks to stretch — not scroll social media.",
                  "After 4 rounds, take a real 30-minute break.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#e8c547]/40 text-[12px] mt-0.5 shrink-0">◈</span>
                    <span className="text-[13px] font-light text-[#f0ece3]/40 leading-[1.65]"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}