import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: #e8c547;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .step-card:hover::before { transform: scaleX(1); }
        .marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[120px] pb-20 relative">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(232,197,71,0.08) 0%, transparent 70%)" }}
        />

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            AI-Powered Learning
          </span>
        </div>

        <h1
          className="fade-up text-[72px] max-md:text-[44px] leading-[1.1] font-normal max-w-[800px] mx-auto mt-2 mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          Learn anything,<br />
          <em className="text-[#e8c547] italic">the easy way.</em>
        </h1>

        <p
          className="fade-up text-[18px] font-light leading-[1.7] text-[#f0ece3]/65 max-w-[520px] mx-auto mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif", animationDelay: "0.35s" }}
        >
          LearnLite breaks down complex topics into clear explanations, vivid examples, and smart quizzes — all powered by AI.
        </p>

        <div
          className="fade-up flex max-md:flex-col gap-4 justify-center"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => navigate("/features")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#e8c547] text-[#0a0f1e] text-[15px] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(232,197,71,0.35)] transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Start Learning →
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent text-[#f0ece3] text-[15px] font-normal rounded-[4px] border border-[#f0ece3]/30 cursor-pointer hover:border-[#e8c547] hover:text-[#e8c547] hover:bg-[#e8c547]/[0.07] transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            See a Demo
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#f0ece3]/60 to-transparent" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="border-t border-b border-white/[0.07] py-4 overflow-hidden bg-[#e8c547]/[0.04]">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() =>
            ["Photosynthesis", "Newton's Laws", "Calculus", "World History", "Python Basics", "Quantum Physics", "Economics", "Grammar", "Thermodynamics", "Organic Chemistry"]
          ).map((t, i) => (
            <span
              key={i}
              className="text-[13px] text-[#f0ece3]/35 tracking-[0.05em] shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t} <span className="text-[#e8c547] mx-3">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-[120px] px-12 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Process
          </span>
          <h2 className="text-[44px] font-normal mt-2">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Enter a topic", desc: "Type any subject — from Photosynthesis to Nietzsche. The more specific, the better." },
            { num: "02", title: "Get explained", desc: "AI breaks it into digestible steps, real-world analogies, and visual examples." },
            { num: "03", title: "Test yourself", desc: "Adaptive quizzes identify gaps and reinforce what you've learned." },
          ].map((step) => (
            <div
              key={step.num}
              className="step-card relative border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
            >
              <div
                className="text-[48px] leading-none mb-5 text-[#e8c547]/20"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {step.num}
              </div>
              <h3 className="text-[20px] font-normal mb-3">{step.title}</h3>
              <p
                className="text-[15px] font-light text-[#f0ece3]/55 leading-[1.7] m-0"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 pb-[120px] px-12 bg-[#0d1220]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Features
            </span>
            <h2 className="text-[44px] font-normal mt-2">Everything you need to learn faster</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="◈" title="Simple Explanations" desc="Complex topics, reframed. Every explanation is structured for clarity — no jargon, no fluff." />
            <FeatureCard icon="◇" title="Smart Quizzes" desc="Test yourself immediately after learning. Questions adapt to your level in real time." />
            <FeatureCard icon="◉" title="Progress Tracking" desc="Visual insights into your weak areas so you can focus effort where it matters most." />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-[100px] px-12 text-center border-t border-white/[0.06]">
        <div className="max-w-[800px] mx-auto">
          <div className="w-12 h-0.5 bg-[#e8c547] mx-auto mb-4" />
          <blockquote
            className="text-[28px] font-normal leading-[1.5] italic text-[#f0ece3]/85 mb-6"
          >
            "I finally understood quantum entanglement after 10 minutes with LearnLite. My professor couldn't explain it in a semester."
          </blockquote>
          <p
            className="text-[14px] text-[#f0ece3]/40 tracking-[0.05em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            PRIYA S. — PHYSICS STUDENT
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-12 bg-[#0a0f1e] text-center border-t border-white/[0.06]">
        <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Get started
        </span>
        <h2 className="text-[52px] font-normal mx-auto mt-2 mb-5 max-w-[640px] leading-[1.15]">
          Ready to make learning <em className="text-[#e8c547]">effortless?</em>
        </h2>
        <p
          className="text-[16px] font-light text-[#f0ece3]/50 mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          No account required. Just enter a topic and go.
        </p>
        <button
          onClick={() => navigate("/learn")}
          className="inline-flex items-center gap-2.5 px-10 py-4 text-[16px] bg-[#e8c547] text-[#0a0f1e] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(232,197,71,0.35)] transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Try LearnLite Free →
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-9 rounded-lg bg-[#111827] border border-white/[0.07] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div className="text-[24px] text-[#e8c547] mb-5">{icon}</div>
      <h3 className="text-[20px] font-normal mb-3">{title}</h3>
      <p
        className="text-[15px] font-light text-[#f0ece3]/55 leading-[1.7] m-0"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {desc}
      </p>
    </div>
  );
}