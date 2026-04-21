import { useState } from "react";

const notesData = [
  { id: 1,  class: "6",  subject: "Math",          topic: "Fractions",          title: "Understanding Fractions",         file: "/src/assets/notes/class6_math_fractions.pdf" },
  { id: 2,  class: "6",  subject: "Science",        topic: "Food & Nutrition",   title: "Food and Its Components",         file: "/src/assets/notes/class6_science_food.pdf" },
  { id: 3,  class: "6",  subject: "English",        topic: "Parts of Speech",    title: "Grammar: Parts of Speech",        file: "/src/assets/notes/class6_english_pos.pdf" },
  { id: 4,  class: "7",  subject: "Math",          topic: "Integers",           title: "Integers & Number Line",          file: "/src/assets/notes/class7_math_integers.pdf" },
  { id: 5,  class: "7",  subject: "Science",        topic: "Heat",              title: "Heat and Temperature",            file: "/src/assets/notes/class7_science_heat.pdf" },
  { id: 6,  class: "7",  subject: "Social Science", topic: "Medieval India",     title: "Medieval Indian History",         file: "/src/assets/notes/class7_ss_medieval.pdf" },
  { id: 7,  class: "8",  subject: "Math",          topic: "Algebra",            title: "Algebraic Expressions",           file: "/src/assets/notes/class8_math_algebra.pdf" },
  { id: 8,  class: "8",  subject: "Science",        topic: "Cell Structure",    title: "Cell — The Unit of Life",         file: "/src/assets/notes/class8_science_cell.pdf" },
  { id: 9,  class: "8",  subject: "English",        topic: "Tenses",            title: "English Tenses Guide",            file: "/src/assets/notes/class8_english_tenses.pdf" },
  { id: 10, class: "9",  subject: "Math",          topic: "Coordinate Geometry","title": "Coordinate Geometry Basics",   file: "/src/assets/notes/class9_math_coord.pdf" },
  { id: 11, class: "9",  subject: "Science",        topic: "Atoms & Molecules",  title: "Atoms, Molecules & Matter",       file: "/src/assets/notes/class9_science_atoms.pdf" },
  { id: 12, class: "9",  subject: "Social Science", topic: "French Revolution",  title: "The French Revolution",           file: "/src/assets/notes/class9_ss_french.pdf" },
  { id: 13, class: "10", subject: "Math",          topic: "Trigonometry",       title: "Trigonometry Essentials",         file: "/src/assets/notes/class10_math_trig.pdf" },
  { id: 14, class: "10", subject: "Science",        topic: "Light",             title: "Light — Reflection & Refraction", file: "/src/assets/notes/class10_science_light.pdf" },
  { id: 15, class: "10", subject: "Social Science", topic: "Nationalism",        title: "Nationalism in India",            file: "/src/assets/notes/class10_ss_nationalism.pdf" },
  { id: 16, class: "10", subject: "English",        topic: "Letter Writing",     title: "Formal & Informal Letters",       file: "/src/assets/notes/class10_english_letters.pdf" },
];

const classes   = ["6", "7", "8", "9", "10"];
const subjects  = ["Math", "Science", "English", "Social Science"];

export default function Notes() {
  const [selectedClass,   setSelectedClass]   = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filtered = notesData.filter(
    (n) =>
      (!selectedClass   || n.class   === selectedClass) &&
      (!selectedSubject || n.subject === selectedSubject)
  );

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
        .filter-select {
          appearance: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 9px 36px 9px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(240,236,227,0.6);
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: rgba(232,197,71,0.4); }
        .filter-select option { background: #0d1220; }
        .pill-btn {
          padding: 7px 16px;
          border-radius: 4px;
          border: 1px solid rgba(240,236,227,0.1);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(240,236,227,0.4);
          cursor: pointer;
          transition: all 0.2s;
        }
        .pill-btn:hover   { border-color: rgba(232,197,71,0.35); color: #e8c547; }
        .pill-btn.active  { background: rgba(232,197,71,0.1); border-color: rgba(232,197,71,0.4); color: #e8c547; }
        .note-card {
          border: 1px solid rgba(240,236,227,0.07);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
        }
        .note-card:hover  { border-color: rgba(240,236,227,0.14); background: rgba(255,255,255,0.04); }
        .note-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: #e8c547;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .note-card:hover::before { transform: scaleX(1); }
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

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-14 text-center">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(232,197,71,0.06) 0%, transparent 70%)" }}
        />
        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <span
            className="inline-block text-[11px] tracking-[0.14em] uppercase text-[#e8c547] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Study Material
          </span>
        </div>
        <h1
          className="fade-up text-[52px] max-md:text-[36px] font-normal leading-[1.1] mb-4"
          style={{ animationDelay: "0.2s" }}
        >
          Study <em className="text-[#e8c547] italic">Notes.</em>
        </h1>
        <p
          className="fade-up text-[15px] font-light text-[#f0ece3]/40 max-w-[400px] mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif", animationDelay: "0.3s" }}
        >
          Curated notes for Class 6–10 across all subjects. Filter, view, and download instantly.
        </p>
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 py-12">

        {/* ── FILTERS ── */}
        <div
          className="fade-up mb-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
          style={{ animationDelay: "0.35s" }}
        >
          {/* Class pills */}
          <div className="flex flex-wrap gap-2">
            <button
              className={`pill-btn ${selectedClass === "" ? "active" : ""}`}
              onClick={() => setSelectedClass("")}
            >
              All Classes
            </button>
            {classes.map((c) => (
              <button
                key={c}
                className={`pill-btn ${selectedClass === c ? "active" : ""}`}
                onClick={() => setSelectedClass(c)}
              >
                Class {c}
              </button>
            ))}
          </div>

          {/* Subject dropdown */}
          <div className="relative">
            <select
              className="filter-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {/* chevron */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="rgba(240,236,227,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Result count */}
        <p
          className="text-[12px] font-light text-[#f0ece3]/25 mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {filtered.length} note{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* ── GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((note, i) => (
              <div
                key={note.id}
                className="note-card fade-up"
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                {/* Subject badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] tracking-[0.12em] uppercase text-[#e8c547]/60 px-2.5 py-1 rounded-[3px] border border-[#e8c547]/15 bg-[#e8c547]/[0.05]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {note.subject}
                  </span>
                  <span
                    className="text-[11px] font-light text-[#f0ece3]/25"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Class {note.class}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[18px] font-normal leading-[1.3] mb-2">
                  {note.title}
                </h2>

                {/* Topic */}
                <p
                  className="text-[13px] font-light text-[#f0ece3]/35 mb-7"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ◈ {note.topic}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={note.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 text-[12px] font-light rounded-[4px] border border-white/[0.1] text-[#f0ece3]/50 hover:border-[#e8c547]/35 hover:text-[#e8c547] transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}
                  >
                    View PDF
                  </a>
                  <a
                    href={note.file}
                    download
                    className="flex-1 text-center py-2.5 text-[12px] font-medium rounded-[4px] bg-[#e8c547] text-[#0a0f1e] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,197,71,0.25)] transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}
                  >
                    Download →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div className="text-center py-24">
            <div
              className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-[20px] mx-auto mb-5"
            >
              ◇
            </div>
            <p className="text-[20px] font-normal mb-2">No notes found</p>
            <p
              className="text-[14px] font-light text-[#f0ece3]/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Try adjusting your filters to find what you need.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}