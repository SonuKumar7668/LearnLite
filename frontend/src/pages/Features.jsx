import { Link, useNavigate } from "react-router";

export default function Features() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
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
        .feature-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: #e8c547;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .feature-block:hover::before { transform: scaleX(1); }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-[52vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[260px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,197,71,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Platform Features
          </span>
        </div>

        <h1
          className="fade-up text-[64px] max-md:text-[40px] leading-[1.1] font-normal max-w-[700px] mx-auto mt-2 mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          What LearnLite{" "}
          <em className="text-[#e8c547] italic">can do</em>
        </h1>

        <p
          className="fade-up text-[17px] font-light leading-[1.75] text-[#f0ece3]/60 max-w-[500px] mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            animationDelay: "0.35s",
          }}
        >
          AI-powered tools that make any topic simple, interactive, and
          genuinely understandable — for students and teachers alike.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-12 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Core Features
          </span>
          <h2 className="text-[40px] font-normal mt-2">
            Everything in one place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "◈",
              title: "AI-Powered Concept Simplification",
              link: "/chat",
              desc: "Enter any topic and get a clear, step-by-step explanation in simple language — no jargon, no fluff.",
            },
            {
              icon: "◎",
              title: "Real-Life Examples",
              link: "/learn",
              desc: "Understand concepts better with relatable, real-world analogies tailored to your context.",
            },
            {
              icon: "◇",
              title: "Smart Quiz Generation",
              link: "/quiz",
              desc: "Test your understanding instantly with adaptive, auto-generated quizzes that match your level.",
            },
            {
              icon: "▣",
              title: "Short Notes & Summary",
              link: "/notes",
              desc: "Quick revision notes distilled from any topic to help you remember key points before exams.",
            },
            {
              icon: "◉",
              title: "Progress Tracking",
              link: "/dashboard",
              desc: "Visual performance insights that show how you've improved and what to focus on next.",
            },
            {
              icon: "⊕",
              title: "Weak Topic Detection",
              link: "/dashboard",
              desc: "AI identifies your knowledge gaps automatically and surfaces them before they become problems.",
            },
          ].map((f) => (
            <Link
              key={f.title}
              to={f.link}
              className="feature-block relative border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
            >
              <div className="text-[22px] text-[#e8c547] mb-4">{f.icon}</div>
              <h3 className="text-[20px] font-normal mb-3">{f.title}</h3>
              <p
                className="text-[15px] font-light text-[#f0ece3]/55 leading-[1.7] m-0"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* STUDENT BENEFITS */}
      <section className="py-20 px-12 bg-[#0d1220]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              For Students
            </span>
            <h2 className="text-[40px] font-normal mt-2">
              Why students love LearnLite
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "◈", text: "Makes difficult topics easy to grasp" },
              { icon: "◇", text: "Saves hours of study time every week" },
              { icon: "◉", text: "Measurably improves exam performance" },
            ].map((b) => (
              <div
                key={b.text}
                className="p-8 rounded-lg bg-[#111827] border border-white/[0.07] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <div className="text-[22px] text-[#e8c547] mb-4">{b.icon}</div>
                <p
                  className="text-[16px] font-light text-[#f0ece3]/75 leading-[1.65]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER SECTION */}
      <section className="py-20 px-12">
        <div className="max-w-[900px] mx-auto border border-white/10 rounded-xl p-14 bg-white/[0.03] relative overflow-hidden text-center">
          {/* Subtle corner glow */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)",
            }}
          />
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            For Teachers
          </span>
          <h2 className="text-[36px] font-normal mb-5">
            Built for teachers too
          </h2>
          <p
            className="text-[16px] font-light text-[#f0ece3]/55 leading-[1.75] max-w-[560px] mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Track student progress across your class, surface weak topics
            automatically, and guide every student with performance insights —
            without the manual overhead.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-12 bg-[#0a0f1e] text-center border-t border-white/[0.06]">
        <span
          className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#e8c547] mb-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get started
        </span>
        <h2 className="text-[52px] max-md:text-[36px] font-normal mx-auto mt-2 mb-5 max-w-[580px] leading-[1.15]">
          Start learning{" "}
          <em className="text-[#e8c547]">smarter today.</em>
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

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-12 py-8 flex justify-between items-center">
        <span
          className="text-[18px]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Learn<span className="text-[#e8c547]">Lite</span>
        </span>
        <span
          className="text-[13px] text-[#f0ece3]/30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          © 2026 LearnLite. All rights reserved.
        </span>
      </footer>
    </div>
  );
}