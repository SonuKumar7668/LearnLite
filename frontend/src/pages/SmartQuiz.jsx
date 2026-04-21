import { useState } from "react";
import QuizForm from "../components/quiz/QuizForm";
import QuizTest from "../components/quiz/QuizTest";
import axios from "axios";
import { BACKEND_URL } from "../App";
// import { generateQuiz } from "../services/api";

export default function SmartQuiz() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setQuizData(null);

    try {
      const res = await axios.post(`${BACKEND_URL}/quiz`, formData);
      setQuizData(res.data);
      console.log("Generated Quiz:", res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0f1e] text-[#f0ece3] overflow-x-hidden"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.65s ease forwards;
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
            "linear-gradient(rgba(232,197,71,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="relative border-b border-white/[0.06] px-8 md:px-12 pt-28 pb-14 text-center">

        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,197,71,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <span
            className="inline-block text-[11px] tracking-[0.14em] uppercase text-[#e8c547] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {quizData ? "In progress" : "Smart Quiz"}
          </span>
        </div>

        <h1
          className="fade-up text-[52px] max-md:text-[36px] font-normal leading-[1.1] mb-4"
          style={{ animationDelay: "0.2s" }}
        >
          {quizData ? (
            <>Test your <em className="text-[#e8c547] italic">knowledge.</em></>
          ) : (
            <>Generate a <em className="text-[#e8c547] italic">quiz.</em></>
          )}
        </h1>

        <p
          className="fade-up text-[15px] font-light text-[#f0ece3]/45 max-w-[420px] mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif", animationDelay: "0.3s" }}
        >
          {quizData
            ? "Pick the best answer for each question. Results shown at the end."
            : "Enter a topic, pick a difficulty, and let AI build your quiz instantly."}
        </p>
      </div>

      {/* Content */}
      <div className="relative px-6 py-16">
        {!quizData ? (
          <QuizForm onGenerate={handleGenerate} loading={loading} />
        ) : (
          <QuizTest questions={quizData.quiz} />
        )}
      </div>
    </div>
  );
}