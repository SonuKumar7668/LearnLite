import { useState } from "react";

export default function QuizForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    classLevel: "",
    subject: "",
    topic: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.classLevel || !form.subject || !form.topic) return;
    onGenerate(form);
  };

  return (
  <div className="max-w-[520px] mx-auto">
    <div className="border border-white/[0.08] rounded-xl bg-white/[0.03] p-10 relative overflow-hidden">

      {/* Corner glow */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)" }}
      />

      <p
        className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] mb-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Configure quiz
      </p>

      {/* CLASS */}
      <div className="mb-5">
        <label
          className="block text-[12px] font-light text-[#f0ece3]/40 mb-2 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Class
        </label>
        <select
          name="classLevel"
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.1] rounded-[4px] px-4 py-3 text-[14px] text-[#f0ece3]/70 outline-none focus:border-[#e8c547]/40 transition-colors cursor-pointer appearance-none"
          style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(255,255,255,0.04)" }}
        >
          <option value="" style={{ background: "#0a0f1e" }}>Select class</option>
          {[6, 7, 8, 9, 10].map((c) => (
            <option key={c} value={c} style={{ background: "#0a0f1e" }}>
              Class {c}
            </option>
          ))}
        </select>
      </div>

      {/* SUBJECT */}
      <div className="mb-5">
        <label
          className="block text-[12px] font-light text-[#f0ece3]/40 mb-2 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          placeholder="e.g. Science"
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.1] rounded-[4px] px-4 py-3 text-[14px] text-[#f0ece3] placeholder:text-[#f0ece3]/20 outline-none focus:border-[#e8c547]/40 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      {/* TOPIC */}
      <div className="mb-10">
        <label
          className="block text-[12px] font-light text-[#f0ece3]/40 mb-2 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Topic
        </label>
        <input
          type="text"
          name="topic"
          placeholder="e.g. Photosynthesis"
          onChange={handleChange}
          className="w-full bg-white/[0.04] border border-white/[0.1] rounded-[4px] px-4 py-3 text-[14px] text-[#f0ece3] placeholder:text-[#f0ece3]/20 outline-none focus:border-[#e8c547]/40 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 bg-[#e8c547] text-[#0a0f1e] text-[14px] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(232,197,71,0.3)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {loading ? "Generating…" : "Generate Quiz →"}
      </button>
    </div>
  </div>
);
}