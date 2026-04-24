// ── src/pages/Teachers.jsx ──
import { useState } from "react";

const TEACHERS = [
  {
    id: 1,
    name: "Dr. Ananya Krishnan",
    subject: "Mathematics",
    topics: ["Algebra", "Trigonometry", "Calculus", "Coordinate Geometry"],
    classes: ["8", "9", "10"],
    experience: 11,
    rating: 4.9,
    students: 142,
    doubtsResolved: 318,
    availability: "Mon – Fri",
    responseTime: "< 2 hrs",
    bio: "PhD in Applied Mathematics from IIT Delhi. Passionate about making abstract concepts tangible through real-world analogies and visual problem-solving.",
    badge: "Top Rated",
    badgeColor: "#e8c547",
    avatar: "A",
  },
  {
    id: 2,
    name: "Mr. Rohit Verma",
    subject: "Science",
    topics: ["Physics", "Newton's Laws", "Electricity", "Magnetism", "Optics"],
    classes: ["9", "10"],
    experience: 8,
    rating: 4.7,
    students: 98,
    doubtsResolved: 214,
    availability: "Mon – Sat",
    responseTime: "< 4 hrs",
    bio: "M.Sc. Physics from Delhi University. Former research associate at DRDO. Believes every student is a natural scientist waiting to be unlocked.",
    badge: "Expert",
    badgeColor: "#a78bfa",
    avatar: "R",
  },
  {
    id: 3,
    name: "Ms. Preethi Nair",
    subject: "Science",
    topics: ["Biology", "Photosynthesis", "Cell Structure", "Human Body", "Ecosystems"],
    classes: ["6", "7", "8", "9"],
    experience: 6,
    rating: 4.8,
    students: 115,
    doubtsResolved: 267,
    availability: "Tue – Sat",
    responseTime: "< 3 hrs",
    bio: "M.Sc. Botany with a specialisation in plant physiology. Brings biology to life with detailed diagrams, mnemonics, and storytelling.",
    badge: "Rising Star",
    badgeColor: "#4ade80",
    avatar: "P",
  },
  {
    id: 4,
    name: "Mrs. Sunita Agarwal",
    subject: "English",
    topics: ["Grammar", "Essay Writing", "Letter Writing", "Comprehension", "Literature"],
    classes: ["6", "7", "8", "9", "10"],
    experience: 14,
    rating: 4.9,
    students: 178,
    doubtsResolved: 402,
    availability: "Mon – Fri",
    responseTime: "< 1 hr",
    bio: "M.A. English Literature from Allahabad University. With 14 years of teaching, she has an unmatched ability to simplify grammar and spark a love for reading.",
    badge: "Top Rated",
    badgeColor: "#e8c547",
    avatar: "S",
  },
  {
    id: 5,
    name: "Mr. Deepak Chauhan",
    subject: "Social Science",
    topics: ["History", "Geography", "Civics", "Economics", "Political Science"],
    classes: ["6", "7", "8", "9", "10"],
    experience: 9,
    rating: 4.6,
    students: 134,
    doubtsResolved: 189,
    availability: "Mon – Sat",
    responseTime: "< 5 hrs",
    bio: "M.A. History and Political Science. Former content writer for NCERT supplementary material. Makes history feel like storytelling, not memorisation.",
    badge: "Expert",
    badgeColor: "#a78bfa",
    avatar: "D",
  },
  {
    id: 6,
    name: "Ms. Kavitha Menon",
    subject: "Mathematics",
    topics: ["Number Systems", "Fractions", "Integers", "Basic Geometry", "Statistics"],
    classes: ["6", "7", "8"],
    experience: 5,
    rating: 4.7,
    students: 87,
    doubtsResolved: 156,
    availability: "Wed – Sun",
    responseTime: "< 3 hrs",
    bio: "B.Ed Mathematics specialist with a flair for gamified learning. Particularly focused on building strong foundational skills in middle school students.",
    badge: "Rising Star",
    badgeColor: "#4ade80",
    avatar: "K",
  },
];

const SUBJECTS = ["All", "Mathematics", "Science", "English", "Social Science"];
const CLASSES  = ["All", "6", "7", "8", "9", "10"];

const subjectColor = {
  Mathematics:    { color: "#e8c547", bg: "rgba(232,197,71,0.08)",  border: "rgba(232,197,71,0.2)"  },
  Science:        { color: "#4ade80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.2)"  },
  English:        { color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)" },
  "Social Science":{ color: "#38bdf8", bg: "rgba(56,189,248,0.07)", border: "rgba(56,189,248,0.2)"  },
};

export default function Teachers() {
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [classFilter,   setClassFilter]   = useState("All");
  const [search,        setSearch]         = useState("");
  const [selected,      setSelected]       = useState(null);
  const [sortBy,        setSortBy]         = useState("rating");

  const filtered = TEACHERS
    .filter(t =>
      (subjectFilter === "All" || t.subject === subjectFilter) &&
      (classFilter   === "All" || t.classes.includes(classFilter)) &&
      (search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.topics.some(tp => tp.toLowerCase().includes(search.toLowerCase())))
    )
    .sort((a, b) =>
      sortBy === "rating"     ? b.rating - a.rating :
      sortBy === "experience" ? b.experience - a.experience :
      sortBy === "students"   ? b.students - a.students :
      b.doubtsResolved - a.doubtsResolved
    );

  const active = TEACHERS.find(t => t.id === selected);

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
        .pill {
          padding: 6px 14px;
          border-radius: 4px;
          border: 1px solid rgba(240,236,227,0.1);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.18s;
          color: rgba(240,236,227,0.4);
          white-space: nowrap;
        }
        .pill:hover   { border-color:rgba(240,236,227,0.22); color:rgba(240,236,227,0.7); }
        .pill.active  { background:rgba(232,197,71,0.1); border-color:rgba(232,197,71,0.35); color:#e8c547; }
        .t-search {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 9px 14px 9px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #f0ece3;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .t-search::placeholder { color: rgba(240,236,227,0.2); }
        .t-search:focus { border-color: rgba(232,197,71,0.4); }
        .t-select {
          appearance: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 9px 30px 9px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(240,236,227,0.55);
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .t-select:focus { border-color: rgba(232,197,71,0.4); }
        .t-select option { background: #0d1220; }
        .teacher-card { transition: border-color 0.2s, background 0.2s, transform 0.2s; cursor:pointer; }
        .teacher-card:hover { border-color:rgba(240,236,227,0.15); background:rgba(255,255,255,0.04); transform:translateY(-2px); }
        .stat-bar { height:1px; background:rgba(240,236,227,0.06); position:relative; }
        .stat-bar-fill { position:absolute; top:0; left:0; height:1px; background:#e8c547; }
        /* Modal backdrop */
        .modal-bg {
          position:fixed; inset:0; z-index:50;
          background:rgba(10,15,30,0.85);
          backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
          padding:24px;
          animation:fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-panel {
          background:#0d1220;
          border:1px solid rgba(240,236,227,0.1);
          border-radius:16px;
          width:100%; max-width:600px;
          max-height:90vh;
          overflow-y:auto;
          position:relative;
          animation:slideUp 0.25s ease;
        }
        .modal-panel::-webkit-scrollbar { width:4px; }
        .modal-panel::-webkit-scrollbar-thumb { background:rgba(240,236,227,0.08); border-radius:4px; }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* BG grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(232,197,71,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,197,71,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-14 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(232,197,71,0.06) 0%,transparent 70%)" }}/>
        <div className="fade-up">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] block mb-3"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>Our Educators</span>
          <h1 className="text-[52px] max-md:text-[34px] font-normal leading-[1.1] mb-4">
            Meet your <em className="text-[#e8c547] italic">teachers.</em>
          </h1>
          <p className="text-[15px] font-light text-[#f0ece3]/40 max-w-[440px] mx-auto"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>
            Experienced educators across every subject — ready to explain, guide, and resolve your doubts.
          </p>
        </div>

        {/* Summary stats */}
        <div className="fade-up flex justify-center gap-6 mt-10 flex-wrap" style={{ animationDelay: "0.15s" }}>
          {[
            { val: TEACHERS.length,                                       label: "Teachers" },
            { val: TEACHERS.reduce((a,b) => a + b.students, 0) + "+",    label: "Students taught" },
            { val: TEACHERS.reduce((a,b) => a + b.doubtsResolved, 0)+"+",label: "Doubts resolved" },
            { val: (TEACHERS.reduce((a,b)=>a+b.rating,0)/TEACHERS.length).toFixed(1)+"★", label: "Avg rating" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-[28px] font-normal text-[#e8c547] leading-none">{val}</p>
              <p className="text-[11px] tracking-[0.09em] uppercase text-[#f0ece3]/25 mt-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-10">

        {/* ── FILTERS ── */}
        <div className="fade-up mb-8 flex flex-col gap-4" style={{ animationDelay: "0.18s" }}>

          {/* Row 1: search + sort */}
          <div className="flex gap-3 flex-wrap items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#f0ece3" strokeWidth="1.2"/>
                <path d="M10 10L13 13" stroke="#f0ece3" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="Search by name, subject or topic…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="t-search"/>
            </div>
            {/* Sort */}
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="t-select">
                <option value="rating">Sort: Rating</option>
                <option value="experience">Sort: Experience</option>
                <option value="students">Sort: Students</option>
                <option value="doubts">Sort: Doubts Resolved</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-30"
                width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#f0ece3" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Row 2: subject + class pills */}
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/20 self-center mr-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Subject</span>
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setSubjectFilter(s)}
                  className={`pill ${subjectFilter === s ? "active" : ""}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/20 self-center mr-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>Class</span>
              {CLASSES.map(c => (
                <button key={c} onClick={() => setClassFilter(c)}
                  className={`pill ${classFilter === c ? "active" : ""}`}>
                  {c === "All" ? "All" : `Class ${c}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="text-[12px] font-light text-[#f0ece3]/20 mb-6"
          style={{ fontFamily: "'DM Sans',sans-serif" }}>
          {filtered.length} teacher{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* ── TEACHER GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, i) => {
              const sc = subjectColor[t.subject];
              return (
                <div key={t.id}
                  onClick={() => setSelected(t.id)}
                  className="card teacher-card fade-up p-7 flex flex-col gap-5"
                  style={{ animationDelay: `${i * 0.07}s` }}>

                  {/* Top: avatar + name */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[8px] flex items-center justify-center text-[20px] font-normal shrink-0"
                      style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                      {t.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[16px] font-normal leading-tight">{t.name}</h3>
                        <span className="text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-[3px] shrink-0"
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            color: t.badgeColor,
                            background: t.badgeColor + "15",
                            border: `1px solid ${t.badgeColor}30`,
                          }}>
                          {t.badge}
                        </span>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-[3px] mt-1 inline-block"
                        style={{ fontFamily:"'DM Sans',sans-serif", color:sc.color, background:sc.bg, border:`1px solid ${sc.border}` }}>
                        {t.subject}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-[13px] font-light text-[#f0ece3]/45 leading-[1.7] line-clamp-2"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    {t.bio}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5">
                    {t.topics.slice(0, 3).map(tp => (
                      <span key={tp}
                        className="text-[10px] font-light px-2.5 py-1 rounded-[3px] border border-white/[0.07] text-[#f0ece3]/35"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {tp}
                      </span>
                    ))}
                    {t.topics.length > 3 && (
                      <span className="text-[10px] font-light px-2.5 py-1 rounded-[3px] border border-white/[0.07] text-[#f0ece3]/25"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        +{t.topics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05]"/>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: `${t.rating}★`, label: "Rating",     color: "#e8c547" },
                      { val: `${t.experience}y`,  label: "Experience", color: "rgba(240,236,227,0.5)" },
                      { val: t.students,      label: "Students",   color: "rgba(240,236,227,0.5)" },
                    ].map(({ val, label, color }) => (
                      <div key={label} className="text-center">
                        <p className="text-[16px] font-normal leading-none mb-1" style={{ color }}>{val}</p>
                        <p className="text-[9px] tracking-[0.09em] uppercase text-[#f0ece3]/20"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Classes + response */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {t.classes.map(c => (
                        <span key={c}
                          className="text-[10px] px-1.5 py-0.5 rounded-[3px] border border-white/[0.08] text-[#f0ece3]/25"
                          style={{ fontFamily: "'DM Sans',sans-serif" }}>
                          Cl.{c}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-light text-[#4ade80]/50"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      ● {t.responseTime}
                    </span>
                  </div>

                  {/* View profile CTA */}
                  <div className="text-center pt-1">
                    <span className="text-[12px] font-light text-[#e8c547]/50 hover:text-[#e8c547] transition-colors"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      View full profile →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[20px] mx-auto mb-5">◇</div>
            <p className="text-[20px] font-normal mb-2">No teachers found</p>
            <p className="text-[13px] font-light text-[#f0ece3]/30"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>

      {/* ── DETAIL MODAL ── */}
      {active && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>

            {/* Close */}
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-[4px] border border-white/[0.1] bg-transparent flex items-center justify-center text-[#f0ece3]/40 hover:text-[#f0ece3]/80 hover:border-white/25 transition-all cursor-pointer text-[16px]"
              style={{ fontFamily: "'DM Sans',sans-serif", lineHeight: 1 }}>
              ✕
            </button>

            <div className="p-8">
              {(() => {
                const sc = subjectColor[active.subject];
                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start gap-5 mb-7">
                      <div className="w-16 h-16 rounded-[10px] flex items-center justify-center text-[26px] font-normal shrink-0"
                        style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                        {active.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <span className="text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-[3px]"
                            style={{ fontFamily:"'DM Sans',sans-serif", color:active.badgeColor, background:active.badgeColor+"15", border:`1px solid ${active.badgeColor}30` }}>
                            {active.badge}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-[3px]"
                            style={{ fontFamily:"'DM Sans',sans-serif", color:sc.color, background:sc.bg, border:`1px solid ${sc.border}` }}>
                            {active.subject}
                          </span>
                        </div>
                        <h2 className="text-[26px] font-normal leading-tight">{active.name}</h2>
                        <p className="text-[13px] font-light text-[#f0ece3]/35 mt-1"
                          style={{ fontFamily:"'DM Sans',sans-serif" }}>
                          {active.experience} years experience · {active.availability}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-7">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[#e8c547] block mb-3"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>About</span>
                      <p className="text-[14px] font-light text-[#f0ece3]/60 leading-[1.8]"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>{active.bio}</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 mb-7">
                      {[
                        { label: "Rating",          val: `${active.rating} / 5.0`, color: "#e8c547",               pct: (active.rating/5)*100 },
                        { label: "Students taught", val: active.students,          color: "rgba(240,236,227,0.6)",  pct: Math.min((active.students/200)*100, 100) },
                        { label: "Doubts resolved", val: active.doubtsResolved,    color: "#4ade80",                pct: Math.min((active.doubtsResolved/500)*100,100) },
                        { label: "Response time",   val: active.responseTime,      color: "#a78bfa",                pct: null },
                      ].map(({ label, val, color, pct }) => (
                        <div key={label} className="card p-4">
                          <p className="text-[10px] tracking-[0.1em] uppercase text-[#f0ece3]/25 mb-2"
                            style={{ fontFamily:"'DM Sans',sans-serif" }}>{label}</p>
                          <p className="text-[20px] font-normal leading-none mb-2" style={{ color }}>{val}</p>
                          {pct !== null && (
                            <div className="stat-bar mt-2">
                              <div className="stat-bar-fill" style={{ width:`${pct}%`, background: color }}/>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Topics */}
                    <div className="mb-7">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[#e8c547] block mb-3"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>Topics covered</span>
                      <div className="flex flex-wrap gap-2">
                        {active.topics.map(tp => (
                          <span key={tp}
                            className="text-[12px] font-light px-3 py-1.5 rounded-[4px] border border-white/[0.08] text-[#f0ece3]/45"
                            style={{ fontFamily:"'DM Sans',sans-serif" }}>
                            ◈ {tp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Classes */}
                    <div className="mb-8">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-[#e8c547] block mb-3"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>Teaches classes</span>
                      <div className="flex gap-2">
                        {active.classes.map(c => (
                          <span key={c}
                            className="px-4 py-2 rounded-[4px] border text-[13px] font-light"
                            style={{ fontFamily:"'DM Sans',sans-serif", borderColor:sc.border, color:sc.color, background:sc.bg }}>
                            Class {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <button
                        className="flex-1 py-3.5 bg-[#e8c547] text-[#0a0f1e] text-[13px] font-medium rounded-[4px] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.28)] transition-all duration-200"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>
                        Ask a Doubt →
                      </button>
                      <button
                        className="px-6 py-3.5 bg-transparent text-[#f0ece3]/50 text-[13px] font-light rounded-[4px] border border-white/[0.1] cursor-pointer hover:border-white/25 hover:text-[#f0ece3]/80 transition-all duration-200"
                        style={{ fontFamily:"'DM Sans',sans-serif" }}>
                        Send Message
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}